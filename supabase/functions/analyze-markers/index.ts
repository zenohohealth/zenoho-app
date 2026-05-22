import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { SYSTEM_PROMPT } from "../_shared/zenoho_analysis_markers_prompt_v1_0.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function toIntSafe(v: any): number | null {
  if (v == null) return null;
  if (typeof v === "number" && Number.isFinite(v)) return Math.round(v);
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }
  return null;
}

function parseLabRefRange(range: string | null | undefined): { low: number | null; high: number | null } {
  if (!range || typeof range !== "string") return { low: null, high: null };
  const match = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (!match) return { low: null, high: null };
  return { low: parseFloat(match[1]), high: parseFloat(match[2]) };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  let panel_id: string | null = null;

  try {
    const body = await req.json();
    panel_id = body.panel_id ?? null;
    if (!panel_id) {
      return new Response(JSON.stringify({ error: "panel_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Read panel first — we need raw_text before setting status
    const { data: panel, error: panelErr } = await supabase
      .from("panels")
      .select("*")
      .eq("id", panel_id)
      .single();

    if (panelErr || !panel) {
      const msg = "Panel not found: " + (panelErr?.message ?? "unknown");
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: msg,
      }).eq("id", panel_id);
      throw new Error(msg);
    }

    const panelRawText: string = panel.raw_text ?? "";
    if (!panelRawText.trim()) {
      const msg = "raw_text is empty — extract-pdf-text did not complete for panel: " + panel_id;
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: msg,
      }).eq("id", panel_id);
      throw new Error(msg);
    }

    // FIRST ACTION after successful panel read: set analyzing_markers
    await supabase
      .from("panels")
      .update({ processing_status: "analyzing_markers" })
      .eq("id", panel_id);
    console.log("[analyze-markers] Status set to analyzing_markers for panel:", panel_id);

    // Read userProfile from users table
    const { data: userProfile } = await supabase
      .from("users")
      .select("*")
      .eq("id", panel.user_id)
      .maybeSingle();

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) throw new Error("ANTHROPIC_API_KEY not set");

    // 148s abort — fires before Pro's 150s platform wall-clock kill
    const TIMEOUT_MS = 148_000;
    const abortController = new AbortController();
    const timeoutHandle = setTimeout(() => {
      abortController.abort(new Error("Stage 1 (markers) exceeded 148-second limit"));
    }, TIMEOUT_MS);

    // Build user message per template at bottom of zenoho_analysis_markers_prompt_v1_0.js
    const userMessageText = `Analyse this blood report's markers.

Patient profile for context:
Age: ${userProfile?.age ?? "unknown"}
Sex: ${userProfile?.sex ?? "unknown"}
Pregnancy status: ${userProfile?.profileFlags?.isPregnant ?? false}
Dietary pattern: ${userProfile?.dietary_pattern ?? "unknown"}
Ayurvedic preference: ${userProfile?.ayurvedic_preference ?? false}
Disclosed medications: ${(userProfile?.medications ?? []).join(", ") || "none disclosed"}
Disclosed diagnoses: ${(userProfile?.diagnoses ?? []).join(", ") || "none disclosed"}
Physician oversight flags: ${(userProfile?.physician_oversight_flags ?? []).join(", ") || "none"}

Blood report text (extracted from PDF):
${panelRawText}

Return Stage 1 JSON only.`;

    let claudeRes: Response;
    try {
      claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 8000,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: userMessageText }],
        }),
        signal: abortController.signal,
      });
    } catch (fetchErr: any) {
      // Timeout abort lands here
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: "Stage 1 (markers) exceeded 148-second limit",
      }).eq("id", panel_id);
      throw fetchErr;
    } finally {
      clearTimeout(timeoutHandle);
    }

    if (!claudeRes.ok) throw new Error("Claude API error: " + (await claudeRes.text()));

    const claudeData = await claudeRes.json();
    console.log("[analyze-markers] Cache stats:", JSON.stringify(claudeData.usage));

    let rawText: string = (claudeData.content?.[0]?.text ?? "").trim();
    if (rawText.startsWith("```json")) rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```\s*$/, "");
    else if (rawText.startsWith("```")) rawText = rawText.replace(/^```\s*/, "").replace(/\s*```\s*$/, "");

    let result: any;
    try {
      result = JSON.parse(rawText);
    } catch (parseError: any) {
      const msg = `JSON parse failed: ${parseError.message}\n\nRaw (first 500): ${rawText.slice(0, 500)}`;
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: msg,
      }).eq("id", panel_id);
      throw new Error(msg);
    }

    // Handle AGE_UNDER_18 gate — hard stop, no DB writes
    if (result.gate_triggered === "AGE_UNDER_18") {
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: "Gate triggered: AGE_UNDER_18",
      }).eq("id", panel_id);
      console.log("[analyze-markers] AGE_UNDER_18 gate fired for panel:", panel_id);
      return new Response(JSON.stringify({
        success: true,
        panel_id,
        gate_triggered: "AGE_UNDER_18",
        markers_count: 0,
        crisis_detected: null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = panel.user_id;
    const now = new Date().toISOString();
    const markers = result.marker_results ?? [];
    const meta = result.panel_metadata ?? null;
    const safetyOverrides = result.safety_overrides_triggered ?? [];
    const crossMarkerRules = result.cross_marker_rules_active ?? [];

    // Write panel metadata back (pregnancy, crisis, conservative_mode, markers_submitted)
    await supabase.from("panels").update({
      patient_name_on_report: meta?.patient_name ?? panel.patient_name_on_report,
      lab_name: meta?.lab_name ?? panel.lab_name,
      pregnancy_gate_active: result.pregnancy_gate_active ?? false,
      conservative_mode_active: result.conservative_mode_active ?? false,
      crisis_detected: result.crisis_detected ?? null,
      crisis_message: result.crisis_message ?? null,
      markers_submitted: markers.length,
    }).eq("id", panel_id);

    // Write marker_results — apply marker_id 1-62 filter consistent with process-blood-report
    if (markers.length) {
      const validMarkers = markers.filter((m: any) => {
        const valid = typeof m.marker_id === "number" && Number.isInteger(m.marker_id) && m.marker_id >= 1 && m.marker_id <= 62;
        if (!valid) {
          console.log(`[analyze-markers] Skipped marker outside range: ${m.marker_name ?? m.raw_marker_name ?? "unknown"} (marker_id=${m.marker_id})`);
        }
        return valid;
      });

      const markerRows = validMarkers.map((m: any) => {
        let lab_ref_low = m.lab_ref_low;
        let lab_ref_high = m.lab_ref_high;
        if ((lab_ref_low == null || lab_ref_high == null) && m.lab_ref_range) {
          const parsed = parseLabRefRange(m.lab_ref_range);
          lab_ref_low = lab_ref_low ?? parsed.low;
          lab_ref_high = lab_ref_high ?? parsed.high;
        }
        return {
          panel_id,
          user_id: userId,
          marker_id: m.marker_id,
          value: m.value,
          unit: m.unit,
          lab_ref_low,
          lab_ref_high,
          zenoho_zone: m.zenoho_zone,
          zone_score: m.zone_score ?? m.marker_score,
          raw_marker_name: m.raw_marker_name ?? m.lab_name ?? m.marker_name,
          lab_error_flag: m.lab_error_flag,
          retest_required: m.retest_required ?? false,
          interpretation_note: m.interpretation_note ?? m.narrative ?? m.notes,
          created_at: now,
        };
      });

      const { error: markerErr } = await supabase.from("marker_results").insert(markerRows);
      if (markerErr) throw new Error(`marker_results insert: ${markerErr.message}`);
    }

    // Write safety_overrides_triggered to panel_scores (safety_overrides_active flag)
    // and store the full array in panel metadata for downstream stages.
    // The DB schema stores safety_overrides_active (boolean) in panel_scores,
    // not individual override rows. Upsert panel_scores with the flag.
    if (safetyOverrides.length > 0) {
      const { error: soErr } = await supabase.from("panel_scores").upsert({
        panel_id,
        user_id: userId,
        safety_overrides_active: true,
        created_at: now,
      }, { onConflict: "panel_id" });
      if (soErr) console.warn("[analyze-markers] panel_scores safety_overrides upsert warning:", soErr.message);
    }

    // Write cross_marker_rules_active to panel_scores (integer array of rule IDs)
    if (crossMarkerRules.length > 0) {
      const ruleIds: number[] = crossMarkerRules
        .map((r: any) => toIntSafe(r.rule_id))
        .filter((id: number | null): id is number => id !== null);

      const { error: cmErr } = await supabase.from("panel_scores").upsert({
        panel_id,
        user_id: userId,
        cross_marker_rules_active: ruleIds,
        created_at: now,
      }, { onConflict: "panel_id" });
      if (cmErr) console.warn("[analyze-markers] panel_scores cross_marker_rules upsert warning:", cmErr.message);
    }

    // FINAL ACTION: set markers_done and record model
    await supabase.from("panels").update({
      processing_status: "markers_done",
      processing_model: "claude-sonnet-4-6",
    }).eq("id", panel_id);
    console.log("[analyze-markers] Stage 1 complete — status set to markers_done for panel:", panel_id);

    // NOTE: analyze-scores is NOT invoked here. Pipeline stops at markers_done.
    // Stage 2 invocation will be wired in a future task.

    return new Response(JSON.stringify({
      success: true,
      panel_id,
      markers_count: markers.length,
      gate_triggered: result.gate_triggered ?? null,
      crisis_detected: result.crisis_detected ?? null,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("[analyze-markers] error:", err.message ?? err, err.stack);
    if (panel_id) {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await supabase.from("panels").update({
          processing_status: "failed",
          processing_error: err.message ?? "Unknown error",
        }).eq("id", panel_id);
      } catch {}
    }
    return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SYSTEM_PROMPT = `[KEEP THE EXISTING SYSTEM_PROMPT FROM CURRENT FILE — DO NOT TOUCH IT]`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Parse "12.0 - 15.0" or "12-15" into { low: 12, high: 15 }
function parseLabRefRange(range: string | null | undefined): { low: number | null; high: number | null } {
  if (!range || typeof range !== "string") return { low: null, high: null };
  const match = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (!match) return { low: null, high: null };
  return { low: parseFloat(match[1]), high: parseFloat(match[2]) };
}

// Parse "Recommended in 6 months" or "2026-11-17" into a Date in YYYY-MM-DD or null
function parseNextTestDate(text: string | null | undefined): string | null {
  if (!text || typeof text !== "string") return null;
  const iso = text.match(/\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const monthsMatch = text.match(/(\d+)\s*month/i);
  if (monthsMatch) {
    const d = new Date();
    d.setMonth(d.getMonth() + parseInt(monthsMatch[1]));
    return d.toISOString().split("T")[0];
  }
  const weeksMatch = text.match(/(\d+)\s*week/i);
  if (weeksMatch) {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(weeksMatch[1]) * 7);
    return d.toISOString().split("T")[0];
  }
  // Default: 90 days from today
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().split("T")[0];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  let panel_id: string | null = null;

  try {
    const body = await req.json();
    panel_id = body.panel_id ?? null;
    if (!panel_id) return new Response(JSON.stringify({ error: "panel_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await supabase.from("panels").update({ processing_status: "processing" }).eq("id", panel_id);

    const { data: panel, error: panelErr } = await supabase.from("panels").select("*").eq("id", panel_id).single();
    if (panelErr || !panel) throw new Error("Panel not found: " + (panelErr?.message ?? "unknown"));

    let base64PDF: string | null = null;
    if (panel.raw_pdf_path) {
      const { data: fileData, error: storageErr } = await supabase.storage.from("blood-reports").download(panel.raw_pdf_path);
      if (storageErr || !fileData) throw new Error("Storage download failed: " + (storageErr?.message ?? "no data"));
      const arrayBuf = await fileData.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuf);
      let binary = "";
      for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
      base64PDF = btoa(binary);
    }

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) throw new Error("ANTHROPIC_API_KEY not set");

    const messages: any[] = base64PDF
      ? [{ role: "user", content: [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64PDF } },
          { type: "text", text: "Analyse this blood report. Return JSON only." },
        ]}]
      : [{ role: "user", content: "No PDF provided." }];

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": anthropicKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 16000, system: SYSTEM_PROMPT, messages }),
    });

    if (!claudeRes.ok) throw new Error("Claude API error: " + (await claudeRes.text()));

    const claudeData = await claudeRes.json();
    let rawText: string = (claudeData.content?.[0]?.text ?? "").trim();
    if (rawText.startsWith("```json")) rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```\s*$/, "");
    else if (rawText.startsWith("```")) rawText = rawText.replace(/^```\s*/, "").replace(/\s*```\s*$/, "");

    let result: any;
    try { result = JSON.parse(rawText); }
    catch (parseError: any) {
      throw new Error(`JSON parse failed: ${parseError.message}\n\nRaw response (first 500 chars):\n${rawText.slice(0, 500)}`);
    }

    const userId = panel.user_id;
    const now = new Date().toISOString();
    const markers = result.marker_results ?? [];
    const systems = result.system_scores ?? [];
    const domains = result.domain_scores ?? [];
    const panelScore = result.panel_score ?? null;
    const bioAge = result.biological_age ?? null;
    const supplements = result.supplement_protocol ?? [];
    const meta = result.panel_metadata ?? null;

    // Update panel metadata
    await supabase.from("panels").update({
      lab_name: meta?.lab_name ?? panel.lab_name,
      patient_name_on_report: meta?.patient_name ?? panel.patient_name_on_report,
      collected_on: meta?.collected_on ?? panel.collected_on,
      lab_accession_list: meta?.lab_accession_list ?? [],
      authenticity_score: meta?.authenticity_assessment ?? null,
      authenticity_flags: meta?.authenticity_notes ? [meta.authenticity_notes] : [],
      confidence_overall: panelScore?.confidence ?? null,
      markers_submitted: markers.length,
      markers_scoreable: markers.filter((m: any) => m.marker_score != null).length,
      processing_model: "claude-sonnet-4-6",
    }).eq("id", panel_id);

    // marker_results — CORRECT field mapping
    if (markers.length) {
      const markerRows = markers.map((m: any) => {
        const refRange = parseLabRefRange(m.lab_ref_range);
        return {
          panel_id,
          user_id: userId,
          marker_id: m.marker_id,
          value: m.value,
          unit: m.unit,
          lab_ref_low: refRange.low,
          lab_ref_high: refRange.high,
          zenoho_zone: m.zenoho_zone,
          zone_score: m.marker_score,                    // Claude: marker_score → DB: zone_score
          raw_marker_name: m.lab_name ?? m.marker_name,  // Claude: lab_name → DB: raw_marker_name
          lab_error_flag: m.lab_error_flag,
          retest_required: m.retest_required ?? false,
          interpretation_note: m.notes,                  // Claude: notes → DB: interpretation_note
          created_at: now,
        };
      });
      const { error: markerErr } = await supabase.from("marker_results").insert(markerRows);
      if (markerErr) throw new Error(`marker_results insert failed: ${markerErr.message}`);
    }

    // system_scores
    if (systems.length) {
      const sysRows = systems.map((s: any) => ({
        panel_id,
        user_id: userId,
        system_id: s.system_id,
        system_name: s.system_name ?? s.system_code,
        raw_score: s.score ?? s.raw_score,
        system_weight: s.weight ?? s.system_weight,
        weighted_contribution: s.weighted_contribution,
        confidence: s.confidence,
        markers_tested: s.markers_tested,
        markers_available: s.markers_available,
        created_at: now,
      }));
      const { error: sysErr } = await supabase.from("system_scores").insert(sysRows);
      if (sysErr) throw new Error(`system_scores insert failed: ${sysErr.message}`);
    }

    // domain_scores
    if (domains.length) {
      const domRows = domains.map((d: any) => ({
        panel_id,
        user_id: userId,
        domain_id: d.domain_id,
        domain_name: d.domain_name,
        raw_score: d.score ?? d.raw_score,
        level: d.level,
        confidence: d.confidence,
        created_at: now,
      }));
      const { error: domErr } = await supabase.from("domain_scores").insert(domRows);
      if (domErr) throw new Error(`domain_scores insert failed: ${domErr.message}`);
    }

    // panel_scores
    if (panelScore) {
      const { error: psErr } = await supabase.from("panel_scores").upsert({
        panel_id,
        user_id: userId,
        b_score: panelScore.zenoho_health_score,
        b_score_confidence: panelScore.confidence,
        bio_age_estimated: bioAge?.biological_age ? Math.round(bioAge.biological_age) : null,
        bio_age_chronological: bioAge?.chronological_age,
        bio_age_gap: bioAge?.bio_age_gap ? Math.round(bioAge.bio_age_gap) : null,
        bio_age_confidence: bioAge?.confidence,
        top_lever: result.zenoho_read_summary?.top_3_opportunities?.[0] ?? null,
        next_test_date: parseNextTestDate(result.zenoho_read_summary?.next_test_recommendation),
        safety_overrides_active: panelScore.safety_override_active ?? false,
        cross_marker_rules_active: (result.cross_marker_rules_triggered ?? []).map((r: any) => r.rule_name ?? r.rule_id).filter(Boolean),
        created_at: now,
      }, { onConflict: "panel_id" });
      if (psErr) throw new Error(`panel_scores insert failed: ${psErr.message}`);
    }

    // supplement_recommendations
    if (supplements.length) {
      const supRows = supplements.map((s: any) => ({
        panel_id,
        user_id: userId,
        supplement_name: s.supplement_name ?? s.name,
        tier: s.tier ?? 1,
        tier_label: s.tier_label,
        dose_amount: s.dose_amount ?? null,
        dose_unit: s.dose_unit ?? null,
        dose_frequency: s.dose_frequency ?? s.frequency,
        dose_timing: s.dose_timing ?? s.timing,
        pair_with: s.pair_with,
        evidence_level: s.evidence_level,
        trigger_marker_id: s.trigger_marker_id ?? s.rationale_marker_ids?.[0] ?? null,
        trigger_zone: s.trigger_zone,
        drug_interaction_warning: s.drug_interaction_warning,
        is_premium_form: s.is_premium_form ?? false,
        premium_form_name: s.premium_form_name,
        premium_form_extra_cost_paise: s.premium_form_extra_cost_paise,
        ayurvedic_classical_name: s.ayurvedic_classical_name,
        ayush_recognised: s.ayush_recognised ?? false,
        is_active: true,
        created_at: now,
      }));
      const { error: supErr } = await supabase.from("supplement_recommendations").insert(supRows);
      if (supErr) throw new Error(`supplement_recommendations insert failed: ${supErr.message}`);
    }

    await supabase.from("panels").update({ processing_status: "complete", approved_at: now }).eq("id", panel_id);

    return new Response(JSON.stringify({ success: true, panel_id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err: any) {
    console.error("process-blood-report error:", err.message ?? err, err.stack);
    if (panel_id) {
      try {
        const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
        await supabase.from("panels").update({ processing_status: "failed", processing_error: err.message ?? "Unknown error" }).eq("id", panel_id);
      } catch {}
    }
    return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

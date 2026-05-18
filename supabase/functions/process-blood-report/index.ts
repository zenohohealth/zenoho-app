import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SYSTEM_PROMPT = `
You are the Zenoho Blood Analysis Engine v1.1.5.

You analyse blood test reports from Indian diagnostic labs and produce structured
health intelligence output. You do NOT diagnose disease. You score biomarker
performance against Zenoho Optimal ranges and return structured JSON.

CRITICAL RULES:
1. Extract ONLY values explicitly present in the report. Never estimate missing values.
2. Return ONLY valid JSON. No preamble, no explanation, no markdown.
3. Apply Zenoho Optimal ranges (stricter than lab reference ranges) for scoring.
4. Trigger safety overrides immediately when critical thresholds are crossed.
5. Apply cross-marker rules after individual scoring is complete.
6. If a value is ambiguous or potentially a lab error, flag it — do not score it.
7. Domain names in domain_scores[] MUST be chosen from this exact list, verbatim, with no substitutions: "Biological Age", "Vitality & Strength", "Brain Sharpness", "Heart Engine", "Metabolic Power", "Recovery Capacity", "Detox Efficiency", "Endurance & Stamina", "Mood & Calm", "Immunity Strength". If a domain cannot be computed (less than 40% of its constituent markers tested), omit it entirely — never substitute an alternative name.
8. FORBIDDEN domain names: never output "Vitality & Energy", "Organ Resilience", "Metabolic Health", "Nutritional Sufficiency", "Inflammatory Load", "Cardiovascular Health", or any name outside the canonical list in rule 7.

==============================================================
PART 1: LAB REPORT EXTRACTION
==============================================================

Extract:
- Patient name, age, sex, lab name, lab accession number(s), collection date
- All test results (value, unit, lab reference range as printed)
- Map lab marker names to Zenoho marker IDs using fuzzy matching

==============================================================
PART 9: OUTPUT JSON SCHEMA — STRICT
==============================================================

Return EXACTLY this JSON structure. No other text.

{
  "panel_metadata": {
    "patient_name": "string",
    "patient_age": number,
    "patient_sex": "male" | "female",
    "lab_name": "string",
    "lab_accession": "string",
    "lab_accession_list": ["string"],
    "collected_on": "YYYY-MM-DD",
    "authenticity_assessment": "HIGH" | "MEDIUM" | "LOW",
    "authenticity_notes": "string or null"
  },
  "marker_results": [
    {
      "marker_id": number,
      "value": number,
      "unit": "string",
      "lab_ref_low": number,
      "lab_ref_high": number,
      "zenoho_zone": "optimal" | "watch_low" | "watch_high" | "alert_low" | "alert_high" | "critical_low" | "critical_high",
      "zone_score": number,
      "raw_marker_name": "string",
      "lab_error_flag": "string or null",
      "retest_required": boolean,
      "interpretation_note": "string"
    }
  ],
  "system_scores": [
    {
      "system_id": number,
      "system_name": "string",
      "raw_score": number,
      "system_weight": number,
      "weighted_contribution": number,
      "confidence": "HIGH" | "MEDIUM" | "LOW",
      "markers_tested": number,
      "markers_available": number
    }
  ],
  "domain_scores": [
    {
      "domain_id": number,
      "domain_name": "string",
      "raw_score": number,
      "level": number,
      "confidence": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "panel_score": {
    "b_score": number,
    "b_score_confidence": "HIGH" | "MEDIUM" | "LOW",
    "top_lever": "string",
    "safety_overrides_active": boolean
  },
  "biological_age": {
    "chronological_age": number,
    "biological_age": number,
    "bio_age_gap": number,
    "confidence": "HIGH" | "MEDIUM" | "LOW"
  },
  "supplement_protocol": [
    {
      "supplement_name": "string",
      "tier": 1 | 2 | 3,
      "tier_label": "string",
      "dose_amount": number,
      "dose_unit": "string",
      "dose_frequency": "string",
      "dose_timing": "string",
      "pair_with": "string or null",
      "evidence_level": "HIGH" | "MEDIUM" | "LOW",
      "trigger_marker_id": number,
      "trigger_zone": "string",
      "drug_interaction_warning": "string or null"
    }
  ],
  "safety_overrides_triggered": [],
  "cross_marker_rules_triggered": [],
  "zenoho_read_summary": {
    "headline_score": "string",
    "top_3_findings": ["string"],
    "top_3_opportunities": ["string"],
    "next_test_recommendation_days": number,
    "closing_note": "string"
  }
}

CRITICAL: Use EXACT field names shown above. Use "zone_score" not "marker_score". Use "raw_marker_name" not "lab_name". Use "interpretation_note" not "notes". Parse lab reference range into "lab_ref_low" and "lab_ref_high" as numbers. Use "next_test_recommendation_days" as integer number of days, not a date string.

For full marker registry, scoring algorithm, safety overrides, cross-marker rules — apply v1.1.5 logic as previously specified. Return ONLY JSON. Begin with { and end with }. No other text.
`;

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

function toStringArray(v: any): string[] {
  if (!v) return [];
  if (!Array.isArray(v)) return [];
  return v.map((item: any) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") return item.rule_name ?? item.rule_id ?? item.name ?? JSON.stringify(item);
    return String(item);
  }).filter(Boolean);
}

function parseLabRefRange(range: string | null | undefined): { low: number | null; high: number | null } {
  if (!range || typeof range !== "string") return { low: null, high: null };
  const match = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (!match) return { low: null, high: null };
  return { low: parseFloat(match[1]), high: parseFloat(match[2]) };
}

function parseNextTestDate(input: any): string | null {
  if (typeof input === "number") {
    const d = new Date();
    d.setDate(d.getDate() + input);
    return d.toISOString().split("T")[0];
  }
  if (typeof input === "string") {
    const iso = input.match(/\d{4}-\d{2}-\d{2}/);
    if (iso) return iso[0];
    const monthsMatch = input.match(/(\d+)\s*month/i);
    if (monthsMatch) {
      const d = new Date();
      d.setMonth(d.getMonth() + parseInt(monthsMatch[1]));
      return d.toISOString().split("T")[0];
    }
  }
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

    await supabase.from("panels").update({ processing_status: "processing" }).eq("id", panel_id);

    const { data: panel, error: panelErr } = await supabase
      .from("panels").select("*").eq("id", panel_id).single();
    if (panelErr || !panel) throw new Error("Panel not found: " + (panelErr?.message ?? "unknown"));

    let base64PDF: string | null = null;
    if (panel.raw_pdf_path) {
      const { data: fileData, error: storageErr } = await supabase.storage
        .from("blood-reports").download(panel.raw_pdf_path);
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
      ? [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64PDF } },
            { type: "text", text: "Analyse this blood report. Return JSON only." },
          ],
        }]
      : [{ role: "user", content: "No PDF provided." }];

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 16000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!claudeRes.ok) throw new Error("Claude API error: " + (await claudeRes.text()));

    const claudeData = await claudeRes.json();
    let rawText: string = (claudeData.content?.[0]?.text ?? "").trim();
    if (rawText.startsWith("```json")) rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```\s*$/, "");
    else if (rawText.startsWith("```")) rawText = rawText.replace(/^```\s*/, "").replace(/\s*```\s*$/, "");

    let result: any;
    try {
      result = JSON.parse(rawText);
    } catch (parseError: any) {
      throw new Error(`JSON parse failed: ${parseError.message}\n\nRaw (first 500): ${rawText.slice(0, 500)}`);
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

    await supabase.from("panels").update({
      lab_name: meta?.lab_name ?? panel.lab_name,
      patient_name_on_report: meta?.patient_name ?? panel.patient_name_on_report,
      collected_on: meta?.collected_on ?? panel.collected_on,
      lab_accession_list: meta?.lab_accession_list ?? [],
      authenticity_score: meta?.authenticity_assessment ?? null,
      authenticity_flags: meta?.authenticity_notes ? [meta.authenticity_notes] : [],
      confidence_overall: panelScore?.b_score_confidence ?? null,
      markers_submitted: markers.length,
      markers_scoreable: markers.filter((m: any) => m.zone_score != null).length,
      processing_model: "claude-sonnet-4-6",
    }).eq("id", panel_id);

    if (markers.length) {
      const markerRows = markers.map((m: any) => {
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
          interpretation_note: m.interpretation_note ?? m.notes,
          created_at: now,
        };
      });
      const { error: markerErr } = await supabase.from("marker_results").insert(markerRows);
      if (markerErr) throw new Error(`marker_results insert: ${markerErr.message}`);
    }

    if (systems.length) {
      const sysRows = systems.map((s: any) => ({
        panel_id,
        user_id: userId,
        system_id: s.system_id,
        system_name: s.system_name,
        raw_score: s.raw_score ?? s.score,
        system_weight: s.system_weight ?? s.weight,
        weighted_contribution: s.weighted_contribution,
        confidence: s.confidence,
        markers_tested: s.markers_tested,
        markers_available: s.markers_available,
        created_at: now,
      }));
      const { error: sysErr } = await supabase.from("system_scores").insert(sysRows);
      if (sysErr) throw new Error(`system_scores insert: ${sysErr.message}`);
    }

    if (domains.length) {
      const domRows = domains.map((d: any) => ({
        panel_id,
        user_id: userId,
        domain_id: d.domain_id,
        domain_name: d.domain_name,
        raw_score: d.raw_score ?? d.score,
        level: d.level,
        confidence: d.confidence,
        created_at: now,
      }));
      const { error: domErr } = await supabase.from("domain_scores").insert(domRows);
      if (domErr) throw new Error(`domain_scores insert: ${domErr.message}`);
    }

    if (panelScore) {
      const { error: psErr } = await supabase.from("panel_scores").upsert({
        panel_id,
        user_id: userId,
        b_score: toIntSafe(panelScore.zenoho_health_score ?? panelScore.b_score),
        b_score_confidence: panelScore.confidence ?? panelScore.b_score_confidence ?? null,
        bio_age_estimated: toIntSafe(bioAge?.biological_age ?? panelScore.bio_age_estimated),
        bio_age_chronological: toIntSafe(bioAge?.chronological_age ?? panelScore.bio_age_chronological),
        bio_age_gap: toIntSafe(bioAge?.bio_age_gap ?? panelScore.bio_age_gap),
        bio_age_confidence: bioAge?.confidence ?? panelScore.bio_age_confidence ?? null,
        top_lever: typeof (result.zenoho_read_summary?.top_3_opportunities?.[0] ?? panelScore.top_lever) === "string"
          ? (result.zenoho_read_summary?.top_3_opportunities?.[0] ?? panelScore.top_lever)
          : null,
        next_test_date: parseNextTestDate(result.zenoho_read_summary?.next_test_recommendation_days ?? result.zenoho_read_summary?.next_test_recommendation ?? panelScore.next_test_date),
        safety_overrides_active: Boolean(panelScore.safety_override_active ?? panelScore.safety_overrides_active ?? false),
        cross_marker_rules_active: toStringArray(result.cross_marker_rules_triggered ?? panelScore.cross_marker_rules_active),
        created_at: now,
      }, { onConflict: "panel_id" });
      if (psErr) throw new Error(`panel_scores upsert: ${psErr.message}`);
    }

    if (supplements.length) {
      const supRows = supplements.map((s: any) => ({
        panel_id,
        user_id: userId,
        supplement_name: s.supplement_name ?? s.name,
        tier: s.tier ?? 1,
        tier_label: s.tier_label,
        dose_amount: toIntSafe(s.dose_amount),
        dose_unit: s.dose_unit ?? null,
        dose_frequency: s.dose_frequency ?? null,
        dose_timing: s.dose_timing ?? s.timing ?? null,
        pair_with: s.pair_with,
        evidence_level: s.evidence_level,
        trigger_marker_id: toIntSafe(s.trigger_marker_id),
        trigger_zone: s.trigger_zone,
        drug_interaction_warning: s.drug_interaction_warning,
        is_premium_form: false,
        is_active: true,
        created_at: now,
      }));
      const { error: supErr } = await supabase.from("supplement_recommendations").insert(supRows);
      if (supErr) throw new Error(`supplement_recommendations insert: ${supErr.message}`);
    }

    await supabase.from("panels").update({ processing_status: "complete", approved_at: now }).eq("id", panel_id);

    return new Response(JSON.stringify({ success: true, panel_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("process-blood-report error:", err.message ?? err, err.stack);
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

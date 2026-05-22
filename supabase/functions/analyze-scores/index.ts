import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Inlined from docs/zenoho_analysis_scores_prompt_v1_0.js
// Source: zenoho_analysis_scores_prompt_v1_0 v1.0 — Stage 2 of 3
const SYSTEM_PROMPT = `
You are the Zenoho Blood Analysis Engine — Stage 2 (Scores).

Your function in this stage is to consume per-marker scoring results from
Stage 1 and compute aggregate scores: 9 system scores, the overall Zenoho
Health Score, 10 performance domain scores, and biological age. Stage 3
(recommendations) consumes your output along with Stage 1's output to
complete the wellness report.

You operate as a wellness companion, NOT a clinical advisor. You do NOT
diagnose disease, predict disease, prevent disease, treat disease, or
perform physiological monitoring for medical purposes.

Cross-marker rule modifications (PART 7 in the v1.2 source) have already
been applied to marker zone_score values by Stage 1. Do not re-apply
those rules. Use the marker_results provided as-is.

Return ONLY valid JSON. No preamble. No explanation. No markdown. No prose
outside the JSON's string fields. The JSON must validate against the
Stage 2 schema in PART 13 below.

==============================================================
PART 0: SAMD COMPLIANCE LOCK — READ FIRST
==============================================================

This part overrides every other part of this prompt. If any rule below
conflicts with any later rule, this part wins.

Source: zenoho_samd_compliance_guidelines_v1.0.md Parts 2.1, 2.2, 2.3, 2.4,
2.5, 3.1, 3.3, and 8.1.

A. FORBIDDEN PHRASING (do NOT emit in any string field)

  Category 1 — Diagnosis claims:
    - "You have <disease>"
    - "Your results indicate <disease>"
    - "This is consistent with <disease>"
    - "Diagnosis: <anything>"
    - "You are positive for <anything>"
    - "Your blood report shows <disease>"
    - "You are diabetic" / "You are pre-diabetic" / "You are hypothyroid" /
      "You are anaemic" / "You have PCOS" / any variant naming a condition
      as the user's

  Category 2 — Prediction claims:
    - "Your risk of <disease> is <percentage>"
    - "You are at high risk for <disease>"
    - "You will likely develop <disease>"
    - "Your biomarkers predict <disease>"
    - Any Framingham / ASCVD / QRISK / individual risk-score output
    - Any "your biological age means you will die earlier" framing

  Category 3 — Prevention claims:
    - "Take <X> to prevent <disease>"
    - "These changes will prevent <disease>"
    - "Following this protocol prevents <disease>"

  Category 4 — Treatment claims:
    - "Take <prescription drug>"
    - "Stop taking <prescription drug>"
    - "Change your <prescription drug> dose"
    - "This will treat <disease>"
    - "This will cure <disease>"
    - Any recommendation to initiate, stop, or change a prescription medication

  Category 5 — Physiological-monitoring claims:
    - "Monitor your <parameter> for <medical condition>"
    - "Your numbers indicate worsening <disease>"
    - Any real-time alerting tied to a medical event

B. REQUIRED REPLACEMENT PATTERNS (use these instead)

  For every flagged marker:
    1. State the user's value with unit and source lab.
    2. State the reference range with EXPLICIT attribution:
       "IFM functional range", "Endocrine Society sufficiency threshold",
       "ADA cutoff", "ICMR-INDIAB cohort distribution", "Zenoho Optimal
       range (stricter than lab reference)".
    3. State where the user's value falls, factually, without disease label.
       Acceptable: "above the Zenoho Optimal upper bound", "below the
       Endocrine Society sufficiency threshold", "within the ADA-defined
       range termed pre-diabetes".
       NOT acceptable: "you are pre-diabetic".
    4. Include physician_referral field for every flagged marker. The
       referral is explicit, not implied.
    5. Lifestyle and supplement foundations are framed as supportive of
       general wellness — not curative.

C. OPERATING MODE

  You are configured as a wellness companion. You explicitly cannot and do
  not: diagnose conditions, predict disease risk for the individual,
  recommend prescription medications, provide specific treatment for
  diagnosed conditions, or perform real-time medical assessment.

  If a user has a physician-diagnosed condition (passed in userProfile),
  your recommendations become MORE conservative, not less. You defer to
  the physician for clinical management and surface only wellness
  foundations.

D. DISCLAIMER FIELDS

  Every output JSON must include:
    - disclaimer_header (string): canonical header text. Set to the exact
      string in PART 13's schema definition. Renderer displays this above
      the report.
    - disclaimer_footer (string): canonical footer text. Set to the exact
      string in PART 13's schema definition. Renderer displays this below
      the report.

  These two strings are LITERAL — emit them verbatim. They are sourced
  from zenoho_samd_compliance_guidelines_v1.0.md Part 8.1.

E. SELF-CHECK BEFORE EMITTING

  Before emitting the JSON, scan every string field for any forbidden
  pattern in Section A above. If a forbidden pattern is detected, rewrite
  the offending string using the Section B replacement pattern. If
  rewriting is not possible without losing meaning, set the offending
  string to null and add an entry to compliance_flags[] with the field
  name and the violation category.

==============================================================
PART 1: HARD GATES — RUN BEFORE ANYTHING ELSE
==============================================================

These gates execute before any extraction or scoring. If any gate fires,
return only the gate-error JSON and stop.

GATE 1 — AGE UNDER 18 (HARD REFUSAL)

  Source: zenoho_supplement_framework_v1.1 Part 6; SaMD doc Part 7.

  If the lab report or userProfile indicates the patient is under 18 years
  of age on the collection date, return:

  {
    "gate_triggered": "AGE_UNDER_18",
    "error": "Zenoho does not process reports for users under 18.",
    "redirect": "signup_age_gate",
    "user_message": "Zenoho is a wellness platform for adults aged 18 and over. For health concerns in users under 18, please consult a paediatrician. We do not interpret blood reports for minors.",
    "disclaimer_footer": "<canonical footer per PART 13>"
  }

  Do not emit any marker analysis, supplement recommendations, or domain
  scores. Stop.

GATE 2 — PREGNANCY DETECTED (SUPPLEMENT BLOCK, MARKERS ANALYSED)

  Source: zenoho_supplement_framework_v1.1 Part 6 (pregnancy/breastfeeding
  policy); SaMD doc Part 2.4 (treatment claims).

  Pregnancy detection signals (any of):
    - userProfile.profileFlags.isPregnant === true
    - Lab report contains pregnancy-related markers or notations
      (e.g., beta-hCG positive, "pregnancy" in clinical notes)
    - Patient self-disclosed in profile

  If detected, you analyse markers and produce performance scoring as
  normal, BUT:
    - supplement_recommendations[] MUST be empty
    - supplement_block_reason MUST be "OBSTETRICIAN_SIGNOFF_REQUIRED"
    - Set pregnancy_gate_active = true in panel_metadata
    - Add a non-bypassable user_message: "Supplement recommendations are
      paused during pregnancy. Your physician or obstetrician is the
      right person to guide any nutritional supplementation. Once you
      confirm physician sign-off through the dedicated user flow, we can
      resume recommendations."
    - All marker narratives must reframe physician referral as
      "obstetrician or physician".
    - Skip hormone domain scoring entirely (set hormone domains to
      "PREGNANCY_SUPPRESSED" with score null).
    - Biological age cannot be calculated reliably during pregnancy —
      set bio_age fields to null with note "Biological age estimation
      paused during pregnancy."

GATE 3 — CRISIS DETECTION (PRIORITY OVERRIDE)

  Source: zenoho_samd_compliance_guidelines_v1.0.md Part 7.6.

  If the userProfile.intake_notes, attached free-text fields, or any
  report annotation contains indicators of:

    (a) Acute medical emergency (chest pain, severe shortness of breath,
        sudden weakness, severe headache, severe injury, fainting):
        -> Set crisis_detected = "ACUTE_MEDICAL"
        -> Set crisis_message = "If you are experiencing a medical emergency, please call 108 (national emergency services in India) or go to the nearest emergency room. Zenoho is a wellness platform and cannot help with acute medical concerns."
        -> Continue analysis but surface crisis_message at the top of the
          rendered output.

    (b) Mental health crisis indicators (suicidal ideation, self-harm
        thoughts, severe acute distress):
        -> Set crisis_detected = "MENTAL_HEALTH"
        -> Set crisis_message exactly as follows:
          "If you are in distress or thinking about harming yourself, please reach out now. You are not alone.\\n\\n• Tele-MANAS (24/7 Government of India helpline): 14416\\n• AASRA (24/7): +91 9820466726\\n• Vandrevala Foundation (24/7 voice + WhatsApp): +91 9999 666 555\\n\\nIf you or someone with you is in immediate danger, please call 112."
        -> Continue analysis but suppress all hormone, cortisol, and mood-
          related narrative content. Surface crisis_message at the top of
          the rendered output above all other content.

  Crisis detection is non-bypassable by any user action, profile flag,
  or platform configuration. The crisis_message text is a hard rule.
  Do not paraphrase. Do not soften. Do not localize without operator
  sign-off.

==============================================================
PART 5: SYSTEM SCORING (preserved from v1.0)
==============================================================

Calculate system scores using only TESTED markers in each system.
Normalize weights proportionally when markers are missing.

System weights (must sum to 100 when all systems tested):
  BLD=14%, GLU=18%, LVR=12%, KDN=10%, LPD=15%, VIT=11%, THY=10%, INF=5%, HRM=5%
  (Markers 41-43 Iron Panel — assign to VIT system weight.)

System score = weighted average of constituent marker scores within that
system.

Confidence per system:
  HIGH   = >=80% of system markers tested
  MEDIUM = 50-79% tested
  LOW    = <50% tested
  SKIP   = 0 markers tested (exclude from total score)

Zenoho Health Score = weighted average of all TESTED systems, normalised
                       to 0-100.

Health Level (1-10):
  1: 0-9, 2: 10-19, 3: 20-29, 4: 30-39, 5: 40-49,
  6: 50-59, 7: 60-69, 8: 70-79, 9: 80-89, 10: 90-100

==============================================================
PART 8: DOMAIN SCORING (preserved from v1.0; defers to performance-domains v1.6)
==============================================================

Compute 10 performance domain scores per zenoho_performance_domains_v1.6_FINAL.md
Part D.1 (Domain-Marker Matrix) and Part E (Scoring Algorithms).

The 10 domains:
  1. Biological Age (BA)         — cross-cutting
  2. Vitality & Strength (VS)
  3. Brain Sharpness (BS)
  4. Heart Engine (HE)
  5. Metabolic Power (MP)
  6. Recovery Capacity (RC)
  7. Detox Efficiency (DE)
  8. Endurance & Stamina (ES)
  9. Mood & Calm (MC)
 10. Immunity Strength (IS)

For each domain:
  DomainRaw = Sigma(MS_i x w_i) / Sigma(w_i)   [tested markers only]
  CoverageRatio = Sigma(w_i tested) / Sigma(w_i all-with-weight-in-domain)
  DomainScore = DomainRaw x CoverageRatio + 50 x (1 - CoverageRatio)
  Apply safety-override caps per Part 6.
  Apply cross-marker rule modifications per Part 7.

Skip domain if <40% of constituent markers tested -> set confidence "LOW"
and emit "INSUFFICIENT_COVERAGE" in domain.note.

Level: 1-10 scale, same mapping as Health Level in PART 5.

Biological Age formula (LOCKED — performance-domains v1.0.1 Appendix 3):
  BioAgeScore = 50 + ((ChronologicalAge - BioAge) / 15) x 50
  Bounded: 0 <= Score <= 100
  Age 60+ modifier: add +5 points.

BioAge cannot be calculated if:
  - >4 of the 6 primary BioAge markers missing
  - User is pregnant (PART 1 GATE 2)
  - User is under 18 (PART 1 GATE 1 — won't reach here)
  - hs-CRP > 10 sustained (acute-phase distorted; flag LOW confidence)

If BioAge is suppressed, emit biological_age = null with a "note" field
explaining the missing-coverage reason.

==============================================================
PART 13: OUTPUT JSON SCHEMA — STAGE 2 (SCORES) SLICE
==============================================================

Return EXACTLY this JSON structure. No other text. Field semantics inherit
from the canonical v1.2 schema; Stage 2 emits only the fields below.
Stage 1 (markers) and Stage 3 (recommendations) emit the remaining schema
fields in their own stages.

{
  "schema_version": "1.2",
  "stage": 2,
  "engine_version": "1.2",
  "generated_at": "ISO8601 timestamp",

  "disclaimer_header": "This report is wellness information, not a medical diagnosis. Please review with your physician — only a physician can interpret these results in the context of your full clinical picture.",
  "disclaimer_footer": "Zenoho is a wellness information platform. We do not provide medical diagnosis, treatment, prediction of disease, or physiological monitoring for medical purposes. For any specific medical concern, please consult a qualified physician.",

  "system_scores": [
    {
      "system_id": number,
      "system_name": "string",
      "raw_score": number,
      "system_weight": number,
      "weighted_contribution": number,
      "confidence": "HIGH" | "MEDIUM" | "LOW" | "SKIP",
      "markers_tested": number,
      "markers_available": number
    }
  ],

  "panel_score": {
    "zenoho_health_score": number,
    "health_level": number,
    "confidence": "HIGH" | "MEDIUM" | "LOW",
    "markers_tested": number,
    "markers_scoreable": number,
    "coverage_pct": number,
    "safety_override_active": boolean
  },

  "biological_age": {
    "chronological_age": number,
    "biological_age": number | null,
    "bio_age_gap": number | null,
    "bio_age_score": number | null,
    "bio_age_level": number | null,
    "confidence": "HIGH" | "MEDIUM" | "LOW" | "SUPPRESSED",
    "markers_included": number,
    "note": "string or null — required if biological_age is null"
  },

  "domain_scores": [
    {
      "domain_id": number,
      "domain_name": "string",
      "domain_code": "BA" | "VS" | "BS" | "HE" | "MP" | "RC" | "DE" | "ES" | "MC" | "IS",
      "raw_score": number | null,
      "level": number | null,
      "confidence": "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT_COVERAGE" | "PREGNANCY_SUPPRESSED",
      "primary_drivers": ["string"],
      "headline": "string — max 15 words, performance language, no disease names",
      "note": "string or null"
    }
  ],

  "compliance_flags": []
}

==============================================================
PART 14: EDGE CASES — STAGE 2 SUBSET
==============================================================

- If gate_triggered is "AGE_UNDER_18" from Stage 1: return empty Stage 2
  output (no system_scores, no panel_score, no biological_age, no
  domain_scores) — this panel should not have reached Stage 2.
- If pregnancy_gate_active is true: skip hormone domain scoring entirely
  (set hormone-related domains to confidence "PREGNANCY_SUPPRESSED" with
  raw_score and level set to null). Set biological_age fields to null
  with note "Biological age estimation paused during pregnancy."
- If a marker is in markers_not_tested[] from Stage 1, exclude it from
  current scoring; do not impute. Apply confidence weighting per PART 8.
- BioAge cannot be calculated if: >4 of the 6 primary BioAge markers
  missing, OR hs-CRP > 10 sustained (acute-phase distorted; flag LOW
  confidence). If suppressed, emit biological_age = null with explanatory
  note field.
- Skip a domain entirely if <40% of constituent markers tested -> set
  confidence "INSUFFICIENT_COVERAGE" and emit raw_score = null, level = null.
- If safety_overrides_triggered from Stage 1 affect a domain, cap that
  domain's raw_score at 50 regardless of calculated value.

==============================================================
PART 15: PROHIBITED LANGUAGE SELF-CHECK (FINAL STEP)
==============================================================

Before emitting the JSON, scan every string field for forbidden patterns
from PART 0 Section A. For each violation:
  - Rewrite using PART 0 Section B pattern if possible.
  - If rewriting changes meaning materially, set the field to null and
    add an entry to compliance_flags[] with the field name and
    violation_category.
  - Never emit a string containing a forbidden pattern.

Begin output with { and end with }. No other text. No markdown. No
preamble. No explanation outside the JSON's string fields.
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

function toNumSafe(v: any): number | null {
  if (v == null) return null;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

// Compute chronological age from date_of_birth
function chronologicalAge(dateOfBirth: string | null): number | null {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  const startMs = Date.now();
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

    // Read panel — verify markers_done status
    const { data: panel, error: panelErr } = await supabase
      .from("panels")
      .select("*")
      .eq("id", panel_id)
      .single();

    if (panelErr || !panel) {
      const msg = "Panel not found: " + (panelErr?.message ?? "unknown");
      return new Response(JSON.stringify({ error: msg }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (panel.processing_status !== "markers_done") {
      return new Response(JSON.stringify({
        error: `Panel not ready for scoring; current status: ${panel.processing_status}`,
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // FIRST ACTION: set analyzing_scores
    await supabase.from("panels").update({ processing_status: "analyzing_scores" }).eq("id", panel_id);
    console.log("[analyze-scores] Status set to analyzing_scores for panel:", panel_id);

    // Read marker_results ordered by marker_id
    const { data: markerResults, error: mrErr } = await supabase
      .from("marker_results")
      .select("marker_id, raw_marker_name, value, unit, zenoho_zone, zone_score, lab_error_flag, retest_required")
      .eq("panel_id", panel_id)
      .order("marker_id");

    if (mrErr) throw new Error("Failed to read marker_results: " + mrErr.message);
    if (!markerResults || markerResults.length === 0) {
      throw new Error("No marker_results found for panel — Stage 1 may not have completed");
    }

    // Read panel_scores row from Stage 1 (safety_overrides_active, cross_marker_rules_active)
    const { data: panelScoresRow } = await supabase
      .from("panel_scores")
      .select("safety_overrides_active, cross_marker_rules_active")
      .eq("panel_id", panel_id)
      .maybeSingle();

    // Read userProfile
    const { data: userProfile } = await supabase
      .from("users")
      .select("date_of_birth, gender, dietary_pattern, pregnancy_status, conditions")
      .eq("id", panel.user_id)
      .maybeSingle();

    const chronoAge = chronologicalAge(userProfile?.date_of_birth ?? null);
    const isPregnant = (userProfile?.pregnancy_status === "pregnant") || (panel.pregnancy_gate_active === true);

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) throw new Error("ANTHROPIC_API_KEY not set");

    // 148s abort
    const abortController = new AbortController();
    const timeoutHandle = setTimeout(() => {
      abortController.abort(new Error("Stage 2 (scores) exceeded 148-second limit"));
    }, 148_000);

    const userMessageText = `Compute system, domain, and biological age scores from these Stage 1 marker results.

Patient profile:
Age: ${chronoAge ?? "unknown"}
Sex: ${userProfile?.gender ?? "unknown"}
Pregnancy gate active: ${isPregnant}
Conservative mode active: ${panel.conservative_mode_active ?? false}
Dietary pattern: ${userProfile?.dietary_pattern ?? "unknown"}
Disclosed conditions: ${(userProfile?.conditions ?? []).join(", ") || "none disclosed"}

Safety overrides from Stage 1:
safety_overrides_active: ${panelScoresRow?.safety_overrides_active ?? false}
cross_marker_rules_active: ${JSON.stringify(panelScoresRow?.cross_marker_rules_active ?? [])}

Marker results from Stage 1 (zone_score already adjusted by cross-marker rules):
${JSON.stringify(markerResults, null, 2)}

Return Stage 2 JSON only.`;

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
          max_tokens: 4000,
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
      await supabase.from("panels").update({
        processing_status: "failed",
        processing_error: "Stage 2 (scores) exceeded 148-second limit",
      }).eq("id", panel_id);
      throw fetchErr;
    } finally {
      clearTimeout(timeoutHandle);
    }

    if (!claudeRes.ok) throw new Error("Claude API error: " + (await claudeRes.text()));

    const claudeData = await claudeRes.json();
    console.log("[analyze-scores] Cache stats:", JSON.stringify(claudeData.usage));

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

    const userId = panel.user_id;
    const now = new Date().toISOString();

    // --- Write system_scores ---
    const systemScores: any[] = result.system_scores ?? [];
    if (systemScores.length > 0) {
      const systemRows = systemScores
        .filter((s: any) => s.system_id != null && s.confidence !== "SKIP")
        .map((s: any) => ({
          panel_id,
          user_id: userId,
          system_id: toIntSafe(s.system_id),
          system_name: s.system_name ?? null,
          raw_score: toNumSafe(s.raw_score),
          system_weight: toNumSafe(s.system_weight),
          weighted_contribution: toNumSafe(s.weighted_contribution),
          confidence: s.confidence ?? null,
          markers_tested: toIntSafe(s.markers_tested),
          markers_available: toIntSafe(s.markers_available),
          created_at: now,
        }));

      if (systemRows.length > 0) {
        const { error: sysErr } = await supabase
          .from("system_scores")
          .upsert(systemRows, { onConflict: "panel_id,system_id" });
        if (sysErr) throw new Error("system_scores upsert failed: " + sysErr.message);
      }
    }

    // --- Write domain_scores ---
    const domainScores: any[] = result.domain_scores ?? [];
    if (domainScores.length > 0) {
      const domainRows = domainScores
        .filter((d: any) => d.domain_id != null)
        .map((d: any) => ({
          panel_id,
          user_id: userId,
          domain_id: toIntSafe(d.domain_id),
          domain_name: d.domain_name ?? null,
          raw_score: toNumSafe(d.raw_score),
          level: toIntSafe(d.level),
          confidence: d.confidence ?? null,
          created_at: now,
        }));

      if (domainRows.length > 0) {
        const { error: domErr } = await supabase
          .from("domain_scores")
          .upsert(domainRows, { onConflict: "panel_id,domain_id" });
        if (domErr) throw new Error("domain_scores upsert failed: " + domErr.message);
      }
    }

    // --- Update panel_scores (upsert — Stage 1 row already exists) ---
    const ps = result.panel_score ?? {};
    const ba = result.biological_age ?? {};
    const stage1SafetyActive = panelScoresRow?.safety_overrides_active ?? false;

    const { error: psErr } = await supabase.from("panel_scores").upsert({
      panel_id,
      user_id: userId,
      b_score: toNumSafe(ps.zenoho_health_score),
      b_score_confidence: ps.confidence ?? null,
      bio_age_estimated: toIntSafe(ba.biological_age),
      bio_age_chronological: toIntSafe(ba.chronological_age ?? chronoAge),
      bio_age_gap: toIntSafe(ba.bio_age_gap),
      bio_age_confidence: ba.confidence ?? null,
      safety_overrides_active: stage1SafetyActive || (ps.safety_override_active ?? false),
      cross_marker_rules_active: panelScoresRow?.cross_marker_rules_active ?? [],
      created_at: now,
    }, { onConflict: "panel_id" });

    if (psErr) throw new Error("panel_scores upsert failed: " + psErr.message);

    // FINAL ACTION: scores_done
    await supabase.from("panels").update({
      processing_status: "scores_done",
      processing_model: "claude-sonnet-4-6",
    }).eq("id", panel_id);
    console.log("[analyze-scores] Stage 2 complete — status set to scores_done for panel:", panel_id);

    const elapsedMs = Date.now() - startMs;

    return new Response(JSON.stringify({
      success: true,
      panel_id,
      system_scores_count: systemScores.filter((s: any) => s.confidence !== "SKIP").length,
      domain_scores_count: domainScores.length,
      zenoho_health_score: toNumSafe(ps.zenoho_health_score),
      biological_age: toIntSafe(ba.biological_age),
      elapsed_ms: elapsedMs,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("[analyze-scores] error:", err.message ?? err, err.stack);
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

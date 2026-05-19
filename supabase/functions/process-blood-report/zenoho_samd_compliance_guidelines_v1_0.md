# Zenoho SaMD Compliance Guidelines v1.0

**Document type:** Regulatory line-drawing for Zenoho's AI engine output
**Status:** Canonical — defines what Zenoho's AI engine can and cannot say without crossing into Software as a Medical Device territory
**Date:** May 11, 2026
**Owner:** Zenoho Health Private Limited
**Companion documents:**
- `zenoho_supplement_framework_v1_0.md` — supplement recommendation framework (Part 8 references this document)
- `zenoho_performance_domains_v1_0_1_FINAL.md` — domain protocols whose output language must conform to this document
- `zenoho_marker_registry_v1.1.5_FINAL.md` — biomarker thresholds; this document governs how thresholds are surfaced to users

---

## Document purpose

This document defines the regulatory line between **wellness software** (outside India's Medical Devices Rules 2017) and **Software as a Medical Device or SaMD** (inside MDR 2017 and subject to CDSCO licensing). It then specifies exact phrasing rules, content boundaries, and process gates that keep Zenoho on the wellness side of the line.

The stakes are not theoretical:
- A Class C or Class D SaMD requires CDSCO central licensing (Form MD-9 for manufacturing, Form MD-15 for import) with extensive technical documentation, clinical evaluation, quality management system, post-market surveillance, and cybersecurity controls.
- A Class A or Class B SaMD requires State Licensing Authority licensing (Form MD-5) with substantial documentation requirements.
- Operating a SaMD without licensing is an offence under the Drugs and Cosmetics Act 1940. Penalties include product seizure, business shutdown, and personal liability for directors.
- Zenoho's bootstrapped budget (<₹1 crore) and six-month-to-revenue timeline cannot absorb a CDSCO licensing process or an enforcement action.

The document is intentionally conservative. Where the regulatory line is ambiguous, this document errs toward the wellness side rather than the SaMD side. This costs some user-experience smoothness (less prescriptive recommendations, more "consult your physician" friction) in exchange for regulatory safety and lower future liability.

This document supersedes any conflicting language elsewhere in the Zenoho corpus. Where the analysis prompt, performance domains protocols, or chatbot specifications generate language inconsistent with these guidelines, those documents are corrected to conform.


---

## Part 1: The regulatory landscape (May 2026)

### 1.1 The governing framework

In India, software performing a medical purpose is regulated under the **Medical Devices Rules, 2017 (MDR 2017)**, framed under the Drugs and Cosmetics Act, 1940. The Central Drugs Standard Control Organisation (CDSCO) is the central regulator; State Licensing Authorities (SLAs) handle Class A and Class B device licensing.

The current authoritative document on software classification is the **CDSCO Draft Guidance on Medical Device Software, dated October 21, 2025**. This draft superseded earlier 2022 guidance and stakeholder consultation has run its course. While still labeled "draft," it represents the operative regulatory intent and is the document to which Zenoho's compliance posture must align.

### 1.2 Two categories of medical software under MDR 2017

The October 2025 Draft Guidance defines two categories:

**Software in a Medical Device (SiMD):** Software integrated within a hardware medical device that enables or controls its functioning. Embedded firmware in pacemakers, software driving insulin pumps, operating systems integral to diagnostic analysers. SiMD does not independently perform a medical purpose; it assumes the risk classification of the parent hardware device.

**Software as a Medical Device (SaMD):** Standalone software intended to perform one or more medical purposes without being part of a hardware medical device, operating on general-purpose hardware. AI-powered radiology tools, computer-aided detection software, mobile applications intended to monitor or analyse medical conditions. SaMD must be classified independently based on its intended use and clinical impact.

**Zenoho's relevant category is SaMD.** The blood-report interpretation engine, supplement recommendation engine, WhatsApp AI coach, and corporate wellness dashboards all run as standalone software on general-purpose hardware (cloud servers, user mobile devices, user browsers). If any of them performs a medical purpose, they fall under SaMD classification.

### 1.3 The wellness carve-out — the line Zenoho must stay on

The October 2025 Draft Guidance is explicit on what is NOT SaMD:

> "Software performing a medical purpose — diagnosis, prediction, prevention, treatment or physiological monitoring — will fall within the MDR regime. **Lifestyle, wellness and fitness applications remain outside the scope.**"
> — CDSCO Draft Guidance on Medical Device Software, October 21, 2025

This is the regulatory carve-out Zenoho operates within. Software that is genuinely lifestyle, wellness, or fitness — supporting user awareness and healthy behavior without diagnosing, predicting disease, recommending specific treatments, or providing physiological monitoring for medical purposes — is outside the MDR regime entirely.

The wellness carve-out is not a free pass. Whether software qualifies for it depends on:
- **The intended use** as documented in user-facing claims, marketing, terms of service, and the software's actual outputs;
- **The specificity of the output** (a TSH range with "discuss with your physician" is different from "you have hypothyroidism");
- **The downstream consequence** of the output (whether the user is expected to take specific medical action based on the software alone);
- **The clinical situation** (a fitness app for healthy adults is different from an app marketed to diabetic users).

CDSCO can — and does — look past marketing claims to functional intent. Calling something "wellness" while it functionally diagnoses disease is a violation, not a compliance strategy.

### 1.4 Risk classification (when software DOES qualify as SaMD)

When software is determined to be SaMD, the October 2025 Draft Guidance classifies it on two axes:

1. **Significance of information provided by the software:** Treats or diagnoses → Drives clinical management → Informs clinical management.
2. **Seriousness of the healthcare situation:** Critical → Serious → Non-serious.

The intersection produces Class A (low risk) through Class D (highest risk):
- **Class A and B:** Licensed by State Licensing Authority (Form MD-5). Less stringent but still substantial documentation.
- **Class C and D:** Licensed by CDSCO central (Form MD-9 for manufacture, Form MD-15 for import). Heavy documentation, clinical evaluation, QMS, post-market surveillance, cybersecurity controls.

### 1.5 AI/ML and the Algorithm Change Protocol

The October 2025 Draft Guidance introduces the concept of an **Algorithm Change Protocol (ACP)** for AI/ML-based SaMD. This recognizes that AI/ML systems evolve over time as models are retrained, and that traditional pre-market approval for static software doesn't fit a system whose behavior changes with new training data.

The ACP requires SaMD developers to:
- Pre-specify the types of algorithm changes anticipated;
- Define validation and verification protocols for changes;
- Maintain post-market surveillance to detect performance drift;
- Notify CDSCO of changes within the protocol scope.

This is directly relevant to Zenoho. The platform's AI engine is fundamentally a Claude-powered LLM whose behavior changes with every Anthropic model update. If Zenoho were classified as SaMD, the ACP requirement would apply, and managing the regulatory burden of every Claude model update would be prohibitive.

This is one of the strongest practical reasons for Zenoho to stay on the wellness side of the line. The wellness carve-out exempts the platform from ACP entirely.


---

## Part 2: The five SaMD-trigger claims and how Zenoho avoids each

The October 2025 Draft Guidance identifies five categories of "medical purpose" that pull software into MDR regime: **diagnosis, prediction, prevention, treatment, and physiological monitoring**. This Part defines, for each, the line Zenoho stays on and the exact phrasing rules.

### 2.1 Diagnosis — claims that a user has a specific disease or condition

**SaMD-triggering language (do NOT use):**
- "You have hypothyroidism."
- "Your results indicate Type 2 diabetes."
- "This is consistent with PCOS."
- "Diagnosis: Vitamin D deficiency."
- "You are positive for [condition]."
- "Your blood report shows [disease]."

**Wellness-compliant language (USE):**
- "Your TSH is outside the IFM-functional optimal range (0.5–2.5 mIU/L). The clinical reference range is wider (0.4–4.0 mIU/L). Please discuss your TSH with your physician — only a physician can interpret thyroid function in the context of your full clinical picture."
- "Your fasting glucose is 112 mg/dL. The ADA cutoff for pre-diabetes is 100 mg/dL and for diabetes is 126 mg/dL. Your physician is the right person to confirm what this means for you and whether additional testing (HbA1c, OGTT) is needed."
- "Your 25(OH)D is 18 ng/mL, which is below the Endocrine Society sufficiency threshold (≥30 ng/mL). Many adults in India have similar values. Discuss with your physician whether supplementation is appropriate for you."

**The pattern:**
- State the user's number.
- State the reference range with attribution (whose range, e.g., IFM, Endocrine Society, ADA, ICMR).
- Describe where the user falls relative to the range, factually.
- Refer to the physician for diagnosis, not the platform.

**Critical principle:** Zenoho reports numbers and contextualizes them against published ranges. Zenoho never names a disease as a user's diagnosis.

### 2.2 Prediction — claims that a user will or is likely to develop a condition

**SaMD-triggering language (do NOT use):**
- "Your biomarkers predict a 35% risk of developing diabetes in the next 5 years."
- "Based on your data, you are at high risk for cardiovascular disease."
- "You will likely develop hypertension within 2 years."
- "Your inflammation markers predict early-onset Alzheimer's risk."

**The reason this triggers SaMD:** Disease prediction is explicitly named in the October 2025 Draft Guidance as a medical purpose. Probabilistic disease-risk scoring is one of the clearest paths from wellness to SaMD classification.

**Wellness-compliant language (USE):**
- "Your hs-CRP is 4.2 mg/L, above the 'low cardiovascular risk' range (<1 mg/L) used by many cardiology professional bodies. Inflammation is one of several factors physicians consider when assessing cardiovascular health. A conversation with your physician about your overall cardiovascular picture would be valuable."
- "Your HbA1c of 5.8% sits in what the ADA terms 'pre-diabetes' (5.7–6.4%). Many people with values in this range never progress to diabetes — and many do. Your physician can discuss what this means for your specific situation and whether lifestyle changes, additional testing, or further monitoring is appropriate."
- "Your Lp(a) level is 45 mg/dL. Lp(a) is a marker some cardiologists track because elevated levels are associated with cardiovascular risk in research populations. Discuss with your physician whether Lp(a) is relevant to your overall risk picture."

**The pattern:**
- Describe the marker and its general clinical relevance from published sources.
- Avoid making a probabilistic prediction about the specific user.
- Refer prediction questions to the physician.

**What Zenoho specifically does NOT compute or surface:**
- Framingham Risk Score, ASCVD risk calculator, QRISK, or any quantitative disease-risk score for the individual user.
- Biological age "risk of mortality" projections at the individual level.
- Any percentage-based "your risk of X is Y%" output.

**Note on biological age:** The framework can surface biological age estimates (Klemera-Doubal, PhenoAge) because these are biomarker-derived summary metrics, not disease predictions. The output must be framed as "your biological age estimate by this method is X" — not "your biological age means you will die earlier."


### 2.3 Prevention — claims that Zenoho's recommendations prevent disease

**SaMD-triggering language (do NOT use):**
- "Take this supplement to prevent diabetes."
- "These lifestyle changes will prevent heart disease."
- "Following this protocol prevents osteoporosis."
- "Zenoho prevents cognitive decline."

**Wellness-compliant language (USE):**
- "Magnesium adequacy supports overall metabolic health. Research populations with adequate magnesium intake tend to have better insulin sensitivity."
- "Strength training is associated with better bone mineral density in published research."
- "Sleep quality is one of many lifestyle foundations associated with overall health."

**The pattern:**
- "Supports" not "prevents."
- "Associated with" not "causes."
- "May help maintain" not "will prevent."
- Avoid making the recommendation the cause of a non-disease outcome.

This is consistent with FSSAI Regulation 2.10.5 for nutraceutical claims, which restricts disease-prevention claims to those specifically permitted by the regulator.

### 2.4 Treatment — claims that Zenoho recommends specific therapy for a condition

**SaMD-triggering language (do NOT use):**
- "Take levothyroxine 50 mcg for your hypothyroidism."
- "Start metformin to manage your pre-diabetes."
- "Use this supplement to treat your anxiety."
- "Cure your insomnia with this protocol."

**Wellness-compliant language (USE):**
- "If your physician has diagnosed hypothyroidism and is managing your treatment, the following nutritional foundations support thyroid function: selenium 200 mcg/day, adequate iodine from diet, and consistent sleep timing. Always discuss any supplement additions with your physician, since some can affect thyroid medication."
- "Lifestyle foundations that research associates with metabolic flexibility include consistent sleep timing, post-meal walks, strength training 2–3× weekly, and minimizing late-night eating. These are general wellness practices, not a treatment for a diagnosed condition."

**The pattern:**
- Frame supplement and lifestyle recommendations as supportive of general health.
- Reserve disease-treatment claims for licensed practitioners (physicians, registered dietitians acting in clinical roles).
- Never recommend prescription medications — neither initiation, dose, nor discontinuation.

**Critical operational rule:** If a user reports that they have been diagnosed with a condition, Zenoho's response shifts to "your physician is managing this; here are wellness foundations that may support overall health; discuss any changes with your physician." Zenoho does not become a more aggressive treatment recommender for diagnosed users; if anything, it becomes more conservative.

### 2.5 Physiological monitoring — claims that Zenoho monitors body function for medical purposes

This is the trickiest category for Zenoho because the platform does ingest physiological data (blood reports, Terra wearable data) and does report on physiological state. The question is whether the monitoring is for medical purposes.

**SaMD-triggering monitoring (do NOT do):**
- Continuous monitoring of a physiological parameter for the purpose of detecting acute medical events (arrhythmia detection, hypoglycemia alerting, hypoxemia alarming).
- Trend monitoring with alerts that recommend specific medical action.
- Monitoring that the user is intended to rely on instead of physician follow-up.

**Wellness-compliant monitoring (do):**
- Periodic blood-report interpretation with general wellness context.
- Trend visualization (your TSH over six months, your hs-CRP over four reports) with "discuss any changes with your physician" framing.
- Wearable data summaries (your sleep duration this week, your HRV trend) framed as lifestyle awareness, not medical assessment.

**The pattern for wearables specifically:** Following the FDA's January 2026 wellness guidance update (which India's regulatory bodies have not formally adopted but which sets international tone), non-invasive sensing for wellness purposes is generally outside medical-device regulation, provided the outputs are framed as wellness information rather than medical diagnosis or treatment guidance. Terra wearable data flowing through Zenoho is wellness data, surfaced as wellness information.

**What changes if Zenoho adds real-time alerting:** Any feature that generates alerts based on physiological data — "your heart rate is dangerously high," "your sleep apnea events are increasing" — almost certainly crosses into SaMD. Zenoho's v1 does not include real-time medical-alerting features for this reason. If such features are considered for future versions, they require explicit SaMD classification review.


---

## Part 3: Surface-by-surface compliance rules

This Part audits each user-facing Zenoho surface against the Part 2 rules. The analysis prompt and build chat must enforce these rules.

### 3.1 Blood report interpretation output

**The dominant surface.** A user uploads a blood report; Zenoho's AI engine analyzes the markers against the registry, generates a report.

**Required structure for every marker output:**
1. **User's value** with units and lab name/date.
2. **Reference range** with explicit attribution ("IFM-functional range," "Endocrine Society sufficiency threshold," "ADA cutoff," "ICMR-INDIAB cohort distribution").
3. **Where the user falls** factually ("above the IFM range," "below the Endocrine Society sufficiency threshold," "within the ADA-defined pre-diabetic range").
4. **General wellness context** — what the marker measures and why people care, in plain language, with at least one citation.
5. **Physician-referral language** — explicit, every marker, never "implied" or buried.
6. **Lifestyle and nutritional foundations** that research associates with the marker's improvement — framed as supportive, not curative.

**Prohibited language anywhere in the output:**
- "You have [disease name]."
- "Your [marker] indicates [disease name]."
- "Risk of [disease] is [percentage]."
- "Take [prescription drug]."
- "Stop taking [prescription drug]."
- "This will prevent [disease]."
- "This will treat [disease]."

**Required language somewhere in the output:**
- A header disclaimer: "This report is wellness information, not a medical diagnosis. Please review with your physician — only a physician can interpret these results in the context of your full clinical picture."
- A footer reminder: "For any specific medical concern, please consult a qualified physician. Zenoho does not provide diagnosis or treatment."

### 3.2 Supplement recommendation output

The supplement framework v1.0 already encodes most of the compliance posture; this section restates the SaMD-specific rules:

- Recommendations are framed as supporting general wellness, not treating disease.
- Tier 1 / Tier 2 / Tier 3 evidence labels appear with every recommendation (consistent with framework Part 2).
- Contraindication checks run before display (consistent with framework Part 5).
- For users with diagnosed conditions, supplement recommendations are gated behind "discuss with your physician" language; the platform does not autonomously recommend supplements as treatment.
- Prescription medications are never recommended for initiation or discontinuation.

### 3.3 WhatsApp AI coach conversational outputs

This is the highest-risk surface for SaMD drift because conversational AI tends to be more prescriptive than structured reports. Specific rules:

- The coach is configured as a wellness companion, not a clinical advisor. System prompt explicitly forbids: diagnosing conditions, predicting disease risk, recommending prescription medications, providing specific treatment for diagnosed conditions, performing real-time medical assessment.
- For user questions like "do I have hypothyroidism?" — coach response: "I can't diagnose conditions, and only a physician can interpret your numbers in your full clinical context. What I can tell you is what your TSH number is and how it compares to commonly-used reference ranges. For the diagnosis question, please book a consultation with your physician."
- For user questions like "should I stop my levothyroxine?" — coach response: "Never make changes to prescription medications without consulting your physician. If you have concerns about your current medication or dosage, please book a conversation with your physician."
- For user questions like "am I going to get diabetes?" — coach response: "I can't predict whether you will or won't develop diabetes. What I can do is share what your current markers show against published reference ranges, and discuss lifestyle foundations that research associates with metabolic health. The 'will I get diabetes' question is one for your physician."

The chatbot spec (v1.7, deferred) will encode these rules in the system prompt explicitly.

### 3.4 Corporate wellness dashboard outputs

B2B dashboards have an additional consideration: they are seen by HR teams and managers, not just the individual employee whose data is shown. SaMD considerations:

- Dashboards must aggregate data such that individual employees cannot be identified except by themselves. No "Employee 5 has hypothyroidism" outputs.
- Aggregate-level outputs are wellness information for the organization, not medical guidance.
- The organization's HR team should not be put in the position of making medical decisions based on Zenoho dashboard data. Dashboards surface wellness trends and supplementation patterns at the aggregate level.

### 3.5 Marketing copy, website, terms of service

Critical because CDSCO can look at marketing claims when deciding whether software is SaMD:

- Marketing must not promise diagnosis, prediction, prevention of specific diseases, or treatment of specific conditions.
- "Understand your health" is fine. "Diagnose your hormones" is not.
- "Optimize your supplements based on your blood work" is fine. "Treat your fatigue and brain fog" is closer to the line and should be avoided.
- "Predictive health insights" is dangerous language — implies prediction (a SaMD trigger). Use "personalized wellness insights" instead.
- "AI-powered health intelligence" is fine. "AI-powered medical diagnosis" is SaMD-triggering.
- Terms of Service must contain explicit disclaimer: "Zenoho is a wellness information platform. It is not a medical device and does not provide medical diagnosis, treatment, prediction of disease, or physiological monitoring for medical purposes. For any medical concern, please consult a qualified physician licensed to practice in India."


---

## Part 4: The new-feature decision tree

Any new feature considered for Zenoho — by the founder, by future engineering hires, by AI-engine prompt updates — must be evaluated against this decision tree before being shipped. The tree exists because the build chat (Bolt) is currently shipping fast, and a SaMD-triggering feature could be deployed in days if no compliance gate exists.

### Step 1 — Does this feature output information about a specific user's health?

- **No** (it's authentication, payment, content delivery, search): Outside SaMD scope. Ship.
- **Yes:** Continue to Step 2.

### Step 2 — What kind of information does it output?

- **Educational content** (general health information not tied to user's specific data): Outside SaMD scope. Ship.
- **User's biomarker values with context**: Continue to Step 3 (this is Zenoho's core function and stays within wellness if rules are followed).
- **Aggregate trends, wellness patterns, lifestyle suggestions**: Outside SaMD scope (wellness). Ship after style review.
- **Anything else listed below**: STOP — review required before shipping.

### Step 3 — Does the output do any of the following?

- Name a specific disease as the user's diagnosis ("you have X")?
- Predict probability of developing a disease for the specific user?
- Recommend initiation, dose change, or discontinuation of a prescription medication?
- Provide specific treatment for a named diagnosed condition (beyond wellness foundations)?
- Generate real-time alerts based on physiological data?
- Aggregate physiological monitoring for the purpose of detecting medical events?

If **YES** to any: This feature triggers SaMD classification. Do NOT ship without explicit regulatory review and either: (a) reformulating the feature to remove the SaMD trigger, or (b) accepting SaMD classification and initiating CDSCO licensing process.

If **NO** to all: Feature is within wellness scope. Continue to Step 4.

### Step 4 — Style and language review

Even features within wellness scope must conform to the Part 2 phrasing rules. Before shipping:

- Audit user-facing output against Part 2.1 (diagnosis language), Part 2.2 (prediction language), Part 2.3 (prevention language), Part 2.4 (treatment language), Part 2.5 (monitoring language).
- Verify required disclaimer language is present (Part 3.1 header and footer language).
- Verify "discuss with your physician" referral is present where any biomarker is interpreted.
- Verify no prescription medication is named for initiation or change.

If all four pass: Ship.

### Step 5 — Document the decision

Every new feature reviewed against this tree gets a one-paragraph note in a running compliance log: feature name, date, decision tree outcome, any rephrasing required, who reviewed. This log is the audit trail if CDSCO or any other party ever asks how Zenoho determined compliance for a specific feature.


---

## Part 5: Algorithm Change Protocol (defensive skeleton)

This Part exists for two scenarios:
1. CDSCO interprets Zenoho's AI engine as SaMD despite the wellness-side compliance posture, and Zenoho needs to demonstrate ACP-compliance in defense.
2. Zenoho voluntarily seeks SaMD classification in the future (e.g., to enable diagnostic features for B2B clinical-partnership customers).

Even in the wellness-side compliance posture, having ACP-skeleton documentation is a defensive asset. CDSCO is more likely to accept a wellness-side classification from a company that demonstrates it has thought rigorously about AI/ML governance than from one that hasn't.

### 5.1 What an ACP is

The CDSCO October 2025 Draft Guidance introduces ACP for AI/ML-based SaMD to address the reality that AI/ML systems change over time as models are retrained, prompts are updated, or new data is incorporated. An ACP pre-specifies:
- What types of changes are anticipated;
- Validation and verification protocols for each change type;
- Performance monitoring criteria;
- Notification and reporting protocols to CDSCO.

The conceptual lineage is the FDA's predetermined change control plan (PCCP) for AI/ML SaMD, which has been operative in the US for several years.

### 5.2 Zenoho's AI engine change types

For Zenoho's specific AI engine (Claude-powered LLM with custom prompts running against the canonical document corpus), the relevant change types are:

**Change Type A: Anthropic model upgrade.** When Anthropic releases a new Claude model (Opus 4.8, Sonnet 5, etc.), Zenoho may transition production traffic to the new model. The model's behavior may change subtly across thousands of dimensions.

**Change Type B: System prompt revision.** Zenoho's analysis prompt v1.0.1 (and future versions) is the primary control surface for AI behavior. Revisions are anticipated as the canonical document corpus evolves.

**Change Type C: Canonical document update.** The marker registry, performance domains, supplement framework, or this SaMD guidelines document is revised. The AI engine consumes these documents and its behavior changes as a result.

**Change Type D: Retrieval-augmented generation (RAG) corpus update.** Future versions of Zenoho may add a RAG layer that retrieves from a knowledge base. Updates to that knowledge base are changes.

**Change Type E: New tool / new feature integration.** Adding a new capability (image upload of a wearable screenshot, voice input) is a behavior change.

### 5.3 Pre-specified validation protocols per change type

For each change type, the validation protocol that runs before the change reaches production:

**For Type A (Anthropic model upgrade):**
- Run a frozen test set of 50 representative blood-report interpretations through both old and new model.
- Compare outputs for: (1) presence of required disclaimers, (2) absence of SaMD-triggering language, (3) supplement-recommendation conformance to framework Part 3, (4) tier-label correctness, (5) contraindication-matrix enforcement.
- Any regression in compliance behavior blocks promotion to production until resolved.

**For Type B (prompt revision):**
- Same test set as Type A.
- Additionally, regression tests for any behaviors specifically targeted by the prompt change.
- Diff review by a human reviewer before promotion.

**For Type C (canonical document update):**
- Identify which prompts and which outputs the document affects.
- Run relevant subset of test cases through current AI engine with new document.
- Compliance audit specifically focused on changed content.

**For Type D (RAG corpus update):** [reserved for future when RAG is implemented]

**For Type E (new feature):** Decision tree from Part 4 of this document, plus validation appropriate to the feature.

### 5.4 Performance monitoring (post-deployment)

After any change reaches production, the following monitoring continues:

- **Output sampling:** Random 1% of production outputs are sampled and audited weekly for SaMD-trigger drift, disclaimer presence, recommendation-framework conformance.
- **User-reported issues:** Any user feedback indicating the platform "diagnosed" them, "predicted disease," or "told them to take prescription medication" is investigated within 48 hours and prompts an immediate audit of the AI engine's recent outputs.
- **Anthropic model behavior changes:** When Anthropic publishes model cards, release notes, or behavioral updates, the SaMD compliance team reviews them for relevance to Zenoho's compliance posture.

### 5.5 Notification posture

In the current wellness-side compliance posture, Zenoho does not notify CDSCO of changes because Zenoho is not SaMD-classified. If at any point Zenoho is required (or chooses) to be SaMD-classified, the notification posture would shift to:

- Changes within pre-specified ACP scope: notify CDSCO within 30 days of deployment.
- Changes outside pre-specified ACP scope: pre-deployment notification and approval.


---

## Part 6: Audit of existing canonical documents against this framework

This Part audits the existing Zenoho corpus (v1.0.1 performance domains, supplement framework v1.0, marker registry v1.1.5) against the SaMD rules in Parts 2 and 3, and flags items requiring revision.

### 6.1 Performance domains v1.0.1 — items to audit

Specific phrases that the Pass 1 + Pass 2 verification work flagged or that this SaMD review newly flags:

- **Biological age language** — Where the protocol surfaces "your biological age is X years older than your chronological age," verify the framing is metric-reporting, not mortality-prediction. Suggested rephrase: "Your Klemera-Doubal biological age estimate is X. This is one of several biomarker-derived summary metrics. Discuss with your physician if you want clinical context."

- **Thyroid protocol IFM range language** — Where v1.0.1 says "Your TSH is outside optimal," ensure the output specifies whose "optimal" — IFM functional-range optimal vs. clinical reference range. Without attribution, the language can imply Zenoho is making a clinical judgment.

- **Glucose/HbA1c protocol** — Verify no language saying "you are pre-diabetic" or "you are diabetic" — these are diagnoses. Acceptable: "Your HbA1c sits within the ADA-defined range termed pre-diabetes."

- **Lipid protocol Lp(a) language** — Verify framing is "elevated relative to research populations," not "you are at high cardiovascular risk." Particularly important given Indian population's ~25% baseline elevated-Lp(a) prevalence — surfacing risk language to a quarter of the user base is high-volume SaMD exposure.

- **Inflammation hsCRP language** — Same pattern: "above the low-risk reference range" not "you are at high inflammatory disease risk."

**Recommended action:** The v1.6 patch document (consolidating Pass 1+2+3+3B+4 changes) should include a dedicated section on SaMD-language audit, with specific find-and-replace patches.

### 6.2 Supplement framework v1.0 — already compliant by design

The framework v1.0 already incorporates SaMD-friendly framing:
- Recommendations are framed as supporting wellness, not treating disease (Part 2.3 of this document).
- Tier 1 / Tier 2 / Tier 3 labels include "support" language, not "cure/treat" language.
- Contraindication matrix and pregnancy policy explicitly defer to physician oversight.
- Advanced/Experimental Mode includes "physician consultation strongly recommended" gates.

**No audit-driven changes required for framework v1.0 from a SaMD perspective.** Future versions adding Part 3 with full supplement library must conform to these same standards.

### 6.3 Marker registry v1.1.5 — neutral by nature

The marker registry is a reference document, not a user-facing surface. Its content (marker definitions, threshold ranges, source attribution) is wellness-compliant by nature. The SaMD considerations arise in how the registry's content is surfaced to users, which is governed by the performance domains protocols and the analysis prompt — not by the registry itself.

**No audit-driven changes required for the marker registry.**

### 6.4 Analysis prompt — primary control surface

The analysis prompt (v1.0.1, soon v1.2) is the primary place where SaMD-trigger language is either generated or prevented. The prompt must:

- Explicitly forbid the prompt-violating phrases listed in Part 2.1, 2.2, 2.3, 2.4, 2.5.
- Explicitly require the disclaimer language listed in Part 3.1.
- Configure the AI engine as wellness companion, not clinical advisor.
- Provide examples of compliant output formatting.

**Recommended action:** When the analysis prompt is revised to v1.2 (after Pass 3 and Pass 3B complete), incorporate a dedicated "SaMD compliance" section at the top of the prompt that the AI engine reads before every interpretation.


---

## Part 7: Edge cases and judgment calls

This Part documents the harder questions where the regulatory line is genuinely ambiguous, and Zenoho's chosen interpretation.

### 7.1 "Your TSH is outside optimal range" — is this diagnosis?

**The question:** When Zenoho says "your TSH is 5.2 mIU/L, which is outside the IFM-functional optimal range," is that diagnosis of thyroid dysfunction or wellness information?

**Zenoho's position:** This is wellness information, provided that:
- The range is attributed to its source (IFM functional optimum, not Zenoho's authority).
- The clinical reference range (0.4–4.0 mIU/L) is shown alongside the functional range for context.
- The output is followed by physician-referral language.
- No disease name is attached.

**Reasoning:** Reporting a number against a published range is analogous to a fitness app saying "your resting heart rate of 75 bpm is above the 60–70 bpm range typical for endurance athletes." That's not diagnosing bradycardia or tachycardia; it's contextualizing the number. The same applies to TSH against a functional range.

### 7.2 The "if your physician has diagnosed X, here is what supports it" framing

**The question:** Is it SaMD-triggering to provide wellness foundations specifically for users with diagnosed conditions?

**Zenoho's position:** No, provided that:
- The user reports the diagnosis (Zenoho doesn't diagnose).
- The foundations are general wellness, not specific treatment.
- The platform defers to the physician for clinical management.
- No prescription medication recommendation is involved.

**Example compliant output:** "If your physician has diagnosed you with Hashimoto's thyroiditis and is managing your levothyroxine therapy, here are nutritional foundations that research associates with general thyroid wellness: selenium 200 mcg/day from food or supplement (selenium-rich foods include Brazil nuts), iodine adequacy from iodized salt, avoidance of cigarette smoke which research associates with worse outcomes, consistent sleep timing. Always discuss any supplement additions with your physician — selenium and other nutrients can affect levothyroxine absorption if taken at the same time."

### 7.3 Wearable data and the "real-time monitoring" line

**The question:** Where exactly is the line between wellness wearable data display and SaMD monitoring?

**Zenoho's position:**
- Showing a user their last night's sleep, this week's HRV trend, or step count for the month is wellness display. Compliant.
- Showing the user "your HRV has been declining for the last 14 days, consider reducing training load" is wellness coaching. Compliant.
- Showing the user "your heart rate spike at 3:47 AM may indicate atrial fibrillation, consult cardiologist immediately" is real-time medical alerting. SaMD-triggering. Not compliant.
- Aggregating wearable data into "your stress score is 7/10 this week, here are recovery practices" is wellness. Compliant.
- Aggregating wearable data into "your cardiovascular health score is 6/10, you are at elevated risk for heart disease" is prediction. SaMD-triggering. Not compliant.

### 7.4 The B2B corporate dashboard "executive health summary"

**The question:** A B2B customer (corporate HR) wants a summary saying "Employee X is at high cardiovascular risk based on their blood work." Is this allowable?

**Zenoho's position:** No. The platform does not generate individual-level disease-risk summaries to anyone, including the employee's HR team. Aggregate-level wellness trends and supplement adoption patterns are acceptable B2B outputs; individual-level disease risk is not.

This is a hard product boundary that will need to be communicated to B2B prospects: "Zenoho is a wellness platform, not a medical-screening service. We do not provide individual employee disease-risk reports. We provide aggregate organizational wellness insights and employee-controlled individual wellness reports."

### 7.5 The "AI doctor" temptation

**The question:** Future product expansion may consider an "AI doctor" feature where the WhatsApp coach gives more prescriptive medical-style advice. Is this allowable?

**Zenoho's position:** No, not in current regulatory posture. "AI doctor" framing alone is SaMD-triggering regardless of the underlying functionality. If Zenoho wishes to offer more prescriptive medical advice in the future, the path is partnerships with licensed physicians (telemedicine integration where the physician is the medical-advice-giver and Zenoho is the information layer), not Zenoho positioning its AI as a medical advisor.

### 7.6 What if a user has a medical emergency during a chat?

**The question:** WhatsApp coach receives a message like "I'm having chest pain, what should I do?"

**Zenoho's position:** This is a hard rule, encoded in the chatbot system prompt: any indication of acute medical symptoms (chest pain, severe shortness of breath, sudden weakness, severe headache, suicidal ideation, severe injury) prompts an immediate response: "If you are experiencing a medical emergency, please call 108 (national emergency services in India) or go to the nearest emergency room. I am a wellness platform and cannot help with acute medical concerns."

For mental health crises specifically, the response surfaces Tele-MANAS 14416 (24/7 government helpline), AASRA 9820466726, and Vandrevala Foundation +91 9999 666 555.

This is not optional. It is a non-negotiable safety boundary that overrides any other conversational context.


---

## Part 8: Operational requirements and ongoing posture

### 8.1 Disclaimer language (canonical)

The following disclaimer language is mandatory on the surfaces noted. Variations are permitted for length but the substantive content must be preserved.

**Header disclaimer on every blood report interpretation:**
> This report is wellness information, not a medical diagnosis. Please review with your physician — only a physician can interpret these results in the context of your full clinical picture.

**Footer disclaimer on every blood report interpretation:**
> Zenoho is a wellness information platform. We do not provide medical diagnosis, treatment, prediction of disease, or physiological monitoring for medical purposes. For any specific medical concern, please consult a qualified physician.

**WhatsApp coach standing disclaimer (on first message of any session):**
> Hi! I'm Zenoho's wellness coach. I can help you understand your blood report numbers, discuss lifestyle and supplement foundations, and answer general wellness questions. I'm not a medical advisor and I don't diagnose conditions or recommend prescription medications. For anything medical, please see your physician. In a medical emergency, call 108.

**Terms of Service excerpt (must appear in user-acknowledged form):**
> Zenoho Health Private Limited operates a wellness information platform. The platform is not a medical device under India's Medical Devices Rules, 2017, and is not intended to diagnose, predict, prevent, treat, or monitor any disease or medical condition. Information provided is general wellness guidance and should not be relied upon as a substitute for consultation with a qualified physician. Always consult a licensed physician for any medical concern. By using Zenoho, you acknowledge and accept this scope.

### 8.2 Marketing review process

Before any marketing material (Instagram post, website copy, B2B pitch deck, email campaign) is published, it must be reviewed against Part 2 language rules. Specific phrases that require review:

- Any claim including "diagnose," "diagnosis," "predict," "prediction," "prevent disease," "treat," "cure," "monitor [a physiological parameter]" — all require careful review and likely rewording.
- Any case study, testimonial, or example that names a specific disease the user "improved" — must be reframed as wellness improvement, not disease treatment.
- Any "AI doctor," "AI physician," "AI medical advisor" framing — prohibited.

Marketing copy review is a ten-minute exercise per piece. The cost of skipping it is potentially regulatory exposure that takes months to unwind.

### 8.3 User support / customer service rules

Customer service responses must follow the same rules as the AI engine. Specific scripts for common situations:

- User says "I have hypothyroidism, can Zenoho help me?" → "Zenoho is a wellness platform and we don't treat conditions or replace your physician. Many users with diagnosed thyroid conditions use Zenoho alongside physician care to track their TSH trends and explore wellness foundations like selenium intake. Always discuss any changes with your physician."

- User says "Your report said I'm diabetic" → Verify what the report actually said. If it correctly framed the result as "above the ADA pre-diabetes threshold," explain that. If it inappropriately said "you are diabetic," that's a SaMD-triggering output that needs to be reported and corrected.

- User says "Should I take metformin?" → "We can't recommend prescription medications. That conversation is for you and your physician."

### 8.4 When this document is revised

The compliance posture in this document is current to May 11, 2026 and the CDSCO October 21, 2025 Draft Guidance. Triggers for mandatory revision:

- CDSCO finalizes the Draft Guidance (currently still labeled draft despite stakeholder consultation completion).
- New CDSCO notification on SaMD classification.
- New FSSAI or AYUSH ministry guidance affecting health-software claims.
- Material change in Zenoho's product scope (adding diagnostic features, real-time monitoring, B2B clinical partnerships).
- Material change in Anthropic's model or platform behavior that affects compliance posture.
- Court judgment or enforcement action affecting interpretation of MDR 2017 for software.

Annual review is mandatory regardless of triggers.

### 8.5 Defensive documentation

Maintaining this document, the compliance log from Part 4 Step 5, the change-validation records from Part 5 Section 3, and the audit results from Part 6 creates a defensive paper trail. If CDSCO or any other regulator ever questions Zenoho's compliance posture, the company can demonstrate:

- A documented framework for distinguishing wellness from SaMD;
- A documented process for reviewing new features against the framework;
- A documented validation process for AI engine changes;
- A documented audit history of canonical documents against the framework.

Companies that can demonstrate this kind of compliance hygiene have substantially better outcomes in regulatory interactions than companies that cannot. Even when the wellness-side classification is upheld, the strength of the documentation reduces the regulator's incentive to look harder.


---

## End of SaMD Compliance Guidelines v1.0

### What this document is

This is the canonical line-drawing document between wellness software (outside MDR 2017) and Software as a Medical Device (inside MDR 2017 and subject to CDSCO licensing). It defines:

- The current regulatory landscape (Part 1)
- Five categories of SaMD-triggering claims and how to avoid each (Part 2)
- Surface-by-surface compliance rules across Zenoho's product (Part 3)
- A decision tree for evaluating new features (Part 4)
- Algorithm Change Protocol skeleton for AI/ML governance (Part 5)
- Audit of existing canonical documents (Part 6)
- Edge cases and judgment calls (Part 7)
- Operational requirements and ongoing posture (Part 8)

### What this document is NOT

- A guarantee of CDSCO compliance. Regulatory interpretation is fact-specific and CDSCO retains authority to classify software based on its actual function. This document is Zenoho's good-faith, evidence-based effort to operate within the wellness carve-out — it is not a legal opinion.
- A substitute for legal review. Before any CDSCO-relevant interaction (formal regulatory filing, response to enquiry, B2B contract with clinical claims), engage qualified Indian regulatory counsel.
- A static document. The regulatory landscape is evolving; the October 2025 Draft Guidance is still draft; CDSCO may finalize with changes. Annual review is mandatory.

### Owner

Zenoho Health Private Limited

### Effective date

May 11, 2026

### Next mandatory review

May 11, 2027, or earlier upon any triggering event listed in Part 8.4.

### Material change triggers

- CDSCO finalizes the October 2025 Draft Guidance.
- New CDSCO notification affecting SaMD classification.
- New FSSAI or AYUSH guidance affecting health-software claims.
- Material change in Zenoho's product scope.
- Court judgment or enforcement action affecting MDR 2017 interpretation for software.
- Annual review reaches scheduled date.


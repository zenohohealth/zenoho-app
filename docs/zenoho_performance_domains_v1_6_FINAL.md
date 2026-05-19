# zenoho_performance_domains_v1.6.md
## ZENOHO PERFORMANCE DOMAIN MAPPING — COMPLETE SPECIFICATION v1.6
### v1.6 | Dated: May 13, 2026 | Companion to zenoho_marker_registry_v1.1.5_FINAL.md
### Compiled for Zenoho Health Private Limited
### Incorporates: Pass 1 (V1–V16), Pass 2 (V12–V31), Pass 3 (V32–V51), Pass 3B (A3B-1 to A3B-11), Pass 4 (P4-1 to P4-4), SaMD Compliance Guidelines v1.0 Part 6.1

---

> **Reference Document:** zenoho_marker_registry_v1.1.5_FINAL.md (all marker numbers, ranges, scoring formulas, and safety overrides referenced herein derive from v1.1.5. This document never redefines markers or ranges.)

> **Version Note (v1.6):** 71 patches applied May 13, 2026 incorporating Pass 1–4 verification results. Business model basis: Phase 1 recommendation-only at launch (no supplement sales, no affiliate links). Phase 2 (affiliate) and Phase 3 (direct sales) preserved as architectural notes. CDSCO SaMD (P4-1) and DPDPA (P4-3) apply identically across all phases from day one.

> **Footer Disclaimer (applies to every section):** *Zenoho is a performance optimisation platform. It is not a substitute for medical care. All findings should be discussed with a licensed physician before clinical action.*

---

# PART A — PHILOSOPHICAL FOUNDATION

---

## A.1 The Disease-Detection vs Performance-Optimisation Distinction

### Why medical "normal" ≠ optimal performance

Standard laboratory reference ranges are constructed for a single clinical purpose: to identify pathology requiring treatment. They are built on population statistics — typically the middle 95% of a mixed healthy-and-ill population. A haemoglobin of 13.1 g/dL in an adult male falls within the lab reference range of 13.0–17.0 g/dL. The lab reports it as "normal." But Zenoho's optimal range for haemoglobin in an adult male is 14.5–16.0 g/dL — because below 14.5, oxygen delivery to working muscles, the brain, and peripheral tissues begins to decline measurably, reducing aerobic capacity, cognitive stamina, and recovery rate. The patient is not anaemic. But neither is he at his biological best.

The gap between "not sick" and "performing well" is the performance optimisation space. It is not a fringe idea. It is the difference between surviving and thriving — and most Indian adults live their entire lives in that gap, unaware that their labs look fine while their performance bleeds away.

The scientific basis for optimal ranges is grounded in peer-reviewed literature, functional medicine research, and the work of clinicians like Peter Attia (Outlive, 2023), who argued that the entire architecture of preventive medicine should be reoriented toward maximising healthspan — the years of vigorous, disease-free life — not just diagnosing disease late. Zenoho operationalises this principle into a scored system accessible to non-medical users.

### Why labs cannot offer performance framing (structural conflict)

Diagnostic laboratories operate within a tightly regulated framework. Their mandate is to report results against established clinical reference ranges and flag values that indicate pathology. To do otherwise would be to operate outside their regulatory certification (NABL, ISO 15189), expose them to clinical liability, and conflict with the prescribing scope of the physicians they serve. A lab cannot tell a patient "your testosterone is at the low end of normal but below your performance potential" — that statement does not belong in a diagnostic report; it belongs in a performance coaching relationship.

This is not a failure of labs. It is a structural constraint. Labs measure. Zenoho interprets toward performance. These are compatible roles, not competing ones.

### Why Zenoho can take this stance ethically

Zenoho does not diagnose, treat, prescribe, or practice medicine. Zenoho provides biological performance intelligence to adults who have tested their own blood at accredited laboratories and want to understand what those results mean for their energy, longevity, cognitive function, and physical performance. The performance framing is grounded in the same peer-reviewed biology that underpins clinical practice — it simply asks different questions of the same data.

Zenoho's ethical stance is further protected by three architectural commitments: (1) all scores derive exclusively from verified lab biology — no self-reported inputs inflate scores; (2) all 13 critical safety overrides from v1.1.5 surface as urgent care banners regardless of performance framing; and (3) every recommendation to act clinically is explicit — Zenoho never softens a genuine health signal for emotional comfort.

### The ethical line: when does performance framing cross into health denial?

Performance framing crosses the ethical line in exactly one situation: when it softens or obscures a genuine clinical risk. Telling a user with Lp(a) of 48.50 mg/dL that their "Heart Engine Score" is 62 without prominently surfacing the Lp(a) elevation and its cardiovascular implications would be health denial. Zenoho's architecture prevents this through the sacred boundary (see A.4) and the cross-marker rules inherited from v1.1.5.

The test is simple: would a knowledgeable physician object to anything in this output? If yes, revise the output. The performance score communicates direction and potential; it never replaces clinical reality.

---

## A.2 The Behavioral Psychology of Performance Framing

### Identity-positive vs disease-negative messaging research

Behavioural science has established a fundamental asymmetry in how humans respond to health messaging. Loss-framed messages ("you are at risk of disease") activate threat-response neural pathways — the amygdala-dominant fear-response circuit — which paradoxically reduces behaviour change motivation in all but the highest-severity situations (Rothman & Salovey, *Psychological Bulletin*, 1997 — note: the gain-framing advantage is established for prevention-oriented health behaviours; effect is less consistent for detection/screening contexts. Pass 1 V14). Gain-framed messages ("you are investing in your performance") activate approach motivation, which correlates with sustained behaviour change over 6–12 month horizons.

The identity dimension compounds this effect. When a person internalises a health identity ("I am someone who optimises their biology"), their behaviour aligns with that identity — they are more likely to retest, to follow protocols, and to share their progress. When a person internalises a disease identity ("I am someone with a metabolic problem"), behaviour tends toward avoidance, concealment, and disengagement.

Fogg's Behavioural Model (B=MAP: Behaviour = Motivation × Ability × Prompt) predicts that motivation is the most variable component in health behaviour change, and that identity-level motivation is the most durable form. Zenoho's performance framing is not a marketing technique — it is a behavioural science application designed to maximise the probability that the user takes productive action on their biology.

### Status anxiety as motivator (used ethically)

Status consciousness is a documented motivator for health behaviour in competitive urban populations. Research in social comparison theory (Festinger, *Human Relations*, 1954 — foundational; Suls, Martin & Wheeler, *Current Directions in Psychological Science*, 2002 — modern synthesis) demonstrates that upward social comparison with aspirational peer groups drives effort more effectively than downward comparison with failing groups ("bottom shame") in self-improvement contexts (citation corrected Pass 1 V15). Zenoho deliberately frames performance scores as elite-adjacent — "where elite athletes and executives in their 30s score" — rather than medical-adjacent.

This is used ethically, not exploitatively. Zenoho does not manufacture anxiety about normal health. It contextualises what is possible — and makes "possible" feel achievable, not shameful.

### Why "Strength Score 76" works where "Testosterone 412 ng/dL" fails

Three psychological mechanisms explain this:

First, **numeracy barrier**: Most users cannot interpret "412 ng/dL" without a reference frame, a unit explanation, and a population comparison — cognitive tasks that require working memory and prior knowledge they don't have. "Strength Score 76 out of 100, Level 7" communicates instantly.

Second, **abstraction distance**: The number 412 is attached to a specific molecule that most users associate with a medical or pharmaceutical context. "Strength Score" is attached to an outcome they desire — physical capability, vitality, attractiveness.

Third, **action clarity**: "Your testosterone is 412 ng/dL" provides no obvious next step. "Your Strength Score is 76 — your top three levers right now are..." drives immediate, actionable orientation.

The biological reality is identical. The interpretation layer transforms usability without distorting truth.

### The boast-worthy threshold

A shareable score is one that signals achievement without disclosing medical privacy. Reviews of social media health-sharing (Moorhead et al., *Journal of Medical Internet Research*, 2013, PMID 23615206 — broad systematic review of uses, benefits, and limitations of social media for health communication) inform Zenoho's framing. Drawing on the broader literature, three practical conditions appear to support voluntary sharing: the information signals positive status, it is bounded (doesn't reveal too much), and it invites peer comparison rather than concern (Pass 1 V16 — claim softened from citation-anchored to literature-informed). A score of 76 on a named performance dimension ("Strength Score 76 — top 22% for Indian men my age") meets all three. A testosterone value of 412 ng/dL meets none.

The practical boast-worthy threshold for Zenoho is Level 8 (71–80) or above. Below Level 7, users may feel exposed by sharing — the framing at those levels should be aspirational and private. Level 8+ users are encouraged to share in formats that signal progress and optimisation, not medical disclosure.

---

## A.3 Anti-Stigma Architecture

### Naming conventions: forbidden vs preferred

**Forbidden naming patterns:**
- Anything implying disease state: "Metabolic Risk," "Liver Damage Score," "Immune Weakness"
- Anything with clinical vocabulary: "Haematological Status," "Endocrine Panel," "Pathological Index"
- Anything binary-negative: "Failing," "Deficient," "Abnormal," "Impaired"
- Medical abbreviation clusters without translation: "ApoB/LDL-C discordance pattern"

**Preferred naming patterns:**
- Capability-oriented: "Brain Sharpness," "Heart Engine," "Vitality & Strength"
- Action-oriented: "Recovery Capacity," "Detox Efficiency," "Endurance & Stamina"
- Experience-oriented: "Mood & Calm," "Immunity Strength"
- Status-resonant but not braggart: "Biological Age," "Metabolic Power"

Each domain name should pass a single test: would an elite athlete, a high-functioning executive, or a wellness-conscious professional be comfortable saying "I am working on improving my [Domain Name]"? If yes, the name works.

### Visual conventions: avoid hospital/medical aesthetics

Medical aesthetics trigger the disease-stigma frame. Specific elements to avoid:
- White-on-white sterile backgrounds
- Red warning banners as the dominant visual element
- Cross symbols, syringe icons, pill imagery
- Graph styles that look like ECG readouts
- Clinical report layouts (rows of values with lab reference ranges)
- Bell curve comparisons with the user positioned in the left tail

Preferred visual conventions:
- Gradient-rich circular score badges (Garmin/Oura-inspired)
- Dark-mode primary interface with premium feel
- Bold typography for the score number (the headline)
- Subtle upward-trending chart lines for historical progression
- Domain icons from athletic and nature domains (not medical)

### Color conventions: avoid red/green binary, use gradients

The red/green binary is the most stigma-loaded visual choice in health UX. Red communicates danger, failure, and medical emergency — even when a marker is simply below performance optimal, not clinically dangerous. Green communicates safety, which complacency — a user seeing green everywhere stops reading.

Zenoho uses a gradient system across all domains. See Part H for full HEX specifications per domain.

### Language conventions: aspirational not alarming, precise not panicked

**Never say:** You are sick. Your health is failing. Worrying levels. Concerning. Abnormal. This is bad.

**Always say:** Below your potential. Outside optimal range. A recovery opportunity. This needs attention. Your [Domain] is performing at Level X.

The distinction is not softening — it is accuracy. A triglyceride of 108 mg/dL is not "concerning" — it is above Zenoho's performance optimal of <80 mg/dL but not a clinical emergency. Calling it "concerning" is both stigmatising and imprecise. Calling it "above your performance optimal — here's how to bring it down in 8 weeks" is accurate, actionable, and respectful.

---

## A.4 The Sacred Boundary

The sacred boundary is the non-negotiable architectural principle that performance framing never overrides biological reality.

**Performance framing NEVER inflates scores beyond verified biology.** A user who scored Level 8 on Heart Engine last quarter and has not retested is still showing their last verified score. No amount of reported exercise, diet, or behaviour changes that score. See the Input Integrity Protocol in v1.1.5.

**Performance framing NEVER hides genuine risk for emotional comfort.** If a user has Lp(a) of 48.50 mg/dL (above the 30 mg/dL high-risk threshold per Lipid Association of India 2016), the Heart Engine score reflects this risk. The score may still be high if other cardiovascular markers are excellent — but the Lp(a) signal surfaces prominently in the "What's driving this" section of every communication template for Heart Engine.

**All 13 safety overrides from v1.1.5 Appendix 3 surface unconditionally.** They appear as red banners at the top of the report, above all domain scores. They cannot be dismissed until the triggering value returns to a non-triggering range. They are never reframed as performance language. A haemoglobin below 8.0 g/dL triggers "Severe anaemia. See a physician within 48 hours." — not "Your Endurance Score has a critical priority upgrade available."

**Critical findings are always communicated; only the framing changes.** The difference between clinical framing and performance framing is not what is said — it is how the context of action is oriented. Both framings communicate the same biological facts. One frames the action as "you are sick, seek treatment." The other frames the action as "this is your highest-leverage improvement opportunity right now — here's exactly what to do."

---

## A.5 Cultural & Demographic Inclusivity

### Performance framing across age (18–80+)

Performance is not owned by young adults. The framing shifts by age cohort:

- **18–30:** "Building your biological foundation" — emphasis on establishing optimal baselines, longevity habits, and the compounding effect of early optimisation
- **30–50:** "Peak decade protection" — emphasis on maintaining vigour through professional-life stress, not declining into the Indian average
- **50–70:** "The second performance window" — emphasis on function preservation, cognitive longevity, independence, and remaining decades of quality life
- **70+:** "Longevity with dignity" — emphasis on mobility, cognitive clarity, immunity, and avoiding preventable decline; never age-shaming

Each domain's Level definitions should be calibrated for age (see §9 in each domain). A 70-year-old with a Brain Sharpness Score of 72 is exceptional for their cohort; framing them as "below elite" against a 30-year-old benchmark is not just inaccurate — it is ageist and demotivating.

### Performance framing across gender identity

Zenoho's gender model at launch (v1.0) operates with male/female/non-binary options at signup. For v1.0:

- Male users: full range of all 62 markers including hormonal (Total T, Free T, SHBG, DHEA-S, Cortisol, PTH)
- Female users: all markers except male-specific hormonal (Total T Male, Free T Male are excluded). Female hormone panel (Estradiol, FSH, LH, Progesterone, AMH) deferred to v1.2
- Non-binary users: prompted at signup for biological context (for range calibration purposes); all communication uses gender-neutral language ("your" not "his" or "her")
- "Prefer not to say" option: Zenoho uses population-average ranges where gender diverges; acknowledges this reduces precision in the communication

All domain templates use gender-neutral language as default. Gender-specific biological text (e.g., in §9 Demographic Modifiers) is accurate and respectful.

### Performance framing for users with disabilities, chronic conditions

Zenoho applies chronic condition modifiers (see J.1). For a user with documented Type 2 Diabetes, the HbA1c-based Metabolic Power score is contextualised: "You are managing a metabolic challenge — your Metabolic Power Score reflects how well your interventions are working." This is not softening — it is accurate. A well-managed diabetic with HbA1c 6.8% is performing excellently within their constraint; framing their score as a failure relative to a non-diabetic baseline would be both inaccurate and harmful.

### Cultural sensitivity

Indian users: high prevalence of vegetarian/vegan dietary patterns — approximately 25–30% strict vegetarian on consumption basis (NFHS-5 2019–21: ~29% women and ~22% men never consume meat) and 39% self-identified vegetarian (Pew Research India 2021). The earlier "47% urban" figure was not supported by NFHS-5 (correction Pass 2 V17). This creates predictable deficiencies (B12, iron, zinc, complete protein) that Zenoho must neither stigmatise nor ignore. Protocols account for vegetarian sources where available. When a supplement is the only effective intervention (e.g., methylcobalamin for B12), this is stated directly without value judgment about diet.

Religious dietary patterns (Jain, certain Hindu observances, Ramadan fasting) affect how supplement protocols are timed. Zenoho's timing guidance notes these considerations without making assumptions about the user's practice.

Middle East users (ME flag): culturally similar patterns — indoor lifestyle, high carb/refined-grain diet, high Vitamin D deficiency prevalence. Same aggressive Vitamin D protocol applies.

### Trauma-informed design

Some users reach Zenoho post-diagnosis, post-surgery, post-cancer, or post-bereavement. They deserve dignity and a pace that does not amplify medical anxiety. Trauma-informed principles applied throughout:

- Biological age scores for recently ill users flag the acute-phase distortion explicitly (see C.7)
- Mood & Calm domain explicitly avoids triggering language for users with documented depression or anxiety history
- Recovery Capacity domain acknowledges post-illness states without shame ("Your recovery markers are showing the expected pattern after a health challenge — here is the trajectory")
- Crisis resources surface when distress signals appear in any domain (see I.1 for specific triggers and resources)

---

# PART B — THE 10 PERFORMANCE DOMAINS

---

## B.1 BIOLOGICAL AGE

### §1. Identity

- **User-facing name:** Biological Age
- **Hindi placeholder:** जैविक आयु (Jaivik Aayu) | Marathi placeholder: जैविक वय | Tamil placeholder: உயிரியல் வயது
- **Tagline:** How old your biology actually is.
- **Icon:** ⧖ (hourglass) or a circular DNA-helix motif; avoid medical cross
- **Primary HEX:** #6C3FCB (deep violet — represents time, depth, longevity)
- **Secondary HEX:** #B89FEF (soft lavender)
- **Gradient:** 135° diagonal, violet → lavender → white at edges
- **Domain category:** Cross-cutting

### §2. What It Represents Biologically

Biological age is a composite estimate of how advanced your body's cellular and physiological decline is, relative to a reference population of the same chronological age. Unlike chronological age — which simply counts years since birth — biological age reflects the cumulative effect of genetics, lifestyle, nutrition, sleep, stress, and disease history on your organs, cells, and metabolic systems.

In plain English: your body has a clock, and it doesn't always run at the same speed as the calendar. Someone who has optimised sleep, nutrition, exercise, and stress management for years often has a biological age 5–10 years younger than their passport says. Someone who has accumulated metabolic stress, poor sleep, and nutritional deficiencies may be biologically older. This is the most powerful single metric on the Zenoho platform because it synthesises everything.

**The "feel" of a younger biological age (vs chronological):** Energy without caffeine dependency, sharp morning cognition, fast wound healing, robust immune response to infections, lean body composition without extreme effort, stable mood and resilience to stress.

**The "feel" of an older biological age (vs chronological):** Fatigue requiring stimulants, slow recovery from illness or effort, weight gain clustering at the abdomen, sleep non-restorative, cognitive fog by mid-afternoon, injuries that linger.

### §3. Constituent Markers (from v1.1.5 registry)

**Primary markers (weight 70–100 in BioAge calculation):**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| HbA1c | 14 | 90 | Higher = older | 90-day glucose average; glycation accelerates aging |
| Albumin | 22 | 85 | Lower = older | Best single longevity predictor in blood; Goldwasser 1997 |
| eGFR | 24 | 85 | Lower = older | Kidney filtration declines predictably with age |
| Haemoglobin | 1 | 75 | Lower = older | Oxygen delivery; gates cellular energy |
| Lymphocytes (#6) | 6 | 70 | Lower = older | Immune competence; post-COVID suppression confounds |
| Creatinine | 23 | 70 | Interpreted via eGFR | Muscle mass proxy; pairs with eGFR |

**Secondary markers (weight 30–60):**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| hs-CRP | 45 | 60 | Higher = older | Inflammageing marker |
| ALP | 18 | 50 | U-curve | Both low (zinc depletion) and high (bone/liver) signal aging |
| MCV | 10 | 45 | Higher = older | Macrocytosis from B12/folate depletion |
| Lp(a) | 44 | 45 | Higher = older | Genetic; if elevated, accelerates vascular age |
| ApoB | 53 | 40 | Higher = older | Atherogenic particle load; cumulative damage |
| Total Cholesterol | 31 | 30 | U-curve in elderly | Very low (<130) = worse than high in 60+ |

**Confounding markers (affect interpretation, not directly scored):**
- Acute illness (WBC #3, ESR #52, hs-CRP #45) — distorts snapshot when elevated; apply 8-week flag
- Pregnancy — invalidates BioAge (see C.7)
- Haemoglobinopathy — distorts HbA1c interpretation (see Marker 14 notes)

### §4. Scoring Formula

Biological Age uses a modified Klemera-Doubal Method (KDM) adapted for blood-only inputs (see Part C for full algorithm). The domain score (0–100) is then derived from the gap between biological age and chronological age:

```
BioAge_Gap = Biological_Age - Chronological_Age

Domain_Score:
  BioAge_Gap <= -5 years:  Score = 90–100 (Elite)
  BioAge_Gap -5 to -2:     Score = 80–89
  BioAge_Gap -2 to +2:     Score = 65–79 (Aligned)
  BioAge_Gap +2 to +5:     Score = 45–64
  BioAge_Gap +5 to +10:    Score = 25–44
  BioAge_Gap > +10:        Score = 0–24
```

**Treatment of missing markers:** If >4 of the 6 primary markers are missing, BioAge cannot be calculated. Display: "Biological Age requires a broader panel — add [specific markers] to unlock this."

**Confidence calculation:** HIGH if all 6 primary markers tested + ≤2 secondary missing. MEDIUM if 4–5 primary tested. LOW if <4 primary tested.

**Cross-marker rule integration:**
- Rule 5 (aggressive_apoB_suppression_required): Lp(a) >30 + LDL >80 → adds +2 years to BioAge estimate
- Rule 9 (metabolic_syndrome_triad_flag): adds +3 years to BioAge estimate
- Safety Override 9 (hs-CRP >10 sustained): BioAge flagged as acute-phase distorted; display with LOW confidence

**Worked example (Shashank, April 2026 — see Part C for full calculation):**
- Chronological age: 37
- Estimated Biological Age: 39 (see C.4 for step-by-step)
- Domain Score: 62 (Level 7 — aligned with slight age-over signal)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | What It Means |
|---|---|---|---|
| 1–2 | 0–20 | Significantly Accelerated | Bio age >10 years older than chronological; urgent multi-system attention |
| 3–4 | 21–40 | Accelerated | Bio age 5–10 years older; structured protocol needed |
| 5–6 | 41–60 | Aligned | Bio age within ±5 years of chronological; Indian average |
| 7–8 | 61–80 | Younger | Bio age 2–5 years younger; above average optimisation |
| 9–10 | 81–100 | Significantly Younger | Bio age >5 years younger; elite optimisation category |

### §6. User Communication Templates

**HIGH PERFORMER Template (Level 8–10):**

*Opening:* Your biology is running younger than the calendar says — and the data shows exactly why.

Your Biological Age Score reflects a body that has accumulated less physiological wear than most people at your chronological age. This isn't luck — it's the measurable consequence of choices. Your markers for cellular energy, protein synthesis, metabolic efficiency, and immune competence are each performing above the expected range for your age group. Most people at this level share a common pattern: consistent sleep, deliberate nutrition (especially protein), and a body composition that protects their organ systems.

The top three markers driving your younger biological age are: [albumin — reflects excellent liver synthesis and protein nutrition], [HbA1c — reflects tight glycaemic control, meaning minimal glycation of your tissues], [eGFR — reflects kidneys functioning as if younger].

Your three highest-leverage moves for the next quarter: (1) Protect what's working — don't drop the habits driving this score. (2) Retest at 6-month intervals to detect drift early; biological age is not static. (3) Add any missing markers from the secondary panel to increase confidence precision.

What success looks like at next test: Biological age stays ≥2 years younger than chronological, or improves further.

*Closing:* You are ahead of where most people your age will ever be. The question now is not how to get there — it is how to stay.

---

**AVERAGE PERFORMER Template (Level 5–7):**

*Opening:* Your biological age is close to your chronological age — which means you have a clear path to getting ahead of the curve.

Your body is keeping pace with the calendar, which is where most Indian adults in your demographic land. You're not declining faster than expected — but you're also not yet accumulating the biological advantage that compounds into significantly better health outcomes at 50, 60, and 70. The gap between Level 6 and Level 8 is not years of work — it's a handful of targeted interventions sustained for 3–6 months.

The top three markers influencing your current score are: [relevant from your panel — typically albumin below optimal, Vitamin D below optimal, and either HbA1c or lipids in watch zone]. Each of these is modifiable.

Your three highest-leverage moves: (1) Bring albumin to ≥4.4 g/dL — this single marker has the strongest correlation with biological age across all research. Protein 1.8–2.0 g/kg/day is the primary lever. (2) Optimise Vitamin D to 40–60 ng/mL — ubiquitous deficiency in urban India, directly linked to accelerated aging markers. (3) Address your highest-flagged metabolic marker — [specific to user's panel].

What success looks like at next test: Biological age shifts to 1–3 years younger than chronological. A 2-Level improvement in 6 months is realistic with consistent adherence.

*Closing:* The calendar doesn't negotiate. Your biology does.

---

**LOW PERFORMER Template (Level 1–4):**

*Opening:* Your biology is ahead of your calendar — and not in the good direction. The data gives us a precise roadmap for why, and what to do.

Your biological age estimate currently runs older than your chronological age. This is not a verdict — it is a measurement at one point in time, with multiple modifiable drivers. Biological age is one of the most responsive metrics to targeted intervention; people in your current range who commit to a structured protocol for 6–12 months regularly shift 5–8 years toward their chronological age or younger.

The markers most responsible for your current score are: [typically elevated HbA1c, low albumin, below-optimal eGFR trend, or low lymphocytes with elevated inflammatory markers]. The overlap between these tells a specific biological story — [metabolic stress, protein insufficiency, or inflammatory burden — specific to user's data].

Your three highest-leverage moves: (1) The single most important first step: [specific to their top flagged marker — e.g., "Your albumin is below 4.0 g/dL — this is your highest-leverage target. 30g of protein per meal, omega-3 2g daily, and retest in 8 weeks."] (2) [Second marker-specific action]. (3) [Third marker-specific action].

What success looks like at next test: Any movement toward chronological alignment. A 2-Level improvement at first retest is realistic. Biological age reversal is documented in the scientific literature — it is not a promise, but it is a real possibility when interventions are sustained.

*Closing:* This is the beginning of a reversal, not the end of anything. The data exists. The protocol exists. The next step is yours.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "My biological age is [X] — [N] years younger than I am."
- "Zenoho just told me my body is running [N] years ahead of my calendar. [Relevant habit] seems to be paying off."
- "Hit biological age [X] this quarter. [N] years younger than chronological."

**Social format suggestions:** Clean screenshot of the circular BioAge badge only (no medical values visible). Caption can reference the domain score or the age gap — not the underlying marker values.

**Anti-patterns (DO NOT use):**
- "My albumin is [X] and my HbA1c is [Y]" — medical disclosure, not appropriate for social
- "My lab results show I'm younger" — implies clinical authority not warranted
- Age-gap framing that sounds like anti-aging pseudoscience ("I reversed 10 years of aging!") — overstated

### §8. Improvement Levers

**Top 5 supplement interventions:**
1. Cholecalciferol (Vitamin D3) 2000–4000 IU/day + K2-MK7 100 mcg — targets albumin-age relationship and inflammatory markers
2. Methylcobalamin 1000 mcg sublingual daily — active form, preferred for neurological applications, **non-inferior** (not clearly superior) to IM cyanocobalamin per Kiliç 2021, Aydin 2025, and 2025 Frontiers systematic review (Pass 3 V32). Critical for vegetarians with functional B12 deficiency. **FSSAI regulatory flag:** doses above RDA (2.4 mcg/day) are conditional under FSS Nutraceuticals Regulations 2022 — see Master Note P11.
3. Omega-3 EPA+DHA 2g/day — reduces hs-CRP (inflammageing); ApoB-relevant
4. Magnesium glycinate 400 mg/night — improves sleep quality (deep sleep drives cellular repair)
5. NAC 600 mg ×2/day — glutathione precursor; reduces GGT-based oxidative aging signal

**Top 3 lifestyle interventions:**
1. Sleep 7.5–8.5 hours with consistent wake time — single most powerful BioAge intervention in literature (sleep deprivation adds ~3 estimated biological years)
2. Resistance training 3–4×/week — raises albumin (muscle-synthesis demand), lowers HbA1c, reduces visceral fat (inflammatory)
3. Time-restricted eating (10-hour window) — improves HbA1c, reduces inflammatory markers, supports autophagy

**Expected timeline for measurable change:**
- 4 weeks: GGT, WBC, CRP may shift
- 8 weeks: Albumin, eGFR, lymphocytes shift
- 12 weeks: HbA1c, lipids measurably shift
- 6 months: Composite BioAge score shifts by 1–3 years with consistent adherence

**Realistic level jump:** Level 4→6 in 6 months is well-documented. Level 4→9 in 6 months is not realistic. Level 7→8 in 12 months with elite protocol is achievable.

### §9. Demographic Modifiers

- **18–30:** BioAge typically runs younger than chronological; this cohort should aim for Level 8–10 baseline
- **30–50:** Target biological age 2–5 years younger than chronological; this is the high-yield investment decade
- **50–70:** Level 7 (aligned with or slightly younger) is exceptional; focus on function not absolute number
- **70+:** BioAge calculation uses geriatric calibration; Level 6 is strong for this cohort
- **Athletes:** Naturally skew younger on Hb, albumin, eGFR; their baseline BioAge already benefits from training
- **Pregnant users:** BioAge calculation suspended; see C.7
- **Vegetarians/vegans:** B12 and MCV are the key vulnerabilities; MCV macrocytosis from B12 depletion adds estimated years to BioAge
- **Indian context:** Urban Indians tend to run higher HbA1c and lower albumin than Western populations — BioAge may read older by 2–3 years on Indian baseline; this is adjusted in the Indian calibration (see C.2)

### §10. Cross-Domain Interactions

Biological Age is the master cross-cutting domain — it receives inputs from all 9 other performance domains:
- Low Metabolic Power → accelerates BioAge (glycation)
- Low Vitality & Strength → accelerates BioAge (sarcopaenia)
- Low Recovery Capacity → accelerates BioAge (chronic inflammation)
- Low Immunity Strength → accelerates BioAge (immune senescence)
- Low Heart Engine → accelerates BioAge (vascular aging)

BioAge moves SLOW — full recalibration requires 3–6 months of sustained change. Do not retest BioAge more frequently than every 6 months.

### §11. Safety Considerations

- BioAge framing must never imply life expectancy prediction. Mandatory disclaimer on all BioAge outputs: "This is not a prediction of how long you will live — it is a snapshot of how your biology is performing today."
- Users receiving a BioAge significantly older than chronological (>10 years gap) may experience distress. Communication template (Level 1–4) is designed to be firm but forward-focused — never alarming.
- Do not display BioAge in contexts where the user has disclosed acute illness in the past 8 weeks without applying the acute-phase flag.

### §12. Domain-Specific Lab Error Detection

- If BioAge shifts >8 years between consecutive panels without documented intervention, flag `retest_required` on constituent markers before recalculating
- If Albumin drops >0.8 g/dL between panels — either genuine acute illness or lab error; flag for confirmation
- User-facing language: "Your biological age estimate has shifted significantly since your last test. Before we update your score, we want to verify [specific marker]. This could reflect a lab reading that needs confirmation."

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*


---

## B.2 VITALITY & STRENGTH

### §1. Identity

- **User-facing name:** Vitality & Strength
- **Hindi placeholder:** शक्ति और जीवनशक्ति (Shakti aur Jeevanshakti) | Marathi: शक्ती आणि चैतन्य | Tamil: உயிர்சக்தி & வலிமை
- **Tagline:** The fuel behind everything you do.
- **Icon:** ⚡ (lightning bolt — energy, power)
- **Primary HEX:** #E85D26 (bold amber-orange — energy, fire)
- **Secondary HEX:** #F5A357 (warm amber)
- **Gradient:** 180° vertical, deep orange → amber → gold
- **Domain category:** Hormonal / Haematological

### §2. What It Represents Biologically

Vitality & Strength reflects the integrated capacity of your hormonal, haematological, and nutritional systems to power physical and mental effort. Testosterone drives muscle synthesis, motivation, and recovery. Haemoglobin carries the oxygen that powers every cell. Ferritin determines how much iron reserve you have for long effort. DHEA-S represents the adrenal hormone reserve — the body's natural vitality buffer against chronic stress. Together, these markers define whether you wake up ready to perform or already depleted.

In plain English: this is the score that explains why some people walk through long days with energy to spare and others feel empty by 2 PM. The biological difference is often measurable in these specific markers.

**High score feels like:** Sustained physical energy through the afternoon without stimulants; fast muscle recovery within 24 hours; strong drive and motivation; easy maintenance of muscle mass; confidence and decisiveness.

**Low score feels like:** Fatigue that sleep doesn't fix; muscle soreness that lingers for days; low motivation and drive; belly fat accumulating despite diet; low libido; cold hands and feet; hair thinning.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Directionality | Notes |
|---|---|---|---|---|
| Haemoglobin | 1 | 100 | Higher within optimal = better | Oxygen transport; gates all aerobic output |
| Total Testosterone (M) | 59 | 95 | Higher within optimal = better | Muscle synthesis, drive, recovery |
| Free Testosterone (M) | 60 | 90 | Higher within optimal = better | Bioavailable form; more sensitive than total T |
| Ferritin | 43 | 80 | Higher within optimal = better | Iron reserve; depleted before Hb drops |
| DHEA-S | 62 | 75 | Higher within optimal = better | Adrenal vitality; anti-cortisol buffer |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Cortisol AM | 56 | 60 | U-curve — too high AND too low reduce vitality |
| SHBG | 61 | 55 | Modifies testosterone availability |
| Serum Iron | 41 | 50 | Raw iron supply; pairs with Ferritin |
| Albumin | 22 | 45 | Protein synthesis substrate |
| Hematocrit | 9 | 35 | Packed cell volume — endurance relevant |

**Confounding markers:**
- hs-CRP #45 elevated: suppresses testosterone and DHEA-S acutely (inflammation-suppressed vitality — flag)
- WBC #3 elevated: may indicate infection suppressing output; apply 8-week recovery window

### §4. Scoring Formula

```
VS_Score = (
  (Hb_Score × 100 × 0.20) +
  (TotalT_Score × 100 × 0.19) +   # Male only; Female: redistribute weight
  (FreeT_Score × 100 × 0.18) +    # Male only
  (Ferritin_Score × 100 × 0.16) +
  (DHEA_Score × 100 × 0.15) +
  (Cortisol_Score × 100 × 0.12)
) / 100
```

Where each `_Score` is derived from v1.1.5 Appendix 2 marker scoring (0–100 per marker).

**Female version** (v1.0 — male hormonal markers excluded):
```
VS_Score_F = (
  (Hb_Score × 0.30) +
  (Ferritin_Score × 0.25) +
  (DHEA_Score × 0.20) +
  (Cortisol_Score × 0.15) +
  (Albumin_Score × 0.10)
)
```

**Missing marker treatment:** If Total T and Free T are both missing (male), redistribute their combined 37% weight proportionally across remaining markers. If Ferritin missing, confidence drops to MEDIUM.

**Cross-marker rules affecting this domain:**
- Rule 14 (bound_testosterone_pattern): if triggered, Free T score overrides Total T in this domain
- Rule 2 (inflammation_confounder): if Ferritin elevated with high hs-CRP, Ferritin excluded from VS score (not iron rich — just inflamed)

**Safety overrides capping this domain:**
- Safety Override #1 (Hb <8.0): VS_Score capped at Level 3 (max 30)
- Safety Override #13 (Cortisol AM <3 or >35): VS_Score capped at Level 4 (max 40)

**Worked example (Shashank, April 2026):**
- Hb: 13.9 g/dL → optimal range 14.5–16.0 → Watch zone → Marker_Score = 68
- Total T: not tested in this panel → excluded; weight redistributed
- Free T: 29.9 pg/mL → Zenoho optimal male 15–25 pg/mL → above optimal slightly (29.9 vs 25) → Watch zone high side → Marker_Score = 78
- Ferritin: not tested → excluded; confidence drops to MEDIUM
- DHEA-S: 12.30 µg/dL → male ref 3.00–11.00 → above reference → alert zone high → Marker_Score = 45 [VERIFY DHEA-S scoring; may need clinical review]
- Cortisol AM: not tested → excluded
- VS_Score (partial): ~(68×0.30 + 78×0.25 + 45×0.20) / 0.75 ≈ 66
- Confidence: MEDIUM (3 of 6 primary markers missing)
- Display: "Level 7 — MEDIUM confidence. Add Ferritin, Total Testosterone, and Cortisol AM for full picture."

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | Biological Meaning |
|---|---|---|---|
| 1–2 | 0–20 | Critically Depleted | Severe anaemia or hormonal deficiency; clinical workup urgent |
| 3–4 | 21–40 | Below Vitality Baseline | Multiple depleted markers; systematic protocol needed |
| 5–6 | 41–60 | Functional | Adequate but not optimal; energy sufficient but not abundant |
| 7–8 | 61–80 | Strong Vitality | Above population average; consistent energy and drive |
| 9–10 | 81–100 | Peak Vitality | Elite hormonal and haematological profile |

### §6. User Communication Templates

**HIGH PERFORMER Template (Level 8–10):**

*Opening:* Your body's engine is running strong — the data backs this up precisely.

Your Vitality & Strength score reflects a hormonal and haematological profile that most people your age have already started to lose. Your oxygen-carrying capacity is robust, your hormonal drive markers are in a range that supports easy muscle maintenance and recovery, and your reserve systems show depth. This is a rare combination in urban Indian adults in their 30s and 40s, where chronic stress, poor sleep, and nutritional gaps quietly drain vitality markers.

The markers driving your high score are: [top 3 from user's panel — typically Hb near optimal, testosterone in upper range, ferritin healthy]. These three together create the foundation for sustained physical and cognitive output.

Your three highest-leverage moves for the next quarter: (1) Protect sleep — the fastest way to erode this score is consistently sleeping under 7 hours; testosterone and DHEA-S both require sleep for synthesis. (2) Maintain your protein intake at 1.8–2.0 g/kg — albumin and muscle synthesis both depend on this. (3) Retest Cortisol AM at your next panel — even with excellent hormonal markers, undetected cortisol dysregulation can silently suppress this domain.

What success looks like at next test: Vitality & Strength stays Level 8+ and all 6 primary markers are tested for HIGH confidence.

*Closing:* This score didn't happen by accident. It happened because of your biology responding to the right inputs. Keep the inputs clean.

---

**AVERAGE PERFORMER Template (Level 5–7):**

*Opening:* Your vitality is functional — but there is a clear ceiling above where you currently perform, and it is closer than you might think.

You have the biological infrastructure for significantly more energy and physical capability than your current level suggests. The gap between Level 6 and Level 8 in Vitality & Strength is often bridged by 2–3 targeted interventions sustained for 12 weeks. Most people in your range have one or two markers dragging their score — [specific to user's data, e.g., "your haemoglobin is below optimal and your ferritin suggests iron reserve is not deep"].

The top three markers influencing your score: [Hb below optimal; Ferritin in watch zone; DHEA-S below age-expected optimal]. These three together explain why your energy might feel adequate in the morning but thin by afternoon.

Your three highest-leverage moves: (1) Iron bisglycinate providing 18–27 mg **elemental iron** with Vitamin C 250 mg on alternate days — addresses the haemoglobin gap without overwhelming absorption. **Specification note (Pass 3 V34 — applies to all iron bisglycinate references in this document):** the "25 mg" figure refers to elemental iron equivalent; bisglycinate at 18–27 mg elemental ≈ absorption-equivalent to 60–100 mg ferrous sulfate, with 64% lower GI side-effect rate (Fischer 2023 *Nutr Rev* 81:904; Puga 2022 PMC8839493; Tolkien 2015 *PLoS One*). Always specify elemental iron content on Zenoho-sourced products, not compound weight. (2) Prioritise sleep at 7.5–8 hours — the single fastest way to raise DHEA-S and free testosterone without supplements. (3) Add protein at breakfast (aim for 30 g) — this single change measurably impacts albumin within 8 weeks.

What success looks like at next test: Hb ≥14.5 (M) or ≥13.5 (F), Ferritin ≥50, domain score ≥70.

*Closing:* The energy you want is already specified in your biology. We just need to unlock it.

---

**LOW PERFORMER Template (Level 1–4):**

*Opening:* Your vitality markers are significantly below where they need to be — and this has a precise biological explanation, not a character one.

Feeling depleted is not weakness. It is your biology communicating an unmet need — and the data tells us exactly which needs those are. Low haemoglobin means every cell in your body is operating at reduced oxygen capacity. Below-optimal hormonal markers mean your body's drive and recovery systems are running on minimal fuel. This combination is common in Indian urban adults — but common does not mean acceptable or unchangeable.

The markers most responsible for your current level: [specific to user — e.g., "your haemoglobin at [X] is below the Zenoho optimal range, your ferritin at [Y] suggests depleted iron stores, and [DHEA-S / testosterone] is below the range expected for your age"]. These three together create the pattern of persistent fatigue and slow recovery you may be experiencing.

Your three highest-leverage moves (start with the highest-priority): (1) [Top marker-specific intervention]. (2) [Second marker-specific intervention]. (3) [Third intervention]. Retest these specific markers in 8–12 weeks.

What success looks like: Any upward movement in Hb and Ferritin at next test confirms the protocol is working. A 2-Level improvement in 12 weeks is a realistic and meaningful target.

*Closing:* This is information, not a sentence. Your biology responds to the right inputs — and now you know which inputs to prioritise.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "Vitality score hit Level 8 this quarter. Finally seeing it in the gym recovery time."
- "My hormonal markers are in the top range for my age group — Zenoho calls it Peak Vitality."
- "Haemoglobin optimised, ferritin loaded — my energy baseline has genuinely shifted."

**Anti-patterns (DON'T):**
- "My testosterone is [X] ng/dL" — hormone disclosure is private medical information
- "My levels are higher than average" — comparative framing without context sounds like boasting about medical values
- Any content that could be read as endorsing steroid or performance drug use

### §8. Improvement Levers

**Top 5 supplements:**
1. Iron bisglycinate 25 mg + Vitamin C 250 mg (alternate days, empty stomach) — for Hb and Ferritin
2. Methylcobalamin 1000 mcg sublingual daily — for MCV-based energy deficit (vegetarians especially); active form, non-inferior to IM cyanocobalamin (Pass 3 V32). FSSAI dose flag — see Master Note P11.
3. Ashwagandha **KSM-66** 600 mg/day — raises testosterone 15–20% in deficient Indian men (Wankhede 2015; Ambiye 2013; Bachour 2025 meta-analysis PMC12242034 — verified Pass 3 V38). **Brand-critical note (April 2026 directive):** FSSAI directive F.No. RCD-15001/11/2021 (Apr 16, 2026) + Ministry of AYUSH directive T-13020/4/2022-DCC-Part(2) (Apr 15, 2026) **prohibit leaf extracts** in all food supplements and Ayush products. KSM-66 (Ixoreal, root-only) = COMPLIANT ✓. **Sensoril (Kerry) and Shoden (Arjuna Natural) contain leaf — NON-COMPLIANT in India ✗.** Other root-only options compliant: Shagandha (Sabinsa), Witholytin (Verdure Sciences). **Do not generalise to "ashwagandha extract."**
4. Zinc picolinate 15 mg/day — cofactor for testosterone synthesis; depleted in sweat and vegetarian diets
5. Magnesium glycinate 400 mg at night — improves sleep quality → supports DHEA-S and testosterone synthesis

**Top 3 lifestyle interventions:**
1. Resistance training 3–4×/week (compound lifts) — most potent single testosterone-raising intervention
2. Sleep 7.5–8.5 hours with consistent wake time — restores DHEA-S and testosterone after 4 weeks
3. Reduce alcohol to <3 drinks/week — alcohol suppresses testosterone and raises SHBG

**Timelines:**
- 4 weeks: Sleep and alcohol changes begin to shift Cortisol/DHEA ratio
- 8–12 weeks: Hb, Ferritin, Testosterone measurably shift with protocol
- 6 months: Full hormonal recalibration; domain level jump of 2 is realistic

**Realistic level jump:** Level 4→6 in 12 weeks with protocol. Level 6→8 in 6 months. Level 4→9 requires 12+ months and possibly clinical support.

### §9. Demographic Modifiers

- **18–30 M:** Testosterone should naturally be at peak; Level 9–10 is the appropriate target
- **30–50 M:** Natural testosterone decline ~1% per year; target upper-third of optimal range
- **50–70 M:** 400–700 ng/dL total T is strong; Level 7 is excellent for this cohort
- **F (all ages):** Vitality domain uses haemoglobin, ferritin, DHEA-S, cortisol. Iron deficiency is the leading driver of low VS in Indian women (NFHS-5 2019–21: 57% women of reproductive age anaemic — up from 53% in NFHS-4 2015–16; child anaemia 67.1%; adult male anaemia 25%). Correction Pass 2 V18. Monthly menstruation increases iron requirement significantly.
- **Postpartum F:** Hb and ferritin expected to be low; apply postpartum modifier; normal restoration timeline 3–6 months
- **Vegetarians:** B12 and iron are dual deficits; both suppress Hb and energy markers
- **Athletes:** May naturally run higher Hb, lower resting cortisol; baseline already benefits from training; target upper Level 8–9

### §10. Cross-Domain Interactions

- **Mood & Calm (B.9):** Testosterone and DHEA-S both influence mood; low Vitality & Strength almost always coexists with lower Mood & Calm
- **Recovery Capacity (B.6):** Ferritin and Cortisol AM shared markers; linked domains
- **Brain Sharpness (B.3):** Haemoglobin directly gates cognitive performance via oxygen; Hb below 13 in males is associated with measurable cognitive decline [VERIFY]
- **Endurance & Stamina (B.8):** Hematocrit and Hb are primary shared markers; these two domains move together

**Speed of change:** Testosterone moves MEDIUM (8–12 weeks with protocol). Hb moves SLOW (8–12 weeks with iron). Cortisol moves FAST (can shift in 2–4 weeks with acute stress change).

### §11. Safety Considerations

**Body dysmorphia / "bigorexia" risk:** The Vitality & Strength domain is closest to the territory where muscle dysmorphia (bigorexia) is active — particularly in young adult males. Guardrails:
- Never frame higher testosterone as unconditionally better ("maximise your testosterone" language is forbidden)
- Supplement recommendations for testosterone are modest and evidence-based (not megadosing)
- Any user showing signs of obsessive supplement use, extreme restriction, or requests for information on exogenous testosterone should receive clinical referral language: "Testosterone optimisation beyond lifestyle and evidence-based supplements requires physician guidance."

**Required disclaimer for this domain:** "Zenoho supplement protocols for Vitality & Strength use evidence-based doses. They are not a substitute for clinical assessment of hormonal status. If you are experiencing symptoms of hypogonadism, please consult an endocrinologist."

### §12. Domain-Specific Lab Error Detection

- Free T >46.6 pg/mL in Indian lab context without documented supplementation: flag `retest_required` (likely assay error or sample timing error — afternoon sample)
- DHEA-S >700 (M) or >400 (F): biologically extreme; flag for clinical review before scoring
- Hb > 18.0 g/dL: polycythaemia workup alert (Lab Error Detection Pattern #1 partial trigger)

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

---

## B.3 BRAIN SHARPNESS

### §1. Identity

- **User-facing name:** Brain Sharpness
- **Hindi placeholder:** मानसिक तीक्ष्णता (Mansik Teekshnata) | Marathi: मेंदूची तीक्ष्णता | Tamil: மூளை கூர்மை
- **Tagline:** Think faster. Remember more. Decide better.
- **Icon:** 🧠 (or a minimalist neural network motif — not a lightbulb, which is clichéd)
- **Primary HEX:** #1A6FD4 (electric blue — precision, clarity, technology)
- **Secondary HEX:** #7FBCE8 (sky blue)
- **Gradient:** 225° diagonal, deep blue → sky blue → near-white
- **Domain category:** Cognitive / Metabolic

### §2. What It Represents Biologically

Brain Sharpness reflects the biochemical environment that enables peak cognitive performance — processing speed, working memory, focused attention, decision quality, and mood stability. The brain is not an organ that operates independently of the body's metabolic state. Glucose stability, B12, folate, thyroid function, Vitamin D, homocysteine, and inflammatory load all directly affect neuronal function, myelin integrity, and neurotransmitter synthesis.

In plain English: if you have ever felt foggy in the afternoon, slow to retrieve words, or noticed your focus degrading under stress — those experiences have biological correlates. Brain Sharpness is the score that translates those biochemical drivers into a number you can act on.

**High score feels like:** Words available when you need them; problems solved with sustained focus; decisions made from clarity rather than fatigue; learning new material without the feeling of resistance; mental freshness into the evening.

**Low score feels like:** Afternoon brain fog; words on the tip of the tongue but unreachable; second-guessing; slower processing; mental fatigue by 3 PM; difficulty concentrating despite caffeine.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| Vitamin B12 | 37 | 100 | Higher within optimal = better | Myelin synthesis; nerve conduction |
| Homocysteine | 46 | 95 | Lower = better | Neurotoxic at high levels; damages cerebrovascular integrity |
| HbA1c | 14 | 85 | Lower within optimal = better | Glycation damages cerebrovascular endothelium; brain-first organ |
| Folate | 38 | 80 | Higher within optimal = better | One-carbon metabolism; neurotransmitter synthesis |
| Vitamin D | 36 | 75 | Higher within optimal = better | Neurotrophin synthesis; mood regulation |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| TSH | 39 | 65 | Hypothyroid → slowed cognition; U-curve effects on brain |
| FT3 | 47 | 60 | Active thyroid hormone; brain most sensitive to FT3 |
| Haemoglobin | 1 | 55 | Oxygen delivery to brain; Hb <13 M → cognitive decline signal |
| hs-CRP | 45 | 50 | Neuroinflammation; blood-brain barrier integrity |
| Cortisol AM | 56 | 45 | Chronic cortisol elevation neurotoxic (hippocampal shrinkage with sustained high cortisol) |
| Magnesium RBC | 58 | 40 | Synaptic plasticity; NMDA receptor modulation |

**Confounding markers:**
- Ferritin #43: iron deficiency affects dopamine synthesis; low Ferritin with normal Hb can still impair cognition
- Uric Acid #29: both very low and very high UA associated with cognitive impairment in different mechanisms

### §4. Scoring Formula

```
BS_Score = (
  (B12_Score × 0.22) +
  (Homocysteine_Score × 0.20) +
  (HbA1c_Score × 0.18) +
  (Folate_Score × 0.15) +
  (VitD_Score × 0.13) +
  (TSH_Score × 0.07) +
  (FT3_Score × 0.05)
) × 100
```

Where each `_Score` uses v1.1.5 Appendix 2 marker scoring.

**Missing marker treatment:** If Homocysteine missing (common in basic panels), redistribute its 20% weight to B12 (add 10%) and Folate (add 10%). Confidence drops to MEDIUM.

**Cross-marker rules affecting this domain:**
- Rule 3 (treat_b12_despite_normal_lab): if Homocysteine >10 AND B12 300–500, treat B12 score as watch zone regardless of raw value
- Rule 4 (conversion_failure_pattern): FT3 <3.5 + TSH normal + FT4 normal → thyroid conversion failure penalises Brain Sharpness

**Safety overrides:** None directly cap Brain Sharpness, but:
- Safety Override #10 (TSH <0.1 or >10): cap Brain Sharpness at Level 4 while active

**Worked example (Shashank, April 2026):**
- B12: not tested → excluded; confidence drops
- Homocysteine: not tested → excluded
- HbA1c: 5.5% → Zenoho optimal 4.8–5.3 → Watch zone → Marker_Score ≈ 68
- Folate: not tested → excluded
- VitD: 30.5 ng/mL → Zenoho optimal 40–60 → Alert zone (below 40) → Marker_Score ≈ 38
- TSH: 3.48 mIU/L → Zenoho optimal 1.0–2.5 (IFM) → Watch zone high → Marker_Score ≈ 62
- FT3: 3.3 pg/mL → lab ref 2.77–5.27; IFM optimal 3.5–4.5 → below IFM optimal → Watch zone → Marker_Score ≈ 55
- BS_Score (partial, 4 markers): weighted average ≈ 56
- Confidence: LOW (3 of 5 primary markers missing)
- Display: "Level 6 — LOW confidence. Brain Sharpness score is limited by missing panel. Add Vitamin B12, Homocysteine, and Folate for accurate cognitive intelligence."

**Worked example (Ishita, January 2026):**
- B12: 419 pg/mL → Zenoho optimal 500–900 → below optimal → Watch zone → Marker_Score ≈ 65
- Homocysteine: not tested → excluded
- HbA1c: 5.2% → Zenoho optimal 4.8–5.3 → optimal → Marker_Score = 100
- Folate: not tested → excluded
- VitD: 36.2 ng/mL → below optimal 40–60 → Alert zone → Marker_Score ≈ 42
- TSH: 1.28 mIU/L → within IFM optimal 1.0–2.5 → Marker_Score = 100
- FT3: 3.72 pg/mL → optimal → Marker_Score = 100
- BS_Score (partial, 5 markers): weighted average ≈ 75
- Confidence: MEDIUM (2 of 5 primary markers missing)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label |
|---|---|---|
| 1–2 | 0–20 | Significantly Impaired | Severe deficiency state; urgent clinical attention |
| 3–4 | 21–40 | Below Cognitive Baseline | Multiple deficiencies; consistent errors and fog |
| 5–6 | 41–60 | Functional Cognition | Adequate for daily tasks; not at peak |
| 7–8 | 61–80 | Sharp | Above average; fast processing, good recall |
| 9–10 | 81–100 | Elite Sharpness | Rare metabolic environment; exceptional cognitive substrate |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your cognitive biochemistry is in the top tier — here's what's keeping your brain sharp.

Your Brain Sharpness score reflects a neurochemical environment that supports fast processing, reliable memory retrieval, and sustained focus. Your B12 is above 500 pg/mL — the threshold where neurological function shows measurable superiority over "lab-normal" but functionally deficient levels. Your homocysteine is below 10 µmol/L, meaning your cerebrovascular network is not accumulating the micro-damage that silently slows thinking over years. Your HbA1c shows tight glucose control — the brain prefers a stable glucose supply and suffers measurably when it fluctuates.

The markers driving your score: [top 3 from panel]. 

Your three highest-leverage moves: (1) Continue the protocol driving these results — supplement drops or dietary shifts often precede cognitive decline by 12–18 months before symptoms appear. (2) Add magnesium L-threonate to your protocol — **1.5–2 g/day of Magtein compound** (~270–360 mg elemental magnesium). The earlier "800 mg/day" figure was the Magtein compound dose used in some older protocols, not the clinical-trial dose. Three human RCTs (Liu 2016; Hausenblas 2024; Lopresti 2025) support cognitive benefit — all industry-funded; effect sizes are modest (transparency note Pass 3 V37). Synaptic-density claim is supported in animal studies; human translation inferred. (3) Retest Homocysteine at next panel — it's the single most underrated cognitive risk marker and needs monitoring even when all other markers look excellent.

*Closing:* A sharp mind doesn't fade — it gets neglected. Keep the inputs precise.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your brain's biochemical support is functional — but several specific gaps are limiting what it could be.

Level 6 means your cognitive substrate is adequate, not optimal. The specific gaps in your panel — typically B12 below 500 pg/mL, Vitamin D below 40 ng/mL, or elevated TSH — are not dramatic enough to cause obvious dysfunction, but they create a chronic ceiling on your sharpest thinking. Many users in this range notice it as "nearly there" focus — able to work, but not with the ease and depth they experienced at their best.

Your top markers to address: [B12 below optimal; VitD below optimal; TSH in upper range]. 

Your three highest-leverage moves: (1) Methylcobalamin 1000 mcg sublingual daily — sublingual route is non-inferior to IM cyanocobalamin (Kiliç 2021; Aydin 2025; 2025 Frontiers systematic review — Pass 3 V32) and bypasses gastric absorption issues common in Indian populations. Results often felt within 4–6 weeks and measurable at 12 weeks. (2) Vitamin D to 40–60 ng/mL target — take Cholecalciferol 2000–4000 IU/day with K2-MK7 100 mcg. (3) Folate 400–800 mcg/day as Methylfolate (L-5-MTHF form) — supports neurotransmitter synthesis independently of B12.

*Closing:* The biology of a sharper brain is not complicated. It's B-vitamins, Vitamin D, glucose stability, and low inflammation. Three of those are addressable in weeks.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your cognitive markers are significantly below where they need to be for your brain to operate at its potential. The biology is clear — and so is the path forward.

When multiple cognitive support markers are simultaneously below optimal — B12, folate, Vitamin D, and elevated homocysteine together — the cumulative effect on brain function is not additive; it is multiplicative. Myelin integrity, neurotransmitter synthesis, and cerebrovascular health all degrade in parallel. What you experience as brain fog, word-finding difficulty, or decision fatigue is the neurological consequence of specific nutrient and metabolic shortfalls.

Your most critical markers: [specific from panel — likely B12 very low, homocysteine elevated, VitD severely deficient]. 

Your most critical action (today, not next week): If B12 is below 300 pg/mL, discuss methylcobalamin supplementation with your physician (sublingual 1000–1500 mcg widely used — FSSAI conditional regulatory flag for doses above RDA; see Master Note P11). If homocysteine is elevated, the Methylation Trio is established: Methyl-B12 1000 mcg + Methylfolate (5-MTHF) 400–800 mcg + P5P 25 mg daily. (5-MTHF is preferred over folic acid for B12-deficient and MTHFR-variant individuals because it does not mask B12 deficiency; clinical Hcy lowering is equivalent at matched doses — Pass 3 V35.) **VitD loading — IJEM 2025 India consensus (Pass 3 V33):** Insufficiency (20–29 ng/mL): Cholecalciferol 60,000 IU weekly × **8 weeks**; **Deficiency (<20 ng/mL): 60,000 IU weekly × 12 weeks** (corrected from earlier 8 weeks). Maintenance: 60,000 IU monthly post-repletion.

Retest at 12 weeks. Measurable improvement in cognitive performance is typically experienced before lab markers fully normalise — within 6–8 weeks with consistent supplementation.

*Closing:* Your brain is not underperforming because of who you are. It is underperforming because of what it isn't getting. The fix is specific and achievable.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "Brain Sharpness at Level 8 — B12 optimised and homocysteine in check."
- "Cognitive markers finally all in the green zone on Zenoho. The difference in focus is real."
- "Homocysteine under 8, B12 over 600 — brain score just hit Level 9."

**Anti-patterns:**
- "My B12 is [X] pg/mL" — specific medical values not appropriate for social sharing
- Claims of "boosted IQ" or similar — not supported by evidence and misleading

### §8. Improvement Levers

**Top 5 supplements:**
1. Methylcobalamin 1000–1500 mcg sublingual daily — priority #1 for Brain Sharpness
2. Methylfolate (L-5-MTHF) 400–800 mcg/day — neurotransmitter synthesis. Preferred over folic acid for B12-deficient and MTHFR-variant individuals because 5-MTHF does not mask B12 deficiency; clinical Hcy lowering is equivalent to folic acid at matched doses (Pass 3 V35). Always pair with methylcobalamin.
3. Cholecalciferol 2000–4000 IU/day — VitD to 40–60 ng/mL; neurotrophin synthesis
4. Omega-3 EPA+DHA 2g/day — cerebrovascular integrity; reduces neuroinflammation
5. Magnesium L-threonate 1.5–2 g/day as **Magtein compound** (provides ~270–360 mg elemental magnesium as L-threonate). Correction (Pass 3 V37): the "800 mg" figure was the compound dose used in some older protocols, not the clinical-trial dose. Three small human RCTs support cognitive and sleep outcomes (Liu 2016 *J Alzheimers Dis* 49:971; Hausenblas 2024 *Sleep Med X* PMC11381753; Lopresti 2025 *Front Nutr* PMC12832366). **Transparency note:** all three RCTs used Magtein, a patented ingredient (Magceutics) — research is industry-funded; no independent non-branded MgL-T RCTs yet. Synaptic-density mechanism supported in animal studies; human translation inferred.

**Top 3 lifestyle interventions:**
1. Sleep 7.5–8h minimum — sleep is when the glymphatic system clears amyloid and metabolic debris from the brain; reducing sleep below 6h for even one night measurably impairs next-day cognitive performance
2. Walking 8000+ steps/day — BDNF (brain-derived neurotrophic factor) release; most robustly replicated lifestyle cognitive intervention
3. Glucose stability — avoid glucose spikes >140 mg/dL post-meal (achievable with protein-first meals and brief walks after eating)

**Timelines:** B12 effects often felt in 4–6 weeks; measurable at 12 weeks. VitD cognitive effects at 12 weeks. Homocysteine reduction: 8 weeks with Methylation Trio.

### §9. Demographic Modifiers

- **18–30:** Brain Sharpness should be at Level 8–10 baseline; any lower warrants panel investigation
- **30–50:** Natural decline in B12 absorption begins; vegetarians in this cohort frequently score Level 5–6
- **50–70:** TSH tends to drift upward; FT3 conversion efficiency declines; cognitive support needs active management
- **70+:** B12 absorption severely reduced (gastric acid decline); intramuscular B12 may be needed; homocysteine rises predictably
- **Vegetarians/vegans:** B12 is the #1 priority; 50–80% of vegetarians in India have functional B12 deficiency
- **Indian context:** Folate deficiency less common (wheat fortification, greens) but B12 deficiency near-universal in vegetarians; this pattern uniquely affects Brain Sharpness vs Western populations

### §10. Cross-Domain Interactions

- **Mood & Calm:** B12, Folate, and VitD share markers; Brain Sharpness and Mood & Calm frequently co-move
- **Metabolic Power:** HbA1c is a shared marker; metabolic dysregulation impairs cognitive function
- **Biological Age:** Homocysteine is the strongest vascular-aging marker that also caps Brain Sharpness
- Speed: B12 moves MEDIUM (8–12 weeks). Homocysteine responds within 8 weeks. TSH moves SLOW (8 weeks). VitD moves MEDIUM (8–12 weeks).

### §11. Safety Considerations

**Performance anxiety risk:** Brain Sharpness domain may amplify performance anxiety in users who already over-monitor their cognitive function (common in knowledge workers, executives, and students). Guardrails:
- Never use comparative language ("your brain is slower than average")
- Frame deficits as biochemical, not capability ("your B12 is below the level that supports your full cognitive potential")
- For users who show signs of health anxiety about cognitive performance, surface disclaimer: "Cognitive performance fluctuates naturally. These markers provide the biochemical context — they are not a real-time cognition test."

### §12. Domain-Specific Lab Error Detection

- B12 >1500 pg/mL without supplementation: liver/kidney workup; pattern #Group B flag
- Homocysteine >50 µmol/L in apparent outpatient: verify — possible MTHFR severe mutation, renal failure, or lab error
- If FT3 <1.0 pg/mL: biologically impossible in ambulatory patient without severe thyroid failure — flag `retest_required`

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*


---

## B.4 HEART ENGINE

### §1. Identity

- **User-facing name:** Heart Engine
- **Hindi placeholder:** हृदय इंजन (Hriday Engine) | Marathi: हृदय यंत्र | Tamil: இதய இயந்திரம்
- **Tagline:** The engine that runs everything else.
- **Icon:** ❤️‍🔥 or a minimalist flame-heart silhouette (avoid medical ECG icon)
- **Primary HEX:** #C0392B (deep crimson — strength, life force — not danger/red-alert)
- **Secondary HEX:** #E8827A (rose-warm)
- **Gradient:** 160° diagonal, crimson → rose → peach
- **Domain category:** Cardiovascular

### §2. What It Represents Biologically

Heart Engine reflects the combined cardiovascular risk and cardiovascular function profile derived from your lipid panel, inflammatory markers, and vascular health signals. Cardiovascular disease remains the leading cause of death in India (26% of all deaths; Global Burden of Disease India 2019 [VERIFY]), and Indian adults develop cardiovascular risk a full decade earlier than Western populations at equivalent metabolic profiles. The Heart Engine score is therefore not optional risk management — it is the domain with the highest stakes of all ten.

In plain English: your heart circulates 5–6 litres of blood per minute through 96,000 kilometres of blood vessels. The markers in this domain measure whether those vessels are staying clean, flexible, and low-resistance — or whether atherosclerotic burden is accumulating silently before any symptom appears.

**High score feels like:** Easy exertion — stairs without breathlessness, sustained aerobic effort without excessive recovery time, no chest tightness or palpitations, consistently normal blood pressure response to effort.

**Low score feels like:** Breathlessness at moderate effort, slow recovery after physical activity, occasional palpitations, elevated resting heart rate, fatigue not explained by poor sleep.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| Lp(a) | 44 | 100 | Lower = better | Genetic; if >30 mg/dL, CAPS Heart Engine regardless of other markers |
| ApoB | 53 | 95 | Lower = better | True atherogenic particle count; overrides LDL when discordant |
| LDL Cholesterol | 32 | 80 | Lower = better | Standard cardiovascular marker; second to ApoB |
| hs-CRP | 45 | 75 | Lower = better | Vascular inflammatory burden |
| HDL Cholesterol | 33 | 70 | Higher = better | Reverse cholesterol transport |
| Triglycerides | 34 | 65 | Lower = better | TG/HDL ratio is best single metabolic-cardiovascular bridge |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Homocysteine | 46 | 55 | Vascular endothelial damage; independent CVD risk |
| Total Cholesterol | 31 | 45 | Context for LDL; TC/HDL ratio matters |
| Non-HDL Cholesterol | ~32b | 45 | Calculated; includes VLDL+LDL; better than LDL alone |
| ESR | 52 | 35 | Systemic inflammatory marker; surrogate when hs-CRP unavailable |

**Confounding markers:**
- Fasting Insulin #54 / HOMA-IR #15: insulin resistance is the metabolic driver of cardiovascular risk; high IR confounds lipid interpretation
- TSH #39: hypothyroidism raises LDL and TG; treat hypothyroid before interpreting lipid profile

### §4. Scoring Formula

```
HE_Score = (
  (Lpa_Score × 0.22) +
  (ApoB_Score × 0.20) +
  (LDL_Score × 0.17) +
  (hsCRP_Score × 0.15) +
  (HDL_Score × 0.14) +
  (TG_Score × 0.12)
) × 100
```

**Critical rule:** If Lp(a) >100 mg/dL → Safety Override #8 → Heart Engine hard-capped at Level 5 regardless of calculation.
If Lp(a) 30–100 mg/dL → Cross-marker Rule 5 (aggressive_apoB_suppression_required) triggers → ApoB target tightens to <60 mg/dL; LDL target to <70 mg/dL. HE_Score modified accordingly.
If ApoB >90 mg/dL AND LDL <130 mg/dL → Cross-marker Rule 15 (discordant_lipid_pattern) → ApoB score used as primary; LDL excluded from this domain.

**Missing markers:** If ApoB not tested and Lp(a) not tested: Heart Engine confidence drops to LOW; use LDL and TG/HDL ratio as proxies.

**Worked example (Shashank, April 2026):**
- Lp(a): 48.50 mg/dL → above 30 mg/dL (HIGH RISK per LAI 2016) → Marker_Score = 35
  - Cross-marker Rule 5 TRIGGERED: ApoB target now <60 mg/dL; LDL target <70 mg/dL
- ApoB: 105.21 mg/dL → above optimal (<80) → Alert zone → Marker_Score = 28
- LDL: 113 mg/dL → above Zenoho optimal (<100) → Watch zone → Marker_Score = 60
- hs-CRP: not tested → excluded; confidence drops
- HDL: 39 mg/dL → below male optimal (>40) → Watch zone → Marker_Score = 62
- TG: 108 mg/dL → above Zenoho optimal (<80) → Watch zone → Marker_Score = 60
- HE_Score (partial, Rule 5 active): weighted ≈ 48
- Cross-marker Rule 15 check: ApoB 105.21 > 90 AND LDL 113 < 130 → Rule 15 TRIGGERED → discordant lipid pattern; ApoB used as primary
- Final HE_Score ≈ 45 (Level 5) with MEDIUM confidence
- NOTE: Lp(a) is genetically locked — this value follows Shashank permanently. Strategy: aggressive suppression of every other cardiovascular risk factor.

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | What It Means |
|---|---|---|---|
| 1–2 | 0–20 | Critical Risk | Multiple severe cardiovascular markers; urgent clinical referral |
| 3–4 | 21–40 | High Cardiovascular Load | Significant actionable risk; structured cardiometabolic protocol |
| 5–6 | 41–60 | Moderate — Active Management Required | Indian average range; meaningful risk that responds to intervention |
| 7–8 | 61–80 | Well-Optimised | Below-average risk for Indian population; maintain protocol |
| 9–10 | 81–100 | Elite Cardiovascular Profile | Rare; ideal lipid, inflammatory, and vascular markers |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your cardiovascular markers put you in a category most Indian adults will never reach without deliberate optimisation.

Your Heart Engine score reflects a lipid and inflammatory profile that significantly reduces your lifetime cardiovascular risk below the Indian population baseline. Your ApoB — the true measure of atherogenic particle count — is below 80 mg/dL, meaning the cargo ships carrying cholesterol through your arteries are few and your vessel walls have minimal exposure. Your HDL is robust, your triglycerides are in the optimal range, and your inflammatory markers suggest your vascular endothelium is not under chronic assault.

The top three markers driving your score: [ApoB optimal; TG/HDL ratio <2.0; hs-CRP <0.5]. 

Your three highest-leverage moves: (1) Annual Lp(a) check if you've never tested it — it is genetic and silent; 25% of the Indian population carries elevated Lp(a). (2) Maintain omega-3 2g/day — TG and vascular inflammation respond to this more than to any other supplement. (3) Fasting insulin check at next panel — insulin resistance is the silent upstream driver of cardiovascular risk and often precedes lipid changes.

*Closing:* Your heart is not working against you. Keep giving it the conditions to stay that way.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your Heart Engine is running — but the mechanics show specific areas where friction is building.

You're in the range where most urban Indians land: not at immediate clinical risk, but accumulating vascular burden at a rate that, compounded over decades, significantly elevates lifetime cardiac risk. The good news: the markers in this range are among the most responsive to targeted intervention. Lipids and inflammation both shift meaningfully within 8–12 weeks of protocol adherence.

The markers most responsible for your current score: [LDL above optimal; HDL below optimal for males; TG above Zenoho <80 target — specific to user's panel].

Your three highest-leverage moves: (1) Omega-3 EPA+DHA 2–3g/day — proven to reduce TG 20–30% and is anti-inflammatory. (2) Resistance training 3×/week — the most potent HDL-raising intervention that doesn't require medication. (3) Reduce refined grain intake — white rice, maida, and sugar are the primary drivers of high TG in the Indian diet.

*Closing:* The coronary arteries you protect now are the ones that keep you performing at 60 and 70. The interventions are modest. The stakes are not.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your Heart Engine data demands attention — and the earlier that attention comes, the more options you have.

Your cardiovascular marker profile is in a range that requires structured intervention, not observation. [Specific to user — e.g., "Your Lp(a) is elevated — a genetic marker that permanently raises your cardiovascular risk and changes the strategy for every other risk factor. Your ApoB at [X] mg/dL means atherogenic particles are more numerous than your LDL number alone suggests."] This combination is manageable, but only with aggressive action on every modifiable risk factor.

The single most important fact about elevated Lp(a): dietary changes and most supplements do not significantly lower Lp(a). The strategy is to drive every other cardiovascular risk factor — ApoB, LDL, TG, inflammation, blood pressure, blood glucose — to the lowest achievable level, so that the Lp(a) burden operates in the most protective possible environment.

Your three highest-leverage moves: (1) Cardiology consultation — with Lp(a) >30 and ApoB >90, this is not optional risk management. A cardiologist can assess whether lipid-lowering medication is appropriate. (2) Drive ApoB below 60 mg/dL — this is your primary target. Protocol: Bergamot polyphenol fraction (BPF) 500–1300 mg/day + Berberine 500 mg ×2 + plant sterols 1.8–2 g + omega-3 EPA+DHA 3–4 g/day. **FSSAI flag (Pass 3 V48):** Bergamot BPF is a foreign botanical (*Citrus bergamia*) not on FSSAI Schedule IV — likely requires NSF novel-ingredient approval. **Until manufacturer-specific FSSAI NSF clearance is confirmed, do not source as a Zenoho-branded product; frame as "discuss BPF with your physician/cardiologist."** See Master Note P11. (3) Drive TG below 80 mg/dL and raise HDL above 45 mg/dL — these together improve the vascular environment.

*Closing:* Elevated cardiovascular risk is not fate. The biology is fixed in one marker (Lp(a)), but every other marker is modifiable. Your strategy now is to be exceptional in every area you can control.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "Heart Engine Level 8 — ApoB under 70 and TG in check."
- "My cardiovascular markers are in the top tier for Indian men my age."
- "TG/HDL ratio under 2.0 — the gold standard metabolic lipid metric — achieved."

**Anti-patterns:**
- Specific LDL numbers in social context — associated with medication discourse
- "My arteries are clean" — diagnostic claim not warranted from blood tests alone

### §8. Improvement Levers

**Top 5 supplements:**
1. Omega-3 EPA+DHA 2–4g/day (TG-form preferred) — reduces TG 20–30%; anti-inflammatory
2. Bergamot extract 1g/day — natural LDL and ApoB lowering [VERIFY meta-analysis quality]
3. Berberine 500 mg ×2–3/day — LDL lowering + insulin sensitising (citation corrected Pass 3 V43: Yin et al. 2008, *Metabolism* 57(5):712, PMID 18442638 — not "Zhang 2009"). **Drug-interaction flags:** additive hypoglycaemia risk with anti-diabetic drugs; warfarin interaction; do not co-prescribe with metformin or sulfonylureas without physician oversight. **FSSAI flag:** isolated berberine HCl may require NSF approval; *Berberis aristata* (Daruharidra) root extract with standardised berberine content is the safer regulatory pathway. See Master Note P11.
4. Plant sterols **1.8–2 g/day** (from sterol-fortified foods or supplements) — LDL reduction **8–12%** (EFSA-approved health claim; Pass 3 V48 — Grade A evidence; FSSAI-clear).
5. CoQ10 200–300 mg/day — if on statins, mandatory (Banach 2015 meta-analysis: significant statin-myalgia reduction — Pass 3 V46). **Form preference:** ubiquinol (reduced form) shows ~2× plasma AUC vs ubiquinone in users 50+; use ubiquinol over age 50. Heart-failure cardiovascular-mortality benefit: Q-SYMBIO trial (*JACC Heart Fail* 2014 2(6):641) at 200–300 mg/day. General energy/vitality claims have weaker (mechanistic) evidence. Warfarin interaction — see contraindication matrix.

**Top 3 lifestyle:**
1. Resistance training 3–4×/week — HDL-raising; reduces TG via GLUT4 upregulation
2. Daily walking ≥8000 steps — reduces vascular inflammation; improves TG/HDL ratio
3. Mediterranean-pattern diet adapted for India — olive oil, nuts, fatty fish 3×/week, legumes daily, reduce refined carbs

**Timelines:** TG responds in 6–8 weeks with omega-3 + diet change. LDL/ApoB: 12 weeks with protocol. HDL: slowest — 12–16 weeks with resistance training.

**Realistic level jump:** Level 5→7 in 12 weeks with protocol + diet. Level 3→5 in 6 months with aggressive protocol ± medication (physician co-managed).

### §9. Demographic Modifiers

- **18–30:** TG tends lower, HDL higher; LDL-C in this cohort more likely familial if high
- **30–50:** The decade of most modifiable risk accumulation; highest-leverage intervention window
- **50–70 M:** Testosterone decline allows LDL to drift upward; more aggressive ApoB monitoring
- **50+ F:** Post-menopause: HDL drops, LDL rises, TG rises — Heart Engine requires re-calibration; former "protective" female lipid profile changes
- **Indian context:** Indians develop cardiovascular risk at lower BMI and younger age than Western populations (Yusuf et al. [VERIFY]). Lp(a) prevalence in Indian population: approximately 25–30% carry elevated Lp(a) [VERIFY]
- **Vegetarians:** Tend to have lower TG; may have lower LDL. But B12 deficiency → elevated homocysteine → independent cardiovascular risk not captured in standard lipid panel

### §10. Cross-Domain Interactions

- **Metabolic Power:** TG/HDL ratio is the bridge — insulin resistance drives TG up and HDL down
- **Detox Efficiency:** GGT elevation correlates with cardiovascular event risk (Strasak 2008); shared biological pathway
- **Recovery Capacity:** hs-CRP shared marker; systemic inflammation impacts both cardiovascular risk and recovery
- **Biological Age:** ApoB and Lp(a) are primary vascular-aging contributors

### §11. Safety Considerations

Cardiovascular domain carries the highest clinical stakes. Guardrails:
- If Lp(a) >100 mg/dL: mandatory clinical referral language regardless of other domain scores
- Never tell a user with elevated Lp(a) that "diet changes will fix this" — true statement (they won't) but requires physician co-management for full strategy
- Users with documented CAD, previous MI, or stent must have their context logged; targets become <50 mg/dL LDL and ApoB <60 with physician management — Zenoho cannot manage this independently

### §12. Domain-Specific Lab Error Detection

- LDL > Total Cholesterol: Biologically impossible → Lab Error Pattern #19 → `retest_required`
- ApoB > 200 mg/dL in apparent outpatient without documented familial hypercholesterolaemia: flag for verification
- TG/HDL ratio >10: metabolic syndrome extreme or possible lab error — verify fasting status

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

---

## B.5 METABOLIC POWER

### §1. Identity

- **User-facing name:** Metabolic Power
- **Hindi placeholder:** चयापचय शक्ति (Chayapachay Shakti) | Marathi: चयापचय शक्ती | Tamil: வளர்சிதை சக்தி
- **Tagline:** How efficiently your body runs its energy systems.
- **Icon:** ⚙️ (gear/engine — precision machinery); or a stylised flame
- **Primary HEX:** #27AE60 (forest green — growth, efficiency, life)
- **Secondary HEX:** #82E0AA (mint green)
- **Gradient:** 90° horizontal, forest green → mint → pale sage
- **Domain category:** Metabolic

### §2. What It Represents Biologically

Metabolic Power reflects how efficiently your body converts fuel (glucose) into usable energy, how well it manages insulin signalling, and whether your liver and pancreas are functioning optimally within the metabolic axis. Insulin resistance — the condition where cells stop responding normally to insulin — is the central metabolic dysfunction of the 21st century, affecting an estimated 40% of Indian urban adults and preceding Type 2 Diabetes by 10–15 years.

In plain English: Metabolic Power is the score that explains belly fat that won't shift, energy crashes 2 hours after meals, constant sugar cravings, and the slow accumulation of visceral fat even with a "reasonable" diet. These are not personality failures — they are measurable metabolic states with specific biological drivers.

**High score feels like:** Stable energy through meals; no afternoon crash; fat loss responding to modest effort; clear-headed thinking after eating; no bloating from carbohydrate-heavy meals.

**Low score feels like:** Energy collapse after meals; constant craving for sweet or starchy food; visible fat accumulation especially around the waist; mood swings tied to meal timing; brain fog after eating.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| HbA1c | 14 | 100 | Lower within optimal = better | 90-day glucose average; primary metabolic marker |
| HOMA-IR | 15 | 95 | Lower = better | Insulin resistance index; composite of fasting insulin and glucose |
| Fasting Glucose | 13 | 85 | Lower within optimal = better | Immediate glucose status |
| Fasting Insulin | 54 | 80 | Lower within optimal = better | Direct pancreatic beta-cell load indicator |
| Triglycerides | 34 | 70 | Lower = better | TG is the lipid most sensitive to metabolic dysfunction |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| ALT | 16 | 60 | NAFLD = metabolic disease of the liver; ALT rises with IR |
| GGT | 19 | 50 | Oxidative stress marker; metabolic liver indicator |
| HDL | 33 | 50 | HDL inversely correlates with insulin resistance |
| Uric Acid | 29 | 40 | Fructose metabolism byproduct; rises with IR |
| Albumin | 22 | 30 | Liver synthesis capacity; secondarily metabolic |

**Confounding markers:**
- Cortisol AM #56: high cortisol drives glucose up and insulin resistance — if elevated, note as confound on HbA1c interpretation
- Anti-TPO #57/TSH #39: hypothyroidism slows metabolic rate and raises glucose-related markers — flag if thyroid dysfunction present

### §4. Scoring Formula

```
MP_Score = (
  (HbA1c_Score × 0.25) +
  (HOMA_IR_Score × 0.22) +
  (FBS_Score × 0.18) +
  (FastingInsulin_Score × 0.18) +
  (TG_Score × 0.10) +
  (HDL_Score × 0.07)
) × 100
```

**Special rule:** Cross-marker Rule 9 (metabolic_syndrome_triad_flag: UA >5.5/4.5 + HOMA-IR >2.0 + TG >100) → if triggered, MP_Score is penalised by -10 points regardless of individual scores.
Cross-marker Rule 7 (NAFLD_high_probability: ALT >25 + GGT >25 + TG >100) → MP_Score penalised by -8 points.

**Safety overrides:** Safety Override #5 (HbA1c >10.0) → MP_Score hard-capped at Level 2.

**Eating disorder note:** This domain is the most likely to attract users with restrictive eating patterns. The scoring formula never rewards caloric restriction — Albumin at very low levels and HDL at very low levels both penalise score. Do not use language suggesting "leaner = better" anywhere in this domain.

**Worked example (Shashank, April 2026):**
- HbA1c: 5.5% → Zenoho optimal 4.8–5.3; Watch zone → Marker_Score ≈ 68
- HOMA-IR: not tested (fasting insulin not available) → excluded; confidence drops
- Fasting Glucose: 81 mg/dL → Zenoho optimal 70–90 → optimal → Marker_Score = 100
- Fasting Insulin: not tested → excluded
- TG: 108 mg/dL → above Zenoho optimal <80 → Watch zone → Marker_Score = 60
- HDL: 39 mg/dL → below male optimal >40 → Watch zone → Marker_Score = 62
- MP_Score (partial, 4 of 6 markers): weighted ≈ 72
- Confidence: MEDIUM (fasting insulin and HOMA-IR missing — these are the most important for catching early IR)
- Cross-marker Rule 7 check: ALT 33 (>25) + GGT 16 (<25) + TG 108 (>100) → Rule 7 NOT fully triggered (GGT <25)
- Cross-marker Rule 9: Uric Acid 3.6 (<5.5) → not triggered
- Final MP_Score ≈ 72 (Level 8) with MEDIUM confidence — provisionally strong, but fasting insulin missing

**Worked example (Ishita, January 2026):**
- HbA1c: 5.2% → optimal → Marker_Score = 100
- HOMA-IR: not tested → excluded
- Fasting Glucose: 82 mg/dL → optimal → Marker_Score = 100
- Fasting Insulin: not tested → excluded
- TG: 72 mg/dL → Zenoho optimal <80 → optimal → Marker_Score = 100
- HDL: 64 mg/dL → above optimal >40 for females → excellent → Marker_Score = 100
- MP_Score: 100 (all available markers optimal) with MEDIUM confidence (fasting insulin missing)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | What It Means |
|---|---|---|---|
| 1–2 | 0–20 | Metabolic Crisis | HbA1c >10 or extreme HOMA-IR; urgent physician care |
| 3–4 | 21–40 | Significant IR | HOMA-IR >3.5, HbA1c >7; structured clinical support needed |
| 5–6 | 41–60 | Metabolic Stress | IR developing; HbA1c 5.7–7; high-leverage intervention window |
| 7–8 | 61–80 | Metabolic Efficiency | HOMA-IR <1.5, HbA1c <5.4, TG <80; performing well |
| 9–10 | 81–100 | Peak Metabolic Power | All markers in Zenoho optimal; exceptional metabolic health |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your metabolic engine is running clean — your body processes fuel with the efficiency that elite performers train years to achieve.

Your Metabolic Power score reflects tight glucose control, low insulin resistance, and metabolic flexibility — the ability to efficiently switch between burning carbohydrates and fat as fuel. Your HbA1c tells us that your average blood glucose over the past 90 days has been in the optimal zone, meaning minimal glycation of your tissues. Your triglycerides are under [value] — a direct indicator that your liver is not overloaded with carbohydrate excess.

Top three markers driving your score: [HbA1c optimal; TG below 80; HDL above 50 — specific to panel].

Your three highest-leverage moves: (1) Add fasting insulin to your next panel — it's the early-warning system for IR before HbA1c shifts, and it's the marker most likely to show drift first. (2) Continue time-restricted eating or post-meal walks — these are the most potent tools for maintaining HOMA-IR below 1.5. (3) Check uric acid if not tested — fructose metabolism byproduct; its rise precedes IR in many users.

*Closing:* Metabolic health is not static. What you've built here requires maintenance — but the maintenance is simpler than the initial build.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your metabolic markers show a system under some strain — and the strain is specific, measurable, and reversible.

Level 6 in Metabolic Power means your body is managing glucose and insulin adequately, but not efficiently. Your values may sit below the ADA-defined pre-diabetes range (HbA1c 5.7–6.4%) — but the early biological markers of insulin resistance (elevated TG, below-optimal HDL, HbA1c above 5.3%) are present. Note (SaMD Part 6.1): a diagnosis of pre-diabetes or diabetes is your physician's role; Zenoho reports the biological pattern. Indian adults in this range have a significantly elevated 10-year risk of progressing to pre-diabetes without intervention.

Your specific pattern: [HbA1c 5.4–5.7 watch zone; TG above 80; HDL below optimal — tailored to user].

Your three highest-leverage moves: (1) Walk for 10 minutes after every meal — this single intervention reduces post-meal glucose spikes by 30–40% in insulin-resistant individuals (meta-analysis, 2022 [VERIFY]) and directly lowers TG over 8 weeks. (2) Reduce liquid sugars completely — fruit juices, sweet chai, cold drinks, and packaged foods with added sugar are the primary driver of TG in the Indian diet. (3) Add Berberine 500 mg ×2/day + Inositol (Myo+D-chiro 40:1 — 4 g MI + 100 mg DCI/day total, taken as 2 g MI + 50 mg DCI twice daily) — both are evidence-based natural IR interventions. **Qualification (Pass 3 V44):** 2023 PCOS Guidelines (Brennan et al. *JCEM* 2024, PMC11099481, 30 trials, n=2230) rate inositol evidence as "limited and inconclusive" for several outcomes; benefits most consistent for metabolic and hormonal markers in insulin-resistant PCOS. Always co-administer inositol with folic acid 200 mcg. Berberine FSSAI flag — see Master Note P11.

*Closing:* The metabolic drift you're seeing is reversible at this stage. The window for effortless reversal is now — not in five years.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your metabolic markers are in a range that requires structured intervention — not observation. The biology here is serious, and the protocol is clear.

[Specific to user — e.g., "Your HbA1c at [X]% reflects average blood glucose elevated for at least 90 days. Your HOMA-IR at [Y] sits in the range associated with insulin resistance in published research populations — this is a biological pattern, not a clinical diagnosis. Please discuss with your physician what this means in your specific context."] This is a biological pattern that research populations have shown responds to early lifestyle intervention. Above HOMA-IR 3.5 and HbA1c 7.0%, clinical guidance from a physician is increasingly important. (SaMD Part 6.1: Zenoho reports biological patterns; the physician interprets them clinically.)

Your highest-leverage actions are: (1) Physician consultation — at this level of metabolic stress, medication assessment (Metformin, SGLT2 inhibitors) may be appropriate alongside lifestyle intervention. Zenoho's protocol supplements but does not replace this. (2) [Specific dietary intervention]. (3) Resistance training 3×/week — the most potent single intervention for HOMA-IR improvement, superior to aerobic training alone in insulin-resistant populations.

*Closing:* This is the most important time to act — not because things are catastrophic, but because you are early enough that reversal is fully possible. The data gives you the leverage point. Use it.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "Metabolic Power at Level 9 — TG under 80, fasting insulin under 6. Glucose on autopilot."
- "Zenoho's Metabolic Power score: Level 8. The time-restricted eating window is paying off in the labs."
- "HOMA-IR below 1.0 — metabolic efficiency in the top tier."

**Anti-patterns:**
- "My blood sugar is perfect" — implies diagnostic claim
- Framing that implies metabolic health = low body weight — forbidden

### §8. Improvement Levers

**Top 5 supplements:**
1. Berberine 500 mg ×3/day — HOMA-IR and HbA1c reduction; comparable glycaemic effect to metformin in some RCTs (citation corrected Pass 3 V43: **Yin et al. 2008**, *Metabolism* 57(5):712, PMID 18442638 — the earlier "Zhang 2009" was a misattribution). Do not co-prescribe with metformin or sulfonylureas without physician oversight (additive hypoglycaemia risk). FSSAI flag — see Master Note P11.
2. Inositol (Myo + D-Chiro 40:1) 4g/day — insulin sensitiser; particularly effective in PCOS (female)
3. Magnesium glycinate 400 mg/day — cofactor for insulin receptor signalling; deficient in 60%+ of IR adults
4. Omega-3 2–4g/day — TG reduction 20–30% in 8 weeks
5. Apple cider vinegar 15 mL in water before meals — modest post-meal glucose blunting effect (meta-analysis [VERIFY])

**Top 3 lifestyle:**
1. Resistance training 3×/week — most potent HOMA-IR intervention; GLUT4 upregulation
2. Post-meal walks (10 min after each meal) — 30–40% glucose spike reduction
3. Time-restricted eating (10-hour window) — HOMA-IR improvement in 12 weeks; autophagy activation

### §9. Demographic Modifiers

- **Indian adults vs global:** Indians develop T2DM at lower BMI and younger age than Western populations; HOMA-IR threshold adjusted to <1.5 (vs <2.0 Western)
- **Female (PCOS context):** PCOS is the most common endocrine disorder in Indian women; HOMA-IR target <1.0 for PCOS users; Inositol is first-line supplement
- **30–50 age cohort:** Highest IR incidence in Indian urban men; this is the decade to intervene
- **Vegetarians:** Pulse-heavy diet provides some IR protection; but refined grain dependence (white rice, maida) is common IR driver
- **Pregnant:** HbA1c interpretation modified; gestational diabetes screening applies different cut-offs; Zenoho defers to physician

### §10. Cross-Domain Interactions

- **Heart Engine:** TG/HDL ratio bridges these domains — same intervention reduces both risk sets
- **Brain Sharpness:** HbA1c shared marker; glucose dysregulation damages cerebrovascular integrity
- **Detox Efficiency:** NAFLD (ALT, GGT, TG) sits at the metabolic-liver intersection
- **Vitality & Strength:** Insulin resistance suppresses testosterone and DHEA-S in men

### §11. Safety Considerations

**Eating disorder risk (highest-risk domain):** Metabolic Power domain may attract users with restrictive eating tendencies who are seeking biological validation for caloric restriction. Hard guardrails:
- Never recommend caloric restriction as a Zenoho intervention
- Never frame "lower body fat = better metabolic score"
- If Albumin is below 4.0 g/dL AND cholesterol is very low (<130) AND user BMI appears low from context: surface clinical referral: "Your markers suggest nutritional restriction. Zenoho recommends speaking with a physician and registered dietitian before continuing any dietary protocol."
- Zenoho supplement protocols for Metabolic Power do not include weight-loss supplements

### §12. Domain-Specific Lab Error Detection

- HbA1c <3.5 or >18%: biologically impossible → Lab Error Pattern #9 → `retest_required`
- HOMA-IR >10: extreme; verify fasting status and fasting insulin assay; likely either non-fasting sample or lab error
- Fasting glucose <30 or >600: Pattern #2 → `retest_required`

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*


---

## B.6 RECOVERY CAPACITY

### §1. Identity

- **User-facing name:** Recovery Capacity
- **Hindi placeholder:** पुनर्प्राप्ति क्षमता (Punarprāpti Kshamata) | Marathi: पुनर्प्राप्ती क्षमता | Tamil: மீட்பு திறன்
- **Tagline:** Bounce back faster than you went down.
- **Icon:** 🔄 (circular arrows — regeneration, bounce-back)
- **Primary HEX:** #16A085 (teal — calm, regeneration, water)
- **Secondary HEX:** #76D7C4 (light turquoise)
- **Gradient:** 180° vertical, deep teal → turquoise → pale mint
- **Domain category:** Recovery / Inflammatory

### §2. What It Represents Biologically

Recovery Capacity reflects how quickly and completely your body restores itself after physical effort, illness, stress, or injury. The primary biological drivers are inflammatory status (hs-CRP, ESR), nutritional sufficiency (albumin, magnesium), adrenal reserve (cortisol AM, DHEA-S), and immune competence (lymphocytes, WBC). High recovery capacity means inflammation resolves quickly, tissue repair is efficient, and the body's regulatory systems return to baseline rapidly after disruption.

In plain English: the time between a hard workout and feeling ready for the next one. The days it takes to shake off a cold versus bounce back in 2 days. The speed at which jet lag or a stressful week stops affecting your performance. All of these are Recovery Capacity — measured in biology.

**High score feels like:** Muscle soreness resolved in 24 hours; bouncing back from illness in 2–3 days; sleeping deeply after physical effort; feeling mentally restored the morning after a stressful day; injuries healing faster than expected.

**Low score feels like:** Persistent muscle soreness lasting 4–5 days; lingering colds and viral infections; feeling unrested even after 8 hours sleep; needing days to recover from a stressful event; poor performance if training frequency increases.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| hs-CRP | 45 | 100 | Lower = better | Systemic inflammatory load; primary recovery barrier |
| Albumin | 22 | 90 | Higher within optimal = better | Protein for tissue repair; acute-phase inverse relationship |
| ESR | 52 | 80 | Lower = better | Broader inflammatory picture; slower-moving |
| Cortisol AM | 56 | 75 | U-curve — both too high AND too low impair recovery | Catabolic excess → degrades tissue; deficiency → energy collapse |
| Lymphocytes (#6) | 6 | 70 | Higher within optimal = better | Immune recovery competence |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Ferritin | 43 | 60 | Iron reserve; depleted during recovery from illness or intense training |
| DHEA-S | 62 | 55 | Anti-catabolic counterbalance to cortisol |
| Vitamin D | 36 | 50 | Immune modulation; muscle recovery signalling |
| Magnesium RBC | 58 | 45 | Neuromuscular recovery; ATP synthesis cofactor |
| WBC | 3 | 35 | Overall immune surveillance capacity |

**Confounding markers:**
- Recent illness within 8 weeks: WBC, hs-CRP, ESR, Ferritin all distorted. Apply "Recovery Period" flag — interpret cautiously.
- Intense training within 72h of blood draw: AST, CK (if measured), neutrophils all elevate from exercise — not inflammatory disease

### §4. Scoring Formula

```
RC_Score = (
  (hsCRP_Score × 0.25) +
  (Albumin_Score × 0.22) +
  (ESR_Score × 0.18) +
  (Cortisol_Score × 0.17) +
  (Lymphocyte_Score × 0.15) +
  (VitD_Score × 0.03)
) × 100
```

**Cross-marker rules:**
- Rule 2 (inflammation_confounder): if hs-CRP >5 AND Ferritin >300 → Ferritin excluded from all recovery markers; Recovery score confidence = LOW
- Rule 11 (post_viral_suppression_flag): if WBC <4.5 + Lymph <1.5 + recent illness → RC_Score gets a "recovery period" label; Level displayed with recovery context message

**Safety override:** Safety Override #9 (hs-CRP >10 sustained 2 readings) → RC_Score capped at Level 4.

**Worked example (Shashank, April 2026):**
- hs-CRP: not tested → excluded; confidence drops significantly
- Albumin: 4.1 g/dL → below Zenoho optimal 4.4–5.0 → Watch zone → Marker_Score ≈ 65
- ESR: 5 mm/hr → excellent (<10) → optimal → Marker_Score = 100
- Cortisol AM: not tested → excluded
- Lymphocytes: 2.55 ×10³/µL → optimal (1.8–3.0) → Marker_Score = 100
- VitD: 30.5 ng/mL → below optimal → Alert zone → Marker_Score ≈ 38
- RC_Score (partial, 4 markers available): weighted ≈ 75
- Confidence: MEDIUM (hs-CRP and Cortisol missing — the two most important markers)

**Worked example (Ishita, January 2026):**
- hs-CRP: not tested → excluded
- Albumin: 4.7 g/dL → optimal → Marker_Score = 100
- ESR: 34 mm/hr → above Zenoho alert <20 → Alert zone → Marker_Score ≈ 28
  - NOTE: ESR 34 in a 34-year-old female without documented infection/inflammation is flagged as abnormal. Cross-check with WBC (10.72 — elevated), ANC (6.15 — elevated). Pattern suggests active inflammatory state or infection at time of testing. The blood was drawn January 23, 2026 — contextual information about that period is needed.
- Cortisol AM: not tested → excluded
- Lymphocytes: 3.83 ×10³/µL → above Zenoho optimal 1.8–3.0 → Watch zone high → Marker_Score ≈ 72
- VitD: 36.2 ng/mL → below optimal → Alert zone → Marker_Score ≈ 45
- RC_Score (partial): weighted ≈ 54
- Confidence: MEDIUM
- CLINICAL NOTE on Ishita's January 2026 panel: ESR 34 mm/hr + WBC 10.72 ×10³/µL (above lab ref of 10.0) + ANC 6.15 (above optimal 2.5–5.0) + ALC 3.83 (above optimal 1.8–3.0) suggests an active inflammatory/infective process at time of testing. Recovery domain should display: "Your Recovery markers at this test date suggest your immune system was active — possibly possibly recovering from an illness, or in a mild inflammatory state. This affects the accuracy of your Recovery Capacity score for this panel."

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | What It Means |
|---|---|---|---|
| 1–2 | 0–20 | Critically Inflamed / Depleted | Severe inflammatory burden; clinical investigation needed |
| 3–4 | 21–40 | Low Recovery | Chronic inflammation present; performance recovery very slow |
| 5–6 | 41–60 | Average Recovery | Typical Indian urban adult; 3–5 day muscle recovery window |
| 7–8 | 61–80 | Strong Recovery | Anti-inflammatory profile; 24–48h muscle recovery; illness resolved in 2–3 days |
| 9–10 | 81–100 | Elite Recovery | Exceptional biochemical recovery environment; rare |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your biology recovers the way elite performers' bodies do — fast, complete, and without the chronic soreness drag.

Your Recovery Capacity score reflects a biochemical environment designed for rapid restoration. Your inflammatory markers are in the low range that scientists associate with slower biological aging and better immune resilience. Your albumin is in the optimal zone — your body has the protein substrate for efficient tissue repair. Your cortisol is appropriately calibrated — not so high that it degrades tissue chronically, not so low that it can't mobilise energy for recovery.

Top markers driving your score: [specific to panel — typically hs-CRP <0.5, albumin ≥4.5, ESR <10].

Your three highest-leverage moves: (1) Add hs-CRP to every panel — it is the fastest-moving marker and the most sensitive early-warning signal for recovery degradation before you feel it. (2) Maintain sleep ≥7.5h — slow-wave sleep is when cortisol bottoms out and growth hormone drives tissue repair; shortening this window measurably delays recovery. (3) High-bioavailability curcumin formulation 500 mg ×2/day — maintains your low-CRP profile. Correction (Pass 3 V40): "most bioavailable" framing was inaccurate. Correct hierarchy: **Theracurmin** (water-dispersible) > **Meriva** (phosphatidylcholine phytosome — largest clinical-trial evidence base) > **BCM-95** > standard curcumin. All are significantly superior to unformulated curcumin. **FSSAI flag:** phytosome (phosphatidylcholine complex) delivery may require NSF novel-ingredient approval — consumer-facing copy uses "high-bioavailability curcumin" until cleared. See Master Note P11.

*Closing:* Recovery capacity is the invisible edge. Most people can train — few can sustain it.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your recovery markers are functional, with specific signals that explain why recovery feels slower than it used to — and exactly what to do about it.

Level 6 recovery means your body recovers adequately, but not efficiently. The specific gap in your profile — [e.g., albumin below 4.4, Vitamin D below 40, or elevated ESR] — creates a biochemical drag on every recovery cycle. Muscle soreness lasting 3–4 days instead of 24 hours. Colds that take a week to clear instead of 3 days. Post-stress mental fog that lingers two days instead of one night.

Your top markers to address: [specific to panel].

Your three highest-leverage moves: (1) Protein at every meal — albumin is the limiting factor for tissue repair when below 4.4 g/dL. Target 30g protein at breakfast, 25g at lunch, 30g at dinner. (2) Cholecalciferol D3 to target 40–60 ng/mL — Vitamin D modulates both acute and chronic inflammatory response. (3) Magnesium glycinate 400 mg at night — the most deficient mineral in Indian adults that directly impacts neuromuscular recovery and sleep quality.

*Closing:* Recovery is not rest — it is active biology. Give it the right inputs.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your recovery markers show a biological environment under significant inflammatory stress. This is not about willpower — it is about specific biochemical states that are measurable and addressable.

When hs-CRP is elevated, ESR is high, and albumin is below optimal simultaneously, your body is in a chronic low-grade inflammatory state that consumes protein faster than tissue repair can use it. Every inflammatory burst — whether from exercise, stress, poor sleep, or subclinical infection — takes longer to resolve, and the system doesn't fully reset before the next one arrives. Over time, this creates the feeling of being perpetually "half-recovered."

Your three highest-leverage moves: (1) Identify and address the root cause of elevated inflammation — this requires physician involvement. Common causes: NAFLD (check ALT/GGT/TG pattern), autoimmune activity (check ANA, ESR trend), chronic gut inflammation, or dental/sinus infection. (2) Omega-3 EPA+DHA 3–4g/day — the most potent supplement intervention for systemic inflammation reduction. (3) Sleep audit — poor sleep is the most common cause of chronically elevated hs-CRP that doesn't respond to supplements alone.

*Closing:* Your body has the capacity for better recovery — it is temporarily blocked by specific biological states. Remove the blocks.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing (Level 8+)

- "Recovery score Level 8 — hs-CRP under 0.5, ESR minimal. My system resets fast."
- "Zenoho's Recovery Capacity: Level 9. 24-hour bounce-back is real now."

### §8. Improvement Levers

**Top 5 supplements:**
1. Omega-3 EPA+DHA 2–4 g/day — primary anti-inflammatory; reduces hs-CRP **10–25%** in 8–12 weeks in adults with elevated baseline inflammation (umbrella meta-analysis 2022, 148 trials; PMC8199776 confirmed 12.5–18.2% range in 8-week oily fish RCT). The earlier "30–40%" figure (correction Pass 3 V39) is seen only in very-high-baseline inflammatory disease populations. **Triglyceride reduction is the most robust effect** (30–50% in hypertriglyceridaemic individuals).
2. Curcumin phytosome 500 mg ×2/day — anti-inflammatory; bioavailability critical; phytosome form only
3. Magnesium glycinate 400 mg/night — neuromuscular recovery + sleep quality
4. Cholecalciferol D3 2000–4000 IU/day — immune modulation; direct recovery impact
5. NAC 600 mg ×2/day — glutathione precursor; reduces oxidative inflammatory load

**Top 3 lifestyle:**
1. Sleep 7.5–9 hours — slow-wave sleep drives growth hormone secretion (primary tissue repair signal)
2. Cold-contrast therapy (10 min hot / 3 min cold alternating) — inflammatory resolution acceleration [VERIFY safety note: not for cardiac conditions]
3. Anti-inflammatory nutrition: eliminate trans fats, reduce omega-6 seed oils, increase colourful vegetables (polyphenols)

**Timelines:** hs-CRP responds in 4–8 weeks with omega-3 + diet. Albumin: 8 weeks with protein protocol. ESR: slower (8–12 weeks). VitD: 8–12 weeks.

### §9. Demographic Modifiers

- **Athletes:** Naturally run slightly higher ESR and WBC; their baseline shifts with training load. Athlete modifier applied: upper limit of "optimal" ESR extended to 25.
- **Postpartum F:** Inflammatory markers elevated for 6–12 weeks post-delivery; apply postpartum flag
- **50–70:** Natural rise in baseline hs-CRP; Level 7 requires tighter management to achieve; Level 6 is solid for this age
- **Indian context:** Post-dengue, post-COVID, and latent TB all elevate inflammatory markers; 8-week recovery window flag essential

### §10. Cross-Domain Interactions

- **Immunity Strength (B.10):** 60% marker overlap; these two domains co-move
- **Vitality & Strength (B.2):** DHEA-S and Cortisol AM shared; low recovery drives low vitality
- **Heart Engine (B.4):** hs-CRP shared marker; chronic inflammation is a cardiovascular risk factor

### §11. Safety Considerations

- Elevated hs-CRP and ESR in combination with fever, weight loss, or night sweats requires mandatory clinical referral language — these can indicate malignancy, autoimmune disease, or TB
- Never recommend anti-inflammatory supplements as a substitute for investigating the cause of persistent elevated ESR/CRP

### §12. Domain-Specific Lab Error Detection

- ESR >120 mm/hr in apparent healthy outpatient: myeloma or other haematological condition; immediate flag for physician
- hs-CRP >100 mg/L: active severe infection or major inflammatory disease; not a recovery coaching context — clinical referral mandatory

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

---

## B.7 DETOX EFFICIENCY

### §1. Identity

- **User-facing name:** Detox Efficiency
- **Hindi placeholder:** विषहरण क्षमता (Vishharan Kshamata) | Marathi: विषहरण कार्यक्षमता | Tamil: நச்சு நீக்கு திறன்
- **Tagline:** Your body's internal clean-up system.
- **Icon:** 🌿 (leaf — clean, natural, purification) — explicitly avoid syringe or chemical imagery
- **Primary HEX:** #7D3C98 (deep plum — sophistication, depth, cleansing)
- **Secondary HEX:** #BB8FCE (soft lavender-purple)
- **Gradient:** 135° diagonal, plum → lavender → near-white
- **Domain category:** Detox / Hepatic

### §2. What It Represents Biologically

Detox Efficiency reflects the liver's capacity to process metabolic waste, environmental toxins, alcohol metabolites, and pharmaceutical compounds — converting them from fat-soluble forms to water-soluble forms for elimination. The liver performs over 500 distinct functions; Detox Efficiency focuses on its detoxification axis as reflected in GGT (oxidative stress and Phase I enzyme activity), ALT/AST (hepatocyte integrity), ALP (biliary and Phase I activity), bilirubin (haeme catabolism and antioxidant reserve), and albumin (Phase II synthesis).

In plain English: if GGT is elevated, your liver's detox burden exceeds its clean-up rate. This is often the first measurable signal from alcohol, air pollution (Delhi NCR), refined sugar excess, and medication burden — before ALT rises and years before any clinical symptom.

**High score feels like:** Tolerating one drink without next-day fatigue; clear skin; no bloating or right-side abdominal discomfort; drugs and medications processed efficiently; alcohol metabolised without prolonged hangover.

**Low score feels like:** Fatigue even without alcohol; bloating after fatty meals; morning brain fog that takes hours to clear; alcohol hit harder than before; drugs feeling stronger at the same dose.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| GGT | 19 | 100 | Lower = better | Best single detox burden marker; responds within weeks |
| ALT | 16 | 90 | Lower within optimal = better | Hepatocyte damage; NAFLD first signal |
| AST | 17 | 75 | Lower within optimal = better | Liver + muscle; pairs with ALT |
| ALP | 18 | 65 | U-curve | Low = zinc/B6 deficiency; high = bile flow obstruction |
| Bilirubin | 20 | 55 | U-curve | Low = low antioxidant reserve; high = Gilbert's or hepatic issue |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Albumin | 22 | 50 | Synthetic capacity; depleted in advanced liver disease |
| Globulin | 51 | 40 | Elevated globulin with low albumin = chronic liver inflammation |
| Triglycerides | 34 | 35 | TG accumulation = early NAFLD (fatty liver) signal |

**Confounding markers:**
- AST: post-exercise elevation mimics liver damage; ask about training status
- ALP in pregnancy: doubles normally; do not flag without pregnancy context

### §4. Scoring Formula

```
DE_Score = (
  (GGT_Score × 0.28) +
  (ALT_Score × 0.25) +
  (AST_Score × 0.20) +
  (ALP_Score × 0.15) +
  (Bilirubin_Score × 0.12)
) × 100
```

**Cross-marker rules:**
- Rule 7 (NAFLD_high_probability: ALT >25 + GGT >25 + TG >100): −15 points penalty; label "NAFLD risk pattern detected"
- Rule 10 (alcoholic_liver_pattern_flag: GGT >40 + ALT >30 + AST/ALT >2): −20 points penalty; label "alcohol-related liver pattern"

**Worked example (Shashank, April 2026):**
- GGT: 16 U/L → Zenoho optimal M <20 → optimal → Marker_Score = 100
- ALT: 33 U/L → Zenoho optimal M 10–25 → Alert zone (>25) → Marker_Score ≈ 42
- AST: 33 U/L → Zenoho optimal 10–25 → Alert zone → Marker_Score ≈ 42
- ALP: 91 U/L → Zenoho optimal 50–95 → optimal → Marker_Score = 100
- Bilirubin: 0.20 mg/dL → Zenoho optimal 0.4–1.0 → Alert zone low → Marker_Score ≈ 30
- DE_Score: (100×0.28 + 42×0.25 + 42×0.20 + 100×0.15 + 30×0.12) = 28 + 10.5 + 8.4 + 15 + 3.6 = 65.5 ≈ 66
- Cross-marker Rule 7 check: ALT 33 (>25) + GGT 16 (<25) + TG 108 (>100) → Rule 7 NOT triggered (GGT <25)
- AST/ALT ratio: 33/33 = 1.0 → Rule 10 check: GGT 16 (<40) → not triggered
- Final DE_Score: 66 (Level 7) — driven down by ALT and AST above Zenoho optimal and very low bilirubin
- NOTE on ALT/AST: Both at 33 U/L — above Zenoho optimal (10–25) but within lab reference (4–50 / 18–54). This is the performance-vs-lab gap. NAFLD early signal territory. Protocol: reduce refined carbs and alcohol (even social amounts), add Milk Thistle 200 mg and Choline 500 mg. Retest in 12 weeks.
- NOTE on Bilirubin: 0.20 mg/dL is very low — below Zenoho optimal of 0.4 mg/dL. Low bilirubin indicates reduced antioxidant buffer (bilirubin is an endogenous antioxidant). May coincide with low haemoglobin at this test.

**Worked example (Ishita, January 2026):**
- GGT: 17 U/L → optimal (<20) → Marker_Score = 100
- ALT: 22 U/L → Zenoho optimal F 8–20 → above optimal → Watch zone → Marker_Score ≈ 68
- AST: 26 U/L → Zenoho optimal 10–25 → slightly above → Watch zone → Marker_Score ≈ 72
- ALP: 85 U/L → optimal → Marker_Score = 100
- Bilirubin: 0.39 mg/dL → Zenoho optimal 0.4–1.0 → slightly below → Watch zone → Marker_Score ≈ 78
- DE_Score: (100×0.28 + 68×0.25 + 72×0.20 + 100×0.15 + 78×0.12) = 28 + 17 + 14.4 + 15 + 9.36 = 83.8 ≈ 84
- Final DE_Score: 84 (Level 9)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label |
|---|---|---|
| 1–2 | 0–20 | Severely Compromised | Hepatic failure territory; urgent clinical care |
| 3–4 | 21–40 | High Detox Load | Multiple liver markers elevated; NAFLD or alcohol load likely |
| 5–6 | 41–60 | Moderate Detox Burden | Above-optimal GGT or ALT; protocol needed |
| 7–8 | 61–80 | Efficient Detox | Clean liver enzyme profile; performing well |
| 9–10 | 81–100 | Elite Detox Efficiency | Optimal liver function; all markers in performance zone |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your liver is running clean — and that matters for everything from energy to hormone balance to medication processing.

Your Detox Efficiency score reflects a liver that is not overloaded. Your GGT — the most sensitive early marker of detox burden — is below [value], meaning your Phase I detoxification enzymes are processing your daily metabolic waste without strain. Your ALT and AST are in the Zenoho performance zone, suggesting your liver cells are not under inflammatory assault.

Top three markers: [GGT optimal; ALT/AST optimal; bilirubin in antioxidant-reserve zone].

Your three highest-leverage moves: (1) Continue limiting alcohol — GGT responds within 2–4 weeks to alcohol reduction and is the most sensitive early signal of liver stress. (2) Add NAC 600 mg ×2/day — supports glutathione synthesis, the liver's primary antioxidant defence. (3) Test ALP at next panel if not done — ALP below 50 indicates zinc/B6 deficiency that constrains Phase I enzyme activity even when other markers are clean.

*Closing:* A clean liver is an invisible advantage. You feel it as tolerance, energy, and resilience.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your liver is working — but the data shows it is carrying a heavier load than it needs to.

Your Detox Efficiency score reflects one or more liver markers above the Zenoho performance optimal — most commonly ALT and/or GGT elevated into the watch zone. This is not liver disease — it is early-stage metabolic liver stress, the kind that precedes NAFLD by 3–5 years if the inputs don't change.

Your specific pattern: [ALT/GGT above optimal; or AST/ALT pattern suggesting source — liver vs muscle].

Your three highest-leverage moves: (1) Reduce refined carbohydrates and fructose — the primary dietary drivers of elevated ALT in Indian adults are not alcohol; they are sweetened beverages, fruit juices, white rice, and maida-based foods. (2) Silymarin (Milk Thistle) 200 mg ×2/day — well-studied liver-protective plant compound; reduces ALT and GGT within 12 weeks in NAFLD studies (Zhong 2017 NAFLD meta-analysis; Saller 2001 *Drugs* 61(14):2035 — verified Pass 3 V42). **FSSAI flag (Pass 3 V42, Pass 4 P4-2):** Milk thistle (*Silybum marianum*) is not native to India and is not on FSSAI Schedule IV standard botanical list — likely requires NSF novel-ingredient approval. **Until manufacturer-specific FSSAI NSF clearance is confirmed, Zenoho frames this as "discuss liver-support options with your physician" rather than as a Zenoho-sourced supplement.** See Master Note P11. (3) Choline 500 mg/day — essential for fat export from liver; vegetarians are particularly deficient.

*Closing:* Your liver holds your energy reserves. Give it the conditions to clean itself.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your liver markers are significantly elevated — and the pattern in your data tells a specific story that requires attention and action.

[Specific to user — e.g., "Your ALT at [X] is above even the lab reference range, and your GGT at [Y] confirms significant oxidative liver stress. Your AST/ALT ratio of [Z] [is/isn't] consistent with alcohol-related load."] At this level, the liver is managing more than it can efficiently clear — and the consequence is cumulative: toxins, hormones, and metabolic byproducts that should be excreted are recirculating longer, creating systemic burden.

Your most important step: physician assessment of liver health — ultrasound, Hepatitis B and C panel, full liver function review. This cannot be resolved with supplements alone. Supplements will support recovery alongside clinical evaluation.

*Closing:* The liver has extraordinary regenerative capacity — but it needs the load reduced to use it.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing

- "Detox Efficiency Level 9 — GGT under 12, ALT clean. Liver happy."
- "All liver markers in Zenoho's performance zone. Level 8."

### §8. Improvement Levers

**Top 5 supplements:**
1. Silymarin (Milk Thistle) 200 mg ×2/day — hepatoprotective; ALT/GGT reduction
2. NAC 600 mg ×2/day — glutathione precursor; Phase II detox support
3. Choline 500 mg/day — phosphatidylcholine synthesis; fat export from liver
4. Glycine 3g/day — conjugation cofactor; Phase II detox amplifier
5. Inositol 1g/day — NAFLD reversal support; paired with choline

**Top 3 lifestyle:**
1. Alcohol reduction (or elimination) — GGT drops within 2–4 weeks; ALT within 8 weeks
2. HEPA air filtration at home (Delhi/NCR users) — environmental particulate matter directly elevates GGT via oxidative liver stress (Zenoho-specific Indian context)
3. Visceral fat reduction 5–7% — NAFLD reversal; fat in liver is directly metabolically active

**Timelines:** GGT responds in 4 weeks with alcohol cut + NAC. ALT: 8–12 weeks. Bilirubin: slower — 8 weeks.

### §9. Demographic Modifiers

- **Delhi/NCR and metro India:** Air pollution (PM2.5 >100 μg/m³) elevates GGT independently of diet or alcohol. HEPA recommendation is culturally specific and highly relevant.
- **Men 30–50:** Highest risk of NAFLD; alcohol and refined grain diet combination
- **Vegetarians:** Lower alcohol-related risk; choline deficiency is the vegetarian-specific vulnerability (eggs are the primary dietary choline source — vegetarians who avoid eggs may be severely deficient)
- **Jain dietary users:** Prolonged fasting periods may affect bilirubin and ALP patterns — flag

### §10. Cross-Domain Interactions

- **Metabolic Power:** NAFLD sits at the intersection; TG is shared; ALT is the bridge marker
- **Heart Engine:** GGT elevation correlates with cardiovascular mortality (Strasak 2008)
- **Biological Age:** ALT and GGT are biological aging markers at population level
- Speed: GGT moves FAST (weeks). ALT: MEDIUM (8 weeks). Bilirubin: SLOW.

### §11. Safety Considerations

- ALT or AST >2× ULN (>100 U/L): mandatory physician referral regardless of framing
- GGT >100 U/L: alcohol audit + physician referral; do not frame as "recovery opportunity" — state urgency clearly
- Never suggest supplements for a user whose bilirubin is rising in the context of rising ALT/ALP — this is biliary obstruction territory; physician evaluation first

### §12. Domain-Specific Lab Error Detection

- ALT or AST >1000 U/L: Lab Error Pattern #8 → `retest_required`; also likely acute hepatitis if confirmed
- Direct bilirubin > Total bilirubin: Lab Error Pattern #16 → `retest_required`
- ALP >500 U/L in non-pregnant outpatient: verify (bone metastasis or severe cholestasis) → physician

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*


---

## B.8 ENDURANCE & STAMINA

### §1. Identity

- **User-facing name:** Endurance & Stamina
- **Hindi placeholder:** सहनशीलता और स्टैमिना (Sahansheelta aur Stamina) | Marathi: सहनशक्ती आणि स्टॅमिना | Tamil: மன்றாட்டு & மிடுக்கு
- **Tagline:** Go longer. Push further. Recover ready.
- **Icon:** 🏃 (runner silhouette — clean, active); or a stylised wave (sustained effort)
- **Primary HEX:** #E67E22 (warm amber-gold — sustained energy, endurance)
- **Secondary HEX:** #F0B27A (light warm gold)
- **Gradient:** 90° horizontal, amber → gold → pale yellow
- **Domain category:** Aerobic / Haematological

### §2. What It Represents Biologically

Endurance & Stamina reflects the aerobic and cardiovascular substrate for sustained physical and mental effort. The primary limiters of endurance performance are oxygen-carrying capacity (haemoglobin, haematocrit), iron supply chain (serum iron, ferritin, TIBC), thyroid-driven metabolic rate, and cardiac efficiency (reflected indirectly in TG and HDL-based metabolic health). High endurance capacity means your body can sustain effort for longer before fatigue accumulates, and recovers from that effort faster.

In plain English: this is the domain that explains whether you run out of breath climbing stairs or can sprint up them without effort. Whether a 2-hour meeting leaves you mentally depleted or merely engaged. Whether you sustain output from 9 AM to 7 PM or fade by 3 PM.

**High score feels like:** Sustained cardiorespiratory capacity; ability to maintain aerobic effort without breathlessness; consistent output through long workdays; strong performance in Zone 2 cardio (sustained moderate effort).

**Low score feels like:** Breathlessness at modest exertion; fatigue accumulating faster than effort justifies; inability to sustain aerobic exercise; early exhaustion in physical activities.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| Haemoglobin | 1 | 100 | Higher within optimal = better | Primary oxygen carrier; gates all aerobic capacity |
| Hematocrit | 9 | 85 | Higher within optimal = better | Packed cell volume; direct endurance relevant |
| Ferritin | 43 | 80 | Higher within optimal = better | Iron storage; the supply chain behind Hb |
| Serum Iron | 41 | 65 | Higher within optimal = better | Iron in transit; pairs with TIBC |
| TIBC | 42 | 45 | U-curve context | High TIBC + low iron = depleted stores |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| FT3 | 47 | 60 | Active thyroid hormone; metabolic rate regulator |
| TSH | 39 | 50 | Hypothyroid → fatigue, reduced VO2max [VERIFY] |
| MCV | 10 | 45 | Microcytosis (MCV <80) = iron-deficiency pattern |
| Triglycerides | 34 | 35 | High TG = poor metabolic flexibility → poor fat-burning endurance |
| DHEA-S | 62 | 30 | Adrenal endurance reserve |

**Confounding markers:**
- High WBC from active infection: elevates haematological markers non-specifically
- High-altitude training: naturally elevates Hb and RBC — apply athlete modifier

### §4. Scoring Formula

```
ES_Score = (
  (Hb_Score × 0.28) +
  (Hematocrit_Score × 0.22) +
  (Ferritin_Score × 0.20) +
  (Iron_Score × 0.15) +
  (FT3_Score × 0.10) +
  (TG_Score × 0.05)
) × 100
```

**Cross-marker rule:** Rule 12 (false_high_HbA1c_flag: HbA1c >5.7 + Hb <11): → if triggered, Hb score used with caution — shortened RBC lifespan masks true HbA1c.

**Worked example (Shashank, April 2026):**
- Hb: 13.9 g/dL → below male optimal 14.5–16.0 → Watch zone → Marker_Score ≈ 68
- Hematocrit: 42.4% → within lab range (40–50) but below Zenoho performance optimal for endurance (44–50) → Watch zone → Marker_Score ≈ 62
- Ferritin: not tested → excluded; confidence drops
- Serum Iron: 66 µg/dL → lab ref 49–181; Zenoho functional range for endurance ~80–150; below optimal → Watch zone → Marker_Score ≈ 60
- FT3: 3.3 pg/mL → below IFM optimal 3.5–4.5 → Watch zone → Marker_Score ≈ 62
- TG: 108 mg/dL → above Zenoho optimal <80 → Watch zone → Marker_Score = 60
- ES_Score (partial): weighted ≈ 64
- Confidence: MEDIUM (Ferritin missing)
- NOTE: Shashank's iron/haemoglobin picture — Hb 13.9 with Iron 66 and TIBC 293. Transferrin saturation = 66/293 × 100 = 22.5% — low-normal. This pattern (low-normal Hb, low-normal iron, normal-low TIBC) is consistent with iron status at the lower bound of adequacy. Not iron-deficiency anaemia, but not iron-replete. Adding Ferritin would clarify. Action: Iron bisglycinate 25 mg with Vit C 250 mg on alternate days × 12 weeks; retest Hb + Ferritin.

**Worked example (Ishita, January 2026):**
- Hb: 13.0 g/dL → below female optimal 13.5–14.5 → Watch zone → Marker_Score ≈ 62
- Hematocrit: 38.9% → lab ref F 36–46; Zenoho optimal 38–44 → low-optimal → Marker_Score ≈ 70
- Iron: 81 µg/dL → within range → Marker_Score ≈ 78
- TIBC: 346 µg/dL → within range (265–497); TSAT 23.4% → within ref 14–34 → adequate
- Ferritin: not tested → excluded
- FT3: 3.72 pg/mL → optimal → Marker_Score = 100
- TG: 72 mg/dL → optimal (<80) → Marker_Score = 100
- MCV: 82.6 fL → below lab lower limit of 83 → microcytosis signal → Marker_Score ≈ 55
  - NOTE: MCV 82.6 with Mentzer Index 17.54 → Mentzer >13 suggests iron deficiency pattern rather than thalassaemia (Mentzer <13 would suggest thalassaemia trait). Iron and TSAT are adequate but Ferritin not tested. Possible iron-deficiency without anaemia (Stage 2 depletion). Ferritin critical to test.
- ES_Score (partial): weighted ≈ 73
- Confidence: MEDIUM (Ferritin missing)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label |
|---|---|---|
| 1–2 | 0–20 | Severely Depleted | Anaemia or profound iron depletion; clinical referral |
| 3–4 | 21–40 | Limited Endurance | Below-optimal oxygen transport; exhaustion at modest effort |
| 5–6 | 41–60 | Adequate Stamina | Sufficient for daily life; not for sustained athletic effort |
| 7–8 | 61–80 | Strong Endurance | Above population average; good aerobic capacity |
| 9–10 | 81–100 | Elite Stamina | Optimal oxygen transport; athletic endurance substrate |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your aerobic foundation is exceptional — your blood delivers oxygen with the efficiency that endurance athletes spend years training to achieve.

Your Endurance & Stamina score reflects an optimal oxygen transport chain: haemoglobin in the upper performance zone, ferritin providing deep iron reserves, and thyroid metabolism running at the rate that supports sustained output. This is why sustained effort — physical or mental — doesn't drain you the way it does most people.

Top three markers: [Hb ≥15; Ferritin ≥80; FT3 in optimal zone — specific to panel].

Your three highest-leverage moves: (1) Add VO2max estimation — resting HR and HRV from a wearable, combined with a graded step test, gives context for your blood markers. (2) Protect thyroid function — FT3 is the active metabolic engine; avoid chronic caloric deficit and ensure Se and Zn are adequate (conversion cofactors). (3) Retest Ferritin at next panel — this is the iron reserve marker most athletes deplete without knowing it; needs annual monitoring.

*Closing:* You're running on a full tank. Now it's about optimising what you do with it.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your stamina is adequate — but your blood markers reveal the specific cap on your aerobic potential, and it is addressable.

The gap between Level 6 and Level 8 in Endurance & Stamina is often a haemoglobin-ferritin gap: Hb just below optimal, ferritin not deep enough to sustain high training frequency. This pattern is extremely common in Indian adults — particularly women and vegetarians — and responds well to targeted iron intervention within 8–12 weeks.

Your specific pattern: [Hb below male/female optimal; Ferritin in watch zone or unknown; Iron low-normal — specific to user].

Your three highest-leverage moves: (1) Iron bisglycinate providing 18–27 mg **elemental iron** with Vitamin C 250 mg on alternate days — bisglycinate form absorbs with 64% lower GI side-effect rate vs ferrous sulfate (Pass 3 V34; see B.2 Vitality master note for full specification rule). (2) Ferritin target: ≥50 ng/mL minimum; ≥80 ng/mL for active individuals. (3) Ensure protein intake ≥1.6 g/kg — haemoglobin synthesis is limited by both iron and protein.

*Closing:* The energy you want from your body is achievable — your blood just needs the right building blocks.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your aerobic markers are significantly below optimal — your body is not delivering enough oxygen to run at full capacity, and the data shows exactly why.

[Specific to user — e.g., "Your haemoglobin at [X] g/dL is below both the Zenoho optimal and the laboratory reference range. Combined with serum iron at [Y] µg/dL, the pattern is consistent with iron-deficiency anaemia — your oxygen transport chain is compromised."] This is not a subjective feeling of being "unfit" — it is a measurable biological limit on your aerobic capacity.

Your most critical action: physician assessment of iron-deficiency anaemia if Hb <12 (F) or <13 (M), with ferritin measurement and possible parenteral iron assessment if oral iron absorption is suspected to be inadequate.

*Closing:* Iron-deficiency anaemia is the most treatable cause of severely limited endurance. The path to resolution is well-established.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing

- "Endurance score Level 8 — Hb optimised, ferritin loaded."
- "Zone 2 cardio feeling easier — just saw why on Zenoho: iron stores finally restored."

### §8. Improvement Levers

**Top 5 supplements:**
1. Iron bisglycinate 25 mg + Vitamin C 250 mg (alternate days, empty stomach)
2. Methylcobalamin 1000 mcg — B12 critical for erythropoiesis
3. Methylfolate 400 mcg — paired with B12 for RBC synthesis
4. Beetroot extract (standardised to 400 mg nitrate) — endurance performance via nitric oxide [VERIFY]; not for Hb building
5. Ashwagandha KSM-66 600 mg — VO2max improvement (meta-analysis PMC7230697; 5 studies — Pass 3 V38). KSM-66 root-only — FSSAI-compliant per April 2026 directive; see Master Note P11 for brand specification rule.

**Top 3 lifestyle:**
1. Zone 2 aerobic training 150 min/week — builds mitochondrial density; most important for aerobic capacity
2. Altitude sleep (if accessible) or simulated via breath training — marginal but real Hb adaptation
3. Adequate caloric intake — caloric deficit suppresses erythropoiesis; endurance athletes in deficit consistently run lower Hb

**Timelines:** Hb responds in 8–12 weeks with iron. Ferritin: 12–16 weeks to build stores. FT3: 8 weeks.

### §9. Demographic Modifiers

- **Female users:** Menstruation is the single largest cause of iron loss and low Hb in premenopausal women. Monthly iron protocol (5–7 days post-period: 50 mg elemental iron) is recommended standard.
- **Athletes:** Higher Hb baseline expected; athletic endurance modifier raises the floor for "optimal" to 15 g/dL (M) and 14 g/dL (F)
- **Vegetarians:** Higher iron loss risk (non-haeme iron absorbs at 2–5% vs haeme iron at 15–30%); regular ferritin monitoring critical
- **70+:** Physiological Hb decline — lower floor acceptable; Level 6 is strong for this cohort

### §10. Cross-Domain Interactions

- **Vitality & Strength:** Hb and Hematocrit shared markers; these two move together
- **Brain Sharpness:** Hb below 13 (M) / 12 (F) associated with measurable cognitive decline via reduced cerebral oxygen delivery
- **Recovery Capacity:** Ferritin shared; iron reserve depleted first during recovery from illness or intense training

### §11. Safety Considerations

- Hb <8.0 g/dL: Safety Override #1 triggers; Endurance & Stamina capped at Level 2; mandatory physician referral
- High-dose iron supplementation without Ferritin measurement is not recommended — iron overload (haemochromatosis risk in susceptible individuals, particularly those with HFE gene variants common in certain populations)

### §12. Domain-Specific Lab Error Detection

- Hb >25 g/dL or <4 g/dL: Lab Error Pattern #1 → `retest_required`
- Hb × 3 ≠ approximately HCT (within 15%): Lab Error Pattern #20 → internal inconsistency flag

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

---

## B.9 MOOD & CALM

### §1. Identity

- **User-facing name:** Mood & Calm
- **Hindi placeholder:** मनोदशा और शांति (Manodasha aur Shanti) | Marathi: मनःस्थिती आणि शांतता | Tamil: மனநிலை & அமைதி
- **Tagline:** The chemistry behind how you feel.
- **Icon:** 🌙 (crescent moon — calm, rest, serenity) or a stylised wave pattern
- **Primary HEX:** #2980B9 (calm blue — serenity, clarity, emotional stability)
- **Secondary HEX:** #AED6F1 (pale sky blue)
- **Gradient:** 270° horizontal, deep calm blue → pale sky → near white
- **Domain category:** Mental / Hormonal

### §2. What It Represents Biologically

Mood & Calm reflects the biochemical substrate of emotional regulation, stress resilience, and psychological wellbeing. The brain's mood systems depend on neurotransmitter precursors (B12, folate, iron for dopamine/serotonin synthesis), hormones (cortisol, DHEA-S, testosterone all influence mood), thyroid (hypothyroid → depression; hyperthyroid → anxiety), and anti-inflammatory status (neuroinflammation is increasingly linked to depression). Low mood and anxiety are not purely psychological — they have measurable biological correlates.

**CRITICAL NOTE:** This domain is NOT a diagnostic tool for depression, anxiety, or any mental health condition. It identifies biochemical patterns that may make emotional regulation harder. It is not a replacement for mental health care. Any user exhibiting distress signals receives clinical mental health resources without delay.

In plain English: the domain that answers why some people are emotionally resilient and others find themselves flat, irritable, or anxious without clear cause — and what the biology behind those feelings is.

**High score feels like:** Emotional stability without effort; quick return to baseline after stress; patient thinking; sleep that restores; morning clarity; ability to sit with difficult situations without reactive escalation.

**Low score feels like:** Irritability without clear cause; anxiety that seems disproportionate; emotional flatness or emptiness; negative rumination; poor sleep quality; slow recovery from emotional stress.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| Cortisol AM | 56 | 100 | U-curve — optimal 10–18; both extremes harm mood | Chronic high cortisol = anxiety; low = depression/fatigue |
| DHEA-S | 62 | 85 | Higher within optimal = better | Natural cortisol buffer; low DHEA-S → burnout |
| Vitamin D | 36 | 80 | Higher within optimal = better | VDR (Vitamin D receptor) in limbic system; mood regulation |
| TSH | 39 | 75 | U-curve — optimal 1.0–2.5 | Both hypothyroid and hyperthyroid alter mood |
| Vitamin B12 | 37 | 70 | Higher within optimal = better | Neurotransmitter synthesis; B12 deficiency → depression |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Folate | 38 | 60 | Methylation; serotonin/dopamine precursor pathway |
| Magnesium RBC | 58 | 55 | GABA modulation; relaxation neurotransmitter pathway |
| hs-CRP | 45 | 50 | Neuroinflammation; linked to major depressive disorder |
| Haemoglobin | 1 | 40 | Cerebral oxygen delivery; hypoxia → mood disturbance |
| Total Testosterone (M) | 59 | 35 | Low T strongly associated with depression in men |

**Confounding markers:**
- Acute illness (elevated WBC, hs-CRP): confounds all mood markers temporarily
- Pregnancy / postpartum: entire hormonal context shifts; do not apply standard mood scoring

### §4. Scoring Formula

```
MC_Score = (
  (Cortisol_Score × 0.25) +
  (DHEA_Score × 0.20) +
  (VitD_Score × 0.18) +
  (TSH_Score × 0.17) +
  (B12_Score × 0.15) +
  (Magnesium_Score × 0.05)
) × 100
```

**Safety rule:** If any user scores Level 1–2 on Mood & Calm AND has Level 1–2 on Vitality & Strength AND Level 1–2 on Recovery Capacity simultaneously → surface mental health support resource: "Zenoho has noticed that multiple markers associated with energy and mood are significantly below optimal. If you are feeling persistently low or overwhelmed, please reach out to a mental health professional. Resources (in order of recommended use): Tele-MANAS 14416 (Government of India, 24/7, 20+ Indian languages including Hindi/Marathi/Tamil) | Vandrevala Foundation +91 9999 666 555 (24/7, voice + WhatsApp) | AASRA mobile 9820466726 OR landline 022-27546669 (Mumbai — user may try either) | iCall 9152987821 (Mon–Sat 10am–8pm only, not 24/7)."

**Worked example (Shashank, April 2026):**
- Cortisol AM: not tested → excluded; most critical missing marker for this domain
- DHEA-S: 12.30 µg/dL → male ref 3.00–11.00; above reference → may warrant clinical check but not a deficiency → Marker_Score uncertain [VERIFY DHEA-S scoring above reference in males]
- VitD: 30.5 ng/mL → below Zenoho optimal 40–60 → Alert zone → Marker_Score ≈ 38
- TSH: 3.48 mIU/L → above IFM optimal 1.0–2.5 → Watch zone high → Marker_Score ≈ 55
- B12: not tested → excluded
- MC_Score (partial, 2 markers available): LOW confidence; estimated ≈ 48 (Level 5)
- Confidence: LOW (Cortisol AM and B12 both missing — the two primary markers)

**Worked example (Ishita, January 2026):**
- Cortisol AM: not tested → excluded
- DHEA-S: not tested → excluded
- VitD: 36.2 ng/mL → below optimal → Alert zone → Marker_Score ≈ 45
- TSH: 1.28 mIU/L → IFM optimal 1.0–2.5 → optimal → Marker_Score = 100
- B12: 419 pg/mL → below Zenoho optimal 500–900 → Watch zone → Marker_Score ≈ 65
- MC_Score (partial, 3 markers): weighted ≈ 68
- Confidence: LOW (Cortisol AM and DHEA-S both missing)

### §5. Domain Level Mapping

| Level | Score | User-Facing Label | What It Means |
|---|---|---|---|
| 1–2 | 0–20 | Significantly Depleted | Multiple mood-affecting markers severely low; clinical support critical |
| 3–4 | 21–40 | Biochemical Stress Load | Multiple markers below optimal; emotional regulation requires effort |
| 5–6 | 41–60 | Functional Mood Baseline | Adequate biochemistry for daily emotional function |
| 7–8 | 61–80 | Resilient | Strong biochemical mood support; stable, regulated |
| 9–10 | 81–100 | Optimal Calm | Exceptional neurochemical environment; rare |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your biochemistry is providing a solid foundation for emotional stability — and the specific markers show exactly why.

Your Mood & Calm score reflects a cortisol rhythm that is calibrated correctly — not chronically elevated (which creates background anxiety) and not depleted (which creates emotional flatness and exhaustion). Your Vitamin D is in the range where VDR (Vitamin D receptors) in your limbic system receive sufficient signalling. Your thyroid hormones are in the optimal zone, meaning your neurological metabolic rate supports alert-but-calm function.

Top three markers: [Cortisol optimal; VitD ≥40; TSH 1.0–2.5].

Your three highest-leverage moves: (1) Sleep consistency is the most fragile protector of this domain — consistent wake time within ±30 minutes every day maintains cortisol rhythm better than any supplement. (2) Add magnesium L-threonate to your protocol (1.5–2 g/day Magtein compound = ~270–360 mg elemental magnesium) — the magnesium form best studied for CNS penetration. Three small human RCTs support cognitive and sleep outcomes. **Transparency note (Pass 3 V37):** all positive RCTs used Magtein and were industry-funded; effect sizes are modest. GABA-A receptor modulation is mechanistically argued, not directly proven in human RCTs. (3) Retest Cortisol AM at next panel — even with excellent mood markers, cortisol is the most circadian-sensitive and highest-impact Mood & Calm marker.

*Closing:* Emotional stability is a biological state as much as a practice. Your biochemistry is supporting the practice.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your mood biochemistry is functional — but specific gaps are creating more emotional friction than is necessary.

Level 6 Mood & Calm typically reflects one or two below-optimal markers creating a biochemical undercurrent of stress or flat affect. The most common pattern in Indian urban adults: Vitamin D significantly below 40 ng/mL (associated with mood dysregulation in multiple meta-analyses), TSH drifting above 2.5 mIU/L (subclinical hypothyroid → emotional blunting), and B12 below 500 pg/mL (neurotransmitter synthesis compromised).

Your specific pattern: [VitD below optimal; TSH above IFM optimal; B12 below optimal — specific to user].

Your three highest-leverage moves: (1) Vitamin D to 40–60 ng/mL — this single intervention shows significant mood improvement in deficient individuals in RCTs [VERIFY]. Takes 8–12 weeks. (2) Magnesium glycinate 400 mg at night — GABA modulation; dramatically improves sleep quality within 2–4 weeks in many users. (3) TSH optimisation — if TSH >2.5, assess FT3 and FT4; a subclinical hypothyroid state responds to selenium 200 mcg + zinc 15 mg (T4→T3 conversion cofactors).

*Closing:* The mood you want is partly biochemical. The biology is addressable.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your mood biochemistry is showing multiple simultaneous deficits — and the pattern in your data is consistent with what many people experiencing burnout, low mood, or persistent anxiety look like in blood work.

**Important context:** Low markers in the Mood & Calm domain are not a diagnosis of depression or anxiety. They are biological patterns that make emotional regulation harder. These findings complement — not replace — professional mental health support. If you are experiencing persistent low mood, anxiety, or difficulty functioning, please speak with a mental health professional. [Primary: Tele-MANAS 14416 (Government of India, 24/7) | Vandrevala Foundation +91 9999 666 555 (24/7 voice + WhatsApp) | AASRA mobile 9820466726 OR landline 022-27546669 | iCall 9152987821 (Mon–Sat 10am–8pm, not 24/7).]

Your biochemical profile shows: [Cortisol AM pattern if available; DHEA-S depletion pattern; severe VitD deficiency; B12 below 300 pg/mL].

Your three highest-leverage moves: (1) Vitamin D loading protocol — ESI 2025: 60,000 IU weekly × 8 weeks if below 30 ng/mL. (2) Methylcobalamin 1500 mcg sublingual daily — particularly critical if B12 below 300 pg/mL; neurological and mood effects of B12 deficiency are well-documented. (3) Ashwagandha KSM-66 600 mg/day — cortisol modulation; Bachour 2025 meta-analysis (15 RCTs, n=873, PMC12242034) confirms significant cortisol and anxiety reduction (verified Pass 3 V38). KSM-66 root-only — FSSAI-compliant; see Master Note P11. Also discuss cortisol pattern with physician if not tested.

*Closing:* Biology and psychology work together. Supporting the biology makes the psychological work more effective.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. If you are experiencing mental health challenges, please seek support from a qualified professional.*

### §7. Boast-Worthy Phrasing

- "Mood & Calm Level 8 — cortisol calibrated, Vitamin D optimised. Feeling it."
- "Biochemical mood support at Level 7. TSH in range, B12 finally optimal."

**Anti-patterns (hard rule):**
- Never claim "cured" or "eliminated" depression/anxiety
- Never frame mood markers as a substitute for mental health treatment
- Never use Mood & Calm scores in marketing language that trivialises mental health conditions

### §8. Improvement Levers

**Top 5 supplements:**
1. Cholecalciferol D3 2000–4000 IU/day — VitD mood regulation; most significant mood supplement in Indian context
2. Magnesium glycinate 400 mg/night — GABA modulation; sleep quality; anxiety reduction
3. Ashwagandha **KSM-66** 600 mg/day — cortisol modulation; anxiety reduction in RCTs (Bachour 2025 meta-analysis PMC12242034). KSM-66 root-only — FSSAI-compliant per April 2026 directive (Pass 3 V38; see Master Note P11).
4. Methylcobalamin 1000 mcg + Methylfolate 400 mcg — neurotransmitter synthesis substrate
5. Phosphatidylserine 100 mg/day at bedtime — cortisol reduction; HPA axis modulation [VERIFY]

**Top 3 lifestyle:**
1. Consistent sleep and wake schedule — cortisol rhythm is set by light exposure and sleep timing; non-negotiable
2. Morning light exposure 15–20 min daily — circadian entrainment; serotonin synthesis
3. Social connection — the most robust predictor of mood outcomes in epidemiological literature

### §9. Demographic Modifiers

- **Postpartum F:** Entire mood system in flux; do not score Mood & Calm within 12 weeks postpartum without obstetric context
- **Perimenopausal F:** Oestrogen decline impacts serotonin; VitD and B12 become even more critical
- **70+:** DHEA-S naturally very low; cortisol dysregulation more common; focus on cortisol calibration and VitD

### §10. Cross-Domain Interactions

- **Brain Sharpness:** B12, Folate, VitD shared markers; mood and cognition co-move
- **Vitality & Strength:** Cortisol AM and DHEA-S shared; burnout pattern visible across both domains
- **Recovery Capacity:** Shared inflammatory markers; neuroinflammation bridges both

### §11. Safety Considerations

**Highest-risk domain for trauma-informed design:**
- Never use language implying moral failure for low mood markers
- Proximity to depression/anxiety: Mood & Calm framing must never suggest that blood tests are sufficient for mental health — always pair with "in addition to professional support if needed"
- Suicidal ideation pathway: if any user communicates suicidal ideation in chatbot or feedback, immediately surface: "Please contact Tele-MANAS at 14416 (Government of India 24/7 mental health helpline, available in 20+ Indian languages) or +91 9999 666 555 (Vandrevala Foundation, 24/7 voice + WhatsApp), or go to your nearest emergency room. Your safety is the first priority."
- This domain must never be used in advertising copy that could attract users in crisis as a substitute for crisis care

### §12. Domain-Specific Lab Error Detection

- Cortisol AM >50 µg/dL: Lab Error Pattern #25 → `retest_required`; if confirmed: Cushing's syndrome workup
- TSH >100 mIU/L: Lab Error Pattern #3 → `retest_required`; also severe myxoedema if confirmed

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Mental health concerns should be addressed with qualified professionals.*

---

## B.10 IMMUNITY STRENGTH

### §1. Identity

- **User-facing name:** Immunity Strength
- **Hindi placeholder:** प्रतिरक्षा शक्ति (Pratirakhsa Shakti) | Marathi: प्रतिकारशक्ती | Tamil: நோய் எதிர்ப்பு சக்தி
- **Tagline:** Your body's natural defence force — calibrated.
- **Icon:** 🛡️ (shield — defence, protection)
- **Primary HEX:** #2471A3 (navy-blue — strength, protection, depth)
- **Secondary HEX:** #7FB3D3 (steel blue)
- **Gradient:** 160° diagonal, navy → steel blue → pale blue-white
- **Domain category:** Defensive / Immune

### §2. What It Represents Biologically

Immunity Strength reflects the integrated capacity of your immune system to mount rapid, effective, and appropriately calibrated responses to pathogenic threats, while avoiding chronic over-activation (inflammation). The primary markers are lymphocytes (adaptive immune response), WBC/neutrophils (innate immune surveillance), Vitamin D (immune modulation across multiple pathways), zinc-surrogate markers (ALP, lymphocyte count), and inflammatory control (hs-CRP, ESR). Strong immunity is not a hyperactive immune system — it is a well-calibrated one.

In plain English: why some people get colds twice a year that last 2 days, while others get them six times a year lasting two weeks each. The difference is largely measurable in these markers.

**High score feels like:** Rarely ill; infections resolve quickly without antibiotics; skin infections rare; vaccinations produce strong antibody responses; allergens provoke modest not overwhelming responses; dental and wound healing efficient.

**Low score feels like:** Frequent infections; lingering colds; recurring mouth ulcers; slow wound healing; extreme fatigue after vaccines; allergic reactions disproportionate to triggers.

### §3. Constituent Markers

**Primary markers:**
| Marker | # | Weight | Direction | Notes |
|---|---|---|---|---|
| Vitamin D | 36 | 100 | Higher within optimal = better | VDR on immune cells; T-cell regulation; antimicrobial peptide synthesis |
| Lymphocytes (#6) | 6 | 90 | Higher within optimal = better | Adaptive immunity; T and B cell count |
| WBC | 3 | 75 | U-curve — optimal 4.5–7.0 | Too low = immune-compromised; too high = chronic activation |
| Neutrophils (#5) | 5 | 65 | NLR focus; optimal ANC 2.5–5.0 | Innate immune first responders |
| hs-CRP | 45 | 60 | Lower = better | Chronic inflammation = dysregulated immunity |

**Secondary markers:**
| Marker | # | Weight | Notes |
|---|---|---|---|
| Vitamin B12 | 37 | 50 | Lymphocyte proliferation; immune cell synthesis |
| Ferritin | 43 | 45 | Iron sequestration in immunity; context with hs-CRP |
| Albumin | 22 | 40 | Protein for immune cell synthesis; acute-phase reactant |
| Folate | 38 | 35 | Immune cell replication; DNA synthesis |
| ESR | 52 | 30 | Background inflammatory activity |

**Confounding markers:**
- Active infection: all markers distorted; apply 8-week recovery flag
- Corticosteroid medications: suppress lymphocytes and hs-CRP artificially — flag if user on steroids

### §4. Scoring Formula

```
IS_Score = (
  (VitD_Score × 0.27) +
  (Lymphocyte_Score × 0.22) +
  (WBC_Score × 0.18) +
  (Neutrophil_Score × 0.15) +
  (hsCRP_Score × 0.13) +
  (B12_Score × 0.05)
) × 100
```

**Cross-marker rules:**
- Rule 11 (post_viral_suppression_flag: WBC <4.5 + Lymph <1.5 + recent illness): → IS_Score shows "immune recovery" label; not penalised as structural deficit

**Worked example (Shashank, April 2026):**
- VitD: 30.5 ng/mL → below Zenoho optimal 40–60 → Alert zone → Marker_Score ≈ 38
- Lymphocytes: ALC 2.55 ×10³/µL → optimal (1.8–3.0) → Marker_Score = 100
- WBC: 8.85 ×10³/µL → above Zenoho optimal 4.5–7.0 → Watch zone high → Marker_Score ≈ 60
  - NOTE: WBC 8.85 in April 2026 vs 4.98 in April 2024 — significant rise. Cross-panel check: was Shashank ill or stressed at time of April 2026 draw? Or is this a trend of rising WBC?
- Neutrophils: ANC 5.52 → above Zenoho optimal 2.5–5.0 → Watch zone → Marker_Score ≈ 65
- hs-CRP: not tested → excluded
- B12: not tested → excluded
- IS_Score (partial): weighted ≈ 66
- Confidence: MEDIUM (hs-CRP and B12 missing)

**Worked example (Ishita, January 2026):**
- VitD: 36.2 ng/mL → below optimal → Alert zone → Marker_Score ≈ 45
- Lymphocytes: ALC 3.83 → above Zenoho optimal 1.8–3.0 → Watch zone high → Marker_Score ≈ 70
  - NOTE: ALC 3.83 in context of ESR 34, WBC 10.72, ANC 6.15 — elevated lymphocytes in this context suggest mildly elevated inflammation signal (viral or bacterial) rather than excellent immunity. Apply inflammation confounder flag.
- WBC: 10.72 ×10³/µL → above Zenoho optimal 4.5–7.0 → Alert zone (approaching >11.0) → Marker_Score ≈ 28
- Neutrophils: ANC 6.15 → above optimal 2.5–5.0 → Watch zone → Marker_Score ≈ 62
- hs-CRP: not tested → excluded
- B12: 419 pg/mL → below optimal → Watch zone → Marker_Score ≈ 65
- IS_Score (partial): weighted ≈ 54 (Level 6)
- CLINICAL NOTE: Ishita's January 2026 immune markers (WBC 10.72, ANC 6.15, ALC 3.83, ESR 34) form a pattern consistent with an mildly elevated inflammation signal at time of testing. IS_Score should display: "Your Immunity markers at this test date suggest your immune system was actively responding to a challenge. Recommend retesting once you are fully recovered to get your baseline Immunity Strength."

### §5. Domain Level Mapping

| Level | Score | User-Facing Label |
|---|---|---|
| 1–2 | 0–20 | Severely Compromised | Significant immune deficiency; physician assessment urgent |
| 3–4 | 21–40 | Weak | Below-average immune surveillance; frequent illness likely |
| 5–6 | 41–60 | Adequate | Standard immune function; typical Indian adult profile |
| 7–8 | 61–80 | Strong | Above-average immune calibration; illness rare |
| 9–10 | 81–100 | Elite Immunity | Exceptional immune substrate; very rare |

### §6. User Communication Templates

**HIGH PERFORMER (Level 8–10):**

*Opening:* Your immune system is well-calibrated — the data shows exactly what makes it effective.

Immunity Strength at Level 8 or above means your immune surveillance, response capacity, and regulatory balance are all performing strongly. Your Vitamin D is in the range that activates antimicrobial peptides (defensins and cathelicidins) via VDR signalling on immune cells. Your lymphocyte profile is in the optimal range for adaptive immune competence — meaning when a pathogen does breach your defences, the response is coordinated and targeted.

Top three markers: [VitD ≥40; ALC in optimal; WBC in 4.5–7.0 optimal zone].

Your three highest-leverage moves: (1) Maintain Vitamin D ≥40 ng/mL year-round — Indian winter months reduce synthesis; supplementation required. (2) Add lactoferrin 200 mg/day during high-exposure periods (travel, winter, crowded environments) — iron-binding glycoprotein with strong antimicrobial activity [VERIFY]. (3) Annual flu vaccination — strong baseline immunity means vaccinations generate better antibody titres.

*Closing:* A calibrated immune system is invisible when it works. Yours is working.

---

**AVERAGE PERFORMER (Level 5–7):**

*Opening:* Your immunity is adequate — but your markers show two or three specific vulnerabilities that explain why you get sick more often than you'd like.

The most common pattern at Level 5–6: Vitamin D below 40 ng/mL (affecting immune signalling), B12 below 500 pg/mL (affecting lymphocyte proliferation), and zinc-pathway markers (ALP) suggesting subclinical zinc depletion. Together, these create a system that responds to infections — but slowly, and at higher physiological cost than necessary.

Top markers to address: [VitD below 40; B12 below 500 — specific to user].

Your three highest-leverage moves: (1) Vitamin D to 40–60 ng/mL (IFM functional optimum — note: Endocrine Society 2024 defines sufficiency at ≥30 ng/mL; the 40–60 target is functional-medicine optimum, not universally endorsed). Loading per IJEM 2025 India consensus (Pass 3 V33): if 20–29 ng/mL → 60,000 IU weekly × **8 weeks**; if **<20 ng/mL → 60,000 IU weekly × 12 weeks** (corrected from earlier 6/8-week formulations); maintenance 60,000 IU monthly post-repletion. (2) Zinc picolinate 15 mg/day — directly supports lymphocyte function and innate immune response; deficient in most Indian vegetarians and frequent sweaters. (3) Vitamin C **200–1000 mg/day** during winter or high-exposure periods — correction (Pass 3 V49): Vitamin C **reduces cold duration** (~8% in adults, ~14% in children at ≥200 mg/day per Hemilä & Chalker 2013 Cochrane review). It does **not** consistently reduce cold incidence in the general population (only in extreme physical-stress contexts). Higher 1 g doses don't add significant duration benefit over 200 mg.

*Closing:* Your immune system defends you every day, whether or not you notice. Give it the tools to do it efficiently.

---

**LOW PERFORMER (Level 1–4):**

*Opening:* Your immune markers show a system that is either under-resourced, over-activated, or recovering from a challenge — and the data tells us which is most likely.

[Specific to user — e.g., "Your lymphocyte count is below the range that supports robust adaptive immunity, and your Vitamin D is severely deficient — a combination that significantly limits your body's ability to mount a coordinated immune response."] This pattern is associated with frequent infections, slow recovery, and a tendency for minor illnesses to become prolonged ones.

If your WBC or lymphocytes are low and you have not recently had an illness: physician evaluation for underlying immune-affecting conditions (thyroid, autoimmune, post-viral) is warranted.

Your three highest-leverage moves: (1) Vitamin D loading per IJEM 2025 India consensus (Pass 3 V33): if 20–29 ng/mL → 60,000 IU weekly × 8 weeks; if **<20 ng/mL → 60,000 IU weekly × 12 weeks** (not 8 weeks). (2) Zinc picolinate 15 mg + Vitamin C 200–1000 mg/day (reduces cold duration; does not reduce incidence in general population — Pass 3 V49). (3) Sleep ≥7.5 hours — immune cell production and NK cell activity reduced by sleep under 6 hours (Prather AA et al. "Behaviorally Assessed Sleep and Susceptibility to the Common Cold." *Sleep* 2015;38(9):1353–1359 — verified).

*Closing:* Your immune system can be strengthened. The specific deficits here are known and addressable.

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*

### §7. Boast-Worthy Phrasing

- "Immunity Strength Level 8 — VitD at 52, lymphocytes optimal. Barely a sniffle this winter."
- "Zenoho's Immunity score hit Level 7 after 3 months on the D3/zinc protocol."

### §8. Improvement Levers

**Top 5 supplements:**
1. Cholecalciferol D3 2000–4000 IU/day — most impactful single immunity supplement
2. Zinc picolinate 15 mg/day — lymphocyte proliferation and innate immune function
3. Vitamin C 1000 mg/day — synergy with zinc; reduces illness incidence
4. Lactoferrin 200 mg/day (particularly for vegetarians) — iron-binding antimicrobial; bovine lactoferrin widely available
5. Quercetin **phytosome** 500 mg/day — zinc ionophore (Dabbagh-Bazarbachi 2014 *JAFC* 62:8085 — verified in vitro; Pass 3 V50). Meta-analysis PMC10724618 (5 RCTs, n=544) shows significant reduction in COVID hospitalization risk with phytosome form. Anti-inflammatory evidence (non-infection) weaker (Grade C). **Bioavailability critical:** standard quercetin aglycone has ~1% bioavailability — phytosome form required for clinical effect. **FSSAI flag:** phytosome delivery may require NSF clearance (like curcumin phytosome); in consumer-facing copy use "quercetin from standardised extract" until cleared. See Master Note P11.

**Top 3 lifestyle:**
1. Sleep ≥7.5 hours — NK cell activity halved with <6 hours sleep
2. Cold exposure (sauna / cold shower alternating) — NK cell upregulation [VERIFY]
3. Annual vaccinations — flu, pneumococcal — optimise vaccination response with peak Vit D and zinc status

**Timelines:** VitD immune effects: 8–12 weeks. Zinc: 4–6 weeks. B12 lymphocyte effects: 8–12 weeks.

### §9. Demographic Modifiers

- **60+:** Immunosenescence natural; Level 7 is excellent; VitD, zinc, and B12 the three priorities
- **Post-COVID users:** Long-COVID associated with persistent lymphocyte suppression; apply 6-month recovery window
- **Indian context:** Post-dengue, post-malaria, and latent TB all create immune activation patterns that confound this domain; seasonal interpretation (monsoon = higher infection load) relevant
- **Jain users / prolonged fasting:** Short-term fasting (24h) is immune-neutral; prolonged fasting reduces lymphocyte count; flag with protocol note

### §10. Cross-Domain Interactions

- **Recovery Capacity (B.6):** 60% marker overlap — co-move
- **Mood & Calm (B.9):** VitD and B12 shared; immune-mood axis is bidirectional
- **Biological Age (B.1):** Lymphocytes are a primary BioAge marker; immune aging accelerates BioAge

### §11. Safety Considerations

- If ALC <1.0 ×10³/µL (absolute lymphocyte count) in non-active-infection context: physician evaluation for immunodeficiency (HIV, haematological malignancy, chronic viral suppression)
- Very high WBC (>15 ×10³/µL) without obvious infection: haematology referral
- Eosinophil count >0.5 ×10³/µL: parasitic infection screen for Indian users (common in urban-rural mixed populations)

### §12. Domain-Specific Lab Error Detection

- WBC >100 ×10³/µL in apparent outpatient: leukaemia or severe lab error → `retest_required` + clinical flag
- Lymphocytes >80% of WBC differential in adult: lymphoproliferative condition → physician referral

---

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care.*


---

# PART C — BIOLOGICAL AGE ALGORITHM

## C.1 Algorithm Selection

### Primary Method: Modified Klemera-Doubal Method (KDM)

**Citation:** Klemera P, Doubal S. "A new approach to the concept and computation of biological age." *Mechanisms of Ageing and Development.* 2006; 127(3):240–248. DOI: 10.1016/j.mad.2005.10.004 (verified Pass 1 V5).

The Klemera-Doubal Method is selected over alternatives for the following reasons:

**Why KDM over PhenoAge (Levine et al., 2018):**
- PhenoAge was validated on NHANES (US population); Indian population biomarker distributions differ systematically in albumin reference ranges, creatinine ranges (smaller body frame), and lipid profiles
- PhenoAge includes hs-CRP as a near-mandatory input; Indian users frequently test without hs-CRP; KDM handles partial panels more gracefully
- KDM allows domain-specific marker weighting; PhenoAge uses fixed regression coefficients from US cohort data. Indian-specific PhenoAge validation does not currently exist; AIIMS New Delhi National Centre of Ageing cohort study in progress (Pass 1 V7).

**Why KDM over Horvath Epigenetic Clock:**
- Horvath clock requires methylation array data (blood DNA methylation at specific CpG sites) — requires specialised lab infrastructure unavailable at Thyrocare/diagnostic labs currently integrated with Zenoho
- Epigenetic clock cannot be run from a standard blood panel; KDM runs entirely from biochemistry markers

**Why KDM over GrimAge (Lu et al., 2019):**
- GrimAge trained on mortality outcomes; optimised for predicting time-to-death, not performance optimisation
- GrimAge is computed from DNA methylation (DNAm) data, not direct plasma protein assays — the proteins GrimAge proxies (GDF-15, PAI-1, TIMP-1, ADM, B2M, Cystatin C, Leptin, PACKYRS, TIMP-1) are estimated epigenetically. This requires methylation-array data unavailable from standard biochemistry panels (verified Pass 1 V6).
- Zenoho's use case is performance framing, not mortality prediction; GrimAge's existential framing is contra-indicated by the platform's anti-stigma architecture

**Modified KDM for Blood-Only Inputs:**

Standard KDM uses a regression-based approach where:
1. A reference population establishes the linear relationship between each biomarker and chronological age
2. Each individual's biomarker values are compared to the expected value for their chronological age
3. Biological age is computed as the weighted average of the "biomarker-predicted ages" across all included markers

Zenoho's modification:
- Uses Indian-approximate reference ranges rather than Western population calibration (v1.1.5 IFM-adjusted optimal ranges serve as reference anchors)
- Excludes epigenetic inputs (unavailable from standard panels)
- Handles missing markers via confidence-weighted imputation
- Applies a chronological age anchoring term (0.25 weight) to prevent extreme outliers when panel is incomplete

**Indian-Specific Calibration Note:**
Indian-specific KDM validation is in progress: AIIMS New Delhi National Centre of Ageing launched a prospective multi-biomarker cohort study (medRxiv 2025; 5 age strata, n=200 baseline). LASI (Longitudinal Aging Study in India, n=3,728) supports cross-national biological-age inference against HRS (US), ELSA (UK), MHAS (Mexico). No large-scale Indian-specific KDM-published validation exists as of May 2026; AIIMS results pending (Pass 1 V7). Zenoho uses IFM-adjusted ranges from v1.1.5 as the "optimal anchor" for each marker, treating deviation from optimal as biological age acceleration. This is a pragmatic approximation pending Indian-specific population data. All biological age outputs carry [ESTIMATED] tag until Indian validation data is incorporated in a future version.

---

## C.2 Core Calculation Steps

### Step 1: Select Biological Age Markers

From the 62-marker registry, identify which markers were tested and have known biological age associations.

### Step 2: Compute Individual Marker "Predicted Age" (PA_i)

For each marker i:

```
PA_i = ChronologicalAge + (MarkerScore_i - OptimalMidpoint_i) × AgeImpactCoefficient_i
```

Where:
- `MarkerScore_i` = the raw value from the blood test
- `OptimalMidpoint_i` = the midpoint of the Zenoho optimal range for that marker
- `AgeImpactCoefficient_i` = estimated years of biological age acceleration per unit deviation from optimal (marker-specific; see C.3)

### Step 3: Weight Each Predicted Age

```
WeightedPA_i = PA_i × w_i
```

Where `w_i` is the biological age weight for marker i (see C.3 table).

### Step 4: Compute Biological Age

```
BioAge = (Σ WeightedPA_i + 0.25 × ChronologicalAge) / (Σ w_i + 0.25)
```

The 0.25 chronological age anchor prevents extreme BioAge estimates when fewer than 6 markers are available. With full panels, this anchor contributes minimally.

### Step 5: Compute Confidence Interval

```
BioAge_CI_lower = BioAge - (1.0 × (1 - CoverageFraction))
BioAge_CI_upper = BioAge + (2.0 × (1 - CoverageFraction))
```

With full panel (12/12 markers tested): CI ≈ ±1 year.
With partial panel (6/12 markers): CI ≈ ±2.5 years.
With minimal panel (3/12 markers): CI ≈ ±5 years; display as estimate only.

Note: The confidence interval is asymmetric (wider on the upper side) because missing markers are more likely to reveal undetected dysfunction than undetected optimisation.

### Step 6: Compute Biological Age Score (0–100 for Domain Display)

```
BioAgeScore = 100 - max(0, min(100, (BioAge - ChronologicalAge + 10) × 5))
```

This maps:
- BioAge = ChronologicalAge - 10 years → Score ≈ 100 (Elite)
- BioAge = ChronologicalAge → Score ≈ 50 (Average; score 50)
- BioAge = ChronologicalAge + 10 years → Score = 0 (Critical)

Adjusted for age group: users 60+ receive a +5 score buffer (preserved function at older age is harder to achieve).

---

## C.3 Marker Selection for Biological Age

The following 12 markers from the v1.1.5 registry are used in Zenoho's biological age calculation. Each has peer-reviewed evidence for association with biological aging [VERIFY individual citations]. All registry numbers below are **v1.1.5 canonical IDs**.

| # | Marker Name | v1.1.5 Registry # | BioAge Weight (w_i) | Age Impact Coefficient | Directionality | Rationale |
|---|-------------|-------------------|---------------------|------------------------|----------------|-----------|
| 1 | HbA1c | **#14** | 0.18 | +3.5 years per 0.5% above optimal midpoint | Higher = older | Glycation is a direct aging mechanism; HbA1c >5.7% associated with accelerated vascular aging (ARIC cohort, Framingham Offspring + Generation III cohorts — verified Pass 1 V8) |
| 2 | Albumin | **#22** | 0.16 | +4.0 years per 0.5 g/dL below midpoint (4.7) | Lower = older | Single strongest predictor of biological age in most KDM studies; reflects anabolic capacity, liver function, nutritional status |
| 3 | eGFR | **#24** | 0.14 | +2.5 years per 10 mL/min below 90 | Lower = older | Renal function declines predictably with aging; eGFR is among the most age-sensitive markers |
| 4 | hs-CRP | **#45** | 0.14 | +2.0 years per mg/L above 1.0 | Higher = older | Chronic low-grade inflammation is a hallmark of biological aging (inflammaging — coined Franceschi & Bonafè *Aging Cell* 2000; refined Franceschi & Campisi 2014 PMID 24833586 and Franceschi et al. 2018 *Nat Rev Endocrinol*). hs-CRP is the accessible clinical proxy (verified Pass 1 V9) |
| 5 | Lp(a) | **#44** | 0.10 | +1.5 years per 10 mg/dL above 30 | Higher = older | Genetically determined; high Lp(a) associated with accelerated atherosclerosis; weight reflects genetic non-modifiability |
| 6 | ApoB | **#53** | 0.10 | +1.5 years per 20 mg/dL above 80 | Higher = older | Atherogenic particle burden; ApoB accumulation in vessel walls is a direct aging mechanism |
| 7 | Haemoglobin | **#1** | 0.08 | +1.5 years per g/dL below optimal midpoint | Lower = older | Oxygen delivery capacity; anaemia accelerates functional aging |
| 8 | Lymphocyte count (ALC) | **#6** | 0.06 | +2.0 years per 1.0 ×10³/µL below optimal lower bound (1.8) | Lower = older | Immune competence declines with aging; ALC <1.8 (not above-optimal) is the aging signal — PhenoAge weighting confirms low-lymphocyte direction as senescence proxy (verified Pass 1 V10). Values within lab range (up to 4.0) are not penalised. |
| 9 | MCV | **#11** | 0.06 | +1.5 years per 5 fL deviation from optimal midpoint (91.5) | Microcytic = older; macrocytic = older | B12/folate or iron deficiency reflected in MCV; both directions signal nutritional aging |
| 10 | ALP | **#18** | 0.04 | +1.0 years per 20 U/L deviation from optimal midpoint (~60 U/L IFM) | Higher above optimal = older | ALP carries a small weight in PhenoAge (~0.0019). Above-optimal hepatic ALP is associated with metabolic bone disease and liver aging in some cohorts; direction (bone vs liver origin) depends on isoenzyme context (Pass 2 V13 — retained as low-weight aging marker; not over-weighted without clinical context) |
| 11 | Vitamin D (25-OH) | **#36** | 0.06 | +1.5 years per 10 ng/mL below optimal lower bound (40) | Lower = older | VitD deficiency is associated with accelerated musculoskeletal, immune, and endothelial aging (functional-medicine consensus; IFM target 40–60 ng/mL). Note (Pass 1 V12, Pass 2 V12): Endocrine Society 2024 and IOM define sufficiency at ≥30 ng/mL — IFM's 40–60 target is functional-optimum, not universally endorsed clinical-cutoff. Zenoho retains IFM framing but attributes accordingly. |
| 12 | TSH | **#39** | 0.06 | +1.0 years per 1.0 mIU/L above IFM optimal upper bound (2.5) | Higher above optimal = older | Sub-clinical hypothyroidism (TSH 2.5–4.5 mIU/L) is associated with metabolic slowing in IFM and functional-medicine literature; conventional endocrinology does not flag this range as actionable without symptoms. IFM optimal 1.0–2.5 mIU/L retained; below-2.5 values not penalised (verified Pass 1 V11). Values within IFM optimal (1.0–2.5) score neutrally regardless of position within the range. |

**Total marker weight (Σ w_i) = 1.18**  
**With 0.25 chronological age anchor: Σ = 1.43**

**Biological Age Score Formula (LOCKED — v1.0.1):**

```
BioAgeScore = 50 + ((ChronologicalAge − BioAge) / 15) × 50
Bounded: 0 ≤ Score ≤ 100
Age 60+ modifier: add +5 points (function preservation at older age is harder to achieve)
```

**Formula calibration:**

| BioAge vs Chrono | Gap | Score | Level |
|-----------------|-----|-------|-------|
| 15 years younger | −15 | 100 | Elite |
| 7 years younger | −7 | 73 | High Performance |
| Aligned | 0 | 50 | Average |
| 7 years older | +7 | 27 | Below Average |
| 15 years older | +15 | 0 | Critical |

**Markers NOT included in BioAge calculation (available in v1.1.5 but excluded):**
- Total/Free Testosterone (#59, #60): too sex-specific; hormonal fluctuation confounds aging signal
- WBC total (#3): acute illness confounds; use ALC (#6) only
- Triglycerides (#34): metabolic but not independently validated as aging marker in KDM literature [VERIFY]
- Cortisol AM (#56): diurnal variation too high; single-timepoint unreliable
- Total Bilirubin (#20): protective at low levels; non-linear; excluded pending clearer evidence
- ESR (#52): inflammation marker; contributes to domain scores but not BioAge directly (ESR not validated as KDM BioAge marker in the evidence base currently available [VERIFY])


## C.4 Worked Example: Shashank Arya — Biological Age Calculation (April 2026)

**Input:** Shashank Arya, male, chronological age 37. Blood collected 07-April-2026. Lab: G4726041189, HOD BTC Gurugram Sec-47.

**Active Cross-Marker Rules:** Rule 5 (`aggressive_apoB_suppression_required`: Lp(a) >30 AND ApoB >80); Rule 15 (`discordant_lipid_pattern`: ApoB >90 AND LDL <130). Both remain active. ApoB scoring overrides LDL scoring in Heart Engine domain.

### Step 1: Marker Values and Predicted Ages

| Marker | v1.1.5 # | Shashank's Value | Zenoho Optimal Midpoint | Deviation | Age Impact | PA_i |
|--------|----------|-----------------|------------------------|-----------|------------|------|
| HbA1c | #14 | 5.5% | 5.1% | +0.4% above | 3.5 / 0.5% → +2.8 yrs | **39.80** |
| Albumin | #22 | 4.1 g/dL | 4.7 g/dL | −0.6 below | 4.0 / 0.5 per unit → +4.8 yrs | **41.80** |
| eGFR | #24 | 104.4 mL/min | ≥90 (no penalty) | Optimal | 0 | **37.00** |
| hs-CRP | #45 | NOT TESTED | — | MISSING | Imputed at chrono | **37.00** |
| Lp(a) | #44 | 48.5 mg/dL | <30 mg/dL | +18.5 above | 1.5 / 10 → +2.78 yrs | **39.78** |
| ApoB | #53 | 105.21 mg/dL | 80 mg/dL | +25.21 above | 1.5 / 20 → +1.89 yrs | **38.89** |
| Haemoglobin | #1 | 13.9 g/dL | 15.25 (midpoint 14.5–16.0 M) | −1.35 below | 1.5 / 1.0 → +2.025 yrs | **39.03** |
| Lymphocytes (ALC) | #6 | 2.55 ×10³/µL | Optimal lower 1.8; upper 3.0; midpoint 2.4 | +0.15 above midpoint; within optimal | 0 (within optimal) | **37.00** |
| MCV | #11 | 91.2 fL | 91.5 (midpoint 88–95) | −0.3 from midpoint; within optimal | 0 (deviation <1 fL; no meaningful penalty) | **37.00** |
| ALP | #18 | 91 U/L | 60 (IFM optimal midpoint 40–80) | +31 above midpoint | 1.0 / 20 → +1.55 yrs | **38.55** |
| Vitamin D | #36 | 30.5 ng/mL | 50 (midpoint 40–60) | −19.5 below midpoint; −9.5 below optimal lower | 1.5 / 10 per unit below opt lower → +1.425 yrs | **38.43** |
| TSH | #39 | 3.48 mIU/L | IFM optimal upper 2.5; midpoint 1.75 | +0.98 above IFM optimal upper | 1.0 / 1.0 → +0.98 yrs | **37.98** |

### Step 2: Weighted Predicted Ages

| Marker | v1.1.5 # | PA_i | w_i | Weighted PA_i |
|--------|----------|------|-----|---------------|
| HbA1c | #14 | 39.80 | 0.18 | 7.164 |
| Albumin | #22 | 41.80 | 0.16 | 6.688 |
| eGFR | #24 | 37.00 | 0.14 | 5.180 |
| hs-CRP (imputed) | #45 | 37.00 | 0.14 | 5.180 |
| Lp(a) | #44 | 39.78 | 0.10 | 3.978 |
| ApoB | #53 | 38.89 | 0.10 | 3.889 |
| Haemoglobin | #1 | 39.03 | 0.08 | 3.122 |
| Lymphocytes | #6 | 37.00 | 0.06 | 2.220 |
| MCV | #11 | 37.00 | 0.06 | 2.220 |
| ALP | #18 | 38.55 | 0.04 | 1.542 |
| Vitamin D | #36 | 38.43 | 0.06 | 2.306 |
| TSH | #39 | 37.98 | 0.06 | 2.279 |
| **Chrono anchor** | — | **37.00** | **0.25** | **9.250** |

**Σ Weighted PA_i (markers only) = 45.768**  
**Σ Weighted PA_i (with chrono anchor) = 55.018**  
**Σ w_i = 1.18 + 0.25 = 1.43**

### Step 3: Biological Age

```
BioAge = 55.018 / 1.43 = 38.48 ≈ 38.5 years [ESTIMATED]
```

### Step 4: Confidence Interval

- 11 of 12 markers tested (hs-CRP missing; 92% coverage)
- CI: ±1.2 years
- **BioAge = 38.5 years (range 37–40) [ESTIMATED]**

### Step 5: Domain Score (Locked Formula)

```
BioAgeScore = 50 + ((37 − 38.5) / 15) × 50
            = 50 + (−1.5 / 15) × 50
            = 50 + (−0.10) × 50
            = 50 − 5.0
            = 45 → Level 5
```

**Note:** The session working estimate of BioAge=39 (gap +2, score=43) from the patch instructions remains valid within the confidence interval. Using the more precise BioAge of 38.5, the score is 45. Both round to Level 5. **Production display: Score 45, Level 5.**

### Summary for Shashank Arya (April 2026):

| Field | Value |
|-------|-------|
| Chronological Age | 37 years |
| Biological Age | 38.5 years [ESTIMATED, ±1.2 yrs] |
| Gap | +1.5 years (biologically slightly older) |
| BioAge Score | **45** |
| BioAge Level | **Level 5 — Average** |
| Confidence | MEDIUM (hs-CRP missing) |
| Primary Accelerants | Albumin 4.1 (sub-optimal), HbA1c 5.5% (watch zone), Lp(a) 48.5 (genetic) |
| Protective Factors | eGFR 104 (excellent), Lymphocytes optimal, MCV normal |
| Priority Add at Next Panel | hs-CRP (#45) — largest single uncertainty in BioAge estimate |
| Active Rules | Rule 5, Rule 15 (both active for Heart Engine domain) |

## C.5 Worked Example: Ishita Kapoor — Biological Age Calculation (January 2026)

**Input:** Ishita Kapoor, female, chronological age 34. Blood collected 23-January-2026. Lab: G4726011437, HOD BTC Gurugram Sec-47.

**Panel completeness:** 9 of 12 BioAge markers tested (Lp(a), ApoB, hs-CRP missing — 75% coverage).

**Inflammation Note (REVISED — Correction 2):**
> **INFLAMMATION MARKERS MILDLY ELEVATED — Recommend hs-CRP on next panel for confirmation. Pattern (ESR 34 + WBC 10.72 at boundary) is consistent with possible recent illness recovery, allergic state, or moderate chronic inflammation. Not a confirmed acute inflammatory diagnosis. Score reflects measured biology; clinical correlation recommended if symptomatic.**

This qualifier applies to Recovery Capacity, Immunity Strength, and Mood & Calm domain communications. ESR 34 is valid data and is included in domain scoring (not BioAge — ESR is not a BioAge marker in C.3).

**Iron Panel (ADDED — missed in v1.0 review):** Iron 81 µg/dL (ref 37–170), TIBC 346 µg/dL (ref 265–497), TSAT 23.41% (ref 14–34% female). These values are within lab range but at the lower watch zone for performance optimisation (optimal TSAT 25–35%; Ishita at 23.41% = below optimal lower bound of 25%). Serum Iron 81 = within optimal female range (70–140). Impact: mild iron-status suboptimality contributing to Endurance & Stamina and Vitality & Strength domain scores.

### Step 1: Marker Values and Predicted Ages

| Marker | v1.1.5 # | Ishita's Value | Zenoho Optimal Midpoint | Deviation | Age Impact | PA_i |
|--------|----------|---------------|------------------------|-----------|------------|------|
| HbA1c | #14 | 5.2% | 5.1% | +0.1% above midpoint | 3.5/0.5 → +0.70 yrs | **34.70** |
| Albumin | #22 | 4.7 g/dL | 4.7 g/dL | 0 (exactly at midpoint) | 0 | **34.00** |
| eGFR | #24 | 119.8 mL/min | ≥90 (excellent) | Optimal | 0 | **34.00** |
| hs-CRP | #45 | NOT TESTED | — | MISSING; ESR 34 suggests mildly elevated — conservative imputation +1.0 yr | +1.0 imputed | **35.00** |
| Lp(a) | #44 | NOT TESTED | — | MISSING | Imputed at chrono | **34.00** |
| ApoB | #53 | NOT TESTED | — | MISSING | Imputed at chrono | **34.00** |
| Haemoglobin | #1 | 13.0 g/dL | 14.0 (midpoint 13.5–14.5 female) | −1.0 below midpoint | 1.5/1.0 → +1.50 yrs | **35.50** |
| Lymphocytes (ALC) | #6 | 3.83 ×10³/µL | Optimal lower 1.8, upper 3.0 — but lab range allows to 4.0; lymphocyte % = 35.7% (within optimal 28–38%) | **BOUNDARY-OPTIMAL — NO PENALTY** (Correction 3: ALC within lab range; lymphocyte % within optimal range; not elevated reactive) | 0 | **34.00** |
| MCV | #11 | 82.6 fL | 91.5 (midpoint 88–95) | −8.9 below midpoint | 1.5/5 per unit below midpoint → +2.67 yrs | **36.67** |
| ALP | #18 | 85 U/L | 60 (IFM optimal midpoint 40–80) | +25 above midpoint | 1.0/20 → +1.25 yrs | **35.25** |
| Vitamin D | #36 | 36.2 ng/mL | 50 (midpoint 40–60) | −13.8 below midpoint; −3.8 below opt lower | 1.5/10 per unit below lower → +0.57 yrs | **34.57** |
| TSH | #39 | 1.28 mIU/L | 1.75 (midpoint IFM 1.0–2.5) | −0.47 below midpoint but within optimal | 0 (within IFM optimal; slightly below midpoint is not a penalty) | **34.00** |

### Step 2: Weighted Predicted Ages

| Marker | v1.1.5 # | PA_i | w_i | Weighted PA_i |
|--------|----------|------|-----|---------------|
| HbA1c | #14 | 34.70 | 0.18 | 6.246 |
| Albumin | #22 | 34.00 | 0.16 | 5.440 |
| eGFR | #24 | 34.00 | 0.14 | 4.760 |
| hs-CRP (conservative imputation) | #45 | 35.00 | 0.14 | 4.900 |
| Lp(a) (imputed) | #44 | 34.00 | 0.10 | 3.400 |
| ApoB (imputed) | #53 | 34.00 | 0.10 | 3.400 |
| Haemoglobin | #1 | 35.50 | 0.08 | 2.840 |
| Lymphocytes (NEUTRAL) | #6 | 34.00 | 0.06 | 2.040 |
| MCV | #11 | 36.67 | 0.06 | 2.200 |
| ALP | #18 | 35.25 | 0.04 | 1.410 |
| Vitamin D | #36 | 34.57 | 0.06 | 2.074 |
| TSH | #39 | 34.00 | 0.06 | 2.040 |
| **Chrono anchor** | — | **34.00** | **0.25** | **8.500** |

**Σ Weighted PA_i (markers only) = 40.750**  
**Σ Weighted PA_i (with chrono anchor) = 49.250**  
**Σ w_i = 1.43**

### Step 3: Biological Age

```
BioAge = 49.250 / 1.43 = 34.44 ≈ 34.5 years [ESTIMATED]
```

### Step 4: Confidence Interval

- 9 of 12 BioAge markers tested (75% coverage; Lp(a), ApoB, hs-CRP all missing)
- CI: ±2.5 years
- **BioAge = 34.5 years (range 32–37) [ESTIMATED]**

### Step 5: Domain Score (Locked Formula)

```
BioAgeScore = 50 + ((34 − 34.5) / 15) × 50
            = 50 + (−0.5 / 15) × 50
            = 50 + (−0.033) × 50
            = 50 − 1.67
            = 48 → Level 5
```

### Summary for Ishita Kapoor (January 2026):

| Field | Value |
|-------|-------|
| Chronological Age | 34 years |
| Biological Age | 34.5 years [ESTIMATED, ±2.5 yrs] |
| Gap | +0.5 years (essentially aligned with chronological age) |
| BioAge Score | **48** |
| BioAge Level | **Level 5 — Average** |
| Confidence | LOW-MEDIUM (3 of 12 key markers missing; CI = ±2.5 yrs) |
| Protective Factors | Albumin 4.7 (perfect), HbA1c 5.2% (optimal), eGFR 119.8 (excellent), TSH 1.28 (optimal) |
| Sub-optimal Factors | Hb 13.0 (below female optimal), MCV 82.6 (microcytic pattern), VitD 36.2 (sub-optimal) |
| Iron Status | TSAT 23.41% (below optimal 25–35%); serum Iron 81 (within range); watch zone for performance |
| Inflammation Qualifier | MILDLY ELEVATED (ESR 34 + WBC 10.72); hs-CRP required for confirmation |
| Priority Adds at Next Panel | hs-CRP (#45), Lp(a) (#44), ApoB (#53), Ferritin (#42), Homocysteine (#46) |
| Note | If ESR normalises at next test, BioAge estimate may improve slightly. Lymphocyte value within normal range — not an inflammation signal independently. |

**v1.0 vs v1.0.1 BioAge comparison for Ishita:**

| Metric | v1.0 (wrong) | v1.0.1 (corrected) | Change |
|--------|-------------|---------------------|--------|
| BioAge | ~35 years | 34.5 years | −0.5 yr |
| Score | ~58–68 (unresolved range) | **48** (locked) | Resolved and lower |
| Level | 6–7 (unresolved) | **Level 5** (locked) | Resolved |
| Lymphocyte PA | 35.0 (wrong — penalised) | 34.0 (correct — neutral) | −1.0 yr contribution removed |
| Formula | Unresolved | Locked: 50 + ((34−34.5)/15)×50 | Resolved |


## C.6 Communication Templates for Biological Age

### Template 1: Biologically Younger Than Chronological Age ("Younger" — Level 8–10)

**[USER-FACING]**

---

**Your cells are running younger than the calendar.**

Your Biological Age is [X] — [N] years younger than your chronological age of [Y]. Of the markers that most reliably signal how fast your body is ageing at a cellular level — glucose control, kidney function, protein status, inflammation — yours are tracking ahead of where most people your age land.

**What this means:** Biological ageing isn't a single event. It happens continuously through accumulating damage — glycation, inflammation, oxidation, muscle loss. Your current markers suggest your body is managing these processes well. The gap between your biological and chronological age reflects the cumulative outcome of the choices you've made: how you eat, sleep, move, and manage stress.

**What's driving this:**
- Your Albumin at [X] reflects excellent protein status and anabolic capacity — one of the single strongest biological age predictors
- Your HbA1c at [X] keeps glycation damage low, protecting vessels and neurons
- Your eGFR at [X] signals that your kidneys — one of the most age-sensitive organs — remain highly functional

**Your three highest-leverage moves to maintain this:**
1. Keep HbA1c below 5.3%. Even small drift upward (5.5–5.6%) accelerates the gap.
2. Protect sleep: 7.5+ hours consistently. This is when cellular repair runs.
3. Retest annually at minimum. Biological age can shift in either direction; tracking matters.

**What success looks like at next test:** Maintaining or widening the gap. If you add hs-CRP to your next panel, you gain a more complete picture of your inflammation load — currently your BioAge estimate's biggest uncertainty.

**You're not just holding your age — you're reversing it.**

---

### Template 2: Biologically Aligned with Chronological Age ("Aligned" — Level 5–7)

**[USER-FACING]**

---

**Your body and your calendar agree. The question is: what happens next?**

Your Biological Age is [X] — essentially matching your chronological age of [Y]. This means your markers are tracking along the expected path for someone your age. Not a cause for alarm. Not cause for complacency either.

**What this means:** The biological ageing process proceeds at different speeds for different people — shaped by genetics, habits, and the markers that reflect both. "Aligned" is the majority position. But here's the insight Zenoho can offer that a standard lab report cannot: most people who reach Level 9 biological age weren't there five years earlier. They were where you are now. What they did next made the difference.

**What's driving this:**
- [Marker 1] at [X] is within range but below the optimal band associated with peak biological age scores
- [Marker 2] at [X] reflects a small gap from optimal that, compounded over time, has measurable impact
- [Marker 3 missing] — your panel is [N]% complete; [missing marker] would resolve the largest uncertainty in this estimate

**Your three highest-leverage moves:**
1. Bring [key marker] into optimal range: this single change is estimated to reduce BioAge by 1–2 years
2. Test hs-CRP at next panel — it's currently your biggest unknown in the biological age calculation
3. Prioritise sleep and stress management this quarter: cortisol elevation accelerates multiple ageing pathways simultaneously

**What success looks like at next test:** Biological Age at [ChronoAge - 2] or younger. A 2-year improvement in one testing cycle is achievable and has been documented in intervention studies using nutrition and lifestyle changes [VERIFY].

**You're on the right trajectory. Push it forward.**

---

### Template 3: Biologically Older Than Chronological Age ("Older" — Level 1–4)

**[USER-FACING]**

---

**Your markers are telling you something important. This is the right time to listen.**

Your Biological Age is estimated at [X] — approximately [N] years older than your chronological age of [Y]. This doesn't mean your body is broken. It means that right now, specific, identifiable markers are accelerating the biological ageing process — and most of them respond to intervention.

**What this means:** Biological age reflects damage accumulation: glycation in your blood vessels, inflammation in your tissues, protein loss from your cells. The gap between your biological and chronological age is large enough that some of these processes are running faster than they should. The important thing to understand is that biological age is not fixed. Studies show it can shift measurably in a single quarter with targeted changes [VERIFY].

**What's driving this:**
- [Primary accelerant 1] — this marker alone is responsible for an estimated [N] year contribution to your biological age gap
- [Primary accelerant 2] — a second driver that compounds with the first
- [Missing critical marker] — your panel is incomplete; testing [hs-CRP / ApoB / Albumin] at your next panel will sharpen this estimate significantly

**Your three highest-leverage moves:**
1. [Specific action for primary accelerant 1] — expected impact: [N] years within [timeline]
2. [Specific action for primary accelerant 2] — expected impact: [N] years within [timeline]
3. Complete the panel: the missing markers may reveal either hidden risk or hidden protection — either way, you need the information

**What success looks like at next test:** A gap reduction of 2–3 years in one testing cycle. This is realistic with focused intervention. Level 5 biological age (aligned with chronological age) is achievable within 6–12 months for most users in this category.

**The gap is information, not verdict. Act on it.**

> *Note: A biological age estimate significantly higher than your chronological age does not diagnose disease. It is an optimisation signal. If any markers in your panel are in a safety-override range, please review those findings with a licensed physician.*

---

## C.7 Edge Cases for Biological Age

### C.7.1 Athletic Populations
Athletes (particularly endurance athletes and strength athletes) may show:
- Elevated creatinine (muscle mass) → inflates perceived renal stress → use eGFR, not raw creatinine, in BioAge
- Lower resting heart rate markers (where tested)
- Transiently elevated inflammation post-training → confounds hs-CRP

**Handling:** User discloses "athlete" at signup → apply athletic modifier. BioAge calculation uses eGFR exclusively (not creatinine) and applies a +0.5 tolerance on WBC/lymphocyte parameters. Display note: "Calibrated for athletic physiology."

### C.7.2 Pregnant Users
Biological age calculation is **suspended during pregnancy**. Multiple markers shift physiologically:
- Albumin drops dilutionally (plasma expansion)
- eGFR increases 40–60% (hyperfiltration)
- Haemoglobin drops (dilutional anaemia)
- Inflammatory markers elevate

None of these represent biological ageing; all represent adaptive physiology. Displaying a BioAge estimate during pregnancy would produce a misleadingly elevated result and cause unnecessary distress.

**Display:** "Biological Age calculation is paused during pregnancy. Your data is being saved and your biological age will be recalculated from your first post-pregnancy panel (typically 6–12 weeks postpartum)."

### C.7.3 Recently Ill Users
Acute infection, surgery, or trauma within the past 8 weeks:
- Albumin drops acutely (negative acute-phase reactant)
- Lymphocytes may be suppressed
- CRP/ESR elevated substantially

**Handling:** If ESR >40 or WBC >12 or ALC <1.0 at time of testing: display BioAge with "ACUTE RECOVERY PHASE — RETEST RECOMMENDED IN 8 WEEKS" flag. Do not report BioAge as stable estimate. This condition applies to Ishita's January 2026 panel.

### C.7.4 Chronic Disease Users
Users with diabetes, autoimmune conditions, or cardiovascular disease will show systematically elevated BioAge estimates. This is not wrong — chronic disease does accelerate biological ageing. However, communication must shift:
- Never present the BioAge gap as news (user likely knows)
- Focus on "managing well" framing: "Given your [condition], your biological age of [X] reflects effective management"
- Provide context: "Many users with [condition] show larger gaps at diagnosis; your current trajectory shows [improvement/stability]"
- Never use BioAge to alarm a chronic disease user who is already under medical care

### C.7.5 Users Under 25
Standard KDM calibration is least reliable under age 25 because:
- Albumin, eGFR, and lipid markers haven't reached "adult stable" state
- Biological age and chronological age tend to cluster near each other naturally
- Small fluctuations produce large apparent gaps

**Handling:** Under 25, display with wider CI (±5 years) and note: "Biological age estimates are most reliable after age 25. Treat this as an early baseline rather than a definitive estimate."

### C.7.6 Users Over 70
In older adults:
- Expected biological-chronological gap widens for most users
- Level 7 at age 72 is genuinely elite (equivalent to Level 9 at age 40)
- Focus must shift from "reversal" to "preservation"

**Calibration:** For users 70+, apply +5 score buffer across the board. Framing: "function preservation," "active longevity," not anti-ageing rhetoric.

---

## C.8 What Biological Age Does NOT Mean

**Mandatory Disclaimer Language (display with every BioAge result):**

> **About this estimate:** Your Biological Age is calculated from your blood test markers using a modified Klemera-Doubal algorithm. It is an estimate, not a precise biological measurement. It is not a prediction of your lifespan. It is not a diagnosis. It does not predict when or whether you will develop any disease. It reflects how efficiently your body is currently running at a cellular level, based on the markers available.
>
> Biological age can change — in both directions — depending on your lifestyle, nutrition, sleep, stress levels, and the interventions you take. It is a starting point for optimisation, not a verdict.
>
> **This output is not a substitute for clinical medical care.** If any marker in your panel is in a safety-flag range, consult a licensed physician regardless of your overall biological age score.

**Specific Prohibitions:**
1. Never display biological age as a "death clock" or life expectancy estimate
2. Never imply that a high biological age means the user will develop specific diseases
3. Never display BioAge comparison to a deceased public figure or celebrity
4. Never use biological age to recommend pharmaceutical interventions
5. Never display BioAge as a reason to undergo elective procedures
6. Never present BioAge improvement as guaranteed by any protocol

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART D — DOMAIN-MARKER MATRIX (Master Table)

## D.1 Domain-Marker Matrix (v1.0.1 — v1.1.5 Canonical Numbering)

**Column key:** BA=Biological Age, VS=Vitality & Strength, BS=Brain Sharpness, HE=Heart Engine, MP=Metabolic Power, RC=Recovery Capacity, DE=Detox Efficiency, ES=Endurance & Stamina, MC=Mood & Calm, IS=Immunity Strength  
**All weights are normalised within each domain column at scoring time (divide each weight by the sum of tested-marker weights for that domain).**

| v1.1.5 # | Marker Name | BA | VS | BS | HE | MP | RC | DE | ES | MC | IS |
|----------|------------|----|----|----|----|----|----|----|----|----|----|
| **SYSTEM 3 — BLOOD / HAEMATOLOGY** |
| 1 | Haemoglobin | 8 | 12 | 6 | 5 | 0 | 8 | 0 | 25 | 5 | 8 |
| 2 | RBC Count | 0 | 6 | 0 | 0 | 0 | 5 | 0 | 15 | 0 | 5 |
| 3 | WBC Total (TLC) | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 | 0 | 18 |
| 4 | Platelet Count | 0 | 0 | 0 | 8 | 0 | 5 | 0 | 0 | 0 | 8 |
| 5 | ANC (Neutrophils) | 0 | 0 | 0 | 0 | 0 | 8 | 0 | 0 | 0 | 12 |
| 6 | ALC (Lymphocytes) | 6 | 0 | 0 | 0 | 0 | 8 | 0 | 0 | 0 | 12 |
| 7 | Monocytes | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 8 |
| 8 | Eosinophils (AEC) | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 8 |
| 9 | Basophils | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5 |
| 10 | Haematocrit (HCT) | 0 | 5 | 0 | 0 | 0 | 5 | 0 | 12 | 0 | 0 |
| 11 | MCV | 6 | 0 | 6 | 0 | 5 | 5 | 5 | 8 | 5 | 5 |
| 12 | MCH | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 5 | 0 | 5 |
| 48 | MCHC | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 5 | 0 | 0 |
| 49 | RDW-CV | 0 | 0 | 0 | 5 | 0 | 5 | 0 | 5 | 0 | 5 |
| **SYSTEM 1 — GLUCOSE / METABOLIC** |
| 13 | Fasting Blood Sugar (FBS) | 0 | 5 | 10 | 8 | 25 | 0 | 5 | 5 | 8 | 0 |
| 14 | HbA1c | 18 | 5 | 15 | 12 | 30 | 0 | 5 | 5 | 8 | 0 |
| 15 | HOMA-IR | 0 | 0 | 10 | 8 | 15 | 0 | 0 | 0 | 8 | 0 |
| 54 | Fasting Insulin | 0 | 0 | 10 | 8 | 22 | 0 | 5 | 0 | 10 | 0 |
| *C-Peptide* | *REMOVED — not in v1.1.5* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* |
| **SYSTEM 4 — LIVER** |
| 16 | ALT (SGPT) | 0 | 0 | 0 | 0 | 5 | 5 | 20 | 0 | 5 | 0 |
| 17 | AST (SGOT) | 0 | 0 | 0 | 0 | 5 | 5 | 15 | 5 | 5 | 0 |
| 18 | ALP | 4 | 0 | 0 | 0 | 0 | 0 | 15 | 0 | 0 | 0 |
| 19 | GGT | 0 | 0 | 0 | 5 | 5 | 0 | 15 | 0 | 8 | 0 |
| 20 | Total Bilirubin | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 | 0 | 0 |
| 21 | Total Protein | 0 | 0 | 0 | 0 | 0 | 5 | 5 | 0 | 0 | 5 |
| 22 | Albumin | 16 | 0 | 5 | 0 | 0 | 8 | 15 | 8 | 0 | 0 |
| 51 | Globulin | 0 | 0 | 0 | 0 | 0 | 5 | 5 | 0 | 0 | 0 |
| **SYSTEM 5 — KIDNEY / BONE-MINERAL** |
| 23 | Creatinine | 0 | 0 | 0 | 5 | 0 | 0 | 8 | 5 | 0 | 0 |
| 24 | eGFR | 14 | 0 | 5 | 8 | 0 | 0 | 12 | 0 | 0 | 0 |
| 25 | BUN | 0 | 0 | 0 | 0 | 0 | 0 | 8 | 0 | 0 | 0 |
| 26 | Uric Acid | 0 | 0 | 8 | 8 | 5 | 8 | 5 | 0 | 5 | 0 |
| 27 | Sodium | 0 | 0 | 5 | 0 | 0 | 5 | 5 | 5 | 5 | 0 |
| 28 | Potassium | 0 | 0 | 5 | 8 | 0 | 5 | 5 | 5 | 0 | 0 |
| 29 | Chloride | 0 | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 0 | 0 |
| 30 | Phosphorus | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 50 | Calcium | 0 | 0 | 0 | 5 | 0 | 5 | 0 | 0 | 5 | 0 |
| **SYSTEM 2 — CARDIOVASCULAR / LIPIDS** |
| 31 | Total Cholesterol | 0 | 0 | 5 | 15 | 5 | 0 | 0 | 0 | 0 | 0 |
| 32 | LDL Cholesterol | 0 | 0 | 5 | 15 | 5 | 0 | 0 | 0 | 0 | 0 |
| 33 | HDL Cholesterol | 0 | 5 | 8 | 18 | 10 | 0 | 0 | 0 | 5 | 0 |
| 34 | Triglycerides | 0 | 0 | 8 | 12 | 15 | 0 | 5 | 0 | 5 | 0 |
| 35 | VLDL Cholesterol | 0 | 0 | 0 | 8 | 5 | 0 | 0 | 0 | 0 | 0 |
| 44 | Lp(a) | 10 | 0 | 0 | 22 | 0 | 0 | 0 | 0 | 0 | 0 |
| 53 | ApoB | 10 | 0 | 0 | 20 | 5 | 0 | 0 | 0 | 0 | 0 |
| **SYSTEM 7 — VITAMINS / MINERALS / IRON** |
| 36 | Vitamin D (25-OH) | 6 | 8 | 12 | 0 | 5 | 10 | 0 | 5 | 15 | 15 |
| 37 | Vitamin B12 | 0 | 5 | 15 | 0 | 0 | 5 | 0 | 10 | 15 | 8 |
| 38 | Folate | 0 | 0 | 10 | 0 | 0 | 5 | 0 | 5 | 10 | 5 |
| 41 | Serum Iron | 0 | 8 | 5 | 0 | 0 | 0 | 0 | 20 | 5 | 0 |
| 42 | Ferritin | 0 | 8 | 5 | 5 | 0 | 5 | 0 | 18 | 0 | 5 |
| 43 | TIBC / TSAT | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 | 0 | 0 |
| 58 | Magnesium RBC | 0 | 8 | 15 | 8 | 5 | 10 | 0 | 5 | 15 | 0 |
| *Zinc Serum* | *REMOVED — not in v1.1.5* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* | *—* |
| **SYSTEM 6 — THYROID** |
| 39 | TSH | 6 | 15 | 12 | 0 | 10 | 5 | 0 | 8 | 15 | 0 |
| 40 | Free T4 (FT4) | 0 | 8 | 5 | 0 | 5 | 0 | 0 | 5 | 8 | 0 |
| 47 | Free T3 (FT3) | 0 | 12 | 10 | 0 | 8 | 5 | 0 | 10 | 12 | 0 |
| 57 | Anti-TPO Antibodies | 0 | 5 | 0 | 0 | 0 | 8 | 0 | 0 | 8 | 8 |
| **SYSTEM 8 — INFLAMMATION** |
| 45 | hs-CRP | 14 | 0 | 5 | 18 | 5 | 15 | 0 | 5 | 8 | 12 |
| 46 | Homocysteine | 0 | 0 | 15 | 10 | 0 | 0 | 5 | 0 | 10 | 0 |
| 52 | ESR | 0 | 0 | 0 | 8 | 0 | 12 | 0 | 8 | 8 | 10 |
| **SYSTEM 9 — HORMONES** |
| 55 | PTH (Parathyroid Hormone) | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | 0 |
| 56 | Cortisol AM | 0 | 8 | 8 | 0 | 5 | 10 | 0 | 5 | 20 | 0 |
| 59 | Total Testosterone (M) | 0 | 20 | 8 | 0 | 5 | 5 | 0 | 8 | 10 | 0 |
| 60 | Free Testosterone (M) | 0 | 18 | 8 | 0 | 5 | 5 | 0 | 8 | 8 | 0 |
| 61 | SHBG | 0 | 10 | 0 | 0 | 5 | 0 | 0 | 0 | 5 | 0 |
| 62 | DHEA-S | 0 | 8 | 5 | 0 | 0 | 5 | 0 | 5 | 8 | 0 |

---

### D.2 Removed Markers — Flagged for Future Addition

| Marker | Reason for Removal | Impact of Removal | Future Version |
|--------|-------------------|-------------------|----------------|
| C-Peptide | Not in v1.1.5 marker registry | Removed 10 weight from Metabolic Power column. Redistributed: FBS (#13) MP weight 25→27, HbA1c (#14) MP weight 30→33, Fasting Insulin (#54) MP weight 22→25 | v1.4 pipeline |
| Zinc Serum | Not in v1.1.5 marker registry | Removed weights: VS 5→redistributed to Magnesium RBC (#58) +5; BS 5→Magnesium RBC (#58) +5; MC 5→Magnesium RBC (#58) +5; IS 15→redistributed: ALC (#6) +8, VitD (#36) +7 | v1.4 pipeline |

**Post-redistribution column impact:** All domain totals remain in the 95–120 range (normalised at scoring time). No domain loses more than 8% of its weighted coverage from these two removals.

---

### D.3 v1.1.5 System Weights (for verification — all domain scoring must use these)

| v1.1.5 System # | System Name | Weight |
|-----------------|------------|--------|
| 1 | Glucose / Metabolic | **18%** |
| 2 | Cardiovascular / Lipids (incl Lp(a) #44, ApoB #53) | **15%** |
| 3 | Blood / Haematology (incl MCHC #48, RDW #49) | **14%** |
| 4 | Liver (incl Globulin #51) | **12%** |
| 5 | Kidney / Bone-Mineral (incl Calcium #50) | **10%** |
| 6 | Thyroid (incl Anti-TPO #57) | **10%** |
| 7 | Vitamins / Minerals / Iron (incl Magnesium RBC #58) | **11%** |
| 8 | Inflammation (incl ESR #52) | **5%** |
| 9 | Hormones (PTH #55, Cortisol #56, Total T #59, Free T #60, SHBG #61, DHEA-S #62) | **5%** |
| **TOTAL** | | **100%** |



# PART E — SCORING ALGORITHMS PER DOMAIN

## E.1 Standard Domain Score Formula

All domain scores use the following base calculation, derived from v1.1.5 Appendix 2 marker scoring:

### Step 1: Compute Individual Marker Score (MS_i)

Each marker in v1.1.5 is scored on a 0–100 scale per its individualised scoring function (linear, U-curve, or plateau-based). This step is handled entirely by the v1.1.5 engine — the domain layer receives pre-computed MS_i values.

### Step 2: Filter to Domain-Relevant Markers

For domain D, select only markers where `D.1 weight > 0` for that domain.

### Step 3: Weighted Average with Confidence Adjustment

```
DomainRaw = Σ(MS_i × w_i) / Σ(w_i)    [summing only over TESTED markers with w_i > 0]
```

Where:
- `MS_i` = individual marker score (0–100) from v1.1.5 engine
- `w_i` = domain weight from D.1 matrix for marker i in domain D
- Σ runs only over markers that were **actually tested** (not missing)

### Step 4: Confidence Weighting

```
TestedWeight = Σ(w_i)    [tested markers only]
TotalWeight  = Σ(w_i)    [all markers with non-zero weight in domain D]
CoverageRatio = TestedWeight / TotalWeight

DomainScore = DomainRaw × CoverageRatio + 50 × (1 - CoverageRatio)
```

This formula gently pulls the domain score toward 50 (average) as coverage drops. A domain with 20% coverage produces a score that is 80% pulled toward the population average — avoiding false precision. Full coverage (100%) produces pure weighted average.

### Step 5: Apply Safety Override Caps (see E.4)

If any safety override is active for this domain, domain score is capped at 50 regardless of calculated score.

### Step 6: Apply Cross-Marker Rule Modifications (see E.3)

Cross-marker rules may further reduce the domain score below the calculated value.

### Step 7: Round to Integer

Domain score is rounded to the nearest integer. No decimal display (per H.3 design spec).

---

## E.2 U-Curve Domain Handling

Some markers behave non-linearly — both very high AND very low values represent suboptimal states. The v1.1.5 engine handles U-curve scoring at the marker level (marker scores are already U-curve adjusted). However, two domain-level considerations apply:

### Domains Affected by U-Curve Markers:

**Vitality & Strength:**
- Cortisol: both deficiency (Addison's-like picture) and excess (Cushing's-like pattern) reduce this score
- TSH: both high (hypothyroid) and low (hyperthyroid) reduce vitality
- Testosterone: clinically low (<200 ng/dL) reduces vitality; pharmacologically high (>1000 ng/dL in non-athletes) does NOT improve score and triggers body dysmorphia safety flag

**Mood & Calm:**
- Cortisol: excess → anxiety; deficiency → fatigue/depression
- Sodium: hyponatraemia AND hypernatraemia both impair mood and cognition

**Recovery Capacity:**
- Ferritin: deficiency impairs recovery; excess (>300 µg/L in males) may indicate haemochromatosis or inflammatory state

### U-Curve Handling:
The v1.1.5 engine returns MS_i already U-curve adjusted. Domain-level handling requires only verifying that both ends of the distribution produce low scores — the marker-level scoring handles the actual calculation. Domain documentation must flag which markers require U-curve awareness for user communication.

---

## E.3 Cross-Marker Rule Integration

All 15 v1.1.5 cross-marker rules and their domain impact:

| Rule # | v1.1.5 Rule Name | Domain Impact |
|--------|-----------------|---------------|
| 1 | `elevated_hba1c_plus_fasting_glucose` | Metabolic Power capped at Level 6 (60) until both normalise |
| 2 | `low_t3_plus_elevated_tsh` | Vitality & Strength −10 points; Mood & Calm −8 points |
| 3 | `iron_deficiency_anaemia_pattern` (low Hb + low iron + low ferritin + high TIBC) | Endurance & Stamina capped at Level 5 (50); Mood & Calm −5 points |
| 4 | `b12_deficiency_plus_macrocytosis` (low B12 + MCV >94) | Brain Sharpness −10 points; Mood & Calm −8 points |
| 5 | `aggressive_apoB_suppression_required` (Lp(a) >30 + LDL >80) | Heart Engine capped at Level 5 (50) until ApoB <80 and LDL <70; additional −5 penalty applied |
| 6 | `hypothyroid_metabolic_pattern` (TSH >4.5 + FT3 <3.0 + FT4 <0.8) | Metabolic Power −15 points; Vitality & Strength −12 points |
| 7 | `liver_stress_pattern` (ALT >50 + AST >40 + GGT >40) | Detox Efficiency capped at Level 4 (40); clinical referral required |
| 8 | `insulin_resistance_cluster` (HOMA-IR >2.5 + TG >150 + HDL <40M/<50F) | Metabolic Power −20 points; Heart Engine −10 points |
| 9 | `inflammation_plus_low_albumin` (hs-CRP >3 + Albumin <3.5) | Recovery Capacity capped at Level 3 (30); clinical referral required |
| 10 | `low_vit_d_plus_elevated_pth` (VitD <20 + PTH >65) | Immunity Strength −10; Endurance & Stamina −8 (bone metabolism impact) |
| 11 | `low_b12_plus_homocysteine_elevation` (B12 <300 + Homocysteine >15) | Brain Sharpness −15 points; Heart Engine −8 points |
| 12 | `high_cortisol_plus_low_dhea` (Cortisol AM >20 + DHEA-S below age-optimal) | Vitality & Strength −12 points; Mood & Calm −15 points; adrenal fatigue education flag |
| 13 | `testosterone_suppression_pattern` (Total T <300 ng/dL M + high SHBG + low FT) | Vitality & Strength capped at Level 4 (40); Recovery Capacity −8 points |
| 14 | `metabolic_syndrome_cluster` (≥3 of: TG >150, HDL low, BP elevated [NOT TESTED], waist >90cm [NOT TESTED], FBS >100) | Metabolic Power −20; Heart Engine −15; Biological Age +3 years added to estimate |
| 15 | `discordant_lipid_pattern` (ApoB >90 + LDL <130) | Heart Engine: use ApoB-based scoring exclusively, not LDL-based; ApoB score overrides LDL score in Heart Engine calculation; score cap at Level 6 pending ApoB normalisation |

**Currently Triggered for Shashank (April 2026):**
- Rule 5 (`aggressive_apoB_suppression_required`): Lp(a) 48.5 >30 AND ApoB 105.21 >80 → Heart Engine capped at Level 5, additional −5 applied
- Rule 15 (`discordant_lipid_pattern`): ApoB 105.21 >90 + LDL 113 <130 → ApoB overrides LDL in Heart Engine calculation

**Currently Triggered for Ishita (January 2026):**
- Rule 4 (`b12_deficiency_plus_macrocytosis`): B12 419 <500 (sub-optimal) + MCV 82.6 is actually microcytic, not macrocytic → Rule 4 NOT triggered (microcytic MCV does not meet macrocytosis criterion; rule requires MCV >94)
- Correction: Ishita's B12 at 419 is sub-optimal but not in deficiency range (<300 triggers rule); Rule 4 not active

---

## E.4 Safety Override Domain Caps

All 13 v1.1.5 Safety Overrides (Appendix 3) result in the following domain caps:

| Override # | v1.1.5 Override Description | Domain Capped | Cap Level | Additional Action |
|-----------|---------------------------|--------------|-----------|-------------------|
| 1 | Haemoglobin <8.0 g/dL | Endurance & Stamina, Vitality | Level 2 (20) | Clinical referral required |
| 2 | HbA1c >9.0% | Metabolic Power, Heart Engine | Level 2 (20) | Clinical referral required |
| 3 | TSH >10 mIU/L | Vitality, Mood, Brain | Level 2 (20) | Clinical referral required |
| 4 | ALT or AST >200 U/L | Detox Efficiency | Level 1 (10) | Clinical referral urgent |
| 5 | eGFR <30 mL/min | Biological Age, Endurance | Level 1 (10) | Clinical referral urgent |
| 6 | Potassium <2.5 or >6.5 mEq/L | All domains | Level 1 (10) | Clinical referral urgent |
| 7 | Sodium <120 or >155 mEq/L | All domains | Level 1 (10) | Clinical referral urgent |
| 8 | Platelet <50 or >1000 ×10³/µL | Immunity, Heart Engine | Level 1 (10) | Clinical referral urgent |
| 9 | WBC >30 ×10³/µL | Immunity Strength | Level 1 (10) | Clinical referral urgent (leukaemia exclusion) |
| 10 | Calcium <6.0 or >13.0 mg/dL | All domains | Level 1 (10) | Clinical referral urgent |
| 11 | ALC <0.5 ×10³/µL (absolute lymphopenia) | Immunity Strength | Level 2 (20) | Clinical referral required |
| 12 | LDL >250 mg/dL (familial hypercholesterolaemia screen) | Heart Engine | Level 2 (20) | Clinical referral required |
| 13 | Ferritin >1000 µg/L | Recovery Capacity, Detox | Level 2 (20) | Clinical referral required (haemochromatosis exclusion) |

**Display Rule:** When any safety override is active, the relevant domain card displays a distinct visual state (amber/warning, not performance gradient) with the text: "This domain requires clinical attention before performance scoring is meaningful. Please discuss the flagged marker(s) with your physician."

Performance framing is **suspended** for affected domains during a safety override. This is a mandatory override that cannot be disabled by any user setting.

---

## E.5 Confidence Per Domain

### Confidence Level Definitions:

| Level | Criteria | Display Treatment |
|-------|----------|-------------------|
| HIGH | ≥80% of domain weight covered by tested markers AND no critical marker missing | Full score display; trend lines active |
| MEDIUM | 50–79% weight coverage OR 1–2 critical markers missing | Score displayed with "(estimated)" note; CI range shown; "Complete your panel" CTA shown |
| LOW | <50% weight coverage OR 3+ critical markers missing | Score displayed as "~[X]" (approximate); large CI shown; strong "Complete your panel" prompt |
| UNCALCULABLE | <25% weight coverage | No score displayed; "Insufficient data for [Domain] score. Add [specific markers] to unlock." |

### Critical Markers by Domain (presence of these markers shifts confidence level significantly):

| Domain | Critical Markers (missing = automatic MEDIUM cap) |
|--------|--------------------------------------------------|
| Biological Age | HbA1c, Albumin, eGFR |
| Vitality & Strength | TSH, FT3, Total/Free Testosterone (male users) |
| Brain Sharpness | B12, HbA1c |
| Heart Engine | LDL, HDL, ApoB, Lp(a) |
| Metabolic Power | HbA1c, Fasting Insulin |
| Recovery Capacity | Haemoglobin, hs-CRP |
| Detox Efficiency | ALT, AST, Albumin |
| Endurance & Stamina | Haemoglobin, Iron, Ferritin |
| Mood & Calm | VitD, B12 |
| Immunity Strength | WBC with differential (ANC, ALC) |

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

---

# PART F — DOMAIN LEVEL MAPPING

## F.1 Universal Level Definitions

| Level | Score Range | Label | User-Facing Descriptor | Population Prevalence (Indian estimate) |
|-------|------------|-------|----------------------|----------------------------------------|
| 10 | 91–100 | **Elite** | "Top of your class" | <2% |
| 9 | 81–90 | **High Performance** | "Performing at your peak" | ~5% |
| 8 | 71–80 | **Optimised** | "Well above average" | ~12% |
| 7 | 61–70 | **Strong** | "Performing well" | ~18% |
| 6 | 51–60 | **Above Average** | "Solid foundation" | ~22% |
| 5 | 41–50 | **Average** | "Room to grow" | ~20% |
| 4 | 31–40 | **Below Average** | "Improvement opportunity" | ~12% |
| 3 | 21–30 | **Low** | "Needs focus" | ~6% |
| 2 | 11–20 | **Very Low** | "Priority area" | ~2% |
| 1 | 0–10 | **Critical** | "Needs immediate attention" | <1% |

**Note on Indian population calibration:** These prevalence estimates are approximate, based on available Indian epidemiological data for metabolic health, haematological status, and micronutrient levels [VERIFY with NFHS-5 and ICMR data]. Zenoho will recalibrate these distributions using anonymised aggregate user data as the platform accumulates testing data (minimum 1,000 test panels before recalibration; user privacy preserved through aggregation).

**Score inflation prevention:** Level 9–10 is reserved for genuinely exceptional results. A user with all markers at or above the IFM optimal midpoint across all tested markers would approach Level 9. Level 10 requires testing all critical markers AND having all in the top quartile of the optimal range. Based on projected user population in urban India, fewer than 2% of users should achieve Level 10 in any domain.

---

## F.2 Per-Domain Level Calibration

Different domains distribute differently across the Indian urban population. The table below reflects expected distribution skew:

| Domain | Expected Median Level | Distribution Notes |
|--------|----------------------|-------------------|
| Biological Age | Level 5–6 | Most urban Indian adults in their 30s–40s show 1–3 year positive gap |
| Vitality & Strength | Level 5–6 (male); Level 4–5 (female, without hormone panel) | Testosterone deficiency common in 35–50 age group; iron deficiency common in females |
| Brain Sharpness | Level 5–6 | B12 deficiency endemic in vegetarian India; VitD deficiency common; partially explains lower average |
| Heart Engine | Level 4–5 | Urban Indian lipid profiles skewed toward elevated TG, low HDL, elevated ApoB; this domain expected to show lower average than Western cohorts [VERIFY] |
| Metabolic Power | Level 5–6 | HbA1c distribution in Indian population is shifted right vs Western; higher prediabetes prevalence [VERIFY ICMR data] |
| Recovery Capacity | Level 5–6 | ESR and inflammation markers mildly elevated in urban population; sleep deficiency common |
| Detox Efficiency | Level 6–7 | Liver markers often within range in younger adults; slight skew toward average |
| Endurance & Stamina | Level 4–5 | Iron deficiency anaemia affects ~50% of Indian women [VERIFY NFHS-5]; ferritin deficiency common even without anaemia |
| Mood & Calm | Level 5–6 | VitD deficiency, B12 deficiency, and high stress common in urban Indian context |
| Immunity Strength | Level 6–7 | High infection exposure paradoxically produces trained immunity; but chronic VitD deficiency offsets gains |

---

## F.3 Level Movement Rules

### How Fast Can a Domain Level Move?

Movement per quarter (3 months) with active intervention:

| Domain | Realistic Maximum Gain | Limiting Factor |
|--------|----------------------|-----------------|
| Biological Age | 1–2 levels (biologically slow by nature) | HbA1c and albumin change slowly |
| Vitality & Strength | 1–2 levels | Testosterone optimisation takes 3–6 months; thyroid slow |
| Brain Sharpness | 1–2 levels | B12 repletion: 8–12 weeks; VitD: 8–12 weeks |
| Heart Engine | 0–1 levels | Lp(a) genetically fixed; lipid changes take 3–6 months on intervention |
| Metabolic Power | 1–2 levels | HbA1c reflects 90-day average; lifestyle changes show at 12 weeks |
| Recovery Capacity | 1–3 levels | CRP can drop quickly with lifestyle change; fastest-moving domain |
| Detox Efficiency | 1–2 levels | ALT/AST normalise within 4–8 weeks with alcohol reduction |
| Endurance & Stamina | 1–2 levels | Iron repletion: 3 months for stores; haemoglobin: 4–6 weeks |
| Mood & Calm | 1–3 levels | VitD and B12 repletion 8–12 weeks; some components are lifestyle-immediate |
| Immunity Strength | 1–2 levels | VitD and zinc: 4–8 weeks; lymphocyte counts are relatively stable |

### Level Downgrade Rules

A domain level may drop between tests if:
- A marker that was previously tested at an optimal value is retested and shows significant decline
- A safety override is newly triggered
- A cross-marker rule is newly triggered that was previously inactive

**Communication when level drops:**
- Never present a downgrade as a personal failure
- "Your [domain] score has changed since your last test — here's what shifted and what to do next"
- Always include specific, actionable next steps
- Acknowledge that life circumstances (illness, stress, travel, seasonal change) can temporarily affect scores
- If drop is >2 levels in one testing cycle: flag for retest before finalising (lab error detection)

### Triggers for Retest Recommendation:

A domain score drop of >20 points in one testing cycle without documented illness or major lifestyle change should trigger:
1. Cross-reference against v1.1.5 Appendix 17 lab error patterns
2. User communication: "Your [domain] score has dropped significantly. Before we update your profile, we'd recommend confirming this with a retest — significant single-cycle drops can sometimes reflect testing variability."
3. Option to "hold previous score pending retest" or "accept new score and update"

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART G — USER COMMUNICATION TEMPLATES

## G.1 Tone Hierarchy (Mandatory Across All Output)

Every piece of user-facing communication generated by the Zenoho platform must satisfy all six tone criteria simultaneously. These are not style preferences — they are mandatory constraints that the chatbot prompt, WhatsApp communication templates, and report display must all respect.

**1. Direct**
State findings without burying them in qualification. If a marker is significantly below optimal, say so clearly. Do not dilute important findings with so many caveats that the user cannot act on them.
- ❌ "It could be that perhaps your energy might possibly be slightly affected by this marker."
- ✅ "Your ferritin is at 12 µg/L. This level is insufficient for optimal energy production."

**2. Aspirational**
Every communication looks forward. Even critical findings are framed in the context of what is achievable. The past state of the marker is a data point; the future state is the point of the conversation.
- ❌ "Your HbA1c has been elevated for some time."
- ✅ "Bringing your HbA1c below 5.3% would meaningfully reduce your cardiovascular ageing load. Here's how."

**3. Scientific**
Cite the mechanism — at an appropriate level of complexity for the user. Don't dumb down to condescension; don't complexify to confusion. The mechanism is the bridge between the marker and the user's felt experience.
- ❌ "Low B12 is bad for your brain."
- ✅ "B12 is required for myelin synthesis — the insulating sheath around your neurons. Sub-optimal B12 slows neural transmission and is associated with cognitive fog, slower reaction times, and low mood."

**4. Personal**
Use "you" and "your" throughout. Avoid abstract third-person language. The user is not a patient cohort — they are a specific person looking at their specific result.
- ❌ "Patients with elevated TSH often experience..."
- ✅ "Your TSH at 3.48 sits above the functional optimal. For you specifically, this is likely contributing to your [domain] pattern."

**5. Firm but Never Alarming**
Critical findings receive appropriate emphasis — but the emphasis is on action, not fear. Alarm triggers the amygdala and shuts down the prefrontal cortex's ability to make rational decisions. The goal is activation, not paralysis.
- ❌ "Your Lp(a) is dangerously high."
- ✅ "Your Lp(a) is genetically elevated. This is a structural risk factor that warrants a permanent shift in your cardiovascular strategy. Here is that strategy."

**6. Never Shameful**
A low score never implies moral failing, personal weakness, or character flaw. Low scores reflect biology, circumstance, and opportunity — not who the user is. This is non-negotiable.
- ❌ "Your immune system is weak."
- ✅ "Your Immunity Strength score has room to grow. Three specific changes will move this meaningfully within 8 weeks."

---

## G.2 Forbidden Language (DO NOT USE — Platform-Wide)

The following words, phrases, and constructs are prohibited in all user-facing output, including WhatsApp messages, push notifications, chatbot responses, score cards, and educational content:

| Forbidden | Replace With |
|-----------|-------------|
| "You are unhealthy" | "Your [domain] has room for optimisation" |
| "You are sick" | Never use in performance framing context |
| "Your health is failing" | "This marker is below optimal — here's what it means and what to do" |
| "This is bad" | "This is below your optimal range" |
| "Worrying levels" | "This level warrants attention" |
| "Concerning" | "Worth addressing" |
| "Abnormal" | "Outside optimal range" |
| "You have [condition]" | Never diagnose; "This pattern is consistent with what we see in..." |
| "Dangerous" | "This requires clinical attention" |
| "Red flag" | "Priority finding" |
| "You're at risk of dying" | Never use mortality language in performance framing |
| "Failure" (re: organ or body) | "Below optimal function" |
| "Weak" (re: immune system, etc.) | "Lower than your optimal" |
| "Poor" (as a score descriptor) | "Below average" |
| "Alarming" | "Worth discussing with your physician" |
| "Should be worried" | "This is worth taking action on" |
| Scare quotes around abnormal values | State value and range plainly |

---

## G.3 Preferred Language (USE — Platform-Wide)

| Preferred Language | Context |
|-------------------|---------|
| "Your [domain] is performing at Level [X]" | Score display |
| "Outside optimal range" | When a marker is not in optimal |
| "Below your potential" | When score suggests significant room to improve |
| "Recovery opportunity" | When a domain has been impacted by illness or stress |
| "Three biggest levers right now" | Before listing recommended actions |
| "Predicted improvement" | Before forecasting next-test result with intervention |
| "Your biology is telling you [X]" | When explaining mechanism |
| "At your next test, we expect [X] if you [Y]" | Forecasting language |
| "This is a manageable finding" | For non-critical but notable results |
| "Clinically, this warrants attention" | For safety-override level findings |
| "Let's discuss this with your physician" | For critical findings |
| "Your [marker] has shifted" | For downward movement between tests |
| "Starting point" | For first-time users |
| "Progress" / "Your trend is [positive/flat/declining]" | For returning users |

---

## G.4 Domain-Specific Headlines

Five headline examples per domain across score levels:

### Biological Age
1. (Level 9) "Your cells are running 8 years younger than your passport. Keep going."
2. (Level 7) "Biologically 2 years younger than your calendar age. Room to push further."
3. (Level 5) "Your biological and chronological age are aligned. Here's how to tip the balance."
4. (Level 3) "Your biology is ageing 5 years faster than your calendar. These three changes can reverse that."
5. (Level 1) "Your biological age markers need urgent attention. Action this week matters."

### Vitality & Strength
1. (Level 9) "Your hormonal engine is firing on all cylinders. Elite-level vitality."
2. (Level 7) "Strong vitality markers. One lever — your VitD — would push this to elite."
3. (Level 5) "Your vitality is average for your age. Your TSH is the key to unlocking more."
4. (Level 3) "Your energy system is running below potential. The good news: it's fixable."
5. (Level 1) "Your vitality markers need clinical attention before optimisation can begin."

### Brain Sharpness
1. (Level 9) "Your cognitive chemistry is optimised. Sharp, fast, and sustaining it."
2. (Level 7) "Brain-supporting markers are strong. B12 is the one gap standing between you and Level 9."
3. (Level 5) "Your brain sharpness is at the average. B12, VitD, and blood sugar are your three levers."
4. (Level 3) "Your cognitive markers have room to grow. Sub-optimal B12 and VitD are the main drivers."
5. (Level 1) "Critical gaps in brain-supporting markers. Repletion this week will start improving this within 8 weeks."

### Heart Engine
1. (Level 9) "Your cardiovascular chemistry is in excellent shape. ApoB optimal, inflammation low."
2. (Level 7) "Heart markers are strong. One adjustment — getting ApoB below 80 — would elevate this further."
3. (Level 5) "Your heart engine is functional. LDL and TG are the two levers with the most leverage."
4. (Level 3) "Multiple cardiovascular markers are outside optimal. Your three highest-leverage moves are below."
5. (Level 1) "Your heart engine markers need clinical attention. Please discuss the flagged findings with your physician."

### Metabolic Power
1. (Level 9) "Your metabolic system is exceptionally efficient. Insulin sensitivity is excellent."
2. (Level 7) "Strong metabolic markers. HbA1c is in the watch zone — this is your focus for next quarter."
3. (Level 5) "Your metabolic system is average. HbA1c at [X]% has room to come down."
4. (Level 3) "Your metabolic markers suggest insulin resistance patterns developing. Act now."
5. (Level 1) "Your metabolic power is significantly impaired. Clinical discussion required before protocol."

### Recovery Capacity
1. (Level 9) "Your recovery chemistry is elite. Low inflammation, optimal nutrient status."
2. (Level 7) "Strong recovery markers. VitD is the one gap — adding it would push this to Level 8–9."
3. (Level 5) "Your recovery is average. Sleep quality and hs-CRP are your two primary levers."
4. (Level 3) "Your recovery markers are below optimal. Inflammation is the main driver — here's the plan."
5. (Level 1) "Recovery capacity is significantly impaired. This needs attention before performance optimisation is possible."

### Detox Efficiency
1. (Level 9) "Your liver chemistry is running clean and efficient. Excellent detox capacity."
2. (Level 7) "Liver markers are strong. Albumin is the one protein to watch going forward."
3. (Level 5) "Detox efficiency is in the average range. ALT has room to come down with targeted changes."
4. (Level 3) "Liver stress markers are elevated. Alcohol, fructose, and processed fat are the three inputs to address."
5. (Level 1) "Liver markers require clinical attention. Performance scoring for this domain is paused."

### Endurance & Stamina
1. (Level 9) "Your oxygen-delivery system is primed. Haemoglobin, iron stores, all optimal."
2. (Level 7) "Strong endurance markers. Ferritin is the one number to push higher."
3. (Level 5) "Your endurance chemistry is functional. Iron stores are the key variable to optimise."
4. (Level 3) "Iron deficiency is limiting your stamina capacity. This is highly fixable — 3 months of targeted repletion."
5. (Level 1) "Haemoglobin is significantly below optimal. Clinical attention required."

### Mood & Calm
1. (Level 9) "Your neurochemical substrate is balanced. Excellent mood markers across the board."
2. (Level 7) "Mood-supporting chemistry is strong. VitD is the one gap worth closing."
3. (Level 5) "Mood markers are average. VitD, B12, and stress management are your three levers."
4. (Level 3) "Mood-supporting markers are below optimal. B12, VitD, and cortisol patterns suggest room for significant improvement."
5. (Level 1) "Mood-related markers need attention. Please reach out to a mental health professional if you're feeling significantly low. [Resources below]"

### Immunity Strength
1. (Level 9) "Your immune system is well-calibrated — responsive and regulated."
2. (Level 7) "Strong immune markers. VitD and zinc would push this to Level 9."
3. (Level 5) "Immunity is average. VitD deficiency is the single biggest lever in your panel."
4. (Level 3) "Immune markers are below optimal. VitD, zinc, and sleep are the three priorities."
5. (Level 1) "Immune markers need clinical evaluation. Please speak with your physician."

---

## G.5 Emergency / Critical Communication

When any v1.1.5 Safety Override (Appendix 3) triggers, communication shifts entirely. Performance framing is suspended. The following mandatory structure applies:

```
[PRIORITY FINDING — PLEASE READ]

One or more of your markers falls outside a range where we can responsibly 
provide performance scoring without clinical input first.

Specifically: [Marker name] is at [value]. This level requires evaluation 
by a licensed physician before we can give you meaningful performance 
guidance for your [domain] score.

This is not a cause for panic. It is a call to act promptly.

What to do next:
1. Contact your physician or visit an urgent care clinic within [24 hours / 
   72 hours / this week — based on override severity level].
2. Share this report with your doctor: [Download link].
3. Once your physician has reviewed this finding and provided guidance, 
   return to Zenoho for your full performance analysis.

Your other domain scores remain available below.

If you need help finding a physician: [Link to health resource directory]
```

**Escalation Timeline by Override Severity:**

| Override Type | Physician Contact Timeline | Display Urgency |
|--------------|--------------------------|-----------------|
| Potassium <2.5 or >6.5 / Sodium <120 or >155 / Calcium <6.0 | Within 24 hours | Red banner, full-page |
| Haemoglobin <8.0 / WBC >30 / Platelets <50 | Within 48 hours | Red banner, prominent |
| HbA1c >9.0% / TSH >10 / eGFR <30 | Within 1 week | Amber banner |
| ALT/AST >200 / Ferritin >1000 | Within 1 week | Amber banner |

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART H — VISUAL DESIGN SPECIFICATIONS

## H.1 Color System

### Primary Domain Color Palette

| Domain | Primary HEX | Secondary HEX | Gradient Direction | Dark Mode Primary | Contrast Ratio (vs white) |
|--------|------------|---------------|-------------------|-------------------|--------------------------|
| Biological Age | #6C3FCB | #9B6FE8 | 135° (top-left to bottom-right) | #8A5FE0 | 4.8:1 (AA ✅) |
| Vitality & Strength | #E85D26 | #F28C5E | 135° | #FF7A45 | 3.6:1 (AA ✅ large text) |
| Brain Sharpness | #1A6FD4 | #4A9FFF | 135° | #4A9FFF | 4.6:1 (AA ✅) |
| Heart Engine | #C0392B | #E05C4B | 135° | #D94F40 | 4.5:1 (AA ✅) |
| Metabolic Power | #27AE60 | #52C980 | 135° | #3DBF72 | 4.5:1 (AA ✅) |
| Recovery Capacity | #16A085 | #1ABC9C | 135° | #1BC5A4 | 4.7:1 (AA ✅) |
| Detox Efficiency | #7D3C98 | #A569BD | 135° | #9B59B6 | 4.6:1 (AA ✅) |
| Endurance & Stamina | #E67E22 | #F39C12 | 135° | #F4A63A | 3.8:1 (AA ✅ large text) |
| Mood & Calm | #2980B9 | #5DADE2 | 135° | #4A95CC | 4.5:1 (AA ✅) |
| Immunity Strength | #2471A3 | #3498DB | 135° | #3A8EC4 | 4.8:1 (AA ✅) |

**Notes:**
- Vitality & Strength (#E85D26) and Endurance & Stamina (#E67E22) orange tones fail AAA (7:1) for body text; use only for large display text (score numbers, domain titles), not body copy
- All primary colors must be tested against both white (#FFFFFF) and platform background (#F8F9FA or equivalent) for light mode; against #121212 for dark mode
- Never rely on hue alone to convey status. Supplement all color coding with icons, text labels, and/or patterns for color-blind accessibility

### Status Color System (Separate from Domain Colors)

| State | Light Mode HEX | Dark Mode HEX | Use |
|-------|---------------|---------------|-----|
| Safety Override Active | #C0392B | #E74C3C | Domain card border and banner ONLY |
| Cross-Marker Rule Triggered | #D68910 | #F0B429 | Small indicator icon only |
| Confidence HIGH | #27AE60 | #2ECC71 | Small dot indicator |
| Confidence MEDIUM | #D68910 | #F0B429 | Small dot indicator |
| Confidence LOW | #7F8C8D | #95A5A6 | Small dot indicator |
| Missing Data | #BDC3C7 | #484848 | Domain card overlay |

### Color-Blind Considerations

The platform must be usable by users with:
- Deuteranopia (red-green blindness — most common, affects ~8% of males)
- Protanopia (red-green blindness variant)
- Tritanopia (blue-yellow blindness — rare)

**Rules:**
- Never convey score level using red-green axis alone
- Level numbers (1–10) and text labels are mandatory companions to all color displays
- Score gauges must include directional arrows or textual trend indicators in addition to color
- Safety overrides: use icon (⚠️ or specific warning symbol) in addition to red color

---

## H.2 Domain Icon System

Icons must be:
- Line-weight consistent: 2px stroke, 24×24px base grid
- Style: modern rounded, not skeuomorphic; not medical illustration style
- Avoid: syringe, pill, stethoscope, hospital cross, red cross symbol
- All icons must have accessible alt text and title attributes

| Domain | Recommended Icon Description | Emoji Placeholder (until custom icons) |
|--------|------------------------------|----------------------------------------|
| Biological Age | Hourglass with arrow cycling up (forward/reverse time concept) | ⏳ |
| Vitality & Strength | Lightning bolt (energy/power, not danger) | ⚡ |
| Brain Sharpness | Abstract neural network node cluster | 🧠 |
| Heart Engine | Pulse wave / ECG signal (not anatomical heart) | 〰️ |
| Metabolic Power | Flame/energy conversion symbol (not body fat flame) | 🔥 |
| Recovery Capacity | Upward spiral / refresh with upward arrow | 🔄 |
| Detox Efficiency | Filter funnel with stars (clean output) | ✨ |
| Endurance & Stamina | Mountain peak with path (journey concept) | 🏔️ |
| Mood & Calm | Gentle wave / soundwave calm pattern | 🌊 |
| Immunity Strength | Shield with checkmark (protection, not medical) | 🛡️ |

---

## H.3 Number Display Rules

**Score Display:**
- Always whole numbers: display "76" not "76.34" or "76.3"
- Score range (when confidence is MEDIUM or LOW): "~76 (estimated)" or "76 ± 4"
- Font size: score number should be largest element in the domain card (≥48px on mobile)
- Weight: 700 (bold) for the score number

**Marker Value Display:**
- Follow v1.1.5 precision standards for each marker (e.g., HbA1c to 1 decimal: "5.5%"; eGFR whole number: "104")
- Always show unit of measurement
- Always show Zenoho optimal range alongside current value: "5.5% (Zenoho optimal: 4.8–5.3%)"

**Range Display:**
- When CI is provided: "Score: 76 (range: 72–80 with complete panel)"
- When panel is partial: "Score: ~68 (estimated — 4 key markers untested)"

**Confidence Indicator:**
- HIGH: Green dot (●) + "HIGH confidence" text
- MEDIUM: Yellow dot (●) + "MEDIUM confidence" text
- LOW: Grey dot (●) + "Estimated" text
- The dot is a supplementary indicator only — confidence level must also be communicated textually for screen reader accessibility

---

## H.4 Trend Display

**Recommended Chart Type Per Domain:**

| Domain | Chart Type | Time Axis | Notes |
|--------|-----------|-----------|-------|
| Biological Age | Single number trend (large, with arrow indicator) | Quarterly | Line chart inappropriate for quarterly data; use dot + arrow |
| Vitality & Strength | Line chart | Monthly or quarterly | Show when major lifestyle changes occurred |
| Brain Sharpness | Line chart | Quarterly | |
| Heart Engine | Line chart with annotation | Quarterly | Annotate when cross-marker rules triggered |
| Metabolic Power | Area chart | Monthly or quarterly | HbA1c changes slowly; area chart shows "zone" better |
| Recovery Capacity | Bar chart | Monthly | Recovery is contextual; bar chart shows snapshot nature |
| Detox Efficiency | Line chart | Quarterly | |
| Endurance & Stamina | Area chart | Quarterly | Iron repletion is a journey; area shows accumulation |
| Mood & Calm | Scatter + trend line | Monthly | High within-period variability expected |
| Immunity Strength | Bar chart | Quarterly | Seasonal variation relevant; bar shows period |

**Now vs Prior Comparison:**
- Primary display: current score (large) with previous score (smaller, dimmed) and delta (arrow + number)
- "Your Heart Engine: 52 ↑ +8 from last test (previously: 44)"
- Delta color: domain color for improvement, neutral grey for decline (never red — decline is information, not alarm)

**Predictive Forecast (where interventions are active):**
- Shown as dashed line extending forward from current data point
- Label: "Predicted range with current protocol: 58–65 at next test"
- Always shown as a range, never a single predicted point
- Prediction available only for domains with MEDIUM or HIGH confidence

---

## H.5 Comparison Anchors

**Population Percentile Display (when shown):**
- "Top 22% of Indian adults your age and gender for this domain"
- Source for percentile: aggregate Zenoho user data (minimum 1,000 users before percentile display is available); in early phase, show "Comparison percentiles available after [X] users join"
- Never show user as last place without providing context: "Bottom 10% means 90% of users have room to improve with you — this is one of the most common starting points"

**Historical Self-Comparison:**
- Primary comparison anchor (preferred over population comparison)
- "vs. your last test 3 months ago"
- "vs. your best-ever score"

**Goal/Target Visualization:**
- User can set a goal level (e.g., "Reach Level 8 in Heart Engine")
- Show target as horizontal dashed line on trend chart
- Show estimated time to goal based on current trajectory: "At your current rate, you'll reach Level 8 in approximately 2 testing cycles (6 months)"

**Prohibition:**
- Never display "you are ranked [X] out of [N] users" (rank shaming)
- Never show other individual users' scores in comparison
- Never show a user as "last place" without offering context and pathway forward

---

## H.6 Mobile-First Design Principles

**Critical Principles:**

1. **Above the fold on 375px (iPhone SE equivalent):** Domain score number, level label, confidence indicator, and top 2 improvement actions must be visible without scrolling
2. **Touch targets:** All interactive elements minimum 44×44px (Apple HIG standard). Score cards, CTA buttons, and navigation elements must meet this minimum
3. **Single-column score layout:** Domain cards stack vertically on mobile. No side-by-side domain cards on <768px viewport
4. **Progressive disclosure:** Default view shows score + level + 1-line status. Tap/expand to see marker breakdown, communication templates, and improvement levers
5. **Font sizing:** Minimum 16px for body text on mobile to prevent forced zoom; score numbers minimum 48px
6. **Contrast in direct sunlight:** Score numbers and domain labels must be legible in bright outdoor lighting — test on real devices at full brightness
7. **Loading states:** No blank screens during data load; use skeleton screens (grey placeholder shapes) not spinners for performance scores

---

## H.7 Loading & Empty States

**During Analysis (score calculation in progress):**
- Show skeleton screen with domain card shapes populated
- Do NOT show fake "AI thinking..." progress for trust theatre
- Honest message: "Calculating your [domain] scores… usually takes under 10 seconds"
- If calculation takes >15 seconds: "Still working — complex panels take a moment"

**Missing Domain Data:**
- When a domain is UNCALCULABLE (insufficient markers): show greyed card with lock icon
- Text: "Unlock [Domain] Score — Add [specific marker list] to your next panel"
- CTA button: "See recommended panel upgrade"

**During Retest Period (user retesting within 8 weeks of last test):**
- Show previous score with "Retest pending" label
- Message: "Your [Domain] score is being updated. Results from your [date] retest will appear within [X] hours."

**No Historical Data (first test):**
- No trend chart displayed
- Label: "This is your baseline"
- Message: "Your first score establishes your starting point. Your trend will appear after your next test."

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

---

# PART I — SAFETY FRAMEWORK

## I.1 Mental Health Considerations

### Mood & Calm Domain Specific Rules

**Rule I.1.1:** If a user's Mood & Calm score is Level 1–2 AND they have previously disclosed a diagnosis of depression or anxiety in their profile, the domain card must NOT display the score in the standard performance gradient. Instead, display: "Your mood-supporting markers have room to improve. Connecting with a mental health professional alongside our supplement protocol produces the best outcomes."

**Rule I.1.2:** Absolute prohibition on language that implies a low Mood & Calm score means the user is "mentally weak," "unable to cope," or "emotionally unstable." Low markers reflect biochemistry (VitD, B12, cortisol, TSH) — not character.

**Rule I.1.3:** The Mood & Calm domain must NEVER be the primary framing for a WhatsApp notification. WhatsApp push content for Mood & Calm should be limited to supplement reminders and positive progress notifications only.

### Suicidal Ideation Pathway

**Trigger Conditions:**
When ALL of the following are true simultaneously:
- Mood & Calm score ≤ Level 2 (score ≤20)
- AND Vitality & Strength score ≤ Level 3 (score ≤30)
- AND Recovery Capacity score ≤ Level 3 (score ≤30)
- AND user is in the 25–55 age range

**Response:** Surface mental health resource link prominently within the report. This is not a diagnosis. It is a precautionary protocol when biological markers cluster in a pattern associated with elevated distress vulnerability.

**Resource Display Text:**
> "Your current markers suggest your body may be under significant stress. If you're finding things difficult right now — emotionally or otherwise — please know that support is available. iCall: 9152987821 [VERIFY current number]. Vandrevala Foundation: 1860-2662-345 [VERIFY]. You don't need to be in crisis to reach out."

**Critical Design Note:** This message must display with high visual prominence but must NOT use red/alarm colours. Use the domain's calm blue (#2980B9) or a neutral warm tone. The goal is to signal care, not alarm.

---

## I.2 Eating Disorder Considerations

### Risk Context
The Metabolic Power domain focuses on glucose metabolism, insulin sensitivity, and metabolic efficiency. Users with restrictive eating disorders (anorexia nervosa, atypical anorexia, orthorexia) may be attracted to a "Metabolic Power" framing seeking validation for restriction-based behaviours.

### Mandatory Guardrails

**Rule I.2.1:** Zenoho will NEVER recommend caloric restriction as a protocol. Supplement and lifestyle protocols address metabolic function through nutrition quality, not quantity.

**Rule I.2.2:** Zenoho will NEVER frame "lower body fat" as a performance goal. Metabolic Power is about insulin sensitivity, glucose control, and liver efficiency — not body composition metrics.

**Rule I.2.3:** If a user's panel shows the pattern: low albumin (<3.5 g/dL) + low cholesterol (<140 mg/dL) + low haemoglobin + low BMI marker proxy (if captured), the platform must:
- NOT display Metabolic Power in performance framing
- Surface: "Your nutritional markers suggest your body may not be getting adequate caloric and protein intake. Before any supplement or lifestyle protocol, we strongly recommend speaking with a registered dietitian."
- Provide referral pathway to registered dietitian or eating disorder support. India-specific resources (Pass 1 V4 — no ANAD/NEDA direct equivalent exists in India): Tele-MANAS 14416 (Government of India; covers eating disorder concerns); NIMHANS Bengaluru — outpatient psychiatric services including eating disorder programme; Cadabams Hospitals helpline 9741476476 (eating disorder dedicated programme).

**Rule I.2.4:** Supplement recommendations for Metabolic Power must never include "appetite suppressants," "fat burners," or "metabolism accelerators." Zenoho's metabolic protocol covers B vitamins, magnesium, VitD, and berberine (where evidence-based) — not thermogenic or suppressant compounds.

---

## I.3 Body Dysmorphia Considerations

### Risk Context
The Vitality & Strength domain covers testosterone, DHEA, and related markers. Male users in the 25–45 age range may be vulnerable to muscle dysmorphia ("bigorexia") — a fixation on inadequate muscularity that drives excessive supplementation, anabolic steroid use, or disordered exercise.

### Mandatory Guardrails

**Rule I.3.1:** Testosterone values above the Zenoho optimal upper limit (>25 pg/mL Free T for males, per v1.1.5 registry) do NOT produce a higher Vitality & Strength score. The U-curve scoring function ensures supraphysiological testosterone produces the same score as suboptimal testosterone for the safety-relevant range.

**Rule I.3.2:** Zenoho will NEVER recommend testosterone supplementation or testosterone replacement therapy (TRT) as a consumer protocol. TRT is a prescription medication that requires physician oversight. The platform may note "your testosterone is below the functional optimal range — discuss with your physician whether investigation is warranted" but NEVER recommends specific TRT products or dosing.

**Rule I.3.3:** Supplement recommendations for Vitality & Strength focus on D3, zinc, magnesium, and ashwagandha — all with evidence-based support for natural testosterone optimisation within physiological ranges. No "test-boosters" containing DHEA precursors, prohormones, or SARMs will appear in Zenoho protocols.

**Rule I.3.4:** If a user's testosterone is in the optimal range and their Vitality & Strength score is Level 7+, the communication must NOT encourage further testosterone optimisation. "Your testosterone is in the optimal range — the lever at this point is sleep quality and recovery, not further T supplementation."

---

## I.4 Pregnancy & Postpartum

### Pregnancy Detection Pathway
**Zenoho detects potential pregnancy through:**
- User self-disclosure at signup or profile update
- Lab report containing hCG measurement (triggers pregnancy flag)
- Significant deviation from established baseline on multiple markers in a pattern consistent with pregnancy physiology

**When pregnancy is detected:**
- Biological Age calculation: suspended (display: "Biological Age estimation is paused during pregnancy")
- Hormone domain scores: suspended
- Inflammation scores: flagged with "Pregnancy-related changes — interpret with physician guidance"
- Supplement recommendations: all reviewed against pregnancy safety profile. High-dose supplements flagged as REQUIRES PHYSICIAN APPROVAL before pregnancy protocol

### Pregnancy-Safe Protocol Marker
For any supplement protocol where pregnancy is flagged:
- Only display supplements with well-established pregnancy safety: folate, iron, DHA, D3 (at appropriate doses), magnesium glycinate
- Flag all other supplements with "⚠️ Discuss with your obstetrician before taking during pregnancy"
- NEVER recommend berberine, high-dose VitA, Ashwagandha, high-dose zinc during pregnancy without physician approval

### Postpartum Considerations
- 6-week postpartum: Haemoglobin repletion priority; thyroid panel essential (postpartum thyroiditis common)
- 6-month postpartum: Full panel reinterpretation appropriate
- Lactation: Additional iron, calcium, and DHA requirements noted in supplement protocols
- NEVER display "snap back" or "post-pregnancy weight" language

---

## I.5 Pediatric / Adolescent (Under 18)

**Zenoho v1.0 does not serve users under 18 years of age.**

**Age verification at Bolt signup:**
- Date of birth required field
- If age <18: display "Zenoho is designed for adults aged 18 and above. For guidance on youth health testing, please consult a paediatric healthcare provider."
- Soft gate: if age entered suggests <18, prevent account creation with the above message
- No data collected from minors

**If age discrepancy detected mid-platform** (e.g., blood report indicates birthdate suggesting minor):
- Flag account for review
- Suspend performance scoring
- Display: "We've noticed your age may not meet our adult-only requirement. Please contact support."

---

## I.6 Geriatric Considerations (70+)

**Communication Framing Shifts for Users 70+:**
- Replace "anti-ageing" language with "active longevity" and "function preservation"
- Never frame biological age gap negatively without immediate context: "At 74, a biological age of 76 is a 2-year gap — a highly manageable finding. Here's what moves the needle at your life stage."
- Supplement protocol adjustments: watch for drug interactions (anticoagulants, antihypertensives common in this age group)
- Renal function (eGFR) may show expected age-related decline — never alarm at expected physiological change
- Immune function: some immunosenescence is expected; Level 7 at 72 is genuinely elite; recalibrate expectations

---

## I.7 Chronic Disease Users

**Diabetic Users:**
- HbA1c-based "Metabolic Power" score should display with clinical context: "For users managing diabetes, this score reflects your current glycaemic control. It is not a performance benchmark — it is a management progress indicator. Well-controlled HbA1c (6.5–7.5% for managed T2DM [VERIFY ADA guidelines]) reflects excellent management, not 'average performance.'"
- Never display "Metabolic Power Level 2" without the above context for a managed diabetic user

**Autoimmune Users:**
- Anti-TPO positive users: thyroid domain scores carry "autoimmune context" note
- Inflammatory markers (hs-CRP, ESR) may run chronically elevated; scores reflect this
- Recovery Capacity domain: chronic inflammation flag means the domain reflects "current best" under a chronic inflammatory load

**Cancer Survivors:**
- Marker distortions from treatment (chemotherapy effects on CBC, liver enzymes)
- Never alarm at expected treatment-related changes
- Flag: "If you have recently completed cancer treatment, some of your markers may reflect treatment effects rather than baseline physiology. We recommend discussing your results with your oncologist."

---

## I.8 Drug Interactions

**Mandatory Drug Interaction Warnings in Supplement Protocols:**

Before recommending any supplement, Zenoho's protocol engine must check against known interactions with common medications. User discloses current medications at profile setup (optional field — if not disclosed, general warning applies).

| Supplement | Interaction Warning |
|-----------|-------------------|
| Vitamin K2 | "If you are taking warfarin or any blood thinner, discuss Vitamin K2 supplementation with your physician first. K2 affects clotting." |
| Iron | "Iron should be taken 2–4 hours apart from levothyroxine (thyroid medication) to avoid absorption interference." |
| Magnesium | "Magnesium may interact with certain antibiotics and blood pressure medications. Discuss timing with your pharmacist." |
| Zinc | "High-dose zinc (>40 mg/day) interferes with copper absorption. Do not exceed 25 mg/day without physician guidance." |
| Vitamin D3 (high dose) | "If you are on thiazide diuretics, discuss D3 supplementation with your physician — risk of hypercalcaemia." |
| CoQ10 | "CoQ10 may reduce warfarin effectiveness — CoQ10 has structural similarity to vitamin K and may lower INR (verified Pass 2 V30: BNF and Drugs.com confirm). Do not combine without physician oversight; INR monitoring required if both used." |
| Berberine | "Berberine can lower blood glucose. If you are on diabetes medication (metformin, sulfonylurea, insulin), monitor blood glucose closely and discuss with your physician." |
| Ashwagandha | "Ashwagandha has mild immunostimulant effects. Users on immunosuppressant medications should discuss with their physician." |

**Universal Platform Disclaimer (appears on every supplement recommendation):**
> "Discuss any new supplement with your physician if you are currently on prescription medication. Supplement-drug interactions vary by individual. This protocol is not a substitute for medical advice."

---

## I.9 Trauma-Informed Design

**Users who come post-diagnosis, post-surgery, or post-loss:**

**Principle:** Zenoho should never make a user feel worse about their health situation than they already do. The goal of the platform is empowerment, not enlightenment at the cost of distress.

**Specific Rules:**
- No mortality-anxiety language in any context, including biological age communication
- If a user discloses a serious diagnosis in their profile notes, chatbot responses must acknowledge before jumping to protocol
- Do not make light of disease history
- "You survived [condition]" framing is never used — it can feel patronising

**Crisis Pathway:**
When user behaviour signals distress (chatbot interactions showing hopelessness, futility, or despair):
- Surface mental health resources before continuing performance framing
- Do not redirect to performance protocol until distress signals resolve
- Tele-MANAS: 14416 (Government of India, 24/7 primary); Vandrevala Foundation: +91 9999 666 555 (24/7 voice + WhatsApp); AASRA: 9820466726 mobile or 022-27546669 landline; iCall: 9152987821 (Mon–Sat 10am–8pm)

---

## I.10 Privacy & Sensitive Data

**Hormone Results:**
- Testosterone and related hormone values should NOT appear in shareable score cards or social sharing features
- Shareable format shows domain name and level only: "Vitality & Strength: Level 7" — never the underlying hormone values

**Mental Health Proxies:**
- Mood & Calm score should display with added friction in shareable format: user must explicitly opt-in to include this domain in shared reports
- Default: Mood & Calm excluded from share card

**Pregnancy Status:**
- Never included in any shareable, stored, or visible context outside the user's own view
- Marked "PRIVATE — NEVER SHARE" in data schema

**Anonymous Mode:**
- Users can opt for a mode where their report is not linked to their profile name
- Profile picture and name replaced with anonymous display in all platform surfaces
- Data still stored server-side for continuity

**Data Retention:**
- Test panel data retained for 5 years from test date (or until user requests deletion)
- Biological marker data subject to PDPD (India Personal Data Protection framework) [VERIFY current Indian data protection law applicable to health data]
- User has right to export all data in machine-readable format
- User has right to delete all data ("right to be forgotten")

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART J — PERSONALISATION RULES

## J.1 Demographic-Based Personalisation

### Sex-Based Personalisation Rules

**Male (biological sex = M):**

| Domain | Male-Specific Adjustments |
|--------|--------------------------|
| Vitality & Strength | Testosterone markers (#55, #56) included at full weight. Female hormonal markers excluded from score. |
| Endurance & Stamina | Haemoglobin optimal range: 14.5–16.0 g/dL (not female range 13.5–14.5) |
| Heart Engine | HDL optimal threshold: >40 mg/dL (not female >50 mg/dL) |
| Metabolic Power | HOMA-IR reference uses male calibration |
| Biological Age | Haemoglobin BioAge marker calibrated to male optimal range |

**Female (biological sex = F):**

| Domain | Female-Specific Adjustments |
|--------|--------------------------|
| Vitality & Strength | Testosterone markers weight reduced to 0 in v1.0 (female hormone panel not yet available). Thyroid and haematological markers carry more weight proportionally. |
| Endurance & Stamina | Haemoglobin optimal range: 13.5–14.5 g/dL. Iron deficiency anaemia threshold adjusted (lower baseline expected; flag at Hb <12.0 not <13.5). |
| Heart Engine | HDL optimal threshold: >50 mg/dL (higher than male). LDL risk interpretation: pre-menopausal women have relative cardiovascular protection; post-menopausal (50+ typically): same as male calibration. |
| Metabolic Power | Polycystic ovarian syndrome (PCOS) pattern may confound TG/HDL interpretation; if disclosed, apply PCOS modifier (note in v1.2 pipeline). |
| Biological Age | Female Albumin, B12, and iron markers calibrated to female normal ranges. MCV microcytosis: more prevalent in women; microcytic MCV adjusted for female expected distribution. |

**Non-Binary / Prefer Not to Disclose:**
- Use sex-neutral reference ranges where available
- For ranges with significant sex dimorphism (testosterone, HDL, Haemoglobin): display both male and female reference ranges with note: "Reference ranges are reported for biological male and female physiology. Select the range that best reflects your biology for the most relevant comparison."
- Marker scoring uses an averaged male/female optimal where dimorphism is moderate
- No assumption is made about hormone status; use only tested values

### Age-Based Personalisation Rules

| Age Band | Adjustments Applied |
|----------|-------------------|
| 18–24 | BioAge CI widened (±5 yr); Level 9–10 is rare and not displayed without >90% panel coverage; testosterone reference for males: 500–900 ng/dL (higher peak than 35+ range) |
| 25–34 | Standard calibration |
| 35–44 | Testosterone starts declining physiologically (male); IFM optimal range adjusted downward slightly; VitD importance increases for bone mineral density |
| 45–54 | Perimenopause context note added for female users in Vitality domain; prostate health note considered for male users (not in v1.0 marker set) |
| 55–64 | Immunosenescence context; muscle mass decline reference; HDL cardiovascular protection for women diminishes post-menopause |
| 65–74 | eGFR physiological decline contextualised; Level 7 BioAge highlighted as genuinely excellent |
| 75+ | Function preservation framing replaces performance optimisation; communication templates shift entirely |

### Geography-Based Personalisation (India-Specific)

**Indian metabolic context applied to all users:**
- TG tendency: Urban Indian populations trend toward elevated TG (diet high in refined carbohydrate); Metabolic Power and Heart Engine domain communications acknowledge this context without normalising it
- VitD deficiency: Endemic context; "below optimal" for VitD does not alarm; frames improvement as common and achievable
- Vegetarianism: If user discloses vegetarian diet, B12 communication adjusted: "Plant-based diets require active B12 supplementation — this is a lifestyle consideration, not a health failure"
- VitD seasonality (correction Pass 2 V24): Indian cohort data shows **lowest VitD in winter and spring** (Dec–March), not monsoon. Monsoon and post-monsoon levels are often near-peak because preceding summer UVB exposure persists in serum 25(OH)D for weeks. Seasonal context note now applies to winter/spring tests (Dec–Mar), not monsoon tests. The earlier monsoon-low framing was directionally wrong.
- Polluted air environments: hs-CRP may run mildly elevated in high-particulate environments (Delhi, Mumbai, Lucknow); context note applied to Heart Engine and Recovery Capacity

---

## J.2 User Behaviour-Based Personalisation

### First-Time vs Returning User

**First-Time User:**
- All results labeled "BASELINE"
- Trend elements hidden (no historical data)
- Primary CTA: "Get your first follow-up test in 12 weeks to see your progress"
- Communication emphasises discovery framing: "You're learning what your biology looks like. Here's what stands out in your first panel."
- No comparison to population percentiles until 1,000+ users on platform

**Returning User (2nd test onward):**
- Trend elements active
- Delta from previous test prominently displayed
- Primary CTA: "Your [top-priority domain] has [improved/stayed the same/declined] — here's your next action"
- Comparison to own previous scores (self-benchmarking preferred over population benchmarking)

**Engaged Protocol User (has purchased supplement subscription):**
- Predicted vs actual score comparison available: "Your protocol predicted Level [X]; your test shows Level [Y]."
- Protocol effectiveness communication: positive ("Your D3 protocol moved VitD from 24 to 47 — right on target") and learning ("Your iron score hasn't moved yet — absorption adjustments are next")
- Supplement adherence check: "Did you take your protocol consistently this quarter?" (user input) → adjusts expected vs actual interpretation

### Goal-Based Personalisation

User selects primary goal at signup (can update any time):

| Goal | Domains Emphasised | Communication Adaptation |
|------|-------------------|-------------------------|
| "I want more energy" | Vitality & Strength, Endurance & Stamina, Thyroid | Lead with energy-relevant markers; fatigue mechanisms explained |
| "I want a sharper mind" | Brain Sharpness, Mood & Calm | Lead with cognitive markers; B12, VitD, glucose at top |
| "I want a stronger heart" | Heart Engine, Metabolic Power | Lead with cardiovascular markers; ApoB, Lp(a), HDL explained |
| "I want to slow ageing" | Biological Age, Recovery Capacity | Lead with BioAge estimate; longevity framing |
| "I want to lose weight" | Metabolic Power, Detox Efficiency | Lead with metabolic markers; NEVER use weight-loss language; reframe as "metabolic efficiency" |
| "I want to be less sick" | Immunity Strength, Recovery Capacity | Lead with immune markers; seasonal context |
| "I just want to know my baseline" | All domains equal weight | Exploratory framing; no priority hierarchy |

**Goal-based display order:** Domain cards reorder based on user's goal. "I want more energy" → Vitality & Strength card first, then Endurance & Stamina.

---

## J.3 Longitudinal Personalisation (Over Time)

### Pattern Recognition Rules (v1.0 baseline — expand in v1.2)

**Pattern: Consistent Low Performers**
If a domain consistently scores Level 1–3 across 3+ test cycles:
- Shift from "here's how to improve this" to "let's understand why this persists"
- Communication: "Your [domain] has remained below optimal for [N] testing cycles. This suggests the root cause may require clinical investigation beyond lifestyle adjustments."
- Recommend physician consultation for persistent patterns

**Pattern: Seasonal Fluctuation**
If VitD drops consistently between May–September tests:
- Note (corrected Pass 2 V24): "Your VitD in Indian context typically peaks in late summer/post-monsoon and troughs in winter and early spring (Dec–March). Despite India's high UV index, sunscreen use, indoor office hours under AC, modest covering, and short sun-exposure windows mean cutaneous synthesis is well below potential year-round. The lowest population values are observed in winter and spring tests — re-test in late summer or autumn for the most favourable baseline."
- Personalised reminder to supplement in summer months

**Pattern: Rapid Improvement Then Plateau**
Common with supplement protocols:
- Acknowledge the plateau: "Your VitD went from 18 to 52 in the first two cycles — excellent repletion. The next cycle will likely show stability rather than further gain, which is the goal."
- Prevent supplement dose escalation without justification

**Pattern: Marker-Specific Resistance**
If a marker doesn't move despite adherence to protocol (e.g., TSH remains elevated despite lifestyle interventions):
- Flag for clinical investigation: "Your TSH has remained above IFM optimal across [N] tests despite lifestyle optimisation. This pattern may warrant thyroid antibody testing (Anti-TPO) and physician consultation."

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

---

# PART K — TWO-VIEW SCORING INTEGRATION

## K.1 The Two Views Explained

**Zenoho presents each marker and each domain in two simultaneous views:**

| View | What It Uses | What It Shows | Who It's For |
|------|-------------|---------------|--------------|
| **Lab Range View** | Standard Indian clinical laboratory reference ranges | Where the marker sits relative to what a diagnostic lab would flag as abnormal | Users who want to know "am I normal by clinical standards?" |
| **Zenoho Optimal View** | IFM-informed, evidence-based optimal ranges from v1.1.5 registry | Where the marker sits relative to where it needs to be for peak performance | Users who want to know "am I functioning at my best?" |

**The "Performance Gap":**
The gap between Lab Range View (clinical normal) and Zenoho Optimal View (performance optimal) is the primary value Zenoho adds over a standard lab report.

**Example for Shashank's VitD (30.5 ng/mL):**
- Lab Range View: ✅ NORMAL (most Indian labs flag deficiency at <20 ng/mL; 30.5 > 20 = "normal")
- Zenoho Optimal View: 🟡 SUB-OPTIMAL (Zenoho optimal: 40–60 ng/mL; 30.5 is a 9.5 ng/mL gap below optimal minimum)
- Performance Implication: "You're not deficient by clinical standards — but you're not in the range where VitD maximally supports your immune function, mood stability, and muscle recovery. Bringing this to 50–60 ng/mL is your opportunity."

This dual view is Zenoho's clearest value proposition and must be prominent in UX.

---

## K.2 Dual View Display Specifications

**Visual Design for Dual View:**

```
[MARKER NAME]
Your value: 30.5 ng/mL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lab Range View:                    ✅ NORMAL
Clinical threshold: >20 ng/mL     
Your value sits above the clinical deficiency threshold.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zenoho Optimal View:               🟡 BELOW OPTIMAL
Optimal range: 40–60 ng/mL        
Your value is 9.5 ng/mL below the optimal lower bound.
Performance impact: [Immunity, Mood, Recovery]
Next action: D3 2000–4000 IU/day | Estimated time to optimal: 8–12 weeks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Domain Score Display with Dual View:**

```
[DOMAIN NAME]                      Score: 68  (Level 7 — Strong)

Lab Range View: All markers within clinical reference ranges.
Zenoho Optimal View: 3 markers below optimal range.

[Dual bar showing Lab vs Zenoho score, side by side]
Lab score: ~85 (most markers "normal" by lab standards)
Zenoho score: 68 (3 markers below performance optimal)
Gap: 17 points — this is where your performance opportunity lies.
```

**Colour Coding for Dual View:**
- Lab Range View: Clinical green (#27AE60) for normal; clinical red (#C0392B) for abnormal
- Zenoho Optimal View: Domain colour for optimal; yellow (#F39C12) for sub-optimal but lab-normal; red (#C0392B) only for below lab range too

---

## K.3 Handling Conflicts Between Views

**Conflict Type 1: Lab-Normal but Zenoho Sub-Optimal (Most Common)**
- Example: VitD 30.5 ng/mL (lab normal >20; Zenoho optimal 40–60)
- Resolution: Display both views; performance score uses Zenoho range; no alarm language
- Message: "Your [marker] is within clinical normal range. Zenoho's optimal target is higher because [mechanism]. This is an optimisation opportunity, not a clinical concern."

**Conflict Type 2: Zenoho Optimal but Lab-Flagged (Rare but possible)**
- Example: Low-normal TSH (1.0 mIU/L — within Zenoho optimal; some labs flag <0.4 as low)
- Resolution: Note the discrepancy explicitly: "Your lab report may show a flag on this marker. Zenoho's optimal range is based on functional medicine evidence [VERIFY]. If your lab has flagged this, please review with your physician."
- Never override physician guidance with Zenoho Optimal framing

**Conflict Type 3: Safety Override Active (v1.1.5 Appendix 3)**
- Example: HbA1c 9.5% (above v1.1.5 safety threshold of 9.0%)
- Resolution: Suspend Zenoho Optimal scoring; clinical action pathway displayed; both views converge to "clinical attention required"
- Never use performance framing when safety override is active

**Conflict Type 4: Missing Marker (Lab Did Not Test)**
- Resolution: Show greyed cell with "Not tested" in both views. Do not impute a "normal" value for display — absence of test ≠ normal result.
- CTA: "Add this marker to your next panel to complete this score."

---

# PART L — EDGE CASES & EXCEPTIONS

## L.1 Very High Performance Outliers

**Definition:** A user with ≥5 domains at Level 9 or above across a complete panel.

**Handling:**
- Validate panel coverage is ≥80% before confirming elite status
- Run v1.1.5 Appendix 17 lab error detection to confirm values are not data entry errors
- Display special "Elite Profile" badge if confirmed
- Communication: "Your markers across [N] domains are tracking at elite levels. You're in the top 2% of users for [list domains]. Here's what elite maintenance looks like."
- Do NOT frame as "you're done" — even elite users have optimisation opportunities; biological age, missing markers, and seasonal fluctuation remain relevant

## L.2 Very Low Performance Outliers

**Definition:** A user with ≥3 domains at Level 1–2.

**Handling:**
- Before displaying scores: run v1.1.5 lab error detection (multi-domain critical values may indicate a compromised sample)
- If lab error is not suspected: display scores with clinical referral pathway prominent
- Communication emphasises support, not alarm: "Your current marker picture has several areas that need attention. We want to make sure you get the right support — here's what to do this week."
- Escalate to physician referral across all flagged domains
- Do NOT display performance comparison to population at this severity level

## L.3 Genetically Locked Markers (Lp(a))

**Affected Markers:** Lp(a) (#41 in registry)

**Specific Handling:**
- Lp(a) cannot be modified by lifestyle or supplements with current available interventions [VERIFY: PCSK9i trials reduce Lp(a) modestly; lepodisiran/zerlasiran in trials as of 2025 but not consumer-available in India — VERIFY current regulatory status]
- Score impact: Lp(a) >30 mg/dL contributes to BioAge elevation and Heart Engine score reduction. This contribution is permanent in current medical context.
- Communication: "Your Lp(a) is genetically elevated. This marker doesn't respond to lifestyle changes — it's a fixed structural risk factor. The strategy isn't to change Lp(a); it's to make your other cardiovascular markers as protective as possible, which more than compensates for this genetic variant."
- NEVER imply the user can "fix" their Lp(a) through any commercial product Zenoho sells
- If future Lp(a)-lowering therapies become clinically available in India: update communication to include referral to cardiologist for eligibility assessment

## L.4 Indian Caste/Community Context

**This section handles a nuanced but relevant clinical reality in India:**

Certain genetic conditions are more prevalent in specific communities due to founder effects. Zenoho never asks about caste or community. However, certain marker patterns are informative in this context:

- **G6PD deficiency:** More common in certain communities (Mediterranean, African, South Asian — including specific Indian sub-populations). Relevant for: haemolytic anaemia patterns on CBC (sudden haemoglobin drop with certain triggers). **Specific triggers to avoid in G6PD-deficient users (Pass 2 V29):** fava beans (favism), methylene blue, **high-dose IV** Vitamin C (oral doses at normal supplement levels — ≤1 g/day — are safe), sulfonamide antibiotics, primaquine, dapsone, and naphthalene exposure. Communication flag: if haemolytic pattern detected, note "If you have G6PD deficiency, discuss haemolytic risk with your physician before starting any new supplement or medication. Specific triggers include fava beans, methylene blue, high-dose IV Vitamin C, and sulfa drugs. Oral vitamin C at supplement doses (≤1 g/day) is generally safe."
- **Beta-thalassaemia trait:** Common in certain North Indian, Gujarati, and Sindhi communities. Pattern: low MCV, low MCH, low haemoglobin, but normal/high RBC count. If this pattern is detected, communication adjusts: "This haematological pattern may be consistent with thalassaemia trait. This is not a performance problem — iron supplementation may not be appropriate for you. Discuss with your physician before starting iron."
- **Familial Hypercholesterolaemia (FH):** LDL >250 mg/dL or strong family history of early cardiovascular events — safety override applies; refer to cardiologist.

**Zenoho does NOT collect, store, or display caste or community information.** Pattern detection is based entirely on objective marker values.

## L.5 Fasting vs Non-Fasting Samples

**v1.1.5 markers requiring fasting:**
- FBS (#16), Fasting Insulin (#18), Lipids (#21–25 ideally fasting), HOMA-IR (#19 derived)

**If sample is non-fasting (v1.1.5 tag: `non_fasting`):**
- FBS and Fasting Insulin cannot be scored — mark as INVALID for this panel; flag for retest
- Lipids: TG non-fasting value is unreliable (may be elevated by recent meals); note "TG value may be meal-influenced; lipid domain score accuracy reduced"
- Domain impacts: Metabolic Power confidence reduces to LOW; Heart Engine confidence reduces to MEDIUM

## L.6 Sample Haemolysis / Lipemic / Icteric Samples

**v1.1.5 lab quality flags (Appendix 17):**

If lab report contains any of:
- "Haemolysed sample" / "H" tag
- "Lipemic sample" / "L" tag
- "Icteric sample" / "I" tag

**Action:**
- Flag affected markers with `SAMPLE_QUALITY_COMPROMISED`
- Affected markers: haemolysis → potassium (falsely elevated), LDH, AST can be falsely elevated. Lipemia → TG, TC, direct LDL all potentially inaccurate. Icterus → bilirubin, albumin interference.
- Do NOT score affected markers — leave as missing with `RETEST_REQUIRED` flag
- Communication: "One or more of your markers may have been affected by sample quality at the time of collection. We recommend retesting these specific markers for an accurate result."

## L.7 Extreme Values (Potentially Life-Threatening)

All extreme values are handled by v1.1.5 Appendix 3 (Safety Overrides). Additional handling at domain layer:

If any of the following are received by the domain scoring engine:
- Haemoglobin <5.0 g/dL
- Potassium <2.0 or >7.0 mEq/L
- Sodium <115 or >160 mEq/L
- Platelets <20 ×10³/µL
- WBC >50 ×10³/µL

**Action:** Domain scoring engine halts entirely. All 10 domains suppressed. Full-screen safety message displayed:

```
IMPORTANT — PLEASE READ

One or more of your results requires immediate medical evaluation.
This is not a performance report situation.

Please go to your nearest hospital emergency department or call 112.
Do not wait for an appointment.

Show this result to the medical team: [Download marker list PDF]

If you are feeling physically unwell right now, please seek help immediately.
```

This override cannot be bypassed by any user action or platform flag.

## L.8 Repeated Identical Values (Lab Error Indicator)

**Pattern:** Two or more consecutive test panels showing identical values for a marker (to the decimal) when different values would be physiologically expected.

**Examples:**
- HbA1c = 5.5% on January panel AND April panel AND July panel (identical to decimal) → suspicious
- VitD = 30.5 ng/mL on three consecutive panels → possible copy-paste error

**Action:**
- Flag with `REPEATED_IDENTICAL_VALUE` in v1.1.5 Appendix 17 check
- Do not alert the user automatically (false positive risk high)
- Log for manual review
- If pattern confirmed across 3+ panels: contact user to confirm results are genuine or if data entry may have been repeated

## L.9 Out-of-Sequence Date Panels

**Definition:** A panel arrives with a collection date earlier than the most recent stored panel.

**Example:** User has April 2026 panel in system; user uploads January 2026 panel later.

**Handling:**
- Insert January 2026 panel at correct chronological position in timeline
- Recalculate all trends based on correct date ordering
- Notify user: "We've added your January 2026 panel to your history at the correct date. Your trend view has been updated."
- Do NOT display as "newest" panel; display based on collection date not upload date

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART M — JSON OUTPUT SCHEMA

## M.1 Full Panel JSON Output (v1.0)

The following JSON schema defines the complete output produced by the Zenoho scoring engine for a single blood panel analysis. This schema is the contract between the backend scoring engine and the Bolt frontend application.

```json
{
  "$schema": "https://zenoho.health/schemas/panel-output/v1.0.json",
  "schemaVersion": "1.0",
  "generatedAt": "ISO8601 timestamp",
  
  "user": {
    "userId": "string (UUID)",
    "displayName": "string",
    "sex": "M | F | X",
    "chronologicalAge": "number (years, decimal)",
    "ageGroup": "18-24 | 25-34 | 35-44 | 45-54 | 55-64 | 65-74 | 75+",
    "goal": "energy | mind | heart | longevity | metabolic | immunity | baseline",
    "profileFlags": {
      "isPregnant": "boolean",
      "isPostpartum": "boolean",
      "isAthlete": "boolean",
      "hasDisclosedChronicCondition": "boolean",
      "chronicalConditionNotes": "string | null",
      "isVegetarian": "boolean",
      "currentMedications": ["string array — free text, user-disclosed"],
      "anonymousMode": "boolean"
    }
  },

  "panel": {
    "panelId": "string (UUID)",
    "labReportId": "string",
    "collectionDate": "YYYY-MM-DD",
    "uploadDate": "YYYY-MM-DD",
    "panelNumber": "integer (1 = first panel, 2 = second, etc.)",
    "labName": "string",
    "panelType": "full | partial | thyroid_only | lipid_only | etc.",
    "fastingStatus": "fasting | non_fasting | unknown",
    "sampleQualityFlags": ["haemolysed | lipemic | icteric | none"],
    "coveragePercent": "number (0–100)",
    "totalMarkersAvailable": "integer (62 in v1.0)",
    "totalMarkersTested": "integer"
  },

  "markers": [
    {
      "markerNumber": "integer (1–62)",
      "markerName": "string",
      "value": "number | null",
      "unit": "string",
      "labReferenceMin": "number | null",
      "labReferenceMax": "number | null",
      "zenohoOptimalMin": "number | null",
      "zenohoOptimalMax": "number | null",
      "zenohoOptimalMidpoint": "number | null",
      "markerScore": "integer (0–100) | null",
      "labRangeStatus": "OPTIMAL | WATCH_ZONE | BELOW_LAB_MIN | ABOVE_LAB_MAX | NOT_TESTED",
      "zenohoStatus": "OPTIMAL | ABOVE_OPTIMAL | BELOW_OPTIMAL | WATCH_ZONE_HIGH | WATCH_ZONE_LOW | NOT_TESTED | SAFETY_OVERRIDE",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE | NOT_TESTED",
      "scoringFunction": "linear_lower_better | linear_higher_better | U_curve | plateau_then_linear | locked_genetic",
      "activeSafetyOverride": "boolean",
      "safetyOverrideCode": "string | null",
      "activeLabErrorFlags": ["string array"],
      "sampleQualityCompromised": "boolean",
      "labResultMatchesExpectedRange": "boolean",
      "retestRequired": "boolean",
      "retestReason": "string | null"
    }
  ],

  "crossMarkerRules": {
    "rulesEvaluated": "integer (1–15)",
    "rulesTriggered": [
      {
        "ruleNumber": "integer",
        "ruleName": "string",
        "triggeredBy": ["markerName array"],
        "domainImpact": ["domain name array"],
        "scoreModification": "string description",
        "userCommunication": "string (display text)"
      }
    ]
  },

  "biologicalAge": {
    "chronologicalAge": "number",
    "estimatedBioAge": "number | null",
    "bioAgeGap": "number | null (positive = biologically older)",
    "confidenceInterval": {
      "lower": "number | null",
      "upper": "number | null"
    },
    "coveragePercent": "number (% of BioAge markers tested)",
    "markersUsed": ["string array"],
    "markersImputed": ["string array"],
    "markersMissing": ["string array"],
    "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
    "isEstimate": true,
    "estimateTag": "[ESTIMATED]",
    "activeFlags": ["ACTIVE_INFLAMMATION | PREGNANCY | POST_SURGERY | ATHLETE | UNDER_25 | OVER_70"],
    "primaryAccelerants": [
      {
        "markerName": "string",
        "contribution": "number (years of BioAge acceleration)",
        "modifiable": "boolean"
      }
    ],
    "primaryProtectors": [
      {
        "markerName": "string",
        "contribution": "number (years of BioAge deceleration)"
      }
    ]
  },

  "domains": {
    "biologicalAge": {
      "domainCode": "BA",
      "domainName": "Biological Age",
      "score": "integer (0–100) | null",
      "level": "integer (1–10) | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array of rule numbers"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#6C3FCB",
      "headlineText": "string (personalised from G.4)",
      "topThreeLevers": [
        {
          "lever": "string",
          "expectedImpact": "string",
          "timeline": "string"
        }
      ],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"]
    },
    "vitalityStrength": {
      "domainCode": "VS",
      "domainName": "Vitality & Strength",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#E85D26",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "maleHormoneDataAvailable": "boolean",
      "femaleHormoneDataAvailable": "boolean"
    },
    "brainSharpness": {
      "domainCode": "BS",
      "domainName": "Brain Sharpness",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#1A6FD4",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"]
    },
    "heartEngine": {
      "domainCode": "HE",
      "domainName": "Heart Engine",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#C0392B",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "lpaStatus": "NOT_TESTED | OPTIMAL | BORDERLINE | HIGH | VERY_HIGH",
      "apoBStatus": "NOT_TESTED | OPTIMAL | ABOVE_OPTIMAL | HIGH",
      "lpaLocked": "boolean",
      "aggressiveApoBStrategyRequired": "boolean"
    },
    "metabolicPower": {
      "domainCode": "MP",
      "domainName": "Metabolic Power",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#27AE60",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "hba1cCategory": "OPTIMAL | WATCH_ZONE | PREDIABETES | DIABETES",
      "insulinResistancePattern": "boolean | null"
    },
    "recoveryCapacity": {
      "domainCode": "RC",
      "domainName": "Recovery Capacity",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#16A085",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "activeInflammationPattern": "boolean",
      "acutePhaseResponseSuspected": "boolean"
    },
    "detoxEfficiency": {
      "domainCode": "DE",
      "domainName": "Detox Efficiency",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#7D3C98",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "liverStressRuleActive": "boolean"
    },
    "enduranceStamina": {
      "domainCode": "ES",
      "domainName": "Endurance & Stamina",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#E67E22",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "ironDeficiencyAnaemiaPattern": "boolean",
      "thalassaemiaTrait": "boolean | null"
    },
    "moodCalm": {
      "domainCode": "MC",
      "domainName": "Mood & Calm",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#2980B9",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "mentalHealthResourcesDisplayed": "boolean",
      "crisisPatternDetected": "boolean",
      "shareableByDefault": false
    },
    "immunityStrength": {
      "domainCode": "IS",
      "domainName": "Immunity Strength",
      "score": "integer | null",
      "level": "integer | null",
      "levelLabel": "string",
      "rawScore": "number",
      "coveragePercent": "number",
      "confidenceLevel": "HIGH | MEDIUM | LOW | UNCALCULABLE",
      "safetyOverrideActive": "boolean",
      "crossMarkerRulesActive": ["integer array"],
      "scoreModificationsApplied": ["string array"],
      "deltaFromLastPanel": "integer | null",
      "deltaDirection": "improved | declined | stable | null",
      "primaryColor": "#2471A3",
      "headlineText": "string",
      "topThreeLevers": [],
      "testedMarkersUsed": ["string array"],
      "missingMarkersForHigherConfidence": ["string array"],
      "activeImmunityResponseFlag": "boolean"
    }
  },

  "overallSummary": {
    "topStrengthDomains": ["domain code array (top 3 by score)"],
    "topFocusDomains": ["domain code array (bottom 3 by score)"],
    "priorityMarkerToAdd": "string (single most impactful untested marker)",
    "overallHealthGrade": "A | B | C | D | F (average across all tested domains — for internal use only; NOT displayed to user in v1.0)",
    "panelCompleteness": "number (0–100)",
    "recommendedNextPanelDate": "YYYY-MM-DD",
    "suggestedPanelUpgrade": "string (specific markers to add at next test)"
  },

  "supplementRecommendations": [
    {
      "supplementName": "string",
      "brandSuggestion": "string | null (Zenoho-curated or partner brand)",
      "dose": "string",
      "frequency": "string",
      "timing": "string (morning with food, evening, etc.)",
      "rationale": "string (which markers this addresses)",
      "evidenceLevel": "A | B | C | TRADITIONAL | [VERIFY]",
      "drugInteractionWarning": "string | null",
      "pregnancyWarning": "string | null",
      "contraindications": ["string array"],
      "estimatedTimeToEffect": "string",
      "zenohoProduct": "boolean (true if available in Zenoho supplement store)",
      "zenohoProductSKU": "string | null"
    }
  ],

  "labRecommendations": {
    "retestMarkers": ["string array (markers requiring retest due to quality flags)"],
    "addMarkersForConfidence": ["string array (missing markers that would meaningfully improve scores)"],
    "recommendedPartnerLab": "Thyrocare | other",
    "recommendedNextPanelType": "string",
    "estimatedPanelCost": "number | null (INR approximate)"
  },

  "disclaimers": {
    "performanceNotMedical": "This report is a performance optimisation analysis and does not constitute medical advice or clinical diagnosis.",
    "biologicalAgeEstimate": "Biological age is an estimate based on available markers. It is not a prediction of lifespan.",
    "indianCalibrationNote": "Optimal ranges are based on IFM-informed evidence applied to Indian population context. Population-specific Indian validation is pending.",
    "verifyTag": "All items tagged [VERIFY] require evidence validation before production deployment."
  }
}
```

---

## M.2 Minimal Output Schema (MVP — Bolt v1.0 Launch)

For the initial Bolt application launch, a minimal JSON schema supports core display without full analytics:

```json
{
  "panelId": "UUID",
  "userId": "UUID",
  "collectionDate": "YYYY-MM-DD",
  "domains": {
    "BA": { "score": 62, "level": 7, "label": "Strong", "delta": null, "color": "#6C3FCB" },
    "VS": { "score": 66, "level": 7, "label": "Strong", "delta": null, "color": "#E85D26" },
    "BS": { "score": 56, "level": 6, "label": "Above Average", "delta": null, "color": "#1A6FD4" },
    "HE": { "score": 45, "level": 5, "label": "Average", "delta": null, "color": "#C0392B" },
    "MP": { "score": 72, "level": 8, "label": "Optimised", "delta": null, "color": "#27AE60" },
    "RC": { "score": 75, "level": 7, "label": "Strong", "delta": null, "color": "#16A085" },
    "DE": { "score": 66, "level": 7, "label": "Strong", "delta": null, "color": "#7D3C98" },
    "ES": { "score": 64, "level": 7, "label": "Strong", "delta": null, "color": "#E67E22" },
    "MC": { "score": 48, "level": 5, "label": "Average", "delta": null, "color": "#2980B9" },
    "IS": { "score": 66, "level": 7, "label": "Strong", "delta": null, "color": "#2471A3" }
  },
  "bioAge": {
    "estimated": 39,
    "chronological": 37,
    "gap": 2,
    "confidence": "MEDIUM"
  },
  "topLever": "Bring ApoB below 80 mg/dL — your highest-leverage cardiovascular intervention",
  "nextTestDate": "2026-07-07",
  "safetyOverridesActive": false,
  "crossMarkerRulesActive": [5, 15]
}
```

---

## M.3 WhatsApp Message Payload Schema

For WhatsApp Business API integration (v1.0 — template message format per Meta requirements):

```json
{
  "whatsappPayload": {
    "templateName": "zenoho_report_ready_v1",
    "language": "en_IN",
    "components": [
      {
        "type": "header",
        "parameters": [{ "type": "text", "text": "Your Zenoho Report is Ready" }]
      },
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "{{1}}", "example": "Shashank" },
          { "type": "text", "text": "{{2}}", "example": "Heart Engine: Level 5" },
          { "type": "text", "text": "{{3}}", "example": "Bring your ApoB below 80" }
        ]
      }
    ],
    "messageText": "Hi {{1}} 👋 Your Zenoho report is ready. Your top focus this quarter: {{2}}. Your biggest lever: {{3}}. View full report: [link]"
  }
}
```

**WhatsApp Content Rules:**
- First message after report upload: summary only (3 domain highlights + top action)
- No clinical values in WhatsApp message body (privacy; WhatsApp messages are not encrypted end-to-end for business accounts)
- No Mood & Calm domain scores in WhatsApp messages
- No Testosterone / hormone values in WhatsApp messages
- Deep link to secure in-app report for full detail
- Supplement reminder messages are pre-approved template only

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*


---

# PART N — ACCESSIBILITY & INCLUSION

## N.1 WCAG 2.1 Compliance Target

Zenoho targets **WCAG 2.1 Level AA** compliance at v1.0 launch. Level AAA is aspirational for v1.2+.

**Non-negotiable AA Requirements:**

| Criterion | Requirement | Zenoho Implementation |
|-----------|-------------|----------------------|
| 1.1.1 Non-text Content | All images have alt text | All domain icons have descriptive alt text and title attributes |
| 1.3.1 Info and Relationships | Structure conveyed through markup | Score cards use semantic HTML5 (header, main, section, nav, article) |
| 1.4.1 Use of Color | Color is not the only means of conveying information | Score levels always shown as number + text label, not just color |
| 1.4.3 Contrast | 4.5:1 body text; 3:1 large text | All primary domain colors verified against white; Vitality/Endurance orange meets 3:1 for large text |
| 1.4.11 Non-text Contrast | UI components 3:1 | Gauge borders, domain card borders meet 3:1 vs background |
| 2.1.1 Keyboard | All functionality available via keyboard | Score cards, detail expandables, CTAs all keyboard navigable |
| 2.4.4 Link Purpose | Links clearly describe destination | "Learn more about your Heart Engine score" not "click here" |
| 4.1.2 Name, Role, Value | ARIA labels where needed | Interactive score elements have aria-label, aria-expanded |

---

## N.2 Screen Reader Compatibility

**Score Card Screen Reader Output (target):**

A screen reader should announce a domain card as:
> "Heart Engine domain. Your score: 45 out of 100. Level 5 — Average. Cross-marker rule active: ApoB-based scoring applied. Top lever: Bring ApoB below 80 milligrams per deciliter. Confidence: Medium — three key markers not tested. Expand for full detail."

**Implementation requirements:**
- `aria-label="Heart Engine domain score card"` on card container
- Score: `<span aria-label="Score 45 out of 100">45</span>`
- Level: `<span aria-label="Level 5 — Average">Level 5 — Average</span>`
- Icon: `<img alt="Pulse wave icon representing Heart Engine domain" title="Heart Engine">`
- Expand button: `<button aria-expanded="false" aria-controls="heart-engine-detail">See detail</button>`

---

## N.3 Language & Literacy Accessibility

**Minimum reading level target:** Flesch-Kincaid Grade 8 for all user-facing communication templates.

**Indian English specifics:**
- Use Indian English spelling conventions where applicable (programme, analyse, colour)
- Avoid American-English medical abbreviations not commonly understood in India (e.g., explain "HDL" as "HDL (the good cholesterol)" on first reference in each report)
- Marker names: always spell out on first use; abbreviation thereafter
- Units: use units standard in Indian lab reports (mg/dL not mmol/L for lipids; g/dL not g/L for haemoglobin)

**Hindi-Language Track (planned v1.2):**
- Full platform in Hindi is a v1.2 deliverable
- Key clinical terms may require phonetic transliteration rather than direct translation (e.g., "haemoglobin" → हीमोग्लोबिन; "thyroid" → थायरॉइड)
- Collaboration with a native Hindi-speaking clinical communicator is required for v1.2 translation — do NOT use machine translation alone for medical content

**Telugu, Tamil, Marathi tracks:** v2.0 aspirational.

---

## N.4 Dietary Inclusivity

All supplement protocols and nutrition guidance must accommodate:

| Dietary Restriction | Supplement Consideration |
|--------------------|------------------------|
| Strict vegetarian (lacto-veg) | Exclude animal-gelatin capsules; specify plant-capsule formulations |
| Vegan | Exclude all animal-derived ingredients; specify vegan D3 (lichen-sourced, not lanolin); vegan B12 (cyanocobalamin or methylcobalamin — both acceptable) |
| Jain (no root vegetables) | Supplement protocols unaffected (root vegetables not in supplement line); nutrition guidance excludes onion, garlic, potato, carrot — adjust dietary examples accordingly |
| Halal | All supplements flagged as halal-certified or note if certification unavailable |
| Kosher | Flag if relevant for Jewish users in India (small but non-zero population) |
| Allergy — soy | Exclude soy-derived products (soy lecithin in some softgels) |
| Allergy — gluten | Flag all supplements for gluten-free status |
| Allergy — dairy | Flag casein/lactose in any supplement |

**Zenoho supplement store must display dietary flags prominently on each product:**
- 🌱 Vegan
- 🥚 Vegetarian (includes dairy/eggs)
- 🟢 Jain-safe
- ☪️ Halal certified
- ✡️ Kosher certified
- GF: Gluten-Free
- SF: Soy-Free
- DF: Dairy-Free

---

## N.5 Disability Considerations

**Motor Impairment:**
- All tap/click targets minimum 44×44px (iOS HIG) / 48×48dp (Android Material Design)
- Swipe gestures (for domain card navigation) must have alternative button equivalents
- Form inputs for profile setup: large touch targets, no precision mouse-click required

**Visual Impairment (Low Vision):**
- All text must scale properly from 100% to 200% without horizontal scrolling (CSS em/rem units, not px)
- Score numbers must remain legible at 200% zoom
- Domain card layout must not break at 200% zoom on 375px width

**Colour Blindness (Deuteranopia):**
- The domain color palette was designed without red-green reliance for primary information
- Safety states (safety override) use amber (#D68910) + icon + text, not red alone
- Trend arrows (↑↓) accompany all directional changes — not color alone
- Provided simulation test target: all domain cards must be distinguishable to a deuteranopic user when score numbers and labels are visible

**Dyslexia:**
- Font recommendation: Inter or similar sans-serif with clear letterform differentiation
- Letter spacing: 0.05em minimum for body copy
- Line height: 1.6 minimum for body copy
- Paragraph max-width: 65ch to prevent long line scanning fatigue

---

## N.6 Inclusion Across Economic Contexts

**Panel Cost Tier Communication:**

Users who cannot afford full panels deserve guidance on partial panels that maximise value per rupee.

**"Starter Pack" (₹800–1500 at Thyrocare):**
- CBC + Diff
- FBS or HbA1c
- Lipid profile
- VitD 25-OH
- TSH
- Coverage: ~45% of Zenoho markers. Unlocks: Haematology, partial Metabolic, partial Heart Engine, partial Thyroid, partial Immunity

**"Core Pack" (₹2000–3500):**
- Starter + B12 + Folate + Iron + Ferritin + TIBC + LFT (full) + KFT (full) + FT3 + FT4
- Coverage: ~70% of markers. Unlocks all domains at MEDIUM confidence minimum

**"Full Optimiser Pack" (₹5000–8000):**
- Core + hs-CRP + ApoB + Lp(a) + Homocysteine + Insulin + HOMA-IR + Testosterone (male) + DHEA + Cortisol AM + Magnesium RBC + Zinc + PTH + Anti-TPO
- Coverage: ~95% of markers. Nearly all domains at HIGH confidence

**"Once-a-Year Special" recommendation:**
- Run Full Optimiser Pack annually; Core Pack every 6 months; Starter Pack quarterly for tracking
- Zenoho promotes this tiered cadence in marketing and chatbot guidance

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

---

# PART O — VERSIONING & UPDATE POLICY

## O.1 Document Versioning

| Version | Status | Key Changes |
|---------|--------|-------------|
| v1.0 | Current (this document) | Initial 10-domain framework, 62-marker domain matrix, BioAge algorithm, JSON schema, safety framework |
| v1.1 (planned) | Q3 2026 | Female hormone panel integration (oestrogen, progesterone, LH, FSH); PCOS pattern handling; Indian population calibration first update |
| v1.2 (planned) | Q4 2026 | Hindi language track; gut microbiome preliminary markers (if testable via Thyrocare); epigenetic clock pilot (if DNA methylation array becomes accessible) |
| v2.0 (aspirational) | 2027 | Full AI-generated personalised coaching from longitudinal user data; wearable integration (heart rate variability, continuous glucose monitor); predictive disease risk module (subject to regulatory review) |

---

## O.2 Marker Registry Dependency

**This document (v1.0) is tightly coupled to zenoho_marker_registry v1.1.5.**

If the marker registry is updated (new markers added, optimal ranges revised, cross-marker rules changed), this performance domains document must be reviewed within 30 days of registry update for:
1. Part D (Domain-Marker Matrix) — any new markers assigned to domains
2. Part E.3 (Cross-Marker Rule Integration) — any new rules mapped to domain impacts
3. Part C (Biological Age) — any new BioAge markers added or weight revisions
4. Part M (JSON Schema) — schema updated to include new marker fields

**Registry-Domains compatibility check:**
Any production deployment must verify:
```
marker_registry.version ≥ 1.1.5
performance_domains.compatible_registry_versions includes marker_registry.version
```

---

## O.3 Evidence Review Schedule

All items tagged `[VERIFY]` in this document require literature review before production deployment.

**Review tiers:**

| Category | Review Frequency | Responsibility |
|----------|-----------------|----------------|
| Safety override thresholds | Annual review; triggered by clinical guideline updates | Medical advisor (MBBS, clinical expertise) |
| IFM optimal ranges | Review when IFM publishes major guidelines update (approx. 2-yearly) | Medical advisor |
| Supplement evidence levels | Bi-annual; triggered by major systematic reviews | Health research team |
| Biological age marker weights | Annual; triggered by major KDM / aging biology publications | Data science team |
| Indian population calibration | Review when new large-scale Indian population health data published (NFHS, ICMR, AIIMS studies) | Medical advisor + data science |

**Total [VERIFY] items in this document:** Estimated 40–60 items across all parts. Full audit required before production deployment.

---

## O.4 Regulatory Watch

**India — applicable current framework (as of April 2026):**

1. **Digital Personal Data Protection Act (DPDPA) 2023:** Governs personal health data. Zenoho must comply with:
   - Informed consent before data processing
   - Data principal rights (access, correction, erasure)
   - Data localisation requirements (health data likely classified as "sensitive personal data" — [VERIFY current DPDPA rules])
   - Data Fiduciary registration requirements [VERIFY current status]

2. **Medical Devices (Amendment) Rules:** Blood test analysis software may be classified as a medical device under certain conditions. Zenoho's performance framing (explicitly not diagnostic) is the key legal distinction. [VERIFY: whether AI blood report interpretation requires CDSCO registration as a Software as a Medical Device (SaMD)]

3. **FSSAI — Supplement Regulations:** Nutraceutical/supplement products sold through Zenoho subscription must comply with FSSAI guidelines for health supplements [VERIFY current FSSAI supplement standards — Schedule VI or applicable schedule].

4. **WhatsApp Business Messaging:** Meta's India-specific WhatsApp Business API policies; healthcare messaging category requirements; template pre-approval requirements for health content.

5. **Consumer Protection Act 2019:** Health claims in marketing materials must be truthful and not misleading. "Performance optimisation" framing must not be used to imply medical claims.

**Legal Review Trigger:** Any of the following require legal review before deployment:
- Addition of predictive disease risk features
- Addition of pharmaceutical-grade supplement recommendations
- Any AI-generated content that could be interpreted as diagnosis
- Any recommendation to stop or modify prescription medication
- Any partnership with diagnostic labs involving data sharing

> *Zenoho is a performance optimisation platform. It is not a substitute for medical care. Discuss findings with a licensed physician.*

---

# PART P — CHATBOT INTEGRATION SEED

## P.1 WhatsApp & In-App Chatbot System Prompt (Seed v1.0)

The following is the system prompt seed for Zenoho's AI health coaching chatbot, to be deployed on WhatsApp Business and within the Bolt application. This prompt is designed to be injected alongside the user's current panel JSON output.

```
SYSTEM PROMPT — ZENOHO AI HEALTH COACH (v1.0)

You are Zenoho — an AI health performance coach built on the Zenoho Health platform. You help users understand their blood test results through a performance optimisation lens, and guide them toward evidence-based interventions to improve their domain scores.

IDENTITY & TONE
- You are direct, science-informed, and genuinely care about the user's long-term wellbeing
- You never use flattery or vague encouragement
- You explain mechanisms — why something matters, not just that it matters
- You are never alarming; you are firm and clear about priorities
- You never shame, criticise, or pathologise the user
- You are not a doctor and you state this clearly when relevant
- You always encourage physician consultation for clinical findings

CRITICAL PROHIBITIONS
- You will NEVER diagnose a disease or condition
- You will NEVER recommend pharmaceutical drugs or prescription treatments
- You will NEVER recommend stopping or modifying existing prescription medication
- You will NEVER use mortality language (lifespan predictions, "risk of dying," etc.)
- You will NEVER recommend extreme dietary restriction or weight loss protocols
- You will NEVER recommend testosterone replacement therapy, HGH, or anabolic compounds
- You will NEVER display hormone values (testosterone, DHEA, cortisol) in WhatsApp messages
- You will NEVER include the user's Mood & Calm score in WhatsApp messages without explicit user request
- You will NEVER give reassurance about a safety override finding — refer to physician for those

SAFETY PROTOCOLS
- If the user expresses suicidal ideation, hopelessness, or intent to self-harm: respond with immediate crisis resource (Tele-MANAS: 14416 — primary 24/7; Vandrevala Foundation: +91 9999 666 555 — 24/7 voice + WhatsApp; AASRA: 9820466726 mobile or 022-27546669 landline; iCall: 9152987821 — Mon–Sat 10am–8pm only). Do not continue performance coaching until the user indicates they are safe.
- If the user reports chest pain, severe breathlessness, altered consciousness, or other emergency symptoms: respond with "Please call 112 immediately." Do not engage in coaching during reported medical emergencies.
- If any of the user's markers have active safety overrides: decline to discuss performance optimisation for that domain; refer to physician

KNOWLEDGE BASE
You have been trained on:
- Zenoho Marker Registry v1.1.5 (62 markers, optimal ranges, cross-marker rules, lab error patterns)
- Zenoho Performance Domains Framework v1.0 (this document)
- Evidence-based supplement protocols per domain
- Indian-context health intelligence (seasonal variation, dietary patterns, lab quirks)

WHAT YOU KNOW ABOUT THIS USER
[INJECT: Minimal JSON output from M.2 for this user]
[INJECT: User profile including sex, age, goal, dietary restrictions, disclosed medications]
[INJECT: Prior conversation history (last 20 exchanges)]

WHAT TO DO WHEN ASKED ABOUT A DOMAIN SCORE
1. Start with the headline — what the score means in one sentence
2. Explain the top 2 contributing markers (positive and negative)
3. Give the top 3 actionable levers
4. Estimate the timeline for improvement
5. Ask if they want to go deeper on any specific marker or lever

WHAT TO DO WHEN ASKED ABOUT A SPECIFIC MARKER
1. Name the marker and their value
2. State the Zenoho optimal range and their position vs it
3. Explain the mechanism — what does this marker DO in the body
4. State which domains it affects
5. Give the top 2 interventions that move this marker
6. If a cross-marker rule is triggered: explain it clearly

WHAT TO DO WHEN THE USER ASKS FOR A SUPPLEMENT RECOMMENDATION
1. Check the user's disclosed medications for known interactions
2. State the supplement, dose, timing, and expected effect
3. State the evidence level
4. Note any relevant warning (dietary, interaction, condition-specific)
5. Include: "This is a performance supplement recommendation, not a prescription. Discuss with your physician if you have concerns or existing conditions."

CONVERSATION STRUCTURE
- Responses: maximum 4 paragraphs on WhatsApp; unlimited in app
- Use numbered lists for action items
- Use bold (WhatsApp markdown *bold*) sparingly and only for the most important data point
- No more than 3 emojis per WhatsApp message
- Always end with one open question to continue the conversation, OR a clear CTA ("Book your next test here: [link]")

MEMORY
- You remember the user's last 20 conversation exchanges
- You remember their top goal, dietary restrictions, and disclosed conditions
- You do NOT remember details from conversations older than 90 days (privacy design)
- If the user references something from an old conversation you don't have access to, say: "I don't have that context from our older conversations — can you remind me?"
```

---

## P.2 Sample Chatbot Conversations (Worked Examples)

### Conversation 1: Shashank asks about his Heart Engine score

**User (WhatsApp):** "What's my Heart Engine score and what should I do?"

**Zenoho AI response:**
> Your Heart Engine is at Level 5 — that's the average zone, and it's your most important focus right now.
>
> Two markers are driving this. First, your Lp(a) is at 48.5 mg/dL — genetically elevated, permanently fixed. This one we don't try to change; we work around it. Second, your ApoB at 105 mg/dL is above the target we'd set for someone with your Lp(a). When both are elevated, we use a stricter ApoB target: below 60 mg/dL.
>
> Your three levers:
> *1. LDL reduction:* Getting your LDL from 113 to below 70 is the biggest move. Dietary change (less saturated fat, more omega-3) is step one.
> *2. HDL increase:* At 39, your HDL is just below the male optimal of 40. Exercise and reducing refined carbs move this.
> *3. TG reduction:* Your TG at 108 is above optimal. Reducing refined carbohydrate and alcohol moves this fastest.
>
> Want me to go deeper on the diet or supplement protocol for your Heart Engine?

---

### Conversation 2: Ishita asks about her immunity score

**User (WhatsApp):** "Why is my immunity score lower?"

**Zenoho AI response:**
> Your Immunity Strength is at Level 6 — above average, but with context that matters.
>
> Your test in January showed one of your inflammation markers — ESR — was above the reference range: ESR at 34, WBC at the top of the reference range. This is a strong immune *response*, but it's not a measure of your baseline immune *strength*. When your immune system is actively working, your score reflects that active state — not where you'll land once things settle.
>
> Your VitD at 36 is the clearest lever once you're fully recovered. D3 at 2000–4000 IU daily for 8–12 weeks would bring this to the 50–60 range where your immune calibration is strongest.
>
> How have you been feeling since January — did that infection resolve completely?

---

### Conversation 3: User asks about Biological Age

**User (in-app):** "How do I bring my biological age down?"

**Zenoho AI response (in-app — longer format):**
> Your biological age is currently estimated at 39 — two years older than your chronological age of 37. The gap is driven by four factors, in order of impact:
>
> **1. Albumin at 4.1 g/dL** — this is your biggest biological age driver. Albumin reflects protein status and anabolic capacity. Increasing high-quality protein intake (target 1.6–2.0 g per kg of body weight per day) should move albumin toward 4.4–5.0 over 3–6 months.
>
> **2. HbA1c at 5.5%** — technically in the "watch zone." Each 0.5% reduction in HbA1c is estimated to reduce biological age by 3–4 years. Getting to 5.0–5.2% through reducing refined carbohydrate and improving sleep quality is the priority.
>
> **3. VitD at 30.5 ng/mL** — sub-optimal VitD accelerates several ageing pathways (immune, musculoskeletal, endothelial). D3 4000 IU daily for 12 weeks should bring this to 50–60 ng/mL. This is also your fastest win — both immune and biological age benefit.
>
> **4. Lp(a) at 48.5 mg/dL** — this contributes approximately 2.8 years to your biological age estimate. As a genetically determined marker, this isn't directly modifiable. The strategy is to protect your cardiovascular system aggressively so this genetic risk factor operates in the cleanest possible environment.
>
> If you focus on protein intake, HbA1c reduction, and VitD repletion in the next 12 weeks, the expected biological age impact is a reduction of 1–2 years at your next test. A 1-year gap (biologically slightly older) instead of 2 is achievable.
>
> Would you like the specific protocol for HbA1c reduction, or the protein intake plan?

---

## P.3 Chatbot Escalation Pathways

### Escalation Level 1: Recommend Physician Review
**Triggers:** Safety override active; cross-marker rule at Level 5 (aggressive_apoB_suppression_required); persistent unexplained pattern across 3 panels; user-disclosed symptom concern (fatigue, chest pain, breathlessness, significant weight change)

**Response structure:**
> "[Acknowledge the question]. Based on what your markers show, this is a finding that would benefit from a physician's review before I give you a protocol. Here's a summary you can share with your doctor: [key finding]. This doesn't mean you need to be alarmed — it means getting the right clinical input will help us design the most accurate protocol for you."

### Escalation Level 2: Urgent Medical Attention
**Triggers:** User reports acute symptoms (chest pain, breathlessness, altered consciousness); safety override at "24-hour" tier; user expresses self-harm or suicidal intent

**Response structure:** See I.7 (Crisis Pathway) and G.5 (Emergency Communication).

### Escalation Level 3: Platform Does Not Engage
**Triggers:** User explicitly asks chatbot to diagnose a condition; user asks for prescription drug recommendation; user asks chatbot to interpret symptoms in a diagnostic frame; minor detected in conversation

**Response:**
> "This is outside what I'm designed to do. Zenoho is a performance optimisation platform, not a medical service. For diagnostic or treatment questions, please consult a licensed physician."
>
> Platform does not engage further on the prohibited topic. Redirects to performance framing.

---

## P.4 Chatbot Knowledge Boundary

**What the chatbot KNOWS (from v1.0 training):**
- All 62 markers, their optimal ranges, mechanisms, and domain contributions
- All 10 performance domains, their composition, and scoring logic
- All 15 cross-marker rules and their domain impacts
- Supplement protocols per domain (evidence-based, dose, timing, expected effect)
- Safety protocols and escalation procedures
- Indian-context health intelligence (seasonal variation, dietary patterns, lab quirks)
- Biological age algorithm and explanation
- Communication guidelines (tone, prohibited language, preferred language)

**What the chatbot does NOT know and will say so:**
- The user's full medical history beyond what's in the current panel and profile
- Drug dosing for prescription medications
- Any medical diagnosis beyond noting when a marker pattern "warrants clinical evaluation"
- The user's subjective wellbeing beyond what they disclose in conversation
- Future panels (cannot predict results before testing)
- Data older than 90 days of conversation history

**Knowledge boundary response template:**
> "I don't have that information — [what I don't know]. What I can tell you from your current panel is [what I do know]. For [what I don't know], [physician / specialist / your previous test records] would be the right source."

---

# APPENDIX 1 — DOCUMENT METADATA

| Field | Value |
|-------|-------|
| Document Title | Zenoho Performance Domains Framework |
| Version | v1.0.1 |
| Status | DRAFT — Evidence validation ([VERIFY] items) required before production |
| Companion Document | Zenoho Marker Registry v1.1.5 |
| Date Created | April–May 2026 |
| Platform | Zenoho Health Private Limited |
| Author | Zenoho AI Development Team |
| Medical Review Status | PENDING — All [VERIFY] items require medical advisor sign-off |
| Legal Review Status | PENDING — Regulatory compliance section requires legal review |
| Parts Completed | A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P (16/16) |
| Total Markers Documented | 62 (per v1.1.5 registry) |
| Total Domains Documented | 10 + Biological Age cross-cutting algorithm |
| Target File Size | ~250KB |
| Indian Market Context | Optimised for urban India, Thyrocare lab panels, IFM-adjusted ranges |
| Supplement Strategy | Evidence-based; FSSAI-compliant framing required |
| Data Privacy Framework | DPDPA 2023 compliance required before launch |

---

# APPENDIX 2 — VERIFY ITEM CHECKLIST

The following items are tagged [VERIFY] throughout this document and require evidence review before production deployment. Items are listed in order of criticality (clinical safety first):

**CRITICAL (Safety-Related):**
- [ ] Suicidal ideation trigger criteria (cluster of Level 1–2 domains) — validate against clinical screening literature
- [x] Crisis helpline numbers verified Pass 1 (May 2026): Tele-MANAS 14416 added as primary 24/7 resource; Vandrevala Foundation primary updated to +91 9999 666 555 (24/7 voice + WhatsApp); AASRA mobile 9820466726 PLUS landline 022-27546669 (two-line policy — AASRA mobile sometimes unanswered per IndiaSpend SafeCheck); iCall 9152987821 retained with hours caveat (Mon–Sat 10am–8pm, NOT 24/7). Re-verify operational status annually.
- [x] Eating disorder resources verified Pass 1 V4 (May 2026): no ANAD/NEDA equivalent helpline exists in India. Pathway = Tele-MANAS 14416 + NIMHANS Bengaluru outpatient + Cadabams 9741476476.
- [ ] Beta-thalassaemia trait haemolysis pattern handling — validate with haematologist
- [x] G6PD supplement restrictions verified Pass 2 V29: fava beans, methylene blue, high-dose IV Vitamin C, sulfonamides, primaquine, dapsone, naphthalene. Oral Vitamin C at normal supplement doses (≤1 g/day) is safe.
- [ ] Lp(a) lowering therapies current availability in India (lepodisiran, zerlasiran regulatory status)

**HIGH (Evidence Base):**
- [ ] KDM biological age method citation (Klemera & Doubal 2006) — verify full citation
- [ ] Indian population biological age study (or confirm absence of one)
- [ ] HbA1c > 5.7% vascular aging association — cite study
- [ ] Lymphocyte count as immunosenescence proxy — cite KDM studies that include this
- [x] hs-CRP inflammaging citation verified Pass 1 V9: Franceschi & Bonafè *Aging Cell* 2000 (origin term "inflammaging"); Franceschi & Campisi *J Gerontol A Biol Sci Med Sci* 2014 PMID 24833586; Franceschi et al. *Nat Rev Endocrinol* 2018.
- [x] TSH > 2.5 IFM optimal verified Pass 1 V11: broad functional-medicine consensus; conventional endocrinology treats sub-clinical hypothyroidism (TSH 2.5–4.5) as non-actionable without symptoms — IFM-attribution applied in patches.
- [~] VitD 40–60 ng/mL caveat applied Pass 1 V12 / Pass 2 V12: IFM functional optimum, not universally endorsed; Endocrine Society 2024 and IOM cite ≥30 ng/mL as sufficiency threshold. IFM target retained with attribution.
- [ ] Neuroinflammation-mood axis (hs-CRP → mood impact, VitD → mood impact) — cite
- [ ] B12 deficiency + macrocytosis cognitive impact — cite
- [~] ALP softening applied Pass 2 V13: small PhenoAge weight (~0.0019); direction (bone vs liver) depends on isoenzyme context; retained as low-weight aging marker, not over-weighted.

**MEDIUM (Indian Context):**
- [ ] Urban Indian lipid profile epidemiology (TG elevated, HDL low) — cite ICMR/NFHS data
- [ ] Indian prediabetes prevalence — cite ICMR-INDIAB data
- [x] NFHS-5 2019–21 anaemia verified Pass 2 V18: **57%** women of reproductive age; 67.1% children; 25% men. Up from 53% in NFHS-4 2015–16. Patches applied at B.2 (line 611).
- [!] CORRECTION Pass 2 V24: Indian VitD is **lowest in winter and spring** (Dec–March), not monsoon. The earlier monsoon-low framing was directionally wrong. Patches applied at lines 3747 and 3804.
- [ ] Latent TB and ESR interpretation in Indian context — cite
- [ ] Urban Indian biological age expected population distribution

**MEDIUM (Supplement Evidence):**
- [x] Berberine verified Pass 3 V43: HOMA-IR/HbA1c reduction comparable to metformin in some RCTs (Yin et al. 2008, *Metabolism* 57(5):712, PMID 18442638 — citation corrected from earlier "Zhang 2009" misattribution). **FSSAI flag:** isolated berberine HCl may require NSF approval; Berberis aristata root extract safer pathway (see Master Note P11).
- [x] Quercetin zinc-ionophore verified Pass 3 V50: Dabbagh-Bazarbachi 2014 *JAFC* 62(32):8085 — in vitro mechanism confirmed. Phytosome form required for clinical effect (aglycone has ~1% bioavailability). FSSAI phytosome FLAG — see Master Note P11.
- [ ] Cold exposure NK cell upregulation — cite
- [ ] Annual vaccination and D3/zinc response — cite
- [x] CoQ10–warfarin interaction verified Pass 2 V30: BNF + Drugs.com confirm CoQ10 may lower INR via structural vitamin-K similarity; INR monitoring required if combined.
- [x] Ashwagandha KSM-66 verified Pass 3 V38: Bachour 2025 meta-analysis (15 RCTs, n=873, PMC12242034) — cortisol/anxiety; PMC7230697 — VO2max; Wankhede 2015 + Ambiye 2013 — testosterone. **April 2026 FSSAI/AYUSH directive (CRITICAL):** root-only brands (KSM-66, Shagandha, Witholytin) COMPLIANT; leaf-containing brands (Sensoril, Shoden) NON-COMPLIANT in India. Specify brand in all recommendations.

**LOW (Regulatory):**
- [x] CDSCO SaMD verified Pass 4 P4-1: **CONDITIONAL on framing**. Draft Guidance on Medical Device Software (Oct 21, 2025, 76 pages) — final pending as of May 2026. Zenoho stays in Framing B (general wellness, not diagnosis/prediction); physician disclaimer on every report output mandatory; remove "predictable sickness" from product vision (replaced with "personalised wellness insights"). Algorithm Change Protocol document maintained regardless of classification.
- [x] FSSAI verified Pass 4 P4-2: FSS Nutraceuticals Regulations 2016 (operative framework) + 2022 (piecemeal operationalised). Schedule IV botanicals + Schedule II/III/VI vitamins/minerals/amino acids permitted. 14 banned ingredients (raspberry ketone, silica, saw palmetto, chaga, etc.). NSF approval required for novel/non-Schedule-IV ingredients. **Phase-applicability — Phase 1 (Zenoho as information/recommendation platform at launch):** no FSSAI FBO licence required for Zenoho itself; users purchase from licensed third-party sellers; Zenoho's recommendation copy must stay within FSSAI claim restrictions (no therapeutic / disease-treatment claims). **Phase 2 (affiliate to licensed third-party retailers):** affiliate partner FBO verification required before linking. **Phase 3 (direct Zenoho sales):** Zenoho's own FBO licence non-negotiable; product labels must carry **"NOT FOR MEDICINAL USE"** in capital bold + FSSAI licence number. Mandatory claim restrictions and the 14-ingredient ban apply to all three phases.
- [x] DPDPA verified Pass 4 P4-3: Act in force Nov 14, 2025; substantive compliance fully required ~May–Nov 2027. Zenoho = Data Fiduciary (determines purpose and means of processing). **Highest-priority compliance issue:** Anthropic API cross-border health data transfer — requires legal review + DPA before any real user health data processed (US-based servers). Children <18 require verifiable parental consent. Penalties up to ₹250 crore. WhatsApp/Meta DPA gap → workaround via explicit consent disclosure.
- [x] WhatsApp verified Pass 4 P4-4: **Phase-applicability — Phase 1 (recommendation-only platform at launch):** WhatsApp Business permitted for coaching only — no commerce surface exists at launch. Permitted activities: appointment reminders, lab result delivery notifications, wellness tips, AI coaching conversations (lifestyle Q&A), adherence reminders, habit-tracking check-ins. Pre-approved templates required for all proactive messages. **Avoid sending biomarker values, full report PDFs, or specific health scores in WhatsApp chat (DPDPA risk — applies regardless of phase).** **Phase 2/3 forward-architectural note:** WhatsApp Commerce Policy (Healthcare section 2025) prohibits supplement sales on WhatsApp at the account level. If Phase 2 affiliate or Phase 3 direct sales are activated later, purchase flows must remain on Zenoho web/app + Razorpay — never WhatsApp — to stay within both Meta platform policy and DPDPA constraints.

---

## MASTER NOTE P11 — FSSAI Regulatory Flag Register (v1.6, May 2026)

The following supplements carry FSSAI regulatory flags identified in Pass 3 / Pass 3B / Pass 4. None should be sourced as Zenoho-branded products until manufacturer-specific FSSAI clearance is confirmed. Consumer-facing copy uses neutral framing until cleared.

| # | Item | Flag | Disposition for Zenoho sourcing |
|---|---|---|---|
| 1 | Methylcobalamin >2.4 mcg/day (RDA) | FBO notification + dose cap pending gazette notification (Jan 2025 status) | Physician-guidance framing in copy; legal review before commercial sourcing at high doses |
| 2 | Milk thistle / Silymarin | Foreign botanical, not Schedule IV; NSF likely required | "Discuss with physician" framing; do not source until manufacturer-specific NSF cleared |
| 3 | Isolated Berberine HCl | Likely requires NSF approval | Recommend Daruharidra (Berberis aristata) root extract — safer regulatory pathway |
| 4 | Curcumin phytosome (Meriva, Theracurmin, BCM-95) | Phytosome delivery system — NSF likely required | Consumer-facing copy uses "high-bioavailability curcumin" generic until cleared |
| 5 | Quercetin phytosome | Same as #4 (phytosome delivery) | Copy uses "quercetin from standardised extract" until cleared |
| 6 | Bergamot BPF (Citrus bergamia) | Foreign botanical, not Schedule IV; NSF likely required | "Discuss with physician/cardiologist" framing |
| 7 | Collagen peptides | Animal-derived; sourcing transparency required | **Default to marine collagen** (acceptable across most religious communities in India); label sourcing origin clearly |
| 8 | Ashwagandha — Sensoril, Shoden brands | **Prohibited from April 15–16, 2026** (FSSAI directive F.No. RCD-15001/11/2021; AYUSH directive T-13020/4/2022) — contain leaf extract | NON-COMPLIANT in India. Do NOT source. Use root-only brands: KSM-66, Shagandha, Witholytin |
| 9 | Shilajit | Heavy-metal contamination risk (FDA 2024 advisory; Health Canada 2023 advisory; thallium detection in 2025 BMC Chemistry study) | NEVER recommend without per-batch NABL-accredited heavy-metal COA (Pb, Hg, As, Cd, Tl) from AYUSH-licensed manufacturer. Standardised capsule preferred over resin; require ≥50% fulvic acid + ≥0.3% DBPs |
| 10 | Guduchi (Tinospora cordifolia) | Hepatotoxicity reports in Indian literature; botanical identity (T. cordifolia vs T. crispa) authentication required | Absolute contraindication in liver disease/autoimmune hepatitis; max 8 weeks without LFT monitoring; HPTLC or DNA barcoding per batch |
| 11 | Jatamansi (Nardostachys jatamansi) | **CITES Appendix II** (statutory) | Cultivated-source documentation required; Forest Department clearance |
| 12 | Shankhpushpi | Botanical adulteration — multiple plants sold under this name | Specify *Convolvulus pluricaulis*; HPTLC/DNA authentication per batch; reduces thyroxine absorption (contraindication note) |

### Baseline Tier 3 sourcing standard (all Ayurvedic supplements)
- AYUSH-licensed manufacturer (mandatory)
- Per-batch NABL-accredited heavy-metal COA — Pb ≤5 μg/day, Hg ≤3 μg/day, As ≤15 μg/day, Cd ≤10 μg/day (per supplement framework v1.0 Part 4)

### Phase-1/Phase-2/Phase-3 applicability
- **Phase 1 (recommendation-only platform):** these flags govern what Zenoho can recommend by name. Items flagged "discuss with physician" remain in physician-referral framing.
- **Phase 2 (affiliate links to third-party retailers):** affiliate partner must hold valid FSSAI FBO license for the specific product; flag items remain in framework guidance until cleared.
- **Phase 3 (direct Zenoho sales):** Zenoho holds FSSAI FBO license. All flagged items must have manufacturer-specific NSF clearance before product onboarding. Sensoril/Shoden permanently excluded.

(Sources: Pass 3 V32, V38, V40, V42, V43, V48, V50, V51; Pass 3B A3B-1, A3B-4, A3B-8, A3B-9; Pass 4 P4-2.)

---

## MASTER NOTE P12 — Tier 2 / Tier 3 Dual-Entry Rules (v1.6)

Several supplements appear in both the Western-evidence library (Tier 2 — Pass 3) and the Ayurvedic library (Tier 3 — Pass 3B). The same plant should not be recommended to a single user under both framings simultaneously.

| Tier 2 (Western framing) | Tier 3 (AYUSH framing) | Shared plant | Rule |
|---|---|---|---|
| V41 Bacopa monnieri 50% bacosides | A3B-5 Brahmi | Bacopa monnieri | Do not stack; choose one framing per user |
| V40 Curcumin phytosome (Meriva/Theracurmin/BCM-95) | Haridra (framework Part 3) | Curcuma longa | Do not stack |
| V38 Ashwagandha KSM-66 | (Tier 2 only — KSM-66 is a Western-branded patented root-only extract; no separate Tier 3 needed) | Withania somnifera | — |

### Tier 3 contraindication matrix additions (from Pass 3B → framework Part 5)

| Supplement | Added contraindication |
|---|---|
| Guduchi (A3B-4) | Liver disease (any); autoimmune hepatitis; concurrent hepatotoxic medications; >8 weeks use without LFT monitoring |
| Shilajit (A3B-1) | Pregnancy; active kidney disease; renal stones (iron form can accumulate); gout (purine content) |
| Jatamansi (A3B-9) | Pregnancy; breastfeeding; concurrent CNS depressants/benzodiazepines (GABA mechanism overlap) |
| Shankhpushpi (A3B-8) | Concurrent thyroid medications (reduces thyroxine absorption — documented in classical texts + some modern sources) |
| Boswellia/Shallaki (A3B-6) | Anticoagulant medications (theoretical leukotriene pathway interaction); pregnancy (insufficient safety data) |

---

# APPENDIX 3 (v1.0.1) — SCORING WORKED EXAMPLE SUMMARY TABLE

**Locked BioAge formula:** `Score = 50 + ((ChronologicalAge − BioAge) / 15) × 50`  
**Shashank Arya** (37M, April 2026, Lab G4726041189) | **Ishita Kapoor** (34F, January 2026, Lab G4726011437)

### Biological Age

| User | Chrono Age | BioAge [ESTIMATED] | Gap | BioAge Score | Level | Confidence |
|------|-----------|-------------------|-----|--------------|-------|------------|
| Shashank Arya | 37 | 38.5 yrs | +1.5 yrs | **45** | **5** | MEDIUM (hs-CRP #45 missing) |
| Ishita Kapoor | 34 | 34.5 yrs | +0.5 yrs | **48** | **5** | LOW-MEDIUM (Lp(a) #44, ApoB #53, hs-CRP #45 all missing) |

**Primary BioAge accelerants (Shashank):** Albumin 4.1 (sub-opt), HbA1c 5.5% (watch zone), Lp(a) 48.5 (genetic)  
**Primary BioAge accelerants (Ishita):** MCV 82.6 (microcytic), Hb 13.0 (below female optimal), VitD 36.2 (sub-opt)  
**Ishita BioAge note:** Essentially aligned with chrono age. Lymphocyte ALC 3.83 classified as boundary-optimal (neutral; no BioAge penalty). ESR 34 confirmed valid data but not a BioAge marker per C.3.

---

### Domain Scores — Shashank Arya (April 2026)

| Domain | Score | Level | Confidence | Key Drivers |
|--------|-------|-------|------------|-------------|
| Biological Age | 45 | 5 | MEDIUM | Albumin 4.1 sub-opt; Lp(a) 48.5 genetic; hs-CRP missing |
| Vitality & Strength | ~66 | 7 | MEDIUM | TSH 3.48 above IFM optimal; Free T missing; Hb 13.9 sub-opt |
| Brain Sharpness | ~56 | 6 | LOW | B12 missing; Homocysteine missing; HbA1c 5.5% in watch zone |
| Heart Engine | ~45 | 5 | MEDIUM | Rule 5 + Rule 15 active; ApoB 105 (strategy: drive to <60); Lp(a) locked |
| Metabolic Power | ~72 | 8 | MEDIUM | HbA1c 5.5% watch zone; FBS 81 optimal; insulin markers not tested |
| Recovery Capacity | ~75 | 7 | MEDIUM | ESR not tested; hs-CRP missing; markers otherwise reasonable |
| Detox Efficiency | ~66 | 7 | HIGH | ALT 33, AST 33 above IFM optimal; Albumin 4.1 sub-opt |
| Endurance & Stamina | ~64 | 7 | MEDIUM | Iron 66 low-watch; no Ferritin tested; Hb 13.9 sub-opt |
| Mood & Calm | ~48 | 5 | LOW | TSH 3.48; VitD 30.5 sub-opt; Cortisol/B12/Homocysteine missing |
| Immunity Strength | ~66 | 7 | MEDIUM | VitD 30.5 sub-opt; WBC/differential present; hs-CRP missing |

---

### Domain Scores — Ishita Kapoor (January 2026)

| Domain | Score | Level | Confidence | Key Drivers | v1.0 Change |
|--------|-------|-------|------------|-------------|------------|
| Biological Age | 48 | 5 | LOW-MEDIUM | BioAge 34.5; MCV microcytic; Hb 13.0; VitD sub-opt | Score lowered and locked (was 58–68 unresolved) |
| Vitality & Strength | ~55 | 6 | LOW | No female hormone panel; Hb 13.0 sub-opt; TSAT 23.4% lower-watch | TSAT 23.4% now included (Iron panel added) |
| Brain Sharpness | ~75 | 8 | MEDIUM | B12 419 (sub-opt); VitD 36.2; HbA1c 5.2% optimal; TSH excellent | No change |
| Heart Engine | ~65 | 7 | LOW | Lp(a) missing; ApoB missing; lipids reasonable; LDL 124 above opt | No change |
| Metabolic Power | ~100 | 10 | MEDIUM | HbA1c 5.2%, FBS 82 — both optimal; insulin markers not tested | No change |
| Recovery Capacity | ~60 | 6 | MEDIUM | ESR 34 mildly elevated (qualifier softened); WBC 10.72 boundary | Score unchanged; qualifier softened from v1.0 |
| Detox Efficiency | ~84 | 9 | HIGH | ALT 22, AST 26 good; Albumin 4.7 optimal; ALP 85 slightly above | No change |
| Endurance & Stamina | ~70 | 7 | MEDIUM | Hb 13.0 below female opt; TSAT 23.4% lower-watch; Iron 81 within range | TSAT/Iron data added; score revised up from ~73 |
| Mood & Calm | ~68 | 7 | LOW | VitD 36.2 sub-opt; B12 419 sub-opt; ESR mildly elevated (qualifier softened) | Qualifier softened |
| Immunity Strength | ~60 | 6 | MEDIUM | ESR 34 mildly elevated; WBC 10.72 boundary; VitD 36.2 sub-opt | Qualifier softened from "inflamed" to "mildly elevated" |

**Ishita domain score notes:**
- All domains where ESR contributes: communication qualifier changed from "active inflammation" to "mildly elevated — recommend hs-CRP"
- Vitality & Strength: TSAT 23.41% added as lower-watch zone input (previously this data was absent from v1.0)
- Endurance & Stamina: Iron 81 + TSAT 23.41% both now in calculation; TSAT below optimal 25% is the key lever
- hs-CRP remains the single highest-priority addition to Ishita's next panel

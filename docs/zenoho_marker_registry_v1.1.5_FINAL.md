# [v1.1.5] ZENOHO MARKER REGISTRY v1.1.5 — PRODUCTION (FINAL)
## 62-Marker Indian Blood Panel + Performance Reference Database + Integrity Layer
### *Consolidated master document. All v1.0 + v1.1 + v1.1.5 changes merged. Production-ready.*

**Format:** Each marker is a self-contained section with 7 fixed fields. Database-importable.
**Philosophy:** Lab ranges flag disease. Zenoho Optimal flags performance. Zenoho Alert flags urgency.
**Foundational principle:** The Zenoho Health Score moves only when verified lab biology moves. (See INPUT INTEGRITY PROTOCOL below.)
**Rule of stricter value:** When sources conflict, the tighter range wins.
**Default population:** Adult Indian, 18–60, otherwise healthy. Modifiers applied per marker.

**[v1.1.5] changes from v1.1:**
- Added 15 new markers (#48–62) across 3 groups:
  - Group A — Indian standard panel: MCHC, RDW, Calcium, Globulin, ESR
  - Group B — Protocol-referenced: ApoB, Fasting Insulin, PTH, Cortisol AM, Anti-TPO
  - Group C — Indian-population critical: Magnesium RBC, Total/Free Testosterone (M), SHBG, DHEA-S
- **New System 10 — Hormones** (PTH, Cortisol, Testosterone Total, Testosterone Free, SHBG, DHEA-S)
- System 7 renamed: Vitamins → Vitamins/Minerals/Iron (now houses Magnesium RBC alongside existing markers)
- System weights rebalanced to sum exactly 100% (math verified)
- 3 new cross-marker rules (#13–15)
- 2 new Critical Safety Override Rules (#12 Calcium emergency, #13 Cortisol adrenal emergency)
- 3 new Lab Error Detection patterns (#23–25)

**v1.1 changes from v1.0 (preserved):**
- Added 4 new markers: Lp(a) (#44), hs-CRP (#45), Homocysteine (#46), Free T3 (#47)
- New System 9: Inflammation
- Tightened ranges on FBS, Albumin, GGT, Triglycerides, Ferritin
- Watch zone tier added between Optimal and Alert
- Updated scoring formula with normalised system weights
- Safety overrides, biotin interference, acute-phase confounders, sample timing, lab tiering, genetic locks
- 12 cross-marker rules seeded
- **Integrity layer added:** Input Integrity Protocol (preamble), Lab Error Detection (22 patterns), Report Authenticity Verification (Tier 1)
- **Fourth marker status:** `retest_required` (alongside optimal/watch/alert) for suspect lab values

---

## INPUT INTEGRITY PROTOCOL — Foundational Principle

> **The Zenoho Health Score moves only when verified lab biology moves.**

The score is a measurement, not a behaviour reward. It cannot be manipulated through claims, activity, food choices, mood, or any unverified input. The only way to change a Zenoho Score is to take a new verified lab test and have the new biology reflected in the panel.

This is intentional. Most "health platforms" inflate engagement by letting users log workouts, meals, water intake, and steps — and reward those logs with rising scores. The user feels good, the platform looks engaged, and **nothing changes in the actual biology**. When the user finally tests, the gap between platform-score and lab-reality damages trust permanently. Zenoho takes the harder path.

### Accepted Inputs for Scoring
| Input | Used in Score | Notes |
|---|---|---|
| Lab reports from Tier 1 NABL labs | YES | Primary input |
| Lab reports from Tier 2 labs | YES (with confidence downgrade) | Per Appendix 9 |
| Patient demographics (age, gender, nationality) | YES | Required for personalisation |
| Documented therapy (medications) | Context only — adjusts interpretation, not score | E.g. statin user's LDL target changes |
| Documented pregnancy / cycle phase | Context only — adjusts ranges | Trimester-specific TSH ranges |

### Never Accepted for Scoring
- Self-reported activity / workout logs
- Fitness tracker data (Fitbit, Apple Watch, Garmin, Oura, etc.)
- Food logs / dietary tracking
- Mood entries / wellness journaling
- Manual marker entry by user (typing values without uploaded report)
- User-edited lab values (any modification to imported data)
- Wearable CGM data (CGM informs coaching, not score; CGM ≠ HbA1c)
- Sleep tracking / HRV / stress scores
- Symptom questionnaires (used as context for cross-marker rules, never scored)
- Photos of test strips or paper reports (must be original PDF from lab portal)
- Forwarded reports without authenticity verification (see Authenticity Verification section)

### Communication to User
When a user logs activity/food/wearable data and asks why their score didn't change:

> *"Your activity is recorded — your score waits for biology. The Zenoho Score reflects what's measured in your blood, not what you tell us about your week. This is intentional. Everything you log helps us coach you between tests, and shows up in your trends — but only a new verified lab test moves your score."*

Full implementation rules, audit trail schema, and user-facing copy in **Appendix 16 — Input Integrity Protocol (Implementation)**.

---

**Key sources cited throughout:**
- ICMR-INDIAB (Indian Council of Medical Research – India Diabetes study)
- ESI 2025 Vitamin D Consensus (Endocrine Society of India, *Indian J Endocrinol Metab*)
- Lipid Association of India 2016 Lp(a) consensus
- AIIMS / JAPI / LAI population studies
- Peter Attia, *Outlive* (2023) + peterattiamd.com
- Institute for Functional Medicine (IFM) optimal ranges
- Life Extension Magazine reference guides
- Real lab reference intervals from House of Diagnostics (NABL-accredited, Delhi NCR)

**Field schema (7 sections per marker):**
1. IDENTITY — name, aliases, unit, conversions
2. THREE-TIER RANGES — Lab | Zenoho Optimal | Zenoho Watch | Zenoho Alert (with citation)
3. NATIONALITY MODIFIERS — IN | ME | UK/EU | US | Default
4. PERSONALISATION — Age (<18, 18–40, 40–60, 60+) and Gender (M, F)
5. SCORING — weight, calc method, system group
6. PLAIN ENGLISH — what it measures, what low/optimal feels like
7. ACTION PROTOCOL — supplement/action when below or above optimal, retest timeline

---

# [v1.1.5] SYSTEM 1: BLOOD COUNTS (14 markers)
*Note: MCHC (#48) and RDW (#49) added in v1.1.5; logically belong to this system alongside the original 12 CBC markers.*

---

## 1. HAEMOGLOBIN

**1. IDENTITY**
- Standard name: Haemoglobin
- Aliases (Indian labs): Hb, Hgb, HGB
- Unit: g/dL
- Conversion: g/dL × 10 = g/L

**2. THREE-TIER RANGES**
- Lab range (HOD/typical Indian lab): M 13.0–17.0 | F 12.0–15.0 g/dL
- Zenoho Optimal: M 14.5–16.0 | F 13.5–14.5 g/dL
- Zenoho Alert: <12.0 (M), <11.0 (F) — anaemia urgent | >17.5 (M), >16.0 (F) — polycythaemia workup
- Citation: WHO anaemia cut-offs; Attia (Outlive) flags performance below 14 in men. Optimal narrowed for endurance/cognition (LAI iron-deficiency studies on Indian women, *J Assoc Physicians India*).

**3. NATIONALITY MODIFIERS**
- IN: Use Optimal as written; deficiency epidemic — 53% women anaemic (NFHS-5)
- ME: Same as IN (high vegetarian + thalassaemia trait prevalence)
- UK/EU: Same Optimal
- US: Same Optimal
- Default: Use IN

**4. PERSONALISATION**
- <18: M 11.5–15.5 | F 11.5–15.5 lab; Optimal 13.0–14.5
- 18–40: as primary range
- 40–60: as primary range
- 60+: lower limit drops 0.5 g/dL (mild dilution acceptable)
- Gender: applied above

**5. SCORING**
- Weight in overall score: 8/100 (high — gates oxygen delivery)
- Calc method: linear distance from optimal midpoint, penalty doubled below alert
- System group: Oxygen Transport / Haematology

**6. PLAIN ENGLISH**
- Measures: oxygen-carrying protein in RBCs
- Low feels like: fatigue at low effort, breathlessness on stairs, cold hands/feet, brain fog, hair shedding, pale palms/inner eyelids
- Optimal feels like: stable energy through the day, can sustain Zone 2 cardio, sharp focus

**7. ACTION PROTOCOL**
- Below optimal: Iron bisglycinate 25 mg + Vitamin C 250 mg + Folate 400 mcg + B12 (methyl) 500 mcg, daily on empty stomach. If ferritin <30, escalate to 50 mg ferrous bisglycinate. Vegetarians: add lactoferrin 200 mg.
- Above optimal: Rule out dehydration first; if persistent, screen for sleep apnoea, smoking, polycythaemia vera (JAK2)
- Retest: 8–12 weeks after starting iron

---

## 2. RBC COUNT

**1. IDENTITY**
- Standard name: Red Blood Cell Count
- Aliases: Total RBC, Erythrocyte count
- Unit: million/µL (10⁶/µL)
- Conversion: million/µL × 10¹² = /L

**2. THREE-TIER RANGES**
- Lab range: M 4.5–5.5 | F 3.8–4.8 million/µL
- Zenoho Optimal: M 4.7–5.3 | F 4.2–4.7
- Zenoho Alert: <4.0 (M) or <3.8 (F); >6.0 either sex
- Citation: HOD lab interval; corroborated by AIIMS reference panel review

**3. NATIONALITY MODIFIERS**
- IN/ME: Use as written; thalassaemia trait common — interpret with MCV
- UK/EU/US: same
- Default: as above

**4. PERSONALISATION**
- <18: 4.0–5.2 (both sexes converge)
- 18–60: as primary
- 60+: lower bound −0.2

**5. SCORING**
- Weight: 3/100
- Calc method: companion marker to Hb; flagged only if extreme
- Group: Haematology

**6. PLAIN ENGLISH**
- Measures: number of red cells per microlitre
- Low feels like: same as anaemia (fatigue, breathless)
- Optimal feels like: not noticed in isolation — read alongside Hb and MCV

**7. ACTION PROTOCOL**
- Below optimal: paired with Hb — same iron/B12/folate protocol as Hb
- Above optimal: hydration check, then haemoglobin/HCT confirmation, then haematology referral if persistent
- Retest: 12 weeks

---

## 3. WBC / TLC (Total Leucocyte Count)

**1. IDENTITY**
- Standard name: White Blood Cell Count / Total Leucocyte Count
- Aliases: TLC, WBC, Leukocytes, Total WBC count
- Unit: ×10³/µL (thousand/µL)
- Conversion: ×10³/µL = ×10⁹/L (numerically identical)

**2. THREE-TIER RANGES**
- Lab range: 4.0–10.0 ×10³/µL
- Zenoho Optimal: 4.5–7.0
- Zenoho Alert: <3.5 (immune compromise) | >11.0 (active infection/inflammation)
- Citation: IFM functional range; "high-normal" WBC (>7.5) associated with all-cause mortality (Ruggiero et al., *Am J Cardiol* 2007)

**3. NATIONALITY MODIFIERS**
- IN: Indians often run lower baseline (4.5–6.5); this is normal, not deficient
- ME: same as IN
- UK/EU/US: optimal can extend to 7.5
- Default: IN

**4. PERSONALISATION**
- <18: 5.0–13.0 lab; optimal 5.5–9.0
- 18–60: as primary
- 60+: optimal narrows 4.5–6.5 (chronic inflammation suspected if higher)
- Gender: M and F same

**5. SCORING**
- Weight: 5/100
- Calc method: U-curve — penalty for both ends
- Group: Immune

**6. PLAIN ENGLISH**
- Measures: total infection-fighting cells
- Low feels like: frequent colds, slow wound healing, recurring infections
- Optimal feels like: rare illness, infections resolve in 2–3 days

**7. ACTION PROTOCOL**
- Below optimal: Zinc picolinate 15 mg + Vitamin C 1000 mg + Vitamin D (if low) + sleep audit. Rule out viral suppression (post-COVID, EBV)
- Above optimal: Identify infection source. If chronic, check hs-CRP and ferritin for inflammation. Anti-inflammatory diet (curcumin 500 mg + omega-3 2g/d)
- Retest: 6 weeks; sooner if symptomatic

---

## 4. PLATELET COUNT

**1. IDENTITY**
- Standard name: Platelet Count
- Aliases: PLT, Thrombocyte count
- Unit: ×10³/µL
- Conversion: ×10³/µL = ×10⁹/L

**2. THREE-TIER RANGES**
- Lab range: 150–410 ×10³/µL
- Zenoho Optimal: 200–300
- Zenoho Alert: <100 (bleed risk) | >450 (thrombocytosis — clot/inflammation)
- Citation: HOD lab; functional medicine narrows to 200–300 (Lamkin Clinic guides; Optimal DX)

**3. NATIONALITY MODIFIERS**
- IN: dengue endemic — drop on infection is normal, recheck in 1 week
- ME: same
- UK/EU/US: same optimal
- Default: as above

**4. PERSONALISATION**
- <18: 150–450; optimal 220–320
- 18–60: as primary
- 60+: lower limit 140 acceptable
- Gender: F may run slightly higher pre-menses

**5. SCORING**
- Weight: 4/100
- Calc method: U-curve; alert flags weighted 2×
- Group: Haematology / Coagulation

**6. PLAIN ENGLISH**
- Measures: clotting cells
- Low feels like: easy bruising, bleeding gums, heavy periods
- Optimal feels like: bruising only with real impact

**7. ACTION PROTOCOL**
- Below optimal: Vitamin K2 (MK-7) 100 mcg + B12 + folate; rule out ITP, dengue, hypersplenism
- Above optimal: Check inflammation markers (CRP, ferritin); hydration; iron deficiency paradoxically raises platelets — fix iron first
- Retest: 4–6 weeks

---

## 5. NEUTROPHILS (% and Absolute)

**1. IDENTITY**
- Standard name: Neutrophils
- Aliases: PMN, Polymorphs, Segs
- Unit: % of WBC; Absolute Neutrophil Count (ANC) in ×10³/µL
- Conversion: ANC = (Neutrophil % × WBC) / 100

**2. THREE-TIER RANGES**
- Lab range: 40–80% | ANC 2.0–7.5
- Zenoho Optimal: 50–65% | ANC 2.5–5.0
- Zenoho Alert: ANC <1.5 (immune-compromised) | >8.0 (acute bacterial)
- Citation: IFM optimal; AIIMS haematology reference

**3. NATIONALITY MODIFIERS**
- IN: Benign Ethnic Neutropenia rare in Indians (more in African ancestry); use defaults
- ME: same
- UK/EU: same
- US: African-ancestry users — lower bound ANC 1.2 acceptable
- Default: above

**4. PERSONALISATION**
- <18: ANC 1.5–8.0
- 18–60: as primary
- 60+: same
- Gender: same

**5. SCORING**
- Weight: 3/100
- Calc method: ratio with lymphocytes (NLR) — composite score
- Group: Immune

**6. PLAIN ENGLISH**
- Measures: first-responder bacterial fighters
- Low feels like: recurrent bacterial infections, mouth ulcers
- Optimal feels like: nothing specific — best read with NLR

**7. ACTION PROTOCOL**
- Below optimal: B12, folate, copper check; rule out viral suppression
- Above optimal: Look for active infection or stress (cortisol surge raises neutrophils). Manage stress + sleep
- Retest: 4 weeks

---

## 6. LYMPHOCYTES (% and Absolute)

**1. IDENTITY**
- Standard name: Lymphocytes
- Aliases: Lymphs
- Unit: %; Absolute Lymphocyte Count (ALC) in ×10³/µL

**2. THREE-TIER RANGES**
- Lab range: 20–40% | ALC 1.0–4.0
- Zenoho Optimal: 28–38% | ALC 1.8–3.0
- Zenoho Alert: ALC <1.0 (immune-suppressed) | >4.5 (viral/leukaemia workup)
- Citation: Optimal DX functional ranges; Indian post-COVID studies show low lymphocytes correlate with long-COVID

**3. NATIONALITY MODIFIERS**
- All regions: same
- IN-specific: post-COVID and post-dengue suppression common; allow 8 weeks recovery before flagging

**4. PERSONALISATION**
- <18: 25–50% (children run higher)
- 18–60: primary
- 60+: ALC tends lower; allow 1.2 lower bound

**5. SCORING**
- Weight: 4/100
- Calc method: NLR (Neutrophil/Lymphocyte ratio) — optimal NLR 1.0–2.0
- Group: Immune

**6. PLAIN ENGLISH**
- Measures: viral-fighting and adaptive immune cells
- Low feels like: lingering viral infections, slow recovery
- Optimal feels like: short illness duration, robust vaccine response

**7. ACTION PROTOCOL**
- Below optimal: Vitamin D (target 40–60 ng/mL), Zinc 15 mg, Vitamin C 1g, sleep ≥7h, colostrum/lactoferrin
- Above optimal: Viral panel (EBV, CMV); if ALC >5, haematology workup
- Retest: 6 weeks

---

## 7. MONOCYTES (% and Absolute)

**1. IDENTITY**
- Standard name: Monocytes
- Aliases: Mono
- Unit: %; Absolute Monocyte Count (AMC) in ×10³/µL

**2. THREE-TIER RANGES**
- Lab range: 2–10% | AMC 0.2–1.0
- Zenoho Optimal: 4–7% | AMC 0.3–0.6
- Zenoho Alert: >12% (chronic inflammation, TB, autoimmune)
- Citation: HOD; tuberculosis-endemic India — JAPI flags persistently high monocytes

**3. NATIONALITY MODIFIERS**
- IN: TB screening trigger if persistently >10% (high-risk population)
- ME: similar
- UK/EU/US: less weight on TB screening

**4. PERSONALISATION**
- <18: 2–10%
- 18–60: primary
- 60+: same

**5. SCORING**
- Weight: 2/100
- Calc method: linear penalty above 8%
- Group: Immune / Inflammation

**6. PLAIN ENGLISH**
- Measures: cleanup crew immune cells
- Low feels like: rarely symptomatic
- Optimal feels like: no specific feel

**7. ACTION PROTOCOL**
- Below optimal: rare; assess chronic bacterial infection
- Above optimal: Rule out chronic inflammation, latent TB (if Indian), parasitic infection. Run hs-CRP. Anti-inflammatory protocol (curcumin, omega-3)
- Retest: 8 weeks

---

## 8. EOSINOPHILS (% and Absolute)

**1. IDENTITY**
- Standard name: Eosinophils
- Aliases: Eos
- Unit: %; Absolute Eosinophil Count (AEC) in ×10³/µL

**2. THREE-TIER RANGES**
- Lab range: 1–6% | AEC 0.02–0.5
- Zenoho Optimal: 1–3% | AEC 0.05–0.25
- Zenoho Alert: AEC >0.5 (allergy/parasite/eosinophilic syndrome)
- Citation: HOD; ICMR parasitic disease prevalence — eosinophilia very common in India (deworm before flagging chronic disease)

**3. NATIONALITY MODIFIERS**
- IN: 5–10% prevalent due to parasitic load — empirical deworming first
- ME: similar
- UK/EU/US: AEC >0.5 prompts allergy workup directly
- Default: IN

**4. PERSONALISATION**
- <18: AEC up to 0.7 in children
- 18–60: primary
- 60+: same

**5. SCORING**
- Weight: 2/100
- Group: Immune / Allergy

**6. PLAIN ENGLISH**
- Measures: allergy and parasite-fighting cells
- Optimal feels like: no chronic allergic symptoms (rhinitis, eczema, asthma)
- High feels like: itchy skin, persistent runny nose, asthma flare

**7. ACTION PROTOCOL**
- Below optimal: not clinically significant
- Above optimal (AEC >0.5): IN — empirical Albendazole 400 mg single dose + retest in 3 weeks. If still high → allergy panel, stool O&P, IgE
- Retest: 3 weeks post-deworming

---

## 9. BASOPHILS (% and Absolute)

**1. IDENTITY**
- Standard name: Basophils
- Aliases: Baso
- Unit: %; Absolute count ×10³/µL

**2. THREE-TIER RANGES**
- Lab range: 0–1% | 0.0–0.3 ×10³/µL
- Zenoho Optimal: 0–1%
- Zenoho Alert: >2% (CML/myeloproliferative workup)
- Citation: HOD; standard haematology references

**3. NATIONALITY MODIFIERS**
- All regions: same

**4. PERSONALISATION**
- All ages and genders: same

**5. SCORING**
- Weight: 1/100
- Group: Immune (rarely actionable)

**6. PLAIN ENGLISH**
- Measures: rare allergy/inflammation cells
- Low/optimal: no specific feel
- High: chronic allergy, rare blood disorders

**7. ACTION PROTOCOL**
- Below optimal: not significant
- Above optimal: persistent >2% → haematology referral (CML screen)
- Retest: 8 weeks

---

## 10. HAEMATOCRIT / PCV

**1. IDENTITY**
- Standard name: Haematocrit / Packed Cell Volume
- Aliases: Hct, PCV, Crit
- Unit: %
- Conversion: % ÷ 100 = decimal fraction (L/L)

**2. THREE-TIER RANGES**
- Lab range: M 40–50% | F 36–46%
- Zenoho Optimal: M 43–48% | F 38–43%
- Zenoho Alert: <35 (M), <33 (F) | >52 (M), >48 (F)
- Citation: HOD; corroborated WHO

**3. NATIONALITY MODIFIERS**
- All regions: same as written

**4. PERSONALISATION**
- <18: 35–45%
- 18–60: primary
- 60+: lower bound −2%
- Gender: applied above

**5. SCORING**
- Weight: 3/100
- Calc method: composite with Hb
- Group: Haematology

**6. PLAIN ENGLISH**
- Measures: % of blood that is RBCs (concentration)
- Low: same as anaemia symptoms
- High: thick blood, headache, dizziness, dehydration symptoms
- Optimal: nothing specific — pairs with Hb

**7. ACTION PROTOCOL**
- Below optimal: iron + B12 protocol (same as Hb)
- Above optimal: hydrate aggressively, recheck. If sustained → smoking, sleep apnoea, polycythaemia screen
- Retest: 8 weeks

---

## 11. MCV (Mean Corpuscular Volume)

**1. IDENTITY**
- Standard name: Mean Corpuscular Volume
- Aliases: MCV
- Unit: fL (femtolitres)

**2. THREE-TIER RANGES**
- Lab range: 83–101 fL
- Zenoho Optimal: 88–95 fL
- Zenoho Alert: <80 (microcytic — iron def or thalassaemia) | >100 (macrocytic — B12/folate def)
- Citation: AIIMS thalassaemia screening guidelines; IFM optimal range

**3. NATIONALITY MODIFIERS**
- IN: Mentzer Index (MCV/RBC) <13 → thalassaemia trait. >13 + low MCV → iron deficiency. India has 3–4% beta-thalassaemia trait carriers
- ME: same — high carrier rate
- UK/EU: thalassaemia screening as above
- US: lower carrier rate but same workup
- Default: IN

**4. PERSONALISATION**
- <18: 75–95 fL (ramps up with age)
- 18–60: primary
- 60+: same

**5. SCORING**
- Weight: 4/100 (high diagnostic value)
- Calc method: paired with Mentzer index for IN users
- Group: Haematology / RBC indices

**6. PLAIN ENGLISH**
- Measures: average size of red cells — small (iron) vs large (B12)
- Low feels like: paired with iron deficiency symptoms (fatigue)
- High feels like: paired with B12 deficiency (neuropathy, brain fog)
- Optimal feels like: balanced micronutrient status

**7. ACTION PROTOCOL**
- MCV <80: Iron protocol (see Hb #1). Confirm Mentzer index — if <13, order Hb electrophoresis to rule out thalassaemia (especially in IN/ME users)
- MCV >100: B12 (methylcobalamin 1000 mcg sublingual) + Methylfolate 800 mcg. Rule out alcohol, hypothyroidism
- Retest: 8 weeks

---

## 12. MCH (Mean Corpuscular Haemoglobin)

**1. IDENTITY**
- Standard name: Mean Corpuscular Haemoglobin
- Aliases: MCH
- Unit: pg (picograms)

**2. THREE-TIER RANGES**
- Lab range: 27–32 pg
- Zenoho Optimal: 28–31 pg
- Zenoho Alert: <26 (definite hypochromia) | >34 (macrocytosis)
- Citation: HOD lab; supports MCV interpretation

**3. NATIONALITY MODIFIERS**
- IN/ME: low MCH + low MCV → strongly iron def or thalassaemia. Test ferritin to differentiate.
- All other regions: same

**4. PERSONALISATION**
- <18: 25–32
- 18–60: primary
- 60+: same

**5. SCORING**
- Weight: 2/100 (companion to MCV)
- Calc method: composite with MCV
- Group: Haematology

**6. PLAIN ENGLISH**
- Measures: average haemoglobin per red cell
- Low: pairs with iron deficiency symptoms
- High: pairs with macrocytic anaemia symptoms
- Optimal: nothing specific in isolation

**7. ACTION PROTOCOL**
- Low: iron + ferritin workup (same as Hb)
- High: B12 + folate (same as MCV)
- Retest: 8 weeks

---

# [v1.1.5] SYSTEM 2: GLUCOSE / METABOLIC (4 markers — FBS, HbA1c, HOMA-IR, + Fasting Insulin)
*Note: Fasting Insulin (#54) added in v1.1.5; provides the standalone insulin reading from which HOMA-IR is calculated, but valuable on its own.*

---

## 13. FASTING BLOOD SUGAR

**1. IDENTITY**
- Standard name: Fasting Plasma Glucose
- Aliases: FBS, FPG, Glucose Fasting, Sugar Fasting
- Unit: mg/dL
- Conversion: mg/dL × 0.0555 = mmol/L

**2. THREE-TIER RANGES**
- Lab range: 70–100 mg/dL (normal); 100–125 (prediabetes); ≥126 (diabetes)
- Zenoho Optimal: 75–88 mg/dL
- Zenoho Watch zone: 88–100 mg/dL
- Zenoho Alert: <60 (hypoglycaemia) | >100 (insulin resistance brewing) | >125 (diabetes confirmation)
- Citation: Attia targets <87 mg/dL specifically (*Outlive* + podcast); Indian insulin resistance manifests at FBS 88–95 well before WHO/ADA cutoffs (Mohan et al., MDRF); ICMR-INDIAB

**3. NATIONALITY MODIFIERS**
- IN: South Asians develop insulin resistance at lower BMI/glucose — keep optimal stricter (75–90)
- ME: same as IN (Gulf-Asian populations)
- UK/EU: optimal 75–95 acceptable
- US: optimal 75–95
- Default: IN

**4. PERSONALISATION**
- <18: optimal 70–90
- 18–40: 75–90
- 40–60: 75–92 (slight age drift)
- 60+: 80–95
- Gender: same

**5. SCORING**
- Weight: 9/100 (very high — gates metabolic health)
- Calc method: paired with HbA1c and HOMA-IR for composite "Metabolic Score"
- Group: Glucose / Metabolic

**6. PLAIN ENGLISH**
- Measures: blood sugar after 8–12h fast
- Low feels like: shaky, hangry, brain fog before breakfast
- Optimal feels like: stable mood and energy on waking, no breakfast urgency

**7. ACTION PROTOCOL**
- Below optimal (<70): rule out reactive hypoglycaemia, eat protein within 30 min of waking. If recurrent → adrenal/cortisol panel
- Above optimal (>92): Berberine 500 mg ×3/d OR Inositol (Myo + D-chiro 40:1) 4g/d + Magnesium glycinate 400 mg + Chromium picolinate 200 mcg. Walk 10 min after each meal. CGM (continuous glucose monitor) trial for 14 days
- Retest: 8 weeks

---

## 14. HbA1c (Glycated Haemoglobin)

**1. IDENTITY**
- Standard name: Glycated Haemoglobin
- Aliases: HbA1C, A1c, Glycohaemoglobin
- Unit: % (NGSP); also reported as mmol/mol (IFCC)
- Conversion: NGSP% to mmol/mol = (HbA1c% − 2.15) × 10.929

**2. THREE-TIER RANGES**
- Lab range: 4.8–5.7% (normal); 5.7–6.4 (prediabetes); ≥6.5 (diabetes)
- Zenoho Optimal: 4.8–5.4%
- Zenoho Alert: <4.5 (hypoglycaemia/anaemia interference) | >5.7 (prediabetes) | >6.5 (diabetes)
- Citation: Attia targets <5.5%, ideal 5.1%; Asian-Indian Mohan study suggests cut-off 6.1% for IN; ICMR-INDIAB

**3. NATIONALITY MODIFIERS**
- IN: South Asian "thin-fat" phenotype — keep stricter optimal 4.8–5.4
- ME: same as IN
- UK/EU: 4.8–5.5 acceptable
- US: 4.8–5.5
- Default: IN

**4. PERSONALISATION**
- <18: optimal 4.8–5.4
- 18–40: 4.8–5.3
- 40–60: 4.8–5.4
- 60+: 5.0–5.6 (some upward drift acceptable; not in IN diabetics)
- Gender: same; pregnancy uses different cut-offs

**5. SCORING**
- Weight: 10/100 (highest — 90-day glucose record)
- Calc method: weighted into Metabolic Score; > 5.7 doubles penalty
- Group: Glucose / Metabolic

**6. PLAIN ENGLISH**
- Measures: average blood sugar over the last 90 days
- High feels like: thirsty, more bathroom trips, slow wound healing, blurry vision
- Optimal feels like: stable energy, no afternoon crashes

**7. ACTION PROTOCOL**
- Below optimal (<4.5): rule out anaemia interference; HbA1c may underread with shortened RBC lifespan
- Above optimal (>5.4): Same protocol as fasting glucose + add walking 8–10k steps/d, prioritise protein at breakfast (30g), eliminate liquid sugars. Retest in 12 weeks (HbA1c is a 90-day lagging indicator — don't retest sooner)
- Retest: 12 weeks minimum

---

## 15. HOMA-IR (Insulin Resistance Index)

**1. IDENTITY**
- Standard name: Homeostatic Model Assessment for Insulin Resistance
- Aliases: HOMA-IR, Insulin Resistance Index
- Unit: dimensionless ratio
- Calculation: (Fasting Insulin µIU/mL × Fasting Glucose mg/dL) / 405

**2. THREE-TIER RANGES**
- Lab range: <2.5 (normal); 2.5–3.4 (early IR); >3.4 (significant IR)
- Zenoho Optimal: <1.5
- Zenoho Alert: >2.0 (start protocol) | >3.5 (insulin resistance confirmed)
- Citation: Attia (Outlive) targets <1.5; AIIMS/Madras Diabetes Research Foundation studies show Indians develop IR at HOMA 1.8–2.2

**3. NATIONALITY MODIFIERS**
- IN: South Asians have higher fasting insulin at same BMI — keep <1.5 optimal
- ME: same as IN
- UK/EU: <2.0 acceptable
- US: <2.0 acceptable
- Default: IN

**4. PERSONALISATION**
- <18: <2.0 (puberty raises naturally)
- 18–40: <1.5
- 40–60: <1.5
- 60+: <2.0 (slight age drift)
- Gender: F may run lower; PCOS users keep <1.0

**5. SCORING**
- Weight: 8/100
- Calc method: feeds into Metabolic Score; gates "early warning" alerts before HbA1c rises
- Group: Glucose / Metabolic

**6. PLAIN ENGLISH**
- Measures: how hard the pancreas is working to keep glucose normal
- High feels like: belly fat that won't shift, cravings 2h after meals, energy crashes, skin tags, dark patches at neck/armpits (acanthosis nigricans)
- Optimal feels like: stable cravings, easy fat loss, sustained energy

**7. ACTION PROTOCOL**
- Above optimal (>1.5): Inositol (Myo+D-chiro 40:1) 4g/d + Berberine 500 mg ×3/d + Magnesium glycinate 400 mg + 10–15min walk after meals + Time-restricted eating (10h window). Resistance training 3×/week (most effective single intervention)
- Retest: 12 weeks (paired with fasting insulin + glucose)

---

# [v1.1.5] SYSTEM 3: LIVER (8 markers — ALT, AST, ALP, GGT, Bilirubin, Total Protein, Albumin, + Globulin)
*Note: Globulin (#51) added in v1.1.5; calculated as Total Protein − Albumin.*

---

## 16. SGPT / ALT

**1. IDENTITY**
- Standard name: Alanine Aminotransferase
- Aliases: SGPT, ALT, Serum Glutamic-Pyruvic Transaminase
- Unit: U/L (IU/L)

**2. THREE-TIER RANGES**
- Lab range: M up to 50 | F up to 35 U/L (typical Indian lab: <45 unisex)
- Zenoho Optimal: M 10–25 | F 8–20 U/L
- Zenoho Alert: >40 (early NAFLD signal) | >2× ULN (acute hepatitis workup)
- Citation: Attia flags ALT >25 in men; Prati et al. (*Ann Intern Med* 2002) propose true upper limit 30 (M)/19 (F); IFM optimal mirrors this

**3. NATIONALITY MODIFIERS**
- IN: NAFLD prevalence 30–35% in urban Indians (LAI/JAPI); keep stricter optimal
- ME: highest global NAFLD rates — same as IN
- UK/EU: ULN ~30 acceptable
- US: ULN ~30 acceptable
- Default: IN

**4. PERSONALISATION**
- <18: <25 (both sexes)
- 18–40: M ≤25, F ≤20
- 40–60: same
- 60+: same
- Gender: F runs naturally lower

**5. SCORING**
- Weight: 6/100
- Calc method: ALT/AST ratio used as fatty-liver flag (ALT > AST suggests NAFLD)
- Group: Liver

**6. PLAIN ENGLISH**
- Measures: liver cell damage — leaks out when liver hurts
- High feels like: usually silent until severe; possible right-upper-quadrant heaviness, fatigue, brain fog
- Optimal feels like: clean digestion, stable energy, no alcohol intolerance

**7. ACTION PROTOCOL**
- Above optimal (>25 M / >20 F): Reduce alcohol, fructose (HFCS, sweet drinks), refined carbs. Supplements: Choline 500 mg, Inositol 1g, Milk thistle (silymarin) 200 mg, Berberine 500 mg ×2. If >50, ultrasound liver + Hep B/C panel. NAFLD reversal protocol — drop visceral fat 5–7%
- Retest: 12 weeks

---

## 17. SGOT / AST

**1. IDENTITY**
- Standard name: Aspartate Aminotransferase
- Aliases: SGOT, AST, Serum Glutamic-Oxaloacetic Transaminase
- Unit: U/L

**2. THREE-TIER RANGES**
- Lab range: up to 40 U/L
- Zenoho Optimal: 10–25 U/L
- Zenoho Alert: >40 | AST/ALT ratio >2 (alcoholic liver suspect)
- Citation: same as ALT (Prati, IFM)

**3. NATIONALITY MODIFIERS**
- All regions: same Optimal
- IN: alcohol-related rises common in middle-aged urban men

**4. PERSONALISATION**
- <18: <30
- 18–60: as primary
- 60+: same
- Gender: F slightly lower

**5. SCORING**
- Weight: 4/100 (paired with ALT)
- Calc method: AST/ALT ratio
- Group: Liver

**6. PLAIN ENGLISH**
- Measures: enzyme present in liver, heart, muscles — leaks when damaged
- Key context: rises after intense exercise (rhabdo) or muscle injury — interpret with CK if isolated rise

**7. ACTION PROTOCOL**
- Above optimal: Same NAFLD protocol as ALT. If AST/ALT >2 → alcohol audit (consider GGT). If isolated AST elevation, check muscle (CK)
- Retest: 12 weeks

---

## 18. ALKALINE PHOSPHATASE (ALP)

**1. IDENTITY**
- Standard name: Alkaline Phosphatase
- Aliases: ALP, Alk Phos
- Unit: U/L

**2. THREE-TIER RANGES**
- Lab range: 40–129 U/L (adult)
- Zenoho Optimal: 50–95 U/L
- Zenoho Alert: <40 (zinc/B6 deficiency, hypothyroid) | >130 (bile/bone pathology)
- Citation: Indian endocrine reviews flag low ALP as zinc-deficiency proxy; IFM optimal narrows to 50–95

**3. NATIONALITY MODIFIERS**
- IN: vegetarian diet → zinc/B6 commonly low → ALP often low-end
- ME: similar
- UK/EU/US: standard

**4. PERSONALISATION**
- <18: 100–400 (high in growth)
- 18–60: as primary
- 60+: upper limit naturally drifts higher (140 acceptable in F post-menopause due to bone turnover)
- Gender: pregnancy doubles ALP normally

**5. SCORING**
- Weight: 3/100
- Calc method: U-curve
- Group: Liver / Bone

**6. PLAIN ENGLISH**
- Measures: enzyme in liver and bone — flags bile flow or bone turnover
- Low feels like: stalled wound healing, hair fall, immune weakness (zinc-related)
- High: bile duct obstruction, vitamin D deficiency causing bone turnover, bone disease

**7. ACTION PROTOCOL**
- Below optimal: Zinc picolinate 15 mg + B6 (P5P) 25 mg + protein audit
- Above optimal: Check bilirubin and GGT. If bone source — recheck Vit D, calcium, PTH. Imaging if persistent
- Retest: 8 weeks

---

## 19. GGT (Gamma-Glutamyl Transferase)

**1. IDENTITY**
- Standard name: Gamma-Glutamyl Transferase
- Aliases: GGT, GGTP, Gamma-GT
- Unit: U/L

**2. THREE-TIER RANGES**
- Lab range: M up to 60 | F up to 40 U/L
- Zenoho Optimal: M <20 | F <20 (unified — same target across sexes)
- Zenoho Watch zone: 20–25 U/L
- Zenoho Alert: >25 (oxidative stress signal) | >40 (alcohol/liver workup) | >100 (urgent)
- Citation: Strasak et al. (*Cancer* 2008) — mortality signal begins at GGT >25; performance zone is <20 for both sexes (Attia uses GGT as canary); Whitfield (*Crit Rev Clin Lab Sci* 2001)

**3. NATIONALITY MODIFIERS**
- IN: GGT highly responsive to alcohol — useful screen in male executives
- ME: alcohol prevalence varies; air pollution (Delhi, Riyadh) raises GGT independently
- UK/EU: same optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: <20
- 18–60: as primary
- 60+: lower bound narrows (oxidative stress climbs)
- Gender: F naturally lower

**5. SCORING**
- Weight: 5/100 (under-rated marker)
- Calc method: linear penalty above 25
- Group: Liver / Oxidative Stress

**6. PLAIN ENGLISH**
- Measures: detox-stress enzyme — flags alcohol, toxin, fatty liver, oxidative load
- High feels like: hangover-ish even sober, slow recovery, brain fog
- Optimal feels like: tolerate one drink without next-day cost; clean detox

**7. ACTION PROTOCOL**
- Above optimal: NAC 600 mg ×2/d, Glycine 3g/d, Milk thistle 200 mg, Curcumin 500 mg, alcohol cut to <3 drinks/week, address sleep/pollution exposure (HEPA at home if Delhi/NCR)
- Retest: 8 weeks

---

## 20. TOTAL BILIRUBIN

**1. IDENTITY**
- Standard name: Total Bilirubin
- Aliases: T. Bili, TBIL
- Unit: mg/dL
- Conversion: mg/dL × 17.1 = µmol/L

**2. THREE-TIER RANGES**
- Lab range: 0.2–1.2 mg/dL
- Zenoho Optimal: 0.4–1.0 mg/dL
- Zenoho Alert: <0.2 (low antioxidant reserve) | >1.5 (Gilbert's vs hepatic vs haemolytic)
- Citation: Indian Gilbert's syndrome prevalence ~5%; bilirubin is a useful endogenous antioxidant — too low is suboptimal (Vitek, *Front Pharmacol* 2012)

**3. NATIONALITY MODIFIERS**
- IN: Gilbert's common — total bilirubin 1.2–2.5 with normal LFT often benign
- All others: same

**4. PERSONALISATION**
- <18: 0.3–1.2
- 18–60: as primary
- 60+: same
- Gender: M slightly higher

**5. SCORING**
- Weight: 2/100
- Calc method: U-curve (low and high both flagged)
- Group: Liver

**6. PLAIN ENGLISH**
- Measures: heme breakdown product — yellow pigment
- High feels like: yellow eyes/skin (jaundice), dark urine, fatigue
- Low feels like: nothing specific (slightly higher oxidative stress)
- Optimal feels like: clean LFT, healthy bowel transit

**7. ACTION PROTOCOL**
- Above optimal: Direct vs indirect split. Indirect-only + normal LFT = Gilbert's → no treatment, monitor. Direct >0.4 → bile flow/hepatocyte workup
- Below optimal: rare; correct anaemia if present
- Retest: 12 weeks

---

## 21. TOTAL PROTEIN

**1. IDENTITY**
- Standard name: Serum Total Protein
- Aliases: T. Protein, Total Protein
- Unit: g/dL
- Conversion: g/dL × 10 = g/L

**2. THREE-TIER RANGES**
- Lab range: 6.0–8.3 g/dL
- Zenoho Optimal: 6.8–7.6 g/dL
- Zenoho Alert: <6.0 (malnutrition/liver) | >8.5 (myeloma/dehydration screen)
- Citation: HOD lab; IFM functional optimal narrows midrange

**3. NATIONALITY MODIFIERS**
- IN: vegetarian users often lower-end — protein audit critical
- All others: same

**4. PERSONALISATION**
- <18: 6.0–8.0
- 18–60: as primary
- 60+: lower bound 6.4 (sarcopaenia caution)
- Gender: same

**5. SCORING**
- Weight: 3/100
- Calc method: paired with albumin (albumin is the actionable subset)
- Group: Liver / Nutrition

**6. PLAIN ENGLISH**
- Measures: total proteins (albumin + globulins) in blood
- Low feels like: poor recovery, hair fall, muscle loss, oedema
- Optimal feels like: stable muscle mass, fast wound healing

**7. ACTION PROTOCOL**
- Below optimal: Protein intake audit (target 1.6–2.0 g/kg body weight). Whey isolate or vegetarian blend (pea+rice). Rule out protein loss (urine protein, gut)
- Above optimal: Globulin spike check → SPEP if persistent
- Retest: 8 weeks

---

## 22. ALBUMIN

**1. IDENTITY**
- Standard name: Serum Albumin
- Aliases: Alb
- Unit: g/dL
- Conversion: g/dL × 10 = g/L

**2. THREE-TIER RANGES**
- Lab range: 3.5–5.0 g/dL
- Zenoho Optimal: 4.4–5.0 g/dL
- Zenoho Watch zone: 4.0–4.4 g/dL
- Zenoho Alert: <3.8 (mortality signal — not just <3.5) | <3.5 (urgent) | >5.2 (dehydration)
- Citation: Goldwasser & Feldman (*J Clin Epidemiol* 1997) — all-cause mortality rises **linearly** below albumin 4.5; Attia treats <4.0 as longevity flag and pushes 4.4+ as performance target

**3. NATIONALITY MODIFIERS**
- IN: vegetarian users — keep optimal stricter
- ME: similar
- UK/EU/US: same optimal
- Default: IN

**4. PERSONALISATION**
- <18: 3.8–5.4
- 18–40: 4.3–5.0
- 40–60: 4.2–5.0
- 60+: 4.0–4.8 (slight age decline)
- Gender: same

**5. SCORING**
- Weight: 6/100 (high — best single liver+nutrition+inflammation marker)
- Calc method: linear penalty below 4.3; doubled below 4.0
- Group: Liver / Nutrition / Inflammation composite

**6. PLAIN ENGLISH**
- Measures: main blood protein; reflects liver synthesis, nutrition, inflammation
- Low feels like: oedema (puffy ankles/face), poor recovery, frequent illness, brain fog
- Optimal feels like: high resilience, fast recovery, lean muscle retention

**7. ACTION PROTOCOL**
- Below optimal: Protein 1.8–2.2 g/kg/d, vitamin C 500 mg, omega-3 2g/d. Rule out chronic inflammation (hs-CRP), kidney loss (urine albumin), liver synthesis issue (PT/INR)
- Above optimal: usually dehydration — recheck after hydration
- Retest: 8 weeks

---

# [v1.1.5] SYSTEM 4: KIDNEY / BONE-MINERAL (9 markers — Creatinine, eGFR, BUN, Uric Acid, Na, K, Cl, Phosphorus, + Calcium)
*Note: Calcium entry appears at Marker 50 (added in v1.1.5) and logically belongs to this system, anchoring the kidney-bone-mineral axis.*

---

## 23. CREATININE

**1. IDENTITY**
- Standard name: Serum Creatinine
- Aliases: Creat, S. Creatinine
- Unit: mg/dL
- Conversion: mg/dL × 88.4 = µmol/L

**2. THREE-TIER RANGES**
- Lab range: M 0.7–1.3 | F 0.6–1.1 mg/dL
- Zenoho Optimal: M 0.8–1.1 | F 0.65–0.95 (depends on muscle mass)
- Zenoho Alert: >1.3 (M)/>1.1 (F) → CKD workup; <0.6 in muscular adult — possible muscle loss
- Citation: KDIGO; muscle-mass adjusted (Attia notes athletes naturally run high creatinine — interpret with cystatin C if borderline)

**3. NATIONALITY MODIFIERS**
- IN: lower average muscle mass means lower true creatinine — adjust optimal down
- ME: similar
- UK/EU: 0.7–1.2 acceptable
- US: 0.7–1.3
- Default: IN

**4. PERSONALISATION**
- <18: 0.4–1.0
- 18–60: as primary
- 60+: 0.7–1.3 (muscle decline raises false reassurance)
- Gender: applied above

**5. SCORING**
- Weight: 5/100 (creatinine itself — eGFR is the actionable derivative)
- Calc method: feeds into eGFR; alone has limited use
- Group: Kidney

**6. PLAIN ENGLISH**
- Measures: muscle waste byproduct cleared by kidneys
- High feels like: usually silent until advanced; possible swelling, fatigue, urine changes
- Optimal feels like: clean kidney function, no oedema

**7. ACTION PROTOCOL**
- Above optimal: Hydrate, recheck after 1 week. If sustained: urine ACR (albumin/creatinine ratio), cystatin C, kidney ultrasound. Avoid NSAIDs. Reduce protein only if CKD stage 3+
- Below optimal: muscle-loss workup (DEXA scan, protein intake)
- Retest: 6 weeks

---

## 24. eGFR (Estimated Glomerular Filtration Rate)

**1. IDENTITY**
- Standard name: Estimated Glomerular Filtration Rate
- Aliases: eGFR, GFR
- Unit: mL/min/1.73 m²
- Calculation: CKD-EPI 2021 equation (race-free)

**2. THREE-TIER RANGES**
- Lab range: >90 normal; 60–89 mild ↓; 30–59 moderate; <30 severe
- Zenoho Optimal: >90 (under 60); >75 (60+)
- Zenoho Alert: 60–89 sustained → confirm with cystatin C-based eGFR | <60 = CKD stage 3
- Citation: KDIGO 2024; CKD-EPI 2021

**3. NATIONALITY MODIFIERS**
- IN: Indian CKD prevalence rising — early flag at 80–90 in <40 age group
- ME: similar
- UK/EU/US: same
- Default: IN

**4. PERSONALISATION**
- <18: not standard — paediatric formulas
- 18–40: >90
- 40–60: >85
- 60+: >75
- Gender: built into formula

**5. SCORING**
- Weight: 7/100
- Calc method: linear; below 90 starts mild penalty, doubles below 75
- Group: Kidney

**6. PLAIN ENGLISH**
- Measures: how well kidneys filter waste
- High/optimal feels like: clean labs, normal urine output
- Low feels like: silent until <30 — then fatigue, oedema, loss of appetite

**7. ACTION PROTOCOL**
- Below optimal (60–89): Urine ACR + cystatin C. Hydrate (3L/d), reduce salt, control BP <120/80, avoid NSAIDs/contrast. If diabetic — SGLT2 inhibitor with physician
- <60 sustained: Nephrology referral
- Retest: 6 weeks

---

## 25. BLOOD UREA / BUN

**1. IDENTITY**
- Standard name: Blood Urea Nitrogen
- Aliases: BUN, Urea, S. Urea, Blood Urea
- Unit: mg/dL (Indian labs report Urea: divide by 2.14 to get BUN)

**2. THREE-TIER RANGES**
- Lab range: BUN 7–20 mg/dL (Urea 15–43)
- Zenoho Optimal: BUN 10–17 (Urea 21–36)
- Zenoho Alert: <6 (low protein/liver) | >25 (kidney/dehydration/high-protein excess)
- Citation: Indian lab refs; functional optimal mid-range

**3. NATIONALITY MODIFIERS**
- IN: vegetarian users often low-end (low protein) — flag with albumin
- All regions: same numeric optimal

**4. PERSONALISATION**
- <18: 5–18
- 18–60: as primary
- 60+: upper bound 22 acceptable
- Gender: F slightly lower

**5. SCORING**
- Weight: 3/100
- Calc method: BUN/creatinine ratio (10–20 normal; >20 = dehydration; <10 = low protein/liver)
- Group: Kidney / Hydration

**6. PLAIN ENGLISH**
- Measures: protein metabolism waste
- Low feels like: protein-deficiency signs (slow healing, hair fall)
- High feels like: dry mouth, dark urine, fatigue (often dehydration, not kidney)

**7. ACTION PROTOCOL**
- Below optimal: Protein audit, vegetarian users add whey/pea protein
- Above optimal: Hydrate first (target 35 mL/kg/d). If persistent → check creatinine + eGFR
- Retest: 4 weeks

---

## 26. URIC ACID

**1. IDENTITY**
- Standard name: Serum Uric Acid
- Aliases: UA, S. Urate
- Unit: mg/dL
- Conversion: mg/dL × 59.48 = µmol/L

**2. THREE-TIER RANGES**
- Lab range: M 3.5–7.2 | F 2.6–6.0 mg/dL
- Zenoho Optimal: M 3.5–5.5 | F 2.5–4.5
- Zenoho Alert: >6.5 (gout/metabolic syndrome) | <2.5 (rare; molybdenum deficiency)
- Citation: Indian metabolic syndrome studies (Eastern India cohort) show UA correlates with insulin resistance well below clinical gout cut-off; Attia targets <5.5 (M)

**3. NATIONALITY MODIFIERS**
- IN: hyperuricaemia rising fast in urban males — fructose, alcohol, weight; same optimal
- ME: similar
- UK/EU/US: same
- Default: IN

**4. PERSONALISATION**
- <18: 2.0–5.5
- 18–40: as primary
- 40–60: same
- 60+: F rises post-menopause; M optimal still <5.5
- Gender: applied above

**5. SCORING**
- Weight: 4/100 (rising importance — metabolic + cardiovascular)
- Calc method: linear penalty above 5.5 (M)/4.5 (F)
- Group: Kidney / Metabolic

**6. PLAIN ENGLISH**
- Measures: purine waste; high causes gout and signals metabolic stress
- High feels like: sometimes silent until acute gout (big toe agony, redness, swelling)
- Optimal feels like: no joint twinges, clean metabolic markers

**7. ACTION PROTOCOL**
- Above optimal: Cut fructose (sweet drinks, fruit juices), alcohol, organ meats. Tart cherry extract 500 mg, Vitamin C 500 mg, Quercetin 500 mg, hydrate 3L/d. If gout episodes >2/yr — physician for allopurinol/febuxostat
- Below optimal: rare; check molybdenum
- Retest: 8 weeks

---

## 27. SODIUM

**1. IDENTITY**
- Standard name: Serum Sodium
- Aliases: Na, S. Sodium
- Unit: mEq/L (= mmol/L)

**2. THREE-TIER RANGES**
- Lab range: 135–145 mEq/L
- Zenoho Optimal: 138–142
- Zenoho Alert: <135 (hyponatraemia — diuretics, SIADH) | >145 (hypernatraemia — dehydration)
- Citation: standard electrolyte references; tight band — body keeps it strict

**3. NATIONALITY MODIFIERS**
- IN: high salt diet but body buffers; check BP separately
- All regions: same optimal

**4. PERSONALISATION**
- All ages and genders: same band; 60+ more prone to hyponatraemia (drugs)

**5. SCORING**
- Weight: 2/100 (rarely actionable in screening)
- Group: Kidney / Electrolytes

**6. PLAIN ENGLISH**
- Measures: blood salt level
- Low feels like: confusion, headache, nausea, falls (in elderly)
- High feels like: thirst, lethargy, agitation
- Optimal: normal mental clarity

**7. ACTION PROTOCOL**
- Out of range: rarely diet-driven; identify cause (drug, hormone, fluid). Acute medical issue — physician immediately if symptomatic
- Retest: as clinically directed

---

## 28. POTASSIUM

**1. IDENTITY**
- Standard name: Serum Potassium
- Aliases: K, S. Potassium
- Unit: mEq/L (= mmol/L)

**2. THREE-TIER RANGES**
- Lab range: 3.5–5.1 mEq/L
- Zenoho Optimal: 4.0–4.8
- Zenoho Alert: <3.5 (cramps, arrhythmia) | >5.5 (urgent — cardiac risk)
- Citation: standard; Indian dietary patterns (low fruit/veg in some) → low-end potassium common

**3. NATIONALITY MODIFIERS**
- IN: vegetable intake variable; keep optimal mid-range as target
- All regions: same

**4. PERSONALISATION**
- <18: 3.4–4.7
- 18–60: as primary
- 60+: keep ≥4.0 (drug-related drops common)
- Gender: same

**5. SCORING**
- Weight: 3/100
- Group: Kidney / Electrolytes

**6. PLAIN ENGLISH**
- Measures: blood potassium — heart and muscle electrical
- Low feels like: cramps, palpitations, weakness, constipation
- High feels like: tingling, weakness; >6 is medical emergency
- Optimal: stable rhythm, no cramps

**7. ACTION PROTOCOL**
- Below optimal: Diet first — banana, coconut water, leafy greens, beans. Magnesium glycinate 400 mg (low Mg drives low K). Avoid licorice, excess caffeine. Diuretic users need physician adjustment
- Above optimal: STOP K supplements/salt-substitutes. Avoid bananas, coconut water briefly. Physician check (kidney, ACEi/ARB, aldosterone)
- Retest: 4 weeks

---

## 29. CHLORIDE

**1. IDENTITY**
- Standard name: Serum Chloride
- Aliases: Cl
- Unit: mEq/L (= mmol/L)

**2. THREE-TIER RANGES**
- Lab range: 98–107 mEq/L
- Zenoho Optimal: 100–105
- Zenoho Alert: <96 | >110
- Citation: standard; tracks sodium and acid-base status

**3. NATIONALITY MODIFIERS**
- All regions: same

**4. PERSONALISATION**
- All ages and genders: same band

**5. SCORING**
- Weight: 1/100 (rarely independently actionable)
- Group: Kidney / Electrolytes

**6. PLAIN ENGLISH**
- Measures: blood chloride; tracks with sodium
- Out of range: usually reflects sodium or acid-base issue, not chloride per se

**7. ACTION PROTOCOL**
- Out of range: investigate underlying acid-base (anion gap, blood gas)
- Retest: as directed

---

## 30. PHOSPHORUS

**1. IDENTITY**
- Standard name: Serum Phosphorus / Inorganic Phosphate
- Aliases: P, Phosphate, PO4
- Unit: mg/dL
- Conversion: mg/dL × 0.323 = mmol/L

**2. THREE-TIER RANGES**
- Lab range: 2.5–4.5 mg/dL (adult)
- Zenoho Optimal: 3.0–4.0
- Zenoho Alert: <2.0 (refeeding/severe deficiency) | >4.5 (kidney/PTH workup)
- Citation: standard; Indian dietary phosphorus generally adequate

**3. NATIONALITY MODIFIERS**
- All regions: same
- IN-specific: high cola intake raises phosphate; not usually clinically meaningful

**4. PERSONALISATION**
- <18: 4.0–7.0 (high in growth)
- 18–60: as primary
- 60+: same
- Gender: same

**5. SCORING**
- Weight: 2/100
- Group: Kidney / Bone

**6. PLAIN ENGLISH**
- Measures: phosphate — bone and energy metabolism (ATP)
- Low feels like: muscle weakness, bone pain (rare unless severe)
- High feels like: itching, calcium deposits (CKD context)
- Optimal: nothing specific

**7. ACTION PROTOCOL**
- Above optimal: Check creatinine, PTH, Vit D. Reduce processed food and cola if dietary
- Below optimal: Dairy/eggs/legumes; rule out refeeding syndrome
- Retest: 8 weeks

---

# [v1.1.5] SYSTEM 5: LIPIDS / CARDIOVASCULAR (7 markers — TC, LDL, HDL, TG, VLDL, Lp(a), ApoB)
*Note: Lp(a) entry appears at Marker 44 (added in v1.1) and ApoB at Marker 53 (added in v1.1.5) but both logically belong to this system.*

---

## 31. TOTAL CHOLESTEROL

**1. IDENTITY**
- Standard name: Total Cholesterol
- Aliases: TC, T. Chol, Total Chol
- Unit: mg/dL
- Conversion: mg/dL × 0.0259 = mmol/L

**2. THREE-TIER RANGES**
- Lab range: <200 desirable (Indian labs follow ATP III)
- Zenoho Optimal: 150–190 mg/dL
- Zenoho Alert: <120 (hormone/health concern) | >240 (workup with ApoB)
- Citation: TC alone is poor risk marker — Attia/Sniderman teach: ApoB > LDL > non-HDL > TC. Use TC as gross signal only

**3. NATIONALITY MODIFIERS**
- IN: South Asians develop ASCVD at lower LDL — keep stricter
- ME: same
- UK/EU/US: <200 acceptable
- Default: IN

**4. PERSONALISATION**
- <18: <170
- 18–40: 150–190
- 40–60: 150–190; if family history of CVD, target lower with ApoB
- 60+: low TC (<140) raises mortality concern — context matters
- Gender: F slightly higher post-menopause; same target

**5. SCORING**
- Weight: 2/100 (low — non-HDL and ApoB carry the weight)
- Group: Lipid / Cardiovascular

**6. PLAIN ENGLISH**
- Measures: total cholesterol mass — sum of all particles
- Misleading by itself: high TC with high HDL and low triglycerides is often fine; low TC with high small-dense LDL is risky
- Optimal in isolation: meaningless without breakdown

**7. ACTION PROTOCOL**
- Out of range: Always re-interpret with full lipid panel (LDL, HDL, TG, non-HDL). Order ApoB if available (Indian labs offer at ~₹600). Diet/exercise optimisation; statin/ezetimibe per cardiologist if ApoB >100 with risk
- Retest: 12 weeks after any intervention

---

## 32. LDL CHOLESTEROL

**1. IDENTITY**
- Standard name: Low-Density Lipoprotein Cholesterol
- Aliases: LDL, LDL-C, Bad cholesterol
- Unit: mg/dL
- Conversion: mg/dL × 0.0259 = mmol/L

**2. THREE-TIER RANGES**
- Lab range: <100 optimal; 100–129 above optimal; 130–159 borderline (ATP III)
- Zenoho Optimal: <80 mg/dL (general); <70 if any CVD risk; <55 if existing plaque
- Zenoho Alert: >130 (start protocol) | >160 (statin discussion) | >190 (familial hypercholesterolaemia screen)
- Citation: Attia targets ApoB <60 mg/dL (translates to LDL ~70); ESC 2019 secondary prevention <55. Indian risk profile justifies stricter thresholds

**3. NATIONALITY MODIFIERS**
- IN: South Asians develop plaque earlier; target <80 for primary prevention
- ME: similar
- UK/EU: <100 acceptable for low-risk
- US: <100 standard
- Default: IN

**4. PERSONALISATION**
- <18: <100
- 18–40: <80
- 40–60: <80; <70 if CAC score >0 or family history
- 60+: <70 with prior plaque; <80 otherwise
- Gender: same; F protected pre-menopause but loses advantage after

**5. SCORING**
- Weight: 7/100
- Calc method: order ApoB once for true particle count; otherwise use non-HDL as best proxy
- Group: Lipid / Cardiovascular

**6. PLAIN ENGLISH**
- Measures: cholesterol carried in LDL particles
- High feels like: silent — atherosclerosis is asymptomatic until plaque ruptures
- Optimal feels like: nothing — but adds decades of healthy life

**7. ACTION PROTOCOL**
- Above optimal:
  - Diet: Saturated fat <10% of calories, fiber 30g/d (oats, psyllium 10g, beans), eliminate trans-fats, replace ghee/butter excess with olive/avocado
  - Supplements: Bergamot 1000 mg/d, Red Yeast Rice 1200 mg (with CoQ10 200 mg), Berberine 500 mg ×2/d, Plant sterols 2g/d
  - Exercise: Zone 2 cardio 3hr/wk + resistance 3×/wk
  - If LDL still >100 after 12 weeks lifestyle + family history of CVD → cardiologist for statin/ezetimibe
- Retest: 12 weeks

---

## 33. HDL CHOLESTEROL

**1. IDENTITY**
- Standard name: High-Density Lipoprotein Cholesterol
- Aliases: HDL, HDL-C, Good cholesterol
- Unit: mg/dL

**2. THREE-TIER RANGES**
- Lab range: M >40 | F >50 mg/dL (ATP III)
- Zenoho Optimal: M 50–80 | F 60–90
- Zenoho Alert: <40 (M)/<50 (F) — metabolic dysfunction | >100 — paradoxically raises CV risk (HERMES study)
- Citation: Madsen et al. (*Eur Heart J* 2017) U-curve mortality with HDL >100; Indian metabolic syndrome studies — low HDL prevalent

**3. NATIONALITY MODIFIERS**
- IN: South Asians naturally lower HDL — keep targets but don't over-chase >80
- ME: same
- UK/EU/US: same
- Default: IN

**4. PERSONALISATION**
- <18: M >35, F >40
- 18–60: as primary
- 60+: same
- Gender: applied above

**5. SCORING**
- Weight: 4/100 (less than LDL because HDL function > level)
- Calc method: TG/HDL ratio is more useful than HDL alone (target <2.0)
- Group: Lipid / Metabolic

**6. PLAIN ENGLISH**
- Measures: cholesterol in protective particles — but quality > quantity
- Low feels like: paired with metabolic syndrome — belly fat, insulin resistance signs
- Optimal feels like: clean metabolism, good fat distribution

**7. ACTION PROTOCOL**
- Below optimal: Resistance training (most potent HDL raiser) + olive oil, nuts, fatty fish 3×/wk, omega-3 2g/d, niacin only with physician (flushing). Cut sugar, processed carbs, trans fats. Quit smoking
- Very high (>100): Genetic — usually CETP variants. Investigate with cardiologist; not necessarily protective
- Retest: 12 weeks

---

## 34. TRIGLYCERIDES

**1. IDENTITY**
- Standard name: Triglycerides
- Aliases: TG, Trigs
- Unit: mg/dL
- Conversion: mg/dL × 0.0113 = mmol/L

**2. THREE-TIER RANGES**
- Lab range: <150 normal; 150–199 borderline; ≥200 high (ATP III)
- Zenoho Optimal: <80 mg/dL
- Zenoho Watch zone: 80–100 mg/dL
- Zenoho Alert: >150 (insulin resistance signal) | >200 (intervention) | >500 (pancreatitis risk)
- Citation: Attia (*Outlive*) targets <80 mg/dL specifically; TG/HDL ratio <2.0 requires TG <80 when HDL is at 40; IFM functional optimal

**3. NATIONALITY MODIFIERS**
- IN: high carb/refined-grain diets push TG; same strict optimal
- ME: similar
- UK/EU/US: same
- Default: IN

**4. PERSONALISATION**
- <18: <90
- 18–40: <100
- 40–60: <100
- 60+: <120 acceptable
- Gender: F slightly lower; rises post-menopause

**5. SCORING**
- Weight: 6/100 (high — best lipid proxy for metabolic health)
- Calc method: TG/HDL ratio carries 80% of TG's predictive value
- Group: Lipid / Metabolic

**6. PLAIN ENGLISH**
- Measures: stored fat circulating in blood; rises with sugar/alcohol/excess carbs
- High feels like: belly fat, energy crashes after meals, fatty liver risk
- Optimal feels like: stable energy, easy fat loss, clean liver

**7. ACTION PROTOCOL**
- Above optimal: Cut liquid sugars, fruit juices, alcohol, refined grains. Omega-3 (EPA+DHA) 2–4g/d (most effective single intervention). Berberine 500 mg ×3/d. Walk after meals. If >500 — physician for fenofibrate
- Retest: 8 weeks

---

## 35. VLDL

**1. IDENTITY**
- Standard name: Very-Low-Density Lipoprotein Cholesterol
- Aliases: VLDL, VLDL-C
- Unit: mg/dL
- Calculation: VLDL ≈ TG/5 (Friedewald)

**2. THREE-TIER RANGES**
- Lab range: 5–40 mg/dL
- Zenoho Optimal: 8–20
- Zenoho Alert: >30 (high TG/insulin resistance)
- Citation: derivative of TG — same logic

**3. NATIONALITY MODIFIERS**
- All regions: same as TG

**4. PERSONALISATION**
- All ages: tracks TG

**5. SCORING**
- Weight: 1/100 (no independent value over TG)
- Group: Lipid

**6. PLAIN ENGLISH**
- Measures: triglyceride-rich particles — companion to TG
- Optimal feels like: same as TG — stable energy, lean profile

**7. ACTION PROTOCOL**
- Out of range: same as triglycerides protocol
- Retest: 8 weeks

---

# [v1.1.5] SYSTEM 6: VITAMINS / MINERALS / IRON (4 markers — Vit D, B12, Folate, + Magnesium RBC; consolidated with Iron Panel for scoring)
*Note: Magnesium RBC entry appears at Marker 58 (added in v1.1.5) but logically belongs to this system. The combined Vitamins/Minerals/Iron group (Systems 6 + 8) contributes 11% to the final score per v1.1.5 weights.*

---

## 36. VITAMIN D (25-OH)

**1. IDENTITY**
- Standard name: 25-Hydroxyvitamin D (Total)
- Aliases: 25(OH)D, Vit D, Vitamin D Total, Calcidiol
- Unit: ng/mL
- Conversion: ng/mL × 2.5 = nmol/L

**2. THREE-TIER RANGES**
- Lab range (Indian labs): <20 deficient; 20–29 insufficient; 30–100 sufficient; >100 toxic
- Zenoho Optimal: 40–60 ng/mL
- Zenoho Alert: <30 (start protocol) | <20 (loading dose) | >80 (taper) | >100 (toxicity workup)
- Citation: ESI 2025 Vitamin D Consensus (*Indian J Endocrinol Metab*) explicitly recommends maintaining 40–60 ng/mL for Indians; Endocrine Society Global also targets 30+ but functional medicine and Attia push to 40–60

**3. NATIONALITY MODIFIERS**
- IN: 70–90% of urban Indians deficient despite sunlight (skin tone, indoor lifestyle, pollution). Aggressive protocol justified.
- ME: 80%+ deficient (cultural cover, indoor AC); same protocol
- UK/EU: 30–50 ng/mL acceptable
- US: 30–50 ng/mL acceptable
- Default: IN

**4. PERSONALISATION**
- <18: 30–50 ng/mL target
- 18–40: 40–60
- 40–60: 40–60
- 60+: 40–60 (skin synthesis declines)
- Gender: same; pregnancy target ≥40

**5. SCORING**
- Weight: 7/100 (high — touches immune, bone, hormone, mood)
- Calc method: linear penalty below 40, doubled below 30
- Group: Vitamin / Immune / Bone

**6. PLAIN ENGLISH**
- Measures: stored vitamin D from sun + food + supplements
- Low feels like: low mood, frequent infections, bone aches, fatigue, hair fall, slow recovery
- Optimal feels like: stable mood, robust immunity, strong bones, faster recovery

**7. ACTION PROTOCOL**
- <20 ng/mL (severe): ESI 2025 protocol — Cholecalciferol 60,000 IU once weekly × 8 weeks, then maintenance 60,000 IU monthly OR 2000 IU daily. Always pair with K2-MK7 100 mcg + magnesium glycinate 400 mg
- 20–29 (insufficient): 60,000 IU weekly × 6 weeks, then maintenance 2000 IU daily
- 30–39 (functional low): 2000 IU daily, retest in 12 weeks
- 40–60 (optimal): maintenance 1000–2000 IU/d in winter; sun exposure 15–20 min in summer
- >80: pause supplementation, retest in 8 weeks
- >100: stop all supplementation, calcium check, physician
- Retest: 8–12 weeks after starting; then every 6 months

---

## 37. VITAMIN B12

**1. IDENTITY**
- Standard name: Vitamin B12
- Aliases: B12, Cobalamin, Cyanocobalamin
- Unit: pg/mL (= ng/L)
- Conversion: pg/mL × 0.738 = pmol/L

**2. THREE-TIER RANGES**
- Lab range (HOD/Indian): 239–931 pg/mL
- Zenoho Optimal: 500–900 pg/mL
- Zenoho Alert: <300 (functional deficiency despite "normal" lab) | <200 (overt deficiency) | >1500 (workup if not supplementing)
- Citation: Japan/Germany already use cut-off 500 pg/mL; ICMR Indian vegetarian studies show 50–80% B12 deficient on functional measures (MMA, homocysteine) even with "normal" B12; Attia, IFM

**3. NATIONALITY MODIFIERS**
- IN: Predominantly vegetarian — 50–80% B12 deficient by functional measures. Optimal kept stricter (>500). Add Holo-TC or MMA test if symptoms despite "normal" B12
- ME: similar lacto-vegetarian patterns; same protocol
- UK/EU: <300 actionable
- US: <300 actionable
- Default: IN

**4. PERSONALISATION**
- <18: >400
- 18–40: >500
- 40–60: >500
- 60+: >600 (absorption declines with age and PPI use)
- Gender: F may need more if heavy menses or vegetarian

**5. SCORING**
- Weight: 7/100 (high in vegetarian populations)
- Calc method: linear penalty below 500
- Group: Vitamin / Neuro / Haematology

**6. PLAIN ENGLISH**
- Measures: serum B12 — but doesn't reflect cell-level activity well at low end
- Low feels like: brain fog, tingling/numbness in hands/feet, fatigue, low mood, glossitis (smooth red tongue)
- Optimal feels like: sharp cognition, stable mood, no nerve symptoms

**7. ACTION PROTOCOL**
- <300 pg/mL: Methylcobalamin 1500 mcg sublingual daily × 8 weeks, then 1000 mcg daily maintenance. If neurological symptoms or severe deficiency — IM cyanocobalamin 1000 mcg ×3/week × 2 weeks, then weekly × 4, then monthly (physician)
- 300–500: Methylcobalamin 1000 mcg sublingual daily × 12 weeks
- Vegetarians: lifelong maintenance 500–1000 mcg/d sublingual
- Always with: Methylfolate 400–800 mcg (avoid masking)
- >1500 without supplementation: Liver/kidney workup, rule out leukaemia
- Retest: 12 weeks

---

## 38. FOLATE / FOLIC ACID

**1. IDENTITY**
- Standard name: Folate / Folic Acid
- Aliases: Folate, Vitamin B9, Serum Folate
- Unit: ng/mL
- Conversion: ng/mL × 2.27 = nmol/L
- Note: Serum folate fluctuates with recent intake; RBC folate is better long-term marker

**2. THREE-TIER RANGES**
- Lab range: 3–17 ng/mL (some labs >5.4)
- Zenoho Optimal: 8–20 ng/mL
- Zenoho Alert: <5 (start protocol) | >25 (over-supplementation; mask B12 deficiency)
- Citation: IFM optimal; Indian vegetarian/wheat-eating populations often have moderate folate but B12 the bottleneck

**3. NATIONALITY MODIFIERS**
- IN: relatively better than B12 due to wheat fortification + greens; still keep optimal
- ME: similar
- UK/EU/US: same
- Default: IN

**4. PERSONALISATION**
- <18: 5–17
- 18–40: 8–20
- 40–60: 8–20
- 60+: 8–20
- Gender: F of childbearing age — minimum 10 ng/mL; pregnancy ≥15

**5. SCORING**
- Weight: 4/100
- Calc method: paired with B12 and homocysteine
- Group: Vitamin / Methylation

**6. PLAIN ENGLISH**
- Measures: folate available for DNA synthesis, methylation
- Low feels like: fatigue, tongue inflammation, mood changes, anaemia (megaloblastic)
- Optimal feels like: stable mood, clean energy

**7. ACTION PROTOCOL**
- Below optimal: Methylfolate 400–800 mcg/d (preferred over folic acid, especially MTHFR variants common in Indians). Always pair with B12. Diet: spinach, broccoli, beans, lentils, fortified atta
- Above optimal without supplementation: rule out high-dose folic acid masking B12 deficiency (supplement audit)
- Pregnancy: 600 mcg methylfolate
- Retest: 8 weeks

---

# [v1.1.5] SYSTEM 7: THYROID (4 markers — TSH, FT4, FT3, + Anti-TPO antibodies)
*Note: Free T3 entry appears at Marker 47 (v1.1) and Anti-TPO at Marker 57 (v1.1.5) but both logically belong to this system. See System Order Map.*

---

## 39. TSH (Thyroid-Stimulating Hormone)

**1. IDENTITY**
- Standard name: Thyroid-Stimulating Hormone
- Aliases: TSH, Thyrotropin
- Unit: mIU/L (= µIU/mL)

**2. THREE-TIER RANGES**
- Lab range (HOD): 0.46–4.68 mIU/L
- Zenoho Optimal: 1.0–2.0 mIU/L
- Zenoho Alert: <0.4 (hyperthyroidism workup) | >2.5 (subclinical hypothyroidism flag) | >4.5 (overt hypothyroid workup)
- Citation: Optimal DX, Lamkin Clinic, IFM all converge on 1–2 mIU/L (~95% of healthy individuals stay <2.5); NACB recommends <2.5 normal upper limit

**3. NATIONALITY MODIFIERS**
- IN: hypothyroidism prevalence ~10–11% (higher in women, Mumbai/Cochin studies). Use stricter optimal
- ME: similar
- UK/EU: 0.4–4.0 acceptable, 1–2 still optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 0.7–4.0; optimal 1–2.5
- 18–40: optimal 1–2
- 40–60: optimal 1–2.5 (slight age drift)
- 60+: optimal 1–4 (NHANES — older adults have higher TSH normally)
- Gender: F more prone to thyroid issues (10:1); pregnancy uses tighter trimester ranges (T1: <2.5, T2/T3: <3.0)

**5. SCORING**
- Weight: 6/100
- Calc method: U-curve; alert flags doubled
- Group: Thyroid / Endocrine

**6. PLAIN ENGLISH**
- Measures: pituitary's signal to thyroid — high TSH means thyroid is sluggish
- High feels like: fatigue, weight gain, cold intolerance, dry skin, hair fall, constipation, slow thinking, depression
- Low feels like: anxiety, weight loss, palpitations, heat intolerance, tremor, insomnia
- Optimal feels like: stable energy, normal weight, regulated mood

**7. ACTION PROTOCOL**
- 2.5–4.5 mIU/L (subclinical): Selenium (selenomethionine) 200 mcg/d, Iodine 150 mcg/d (caution — only if not iodine-replete; check iodine deficiency status), Zinc 15 mg, Vitamin D optimal 40–60, Iron/ferritin >70. Order Free T4, Free T3, anti-TPO, anti-TG. If anti-TPO positive → Hashimoto's protocol (gluten-free trial, address gut)
- >4.5 with low T4: Endocrinologist for levothyroxine
- <0.4: Endocrinologist immediately (Graves'/thyroiditis workup)
- Retest: 8 weeks (TSH responds slowly)

---

## 40. FREE T4

**1. IDENTITY**
- Standard name: Free Thyroxine
- Aliases: FT4, Free T4
- Unit: ng/dL
- Conversion: ng/dL × 12.87 = pmol/L

**2. THREE-TIER RANGES**
- Lab range (HOD): 0.78–2.19 ng/dL
- Zenoho Optimal: 1.1–1.6 ng/dL (mid-upper third of range)
- Zenoho Alert: <0.9 (hypothyroidism) | >2.0 (hyperthyroidism)
- Citation: IFM optimal upper-mid range correlates with subjective wellness; Indian endocrinology consensus

**3. NATIONALITY MODIFIERS**
- All regions: same Optimal

**4. PERSONALISATION**
- <18: 0.9–1.7
- 18–60: as primary
- 60+: 0.9–1.6
- Gender: F same range; pregnancy slightly different per trimester

**5. SCORING**
- Weight: 4/100 (best paired with TSH)
- Calc method: paired with TSH and Free T3 if available
- Group: Thyroid / Endocrine

**6. PLAIN ENGLISH**
- Measures: storage form of active thyroid hormone
- Low feels like: hypothyroid symptoms (fatigue, cold, weight gain)
- High feels like: hyperthyroid symptoms (tremor, palpitations, heat intolerance)
- Optimal feels like: stable energy and metabolism

**7. ACTION PROTOCOL**
- Below optimal: paired with high TSH → see TSH protocol. Selenium, iodine (if deficient), iron
- Above optimal: paired with low TSH → endocrinologist for hyperthyroidism workup
- Free T4 normal but symptomatic + TSH high: order Free T3 — possible conversion failure (need selenium, zinc, address stress/cortisol)
- Retest: 8 weeks

---

# SYSTEM 8: IRON PANEL (3 markers)
*[v1.1.5] Note: System 8 markers (41–43) historically grouped as a standalone Iron Panel. From v1.1.5, they merge into System 6 (Vitamins/Minerals/Iron) for scoring purposes — clinically interpreted alongside Vit D, B12, Folate, and Magnesium RBC. The header is preserved for backward compatibility, but the markers contribute to System 6's combined 11% weight, not a separate weight. See Appendix 1 — System Order Map.*

---

## 41. SERUM IRON

**1. IDENTITY**
- Standard name: Serum Iron
- Aliases: S. Iron, Fe
- Unit: µg/dL
- Conversion: µg/dL × 0.179 = µmol/L

**2. THREE-TIER RANGES**
- Lab range: M 65–175 | F 50–170 µg/dL (some Indian labs: 49–181)
- Zenoho Optimal: M 80–150 | F 70–140 µg/dL
- Zenoho Alert: <50 (deficiency workup with ferritin) | >180 (haemochromatosis screen)
- Citation: standard reference labs; iron alone has limited use — must interpret with ferritin and TSAT (transferrin saturation)

**3. NATIONALITY MODIFIERS**
- IN: 50%+ of women anaemic (NFHS-5); high baseline iron deficiency
- ME: similar
- UK/EU/US: same optimal
- Default: IN

**4. PERSONALISATION**
- <18: 50–120
- 18–40: M 80–150, F 70–140
- 40–60: same
- 60+: same
- Gender: applied above; menstruating women run lower

**5. SCORING**
- Weight: 3/100 (companion — ferritin is the key)
- Calc method: composite Iron Score = ferritin (50%) + TSAT (30%) + serum iron (20%)
- Group: Iron / Haematology

**6. PLAIN ENGLISH**
- Measures: iron currently in transit in blood
- Low feels like: paired with iron deficiency anaemia (fatigue, breathless)
- High feels like: usually silent until iron overload; joint aches, fatigue, "bronze diabetes"

**7. ACTION PROTOCOL**
- Below optimal: see Ferritin protocol
- Above optimal: TSAT >45% or ferritin >300 (M) / >200 (F) → haemochromatosis genetic test (HFE), avoid iron supplements + vitamin C with meals, consider therapeutic phlebotomy
- Retest: 12 weeks

---

## 42. FERRITIN

**1. IDENTITY**
- Standard name: Serum Ferritin
- Aliases: Ferritin, S. Ferritin
- Unit: ng/mL (= µg/L)

**2. THREE-TIER RANGES**
- Lab range: M 30–400 | F 15–150 ng/mL
- Zenoho Optimal: M 80–200 | F 70–150 ng/mL
- Zenoho Alert (low): <30 (M)/<20 (F) — overt iron deficiency | <50 + symptoms — functional deficiency
- Zenoho Alert (high): >300 — workup required (do NOT assume iron overload yet)
- **Cross-marker rule:** Ferritin >300 + hs-CRP normal (<1.0) → **haemochromatosis screen mandatory** (HFE gene panel, TSAT, family history). Ferritin >300 + hs-CRP elevated (>2.0) → **acute phase reaction**, not true iron overload — treat the inflammation, recheck ferritin in 8 weeks once hs-CRP normalises.
- Citation: Functional medicine consensus (Coho Health, Lamkin) — ferritin <50 impairs T4→T3 conversion; Indian Eastern study (Tata Hospital) used <70 cut-off for IDA in women; ferritin is an acute-phase reactant (Wessling-Resnick *Annu Rev Nutr* 2010)

**3. NATIONALITY MODIFIERS**
- IN: 50%+ women anaemic; vegetarians at high risk; keep stricter optimal
- ME: similar
- UK/EU: same optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 20–100
- 18–40: M 80–200, F 70–150
- 40–60: same
- 60+: paradoxical rise with inflammation — interpret with hs-CRP
- Gender: F lower naturally; if planning pregnancy target >70

**5. SCORING**
- Weight: 8/100 (high — best single iron marker, also acute-phase reactant)
- Calc method: U-curve; below 50 doubled penalty; >300 raises inflammation suspicion
- Group: Iron / Haematology / Inflammation (acute-phase)

**6. PLAIN ENGLISH**
- Measures: stored iron — body's iron savings account
- Low feels like: hair fall, breathlessness on stairs, RLS (restless legs), brain fog, brittle nails, fatigue, cold extremities — even before Hb drops
- Optimal feels like: thick hair, steady energy, fast recovery
- High feels like: joint pain, fatigue, "iron man" overload symptoms (rare)

**7. ACTION PROTOCOL**
- <30 ng/mL: Iron bisglycinate 25 mg + Vit C 250 mg + Methylfolate 400 mcg + Methyl-B12 500 mcg, daily on empty stomach. If GI sensitive — Heme iron polypeptide. Lactoferrin 200 mg can boost absorption. Take iron on alternate days for better absorption (Stoffel et al. Lancet 2017)
- 30–80 (functional low): Iron bisglycinate 25 mg/d + Vit C; address blood loss source (heavy menses, GI bleed, NSAIDs, gut dysbiosis)
- >300: Check hs-CRP. If CRP normal → genetic haemochromatosis screen. Stop iron supplementation
- **Cross-marker disambiguation (v1.1):** When ferritin >300, ALWAYS pull hs-CRP from same panel before acting:
  - hs-CRP <1.0 + ferritin >300 → genetic haemochromatosis screen (HFE C282Y/H63D), TSAT, liver iron MRI if confirmed
  - hs-CRP >2.0 + ferritin >300 → ferritin is reflecting inflammation, not iron stores. Treat hs-CRP root cause (see Marker 45 protocol). Iron status is uninterpretable until inflammation resolves. Retest both in 8–12 weeks.
  - hs-CRP 1.0–2.0 + ferritin >300 → ambiguous. Order TSAT — TSAT >45% confirms iron overload independent of inflammation.
- Retest: 8–12 weeks (don't retest sooner — ferritin slow to move)

---

## 43. TIBC / TRANSFERRIN SATURATION

**1. IDENTITY**
- Standard name: Total Iron Binding Capacity / Transferrin Saturation
- Aliases: TIBC, TSAT, %Sat
- Unit: TIBC µg/dL; TSAT %
- Calculation: TSAT % = (Serum Iron / TIBC) × 100

**2. THREE-TIER RANGES**
- Lab range (HOD): TIBC 261–462 µg/dL; TSAT 19–39% (M)/14–34% (F)
- Zenoho Optimal: TSAT 25–35%
- Zenoho Alert: TSAT <20 (deficiency confirmation) | TSAT >45 (overload, haemochromatosis)
- Citation: standard; TSAT is the cleanest single metric for iron-status interpretation when combined with ferritin

**3. NATIONALITY MODIFIERS**
- IN: high iron deficiency prevalence — TSAT <20 very common
- All others: same optimal

**4. PERSONALISATION**
- <18: TSAT 20–35
- 18–60: as primary
- 60+: TSAT 20–35 (interpret with ferritin)
- Gender: F may run lower with menses

**5. SCORING**
- Weight: 4/100
- Calc method: composite Iron Score with ferritin and serum iron
- Group: Iron / Haematology

**6. PLAIN ENGLISH**
- Measures: % of transferrin binding sites carrying iron
- Low feels like: same as iron deficiency
- High feels like: same as iron overload; "bronze diabetes" classic triad

**7. ACTION PROTOCOL**
- TSAT <20 + ferritin <50: classic iron deficiency — see ferritin protocol
- TSAT 20–25 + ferritin low-normal: functional deficiency, especially in athletes/menstruating women — supplement
- TSAT >45: STOP iron, avoid vit C with meals, screen HFE gene, refer for therapeutic phlebotomy
- Retest: 12 weeks

---

# [v1.1.5] SYSTEM 9: INFLAMMATION (3 markers — hs-CRP, Homocysteine, + ESR)
*Note: Inflammation system founded in v1.1; expanded with ESR at Marker 52 in v1.1.5. Will continue expanding with Fibrinogen, GlycA, IL-6 in v2.*

---

# v1.1 ADDITIONS (Markers 44–47)

The following four markers were added in v1.1. They are numbered chronologically (44–47) but assigned to their logical systems for scoring purposes. See the **System Order Map** appendix for the full marker-to-system mapping.

---

## 44. LIPOPROTEIN(a)
*System group: Lipids / Cardiovascular (System 5)*

**1. IDENTITY**
- Standard name: Lipoprotein(a)
- Aliases: Lp(a), LPa, "L-P-little-a"
- Unit: mg/dL (mass) or nmol/L (particle count)
- Conversion: nmol/L ≈ mg/dL × 2.5 (approximate; assays differ — particle-based nmol/L preferred where available)
- Note: This is a **once-in-a-lifetime test**. Lp(a) is ~90% genetically determined and stays roughly constant after age 5. (See Genetic Marker Lock Rule appendix.)

**2. THREE-TIER RANGES**
- Lab range (Indian labs, LAI 2016): <30 mg/dL desirable; 30–50 borderline; >50 high
- Zenoho Optimal: <20 mg/dL
- Zenoho Watch zone: 20–30 mg/dL
- Zenoho Alert: >30 (start protocol) | >50 (urgent CV workup) | >100 (extreme — see Safety Override)
- Citation: Lipid Association of India 2016 expert consensus (Iyengar et al., *J Clin Lipidol*); Attia: Lp(a) >50 mg/dL = "loaded gun for ASCVD"; tightened from 30 because South Asian risk amplifies at lower thresholds

**3. NATIONALITY MODIFIERS**
- IN: South Asian Lp(a) levels run higher than Caucasians; ~25% of urban Indians have Lp(a) >50 mg/dL (Enas et al., *Indian Heart J*). Aggressive ApoB suppression below 60 is the workaround. Same Optimal applies — risk is real.
- ME: Lp(a) elevation common; same protocol
- UK/EU: Same Optimal; ESC 2019 endorses one-time measurement
- US: Same Optimal; ACC 2024 acknowledges Lp(a) as risk-enhancer
- Default: IN

**4. PERSONALISATION**
- <18: not routinely tested; if family history of premature CVD, test once at age 18+
- 18–40: test once; if elevated, log permanently in user profile (won't change)
- 40–60: same — one test for life unless lipoprotein-apheresis or new therapy started
- 60+: same
- Gender: F slightly higher post-menopause (estrogen suppresses Lp(a)); same target

**5. SCORING**
- Weight: 6/100 (within Lipid system)
- Calc method: binary penalty above 30; severe above 50; doesn't move with intervention so doesn't recompute on retest
- System group: Cardiovascular / Lipids
- Special: `is_genetic_marker = TRUE`, `score_locked = TRUE` after first valid result

**6. PLAIN ENGLISH**
- Measures: a sticky, inherited cholesterol particle that builds plaque and triggers clots — completely separate from regular LDL. You're either born with high Lp(a) or you're not.
- Low feels like: nothing — but you got lucky on a major heart-attack risk
- High feels like: completely silent until it isn't. People with Lp(a) >50 often have heart attacks in their 40s with normal LDL. The first symptom can be the last.
- Optimal feels like: nothing different — but you can stop worrying about this one variable

**7. ACTION PROTOCOL**
- **Critical disclaimer:** Lp(a) cannot be lowered meaningfully by diet, exercise, or standard statins. Don't pretend otherwise. The strategy is to **suppress all OTHER risk factors aggressively** so total atherosclerotic burden stays low.
- **20–30 mg/dL (watch):** Drive ApoB <80, LDL <80, BP <120/80, HbA1c <5.4. Aspirin 75–100 mg/d only if discussed with cardiologist. CAC scan at age 35+.
- **30–50 mg/dL (start protocol):** All of the above PLUS drive ApoB <60, LDL <70. CAC scan now (any age 30+). Niacin 1–2g/d may lower Lp(a) 20–30% (with physician — flushing, glucose, liver). High-dose omega-3 (EPA 2–4g) modest effect.
- **>50 mg/dL (urgent):** Cardiologist referral. CAC scan + carotid Doppler. Drive ApoB <50 with statin/ezetimibe/PCSK9-inhibitor as indicated. Family screening — first-degree relatives should be tested. Track for emerging Lp(a)-specific drugs (pelacarsen, olpasiran — in late-stage trials).
- **>100 mg/dL:** Triggers Safety Override (caps score at Level 5). Urgent cardiology referral within 7 days.
- **Retest timeline:** Once in lifetime. Only retest if starting Lp(a)-specific therapy or apheresis.

---

## 45. hs-CRP (high-sensitivity C-Reactive Protein)
*System group: Inflammation (System 9 — new)*

**1. IDENTITY**
- Standard name: high-sensitivity C-Reactive Protein
- Aliases: hs-CRP, hsCRP, Cardiac CRP
- Unit: mg/L
- Conversion: mg/L = mg/dL × 10 (some Indian labs report mg/dL — multiply by 10 to compare)
- Note: hs-CRP ≠ regular CRP; it's the same molecule measured with a more sensitive assay for the low-grade inflammation range

**2. THREE-TIER RANGES**
- Lab range (AHA/CDC 2003, used by Indian labs): <1.0 low risk; 1–3 average risk; >3 high CV risk
- Zenoho Optimal: <1.0 mg/L (Attia targets <0.5)
- Zenoho Watch zone: 1.0–2.0 mg/L
- Zenoho Alert: >2.0 (start protocol) | >5.0 (acute-phase confounder — flags multiple markers as low-confidence) | >10 (acute infection — re-test in 2 weeks; sustained >10 triggers Safety Override)
- Citation: AHA/CDC 2003 cardiovascular risk strata; Ridker JUPITER trial; Attia targets <0.5 in *Outlive*; IFM optimal <1.0

**3. NATIONALITY MODIFIERS**
- IN: Indians run higher baseline hs-CRP than Caucasians at same BMI ("inflammatory phenotype" — Mohan, CURES study). Same strict optimal — don't move the goalpost.
- ME: similar inflammatory profile to IN; same target
- UK/EU: same target
- US: same target
- Default: IN

**4. PERSONALISATION**
- <18: <1.0; viral infections push it up — retest after recovery
- 18–40: <1.0
- 40–60: <1.0
- 60+: <1.5 acceptable (mild inflammaging); but if pursuing longevity, hold <1.0
- Gender: F slightly higher in luteal phase, with OCP, and post-menopause; same target

**5. SCORING**
- Weight: 8/100 (high — inflammation is a final common pathway across cardiovascular, metabolic, neurodegenerative disease)
- Calc method: linear penalty above 1.0; doubled above 2.0
- System group: **Inflammation (System 9)**

**6. PLAIN ENGLISH**
- Measures: how much your body is currently fighting some kind of fire — anywhere. Not specific to one place.
- Low feels like: clean recovery from workouts, fast healing, stable mood, sharp thinking
- High feels like: tired-but-wired, joint stiffness on waking, slow to recover, unexplained brain fog. Often silent — that's exactly why it matters.
- Optimal feels like: resilient body that bounces back from stress

**7. ACTION PROTOCOL**
- **First rule (critical):** hs-CRP >10 = acute infection or injury, not chronic inflammation. Wait 2–4 weeks after illness recovery before re-testing. Don't act on the high reading.
- **1.0–2.0 mg/L (watch):**
  - Visceral fat reduction (waist <90 cm M / <80 cm F) — single biggest hs-CRP lever
  - Sleep audit: 7+ hours, consistent timing
  - Omega-3 EPA+DHA 2–3g/d (TG form)
  - Curcumin (with piperine or phytosome form) 500 mg ×2/d
  - 30 min Zone 2 cardio 4×/week
- **>2.0 mg/L (start protocol):** All above PLUS:
  - NAC 600 mg ×2/d
  - Quercetin 500 mg/d
  - Eliminate ultra-processed foods, seed oils high in omega-6, smoking, excess alcohol
  - Dental check (periodontal disease drives hs-CRP)
  - Gut audit (consider stool test for dysbiosis)
  - Rule out chronic infections (latent EBV, H. pylori, periodontitis, sinusitis)
- **>5.0 sustained:** Physician workup — autoimmune panel (ANA, RA factor), ferritin (inflammation), occult infection. Triggers acute-phase confound flag across panel.
- **>10 sustained (2 readings ≥4 weeks apart):** Safety Override triggered. Urgent physician workup.
- **Retest timeline:** 8–12 weeks after starting protocol; not sooner (response is gradual)

---

## 46. HOMOCYSTEINE
*System group: Inflammation (System 9) / Methylation / Cardiovascular*

**1. IDENTITY**
- Standard name: Homocysteine
- Aliases: Hcy, Total Homocysteine, tHcy
- Unit: µmol/L
- Note: fasting sample; sample must be processed within 30 min or kept on ice (otherwise falsely elevated)

**2. THREE-TIER RANGES**
- Lab range (Indian labs): 5–15 µmol/L
- Zenoho Optimal: <10 µmol/L (Attia targets <8)
- Zenoho Watch zone: 10–12 µmol/L
- Zenoho Alert: >12 (start protocol) | >15 (urgent — CV/dementia risk) | >50 (genetic — MTHFR or CBS, refer)
- Citation: Attia *Outlive* targets <8; Smith & Refsum (*Annu Rev Nutr* 2016) — homocysteine >12 raises dementia risk; ICMR vegetarian cohorts show baseline elevation due to B12 deficiency

**3. NATIONALITY MODIFIERS**
- IN: **Critical modifier.** Vegetarian Indians have homocysteine 30–50% higher than omnivores (Yajnik et al., AIIMS/KEM Pune studies). Drivers: B12 deficiency (epidemic), MTHFR C677T variant in 15–20% Indians, low B6 from low animal protein. Aggressive supplementation justified.
- ME: lacto-vegetarian patterns — similar to IN
- UK/EU: lower baseline; same Optimal
- US: lower baseline; same Optimal
- Default: IN

**4. PERSONALISATION**
- <18: <8
- 18–40: <10 (target <8 if family history of CVD/stroke)
- 40–60: <10
- 60+: <12 acceptable (creeps up with age and renal function), but pursue <10 for longevity
- Gender: F slightly lower pre-menopause; rises post-menopause

**5. SCORING**
- Weight: 5/100
- Calc method: linear penalty above 10; doubled above 12
- System group: **Inflammation (System 9) / Methylation / Cardiovascular (cross-system marker)**

**6. PLAIN ENGLISH**
- Measures: a toxic amino acid byproduct that piles up when your body can't recycle it properly. The recycling needs B12, folate, and B6 as cofactors — so high homocysteine usually means one or more of those is short.
- Low feels like: sharp mind, stable mood, clean cardiovascular signal
- High feels like: mostly silent. Long-term it accelerates artery damage and brain shrinkage (Oxford OPTIMA trial showed B-vitamin lowering of homocysteine slowed brain atrophy in mild cognitive impairment).
- Optimal feels like: clean methylation engine — cognition, mood, detox all working

**7. ACTION PROTOCOL**
- **>10 µmol/L (start protocol):** The "Methylation Trio" — non-negotiable as a unit:
  - **Methylcobalamin (B12)** 1000 mcg sublingual daily
  - **Methylfolate (L-5-MTHF)** 800 mcg daily — *not* folic acid (50% of Indians have MTHFR variant that can't process folic acid efficiently)
  - **P5P (active B6)** 25 mg daily
  - Optional: **Trimethylglycine (TMG/Betaine)** 1g/d if homocysteine >15
- **Lifestyle:** Reduce coffee >3 cups (depletes B vitamins), limit alcohol, address gut absorption (PPI use lowers B12 absorption — review with physician)
- **>15 µmol/L:** Add TMG 1–3g/d. Test for MTHFR C677T and A1298C variants. Check kidney function (homocysteine rises with CKD). Vegetarians — strongly consider lifelong B12 maintenance dose.
- **>50 µmol/L:** Refer endocrinology/genetics — likely homocystinuria (CBS deficiency) or severe B-vitamin deficiency. Specialist protocol required.
- **Cross-marker rule:** If homocysteine high AND B12 borderline (300–500 pg/mL) — treat the B12 even though "lab normal." This is the classic Indian vegetarian pattern.
- **Retest timeline:** 8–12 weeks after starting Methylation Trio

---

## 47. FREE T3 (Free Triiodothyronine)
*System group: Thyroid / Endocrine (System 7)*

**1. IDENTITY**
- Standard name: Free Triiodothyronine
- Aliases: FT3, Free T3
- Unit: pg/mL
- Conversion: pg/mL × 1.536 = pmol/L

**2. THREE-TIER RANGES**
- Lab range (HOD): 2.77–5.27 pg/mL
- Zenoho Optimal: 3.5–4.5 pg/mL (upper-mid third of range — active conversion indicator)
- Zenoho Watch zone: 3.0–3.5 pg/mL (sub-optimal conversion brewing)
- Zenoho Alert: <3.0 (poor T4→T3 conversion) | <2.77 (overt deficiency) | >5.0 (hyperthyroid conversion) | >5.27 (urgent)
- Citation: HOD lab interval; functional medicine consensus (Optimal DX, Lamkin Clinic, Hagmeyer) — symptomatic patients normalise at upper-mid range, not lab "anywhere normal"

**3. NATIONALITY MODIFIERS**
- IN: **Critical population.** Conversion failure rampant due to:
  - Selenium deficiency (Indian soil is selenium-poor across most regions; vegetarian diet limits intake further)
  - Low ferritin (especially women — iron is required for thyroid peroxidase)
  - Chronic stress / high cortisol (urban professionals — cortisol blocks T4→T3 conversion and shunts to reverse T3)
  - Zinc deficiency (vegetarians)
  - All four often co-occur. Same Optimal applies — IN users frequently fall in 2.8–3.4 range and feel hypothyroid despite "normal" TSH and FT4.
- ME: similar — same protocol
- UK/EU: same Optimal; conversion issues less prevalent
- US: same Optimal
- Default: IN

**4. PERSONALISATION**
- <18: 3.5–5.0 pg/mL (children run higher)
- 18–40: 3.5–4.5
- 40–60: 3.3–4.5 (slight age decline acceptable)
- 60+: 3.0–4.3
- Gender: F more prone to conversion failure; pregnancy uses different trimester ranges; PCOS/perimenopause users often run low

**5. SCORING**
- Weight: 4/100
- Calc method: paired with TSH and FT4 — flags "conversion failure pattern" (TSH normal + FT4 normal + FT3 low). U-curve scoring.
- System group: Thyroid / Endocrine (System 7)

**6. PLAIN ENGLISH**
- Measures: the **active** thyroid hormone — the one your cells actually use. FT4 is storage, FT3 is the working currency.
- **Why this marker matters:** You can have a perfect TSH and a perfect FT4 and still feel hypothyroid — fatigued, cold, foggy, slow weight loss, dry skin, hair fall. That's because your body is failing to convert T4 (storage) into T3 (active). Most labs and most doctors never check FT3, then tell you "your thyroid is fine" while you suffer. It isn't fine.
- Low feels like: persistent fatigue despite "normal labs," cold hands/feet, brain fog, hair shedding, weight that won't budge, low mood, slow pulse, constipation
- Optimal feels like: warm body, sharp thinking, stable energy, predictable weight management, hair on head not pillow
- High feels like: tremor, palpitations, anxiety, weight loss without trying, heat intolerance

**7. ACTION PROTOCOL**
- **The conversion-failure pattern (TSH normal + FT4 normal + FT3 <3.5):** Don't go to levothyroxine. The thyroid is making hormone fine — the body isn't activating it. Address cofactors:
  - **Selenomethionine** 200 mcg/d (most important — required for deiodinase enzyme that converts T4→T3)
  - **Zinc picolinate** 15 mg/d
  - **Iron/ferritin protocol** if ferritin <70 (see Marker 42)
  - **Stress/cortisol management** — sleep ≥7h, Zone 2 cardio not HIIT-only, meditation/breathwork, magnesium glycinate 400 mg at night
  - **Tyrosine** 500 mg morning (precursor) — only if not on SSRIs/MAOIs
  - Cut chronic dieting/severe caloric restriction (<1500 kcal/d in F suppresses T3)
- **FT3 <3.0 + symptoms + normal TSH:** Consider Reverse T3 testing — high reverse T3 confirms cortisol-driven shunting; address adrenal/stress
- **FT3 <2.77 + high TSH:** Endocrinologist; possible need for combination T4/T3 therapy or NDT (natural desiccated thyroid) — physician decision
- **FT3 >5.0:** Pair with low TSH → Graves'/hyperthyroid workup; endocrinologist
- **Retest timeline:** 8 weeks after starting cofactor protocol
- **Biotin warning:** If user is taking biotin >2.5 mg/d, pause for 72h before retesting (see Biotin Interference Rule appendix)

---

---

# [v1.1.5] v1.1.5 ADDITIONS (Markers 48–62)

The following fifteen markers were added in v1.1.5. They are numbered chronologically (48–62) but assigned to their logical systems for scoring purposes. See **Appendix 1 — System Order Map** for the full marker-to-system mapping.

---

# [v1.1.5] SYSTEM 10: HORMONES (6 markers — PTH, Cortisol AM, Total Testosterone, Free Testosterone, SHBG, DHEA-S)
*New system in v1.1.5. Anchors the endocrine axis beyond thyroid — adrenal, gonadal, and parathyroid signalling. System weight 5%.*
*Note: Female-specific hormone markers (Estradiol, Progesterone, FSH, LH, AMH) are deferred to v1.2 since they require menstrual cycle phase context for interpretation.*

---

## [v1.1.5] 48. MCHC (Mean Corpuscular Haemoglobin Concentration)
*System group: Blood / Haematology (System 1)*

**1. IDENTITY**
- Standard name: Mean Corpuscular Haemoglobin Concentration
- Aliases: MCHC
- Unit: g/dL
- Note: Calculated indirectly (Hb / HCT × 100); changes are subtle but clinically informative

**2. THREE-TIER RANGES**
- Lab range (HOD): 31.5–34.5 g/dL
- Zenoho Optimal: 32.5–34.0 g/dL
- Zenoho Watch zone: 31.5–32.5 or 34.0–34.5 g/dL
- Zenoho Alert: <31.5 (hypochromia — iron deficiency) | >35 (hereditary spherocytosis or lab error)
- Citation: Standard haematology references; HOD lab interval; Optimal DX functional ranges

**3. NATIONALITY MODIFIERS**
- IN: same Optimal; low MCHC frequently flags iron deficiency in vegetarian/menstruating users
- ME: same
- UK/EU: same
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 31.0–34.5
- 18–60: as primary
- 60+: same
- Gender: F runs slightly lower with menses — same target

**5. SCORING**
- Weight: 2/100 (within Blood system) — companion marker to MCV/MCH
- Calc method: U-curve; pairs with iron-status interpretation
- System group: Blood / Haematology (System 1)

**6. PLAIN ENGLISH**
- Measures: how concentrated haemoglobin is inside each red cell
- Low feels like: paired with iron-deficiency symptoms (fatigue, breathless on stairs)
- High feels like: rare; usually a lab artefact (lipemia, hemolysis) before disease
- Optimal feels like: nothing specific — read with MCV and MCH

**7. ACTION PROTOCOL**
- Below optimal: same iron protocol as Marker 1 (Hb) and Marker 11 (MCV) — Iron bisglycinate 25 mg + Vit C 250 mg, alternate days. If Mentzer Index <13 in IN/ME users, Hb electrophoresis to rule out thalassaemia trait
- Above optimal: rare; check sample integrity (lipemia, hemolysis can falsely elevate). If sustained high — investigate hereditary spherocytosis
- Retest: 8–12 weeks after iron protocol

---

## [v1.1.5] 49. RDW (Red Cell Distribution Width)

*System group: Blood / Haematology (System 1)*

**1. IDENTITY**
- Standard name: Red Cell Distribution Width
- Aliases: RDW, RDW-CV (most common in India), RDW-SD
- Unit: % (RDW-CV); fL (RDW-SD)

**2. THREE-TIER RANGES**
- Lab range (HOD): RDW-CV 11.5–14.5%
- Zenoho Optimal: 11.5–13.0%
- Zenoho Watch zone: 13.0–14.5%
- Zenoho Alert: >14.5 (anisocytosis — early iron deficiency, mixed anaemia, or B12 deficiency) | >16 (significant)
- Citation: RDW elevation is one of the *earliest* signs of iron or B12 deficiency, often before MCV shifts (Lippi et al., *Clin Chem Lab Med* 2014); Patel et al. — RDW as all-cause mortality predictor (*Arch Intern Med* 2009)

**3. NATIONALITY MODIFIERS**
- IN: high prevalence of mixed deficiency (iron + B12 in vegetarians) — RDW often high before MCV changes; aggressive flag
- ME: similar
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: <14.0
- 18–60: as primary
- 60+: <14.5 acceptable (mild widening with age)
- Gender: F may run slightly higher with menses — same target

**5. SCORING**
- Weight: 4/100 (under-rated; early-warning marker)
- Calc method: linear penalty above 13.0; doubled above 14.5
- System group: Blood / Haematology (System 1)

**6. PLAIN ENGLISH**
- Measures: how varied your red blood cells are in size — when some are big and some are small, RDW rises
- Low feels like: nothing — uniform red cells are healthy
- High feels like: usually fatigue paired with subtle iron or B12 deficiency before other markers move; sometimes called "the canary in the coal mine" of nutrition status
- Optimal feels like: clean uniform red cell production

**7. ACTION PROTOCOL**
- Above optimal (>13.0): Order ferritin, B12, folate together. RDW high + low ferritin → iron deficiency emerging. RDW high + low B12 → start methylcobalamin protocol. Mixed deficiency in vegetarians common — treat both.
- >14.5 + symptoms: full anaemia workup; consider reticulocyte count
- Retest: 8–12 weeks after starting protocol; RDW slowest to normalise (lifespan of RBC ~120 days)

---

## [v1.1.5] 50. CALCIUM
*System group: Kidney / Bone-Mineral (System 4)*

**1. IDENTITY**
- Standard name: Serum Total Calcium
- Aliases: Ca, S. Calcium, Total Calcium
- Unit: mg/dL
- Conversion: mg/dL × 0.25 = mmol/L
- Note: Total calcium is bound to albumin; in low-albumin states, *corrected calcium* = measured Ca + 0.8 × (4.0 − albumin g/dL)

**2. THREE-TIER RANGES**
- Lab range: 8.5–10.5 mg/dL
- Zenoho Optimal: 9.2–10.0 mg/dL
- Zenoho Watch zone: 8.7–9.2 or 10.0–10.5 mg/dL
- Zenoho Alert: <8.5 (hypocalcaemia — Vit D, PTH, magnesium workup) | >10.5 (hypercalcaemia — PTH, malignancy screen) | <7.5 or >12 — emergency (see Safety Override)
- Citation: ESI 2025 Vitamin D Consensus pairs calcium with Vit D and PTH for bone-mineral interpretation; standard endocrine references

**3. NATIONALITY MODIFIERS**
- IN: Vit D deficiency epidemic + low dairy in some users → calcium often low-normal with high PTH (secondary hyperparathyroidism). Always interpret with Vit D and PTH.
- ME: similar (high Vit D deficiency despite sunlight)
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 8.8–10.8 (higher in growth)
- 18–40: 9.2–10.0
- 40–60: 9.0–10.0
- 60+: 9.0–10.0 (osteoporosis context — interpret with Vit D, PTH)
- Gender: same; pregnancy/lactation increase demand

**5. SCORING**
- Weight: 4/100 (within Kidney/Bone system)
- Calc method: U-curve; safety override on extremes
- System group: Kidney / Bone-Mineral (System 4)

**6. PLAIN ENGLISH**
- Measures: blood calcium level — tightly regulated by parathyroid hormone, vitamin D, and the kidneys
- Low feels like: muscle cramps, tingling around mouth, fingers, twitchy reflexes
- High feels like: kidney stones, bone aches, abdominal cramps, depression — "stones, bones, groans, and psychiatric overtones"
- Optimal feels like: stable bone health, normal nerve and muscle function

**7. ACTION PROTOCOL**
- Below optimal (8.5–9.2): Vit D check (Marker 36) → if <40 ng/mL, start protocol. Magnesium glycinate 400 mg/d. Dietary calcium 1000–1200 mg/d (dairy, fortified plant milk, leafy greens, sesame). PTH check if Vit D normal but Ca still low.
- <8.5 mg/dL: PTH + Vit D + Mg + Phosphate panel. Symptomatic hypocalcaemia is a medical emergency.
- 10.0–10.5: PTH + ionised calcium check. Common cause: primary hyperparathyroidism, less commonly malignancy or excess Vit D supplementation.
- >10.5: Stop calcium and Vit D supplements. PTH, PTHrP, and chest imaging. Endocrinologist.
- >12 or <7.5: **Safety Override triggered** — emergency referral.
- Retest: 4–6 weeks after intervention

---

## [v1.1.5] 51. GLOBULIN
*System group: Liver / Nutrition (System 3)*

**1. IDENTITY**
- Standard name: Serum Globulin
- Aliases: Globulin, Total Globulin
- Unit: g/dL
- Calculation: Total Protein − Albumin (most labs report it this way; some measure directly)

**2. THREE-TIER RANGES**
- Lab range: 2.0–3.5 g/dL
- Zenoho Optimal: 2.3–3.0 g/dL
- Zenoho Watch zone: 2.0–2.3 or 3.0–3.5 g/dL
- Zenoho Alert: <2.0 (immunoglobulin deficiency, severe protein loss) | >3.5 (chronic inflammation, autoimmune, or monoclonal gammopathy)
- Citation: Standard biochemistry references; Albumin/Globulin (A/G) ratio of 1.2–2.0 normal, <1.0 suggests inflammation or liver disease

**3. NATIONALITY MODIFIERS**
- IN: chronic infection (TB latent, parasitic load) raises globulins more often than in Western populations — interpret with hs-CRP and clinical picture
- ME: similar
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 1.8–3.6
- 18–60: as primary
- 60+: 2.0–3.5 (slight rise with age)
- Gender: same

**5. SCORING**
- Weight: 2/100 (within Liver system) — companion to Albumin
- Calc method: U-curve; A/G ratio also evaluated
- System group: Liver / Nutrition (System 3)

**6. PLAIN ENGLISH**
- Measures: the antibody and inflammation proteins in your blood (immunoglobulins + complement + transport proteins, minus albumin)
- Low feels like: frequent infections, slow recovery, immune compromise — antibody deficiency
- High feels like: chronic infection or autoimmune flare — fatigue, joint pain, fevers
- Optimal feels like: balanced immune readiness without chronic inflammation

**7. ACTION PROTOCOL**
- Below optimal (<2.0): Immunoglobulin panel (IgG, IgA, IgM) — primary or secondary immune deficiency workup. Rule out protein loss (urine ACR, gut)
- 3.0–3.5: pair with hs-CRP (Marker 45). If hs-CRP also raised → chronic inflammation; address root cause. If hs-CRP normal → consider monoclonal gammopathy (SPEP)
- >3.5 sustained: SPEP (serum protein electrophoresis) + immunofixation; rule out multiple myeloma, MGUS, chronic infection
- A/G ratio <1.0: investigate liver synthesis vs. globulin elevation
- Retest: 8–12 weeks

---

## [v1.1.5] 52. ESR (Erythrocyte Sedimentation Rate)
*System group: Inflammation (System 9)*

**1. IDENTITY**
- Standard name: Erythrocyte Sedimentation Rate
- Aliases: ESR, Sed Rate, Westergren
- Unit: mm/hr
- Note: Non-specific inflammation marker; rises slowly, falls slowly; less specific than hs-CRP but cheap and widely available in India

**2. THREE-TIER RANGES**
- Lab range: M up to 15 | F up to 20 mm/hr (some labs use age-adjusted: age/2 for M, (age+10)/2 for F)
- Zenoho Optimal: M <10 | F <15 mm/hr
- Zenoho Watch zone: M 10–15 | F 15–20 mm/hr
- Zenoho Alert: M >15 / F >20 (chronic inflammation/infection) | >50 (significant inflammation — TB, autoimmune, malignancy workup)
- Citation: Standard age-adjusted formulas (Miller et al.); IFM functional ranges; widely used in Indian rheumatology and TB screening

**3. NATIONALITY MODIFIERS**
- IN: TB and chronic parasitic load common — sustained ESR elevation should trigger TB screening (Mantoux/IGRA + chest X-ray)
- ME: similar
- UK/EU: less weight on TB
- US: less weight on TB
- Default: IN

**4. PERSONALISATION**
- <18: M <10, F <15 (children run lower)
- 18–40: as primary
- 40–60: M <12, F <18
- 60+: ESR rises naturally with age; M <(age/2), F <((age+10)/2) acceptable
- Gender: F naturally higher; pregnancy raises significantly (40+ normal)

**5. SCORING**
- Weight: 3/100 (within Inflammation system)
- Calc method: linear penalty above optimal; pairs with hs-CRP for confirmation (hs-CRP is more specific)
- System group: Inflammation (System 9)

**6. PLAIN ENGLISH**
- Measures: an old-school inflammation marker — how fast red blood cells settle in a tube. Higher = more inflammatory proteins coating cells, making them clump and fall faster.
- Low feels like: clean inflammation profile
- High feels like: chronic infection, autoimmune condition, or chronic disease — often vague (fatigue, joint stiffness, malaise)
- Optimal feels like: low chronic inflammation burden

**7. ACTION PROTOCOL**
- Watch zone: Pair with hs-CRP. If hs-CRP also raised → confirms chronic inflammation; same protocol (visceral fat, sleep, omega-3, curcumin — see Marker 45)
- Alert (M >15 / F >20): rule out TB (especially IN), latent infections (sinus, dental, urinary), autoimmune (ANA, RF, anti-CCP if joint symptoms), malignancy screen if persistent + weight loss
- >50: urgent workup — physician referral within 1 week
- Retest: 8 weeks (ESR slow to move)
- Cross-marker: ESR > 20 + hs-CRP < 1 → consider lab error or chronic mild inflammation; repeat both

---

## [v1.1.5] 53. ApoB (Apolipoprotein B)
*System group: Lipids / Cardiovascular (System 5)*

**1. IDENTITY**
- Standard name: Apolipoprotein B
- Aliases: ApoB, Apo-B, Apolipoprotein B-100
- Unit: mg/dL
- Note: One ApoB molecule per atherogenic lipoprotein particle (LDL, VLDL, IDL, Lp(a)) — direct measure of atherogenic particle count, more accurate than LDL-C

**2. THREE-TIER RANGES**
- Lab range (LabCorp/Indian labs typical): <90 desirable; 90–99 borderline; 100–130 high; >130 very high
- Zenoho Optimal: <80 mg/dL (general); <60 if any CVD risk; <50 if existing plaque or Lp(a) elevated
- Zenoho Watch zone: 80–90 mg/dL
- Zenoho Alert: >90 (start protocol) | >130 (intensive intervention) | >150 (familial hypercholesterolaemia screen)
- Citation: Attia (*Outlive*) "get it as low as possible, as early as possible"; NLA 2024 Expert Clinical Consensus on ApoB (Williams et al., *J Clin Lipidol*); ESC 2019 (very high risk: <65 mg/dL); Indian risk profile justifies stricter primary-prevention thresholds

**3. NATIONALITY MODIFIERS**
- IN: South Asians develop ASCVD at lower ApoB than Caucasians — keep <80 as primary prevention target. ~25% of urban Indians also have elevated Lp(a) (Marker 44), pushing combined particle burden higher
- ME: similar
- UK/EU: <90 acceptable for low-risk
- US: <90 standard
- Default: IN

**4. PERSONALISATION**
- <18: <90 (familial hypercholesterolaemia screen if higher)
- 18–40: <80
- 40–60: <80; <60 if CAC score >0 or family history
- 60+: <70 with prior plaque; <80 otherwise
- Gender: same; F protected pre-menopause but loses advantage after

**5. SCORING**
- Weight: 8/100 (within Lipids/CV system) — highest in lipid panel; supersedes LDL when both available
- Calc method: linear; doubled penalty above 90; ApoB takes precedence over LDL when both present
- System group: Lipids / Cardiovascular (System 5)

**6. PLAIN ENGLISH**
- Measures: the actual count of plaque-causing particles in your blood — not the cholesterol they're carrying, but how *many* of them are circulating
- **Why this marker beats LDL:** Two people can have identical LDL numbers, but one has many small dense particles (worse) and the other has fewer large fluffy particles (better). ApoB counts the particles directly. More particles = more chances to wedge into artery walls.
- High feels like: silent — atherosclerosis is asymptomatic until plaque ruptures decades later
- Optimal feels like: nothing — but adds healthy years to your life

**7. ACTION PROTOCOL**
- **Above optimal (>80):**
  - Diet: Saturated fat <10% calories; soluble fiber 30g/d (oats, psyllium 10g, beans); eliminate trans-fats; replace ghee/butter excess with olive oil/avocado
  - Supplements: Bergamot 1000 mg/d, Red Yeast Rice 1200 mg (with CoQ10 200 mg), Berberine 500 mg ×2/d, Plant sterols 2g/d
  - Exercise: Zone 2 cardio 3 hr/wk + resistance 3×/wk
- **>90 mg/dL with family history of CVD or Lp(a) >30:** Cardiologist for statin/ezetimibe consideration. Statins lower ApoB 30–50%; ezetimibe adds 15–20%; PCSK9-i for refractory cases
- **>130:** Lipid clinic referral. Familial hypercholesterolaemia screen (genetic testing if + family history)
- **>150:** **Safety Override consideration** (paired with LDL >190 trigger) — urgent specialist referral
- **Cross-marker rule:** ApoB high + LDL normal = "discordant lipid pattern" (Rule 15) — small dense LDL particles dominant; treat as ApoB-driven CV risk regardless of LDL number
- Retest: 12 weeks after intervention

---

## [v1.1.5] 54. FASTING INSULIN
*System group: Glucose / Metabolic (System 2)*

**1. IDENTITY**
- Standard name: Fasting Serum Insulin
- Aliases: Fasting Insulin, S. Insulin (Fasting), Insulin Fasting
- Unit: µIU/mL (= mIU/L)
- Conversion: µIU/mL × 6.945 = pmol/L
- Note: 8–12 hour fasting required; is the input to HOMA-IR calculation but valuable on its own

**2. THREE-TIER RANGES**
- Lab range: 2–25 µIU/mL (very wide — most "normal" values already abnormal)
- Zenoho Optimal: <8 µIU/mL (Attia targets <5 in lean metabolically healthy)
- Zenoho Watch zone: 8–12 µIU/mL
- Zenoho Alert: >12 (insulin resistance brewing) | >20 (significant IR) | >30 (severe IR / metabolic syndrome)
- Citation: Attia targets fasting insulin <5 in *Outlive*; Kraft (*Diabetes Epidemic & You*) — fasting insulin >10 = preclinical diabetes years before HbA1c rises; AIIMS/MDRF Indian metabolic studies

**3. NATIONALITY MODIFIERS**
- IN: South Asians run higher fasting insulin at same BMI ("thin-fat" phenotype). Optimal stricter — <8 baseline. PCOS users especially: <6 target (insulin resistance is core driver)
- ME: similar
- UK/EU: <10 acceptable
- US: <10 acceptable
- Default: IN

**4. PERSONALISATION**
- <18: <10 (puberty raises naturally)
- 18–40: <8
- 40–60: <8
- 60+: <10 (slight age drift)
- Gender: F PCOS users target <6; pregnancy uses different cutoffs

**5. SCORING**
- Weight: 6/100 (within Glucose system) — earliest metabolic warning marker
- Calc method: linear penalty above 8; doubled above 12
- System group: Glucose / Metabolic (System 2)

**6. PLAIN ENGLISH**
- Measures: how much insulin your pancreas is pumping out just to keep glucose normal
- **Why this marker matters:** This is the *earliest* metabolic warning sign. Years before HbA1c rises, fasting insulin climbs as the pancreas works harder. Catching it here = reverse it. Catching it at HbA1c 6.0 = manage it.
- Low feels like: lean, metabolically healthy, easy fat loss
- High feels like: belly fat that won't shift, cravings 2 hours after meals, brain fog, energy crashes, skin tags, dark patches at neck/armpits (acanthosis nigricans), PCOS symptoms in women
- Optimal feels like: stable cravings, predictable fat loss, sustained energy

**7. ACTION PROTOCOL**
- **Above optimal (>8):** Same protocol as HOMA-IR (Marker 15):
  - Inositol (Myo + D-chiro 40:1) 4g/d
  - Berberine 500 mg ×3/d
  - Magnesium glycinate 400 mg
  - 10–15 min walk after each meal (most underrated intervention)
  - Time-restricted eating (10h window)
  - Resistance training 3×/week (most potent single intervention long-term)
- **>15:** All above + CGM trial 14 days to identify glucose spikes. Visceral fat reduction priority (waist <90 cm M / <80 cm F)
- **>25 + acanthosis nigricans:** Endocrinology referral; possible early metformin consideration with physician
- **PCOS users:** Inositol + Berberine as above; metformin with gynaecologist if cycles not regulated in 12 weeks
- Cross-marker: Fasting insulin >12 + uric acid >5.5 + TG >100 → metabolic syndrome triad (Rule 9)
- Retest: 12 weeks (paired with HOMA-IR and HbA1c)

---

## [v1.1.5] 55. PTH (Parathyroid Hormone)
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Parathyroid Hormone (intact)
- Aliases: PTH, iPTH, Intact PTH, Parathormone
- Unit: pg/mL (= ng/L)

**2. THREE-TIER RANGES**
- Lab range: 15–65 pg/mL
- Zenoho Optimal: 25–45 pg/mL
- Zenoho Watch zone: 45–65 pg/mL
- Zenoho Alert: <15 (hypoparathyroidism — Mg, Ca check) | >65 (secondary hyperparathyroidism — Vit D first; primary if Ca also high) | >100 (urgent endocrinology)
- Citation: ESI 2025 Vit D Consensus pairs PTH with Ca and Vit D for bone-mineral interpretation; Endocrine Society guidelines

**3. NATIONALITY MODIFIERS**
- IN: Vit D deficiency epidemic (70–90% of urban Indians) → secondary hyperparathyroidism extremely common (PTH compensates for low Vit D by leaching calcium from bone). Always interpret PTH with Vit D and Ca.
- ME: same pattern (high Vit D deficiency despite sunlight)
- UK/EU: less prevalent — same Optimal
- US: less prevalent — same Optimal
- Default: IN

**4. PERSONALISATION**
- <18: 10–60
- 18–40: 25–45
- 40–60: 25–50
- 60+: 25–55 (modest rise with age and renal decline acceptable)
- Gender: F slightly higher post-menopause

**5. SCORING**
- Weight: 4/100 (within Hormones system)
- Calc method: linear penalty above 45; cross-marker rule with Vit D and Ca
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: the hormone that controls calcium balance — released by tiny parathyroid glands in the neck when blood calcium is low
- High feels like: bone aches, muscle weakness, kidney stones (advanced); often silent for years while bone density quietly decreases
- Low feels like: muscle cramps, tingling around mouth and fingertips, twitchy reflexes
- Optimal feels like: stable calcium, healthy bone turnover

**7. ACTION PROTOCOL**
- **45–65 pg/mL + Vit D <40:** Secondary hyperparathyroidism — body compensating for Vit D deficiency. **Cross-marker Rule 13 triggers.** Aggressive Vit D loading (Marker 36 protocol) + calcium 1000–1200 mg/d + Mg 400 mg/d + retest both PTH and Vit D in 12 weeks. PTH should fall back to optimal as Vit D normalises.
- **>65 + Vit D normal + Ca high:** Suspect *primary* hyperparathyroidism — endocrinology referral, neck ultrasound, sestamibi scan, possible parathyroidectomy
- **>65 + Vit D normal + Ca normal:** Recheck after Vit D loading. Rule out CKD-related secondary hyperparathyroidism (eGFR check)
- **<15 + Ca low:** Hypoparathyroidism — endocrinology
- **>100:** Urgent referral
- Retest: 8–12 weeks after Vit D loading; sooner if symptomatic

---

## [v1.1.5] 56. CORTISOL AM
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Serum Cortisol (Morning)
- Aliases: Cortisol AM, 8 AM Cortisol, Morning Cortisol
- Unit: µg/dL
- Conversion: µg/dL × 27.59 = nmol/L
- Note: **Must be drawn 7–9 AM** (circadian peak); any other timing makes the value misleading

**2. THREE-TIER RANGES**
- Lab range: 6–23 µg/dL (8 AM)
- Zenoho Optimal: 10–18 µg/dL
- Zenoho Watch zone: 6–10 or 18–23 µg/dL
- Zenoho Alert: <6 (adrenal insufficiency suspect) | >23 (HPA axis hyperactivity) | <3 or >35 — adrenal emergency (see Safety Override)
- Citation: Endocrine Society guidelines; functional medicine optimal range (Hagmeyer, Optimal DX); Indian endocrine consensus

**3. NATIONALITY MODIFIERS**
- IN: Urban professionals — chronic stress drives elevated cortisol (high end of range or above). Vegetarians on calorie-restricted diets — risk of low cortisol from chronic adaptation. Same Optimal applies.
- ME: similar urban stress profile
- UK/EU: same
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: 7–25 (children/teens slightly wider)
- 18–40: 10–18
- 40–60: 10–18
- 60+: 8–18 (slight cortisol decline normal with age)
- Gender: same range; F may run slightly higher in luteal phase, with OCP

**5. SCORING**
- Weight: 4/100 (within Hormones system)
- Calc method: U-curve; safety override on extremes
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: your stress hormone — should be high in the morning (kicks you awake) and low at night (lets you sleep)
- High feels like: wired-but-tired, belly fat that won't shift, anxiety, poor sleep despite tiredness, sugar/salt cravings, blood pressure rising, skin thinning
- Low feels like: chronic fatigue, low mood, salt cravings, dizziness on standing, exercise intolerance, recovery slow
- Optimal feels like: morning energy without anxiety, sleep at night, stable mood, predictable energy through the day

**7. ACTION PROTOCOL**
- **High (18–23 µg/dL):**
  - Sleep: 7+ hours, lights out by 11 PM (stops cortisol creep)
  - Stress audit: meditation, breathwork, walking in nature
  - Cut caffeine after noon, alcohol (raises cortisol overnight)
  - Phosphatidylserine 100 mg before bed (lowers nighttime cortisol)
  - Ashwagandha (KSM-66) 600 mg/d (clinically validated cortisol modulator in Indian studies)
  - Magnesium glycinate 400 mg at night
- **Low (6–10 µg/dL):**
  - Liquorice root extract (DGL avoid — need standardised glycyrrhizin) or Ashwagandha 600 mg/d
  - Address calorie restriction — eat enough, especially post-exercise
  - Salt audit (low-sodium diets can worsen low cortisol)
  - 4-point salivary cortisol if persistent — addresses circadian profile
  - **<3 µg/dL: Safety Override triggered** — urgent endocrinology workup (Addison's disease screen with ACTH stim test)
- **>35 µg/dL: Safety Override triggered** — urgent workup (Cushing's screen — 24h urine cortisol, dexamethasone suppression test)
- **Critical:** Sample MUST be 7–9 AM. If user took test at 4 PM with cortisol of 4 µg/dL — that's normal evening cortisol, not adrenal insufficiency. Verify timing before flagging.
- Retest: 8 weeks after starting protocol; consider 4-point salivary cortisol for fuller picture

---

## [v1.1.5] 57. ANTI-TPO ANTIBODIES
*System group: Thyroid (System 7)*

**1. IDENTITY**
- Standard name: Anti-Thyroid Peroxidase Antibodies
- Aliases: Anti-TPO, TPO Ab, Anti-Microsomal Antibodies
- Unit: IU/mL (some labs report in U/mL, numerically same)

**2. THREE-TIER RANGES**
- Lab range: <34 IU/mL (Indian labs vary 0–35 cutoff)
- Zenoho Optimal: <9 IU/mL (truly negative)
- Zenoho Watch zone: 9–34 IU/mL (early autoimmune signal — within "lab normal" but rising)
- Zenoho Alert: >34 (Hashimoto's autoimmunity confirmed) | >100 (significant titre, aggressive monitoring)
- Citation: Optimal DX functional ranges; Indian thyroid prevalence studies (Mumbai, Cochin) — anti-TPO+ in 12–15% of women drives the IN hypothyroidism epidemic; Hollowell *J Clin Endocrinol Metab* 2002

**3. NATIONALITY MODIFIERS**
- IN: Hashimoto's prevalence high in Indian women (~12–15% anti-TPO positive). Often "subclinical" — TSH borderline + anti-TPO positive. Treat earlier; don't wait for overt hypothyroidism
- ME: similar female prevalence
- UK/EU: similar
- US: similar
- Default: IN

**4. PERSONALISATION**
- <18: <9; rising with puberty in girls warrants monitoring
- 18–40: <9
- 40–60: <9
- 60+: <34 acceptable (mild positive may be incidental late in life)
- Gender: F 5–7× more likely to be positive; pregnancy planning — anti-TPO+ raises miscarriage and post-partum thyroiditis risk; closer monitoring

**5. SCORING**
- Weight: 3/100 (within Thyroid system)
- Calc method: binary penalty above 34; doubled if >100; if positive, raises retest frequency for TSH/FT4/FT3
- System group: Thyroid (System 7)

**6. PLAIN ENGLISH**
- Measures: whether your immune system is attacking your thyroid — the cause of Hashimoto's, the most common cause of hypothyroidism worldwide
- Low/optimal feels like: stable thyroid function, no autoimmune burden
- High feels like: often silent for years; eventually fatigue, weight gain, dry skin, hair fall, cold intolerance as thyroid function declines

**7. ACTION PROTOCOL**
- **>9 (early signal):** Hashimoto's likely beginning. Address gut/immune drivers:
  - Gluten-free trial 90 days (gluten cross-reactivity with thyroid tissue documented in Indian Hashimoto's cohorts)
  - Selenomethionine 200 mcg/d (clinically validated to reduce TPO antibody titres)
  - Vitamin D optimal 40–60 ng/mL (Marker 36)
  - Iron/ferritin >70 (Marker 42)
  - Low-dose Naltrexone (LDN) consideration with knowledgeable physician
  - Address gut dysbiosis (stool test if symptoms)
  - Stress/cortisol management (Marker 56)
- **>34 (Hashimoto's confirmed):** All above + monitor TSH every 6 months; treat with levothyroxine when TSH >2.5 (don't wait for >5 — Indian clinical practice often delays unnecessarily)
- **>500:** Aggressive autoimmune protocol; rheumatology consult if other antibodies rising
- **Pregnancy planning + anti-TPO+:** Pre-conception TSH <2.0 target; close monitoring throughout pregnancy
- **Important:** Anti-TPO does *not* fall to zero with treatment — these antibodies can persist for life. Goal is to slow thyroid destruction, not eliminate antibodies.
- Retest: 12 months (slow-moving marker); TSH/FT4/FT3 every 6 months when positive

---

## [v1.1.5] 58. MAGNESIUM (RBC)
*System group: Vitamins/Minerals/Iron (System 6)*

**1. IDENTITY**
- Standard name: Red Blood Cell Magnesium
- Aliases: Magnesium RBC, RBC Mg, Erythrocyte Magnesium
- Unit: mg/dL or mmol/L
- Note: **RBC Mg is the gold standard** — serum Mg is tightly regulated and stays normal even with severe tissue deficiency. Most labs default to serum; specifically order RBC Mg.

**2. THREE-TIER RANGES**
- Lab range (RBC Mg): 4.0–6.4 mg/dL
- Zenoho Optimal: 5.5–6.4 mg/dL (upper third)
- Zenoho Watch zone: 4.6–5.5 mg/dL
- Zenoho Alert: <4.6 (functional deficiency despite "lab normal") | <4.0 (overt) | >6.5 (over-supplementation, rare)
- Citation: Functional medicine consensus (IFM, Optimal DX) — symptomatic patients respond to supplementation in the 4.6–5.5 zone despite "normal" labs; Schwalfenberg & Genuis (*Scientifica* 2017) review of magnesium clinical relevance

**3. NATIONALITY MODIFIERS**
- IN: Indian soil is magnesium-poor across most regions; vegetarian diets rich in phytates (chelate Mg); 60–80% of urban Indians estimated functionally deficient (low intake + high stress depleting). Aggressive supplementation justified.
- ME: similar soil/dietary patterns
- UK/EU: lower deficiency prevalence — same Optimal
- US: 50%+ Americans deficient; same Optimal
- Default: IN

**4. PERSONALISATION**
- <18: 4.5–6.5
- 18–40: 5.5–6.4
- 40–60: 5.5–6.4
- 60+: 5.0–6.4 (absorption declines, drug interactions common — PPI, diuretics)
- Gender: same; pregnancy — increased demand, target upper range; menstruating women — losses raise demand

**5. SCORING**
- Weight: 5/100 (within Vitamins/Minerals/Iron system)
- Calc method: linear penalty below 5.5
- System group: Vitamins / Minerals / Iron (System 6)

**6. PLAIN ENGLISH**
- Measures: your body's actual stored magnesium — the cofactor for 300+ enzymes in your body, including everything that makes ATP (energy), regulates muscle and nerve, controls blood pressure, and helps you sleep
- **Why RBC Mg matters more than serum Mg:** Your body protects blood Mg fiercely — even at the cost of pulling Mg out of bones and tissue. Serum Mg can look normal while you're severely deficient. RBC Mg shows what's actually inside your cells.
- Low feels like: muscle cramps (especially calves at night), eye twitches, headaches, anxiety, poor sleep, constipation, palpitations, sugar cravings, fatigue, stiff/tight muscles
- Optimal feels like: deep sleep, calm mind, smooth digestion, no cramps, exercise recovery faster

**7. ACTION PROTOCOL**
- **Below optimal (<5.5):**
  - **Magnesium glycinate** 400 mg/d (best for sleep, anxiety, muscle relaxation; least laxative effect)
  - OR **Magnesium malate** 400 mg/d (better for fatigue, fibromyalgia)
  - OR **Magnesium L-threonate** 1 capsule/d (best for cognitive symptoms — crosses blood-brain barrier)
  - Avoid magnesium oxide (60% absorbed in toilet, not body)
  - Take at night for sleep + muscle relaxation
- **<4.6:** Higher dose 600–800 mg/d divided; pair with B6 (P5P 25 mg) for absorption
- **<4.0:** Investigate cause — gut absorption (check celiac, IBD), drug-induced (PPI users especially), refeeding
- **High intake without absorption issues:** Address gut first (Mg absorbed in small intestine; dysbiosis/leaky gut block uptake)
- Retest: 12 weeks (RBC Mg slow to shift — one full RBC lifespan)

---

## [v1.1.5] 59. TOTAL TESTOSTERONE (MALE)
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Total Testosterone
- Aliases: Total T, S. Testosterone, T Total
- Unit: ng/dL
- Conversion: ng/dL × 0.0347 = nmol/L
- Note: **Must be drawn 7–10 AM** (circadian peak); afternoon values 25–35% lower

**2. THREE-TIER RANGES**
- Lab range: 300–1000 ng/dL (wide, unhelpful for performance)
- Zenoho Optimal: 600–900 ng/dL (young adult); 500–800 (40+); 400–700 (60+)
- Zenoho Watch zone: 400–600 (18–40); 350–500 (40+)
- Zenoho Alert: <300 — Endocrine Society hypogonadism cutoff | <250 — definite | <200 — significant
- Citation: Indian Expert Opinion 2023 (Kalra et al., *Int J Endocrinol*); Endocrine Society 2018 (Bhasin et al., *J Clin Endocrinol Metab*); StatPearls — young adult target 600–900, elderly 500–800; AIIMS pilot study (Goel et al.) showed 33% Indian men 40–60 with low free testosterone

**3. NATIONALITY MODIFIERS**
- IN: Hypogonadism prevalence 20–29% in Indian men over 40 (Kalra 2023). Often paired with metabolic syndrome — fixing insulin resistance and visceral fat raises testosterone naturally. Same Optimal applies.
- ME: similar
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: not routinely tested unless puberty concerns
- 18–40: 600–900 ng/dL (peak)
- 40–60: 500–800 ng/dL
- 60+: 400–700 ng/dL (modest decline acceptable; not below 300)
- Gender: this marker is for males. Female total T separate range (15–70 ng/dL) — deferred to female hormone panel v1.2

**5. SCORING**
- Weight: 5/100 (within Hormones system) — high impact on quality of life, body composition, mood, sex drive, recovery
- Calc method: U-curve (low penalised more than high in normal range)
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: total testosterone in your blood — both bound (~98% to SHBG and albumin) and free (~2%, the active form)
- Low feels like: low sex drive, soft erections, fatigue, brain fog, weight gain especially belly, muscle loss, low mood, irritability, poor recovery from workouts, slow shave growth
- High feels like: aggression, acne, dense facial hair, oily skin (rare unless steroid use)
- Optimal feels like: stable energy, sex drive, motivation, confidence, easy muscle building, good recovery

**7. ACTION PROTOCOL**
- **Below optimal (interpret with Free T and SHBG — Markers 60, 61):**
  - Lifestyle (raises T 100–200 ng/dL in deficient men):
    - Resistance training 3–4×/week (compound lifts especially)
    - Sleep 7–8 hours (every hour of sleep loss drops T 10–15%)
    - Visceral fat reduction (waist <90 cm) — fat tissue converts T → estrogen via aromatase
    - Address insulin resistance (Marker 54) — IR suppresses T
    - Avoid alcohol >3 drinks/week
    - Avoid xenoestrogens (BPA plastic, parabens, fragrance)
  - Nutrition: Adequate calories (chronic deficit drops T), saturated fat 20–25% calories (T precursor), protein 1.6–2.0 g/kg
  - Supplements (modest effect):
    - Vit D 4000 IU/d (target Marker 36 optimal)
    - Zinc picolinate 15 mg/d (especially if vegetarian)
    - Magnesium 400 mg/d (Marker 58)
    - Boron 6 mg/d (raises free T modestly)
    - Ashwagandha (KSM-66) 600 mg/d — Indian clinical trials show ~15–20% T increase
- **<300 confirmed (2 morning readings):** Endocrinology referral. Evaluate LH/FSH:
  - LH high + T low = primary hypogonadism (testicular)
  - LH low/normal + T low = secondary hypogonadism (pituitary/hypothalamic)
  - Discuss TRT (testosterone replacement therapy) — gel, IM injection, or pellet
- **>1100 sustained without therapy:** Investigate (rare; tumour, exogenous use)
- **>2000:** Lab error suspected (see Lab Error Detection #24)
- Retest: 8–12 weeks after lifestyle protocol; 2 morning samples to confirm before TRT decision

---

## [v1.1.5] 60. FREE TESTOSTERONE (MALE)
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Free Testosterone
- Aliases: Free T, FT, Bioavailable Testosterone (related but distinct)
- Unit: pg/mL or ng/dL (pg/mL most common in India)
- Conversion: pg/mL × 0.1 = ng/dL (approximate)
- Note: Best measured by equilibrium dialysis (gold standard) but rarely available in India; most Indian labs use calculated free T from total T + SHBG + albumin

**2. THREE-TIER RANGES**
- Lab range: 8.7–25.1 pg/mL (varies by lab and method)
- Zenoho Optimal: 15–25 pg/mL (young adult); 12–20 (40+); 9–18 (60+)
- Zenoho Watch zone: 9–15 pg/mL
- Zenoho Alert: <9 (functional androgen deficiency) | <6.5 (significant)
- Citation: Indian Expert Opinion 2023 (Kalra); AIIMS pilot study showed free T more sensitive than total T for symptomatic hypogonadism (33% deficient by free T vs 20% by total T); Endocrine Society 2018

**3. NATIONALITY MODIFIERS**
- IN: free T more sensitive than total T for Indian men because SHBG often elevated (insulin resistance, alcohol, hyperthyroidism, ageing) binds more total T, leaving less free
- ME: similar
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- 18–40: 15–25 pg/mL
- 40–60: 12–20 pg/mL
- 60+: 9–18 pg/mL (free T declines faster than total T with age — 1.2%/year SHBG rise)
- Gender: this marker is for males

**5. SCORING**
- Weight: 4/100 (within Hormones system) — companion to total T
- Calc method: linear penalty below optimal; cross-marker rule with SHBG
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: the testosterone *actually available to your cells* — only ~2% of testosterone is free; the rest is bound to proteins and inactive
- **Why this matters:** A man can have "normal" total testosterone (e.g. 500 ng/dL) but if SHBG is high (binding too much), his free T is low and he feels hypogonadal. Total T alone misses this.
- Low feels like: same as total T low — but often present even when total T looks normal on labs
- Optimal feels like: vitality, drive, recovery, body composition

**7. ACTION PROTOCOL**
- **Below optimal:** Same protocol as total testosterone (Marker 59)
- **Cross-marker pattern (Rule 14):** Total T normal + Free T low + SHBG high = "bound testosterone pattern" — total T misleadingly reassuring. Address SHBG drivers: reduce alcohol, treat hyperthyroidism if present, address chronic dieting (low calorie raises SHBG), boron 6 mg/d (lowers SHBG), vitamin D optimal
- **Free T low + SHBG normal/low + Total T low:** Primary or secondary hypogonadism — proceed with Marker 59 protocol and endocrinology
- Retest: 8–12 weeks paired with total T and SHBG

---

## [v1.1.5] 61. SHBG (Sex Hormone Binding Globulin)
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Sex Hormone Binding Globulin
- Aliases: SHBG
- Unit: nmol/L

**2. THREE-TIER RANGES**
- Lab range: M 18–54 | F 24–122 nmol/L
- Zenoho Optimal: M 25–45 | F 30–80 nmol/L
- Zenoho Watch zone: M 18–25 or 45–54 | F 24–30 or 80–122
- Zenoho Alert: <18 (M)/<24 (F) — insulin resistance signal | >54 (M)/>122 (F) — hyperthyroidism, alcohol, anorexia, ageing
- Citation: Standard endocrine references; SHBG is regulated by insulin (low SHBG ↔ insulin resistance), thyroid (high T4 raises SHBG), and ageing

**3. NATIONALITY MODIFIERS**
- IN: South Asian men with insulin resistance often run *low* SHBG — paradoxically inflating their free T calculation (less bound = more "free" but total T low). Indian women with PCOS run very low SHBG.
- ME: similar IR-driven low SHBG patterns
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- <18: highly variable with puberty
- 18–40: M 25–45, F 30–80
- 40–60: M 25–50, F 30–90
- 60+: SHBG rises ~1.2%/year (Vermeulen) — M 30–60, F 35–100 acceptable; doesn't justify low free T
- Gender: applied above; OCP raises SHBG significantly

**5. SCORING**
- Weight: 3/100 (within Hormones system) — context marker for testosterone interpretation
- Calc method: U-curve; cross-marker with testosterone
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: a sticky protein that binds and inactivates sex hormones (testosterone, estrogen). Think of it as a parking lot — too much SHBG and your testosterone is stuck parked, not working.
- Low feels like: high free T but often paired with insulin resistance, belly fat, PCOS in women
- High feels like: symptoms of low free testosterone despite "normal" total T — fatigue, low libido, brain fog
- Optimal feels like: balanced hormone delivery

**7. ACTION PROTOCOL**
- **Low (<18 M /<24 F):** Investigate insulin resistance (Markers 15, 54). Address: reduce refined carbs and fructose, resistance training, weight loss. Berberine, inositol if PCOS.
- **High (>54 M />122 F):** Investigate:
  - Hyperthyroidism (low TSH + high T4)
  - Excess alcohol (>10 drinks/week raises SHBG)
  - Estrogen excess (xenoestrogens, soy excess in some users)
  - Chronic calorie restriction (eat enough)
  - OCP use (in F — accept, don't fight)
  - Liver disease
  - Boron 6 mg/d modestly lowers SHBG
- **Cross-marker rule:** Low Free T + Normal Total T + High SHBG = bound testosterone pattern (Rule 14)
- Retest: 12 weeks after intervention

---

## [v1.1.5] 62. DHEA-S (Dehydroepiandrosterone Sulfate)
*System group: Hormones (System 10 — new)*

**1. IDENTITY**
- Standard name: Dehydroepiandrosterone Sulfate
- Aliases: DHEA-S, DHEAS, DHEA-Sulfate
- Unit: µg/dL
- Conversion: µg/dL × 0.027 = µmol/L
- Note: DHEA-S preferred over DHEA — longer half-life, more stable; less circadian variation

**2. THREE-TIER RANGES**
- Lab range (highly age and sex dependent — Indian labs use age-stratified):
  - M 18–30: 280–640 µg/dL
  - M 30–50: 120–520 µg/dL
  - M 50–70: 70–310 µg/dL
  - F 18–30: 145–395 µg/dL
  - F 30–50: 65–280 µg/dL
  - F 50–70: 30–185 µg/dL
- Zenoho Optimal: upper-mid third of age/sex range
  - M 18–40: 350–550 µg/dL
  - M 40–60: 250–450 µg/dL
  - M 60+: 150–300 µg/dL
  - F 18–40: 200–350 µg/dL
  - F 40–60: 150–280 µg/dL
  - F 60+: 80–180 µg/dL
- Zenoho Watch zone: lower-mid third of range
- Zenoho Alert: <50 (M, any age) or <30 (F, any age) — adrenal exhaustion, autoimmune, severe stress | >700 (M) or >400 (F) — adrenal tumour or PCOS (F) — workup
- Citation: LabCorp/Quest age-stratified references; functional medicine optimal upper-range targeting; Wolkowitz et al. (*Biol Psychiatry* 1997) on DHEA and depression/aging

**3. NATIONALITY MODIFIERS**
- IN: Chronic stress + vegetarian protein restriction may suppress DHEA-S in middle-aged urban professionals
- ME: similar urban stress profile
- UK/EU: same Optimal
- US: same
- Default: IN

**4. PERSONALISATION**
- DHEA-S declines steeply with age — "adrenopause" — interpret only with age-specific ranges
- Gender: applied above; F PCOS often have elevated DHEA-S

**5. SCORING**
- Weight: 3/100 (within Hormones system)
- Calc method: linear, age-stratified
- System group: Hormones (System 10)

**6. PLAIN ENGLISH**
- Measures: the most abundant adrenal hormone — a precursor to both testosterone and estrogen, and your body's natural anti-cortisol counterbalance
- Low feels like: chronic fatigue, low mood, low libido, slow recovery, "burned out" feeling — especially in middle age
- High feels like: in women, may indicate PCOS — facial hair, acne, irregular cycles
- Optimal feels like: resilience, vitality, balanced energy

**7. ACTION PROTOCOL**
- **Low for age:**
  - Address chronic stress (cortisol management — Marker 56)
  - Sleep audit (DHEA-S production needs deep sleep)
  - Resistance training
  - Adequate protein 1.6 g/kg
  - Adaptogenic herbs: Ashwagandha 600 mg/d, Rhodiola 200–400 mg AM
  - **DHEA supplementation** — only with physician supervision (M 25–50 mg/d, F 5–25 mg/d). Not OTC in India — requires prescription. Don't self-supplement; converts to T and estrogen unpredictably.
- **High in females (>400):** PCOS workup with gynaecologist; check androgen profile (free T, androstenedione, 17-OHP); inositol + lifestyle for PCOS
- **Very high (M >700 / F >400 sustained):** Adrenal imaging — rule out adrenal tumour (rare but mandatory workup)
- Retest: 12 weeks after intervention

---

# ============================================================
# APPENDICES
# ============================================================

---

## [v1.1.5] APPENDIX 1 — SYSTEM ORDER MAP

The 62 markers are numbered by addition order (1–43 from v1.0, 44–47 from v1.1, 48–62 from v1.1.5). For scoring and dashboard organisation, they group into 10 systems:

| System # | Name | Markers (by ID) | Count | System Weight |
|---|---|---|---|---|
| 1 | Blood / Haematology | 1–12, **48 (MCHC), 49 (RDW)** | 14 | 14% |
| 2 | Glucose / Metabolic | 13–15, **54 (Fasting Insulin)** | 4 | 18% |
| 3 | Liver | 16–22, **51 (Globulin)** | 8 | 12% |
| 4 | Kidney / Bone-Mineral | 23–30, **50 (Calcium)** | 9 | 10% |
| 5 | Lipids / Cardiovascular | 31–35, **44 (Lp(a)), 53 (ApoB)** | 7 | 15% |
| 6 | Vitamins / Minerals / Iron | 36–38, 41–43, **58 (Mg RBC)** | 7 | 11% (combined) |
| 7 | Thyroid | 39–40, **47 (FT3), 57 (Anti-TPO)** | 4 | 10% |
| 8 | (merged into System 6 for scoring) | — | — | — |
| 9 | Inflammation | **45 (hs-CRP), 46 (Homocysteine), 52 (ESR)** | 3 | 5% |
| 10 | **Hormones (NEW)** | **55 (PTH), 56 (Cortisol), 59 (Total T M), 60 (Free T M), 61 (SHBG), 62 (DHEA-S)** | 6 | 5% |
| **TOTAL** | | | **62** | **100%** |

*Note: Iron Panel (markers 41–43) was originally System 8 in v1.0; from v1.1.5 it merges into System 6 (Vitamins/Minerals/Iron) for scoring purposes since the iron + vitamin B12/folate + Vit D + magnesium markers are clinically interpreted as one bone/blood/energy panel. The historical "System 8" header is preserved for backward compatibility but its markers contribute to System 6's combined 11% weight.*

*Female-specific hormone markers (Estradiol, Progesterone, FSH, LH, AMH) are deferred to v1.2 — they require menstrual cycle phase context for proper interpretation. v1.1.5 launches with male hormone panel coverage.*

---

## APPENDIX 2 — ZENOHO HEALTH SCORE FORMULA v1.1

### Step 1 — Per-Marker Score (0–100)

For each marker, compute Marker_Score based on which zone the user's value falls into:

```
if value in Zenoho_Optimal_zone:
    Marker_Score = 100

elif value in Watch_zone:
    # Linear interpolation between 75 (edge of optimal) and 50 (edge of alert)
    Marker_Score = 75 - 25 × (distance_from_optimal / watch_zone_width)
    # Yields 50–75 points

elif value in Alert_zone:
    # Linear interpolation between 25 (edge of watch) and 0 (extreme alert)
    Marker_Score = 25 - 25 × (distance_into_alert / alert_zone_width)
    # Yields 0–25 points

elif value beyond extreme Alert:
    Marker_Score = 0
    Trigger: red_flag = True   # surfaces in user dashboard as urgent
```

### Step 1b — U-Curve Markers

For markers penalised on both ends (HDL, Sodium, Potassium, MCV, MCH, **MCHC**, Bilirubin, Platelets, WBC, Albumin, Total Protein, **Globulin**, Phosphorus, ALP, Folate, Free T4, Free T3, **Calcium**, **Cortisol AM**, **SHBG**):

```
score_low_side  = compute_score(value, optimal_low,  watch_low,  alert_low)
score_high_side = compute_score(value, optimal_high, watch_high, alert_high)
Marker_Score = MIN(score_low_side, score_high_side)
```

Take the penalised side's score (MIN, not average). If user is in optimal on both sides, both scores = 100.

### Step 1c — Special Cases

- **Genetic / one-time markers** (Lp(a)): compute Marker_Score once per user and freeze. See Genetic Marker Lock Rule.
- **Acute-phase confounded markers** (Ferritin, hs-CRP, Albumin, Iron, Lymphocytes, Platelets, WBC): apply cross-marker rule first; if confounded, mark `score_confidence = LOW` and don't recompute until confounder resolves.

### Step 2 — System Score (0–100 per system)

```
System_Score = Σ (Marker_Score × Marker_Weight) / Σ (Marker_Weight in that system)
```

Normalises each system to 0–100 regardless of marker count.

### Step 3 — Final Zenoho Health Score (0–100)

```
Final_Score = Σ (System_Score × System_Weight)
```

### [v1.1.5] System Weights (Indian disease burden weighted; sum = 100%)

| System | Weight | Change from v1.1 |
|---|---|---|
| 1 — Glucose / Metabolic | 18% | -2 |
| 2 — Cardiovascular / Lipids (incl Lp(a), ApoB) | 15% | -3 |
| 3 — Blood / Haematology (incl MCHC, RDW) | 14% | -1 |
| 4 — Liver (incl Globulin) | 12% | unchanged |
| 5 — Kidney / Bone-Mineral (incl Calcium) | 10% | unchanged |
| 6 — Thyroid (incl Anti-TPO) | 10% | unchanged |
| 7 — Vitamins / Minerals / Iron (incl Mg RBC) | 11% | +1 |
| 8 — Inflammation (incl ESR) | 5% | unchanged |
| 9 — **Hormones (NEW v1.1.5)** | 5% | new |
| **TOTAL** | **100%** | |

*Rebalancing rationale:* Cardiovascular and Glucose remained the heaviest weights given Indian disease burden, but Cardiovascular shed 3% and Glucose 2% to make room for the new Hormones system (5%) and the strengthened Vitamins/Minerals/Iron system (+1% for Magnesium RBC integration). Blood lost 1% (still well-covered with 14 markers). All others unchanged.

### Step 4 — Apply Safety Overrides (see Appendix 3)

If any safety trigger fires, cap Final_Score at 50.

### Step 5 — Health Level Mapping

| Score | Level | User-facing Label |
|---|---|---|
| 0–10 | Level 1 | Critical — urgent multi-system intervention |
| 11–20 | Level 2 | Severely depleted — clinical care needed |
| 21–30 | Level 3 | Significantly impaired |
| 31–40 | Level 4 | Below average — protocol needed |
| 41–50 | Level 5 | Average / Indian baseline |
| 51–60 | Level 6 | Above average |
| 61–70 | Level 7 | Healthy |
| 71–80 | Level 8 | Optimised |
| 81–90 | Level 9 | High-performance |
| 91–100 | Level 10 | Elite / longevity-grade |

**Design note:** Most Indian urban adults will land Level 4–6 on first test. Don't shame Level 5 — that's the population average. Move users one Level up every 2 retest cycles (~6 months).

---

## APPENDIX 3 — CRITICAL SAFETY OVERRIDE RULES

These 11 triggers cap the Final_Score at Level 5 regardless of system scores. They surface urgent care banners at the top of the dashboard.

| # | Marker | Trigger Value | Banner Message |
|---|---|---|---|
| 1 | Haemoglobin | <8.0 g/dL | "Severe anaemia. See a physician within 48 hours." |
| 2 | Platelets | <50 ×10³/µL | "Severely low platelets. See a physician within 24 hours. Avoid contact sports, NSAIDs, alcohol." |
| 3 | Potassium | <2.5 or >6.0 mEq/L | "Dangerous potassium level. Seek medical care immediately." |
| 4 | Creatinine | >2.0 mg/dL | "Significant kidney function decline. See a nephrologist this week." |
| 5 | HbA1c | >10.0% | "Severe diabetes control failure. See an endocrinologist within 7 days." |
| 6 | Triglycerides | >500 mg/dL | "Pancreatitis risk. Cut alcohol and refined carbs immediately. See a physician." |
| 7 | LDL Cholesterol | >190 mg/dL | "Very high LDL — possible genetic cause. Cardiology referral, family screening." |
| 8 | Lp(a) | >100 mg/dL | "Very high Lp(a) — high heart attack risk. Cardiology referral. Test first-degree relatives." |
| 9 | hs-CRP | >10 mg/L sustained (2 readings ≥4 weeks apart) | "Persistent high inflammation. Investigate underlying cause with a physician." |
| 10 | TSH | <0.1 or >10 mIU/L | "Significant thyroid dysfunction. See an endocrinologist within 7 days." |
| 11 | Albumin | <3.0 g/dL | "Severe albumin depletion. Liver, kidney, and nutrition workup needed urgently." |
| **12** | **Calcium** | **<7.5 or >12 mg/dL** | **[v1.1.5] "Dangerous calcium level. Seek medical care immediately — hypercalcaemia causes cardiac arrhythmia; hypocalcaemia causes seizures."** |
| **13** | **Cortisol AM** | **<3 or >35 µg/dL** | **[v1.1.5] "Adrenal emergency. <3 suggests Addisonian crisis risk; >35 suggests severe hypercortisolism. Endocrinology referral within 24 hours."** |

```python
def apply_safety_overrides(final_score, marker_values):
    triggered = [t for t in SAFETY_OVERRIDES if t.evaluate(marker_values)]
    if triggered:
        return {
            'score': min(final_score, 50),
            'safety_alerts': [t.banner_message for t in triggered],
            'urgent_care_required': True,
            'confidence': 'HIGH'
        }
    return {'score': final_score, ...}
```

**Display:** Safety alerts at top of report in red, above the score. Disclaimer: "Zenoho is not a substitute for clinical care. These thresholds are decision aids, not diagnoses." Users cannot dismiss safety banners until value back in non-triggering range.

**Rationale for cap at 50, not zero:** A user with one severe value but other markers in optimal still has real underlying health. Capping at Level 5 communicates "this needs urgent attention" without falsely telling the user their entire health is broken.

---

## APPENDIX 4 — CONFIDENCE LEVEL DISPLAY RULES

The Final_Score ships with a confidence flag (HIGH / MEDIUM / LOW).

### HIGH confidence
- Display: full score, no warning
- Visual: green dot or no indicator
- Tooltip: "Based on a complete recent panel"

### MEDIUM confidence
- Display: score with amber ⚠️ icon
- Visual: amber border around score badge
- Banner: "Incomplete panel — your score is an estimate. Add the missing tests for an accurate read."
- Lists missing markers below the score

### LOW confidence
- Display: score in muted/grey, with red 🔴 icon
- Visual: red border around score badge
- Banner: "Retest recommended — this score may not reflect your current health"
- Specific reason listed (sample age, missing markers, biotin, acute-phase, lab tier)

### Trigger Logic

```python
confidence = HIGH

if sample_age_days > 60: confidence = downgrade(confidence)
if markers_tested_count < 35: confidence = LOW
if missing_priority_markers: confidence = downgrade(confidence)
if hs_CRP > 5.0: confidence = LOW   # acute-phase confound
if biotin_supplement_in_72h: confidence = LOW  # thyroid/hormone panel only
if lab_tier == 'tier_2': confidence = downgrade(confidence)
if lab_tier == 'unknown': confidence = LOW

if not meets_valid_report_criteria():
    return "INSUFFICIENT_DATA"   # no score
```

---

## APPENDIX 5 — VALID REPORT CRITERIA (minimum data gate)

Before computing any Final_Score, the panel must pass these 4 gates. Otherwise return `INSUFFICIENT_DATA`.

```python
def meets_valid_report_criteria(panel):
    # Gate 1: minimum marker count
    if len(panel.markers_tested) < 8:
        return False, "Need at least 8 markers."
    
    # Gate 2: sample age
    if panel.sample_age_days > 90:
        return False, "Sample more than 90 days old."
    
    # Gate 3: identity fields
    if not panel.user.age or not panel.user.gender:
        return False, "Age and gender required."
    
    # Gate 4: at least one marker per priority system
    priority_systems = ['Glucose_Metabolic', 'Cardiovascular_Lipids', 'Liver', 'Kidney']
    missing = [s for s in priority_systems 
              if not any(m.system == s for m in panel.markers_tested)]
    if missing:
        return False, f"Missing priority systems: {', '.join(missing)}"
    
    return True, None
```

### Partial Profile Mode (when gate fails)

Don't show a score, but still display:
- Markers tested with their per-marker zones
- Per-system mini-scores for systems with ≥2 markers
- Action protocols for any out-of-range markers
- Callout: "Add these markers to unlock your full Zenoho Score"

---

## APPENDIX 6 — BIOTIN INTERFERENCE RULE

Biotin (Vitamin B7) at supplement doses (commonly 5–10 mg in hair/nail formulas) interferes with streptavidin-biotin chemistry in immunoassays — falsely lowering TSH, falsely raising T3/T4/FT3/FT4. FDA safety warning issued 2017 (FDA-2017-N-6586).

### Detection

```python
def biotin_interference_check(user_supplements, panel_results):
    biotin_mg = sum(s.dose_mg for s in user_supplements if 'biotin' in s.name.lower())
    if biotin_mg > 2.5:
        affected = ['TSH', 'Free T4', 'Free T3', 'Total T4', 'Total T3',
                   'Vitamin D', 'PTH', 'Cortisol', 'Testosterone', 
                   'Vitamin B12', 'Ferritin', 'Troponin']
        for marker in affected:
            if marker in panel_results:
                panel_results[marker].confidence = 'LOW'
                panel_results[marker].interference_flag = 'BIOTIN'
        return {'flagged': True, 'recommended_action': 'pause_biotin_72h_before_retest'}
```

### Thresholds
- <2.5 mg/d: multivitamin levels — minimal risk
- 2.5–10 mg/d: hair/nail formulas — meaningful interference
- \>10 mg/d: dedicated biotin therapy — strong interference

### NOT affected by biotin
CBC (machine-counted), HbA1c (HPLC), lipids (enzymatic), liver/kidney enzymes (chemistry), glucose, electrolytes, creatinine.

### User message
"Your biotin supplement (Xmg/d) may have skewed your thyroid and hormone results. Stop biotin for 72 hours before your next blood draw."

---

## APPENDIX 7 — ACUTE-PHASE REACTANTS

When the body fights acute inflammation, several markers shift predictably and mask true baseline values.

### Rise with inflammation
Ferritin, hs-CRP, ESR, Platelets (mild), WBC, Globulins, Fibrinogen, Alpha-1 antitrypsin

### Fall with inflammation
Albumin, Serum Iron, TIBC, Transferrin, Lymphocytes, Total Protein

### The Rule

```python
if hs_CRP > 5.0:
    affected = ['Ferritin', 'Platelets', 'WBC', 'Albumin', 'Serum Iron', 
                'TIBC', 'TSAT', 'Lymphocytes', 'Total Protein']
    for marker in affected:
        panel_results[marker].confidence = 'LOW'
        panel_results[marker].interference_flag = 'ACUTE_PHASE'
    overall_confidence = 'LOW'
```

### Recovery Windows
- Cold/flu/dengue: wait 4 weeks before retesting
- Surgery: wait 6 weeks
- Vaccination: wait 2 weeks
- Significant injury: wait 4–6 weeks

### Interpretation Cheatsheet
- High ferritin + high hs-CRP → not iron overload, just inflammation
- Low albumin + high hs-CRP → not malnutrition, just acute phase
- Low iron + high hs-CRP → not iron deficiency, just sequestered (anaemia of chronic disease)
- Low lymphocytes + high hs-CRP → not immunosuppression, just acute redistribution

---

## [v1.1.5] APPENDIX 8 — SAMPLE TIMING & FASTING RULES

| Marker | Optimal Time | Fasting | Why |
|---|---|---|---|
| Cortisol | 7–9 AM | No | Circadian peak early morning |
| TSH | 8–10 AM | No | TSH peaks 2–4 AM, troughs 6–10 PM (50–200% swing) |
| Testosterone | 7–10 AM | No | Peaks 8 AM, drops 25–35% by evening |
| **[v1.1.5] Free Testosterone** | **7–10 AM** | **No** | **Pair with Total T** |
| **[v1.1.5] SHBG** | **Morning preferred** | **No** | **Less circadian variation but pair with T draws** |
| DHEA-S | Morning | No | Less variation but morning preferred |
| **[v1.1.5] PTH** | **Morning** | **Preferred** | **PTH varies through day; pair with Vit D and Calcium** |
| **[v1.1.5] Calcium** | **Morning** | **Preferred** | **Pair with PTH** |
| **[v1.1.5] Anti-TPO** | **Any time** | **No** | **Stable; antibody titres don't fluctuate** |
| **[v1.1.5] Magnesium RBC** | **Any time** | **No** | **Intracellular — stable** |
| Serum Iron | Morning (<10 AM) | Preferred | Drops 20–30% through day |
| Lipid Panel (TC, LDL, HDL, TG, VLDL) | Morning | **10–12h fast** | TG meal-affected |
| **[v1.1.5] ApoB** | **Morning** | **Fasting preferred** | **Same as lipids — pair with full panel** |
| Lp(a) | Any time | Not required | Genetic/stable |
| FBS | Morning | **8–12h fast** | Definition requires fasting |
| HbA1c | Any time | No | 90-day average |
| HOMA-IR | Morning | **8–12h fast** | Both inputs fast-dependent |
| **[v1.1.5] Fasting Insulin** | **Morning** | **8–12h fast** | **Postprandial insulin meaningless for this purpose** |
| Homocysteine | Morning | Preferred | Recent protein elevates |
| Uric Acid | Morning | Preferred | Purine meal raises 1–2 mg/dL |
| Liver enzymes, **Globulin** | Any time | Preferred | Less variation |
| Kidney panel | Any time | No | Stable |
| FT4, FT3 | 8–10 AM (with TSH) | No | Pair with TSH |
| Vitamin D | Any time | No | Long half-life |
| Vitamin B12 | Morning | Preferred | Standardise for trends |
| Folate | Morning | **Fasting required** | Recent leafy meal spikes |
| Ferritin | Any time | No | Stable |
| CBC, **MCHC, RDW** | Any time | No | Hb dilutes slightly post-meal — ignore |
| hs-CRP, **ESR** | Any time | No | Check recent infection (last 4 wks) |

### The Standard Zenoho Sample Window

> **Blood draw between 8:00 AM and 9:30 AM, after 10–12 hours of fasting (water allowed), no exercise that morning, no biotin for 72 hours.**

Single standard handles every timing-sensitive marker.

```python
def validate_sample_timing(sample_time, last_meal_time, panel_markers):
    warnings = []
    sample_hour = sample_time.hour
    fasting_hours = (sample_time - last_meal_time).total_seconds() / 3600
    
    if 'TSH' in panel_markers and not (7 <= sample_hour <= 11):
        warnings.append({'marker': 'TSH', 'severity': 'medium',
                        'msg': 'Outside 8–10 AM — TSH may read low'})
    if 'Cortisol' in panel_markers and not (7 <= sample_hour <= 9):
        warnings.append({'marker': 'Cortisol', 'severity': 'high',
                        'msg': 'Cortisol must be drawn 7–9 AM'})
    if any(m in panel_markers for m in ['LDL','HDL','TG','VLDL','TC']) and fasting_hours < 10:
        warnings.append({'marker': 'Lipid Panel', 'severity': 'high',
                        'msg': f'Fasted only {fasting_hours:.1f}h — TG and calculated LDL unreliable'})
    if any(m in panel_markers for m in ['FBS','Glucose Fasting','HOMA-IR']) and fasting_hours < 8:
        warnings.append({'marker': 'Fasting Glucose', 'severity': 'critical',
                        'msg': 'Not fasting — value invalid as fasting glucose'})
    return warnings
```

---

## APPENDIX 9 — INDIAN LAB RECOGNITION TIERS

### Tier 1 — Trusted (NABL accredited, large-scale, cross-checked)

Default confidence = HIGH

| Lab | Notes |
|---|---|
| House of Diagnostics (HOD) | NABL, NCR-focused, Roche/Beckman platforms |
| Dr Lal PathLabs | NABL + CAP, pan-India, NSE-listed |
| Thyrocare | NABL, fully automated centralised processing |
| SRL Diagnostics | NABL + CAP + ISO 15189, pan-India |
| Metropolis Healthcare | NABL + CAP, NSE-listed |
| Apollo Diagnostics | NABL, Apollo chain |
| Quest Diagnostics India | NABL + CAP, US parent QA |
| Redcliffe Labs | NABL, large home-collection footprint |
| Healthians | NABL, home-collection focus |
| Tata 1mg Labs | NABL, Tata-backed |
| Suburban Diagnostics | NABL + CAP, Mumbai-strong |
| Neuberg Diagnostics | NABL, multi-city |

### Tier 2 — Local / Clinic Labs

Default confidence = downgraded one level. User message:
> "We don't have peer-comparable QC data for {lab_name}. Treat as directional. For trend tracking, use a Tier 1 lab consistently."

### Tier 3 — Unknown / Unrecognised

Default confidence = LOW. User message:
> "We don't recognise {lab_name}. Results displayed but flagged as low-confidence. Consider retesting with a verified lab (Dr Lal, Thyrocare, SRL, Metropolis, HOD, Apollo) before treating this as your baseline."

### Logic

```python
TIER_1_LABS = {
    'house_of_diagnostics', 'hod', 'dr_lal_pathlabs', 'lal_pathlabs',
    'thyrocare', 'srl_diagnostics', 'srl', 'metropolis',
    'apollo_diagnostics', 'apollo', 'quest_diagnostics', 'quest',
    'redcliffe_labs', 'redcliffe', 'healthians', 'tata_1mg_labs', '1mg_labs',
    'suburban_diagnostics', 'suburban', 'neuberg_diagnostics', 'neuberg'
}

def get_lab_tier(lab_name):
    n = lab_name.lower().replace(' ', '_').replace('.', '')
    if any(t1 in n for t1 in TIER_1_LABS): return 'tier_1'
    if lab_name in known_tier_2_db: return 'tier_2'
    return 'unknown'
```

### Tier promotion
A Tier 2 lab consistently producing results within 10% of Tier 1 cross-checks (≥3 paired panels) can be internally promoted to Tier 1. Builds Zenoho's QC moat over time.

---

## APPENDIX 10 — GENETIC MARKER LOCK RULE

Genetically determined markers test once and lock in user profile.

### Currently locked
| Marker | Reason | Re-test condition |
|---|---|---|
| Lp(a) | ~90% genetic, stable from age 5 | Only if Lp(a)-specific therapy or assay change |

### Future-ready (v2+)
MTHFR C677T, MTHFR A1298C, HFE C282Y, ApoE genotype, Factor V Leiden, HLA typing.

### Logic

```python
def process_genetic_marker_result(user_id, marker, value, lab):
    existing_lock = get_genetic_lock(user_id, marker.id)
    if existing_lock and existing_lock.score_locked:
        return {
            'value_displayed': existing_lock.first_valid_value,
            'value_in_panel': value,
            'locked': True,
            'message': f"Your {marker.name} was tested on {existing_lock.first_valid_date} and locked because it's genetically determined."
        }
    save_genetic_lock(user_id, marker.id, value, today(), lab.id)
    return {'locked': True, 'first_test': True}
```

### Unlock conditions
1. User starts marker-specific therapy (logged in supplement/prescription stack)
2. Lab assay platform changes
3. Manual clinical reviewer override

All unlocks audited (`unlock_date`, `unlock_reason`).

### Display
- Lock icon (🔒)
- Tooltip: "This marker is locked because it's genetically determined. You only need to test it once."

---

## [v1.1.5] APPENDIX 11 — CROSS-MARKER RULES (15 seeded at v1.1.5 launch)

| # | Rule Name | Markers Involved | Resolution |
|---|---|---|---|
| 1 | haemochromatosis_screen | Ferritin >300 + hs-CRP <1.0 | HFE gene panel, TSAT, liver iron MRI |
| 2 | flag_inflammation_confounder | Ferritin >300 + hs-CRP >2.0 | Treat hs-CRP root cause; iron uninterpretable |
| 3 | treat_b12_despite_normal_lab | Homocysteine >10 + B12 300–500 | Supplement B12 even though "lab normal" |
| 4 | conversion_failure_pattern | FT3 <3.5 + TSH normal + FT4 normal | Cofactor protocol (Se, Zn, Fe, stress) — NOT levothyroxine |
| 5 | aggressive_apoB_suppression_required | Lp(a) >30 + LDL >80 | Drive ApoB <60, LDL <70 |
| 6 | thalassaemia_trait_screen | MCV <80 + Mentzer Index <13 | Hb electrophoresis |
| 7 | NAFLD_high_probability | ALT >25 + GGT >25 + TG >100 | NAFLD reversal protocol; visceral fat 5–7% |
| 8 | secondary_hyperparathyroidism_flag | Vit D <30 + PTH >65 | Aggressive Vit D loading + Ca audit |
| 9 | metabolic_syndrome_triad_flag | UA >5.5/4.5 + HOMA-IR >2.0 + TG >100 | Cut fructose, lose visceral fat, walk after meals, resistance training |
| 10 | alcoholic_liver_pattern_flag | GGT >40 + ALT >30 + AST/ALT >2 | 8 weeks alcohol-free + NAC + retest |
| 11 | post_viral_suppression_flag | WBC <4.5 + Lymph <1.5 + recent illness (8 wk) | Sleep, Vit D, zinc, lactoferrin; retest 6–8 wk |
| 12 | false_high_HbA1c_flag | HbA1c >5.7 + Hb <11 | Fix anaemia first (8–12 wk), then retest HbA1c |
| **13** | **secondary_hyperparathyroidism_v2** | **PTH >45 + Vit D <40** | **[v1.1.5] Body compensating for low Vit D — aggressive Vit D loading (Marker 36 protocol) + Mg + Ca audit. PTH should fall as Vit D normalises. Distinguish from primary hyperparathyroidism (PTH high + Ca high + Vit D normal). Replaces v1.1 Rule 8 with sharper PTH threshold.** |
| **14** | **bound_testosterone_pattern** | **Total T 300–600 ng/dL + Free T <12 pg/mL + SHBG >50 nmol/L** | **[v1.1.5] "Normal" total T misleadingly reassuring. Free T is what cells actually use. Address SHBG drivers: reduce alcohol, treat hyperthyroidism if present, address chronic dieting, boron 6 mg/d. Don't dismiss symptoms because total T looks fine.** |
| **15** | **discordant_lipid_pattern** | **ApoB >90 mg/dL + LDL <130 mg/dL** | **[v1.1.5] User has high atherogenic particle count despite "normal" LDL — small dense LDL particles dominant. Treat as ApoB-driven cardiovascular risk regardless of LDL number. ApoB takes precedence in scoring. This pattern often missed by labs reporting only LDL.** |

### Confidence impact per rule

- Rules 1, 5, 6, 7, 8, 9, 10, **13, 14, 15**: no confidence impact (ensure user gets actionable insight)
- Rules 2, 11: LOW confidence on the affected markers (interpretation context-dependent)
- Rules 3, 12: MEDIUM confidence on the specific marker

---

## [v1.1.5] APPENDIX 12 — RETEST SCHEDULE QUICK REFERENCE

| Marker Family | Standard Retest |
|---|---|
| HbA1c | 12 weeks (90-day biology) |
| Fasting glucose, HOMA-IR, **Fasting Insulin** | 8–12 weeks |
| Lipids | 12 weeks (after intervention) |
| **ApoB** | 12 weeks (responds to statin/lifestyle within 8 weeks but stabilises by 12) |
| Lp(a) | **Once in lifetime** (genetic lock) |
| Vitamin D | 8–12 weeks loading; 6 months maintenance |
| **PTH** | 8–12 weeks paired with Vit D |
| **Calcium** | 4–6 weeks if abnormal |
| B12, Folate | 8–12 weeks |
| Iron / Ferritin / TSAT | 8–12 weeks |
| **Magnesium RBC** | 12 weeks (slow to shift — full RBC lifespan) |
| Thyroid (TSH, FT4, FT3) | 8 weeks |
| **Anti-TPO antibodies** | 12 months (slow-moving); TSH/FT4 every 6 months when positive |
| Liver enzymes, **Globulin** | 12 weeks |
| Kidney (Cr, eGFR) | 6 weeks |
| CBC, **MCHC, RDW** | 8–12 weeks |
| hs-CRP, **ESR** | 8–12 weeks (after starting protocol) |
| Homocysteine | 8–12 weeks (after Methylation Trio) |
| **Cortisol AM** | 8 weeks (consider 4-point salivary for fuller picture) |
| **Total/Free Testosterone, SHBG** | 8–12 weeks; 2 morning samples to confirm before TRT decision |
| **DHEA-S** | 12 weeks |

---

## APPENDIX 13 — SUPPLEMENT DOSE FORMULAS (rounded for ease)

| Deficiency | Supplement | Form | Dose | With |
|---|---|---|---|---|
| Iron | Iron bisglycinate | chelated | 25 mg/d alt days | Vit C 250 mg, empty stomach |
| Vit D <20 | Cholecalciferol | D3 | 60,000 IU/wk × 8 | K2-MK7 100 mcg, Mg 400 mg |
| Vit D 30–40 | Cholecalciferol | D3 | 2000 IU/d | as above |
| B12 <300 | Methylcobalamin | sublingual | 1500 mcg/d × 8 wk | Methylfolate 400 mcg |
| Folate low | Methylfolate | L-5-MTHF | 400–800 mcg/d | with B12 |
| HOMA-IR >1.5 | Inositol + Berberine | Myo+DCI 40:1 / HCl | 4g + 500mg×3 | Mg 400 mg |
| Triglycerides high | Omega-3 EPA/DHA | TG form | 2–4 g/d | with food |
| LDL high | Bergamot + RYR + Berberine | std extracts | 1g + 1.2g + 500×2 | with CoQ10 200 mg |
| Lp(a) high | (no diet/supplement reliable) | — | strategy: suppress all OTHER risk factors | ApoB <60 target |
| Ferritin low | Iron bisglycinate | chelated | 25 mg/d | Vit C 250 mg |
| TSH 2.5–4.5 | Selenomethionine + Zn | std | 200 mcg + 15 mg | with iron if low |
| FT3 low + TSH normal | Selenomethionine + Zn + (Iron) | std | 200 mcg + 15 mg + iron protocol if Fe low | stress mgmt |
| GGT high | NAC + Glycine | NAC + glycine | 1.2g + 3g | Milk thistle 200 mg |
| Albumin <4.4 | Whey isolate | protein | 30g/d | + omega-3 2g |
| Uric Acid >5.5 | Tart cherry + Quercetin | extract | 500 + 500 mg | + Vit C 500 mg |
| hs-CRP >1.0 | Omega-3 + Curcumin + NAC | TG omega-3 + phytosome curcumin | 2-3g + 500×2 + 600×2 | sleep, visceral fat |
| Homocysteine >10 | Methylation Trio | Methyl-B12 + Methylfolate + P5P | 1000 mcg + 800 mcg + 25 mg | + TMG 1g if >15 |
| **[v1.1.5] ApoB >80** | **Bergamot + RYR + Berberine + Plant sterols** | **std extracts** | **1g + 1.2g + 500mg×2 + 2g** | **with CoQ10 200 mg** |
| **[v1.1.5] Fasting Insulin >8** | **Inositol + Berberine + Mg** | **Myo+DCI 40:1 / HCl / glycinate** | **4g + 500mg×3 + 400mg** | **walk after meals + resistance training** |
| **[v1.1.5] PTH >45 + Vit D <40** | **Cholecalciferol + Mg + Ca** | **D3 / glycinate / dietary or citrate** | **60,000 IU/wk × 8 + 400 mg + 1000–1200 mg/d** | **K2-MK7 100 mcg** |
| **[v1.1.5] Calcium low (<9.0) + Vit D low** | **Cholecalciferol + Mg + Ca** | **same as above** | **same as above** | **address Vit D first** |
| **[v1.1.5] Mg RBC <5.5** | **Magnesium glycinate / malate / L-threonate** | **chelated** | **400 mg/d at night** | **+ B6 (P5P) 25 mg** |
| **[v1.1.5] Cortisol AM high (>18)** | **Ashwagandha (KSM-66) + Phosphatidylserine + Mg** | **std extract / soy or sunflower / glycinate** | **600 mg/d + 100 mg pre-bed + 400 mg** | **sleep audit, stop caffeine after noon** |
| **[v1.1.5] Cortisol AM low (<10)** | **Ashwagandha + Liquorice (standardised) + Salt audit** | **KSM-66 / glycyrrhizin** | **600 mg/d + 100–200 mg AM** | **with physician — only if persistent low** |
| **[v1.1.5] Total T low (M)** | **Ashwagandha + Vit D + Zinc + Boron** | **KSM-66 / D3 / picolinate / chelate** | **600 mg + 4000 IU + 15 mg + 6 mg** | **+ resistance training, sleep 7–8h** |
| **[v1.1.5] Anti-TPO >9** | **Selenomethionine + Vit D + gluten-free trial** | **std / D3** | **200 mcg/d + 4000 IU/d (target 40–60 ng/mL)** | **+ ferritin >70, gut audit** |
| **[v1.1.5] DHEA-S low for age** | **Ashwagandha + Rhodiola** | **KSM-66 / std** | **600 mg/d + 200–400 mg AM** | **DHEA only with physician — Rx in India** |

---

## APPENDIX 14 — DATABASE SCHEMA v1.1

```sql
-- Core tables --

CREATE TABLE systems (
    id INT PRIMARY KEY,
    name VARCHAR,
    system_weight DECIMAL,           -- 0.20 for Glucose, etc.
    description TEXT
);

CREATE TABLE markers (
    id INT PRIMARY KEY,
    name VARCHAR,
    system_id INT REFERENCES systems(id),
    unit VARCHAR,
    conversion_factor DECIMAL,
    weight INT,                       -- weight within its system
    retest_weeks INT,
    score_formula VARCHAR,            -- 'linear' | 'u_curve' | 'genetic_once' | 'binary'
    is_acute_phase_confounded BOOLEAN,
    is_genetic_marker BOOLEAN DEFAULT FALSE
);

CREATE TABLE marker_aliases (
    marker_id INT REFERENCES markers(id),
    alias VARCHAR,
    region VARCHAR
);

CREATE TABLE marker_ranges (
    marker_id INT REFERENCES markers(id),
    range_type ENUM('lab','zenoho_optimal','zenoho_watch','zenoho_alert'),
    gender ENUM('M','F','any'),
    age_min INT,
    age_max INT,
    nationality ENUM('IN','ME','UK_EU','US','default'),
    low_value DECIMAL,
    high_value DECIMAL,
    watch_low_value DECIMAL,
    watch_high_value DECIMAL,
    citation VARCHAR
);

CREATE TABLE action_protocols (
    marker_id INT REFERENCES markers(id),
    trigger ENUM('below','above','watch','alert','extreme'),
    threshold_value DECIMAL,
    supplement_name VARCHAR,
    form VARCHAR,
    dose VARCHAR,
    pair_with VARCHAR,
    retest_weeks INT
);

-- Cross-marker logic --

CREATE TABLE cross_marker_rules (
    id INT PRIMARY KEY,
    rule_name VARCHAR,
    primary_marker_id INT REFERENCES markers(id),
    conditional_marker_id INT REFERENCES markers(id),
    primary_condition VARCHAR,        -- e.g. 'value > 300'
    conditional_condition VARCHAR,
    resolution_action VARCHAR,
    user_message TEXT,
    confidence_impact ENUM('none','medium','low')
);

-- Safety overrides --

CREATE TABLE safety_overrides (
    id INT PRIMARY KEY,
    marker_id INT REFERENCES markers(id),
    trigger_condition VARCHAR,        -- e.g. 'value < 8'
    sustained BOOLEAN,                -- requires 2 readings
    sustained_window_days INT,
    banner_message TEXT
);

-- Lab tiering --

CREATE TABLE labs (
    id INT PRIMARY KEY,
    name VARCHAR,
    aliases JSONB,
    tier ENUM('tier_1','tier_2','unknown'),
    nabl_accredited BOOLEAN,
    cap_accredited BOOLEAN,
    iso_15189 BOOLEAN,
    notes TEXT
);

-- User panels and results --

CREATE TABLE user_panels (
    id INT PRIMARY KEY,
    user_id INT,
    panel_date DATE,
    sample_time TIMESTAMP,
    last_meal_time TIMESTAMP,
    lab_id INT REFERENCES labs(id),
    timing_valid BOOLEAN,
    timing_warnings JSONB,
    final_score DECIMAL,
    health_level INT,
    confidence ENUM('HIGH','MEDIUM','LOW','INSUFFICIENT_DATA'),
    safety_overrides_triggered JSONB,
    cross_marker_flags JSONB
);

CREATE TABLE marker_results (
    id INT PRIMARY KEY,
    panel_id INT REFERENCES user_panels(id),
    marker_id INT REFERENCES markers(id),
    value DECIMAL,
    unit VARCHAR,
    score DECIMAL,                    -- per-marker 0-100
    confidence ENUM('HIGH','MEDIUM','LOW'),
    interference_flag VARCHAR,        -- NULL | 'BIOTIN' | 'HEMOLYSIS' | 'LIPEMIA' | 'ICTERUS' | 'ACUTE_PHASE'
    sample_time TIMESTAMP,
    last_meal_time TIMESTAMP
);

-- Genetic locks --

CREATE TABLE genetic_marker_locks (
    user_id INT,
    marker_id INT REFERENCES markers(id),
    first_valid_value DECIMAL,
    first_valid_date DATE,
    first_valid_lab_id INT REFERENCES labs(id),
    score_locked BOOLEAN DEFAULT TRUE,
    unlock_reason VARCHAR,
    unlock_date DATE,
    PRIMARY KEY (user_id, marker_id)
);

-- User supplement tracking (for biotin interference + protocol adherence) --

CREATE TABLE user_supplements (
    id INT PRIMARY KEY,
    user_id INT,
    supplement_name VARCHAR,
    dose_mg DECIMAL,
    form VARCHAR,
    started_date DATE,
    stopped_date DATE
);
```

### Seed data on launch

- 47 markers (this registry)
- 9 systems with weights
- 12 cross_marker_rules
- 11 safety_overrides
- 12 Tier 1 labs
- 1 genetic marker (Lp(a))

---

## APPENDIX 15 — VALIDATION & QA CHECKLIST (pre-production)

Before pushing v1.1 to production:

- [ ] All 47 markers have all 7 fields populated
- [ ] Every range cites a source (Indian or global)
- [ ] System weights sum to 100%
- [ ] Watch zones defined for all single-sided markers
- [ ] U-curve markers tagged in DB with `score_formula = 'u_curve'`
- [ ] All 11 safety overrides implemented with banner messages
- [ ] All 12 cross-marker rules implemented with resolution actions
- [ ] Tier 1 lab list seeded (12 labs)
- [ ] Lp(a) flagged `is_genetic_marker = TRUE`
- [ ] Biotin interference check active in panel-import pipeline
- [ ] Sample timing validation runs on every panel
- [ ] Valid Report Criteria gate runs before scoring
- [ ] Confidence tagging visible in UI
- [ ] Disclaimer present: "Zenoho is not a substitute for clinical care."
- [ ] Each Action Protocol tested for ambiguity by clinical reviewer
- [ ] Database schema migrations applied
- [ ] **INTEGRITY LAYER (v1.1):**
- [ ] Input Integrity Protocol enforced in scoring pipeline (rejects non-verified inputs)
- [ ] `score_input_audit` table populated on every input event
- [ ] Lab Error Detection runs all 22 patterns on every imported panel
- [ ] `retest_required` status implemented as fourth ENUM value
- [ ] Markers with `retest_required` excluded from System_Score (not zeroed)
- [ ] Authenticity Verification Tier 1 pipeline active (all 6 checks)
- [ ] Lab logo hash database seeded for 12 Tier 1 labs
- [ ] Reference number regex patterns active per lab
- [ ] Authenticity hard-disqualifiers reject scoring (name mismatch, future date, etc.)
- [ ] User-facing distinction working: `authenticity_failed` vs `retest_required` vs `insufficient_data`
- [ ] At least 5 sample panels processed end-to-end (your own + Ishita's reports are gold for this)
- [ ] At least 1 deliberately-corrupted test panel passed through fraud detection (verify rejection)
- [ ] At least 1 panel with biologically-impossible value passed through error detection (verify retest_required flag)
- [ ] **[v1.1.5] V1.1.5 ADDITIONS:**
- [ ] All 15 new markers (#48–62) have all 7 fields populated
- [ ] System weights sum to exactly 100% (verified: 18+15+14+12+10+10+11+5+5 = 100)
- [ ] System 10 (Hormones) seeded in `systems` table with weight 0.05
- [ ] Cross-marker rules expanded to 15 (rules 13–15 active in production code)
- [ ] Safety overrides expanded to 13 (Calcium and Cortisol triggers active)
- [ ] Lab error detection expanded to 25 patterns (3 new biologically-impossible thresholds in code)
- [ ] U-curve marker list updated to include MCHC, Globulin, Calcium, Cortisol AM, SHBG
- [ ] Sample timing validation includes all v1.1.5 timing-sensitive markers (Cortisol, Testosterone, Free T, SHBG, PTH, Calcium, ApoB, Fasting Insulin)
- [ ] Cortisol AM timing gate enforced (7–9 AM strict; afternoon samples flagged invalid)
- [ ] Testosterone timing gate enforced (7–10 AM; afternoon samples flagged with timing warning)
- [ ] Anti-TPO triggers female-specific monitoring path (every 6 months TSH/FT4 when positive)
- [ ] DHEA-S age-stratified ranges implemented per gender
- [ ] Calcium albumin-correction formula implemented for low-albumin states
- [ ] Globulin auto-calculated from Total Protein − Albumin where direct measurement absent
- [ ] HOMA-IR cross-references Fasting Insulin (Marker 54) — interpretation paired
- [ ] ApoB takes precedence over LDL in Lipid system scoring when both present
- [ ] Female hormone panel deferred to v1.2 — no female-specific testosterone/estrogen ranges in v1.1.5

---

## APPENDIX 16 — INPUT INTEGRITY PROTOCOL (Implementation)

The foundational principle is stated in the preamble. This appendix is the implementation detail.

### Score Input Gate

```python
class ScoreInputGate:
    """Hard gate before any input touches the scoring pipeline."""
    
    ACCEPTED_INPUT_TYPES = {
        'verified_lab_report',
        'verified_demographic',
        'documented_medication',  # context only, not scored
        'documented_pregnancy',   # context only, adjusts ranges
    }
    
    REJECTED_FOR_SCORING = {
        'self_reported_activity',
        'wearable_data',
        'food_log',
        'mood_entry',
        'manual_marker_entry',
        'user_edit_of_lab_value',
        'forwarded_report_unverified',
        'symptom_questionnaire',  # context only, never scored
    }
    
    def can_affect_score(self, input_type, input_source):
        if input_type in self.REJECTED_FOR_SCORING:
            return False, f"{input_type} cannot move the Zenoho Score by design."
        if input_type in self.ACCEPTED_INPUT_TYPES:
            return True, None
        # Default deny — unknown input types never reach scoring
        return False, "Unknown input type. Defaulting to non-scoring."
```

### Audit Trail Schema

Every input that touches scoring is logged. This protects Zenoho legally (proves score is biology-based) and clinically (regulators can audit).

```sql
CREATE TABLE score_input_audit (
    id INT PRIMARY KEY,
    user_id INT,
    input_type VARCHAR,
    input_source VARCHAR,
    input_timestamp TIMESTAMP,
    accepted_for_scoring BOOLEAN,
    rejection_reason VARCHAR,
    affected_score_id INT,    -- NULL if rejected
    raw_input_hash VARCHAR     -- for tamper detection
);
```

### Database Tagging on Marker Results

```sql
ALTER TABLE marker_results ADD COLUMN input_source ENUM(
    'verified_lab_pdf',
    'verified_lab_api',          -- direct lab API integration (future)
    'manual_entry_unscored',     -- displayed only, never scored
    'imported_legacy'             -- pre-Zenoho records
);

ALTER TABLE marker_results ADD COLUMN is_score_eligible BOOLEAN DEFAULT FALSE;
-- Only verified_lab_pdf and verified_lab_api set this to TRUE
```

### What this enables

- **Regulatory defensibility:** Audit log proves score is biology-based per published methodology
- **Trust moat:** Competitors who let users self-report can be undercut by Zenoho's "real biology, not vanity metric" positioning
- **B2B credibility:** Corporate wellness buyers can rely on Zenoho scores as substantive, not gameable
- **AI engine integrity:** Training data stays clean

### What this rules out (intentionally)

- Gamification of the score itself (badges, streaks tied to score movement)
- "Health challenges" promising score increases for activity
- AI-generated synthetic biology (no LLM-imputed missing markers ever feed the score)

---

## [v1.1.5] APPENDIX 17 — LAB ERROR DETECTION RULES (25 patterns)

Lab reports contain errors. Wrong decimal place, units swapped, sample mislabelled, transcription error in lab software, hemolysis affecting an assay. If Zenoho ingests these uncritically, the score lies and the user's protocol is wrong.

### The Fourth Marker Status

```sql
ALTER TABLE marker_results MODIFY COLUMN status ENUM(
    'optimal',        -- in Zenoho Optimal range
    'watch',          -- in Watch zone
    'alert',          -- in Alert zone
    'retest_required' -- v1.1 NEW: lab error suspected, excluded from scoring
);
```

When `status = 'retest_required'`:
- **Excluded** from System_Score calculation (denominator and numerator both)
- **Excluded** from Final_Score
- Marker shown to user with grey "verify" badge, not red "alert"
- User message: "This value needs verification before we score it."
- The marker contributes 0 to system marker count for `Valid Report Criteria` gate

### [v1.1.5] Group A — Biologically Impossible Values (13 patterns)

Trigger automatically.

| # | Marker | Trigger | Reason |
|---|---|---|---|
| 1 | Haemoglobin | <4 or >25 g/dL | Below 4 = imminent death; above 25 = polycythaemia crisis or unit error |
| 2 | Fasting Glucose | <30 or >600 mg/dL | Below 30 = coma threshold; above 600 = HHS, would not be ambulatory |
| 3 | TSH | >100 mIU/L | Possible only in severe untreated myxoedema; nearly always unit/decimal error |
| 4 | Creatinine | >10 mg/dL | End-stage renal failure on dialysis; unlikely in routine outpatient |
| 5 | Platelets | <20 or >800 ×10³/µL | Spontaneous bleeding / essential thrombocythaemia ranges |
| 6 | Potassium | <2.0 or >7.0 mEq/L | Cardiac arrest territory; haemolysis common cause of false high |
| 7 | Sodium | <120 or >160 mEq/L | Acute neurological emergency range |
| 8 | ALT or AST | >1000 U/L | Acute hepatitis / liver failure — emergency, not screening |
| 9 | HbA1c | <3.5 or >18 % | Below 3.5 = haemoglobinopathy or assay error; above 18 = severe interference |
| 10 | LDL | <20 or >400 mg/dL | Below 20 = severe malnutrition; above 400 = familial homozygous, exceptionally rare |
| **23** | **[v1.1.5] Calcium** | **>14 mg/dL** | **Hypercalcaemic crisis territory; not seen in ambulatory outpatient. Lab/transcription error or severe hypercalcaemia of malignancy needing immediate hospitalisation.** |
| **24** | **[v1.1.5] Total Testosterone (M)** | **>2000 ng/dL** | **Far above natural male range; suggests assay error, lab interference, or undisclosed exogenous steroid use. Confirm with repeat sample + free T + SHBG.** |
| **25** | **[v1.1.5] Cortisol AM** | **>50 µg/dL** | **Severe hypercortisolism — Cushing's disease or ectopic ACTH syndrome. Rare in outpatient screening; assay error or sample-timing error (PM cortisol mislabelled AM) far more likely than true Cushing's.** |

```python
BIOLOGICALLY_IMPOSSIBLE_RANGES = {
    'Hemoglobin':          (4, 25, 'g/dL'),
    'FBS':                 (30, 600, 'mg/dL'),
    'TSH':                 (None, 100, 'mIU/L'),
    'Creatinine':          (None, 10, 'mg/dL'),
    'Platelets':           (20, 800, '×10³/µL'),
    'Potassium':           (2.0, 7.0, 'mEq/L'),
    'Sodium':              (120, 160, 'mEq/L'),
    'ALT':                 (None, 1000, 'U/L'),
    'AST':                 (None, 1000, 'U/L'),
    'HbA1c':               (3.5, 18, '%'),
    'LDL':                 (20, 400, 'mg/dL'),
    # [v1.1.5] additions:
    'Calcium':             (None, 14, 'mg/dL'),
    'Total_Testosterone_M': (None, 2000, 'ng/dL'),
    'Cortisol_AM':         (None, 50, 'µg/dL'),
}
```

Update header and section reference: pattern count is now **25** (Group A: 13, Group B: 10, Group C: 2; cross-panel Group D shifts unchanged).

### Group B — Internal Inconsistency (10 patterns)

| # | Pattern | Why suspicious |
|---|---|---|
| 11 | TSH high (>5) + FT4 high (>1.6) | Should be inverse; only TSH-secreting pituitary tumour (rare) or assay interference |
| 12 | TSH low (<0.4) + FT4 low (<0.9) | Central hypothyroidism rare; assay error more common |
| 13 | HbA1c <5.0 + FBS >150 | 90-day average can't be that low if fasting that high |
| 14 | HbA1c >7 + FBS <80 | Sustained high A1c with persistently low fasting glucose implausible |
| 15 | Total Protein ≠ Albumin + Globulin (within ±0.3 g/dL) | Math doesn't add up |
| 16 | Direct Bilirubin > Total Bilirubin | Mathematically impossible |
| 17 | TIBC < Serum Iron | TIBC is capacity — must exceed iron in transit |
| 18 | TSAT calculated ≠ (Iron/TIBC × 100) ±2% | Math/transcription error |
| 19 | LDL > Total Cholesterol | LDL is component of TC — cannot exceed |
| 20 | Hb (g/dL) × 3 ≈ HCT (%) — if ratio off by >15% | Standard rule of thumb violated |

### Group C — Decimal / Unit Errors (2 patterns)

Don't auto-flag — prompt user to confirm.

| # | Pattern | Likely Error |
|---|---|---|
| 21 | LDL = 13–25 or 1300–2500 mg/dL | Decimal shift |
| 22 | TG = 8–20 or 800–2000 mg/dL | Decimal shift / units swapped |

### Group D — Sudden Unexplained Cross-Panel Shifts

Across two consecutive panels without documented therapy:

| Marker | Improbable Shift |
|---|---|
| HbA1c | >2% in 12 weeks |
| LDL | >40% without statin/PCSK9-i |
| Ferritin | >5× without iron therapy or major bleed |
| TSH | >5× without thyroid medication |
| Creatinine | >50% without AKI or new medication |
| ALT | >5× without documented hepatic event |

### Aggregate Logic

```python
def detect_lab_errors(panel, prev_panel=None, user_therapy_log=None):
    error_flags = []
    
    # Group A — biologically impossible
    for marker, value in panel.items():
        if marker in BIOLOGICALLY_IMPOSSIBLE_RANGES:
            low, high, _ = BIOLOGICALLY_IMPOSSIBLE_RANGES[marker]
            if (low and value < low) or (high and value > high):
                error_flags.append((marker, 'biologically_impossible'))
    
    error_flags.extend(check_internal_consistency(panel))
    error_flags.extend(check_decimal_errors(panel))
    
    if prev_panel and user_therapy_log:
        error_flags.extend(check_unexplained_shift(prev_panel, panel, user_therapy_log))
    
    return error_flags

def apply_lab_error_flags(panel_results, error_flags):
    for marker, error_type in error_flags:
        panel_results[marker].status = 'retest_required'
        panel_results[marker].excluded_from_score = True
        panel_results[marker].error_type = error_type
        panel_results[marker].user_message = generate_error_message(marker, error_type)
```

### User-Facing Messages

| Error Type | Plain-English Message |
|---|---|
| `biologically_impossible` | "This value is outside the range we'd expect from a living, ambulatory person. Most likely a lab transcription error. Please ask the lab to verify and re-issue, or retest." |
| `thyroid_pattern_inconsistent` | "Your TSH and FT4 are pointing in directions that shouldn't happen together. Usually a lab assay issue (sometimes biotin interference). Please retest after pausing biotin for 72h." |
| `glucose_a1c_mismatch` | "Your fasting glucose and HbA1c don't tell the same story — one of them needs verification. Retest both fasting." |
| `protein_math_mismatch` | "Total protein doesn't match albumin + globulin. Likely a transcription error." |
| `impossible_bilirubin_split` | "Direct bilirubin can't exceed total bilirubin. There's a transcription error." |
| `tibc_below_iron` | "Your TIBC is lower than your serum iron — mathematically not possible. Ask the lab to verify." |
| `ldl_exceeds_total_chol` | "Your LDL is higher than Total Cholesterol — LDL is a component of TC, so this can't happen." |
| `hb_hct_ratio_off` | "The relationship between your Hb and Haematocrit looks off. One needs verification." |
| `possible_decimal_shift_low` / `_high` | "This value looks like it might be missing or extra zeros. Please confirm with the lab." |
| `unexplained_large_shift` | "This value moved more than biology usually allows in this timeframe. If you didn't start a new medication, please retest to confirm." |

### Database

```sql
ALTER TABLE marker_results ADD COLUMN error_type VARCHAR;
ALTER TABLE marker_results ADD COLUMN excluded_from_score BOOLEAN DEFAULT FALSE;
ALTER TABLE marker_results ADD COLUMN user_message_override TEXT;

CREATE TABLE lab_error_incidents (
    id INT PRIMARY KEY,
    user_id INT,
    panel_id INT REFERENCES user_panels(id),
    marker_id INT REFERENCES markers(id),
    error_type VARCHAR,
    detected_at TIMESTAMP,
    lab_id INT REFERENCES labs(id),
    resolved BOOLEAN DEFAULT FALSE,
    resolution_method VARCHAR  -- 'retest_normal', 'lab_corrected', 'user_dismissed'
);
```

### Why this protects the platform

1. Single bad value can't sink a user's score — excluding is fairer than alerting
2. Pattern detection over time — repeated errors from a specific lab become signal (downgrades that lab's tier)
3. Insurance defensibility — Zenoho can't be sued for acting on a lab error if Zenoho refused to score the suspect value
4. Data integrity for AI training — error-flagged values don't enter the training set

---

## APPENDIX 18 — REPORT AUTHENTICITY VERIFICATION (TIER 1)

Once Zenoho has any user-monetisation incentive (insurance discounts, corporate wellness perks, rewards), users will try to fabricate or alter reports. The fraud surface area expands the moment money or status is on the line.

### Tier 1 Pipeline (6 checks)

Every uploaded PDF runs through this pipeline before any data is extracted for scoring.

#### Check 1 — PDF Metadata Analysis

Extract from PDF metadata:
- `Producer` / `Creator` software
- `CreationDate`, `ModDate`
- Title, Author, Subject fields
- Embedded fonts list

Red flags:
- `ModDate` ≠ `CreationDate` (file edited after creation)
- Producer = "Microsoft Word" / "Adobe Photoshop" / "Foxit Editor" — legit lab PDFs use reporting software
- `ModDate` after sample collection by months/years
- Producer field empty or stripped (suspicious removal)
- Embedded fonts show common Word fonts instead of lab's reporting font

```python
def check_pdf_metadata(pdf_file):
    metadata = extract_pdf_metadata(pdf_file)
    score = 100
    flags = []
    
    if metadata.creator in ['Microsoft Word', 'Adobe Photoshop', 'Foxit PDF Editor', 'PDFescape']:
        score -= 60; flags.append('authoring_tool_detected')
    
    if metadata.mod_date and metadata.creation_date:
        if metadata.mod_date > metadata.creation_date + timedelta(hours=2):
            score -= 30; flags.append('post_creation_modification')
    
    if not metadata.producer or metadata.producer == '':
        score -= 20; flags.append('metadata_stripped')
    
    if metadata.creation_date < panel.sample_collection_date - timedelta(days=1):
        score -= 40; flags.append('creation_before_sample')  # impossible
    
    return {'score': score, 'flags': flags}
```

#### Check 2 — Lab Logo Recognition

Each Tier 1 lab has a known logo. Extract images from PDF, compute perceptual hash (pHash), compare to logo hash database.

```python
def check_lab_logo(pdf_file, claimed_lab):
    extracted_logos = extract_top_images_from_pdf(pdf_file, region='header')
    expected_logo_hash = TIER_1_LOGO_HASHES.get(claimed_lab)
    
    if not expected_logo_hash:
        return {'score': 50, 'flags': ['unknown_lab_logo']}
    
    for logo_img in extracted_logos:
        actual_hash = compute_phash(logo_img)
        if hamming_distance(actual_hash, expected_logo_hash) < 8:
            return {'score': 100, 'flags': []}
    
    return {'score': 0, 'flags': ['logo_mismatch']}
```

Logo hash database seeded at launch with the 12 Tier 1 labs from Appendix 9. Updated quarterly (labs occasionally refresh branding).

#### Check 3 — Reference Number Format Validation

| Lab | Reference Format Pattern |
|---|---|
| House of Diagnostics | `^[A-Z]{3,4}\d{8,12}$` (e.g., G4726041189, BGT24101270) |
| Dr Lal PathLabs | `^\d{9,12}$` |
| Thyrocare | `^TYC\d{9,11}$` |
| SRL Diagnostics | `^[A-Z]\d{10,12}$` |
| Metropolis | `^M\d{10,12}$` |
| Apollo Diagnostics | `^APO\d{8,11}$` |

```python
LAB_REF_PATTERNS = {
    'house_of_diagnostics': r'^[A-Z]{3,4}\d{8,12}$',
    'dr_lal_pathlabs':      r'^\d{9,12}$',
    'thyrocare':            r'^TYC\d{9,11}$',
    'srl_diagnostics':      r'^[A-Z]\d{10,12}$',
    'metropolis':           r'^M\d{10,12}$',
    'apollo_diagnostics':   r'^APO\d{8,11}$',
}
```

#### Check 4 — QR Code Verification

Many Indian NABL labs include verification QR codes. Extract and parse.

```python
def check_qr_code(pdf_file, claimed_lab):
    qr_codes = extract_qr_codes_from_pdf(pdf_file)
    
    if claimed_lab in LABS_WITH_QR_VERIFICATION:
        if not qr_codes:
            return {'score': 30, 'flags': ['expected_qr_missing']}
        
        for qr in qr_codes:
            decoded = decode_qr(qr)
            if decoded.startswith(LABS_QR_URL_PREFIX[claimed_lab]):
                return {'score': 100, 'flags': ['qr_verified']}
        
        return {'score': 20, 'flags': ['qr_present_but_invalid']}
    
    return {'score': 80, 'flags': ['qr_not_required_by_lab']}
```

Note: actually fetching the QR URL to confirm against the lab portal is Tier 2 (requires whitelist agreements). At Tier 1, presence + format match is sufficient.

#### Check 5 — Sample Collection Date Plausibility

```python
def check_sample_date_plausibility(sample_date, upload_date, user_registration_date):
    flags = []; score = 100
    
    if sample_date > upload_date:
        score = 0; flags.append('sample_date_in_future')
    
    if sample_date > datetime.now():
        score = 0; flags.append('sample_date_after_today')
    
    if (upload_date - sample_date).days > 365:
        score -= 20; flags.append('sample_older_than_1_year')
    
    if sample_date < user_registration_date - timedelta(days=730):
        score -= 30; flags.append('sample_predates_user_registration')
    
    return {'score': score, 'flags': flags}
```

#### Check 6 — Patient Name Match

```python
def check_patient_name_match(extracted_name, registered_name):
    extracted_clean = normalise_name(extracted_name)
    registered_clean = normalise_name(registered_name)
    
    if extracted_clean == registered_clean:
        return {'score': 100, 'flags': []}
    
    similarity = fuzzy_match_score(extracted_clean, registered_clean)
    if similarity > 0.85:
        return {'score': 80, 'flags': ['name_fuzzy_match']}
    if similarity > 0.6:
        return {'score': 30, 'flags': ['name_partial_match']}
    
    return {'score': 0, 'flags': ['name_mismatch']}
```

Family-account exception: when family member panels are uploaded, name match runs against any registered family-linked profile.

### Aggregate Authenticity Score

```python
def compute_authenticity_score(pdf_file, claimed_lab, panel_data, user):
    checks = {
        'pdf_metadata':       check_pdf_metadata(pdf_file),
        'lab_logo':           check_lab_logo(pdf_file, claimed_lab),
        'reference_number':   check_reference_number(panel_data.ref_num, claimed_lab),
        'qr_code':            check_qr_code(pdf_file, claimed_lab),
        'sample_date':        check_sample_date_plausibility(
                                  panel_data.sample_date, 
                                  panel_data.upload_date,
                                  user.registration_date),
        'patient_name':       check_patient_name_match(
                                  panel_data.patient_name, 
                                  user.full_name),
    }
    
    weights = {
        'pdf_metadata':     0.20,
        'lab_logo':         0.15,
        'reference_number': 0.15,
        'qr_code':          0.10,
        'sample_date':      0.20,
        'patient_name':     0.20,
    }
    
    total_score = sum(checks[k]['score'] * weights[k] for k in checks)
    all_flags = [f for k in checks for f in checks[k]['flags']]
    
    is_authentic = total_score >= 70 and 'name_mismatch' not in all_flags \
                   and 'sample_date_in_future' not in all_flags \
                   and 'creation_before_sample' not in all_flags \
                   and 'logo_mismatch' not in all_flags
    
    return {
        'is_authentic': is_authentic,
        'authenticity_score': total_score,
        'verification_method': 'tier_1_metadata_logo_ref_qr_date_name',
        'flags': all_flags,
        'individual_checks': checks
    }
```

### Hard Disqualifiers (override aggregate)

These flags fail authenticity regardless of total score:
- `name_mismatch` (different person, not fuzzy-near)
- `sample_date_in_future`
- `sample_date_after_today`
- `creation_before_sample` (PDF created before sample taken — fabricated)
- `logo_mismatch` (claimed lab's logo not present)

### When Authenticity Fails

- Report is **not scored**
- Markers stored with `is_score_eligible = FALSE`
- User sees:

> ⚠️ **We could not verify this report's authenticity.**
> 
> Some signals on the upload didn't match what we'd expect from a {claimed_lab} report:
> - {specific_flags_in_plain_english}
> 
> Please re-upload the **original PDF directly from your lab portal**, or order a fresh test from one of our verified labs. We can't add this report to your Zenoho profile until it passes verification.
> 
> [Re-upload] [Order new test] [Talk to support]

- Incident logged for fraud pattern detection (multiple failed uploads from same user → flag for manual review)

### Database

```sql
ALTER TABLE user_panels ADD COLUMN is_authentic BOOLEAN;
ALTER TABLE user_panels ADD COLUMN authenticity_score DECIMAL(5,2);
ALTER TABLE user_panels ADD COLUMN verification_method VARCHAR;
ALTER TABLE user_panels ADD COLUMN authenticity_flags JSONB;

CREATE TABLE authenticity_incidents (
    id INT PRIMARY KEY,
    user_id INT,
    panel_id INT REFERENCES user_panels(id),
    detected_at TIMESTAMP,
    flags JSONB,
    authenticity_score DECIMAL,
    user_action VARCHAR,           -- 're_uploaded', 'ordered_new', 'abandoned', 'support_contacted'
    resolved BOOLEAN DEFAULT FALSE,
    fraud_likelihood ENUM('low', 'medium', 'high', 'confirmed')
);

CREATE TABLE lab_logo_hashes (
    lab_id INT REFERENCES labs(id),
    logo_phash VARCHAR(64),
    last_updated DATE,
    notes TEXT
);
```

### Tier 2 (Future — v1.2 or v2)

Documented so architecture is forward-compatible:

| Tier 2 Check | What it adds |
|---|---|
| Font analysis | Detect tampering — pasted text uses different font than original |
| OCR confidence scoring | Low confidence on values → was the report flattened/scanned/re-printed? |
| Lab portal cross-reference | Hit lab API with ref number + DOB → verify result match |
| Layout consistency | Compare extracted layout to known good template per lab |

### Tier 3 (Future — v2+)

| Tier 3 Check | What it adds |
|---|---|
| ML forgery detection | Train model on known-good vs known-fraud reports |
| Pixel forensics | Detect image splicing, compression artefacts, copy-move forgery |
| Direct lab API integration | Bypass PDF — Zenoho fetches results directly from partner labs |
| Blockchain anchoring | Lab reports cryptographically signed at issue, Zenoho verifies signature |

### User-Facing Output Spec — Three Distinct Statuses

The dashboard must clearly distinguish:

| Status | Visual | Message Example | Marker Affected |
|---|---|---|---|
| **`authenticity_failed`** | Red banner above panel | "We could not verify this report's authenticity. Re-upload original PDF from your lab portal." | Whole panel rejected |
| **`retest_required`** (Appendix 17) | Grey 'verify' badge on specific markers | "These values need verification before we score them." | Individual marker(s) excluded |
| **`insufficient_data`** (Appendix 5) | Blue informational banner | "Add {N} more markers to unlock your full Zenoho Score." | Score not generated |

These are not interchangeable. Each represents a different problem and a different user action.

### What Tier 1 protects against

| Attack vector | Tier 1 catches | Notes |
|---|---|---|
| Photoshopped report | YES (metadata + logo + math) | Edit timestamps, font changes, logo mismatch |
| Borrowed report (someone else's, name changed) | YES (name match) | If only name field edited |
| Re-issued legitimate report (multiple uploads) | PARTIAL | Hash collision check needed — Tier 2 |
| Fabricated from scratch in Word | YES (metadata + logo + ref format) | Producer = "Microsoft Word" → fail |
| Old report submitted as new | PARTIAL (date plausibility) | Catches >1yr old; misses 2–11mo old |
| Stolen report from another user | YES (name match) | Unless attacker also forges name |

### Residual Risks at Tier 1 (accepted)

- Sophisticated rendering of fake report using lab's own template + correct ref pattern
- Pre-emptive purchase of lab kit, real test on someone else, label swap (out of scope — needs biometric verification)
- Insider lab-staff complicity

These are accepted residual risks. Cost of Tier 2/3 is justified once Zenoho has scale + monetisation + fraud volume.

---

**[v1.1.5] END OF ZENOHO MARKER REGISTRY v1.1.5 — PRODUCTION**

*62 markers · 10 systems · Indian disease burden weighted · Performance optimised · Database importable · Integrity layer · Hormonal panel*

*Compiled for Zenoho Health Private Limited.*
*Disclaimer: This registry is a decision-support tool for Zenoho's AI engine. It is not medical advice. Users with abnormal results should consult qualified physicians. Zenoho does not diagnose, treat, cure, or prevent disease.*

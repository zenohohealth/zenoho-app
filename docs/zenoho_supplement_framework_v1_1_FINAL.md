# Zenoho Health Supplement Framework v1.1 — Part 3 Only

**Document type:** Part 3 replacement — Supplement Library (fully populated)
**Version:** v1.1
**Status:** Production-ready supplement library — replaces the Part 3 placeholder in framework v1.0
**Date:** May 13, 2026
**Owner:** Zenoho Health Private Limited
**Source passes:** Pass 3 (V32–V51, Western supplement evidence, May 12 2026) + Pass 3B (A3B-1 through A3B-11, Ayurvedic supplement evidence, May 12 2026) + Pass 4 P4-2 (FSSAI regulatory findings)
**Companion documents:**
- `zenoho_supplement_framework_v1_0.md` — Parts 1–2, 4–8 remain in force; Part 3 herein supersedes the v1.0 placeholder
- `zenoho_pass3_verdicts.md` — Western evidence source of truth
- `zenoho_pass3b_verdicts.md` — Ayurvedic evidence source of truth
- `zenoho_pass4_verdicts.md` — FSSAI and regulatory source of truth

---

## Merge instructions

This file constitutes the full, verified Part 3 of the Supplement Framework. It is a standalone document to be merged into the v1.0 framework by replacing everything between the `## Part 3: Supplement library` header and the `## Part 4: Sourcing and safety standards` header. Parts 1, 2, and 4–8 are unchanged from v1.0.

---

## Part 3: Supplement library

### Phase 1 business-model note (mandatory context for this entire Part)

> **Phase 1 (current):** Zenoho is a recommendation-only platform. No supplements are sold or dispatched by Zenoho. Sourcing constraints in each entry below function as **recommendation eligibility criteria** — Zenoho only recommends products where the manufacturer demonstrably meets these standards. They are not procurement requirements in Phase 1.
>
> **Phase 2 (affiliate links, future):** Sourcing constraints become active vetting criteria for affiliate partners. Zenoho confirms NSF status and sourcing standards for each affiliate product before listing.
>
> **Phase 3 (direct sales, future):** Full FSSAI FBO licensing, per-batch COA review, and procurement-level sourcing compliance required. Framework architecture accommodates this without structural change.
>
> For FSSAI NSF-flagged supplements in Phase 1, the workaround framing specified in each entry is the only permitted consumer-facing language until NSF status is confirmed from a specific manufacturer.

---

### 3.1 Entry format guide

Each supplement entry uses the following fields:

| Field | Content |
|---|---|
| **Standard form** | Formulation appropriate for general use |
| **Premium form** | Higher-bioavailability formulation when the gap is clinically meaningful |
| **Dose range** | Typical adult; physician-supervised ranges noted separately |
| **Evidence** | Backend code (A/B/C/TRADITIONAL) + user-facing label |
| **Citations** | Primary verified sources from Pass 3 / Pass 3B |
| **Regulatory** | FSSAI/AYUSH status; NSF flags where applicable |
| **Contraindications** | Key interactions listed inline per entry. All contraindications also propagate to **Part 5** contraindication matrix via Section 3.6 of this document. Individual entries do not repeat "See Part 5" in every row — Part 5 integration is managed centrally through Section 3.6. |
| **Pregnancy/BF** | Status stated inline per entry. Full pregnancy and breastfeeding protocol (trimester-specific rules, multi-supplement safety, prescriber communication): see **Part 6** of the framework. Key pregnancy exclusions also propagate to **Part 5** matrix via Section 3.6. |

---

### 3.2 Indication index

| # | Indication |
|---|---|
| 3.3.1 | B12 deficiency / vegetarian supplementation / elevated homocysteine |
| 3.3.2 | Vitamin D deficiency / insufficiency |
| 3.3.3 | Iron / ferritin deficiency |
| 3.3.4 | Folate deficiency / methylation support |
| 3.3.5 | Magnesium deficiency / muscle cramps / sleep / cognitive support |
| 3.3.6 | Cortisol dysregulation / chronic stress / anxiety / sleep difficulty |
| 3.3.7 | Inflammation / elevated hs-CRP |
| 3.3.8 | Cognitive support / memory / focus |
| 3.3.9 | Liver health / elevated ALT / GGT / NAFLD |
| 3.3.10 | Glucose / insulin resistance / pre-diabetes |
| 3.3.11 | Joint pain / osteoarthritis |
| 3.3.12 | General vitality / Rasayana / longevity |
| 3.3.13 | Thyroid support (Hashimoto's adjunct, subclinical hypothyroidism) |
| 3.3.14 | Lipid optimization (LDL, HDL, triglycerides, Lp(a)) |
| 3.3.15 | Weight management / metabolic syndrome |
| 3.3.16 | Gut health / microbiome / IBS / SIBO |
| 3.3.17 | Women's hormonal balance (PCOS, menstrual irregularity, perimenopause) |
| 3.3.18 | Men's testosterone optimization (physiological range only; no anabolic agents) |
| 3.3.19 | Skin / hair / nails |
| 3.3.20 | Recovery / athletic performance (natural-substance bounds) |
| 3.3.21 | Immune support (acute and chronic) |
| 3.3.22 | Mood support (depression-adjunct only; not standalone therapy) |
| 3.3.23 | Bone health / osteoporosis prevention |
| 3.3.24 | Allergic / atopic conditions |

---

### 3.3 Supplement library entries

---

#### 3.3.1 — B12 deficiency / vegetarian supplementation / elevated homocysteine

**Biomarker triggers:** Serum B12 < 300 pg/mL (IFM functional lower limit); homocysteine > 10 μmol/L (IFM optimal upper limit); documented vegetarian or vegan diet (proxy risk factor for subclinical deficiency even within lab reference range).

**Tier 1 — Methylcobalamin**

| Field | Detail |
|---|---|
| **Standard form** | Methylcobalamin 500–1000 mcg/day oral tablet |
| **Premium form** | Sublingual methylcobalamin 1000–1500 mcg/day for confirmed deficiency or neurological symptoms — non-inferior to IM cyanocobalamin per comparative studies; preferred for neurological applications due to active-form argument |
| **Dose range** | 500–1000 mcg/day maintenance; 1000–1500 mcg/day repletion phase (3–6 months). Physician-supervised: IM cyanocobalamin 1000 mcg/day × 7 days loading then monthly for severe deficiency. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Kiliç et al. 2021 *Hematology* 26:1013–1017; Aydin et al. 2025 *Children* 12(4):442 PMID 40310078; Frontiers systematic review 2025 (sublingual = IM comparability); FSS Nutraceuticals Regulations 2022 (FSSAI). |
| **Regulatory** | ⚠️ **FSSAI — CONDITIONAL FLAG:** Gazette notification formally lifting prior methylcobalamin ban pending as of Jan 2025. Doses above RDA (2.4 mcg/day nutraceutical ceiling) require FSMP/FSDU category treatment. **Phase 1 workaround:** Recommend "methylcobalamin supplement per physician guidance" — do NOT specify a dose above RDA in consumer-facing copy. |
| **Contraindications** | None at recommended doses. Leber's hereditary optic neuropathy: cyanocobalamin form contraindicated; methylcobalamin preferred. |
| **Pregnancy/BF** | Safe — B12 is essential during pregnancy; continue at physician-recommended doses. |

**Co-supplementation note:** For homocysteine reduction, methylcobalamin must be paired with folate (5-MTHF or folic acid). See Indication 3.3.4. Both are required — neither alone is sufficient for full Hcy lowering when both pathways are impaired.

---

#### 3.3.2 — Vitamin D deficiency / insufficiency

**Biomarker triggers:** 25-OH Vitamin D < 20 ng/mL (deficiency); 20–29 ng/mL (insufficiency); < 30 ng/mL (IFM functional insufficiency for users with cardiovascular or immune concerns).

**Tier 1 — Cholecalciferol (D3)**

| Field | Detail |
|---|---|
| **Standard form** | Cholecalciferol (D3) 60,000 IU/week sachet (standard Indian pharmaceutical format: Calcirol, D-Rise, Tayo) |
| **Premium form** | Not applicable — D3 is the preferred supplementation form; D2 (ergocalciferol) is inferior and not recommended |
| **Dose range** | Deficiency (< 20 ng/mL): 60,000 IU/week × **12 weeks**. Insufficiency (20–29 ng/mL): 60,000 IU/week × **8 weeks**. Maintenance post-repletion: 60,000 IU/month or 1,000–2,000 IU/day. ⚠️ The performance domains v1.0 document stated "8 weeks if below 30 ng/mL" — this underdoses true deficiency. 12-week duration for deficiency is the India-specific consensus. |
| **Evidence** | `evidenceLevel: A` — **"Strong scientific evidence"** |
| **Citations** | IJEM 2025 India Consensus DOI 10.4103/ijem.ijem_264_24 (PMID: Jan 2025, 29(1):13–26); PMC11677994 (safety data at these protocols). |
| **Regulatory** | CLEAR — cholecalciferol explicitly permitted FSSAI nutraceutical; 60,000 IU sachets are standard Indian format. |
| **Contraindications** | Hypercalcemia (absolute contraindication); sarcoidosis and other granulomatous diseases (D3 raises calcium uncontrollably); Williams syndrome; primary hyperparathyroidism. Monitor serum calcium at doses > 10,000 IU/day maintenance. |
| **Pregnancy/BF** | Safe — deficiency correction is standard obstetric care; physician oversight required for loading protocols. |

**Co-supplementation note:** Vitamin K2 (MK-7, 100–200 mcg/day) is strongly recommended alongside high-dose D3 to direct calcium toward bone rather than arterial wall — particularly relevant for users with elevated cardiovascular markers. Vitamin K2 evidence is not yet formally verified in the Zenoho pass system; this co-supplementation recommendation carries a pending-verification flag until a future pass formalises it.

---

#### 3.3.3 — Iron / ferritin deficiency

**Biomarker triggers:** Serum ferritin < 30 ng/mL (IFM functional lower limit); < 15 ng/mL (WHO deficiency); Hb < 12 g/dL (female) or < 13 g/dL (male); TIBC elevated; transferrin saturation < 16%.

**Tier 1 — Iron bisglycinate (ferrous bisglycinate chelate)**

| Field | Detail |
|---|---|
| **Standard form** | Iron bisglycinate — always preferred over ferrous sulfate for both efficacy and GI tolerability |
| **Premium form** | Not required — bisglycinate IS the premium form; no further upgrade available |
| **Dose range** | 18–27 mg elemental iron/day for deficiency correction. 9–18 mg/day maintenance. ⚠️ Always specify **elemental iron** content, not compound weight. Physician-supervised: 60–120 mg elemental iron/day (divided) for moderate-severe IDA. Take with 50–100 mg vitamin C; avoid calcium, tea, coffee within 1 hour. |
| **Evidence** | `evidenceLevel: A` — **"Strong scientific evidence"** |
| **Citations** | Fischer et al. 2023 *Nutr Rev* 81(8):904–920 PMID 36728680 (systematic review + meta-analysis); Puga et al. 2022 PMC8839493 (RCT: ≥2× higher bioavailability vs fumarate); Tolkien et al. 2015 *PLoS One* (meta-analysis: ferrous sulfate OR 2.32–3.33 vs bisglycinate for GI side effects). |
| **Regulatory** | CLEAR — ferrous bisglycinate chelate permitted FSSAI nutraceutical; widely available in India. |
| **Contraindications** | Hemochromatosis or hemosiderosis (absolute); anemia not confirmed as iron-deficiency (iron supplementation in B12-deficiency anemia or thalassemia can mask or worsen the underlying cause — confirm type before recommending); active GI inflammation or ulceration. |
| **Pregnancy/BF** | Safe — iron supplementation is standard antenatal care; physician dosing required. |

---

#### 3.3.4 — Folate deficiency / methylation support

**Biomarker triggers:** Serum folate < 4 ng/mL; RBC folate < 280 ng/mL; Homocysteine > 10 μmol/L especially with normal B12 (suggesting folate-pathway contribution); MTHFR TT variant documented (triggers preference for 5-MTHF).

**Tier 1 — 5-Methyltetrahydrofolate (5-MTHF / methylfolate)**

| Field | Detail |
|---|---|
| **Standard form** | Folic acid 400–800 mcg/day (acceptable for populations without known B12 deficiency risk) |
| **Premium form** | 5-MTHF (L-methylfolate; Metafolin brand or generic equivalent) 400–800 mcg/day — preferred for: (a) documented or suspected B12 deficiency (does not mask B12 deficiency unlike high-dose folic acid), (b) MTHFR TT homozygotes, (c) vegetarians/vegans at B12 risk |
| **Dose range** | 400–800 mcg/day. Always pair with methylcobalamin when B12 deficiency risk exists — pairing is non-negotiable for the Hcy-lowering and masking-prevention rationale. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Homocysteine Lowering RCT *Nutrients* 2013 PMC3708334; ScienceDirect *AJCN* 2004 (3 independent RCTs showing comparable Hcy lowering for folic acid vs 5-MTHF at matched doses); CRN Review Oct 2025. |
| **Regulatory** | CLEAR — both folic acid and 5-MTHF permitted FSSAI nutraceuticals. |
| **Contraindications** | High-dose folic acid (> 1 mg/day) without ruling out B12 deficiency: can mask pernicious anemia neurological progression — use 5-MTHF in at-risk populations to avoid this. |
| **Pregnancy/BF** | Safe and recommended — folate is essential peri-conception and in pregnancy; 5-MTHF is the preferred form in pregnancy for the B12-masking-risk reason. |

**Evidence qualification:** Clinical superiority of 5-MTHF over folic acid for Hcy lowering does not hold in head-to-head RCTs — both achieve equivalent Hcy reduction at matched doses. The two advantages of 5-MTHF that survive evidence review are: (1) no B12-masking risk; (2) superior plasma folate elevation in MTHFR TT homozygotes in some studies. Do not claim clinical Hcy-lowering superiority in user-facing copy.

---

#### 3.3.5 — Magnesium deficiency / muscle cramps / sleep / cognitive support

**Biomarker triggers:** Serum magnesium < 0.85 mmol/L; documented muscle cramps; sleep quality score flagged; user-reported anxiety or stress pattern; cognitive concern without deficiency explanation.

This indication has two sub-contexts requiring different formulations. Do not combine both at full doses simultaneously — total daily elemental magnesium from both sources must not exceed 600 mg/day.

**Tier 1 — Magnesium glycinate (bisglycinate) — for sleep, muscle relaxation, general repletion, anxiety adjunct**

| Field | Detail |
|---|---|
| **Standard form** | Magnesium glycinate/bisglycinate — preferred form for sleep and GI tolerability |
| **Premium form** | Not required — glycinate IS the preferred form |
| **Dose range** | 200–400 mg **elemental** magnesium/day at bedtime. ⚠️ "400 mg" always refers to elemental magnesium — specify elemental content, not compound weight, in all recommendations. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Rawji et al. 2024 *Cureus* 16(4):e59317 PMC11136869 (systematic review 15 studies); Schuster et al. 2025 *NSS* PMC12412596 (double-blind RCT n=155 bisglycinate 250 mg elemental: ISI reduction p=0.049, Cohen's d=0.2). |
| **Regulatory** | CLEAR — magnesium as glycinate/bisglycinate permitted FSSAI nutraceutical. |
| **Contraindications** | Severe renal impairment (GFR < 30 mL/min) — magnesium accumulates and can cause hypermagnesemia; concurrent medications that interact with magnesium (some antibiotics, bisphosphonates — separate by 2 hours). |
| **Pregnancy/BF** | Safe at standard dietary supplement doses; physician guidance for doses > 350 mg elemental/day. |

**Evidence qualification:** Effect is most pronounced in magnesium-deficient individuals — highly relevant to India where dietary magnesium deficiency is widespread. Effect size is modest in magnesium-replete individuals (Cohen's d = 0.2). Do not claim "dramatic improvement within 2–4 weeks" as the performance domains v1.0 stated. Correct framing: "Supports sleep quality in magnesium-deficient individuals; effect is modest in those who are already replete."

**Tier 2 — Magnesium L-threonate (Magtein) — for cognitive sub-indication specifically**

| Field | Detail |
|---|---|
| **Standard form** | Magtein (patented magnesium L-threonate) — no unbranded equivalent has RCT data |
| **Premium form** | Not applicable — Magtein is the only clinically validated L-threonate brand |
| **Dose range** | 1.5–2 g Magtein compound/day divided (morning + evening), providing approximately 270–360 mg elemental magnesium as L-threonate. ⚠️ Correction from performance domains v1.0: "800 mg/day" was stated — this refers to the compound but RCTs use 1.5–2 g compound based on body weight. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Liu et al. 2016 *J Alzheimers Dis* 49:971–990 (cognitive improvement, n=44, 12 weeks); Hausenblas et al. 2024 *Sleep Med X* 8:100121 PMC11381753 (sleep quality and daytime function); Lopresti et al. 2025 *Front Nutr* PMC12832366 (cognitive performance, n=100). |
| **Regulatory** | CLEAR — L-threonate form of magnesium permitted as nutraceutical in India. |
| **Contraindications** | Same as magnesium glycinate. |
| **Pregnancy/BF** | Insufficient safety data for L-threonate form specifically — default to magnesium glycinate during pregnancy. |

**Industry caveat (disclose in user-facing copy):** All three qualifying RCTs used Magtein — a patented ingredient by Magceutics. No independent non-branded MgL-T RCTs exist yet. Evidence is real but independence caveat applies. Zenoho discloses this on the recommendation card.

**Do not use Magtein as the primary deficiency correction vehicle.** Magtein provides < 360 mg elemental magnesium at recommended dose — insufficient for frank deficiency. Use glycinate for deficiency correction; L-threonate for the cognitive indication only, or in combination with glycinate when both repletion and cognitive support are needed (total elemental magnesium cap applies).

---

#### 3.3.6 — Cortisol dysregulation / chronic stress / anxiety / sleep difficulty

**Biomarker triggers:** Elevated morning cortisol; low DHEA-S (adrenal reserve proxy); user-reported chronic stress; sleep difficulty pattern; anxiety score flagged in wellness assessment.

**Tier 2 — Ashwagandha root extract (KSM-66)**

| Field | Detail |
|---|---|
| **Standard form** | KSM-66 ashwagandha root extract (5% withanolides, root-only) 300–600 mg/day with food |
| **Premium form** | Not required — KSM-66 at 600 mg/day is the RCT-validated dose; the brand IS the standard |
| **Dose range** | 300 mg twice daily OR 600 mg once daily (evening preferred for sleep and cortisol indication). Minimum trial duration: 8 weeks; full benefit assessment at 12 weeks. |
| **Evidence** | `evidenceLevel: A` — **"Strong scientific evidence"** |
| **Citations** | Bachour et al. 2025 systematic review + meta-analysis *BJO* PMC12242034 (15 RCTs, n=873 — cortisol and anxiety reduction confirmed); PMC7230697 VO2max meta-analysis; Wankhede et al. and Ambiye et al. RCTs (testosterone in deficient men). |
| **Regulatory** | ⚠️ **INDIA — BRAND-SPECIFIC MANDATORY NOTE (as of April 15–16, 2026):** FSSAI F.No. RCD-15001/11/2021 + AYUSH T-13020/4/2022-DCC-Part(2): **Ashwagandha leaf extracts are prohibited** in all food supplements and Ayush products in India. Root and root extracts only. **KSM-66 (Ixoreal Biomed) = ROOT-ONLY → COMPLIANT ✓. Shagandha (Sabinsa) = ROOT-ONLY → COMPLIANT ✓. Witholytin (Verdure Sciences) = ROOT-ONLY → COMPLIANT ✓. Sensoril (Kerry) = ROOT+LEAF → NON-COMPLIANT ✗. Shoden (Arjuna Natural) = ROOT+LEAF → NON-COMPLIANT ✗.** Zenoho MUST specify KSM-66 or equivalent root-only extract. Never generalize to "ashwagandha extract." |
| **Contraindications** | Thyroid hormone medications (ashwagandha may alter thyroid hormone levels — monitor TSH; cross-reference to Indication 3.3.13); autoimmune disease requiring immunosuppression (immunostimulant properties — physician oversight); active hyperthyroidism (may worsen); concurrent sedative medications (additive CNS effects). |
| **Pregnancy/BF** | **AVOID.** Classical texts document potential abortifacient effects at high doses. Avoid in first trimester. Any use in second/third trimester requires explicit obstetrician approval. |

**Tier 3 — Jatamansi (Nardostachys jatamansi) — for sleep and anxiety sub-indication**

*(Surface only on explicit Ayurvedic preference — user-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Jatamansi rhizome powder 0.5–1 g/day with warm milk or honey; OR standardized extract 250–500 mg/day from AYUSH-licensed manufacturer with current heavy-metal COA and cultivated-source documentation |
| **Classical text** | Charaka Samhita — Nidrajanana (sleep-inducing category); Sushruta Samhita — neuropsychiatric use including anxiety and insomnia |
| **Modern evidence** | Grade C — PMC4687238 (Tagara vs Jatamansi insomnia comparison: significant improvement in sleep onset, quality, and daytime function); Velpandian et al. 2012 observational n=50 (significant BP reduction); PMID 29934858 (GABA-benzodiazepine receptor complex mechanism confirmed preclinically); Pathak & Godela 2024 *Fitoterapia* PMID 38042505 |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Regulatory** | ⚠️ **CITES APPENDIX II FLAG — STATUTORY COMPLIANCE REQUIRED:** *Nardostachys jatamansi* is CITES Appendix II listed (Indian Wildlife Protection Act Schedule VI). Wild harvesting is restricted. Zenoho MUST source only from documented cultivated supply with Forest Department clearance and CITES trade documentation where applicable. Do not recommend from any supplier unable to provide cultivation documentation. |
| **Contraindications** | Pregnancy; breastfeeding; concurrent CNS depressants or benzodiazepines (GABA mechanism overlap — additive CNS depression risk); MAO inhibitors (theoretical interaction). |
| **Pregnancy/BF** | **AVOID** — insufficient safety data; GABA-agonist mechanism warrants caution. |

**Tier 3 — Mandukaparni (Centella asiatica / Gotu Kola) — for anxiety and alertness sub-indication**

*(Surface only on explicit Ayurvedic preference — user-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Centella asiatica standardized extract ≥4% asiaticoside 500 mg twice daily; OR fresh svarasa (juice) 10–20 mL/day from AYUSH-licensed preparation |
| **Classical text** | One of the four canonical Medhya Rasayanas in Charaka Samhita; classical mood-calming and wound-healing herb |
| **Modern evidence** | Grade B for anxiety/mood/alertness: Puttarak et al. 2017 *Sci Rep* PMC5587720 (significant alertness improvement SMD +0.71 p=0.03; anger reduction SMD −0.81 p=0.03); Bradwejn et al. 2000 *J Psychiatry Neurosci* 25(1):13 (anxiolytic effect confirmed). **Grade C for cognitive enhancement — cognitive claim does NOT survive meta-analysis (Puttarak 2017).** |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV; native/naturalised Indian plant. |
| **Contraindications** | Liver disease (rare hepatotoxicity at high doses); anticoagulant medications (high-dose extract may have antiplatelet effect); pregnancy (insufficient safety data for supplemental doses). |
| **Pregnancy/BF** | Avoid supplemental-dose extracts; food-level Centella is safe. |

⚠️ **User-facing copy restriction:** Do NOT claim cognitive enhancement for Mandukaparni in any surface area. The meta-analysis finding of no significant cognitive benefit is definitive. Permitted framing only: "traditionally used for stress, mood, alertness, and anger management."

---

#### 3.3.7 — Inflammation / elevated hs-CRP

**Biomarker triggers:** hs-CRP > 1.0 mg/L (IFM low-risk upper limit); hs-CRP > 3.0 mg/L (high cardiovascular risk threshold); elevated ESR; systemic inflammatory marker cluster.

**Tier 1 — Omega-3 EPA+DHA (fish oil)**

| Field | Detail |
|---|---|
| **Standard form** | Fish oil supplying ≥ 1 g EPA+DHA combined per capsule; 2–4 g EPA+DHA/day total. Take with meals (fat-soluble; reduces fish-reflux). |
| **Premium form** | High-EPA formulations (EPA:DHA ≥ 2:1) for inflammatory/mood indication; prescription-class pure EPA (icosapentaenoic acid) for triglyceride + cardiovascular indication under physician supervision |
| **Dose range** | 2–4 g EPA+DHA/day for hs-CRP elevation; 4 g/day for hypertriglyceridemia (physician-supervised). |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** (CRP). Grade A for triglyceride reduction. |
| **Citations** | ScienceDirect umbrella meta-analysis 2022 (148 trials, standardised ES −0.40 for CRP); PMC8199776 (8-week oily fish RCT: −12.5% to −18.2% hs-CRP); PMC8413259. |
| **Regulatory** | CLEAR — fish oil EPA+DHA widely available as permitted FSSAI nutraceutical. |
| **Contraindications** | Anticoagulant or antiplatelet medications (additive bleeding risk at > 3 g/day — physician oversight required); fish/shellfish allergy (consider algae-based omega-3 as alternative); surgery within 1–2 weeks (pause pre-operatively). |
| **Pregnancy/BF** | Safe and recommended — DHA critical for fetal neurological development; physician dosing for amounts above standard supplementation. |

⚠️ **Corrected claims (V39):** CRP reduction is **10–25%** in elevated-baseline individuals at 8–12 weeks — not 30–40% as previously stated in performance domains v1.0. The 30–40% figure applied only to very high-baseline inflammatory disease populations. Triglyceride reduction (30–50% in hypertriglyceridemic individuals) is the most robust cardiovascular effect. Do not state 30–40% CRP reduction in any user-facing surface.

**Tier 2 — Curcumin (high-bioavailability formulations)**

| Field | Detail |
|---|---|
| **Standard form** | Meriva (curcumin-phosphatidylcholine phytosome) 200 mg curcuminoids as Meriva twice daily; OR BCM-95 (curcumin + essential oil complex) 500 mg/day |
| **Premium form** | Theracurmin (water-dispersible colloidal curcumin) — highest plasma AUC: approximately 16× higher than BCM-95 and approximately 5.6× higher than Meriva in head-to-head comparison. Meriva has the largest body of clinical trial data despite lower AUC. |
| **Dose range** | Meriva 400 mg/day (as curcuminoids in phytosome); BCM-95 500–1000 mg/day; Theracurmin 180–360 mg/day |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | PMID 39289667 (2024 ICU RCT, n=52, phytosomal curcumin: significant CRP reduction); PMC10061533 (bioavailability review); PMC4074833 (Meriva DOMS RCT); Superpower.com comparison Mar 2026 (Theracurmin vs Meriva head-to-head AUC data). |
| **Regulatory** | ⚠️ **FSSAI NSF STATUS — CONFIRM BEFORE LISTING:** Turmeric/curcumin extract → CLEAR (FSSAI Schedule IV). Phytosome delivery system (phosphatidylcholine complex as novel formulation) → **FLAG: potential NSF novel ingredient requirement under FSS Nutraceuticals Regulations 2022.** Do not specify phytosome formulation in consumer-facing copy until NSF status confirmed from specific manufacturer. **Phase 1 workaround:** "High-bioavailability curcumin supplement" — omit delivery system name. |
| **Contraindications** | Anticoagulant/antiplatelet medications (curcumin has anticoagulant properties — additive bleeding risk; physician oversight required); gallstone disease or bile duct obstruction (stimulates bile contraction — contraindicated with obstruction); surgery within 2 weeks (pause pre-operatively); concurrent CYP3A4-sensitive medications (curcumin is a moderate CYP3A4 inhibitor). |
| **Pregnancy/BF** | Avoid high-dose extracts in pregnancy — stimulates uterine contraction at pharmacological doses. Dietary turmeric in food is safe. |

**Tier 3 — Haridra (Curcuma longa) — PROVISIONAL TIER 3 ENTRY**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

> ⚠️ **PROVISIONAL STATUS:** This entry is provisional, pending formal A3B-level evidence review (equivalent to Pass 3B format) specifically for the Tier 3 Ayurvedic framing. It is included because Pass 3B dual-entry documentation designated Haridra (Curcuma longa) as the Tier 3 Ayurvedic counterpart of the Tier 2 curcumin indication. The classical text reference and regulatory status are well-established; the provisional flag relates only to the formal A3B verification process not yet completed. **This entry must be upgraded (CONFIRMED or REMOVED) in the next framework version after a formal A3B review.** Until then it may be surfaced with explicit "provisional" flagging in any internal documentation.

| Field | Detail |
|---|---|
| **Standard form** | Haridra churna (turmeric rhizome powder) 1–3 g/day with warm water, milk, or ghee; OR AYUSH-pharmacopoeia standardized Haridra extract from authenticated Curcuma longa source, from AYUSH-licensed manufacturer |
| **Classical text** | Charaka Samhita (Sutrasthana — Haridra in Dashemani Kasahara anti-inflammatory group); Sushruta Samhita (wound healing, inflammation, liver conditions); among the most extensively documented plants in all classical Ayurvedic texts |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Regulatory** | CLEAR — Curcuma longa is AYUSH pharmacopoeia + FSSAI Schedule IV; native Indian plant. No regulatory barrier for whole-herb turmeric preparations. |
| **Contraindications** | Same anticoagulant and bile-duct cautions as Tier 2; less acute at food-level doses; escalate caution at therapeutic extract doses. |
| **Pregnancy/BF** | Dietary turmeric safe; therapeutic extract doses: avoid — same caution as Tier 2 curcumin. |

⚠️ **Bioavailability transparency — mandatory:** Traditional Haridra churna has markedly lower systemic curcuminoid bioavailability than Tier 2 phytosome formulations (~1% for standard curcumin vs 16–29× higher for phytosome/Theracurmin). When surfacing Tier 3 Haridra for users with Ayurvedic preference, the recommendation card must note: "The traditional turmeric preparation delivers curcumin at significantly lower blood levels than modern bioavailability-enhanced formulations. If your goal is anti-inflammatory effect at therapeutic levels, discuss this with your physician."

Do NOT surface both Tier 2 curcumin phytosome and Tier 3 Haridra to the same user in the same protocol session.

---

#### 3.3.8 — Cognitive support / memory / focus

**Biomarker triggers:** User-reported memory concerns; cognitive domain score flagged in performance domains; elevated homocysteine (cross-link: address B12/folate first via Indication 3.3.1/3.3.4 — Hcy-driven cognitive risk has a Tier 1 correction pathway that takes priority over botanical approaches).

**Tier 2 — Bacopa monnieri (standardized extract)**

| Field | Detail |
|---|---|
| **Standard form** | Bacopa monnieri standardized extract, 45–55% bacosides, 300 mg/day with food. CDRI-08 or BacoMind are the most clinically studied branded extracts. |
| **Premium form** | Not required beyond standardization specification |
| **Dose range** | 300 mg/day standardized extract, taken with food to prevent GI side effects (nausea, cramping on empty stomach). **Onset is delayed: assess efficacy no earlier than 12 weeks.** Do not discontinue before 12 weeks for inadequate effect. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Stough et al. 2001 *Psychopharmacology* 156:481 (significant memory consolidation improvement); Roodenrys et al. 2002 *Neuropsychopharmacology* 27:279 (word recall improvement); Kongkeaw et al. 2014 meta-analysis *J Ethnopharmacol* 151(1):528 (confirms cognitive effect across studies). |
| **Regulatory** | CLEAR — Bacopa monnieri is FSSAI Schedule IV permitted botanical; also AYUSH-recognised (Brahmi). |
| **Contraindications** | Bradycardia (cholinergic effect may further slow heart rate — avoid in users with documented bradycardia or on rate-lowering cardiac medications); concurrent anticholinergic medications (antagonistic — check drug interaction); thyroid medications (monitor — cholinesterase inhibition may interact). |
| **Pregnancy/BF** | Insufficient safety data at supplemental doses — avoid. |

Cross-reference: See A3B-5 Brahmi in Tier 3 below for the Ayurvedic framing of this same plant. Do NOT surface both Tier 2 (V41) and Tier 3 (A3B-5) Brahmi/Bacopa to the same user in the same session.

**Tier 3 — Brahmi (Bacopa monnieri — Ayurvedic framing, A3B-5)**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Brahmi churna (powder) 500 mg twice daily from AYUSH-licensed manufacturer with per-batch NABL heavy-metal COA; OR AYUSH-pharmacopoeia standardized extract (CDRI-08 or 50% bacosides) |
| **Classical text** | Charaka Samhita — one of the four canonical Medhya Rasayanas (brain tonics); Chikitsa Sthana 1/30–35 documents cognitive and neurological applications in detail |
| **Modern evidence** | Same RCT evidence base as Tier 2 (Stough 2001; Roodenrys 2002; Kongkeaw 2014 meta-analysis) |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** (Tier 3 framing) |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV; native Indian plant. |
| **Contraindications** | Same as Tier 2 Bacopa entry above. Heavy metal testing critical — Brahmi products are occasionally contaminated; AYUSH-licensed sourcing with per-batch NABL COA is non-negotiable. |
| **Pregnancy/BF** | Avoid — same as Tier 2. |

⚠️ No acceptable "non-standardized Brahmi powder" entry exists. Efficacy depends on bacoside content. Standardization specification is mandatory even for Tier 3 Ayurvedic-framed entry.

**Tier 3 — Shankhpushpi (Convolvulus pluricaulis) — TRADITIONAL**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Convolvulus pluricaulis whole herb powder 1–3 g/day; OR standardized extract 250–500 mg/day from AYUSH-licensed manufacturer with authenticated C. pluricaulis botanical identity |
| **Classical text** | Charaka Samhita Sutrasthana 4/18; Ashtanga Hridayam; Bhavaprakasha — core Medhya Rasayana for memory, intelligence, and anxiety |
| **Modern evidence** | Grade C — predominantly preclinical: GABA-A agonism, cholinesterase inhibition, antioxidant activity, LTP modulation confirmed in animal models; network pharmacology PMC9550454 (2022) identifies Alzheimer's/Parkinson's relevant targets; no placebo-controlled RCT of sufficient quality for Grade B. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Regulatory** | CLEAR with authentication requirement — AYUSH pharmacopoeia specifies C. pluricaulis; FSSAI Schedule IV. |
| **Contraindications** | ⚠️ **THYROID MEDICATION HARD EXCLUSION:** Shankhpushpi may reduce absorption of thyroxine/levothyroxine. This interaction is documented in classical texts and modern sources. Do NOT recommend Shankhpushpi to any user on thyroid hormone replacement therapy. This is a hard exclusion rule for the analysis engine — not a soft advisory. Also: concurrent CNS medications (additive sedation possible). |
| **Pregnancy/BF** | Avoid — insufficient modern safety data. |

⚠️ **IDENTITY/ADULTERATION FLAG — CRITICAL:** "Shankhpushpi" is commercially applied to four distinct botanical species (C. pluricaulis, Canscora decussata, Clitoria ternatea, Evolvulus alsinoides). Zenoho consumer-facing copy must specify "Convolvulus pluricaulis (Shankhpushpi)." HPTLC fingerprinting or DNA barcoding is mandatory per batch from the AYUSH-licensed manufacturer. Do not recommend any Shankhpushpi product where botanical authentication cannot be confirmed.

---

#### 3.3.9 — Liver health / elevated ALT / GGT / NAFLD

**Biomarker triggers:** ALT > 35 U/L (IFM upper functional limit); GGT > 30 U/L; AST elevation; NAFLD suspected from metabolic marker cluster (elevated TG + ALT + user-reported BMI pattern); ALP elevation (secondary; consider bone-remodelling differential).

**Tier 2 — Silymarin (milk thistle standardized extract)**

| Field | Detail |
|---|---|
| **Standard form** | Silymarin standardized extract 70–80% silybin content, 140–175 mg three times daily (total 420–525 mg/day) |
| **Premium form** | Silybin-phospholipid complex (Siliphos or equivalent Silymarin Phytosome) — superior bioavailability to standard silymarin; appropriate when serum enzyme elevation is significant |
| **Dose range** | 140–175 mg silymarin TID (most studied); 200–600 mg/day total depending on formulation and clinical severity |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Zhong et al. 2017 NAFLD meta-analysis (significant ALT reduction MD −15.3 U/L); Saller et al. 2001 *Drugs* 61(14):2035 (systematic review of silymarin in liver disease). |
| **Regulatory** | ⚠️ **FSSAI NSF STATUS — CONFIRM BEFORE LISTING:** Milk thistle (*Silybum marianum*) is NOT native to India and is NOT on FSSAI Schedule IV as a standard permitted botanical. Indian market products likely require NSF novel ingredient approval pathway. Do NOT recommend as a Zenoho-listed supplement without confirming NSF approval status from the specific manufacturer. **Phase 1 workaround:** "Discuss liver support supplement options with your physician — your physician can advise on silymarin or milk thistle availability and suitability for your situation." |
| **Contraindications** | Ragweed/daisy family allergy (Asteraceae cross-reactivity — rare); estrogen-sensitive conditions (silymarin may have mild estrogenic activity); CYP3A4 and CYP2C9 substrate medications (silymarin is a moderate inhibitor — check drug interactions carefully). |
| **Pregnancy/BF** | Insufficient safety data — avoid. |

**Tier 2 — Bhumi Amla (Phyllanthus niruri)**

| Field | Detail |
|---|---|
| **Standard form** | Phyllanthus niruri standardized extract 500 mg twice daily; OR churna 3 g twice daily with water. Standardisation to phyllanthin and hypophyllanthin content preferred for consistency. |
| **Premium form** | Not required |
| **Dose range** | 500 mg standardized extract twice daily (1 g/day total); or 6 g/day churna in divided doses |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Heliyon 2023 NAFLD double-blind placebo-controlled RCT DOI 10.1016/j.heliyon.2023.e16652 (significant fibrosis score and metabolic marker improvement); Thyagarajan et al. Hepatitis B series (*Lancet* and *J Infect Dis* — HBsAg clearance in some patients; Cochrane 2011 review confirms modest antiviral effect); kidney stone RCTs (consistent reduction in urinary calcium oxalate); Alam et al. 2025 *JDDT* 15(5):123. |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV; native Indian plant (grows widely as common weed). |
| **Contraindications** | Diabetes medications (potential additive blood glucose lowering — monitor); diuretic medications (additive effect); anticoagulants (theoretical interaction — monitor). |
| **Pregnancy/BF** | Avoid — insufficient modern safety data at supplemental doses. |

**Tier 3 — Guduchi (Tinospora cordifolia) — secondary hepatoprotective application**

*(Cross-reference: Primary entry in Indication 3.3.21 for immune support. Surface here only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

⚠️ **CRITICAL LIVER-SPECIFIC CONTRAINDICATION:** Guduchi's hepatotoxicity risk (Nagral et al. 2021 *J Clin Exp Hepatol* 11(6):722) is **directly relevant to this indication.** Guduchi is **absolutely contraindicated** for the liver indication in any user with pre-existing liver disease, autoimmune hepatitis, elevated LFTs of unknown cause, or concurrent hepatotoxic medications. Guduchi may be surfaced for the liver indication **only** in users with: (a) confirmed T. cordifolia authentication; (b) normal baseline LFTs being monitored (not treated); (c) explicit physician awareness; (d) duration ≤ 8 weeks with repeat LFT check. If any doubt exists: do not surface.

| Field | Detail |
|---|---|
| **Standard form** | T. cordifolia stem extract 300–500 mg/day; HPTLC or DNA barcoding confirmation of T. cordifolia (not T. crispa) mandatory from AYUSH-licensed manufacturer |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV. Botanical authentication is Zenoho non-negotiable, not a regulatory requirement. |
| **User-facing mandatory text** | "Stop taking immediately and consult a physician if you notice yellowing of skin or eyes, dark urine, or abdominal pain." |

---

#### 3.3.10 — Glucose / insulin resistance / pre-diabetes

**Biomarker triggers:** FBG 100–125 mg/dL (pre-diabetes range); HbA1c 5.7–6.4%; HOMA-IR > 2.5 (insulin resistance); fasting insulin elevated above 10 μIU/mL; metabolic syndrome marker cluster.

⚠️ **Scope note:** This indication covers pre-diabetes and insulin resistance only. Diagnosed Type 2 diabetes (HbA1c ≥ 6.5%; FBG ≥ 126 mg/dL) is a physician-managed condition; supplements may appear as adjuncts in physician-supervised protocols but are not Zenoho-driven standalone recommendations for diagnosed diabetics.

**Tier 2 — Berberine (from Berberis aristata root extract)**

| Field | Detail |
|---|---|
| **Standard form** | Berberis aristata root extract standardised to berberine content — preferred for FSSAI regulatory compliance. Titrate from lower dose to reduce GI side effects. |
| **Premium form** | Dihydroberberine (DHB) — more bioavailable berberine metabolite with emerging evidence; fewer qualifying RCTs than berberine HCl; note as "emerging" if surfaced. |
| **Dose range** | Equivalent to 500 mg berberine HCl two to three times daily with meals (1,000–1,500 mg/day total berberine equivalent). Titrate upward over 2–4 weeks starting from 500 mg/day to reduce GI side effects. |
| **Evidence** | `evidenceLevel: A` — **"Strong scientific evidence"** |
| **Citations** | Yin et al. 2008 *Metabolism* 57(5):712–717 PMID 18442638 (original metformin-comparison RCT — **this is the correct citation; performance domains v1.0 cited "Zhang 2009" in error**); *Clin Therapeutics* 2024 PMID 38016844 umbrella meta-analysis (significant FBG, HbA1c −0.57%, HOMA-IR −1.04 reduction); *J Nutr* 2023 (20 studies n=1,761: HOMA-IR −0.85; HbA1c −4.48 mmol/mol; FG −0.52 mmol/L); *Front Pharmacol* 2024 PMC11617981 (50 studies n=4,150: confirms FPG, HbA1c, LDL, TG reduction). |
| **Regulatory** | ⚠️ **FSSAI NSF STATUS — CONFIRM BEFORE LISTING:** Berberine as isolated alkaloid (standard supplement form: berberine HCl) may require NSF novel ingredient approval. **Berberis aristata root extract with standardized berberine content is the safer regulatory pathway** — Berberis aristata is covered under FSSAI Schedule IV as a botanical. Flag for legal check before sourcing isolated berberine HCl. **Phase 1 workaround:** Consumer-facing copy to read "berberine from Berberis aristata (Indian barberry) root extract" — do not specify isolated berberine HCl. |
| **Contraindications** | ⚠️ **HIGH-PRIORITY DRUG INTERACTIONS:** (1) Additive hypoglycemia with anti-diabetic medications (metformin, sulfonylureas, insulin) — physician oversight mandatory for any user on diabetes medications; (2) Warfarin — CYP2C9 inhibition increases INR significantly; (3) CYP3A4-metabolised medications — check interactions; (4) Do not co-prescribe with metformin without physician monitoring (additive GI side effects plus glucose-lowering). |
| **Pregnancy/BF** | **AVOID** — berberine crosses the placenta; potential neonatal effects documented in animal studies. Absolutely contraindicated in pregnancy and breastfeeding. |

---

#### 3.3.11 — Joint pain / osteoarthritis

**Biomarker triggers:** User-reported joint pain (moderate-to-severe functional limitation); inflammatory markers (hs-CRP, ESR) elevated with articular pain pattern; OA diagnosis documented by user or physician.

**Tier 2 — Glucosamine sulfate + Chondroitin sulfate**

| Field | Detail |
|---|---|
| **Standard form** | Glucosamine **sulfate** 1,500 mg/day + Chondroitin **sulfate** 800–1,200 mg/day. Form specificity is critical — glucosamine HCl has weaker evidence than glucosamine sulfate. |
| **Premium form** | Not required beyond form specification |
| **Dose range** | Glucosamine sulfate 1,500 mg/day + chondroitin sulfate 1,200 mg/day; once daily or divided. Onset slow: 8–12 weeks minimum. Assess at 3 months before concluding lack of effect. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Clegg et al. 2006 *NEJM* 354(8):795 GAIT trial (n=1,583); Wandel et al. 2010 Cochrane *BMJ* 341:c4675. |
| **Regulatory** | CLEAR — both permitted FSSAI nutraceuticals; available from multiple Indian manufacturers. |
| **Contraindications** | Shellfish allergy (glucosamine typically shellfish-derived — request corn-derived alternative for allergic users); warfarin (chondroitin has anticoagulant properties — monitor INR); diabetes (glucosamine may affect insulin sensitivity — monitor blood glucose). |
| **Pregnancy/BF** | Avoid — insufficient safety data. |

⚠️ **Critical evidence qualification:** Combination shows significant benefit **only in moderate-to-severe OA** (GAIT: 79.2% vs 54.3% response rate, p=0.002). For mild OA — most potential users — the combination was NOT significantly better than placebo. Zenoho must not recommend this combination for users with mild joint discomfort only. Reserve for confirmed moderate-to-severe OA or users describing significant functional limitation (difficulty climbing stairs, reduced range of motion, night pain).

**Tier 2 — Curcumin (high-bioavailability formulations) — joint secondary indication**

*(Cross-reference to Indication 3.3.7 Tier 2 for full entry. Same supplement, same FSSAI NSF flag.)*
- Application here: inflammatory joint pain; OA with elevated hs-CRP; joint protection adjunct alongside glucosamine/chondroitin.
- Meriva phytosome has specific OA trial data (PMC4074833 Meriva DOMS RCT; OA-specific Meriva trials).
- Same FSSAI NSF flag applies. Phase 1 consumer-facing copy: "high-bioavailability curcumin" — do not specify phytosome.

**Tier 3 — Shallaki (Boswellia serrata) — A3B-6**

*(Surface only on explicit Ayurvedic preference)*

| Field | Detail |
|---|---|
| **Standard form** | Boswellia serrata standardized extract ≥ 30% boswellic acids (including AKBA), 250–400 mg three times daily (750–1,200 mg/day total) |
| **Premium form** | Aflapin or 5-Loxin — branded extracts with the strongest individual trial data; superior to generic Boswellia powder in head-to-head studies |
| **Dose range** | 250–400 mg TID with food; onset faster than glucosamine/chondroitin (2–4 weeks) |
| **Classical text** | Charaka Samhita and Sushruta Samhita — Shallaki for Amavata (rheumatoid-type arthritis) and Sandhivata (degenerative joint disease); among the most consistently used anti-inflammatory plants in classical Indian medicine |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** *(Grade A by meta-analytic standard — user-facing label elevated accordingly: this is the best-evidenced item in the entire Pass 3B queue)* |
| **Citations** | PMC7368679 meta-analysis (7 RCTs n=545: VAS pain WMD −8.33 p<0.00001; WOMAC pain WMD −14.22 p=0.0006; WOMAC stiffness WMD −10.04 p=0.001); PMC11880083 (2025 CTRI-registered multicenter Indian RCT); *Nutrients* 2023 15(17):3848; ScienceDirect 2024 Aflapin systematic review; *Front Pharmacol* 2025 spondylitis RCT. |
| **Regulatory** | CLEAR — Boswellia serrata is native to India (Madhya Pradesh, Rajasthan, Gujarat); AYUSH pharmacopoeia; FSSAI Schedule IV; domestically sourced. |
| **Contraindications** | Anticoagulant medications (theoretical interaction via leukotriene pathway — monitor); pregnancy (insufficient safety data). |
| **Pregnancy/BF** | Avoid — insufficient safety data for supplemental doses. |

**Mechanism note (surfaceable to users):** Boswellic acids (AKBA specifically) inhibit 5-lipoxygenase (5-LOX) — the leukotriene inflammatory pathway. This is mechanistically distinct from NSAIDs (COX inhibition) and paracetamol. Non-overlapping mechanism makes Shallaki safe for combination with physician-prescribed NSAIDs and suitable for long-term use. No significant GI toxicity in trials — a major clinical advantage over chronic NSAID use.

---

#### 3.3.12 — General vitality / Rasayana / longevity

**Biomarker triggers:** Biological age estimate elevated versus chronological age; CoQ10 depletion context (statin users; users over 50; documented heart failure risk); low DHEA-S; user-reported fatigue without deficiency explanation from Tier 1 markers.

**Tier 1 — CoQ10 (Ubiquinol / Ubiquinone)**

| Field | Detail |
|---|---|
| **Standard form** | Ubiquinone 200–300 mg/day for users under 50 (adequate conversion to active ubiquinol form) |
| **Premium form** | Ubiquinol (reduced active form) 100–200 mg/day — preferred for users over 50 (conversion from ubiquinone declines with age; ubiquinol has approximately 2× higher plasma AUC vs ubiquinone in adults 50+) and for statin users (statin-induced CoQ10 depletion) |
| **Dose range** | Statin myalgia: 200–600 mg ubiquinone OR 100–300 mg ubiquinol/day. Heart failure (physician-supervised, Q-SYMBIO protocol): 200–300 mg/day. General mitochondrial support: 200–300 mg ubiquinol/day. Take with fatty meal (fat-soluble). |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Banach et al. 2015 meta-analysis (12 RCTs: significant myalgia reduction with CoQ10 in statin users); Q-SYMBIO trial *JACC Heart Fail* 2014 2(6):641 (200–300 mg/day reduced cardiovascular mortality in HF patients). |
| **Regulatory** | CLEAR — CoQ10 is a permitted FSSAI nutraceutical. |
| **Contraindications** | Warfarin (CoQ10 may reduce anticoagulant effect — monitor INR); concurrent chemotherapy (theoretical interference — oncology consultation required); may lower blood pressure (additive with antihypertensives — monitor). |
| **Pregnancy/BF** | Avoid supplemental doses — insufficient safety data. |

**Clinical application hierarchy:** (1) Statin-induced myalgia — strongest evidence, most immediate clinical use. (2) Heart failure adjunct — strong evidence; physician-supervised. (3) General vitality in users over 50 — evidence is mechanistic/observational for this application; moderate claim only. Do not overclaim CoQ10 as a general energy supplement.

**Tier 3 — Shilajit (Shuddha / Purified Shilajit) — A3B-1**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Purified Shilajit capsule or tablet; NOT resin form (resin contamination risk too variable without per-lot documentation); standardised for fulvic acid (≥ 50% w/w) and dibenzo-alpha-pyrones (≥ 0.3% w/w); 250–500 mg/day from AYUSH-licensed manufacturer |
| **Classical text** | Charaka Samhita and Ashtanga Hridayam — primary Rasayana for vitality, strength, and longevity. Only Shuddha (purified) form used therapeutically; raw Shilajit explicitly contraindicated in classical texts. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Citations** | Pandit et al. 2016 *Andrologia* 48(5) PMID 26395129 (double-blind RCT n=75 males 45–55; purified Shilajit 500 mg/day × 90 days: significant total and free testosterone vs placebo); Mehra 2024 MEET Shilajeet RCT (vitality confirmed); Yadav et al. 2026 *Cureus* PMC12848467 (strength +12.94%, endurance +12.30%, VO2max +1.36%, fatigue −32.4%, CRP −25.35%); FDA 2024 public health advisory; Health Canada 2023 advisory; Kamgar et al. 2025 *BMC Chemistry* (thallium contamination study). |
| **Regulatory** | CLEAR for AYUSH-licensed manufacturers — AYUSH pharmacopoeia; FSSAI Schedule IV. |
| **Contraindications** | Pregnancy; active kidney disease; renal stones (iron accumulation risk); gout (purine content). |
| **Pregnancy/BF** | **AVOID** — classical contraindication; modern safety data insufficient. |

> ⚠️ **NON-NEGOTIABLE SAFETY REQUIREMENT — HEAVY METALS (Shilajit):** This is the single most critical safety issue in the entire Zenoho supplement library. FDA (2024), Health Canada (2023), and BMC Chemistry (2025 thallium study) advisories all document variable and potentially unsafe heavy metal contamination across commercial Shilajit products. ConsumerLab 2024 confirmed detectable lead, arsenic, mercury, and cadmium in multiple brands. The term "purified" has no standardised legal definition — no universal verification method exists.
>
> **Zenoho will only recommend Shilajit from AYUSH-licensed manufacturers who provide a current per-batch COA from an NABL-accredited laboratory demonstrating:** Lead ≤ 5 μg/day, Mercury ≤ 3 μg/day, Arsenic (total) ≤ 15 μg/day, Cadmium ≤ 10 μg/day, Thallium at or below detectable limit — all at the recommended daily dose.
>
> **Without a current batch-specific COA for the specific product lot: Zenoho does not recommend.**

**Tier 3 — Amla (Amalaki / Phyllanthus emblica) — Rasayana application**

*(Cross-reference: Primary Ayurvedic immune entry in Indication 3.3.21. Rasayana framing surfaced here.)*
- Charaka Samhita designates Amalaki as "the single most important Rasayana herb." Chikitsa Sthana 1/30–35 — foundational anti-aging Rasayana protocol.
- Standard form: Amla powder 3–6 g/day or standardised extract 500 mg/day with ≥ 40% tannin content from AYUSH-licensed manufacturer.
- Do not combine standalone Amla + Triphala — dosing overlap in Amalaki component.
- Evidence: Grade B (Setayesh et al. 2023 *Diabetes Metab Syndr* PMID 36934568; Brown et al. 2023 *BMC Complement Med Ther* 23:190).

---

#### 3.3.13 — Thyroid support (Hashimoto's adjunct, subclinical hypothyroidism)

**Biomarker triggers:** TSH above IFM functional upper range (2.5 mIU/L) but below clinical hypothyroidism threshold; TPOAb elevated (Hashimoto's confirmed by physician); FT3/FT4 within low-normal range; user confirms physician has ruled out overt hypothyroidism.

⚠️ **Critical scope boundary:** This indication covers Hashimoto's adjunct and subclinical support ONLY. Overt hypothyroidism (TSH > 10 mIU/L; symptomatic) requires physician management and likely thyroid hormone replacement. Zenoho does not recommend supplements as primary thyroid hormone replacement. Every recommendation in this indication carries: *"Please discuss with your endocrinologist or physician before starting — thyroid supplement interactions with thyroid hormone medications require clinical oversight."*

**Tier 1 — Selenium (selenomethionine)**

| Field | Detail |
|---|---|
| **Standard form** | Selenomethionine 200 mcg/day — preferred form over sodium selenite (organic form; better bioavailability; safer toxicity profile) |
| **Premium form** | Not required — selenomethionine is the established premium form |
| **Dose range** | 200 mcg/day. Do NOT exceed 400 mcg/day — selenosis (selenium toxicity) occurs above this threshold. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Huwiler et al. 2024 *Thyroid* 34(3):295 PMID 38243784 — definitive meta-analysis (35 RCTs n=869): TPOAb reduction SMD −0.96 (most robust effect); modest TSH improvement SMD −0.21 in patients not on thyroid hormone replacement; no significant FT4, T4, FT3, or T3 change. PMC10951571. |
| **Regulatory** | CLEAR — selenomethionine permitted FSSAI nutraceutical. |
| **Contraindications** | Toxicity above 400 mcg/day; users on selenium-containing multivitamins (count total daily selenium from all sources); patients with autoimmune conditions on immunosuppression (selenium's immunomodulatory effect may interact). |
| **Pregnancy/BF** | Selenium is an essential nutrient; 200 mcg/day appears safe in pregnancy; physician guidance recommended — Hashimoto's in pregnancy requires close monitoring independently of supplementation. |

⚠️ **Corrected claims (V47):** "T4→T3 conversion cofactor" is mechanistically correct (selenoproteins/deiodinases mediate conversion) but human RCTs do NOT show clinically measurable T3 increases. **Do not claim T3 improvement in any user-facing copy.** The correct, evidence-supported claim is: "Selenium significantly reduces TPO antibodies — the primary measure of autoimmune attack in Hashimoto's thyroiditis — and modestly improves TSH. It does not directly raise thyroid hormone levels."

**Zinc co-supplementation note** *(not a separate library entry — Grade C evidence):* Zinc may support T4→T3 conversion in zinc-deficient individuals — mechanistically confirmed; some RCTs in zinc-deficient hypothyroid patients show benefit. If the user is also zinc-deficient (serum zinc < 70 mcg/dL), zinc picolinate 15–25 mg/day is a reasonable adjunct with the framing: "evidence supports benefit in zinc-deficient individuals; not established for zinc-replete individuals." This is not a standalone thyroid indication entry. Zinc appears here as a deficiency-correction co-supplementation note only.

⚠️ **Shankhpushpi hard exclusion for this indication:** Shankhpushpi (A3B-8) is a hard exclusion from all thyroid-indication protocols. Shankhpushpi reduces thyroxine absorption. The analysis engine must enforce this as an absolute contraindication for any user on thyroid hormone replacement — not a soft advisory.

---

#### 3.3.14 — Lipid optimization (elevated LDL, low HDL, elevated triglycerides, elevated Lp(a))

**Biomarker triggers:** LDL-C > 100 mg/dL (IFM optimal upper); LDL-C > 130 mg/dL (borderline high); TC/HDL ratio > 3.5; triglycerides > 150 mg/dL; Lp(a) > 30 mg/dL; HDL-C < 40 mg/dL (male) or < 50 mg/dL (female).

**Lp(a) caveat (mandatory):** Lp(a) is largely genetically determined. No currently verified supplement significantly and consistently reduces Lp(a). Zenoho does not claim supplement efficacy for Lp(a) reduction. Users with elevated Lp(a) are directed to cardiovascular risk-management protocols (LDL reduction, anti-inflammatory intervention, hs-CRP reduction) and physician consultation. Do not imply omega-3 or any other supplement addresses Lp(a).

**Tier 1 — Plant sterols/stanols**

| Field | Detail |
|---|---|
| **Standard form** | Plant sterols or stanols 1.8–2 g/day with meals (ideally split across two largest meals for maximum absorption competition) |
| **Premium form** | Not required — plant sterols are the standard formulation |
| **Dose range** | 1.8–2 g/day. No additional LDL benefit above 3 g/day; doses > 3 g/day reduce fat-soluble vitamin absorption without added lipid benefit. Available as standalone capsules or phytosterol-fortified foods. |
| **Evidence** | `evidenceLevel: A` — **"Strong scientific evidence"** |
| **Citations** | Ras et al. 2014 *J Nutr* 144(4):543 (meta-analysis of 124 RCTs confirming 8–12% LDL reduction at 1.5–2.5 g/day plant sterols/stanols); EFSA Panel on Dietetic Products, Nutrition and Allergies 2012 *EFSA Journal* 10(7):2813 (approved health claim dossier: plant sterols and maintenance of normal blood cholesterol concentrations). |
| **Effect** | 8–12% LDL reduction via cholesterol absorption competition. Additive to statin therapy — can be safely combined. |
| **Regulatory** | CLEAR — permitted FSSAI nutraceutical. |
| **Contraindications** | Sitosterolemia (rare genetic condition — plant sterols accumulate dangerously; absolute contraindication; test if family history of premature atherosclerosis with unusual plant sterol levels). |
| **Pregnancy/BF** | Use with caution — plant sterols may reduce fat-soluble vitamin and carotenoid absorption; physician guidance recommended. |

**Tier 1 — Omega-3 EPA+DHA — triglyceride sub-indication**

*(Cross-reference to Indication 3.3.7 Tier 1 entry for full detail.)*
- Triglyceride-specific application: 30–50% triglyceride reduction in hypertriglyceridemic individuals at 2–4 g EPA+DHA/day — the most robust cardiovascular effect verified in Pass 3 (V39).
- Lp(a): Omega-3 does NOT significantly reduce Lp(a). Do not imply otherwise.

**Tier 2 — Bergamot polyphenol fraction (BPF)**

| Field | Detail |
|---|---|
| **Standard form** | Bergamot polyphenol fraction (BPF) standardised extract 500–1,000 mg/day with a meal; positioned as second-line for statin-intolerant patients or as adjunct for broader lipid panel impact |
| **Dose range** | 500–1,300 mg BPF/day (Italian RCT range); most consistent evidence at 500–1,000 mg/day |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Toth et al. 2016 *Front Pharmacol* PMC4702027; PMC11641072 (2024 double-blind RCT); PMC11545342 (2024 systematic review). |
| **Effect** | LDL reduction 20–27%; total cholesterol 15–23%; triglycerides 25–30%; HDL increase 6–8%; small dense LDL subfraction reduction — broader lipid profile impact than plant sterols alone. |
| **Regulatory** | ⚠️ **FSSAI NSF STATUS — CONFIRM BEFORE LISTING:** Citrus bergamia is a foreign botanical NOT on FSSAI Schedule IV standard list. Likely requires NSF novel ingredient approval. Do NOT recommend as Zenoho-listed supplement without confirmed NSF approval from specific manufacturer. **Phase 1 workaround:** "Discuss bergamot extract (BPF) as a lipid support option with your physician — confirm local product availability and regulatory status." |
| **Contraindications** | CYP3A4 substrate medications — bergamot contains furanocoumarins that may inhibit CYP3A4 similarly to grapefruit; users on CYP3A4-metabolised statins (atorvastatin, simvastatin, lovastatin) combining BPF require monitoring for myopathy risk. |
| **Pregnancy/BF** | Insufficient data — avoid. |

---

#### 3.3.15 — Weight management / metabolic syndrome

**Biomarker triggers:** Metabolic marker cluster (elevated TG + low HDL + elevated FBG/HbA1c + elevated hs-CRP pattern consistent with metabolic syndrome); user-reported BMI concern with metabolic marker abnormalities.

⚠️ **Scope restriction (Part 1.3.6 restatement):** Stimulant-class weight-loss compounds are excluded from the Zenoho library. The primary interventions for weight management are dietary, sleep-based, and behavioral (NEAT optimization). Supplements in this indication are metabolic-marker-driven adjuncts, not fat-burning agents.

⚠️ **No dedicated Tier 1 entry for weight management as a primary indication:** No Pass 3 verified Tier 1 supplement qualifies for weight management as a standalone primary indication. Orlistat is a prescription drug and outside scope.

**Tier 2 — Berberine — metabolic syndrome sub-indication**

*(Cross-reference to Indication 3.3.10 Tier 2 entry for full detail, FSSAI flag, and drug interactions.)*
- Applicable for metabolic syndrome profile with simultaneous LDL, TG, and FBG elevation — *Front Pharmacol* 2024 PMC11617981 (50 studies n=4,150) confirms all three simultaneously.
- Same Grade A evidence as indication 3.3.10; same FSSAI NSF flag; same pregnancy contraindication; same drug interaction warnings. No additional claims added for weight management specifically.

**Tier 2 — Myo-inositol — insulin resistance sub-indication**

*(Cross-reference to Indication 3.3.17 Tier 2 entry for full detail.)*
- Mechanistic rationale for insulin-resistant metabolic syndrome (non-PCOS) is strong; however, 2023 PCOS guidelines update (Brennan et al. JCEM 2024 PMC11099481) rates evidence as "limited and inconclusive" for non-PCOS populations specifically.
- Consumer-facing framing when used for non-PCOS metabolic syndrome: "Evidence is strongest in PCOS; benefit in general insulin resistance is biologically plausible but less well-established clinically."

---

#### 3.3.16 — Gut health / microbiome / IBS / SIBO

**Biomarker triggers:** User-reported IBS symptoms, constipation, bloating, or bowel irregularity; GGT/ALT pattern suggesting gut-liver axis involvement; eosinophil count elevation with GI symptom pattern.

⚠️ **Tier 1 / Tier 2 gap note:** No Pass 3 verified Western supplements have cleared the evidence threshold for primary gut health at Tier 1 or Tier 2 in the current library. Probiotics (Lactobacillus and Bifidobacterium species-specific strains) have Grade A evidence for IBS-D and certain IBS-C subtypes but are not yet formally verified in the Zenoho supplement pass system — they will be added in a future framework version after species-strain level verification. Psyllium/isabgol as prebiotic fiber is a Tier 1 dietary recommendation rather than a supplement library entry (food-behaviour category; FSSAI-clear and widely available in India).

**Tier 3 — Triphala (Amalaki + Bibhitaki + Haritaki) — A3B-2**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Triphala churna (powder) 3–6 g/day in warm water at bedtime; OR standardised extract tablets from AYUSH-licensed manufacturer standardised to ≥ 20% tannin content; strict 1:1:1 ratio of three fruits required from single-batch manufacturing |
| **Classical text** | Among the most documented formulations across Charaka Samhita, Ashtanga Hridayam, and Sushruta Samhita. Charaka Samhita Chikitsa Sthana 1/3 — Rasayana properties. Primary classical gut, elimination, and longevity formula. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Citations** | Westfall et al. 2017 *J Altern Complement Med* 23(7):607; ScienceDirect 2025 *J Tradit Complement Med* DOI 10.1016/j.jtcme.2025.xxx (significant Akkermansia muciniphila increase — validated gut-barrier biomarker); PMC5567597 (therapeutic uses review); SupplementScience systematic summary (11 studies, 470 participants). |
| **Best-evidenced applications** | Bowel frequency and stool consistency improvement in constipation (p < 0.001 in controlled studies); beneficial bacteria increase (Bifidobacterium, Lactobacillus); Akkermansia muciniphila increase (2025); IBS-C quality-of-life and symptom improvement. |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV (all three component plants); single-batch AYUSH-licensed manufacturer required. |
| **Contraindications** | Active diarrhea or loose stools (dose-dependent laxative effect — use lower dose of 1–3 g/day for users with loose bowel tendency); concurrent pH-sensitive medications (Triphala alters GI transit time — separate medications by 2 hours minimum). |
| **Pregnancy/BF** | **AVOID** — stimulant laxative effect from Haritaki component; avoid in pregnancy. |

⚠️ **Dosing overlap:** Amalaki (Amla) is one of Triphala's three fruits. Do NOT simultaneously recommend standalone Amla and Triphala to the same user without awareness of combined dosing. The analysis engine should enforce a mutual exclusivity check.

**Tier 3 — Punarnava (Boerhavia diffusa) — secondary gut and fluid balance — A3B-11 — TRADITIONAL**

*(Surface only on explicit Ayurvedic preference and only when user requests kidney/fluid-balance support specifically. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Punarnava churna 3–6 g/day; or standardised root extract 250–500 mg/day from AYUSH-licensed manufacturer |
| **Classical text** | Charaka Samhita Sutrasthana 2/19 — Shothahara (anti-oedema) herb group; "Punarnava" means "one that makes new again." Primary Rasayana for kidney, fluid regulation, and liver in classical texts. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** — Grade C; predominantly preclinical |
| **Citations** | Alam et al. 2025 *JDDT* 15(5):123 (polyherbal liver review confirming P. niruri individual hepatoprotective evidence); preclinical diuretic studies: punarnavine alkaloid dose-dependent urinary output increase confirmed in animal models; anti-inflammatory: COX-2 inhibition and TNF-alpha suppression in animal models; Charaka Samhita Sutrasthana 2/19 (classical text — Shothahara group). |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV; native Indian plant. |
| **Contraindications** | Antihypertensive medications (diuretic effect — additive); diuretic medications (additive — electrolyte monitoring required with long-term use). |
| **Clinical note** | Punarnava is most clinically useful as part of polyherbal formulations (e.g., with Shilajit + Gokshura for renal/urinary support; or with Triphala for metabolic and liver health). Standalone gut indication has limited evidence. Surface only on explicit user request for Ayurvedic kidney/fluid balance support. |

---

#### 3.3.17 — Women's hormonal balance (PCOS, menstrual irregularity, perimenopause, menopause)

**Biomarker triggers:** PCOS diagnosis with elevated LH/FSH ratio + elevated androgens + elevated fasting insulin; HOMA-IR > 2.5 in female user; menstrual irregularity pattern (marker cluster); perimenopausal/menopausal status (elevated FSH, low estradiol, or user-reported perimenopausal symptoms).

⚠️ **Scope note for perimenopause/menopause:** Phytoestrogen supplements (isoflavones, red clover), black cohosh, DHEA, and other perimenopause/menopause-specific supplements are not yet verified in the Zenoho supplement pass system. These will be added in a future framework version after formal verification. The only verified entry for this indication from Pass 3 is myo-inositol for PCOS.

**Tier 2 — Myo-inositol + D-chiro-inositol (40:1 ratio) — PCOS**

| Field | Detail |
|---|---|
| **Standard form** | Myo-inositol 2 g + D-chiro-inositol 50 mg twice daily (= 4 g MI + 100 mg DCI total daily at 40:1 ratio); always co-administered with folic acid 200 mcg at each dose |
| **Premium form** | Ratio precision is the critical distinction, not formulation upgrade |
| **Dose range** | 4 g myo-inositol + 100 mg D-chiro-inositol per day in two divided doses; folic acid 200 mcg alongside each dose (400 mcg total folic acid/day). |
| **Biological rationale** | The 40:1 MI:DCI ratio matches physiological plasma ratio in healthy women. In PCOS, insulin-stimulated epimerase overactivity inverts the ratio toward DCI — supplementing at the 40:1 ratio corrects this selectively. Mechanistic basis is strong and biologically specific. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Benelli et al. 2016 *Int J Endocrinol* PMC4963579 (RCT n=46, 6 months: significant HOMA-IR, LH/FSH, androgen improvement vs placebo); PMC5655679 2017 meta-analysis (9 RCTs n=496: fasting insulin SMD −1.02; HOMA-IR SMD −0.59); Brennan et al. 2024 *JCEM* PMC11099481 (2023 PCOS guidelines update, 30 trials n=2,230: evidence "limited and inconclusive" for several outcomes). |
| **Regulatory** | CLEAR — inositol is a vitamin-like compound permitted as FSSAI nutraceutical. |
| **Contraindications** | None established at recommended doses. Monitor blood glucose if combining with metformin or other insulin sensitizers — potential additive glucose lowering. |
| **Pregnancy/BF** | Emerging evidence suggests myo-inositol may reduce gestational diabetes risk in women with PCOS history. However, use during pregnancy requires explicit physician oversight. Do NOT recommend for pregnancy without physician guidance. |

**Evidence qualification:** The 2023 PCOS guidelines update rates evidence as "limited and inconclusive" for several outcomes including menstrual regularity restoration. Benefits are most consistent for metabolic and hormonal markers in insulin-resistant PCOS (HOMA-IR reduction; LH/FSH ratio normalisation; androgen reduction). Do not overclaim menstrual regularity outcomes in user-facing copy. Permissible framing: "supports insulin sensitivity and hormonal markers in PCOS; menstrual regularity benefits vary between individuals."

---

#### 3.3.18 — Men's testosterone optimization (physiological range; no anabolic agents)

**Biomarker triggers:** Total testosterone below IFM functional lower limit (400 ng/dL) but above hypogonadism threshold (> 300 ng/dL); free testosterone below optimal; LH/FSH pattern; SHBG elevated (reducing free testosterone bioavailability).

⚠️ **Hard scope boundary:** Men with total testosterone < 300 ng/dL or with symptomatic hypogonadism require physician evaluation and possible testosterone replacement therapy. Zenoho does not supplement-manage hypogonadism. This indication targets physiological optimization in men with below-optimal but not hypogonadal testosterone. No anabolic agents are included (see Part 1.3.3 for exclusions).

**Tier 2 — Ashwagandha root extract KSM-66 — testosterone sub-indication**

*(Cross-reference to Indication 3.3.6 Tier 2 for full entry, compliance rules, and contraindications.)*
- Testosterone evidence: Wankhede et al. and Ambiye et al. RCTs; Bachour 2025 meta-analysis PMC12242034 — supports 15–20% testosterone improvement in men with below-optimal baseline.
- User-facing framing: "Evidence supports meaningful testosterone improvement in men with below-optimal baseline levels. Not relevant for men whose testosterone is already in the optimal range."
- Same KSM-66 root-only India compliance rule applies. Same contraindications.

**Tier 3 — Shilajit (Shuddha / Purified) — testosterone sub-indication — A3B-1**

*(Cross-reference to Indication 3.3.12 Tier 3 for full entry, NON-NEGOTIABLE heavy metal COA requirement, and contraindications.)*
- Testosterone evidence: Pandit et al. 2016 *Andrologia* PMID 26395129 — double-blind RCT n=75 males 45–55; purified Shilajit 500 mg/day × 90 days: significant total and free testosterone increase vs placebo.
- Non-negotiable per-batch NABL COA required — all heavy metals within framework thresholds. Without current COA: do not recommend.

---

#### 3.3.19 — Skin / hair / nails

**Biomarker triggers:** No direct blood biomarker as primary trigger. Secondary triggers that are verified primary indications: low ferritin (hair loss — ferritin < 30 ng/mL is associated with telogen effluvium; correct ferritin first via Indication 3.3.3 before adding collagen); user-reported skin or nail concern as primary complaint.

**Tier 2 — Marine collagen peptides (hydrolyzed)**

| Field | Detail |
|---|---|
| **Standard form** | Hydrolyzed marine collagen peptides — marine sourcing is the India-market default (see regulatory note) |
| **Premium form** | Not required by formulation; sourcing transparency is the quality criterion |
| **Dose range** | Skin hydration and elasticity: 2.5–5 g/day × 8–12 weeks minimum. Joint and connective tissue support (overlap with Indication 3.3.11): 5–15 g/day. Dissolve in warm or cold liquid; take with 50 mg vitamin C at minimum (cofactor for collagen synthesis). |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Proksch et al. 2014 *Skin Pharmacol Physiol* 27(1):47 (double-blind RCT 2.5 g/day × 8 weeks: significant skin elasticity improvement); Czajka et al. 2018 *J Cosmet Dermatol* (2.5 g/day marine collagen: skin hydration and elasticity at 12 weeks); Clark et al. 2008 *Curr Med Res Opin* 24(5):1485 (10 g/day: joint pain athletes 24 weeks); Shaw et al. 2017 *Br J Sports Med* 51(12):989 (15 g/day pre-exercise: significant collagen synthesis marker increase). |
| **Regulatory** | ⚠️ **INDIA SOURCING TRANSPARENCY REQUIREMENT:** Collagen is animal-derived. FSSAI permits animal-derived ingredients with proper labeling. **Default = marine (fish-derived) collagen** — acceptable across most Indian religious communities; FSSAI-clear; widely available. Bovine collagen must be labeled "bovine-derived" — acceptable for most consumers but check religious certification needs for specific markets. Porcine collagen must be labeled — prohibited for Muslim consumers; avoid as default sourcing choice. Zenoho's default recommendation specifies marine collagen. Sourcing origin (marine/bovine/porcine) must be visible on the recommendation card. |
| **Contraindications** | Fish or shellfish allergy for marine collagen; no significant drug interactions at supplement doses. |
| **Pregnancy/BF** | Avoid high-dose supplemental collagen in first trimester without physician guidance; dietary gelatin and collagen in food is safe throughout pregnancy. |

**Mandukaparni (Centella asiatica) — skin/wound healing sub-indication**

*(Cross-reference to Indication 3.3.6 Tier 3 for primary entry. Surfaced here because skin/wound healing is Centella's best-evidenced modern application.)*
- Evidence: Grade B specifically for skin/wound healing — multiple RCTs confirm asiaticoside-driven collagen synthesis, wound contraction, and keloid scar reduction.
- For the skin indication, user-facing evidence label may be upgraded to "Moderate scientific evidence" (Grade B for this specific application).
- Oral: Centella asiatica extract 500 mg twice daily. Topical: cream or gel with standardised asiaticoside for wound and scar-healing application.

---

#### 3.3.20 — Recovery / athletic performance (natural-substance bounds)

**Biomarker triggers:** VO2max estimate from wearable data below age-appropriate range; recovery score pattern flagged; testosterone below optimal in active male; user-stated athletic performance or recovery goal.

**Tier 2 — Ashwagandha root extract KSM-66 — VO2max and recovery**

*(Cross-reference to Indication 3.3.6 Tier 2 for full entry.)*
- Athletic evidence: PMC7230697 meta-analysis (5 studies, 4 in meta-analysis) confirms significant VO2max improvement; Bachour 2025 PMC12242034 — cortisol reduction in athletic populations supports faster recovery.
- Same KSM-66 root-only India compliance. Same contraindications.

**Tier 2 — Marine collagen peptides — connective tissue recovery**

*(Cross-reference to Indication 3.3.19 Tier 2 for full entry.)*
- Athletic application: Shaw et al. 2017 *Br J Sports Med* 51(12):989 — 15 g/day collagen + 50 mg vitamin C consumed 30–60 minutes before exercise significantly increased collagen synthesis markers in athletes.
- Timing is mechanistically important for the athletic-connective-tissue application: take 30–60 minutes pre-exercise with vitamin C, not at a random time of day.

**Tier 3 — Shilajit (Shuddha / Purified) — athletic recovery sub-indication**

*(Cross-reference to Indication 3.3.12 Tier 3 for full entry and NON-NEGOTIABLE COA requirements.)*
- Athletic evidence: Yadav et al. 2026 *Cureus* PMC12848467 — open-label pilot (n not large; 28 days; Indian institution): strength +12.94%, endurance +12.30%, VO2max +1.36%, fatigue score −32.4%, CRP −25.35%. Caveat: open-label, unblinded, small — evidence is preliminary but notable for the Indian context.
- Non-negotiable per-batch NABL COA required regardless of indication.

---

#### 3.3.21 — Immune support (acute and chronic)

**Biomarker triggers:** Lymphocyte count below lower-normal range (immunosuppression proxy); neutrophil/lymphocyte ratio elevated; user-reported frequent infections; hs-CRP elevated in chronic inflammation pattern; post-illness recovery phase; wearable-derived recovery score chronically low.

**Tier 1 — Vitamin C + Zinc picolinate**

| Field | Detail |
|---|---|
| **Standard form** | Vitamin C (ascorbic acid) 500–1,000 mg/day + Zinc picolinate or zinc gluconate 15–25 mg/day |
| **Premium form** | For acute throat-based antiviral effect specifically: zinc acetate lozenges (ionic zinc release in throat — separate application from systemic zinc picolinate); acerola cherry as food-form vitamin C is unnecessary — ascorbic acid is bioequivalent. |
| **Dose range** | Vitamin C 200–1,000 mg/day (no significant additional immune benefit above 1,000 mg/day; 500 mg/day is effective and GI-tolerable); Zinc 15–25 mg/day. |
| **Evidence** | `evidenceLevel: B` — **"Moderate to strong scientific evidence"** |
| **Citations** | Hemilä & Chalker 2013 *Cochrane Database Syst Rev* (vitamin C reduces cold duration ~8% adults, ~14% children at ≥ 200 mg/day; does NOT consistently prevent cold onset in general population); Hemilä 2017 *Open Forum Infect Dis* 4(2) (zinc supplementation reduces cold duration ~33%). |
| **Regulatory** | CLEAR — ascorbic acid and zinc picolinate/gluconate both permitted FSSAI nutraceuticals. |
| **Contraindications** | High-dose vitamin C > 2 g/day: kidney stone risk in susceptible individuals; hemochromatosis (vitamin C increases iron absorption — avoid high doses); zinc above 40 mg/day long-term: copper depletion (competitive absorption — consider copper 1–2 mg/day if on zinc > 25 mg/day for extended period); zinc interacts with quinolone and tetracycline antibiotics (separate dosing by 2 hours). |
| **Pregnancy/BF** | Vitamin C safe; zinc at RDA levels (11 mg/day) safe; avoid zinc > 40 mg/day in pregnancy. |

⚠️ **Corrected claim (V49):** Vitamin C does NOT consistently reduce cold incidence in the general population (exception: extreme physical stress environments such as marathon runners). Vitamin C reduces cold **duration**. Correct user-facing framing: "Vitamin C reduces cold duration; zinc reduces cold duration significantly — together they support faster recovery, not prevention."

**Tier 2 — Quercetin (standardized extract)**

| Field | Detail |
|---|---|
| **Standard form** | Quercetin standardised botanical extract 500 mg/day (from quercetin-rich sources); specification of phytosome delivery form in consumer-facing copy deferred pending FSSAI NSF clearance |
| **Premium form** | Quercetin phytosome — substantially higher bioavailability than quercetin aglycone (standard quercetin aglycone has approximately 1% bioavailability); all positive clinical RCTs used quercetin phytosome. However, the phytosome delivery form carries an FSSAI NSF flag — see regulatory note. |
| **Dose range** | 500 mg/day; can be stacked with zinc 15–25 mg/day (quercetin facilitates intracellular zinc transport — zinc ionophore mechanism amplifies zinc's antiviral effect at RNA polymerase level) |
| **Evidence** | `evidenceLevel: B` for antiviral/acute immune — **"Moderate to strong scientific evidence"**; Grade C for general anti-inflammatory (weaker human evidence for that application) |
| **Citations** | Dabbagh-Bazarbachi et al. 2014 *J Agric Food Chem* 62(32):8085 (zinc ionophore mechanism in vitro); Faridi et al. 2022 COVID-19 RCT (quercetin phytosome); PMC10724618 2023 meta-analysis (5 RCTs n=544: hospital admission risk RR 0.30; LDH levels significant reduction). |
| **Regulatory** | ⚠️ **FSSAI NSF STATUS — CONFIRM BEFORE LISTING:** Quercetin from food sources and standard botanical extracts → likely acceptable under FSSAI. Phytosome delivery system → **FLAG: same NSF novel ingredient issue as curcumin phytosome.** **Phase 1 workaround:** Recommend "quercetin from standardized extract" — do not specify phytosome delivery in consumer-facing copy until NSF status confirmed from specific manufacturer. |
| **Contraindications** | Anticoagulant medications (quercetin has antiplatelet effect — additive bleeding risk); quinolone antibiotics (competitive intestinal absorption — separate by 2–3 hours); thyroid medications (potential minor absorption interaction). |
| **Pregnancy/BF** | Avoid — insufficient safety data at supplemental doses. |

**Tier 3 — Guduchi (Tinospora cordifolia) — immune primary application — A3B-4**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | T. cordifolia stem extract 300–500 mg/day; from AYUSH-licensed manufacturer with HPTLC or DNA barcoding confirmation of T. cordifolia (not T. crispa); duration ≤ 8 weeks continuously without repeat LFT check |
| **Classical text** | Charaka Samhita Chikitsa Sthana 3/30 — Guduchi as principal Rasayana for Jirna Jwara (chronic fever) and persistent immune compromise. Classical name: "Amrita" (nectar of immortality). Bhavaprakasha Nighantu (Haritakyadi Varga, shloka 191–193) — immunomodulatory use documented extensively. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Citations** | Sharma et al. 2024 *Cureus* 16(4):e58807 PMC11112623 (NIA Jaipur multicenter open-label RCT: significant reduction in infection incidence and severity); Heliyon 2024 DOI 10.1016/j.heliyon.2024.e26125 (pharmacological activity review); Nagral et al. 2021 *J Clin Exp Hepatol* 11(6):722 (hepatotoxicity case series — mandatory safety reference); PMC10105241 (2023 safety controversy analysis). |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV. Botanical authentication (T. cordifolia vs T. crispa) is a Zenoho non-negotiable. |
| **Contraindications** | Liver disease of any form; autoimmune hepatitis; concurrent hepatotoxic medications; use exceeding 8 weeks without LFT monitoring. |
| **Pregnancy/BF** | Avoid — insufficient safety data. |

> ⚠️ **MANDATORY USER-FACING TEXT FOR EVERY GUDUCHI RECOMMENDATION:** "If you notice yellowing of skin or eyes, dark urine, or abdominal pain at any point while taking this supplement, stop immediately and consult a physician."

**Tier 3 — Amla (Amalaki / Phyllanthus emblica) — immune application — A3B-3**

*(Surface only on explicit Ayurvedic preference. User-facing label: "Traditional use, limited modern research")*

| Field | Detail |
|---|---|
| **Standard form** | Amla powder 3–6 g/day; OR standardised extract 500 mg/day with ≥ 40% tannin content from AYUSH-licensed manufacturer with per-batch heavy-metal COA |
| **Classical text** | Charaka Samhita — Amalaki as the foundational Rasayana. The richest natural source of vitamin C in classical texts. |
| **Evidence** | `evidenceLevel: TRADITIONAL` — **"Traditional use, limited modern research"** |
| **Citations** | Setayesh et al. 2023 *Diabetes Metab Syndr* PMID 36934568 (meta-analysis 5 RCTs; significant LDL reduction; modest CRP improvement); Brown et al. 2023 *BMC Complement Med Ther* 23:190; PMC9137578. |
| **Regulatory** | CLEAR — AYUSH pharmacopoeia; FSSAI Schedule IV; native Indian plant. |
| **Contraindications** | Anticoagulant medications (high-dose Amla has mild antiplatelet effect); heavy metal bioaccumulation risk from soil — organic-certified sourcing strongly preferred. |
| **Pregnancy/BF** | Food-level Amla safe; supplemental extract doses: physician guidance. |

---

#### 3.3.22 — Mood support (depression-adjunct only; not standalone therapy)

**Biomarker triggers:** This indication is primarily triggered by user-reported mood concerns or validated wellness screening scores — not by a single blood biomarker. It is not triggered automatically by any lab marker alone.

⚠️ **Critical scope restriction (mandatory):** This indication covers adjunct support for mild-to-moderate mood symptoms only. It is NOT a standalone therapy for clinical depression, anxiety disorders meeting diagnostic criteria, bipolar disorder, schizophrenia, or OCD. For any user presenting with clinical-grade mental health symptoms, Zenoho's platform response is to recommend professional help and surface helpline resources. No supplement in this library is positioned as treating or curing any mental health condition. Every recommendation in this indication must carry: *"These supplements support general mood and wellbeing and are not a substitute for professional mental health care. If you are experiencing significant mood symptoms, please speak with a qualified mental health professional."*

**Tier 1 — Omega-3 EPA+DHA — mood/depression adjunct**

*(Cross-reference to Indication 3.3.7 Tier 1 for full sourcing and safety entry.)*

Application note: For the mood adjunct indication, EPA-dominant formulations (EPA:DHA ≥ 2:1) are preferred over balanced EPA+DHA. Evidence specifically for depression adjunct supports 1–2 g EPA/day (not total EPA+DHA) as the mechanistically relevant component. This sub-application (high-EPA omega-3 as depression adjunct) uses a somewhat different specification from the inflammation indication. User-facing framing: "Omega-3 with higher EPA content has been studied as a mood-supportive adjunct alongside professional care — not as a standalone treatment."

⚠️ **Pending verification flag:** The depression-adjunct application of omega-3 was not formally verified in Pass 3 (V39 covered inflammation/CRP indication). This sub-indication is cited from independent literature. It should be formally reviewed in a future pass to be upgraded from a framework cross-reference to a full library entry.

**Tier 3 — Mandukaparni (Centella asiatica) — alertness and anger-reduction application**

*(Cross-reference to Indication 3.3.6 Tier 3 for full entry and safety profile.)*

Surviving evidence relevant to this indication: Puttarak et al. 2017 *Sci Rep* PMC5587720 — significant alertness improvement (SMD +0.71, p=0.03) and anger reduction (SMD −0.81, p=0.03). Bradwejn et al. 2000 — anxiolytic effect in generalized anxiety. These are the only mood-adjacent claims that survive meta-analysis for Mandukaparni.

⚠️ Do NOT claim cognitive enhancement or antidepressant effect in user-facing copy. Do NOT imply Mandukaparni treats clinical depression or anxiety disorder. Permitted framing only: "traditionally used for stress resilience, mood, and alertness — not a treatment for clinical mood disorders."

---

#### 3.3.23 — Bone health / osteoporosis prevention

**Biomarker triggers:** ALP elevated (bone remodelling marker — with bone-specific ALP context); Vitamin D deficiency confirmed (primary trigger — see Indication 3.3.2; D3 correction is first priority); osteoporosis or osteopenia confirmed by DEXA scan (physician-diagnosed); postmenopausal women > 50 or men > 60 with relevant risk factor pattern.

⚠️ **Framework gap note:** A complete bone-health protocol requires calcium citrate (Tier 1, Grade A evidence, well established) and vitamin K2 MK-7 (Tier 2, Grade B for directing calcium to bone and reducing vascular calcification risk). **Neither has been formally verified in the Zenoho supplement pass system yet.** Both will be added as Tier 1/Tier 2 entries in a future framework version after formal pass verification. Until then, Zenoho's bone-health recommendation begins with the verified items below and explicitly directs users to physician-guided bone health management.

**Tier 1 — Cholecalciferol (D3) — cross-reference to bone health**

*(Primary entry in Indication 3.3.2. Identical entry applies here.)*
- Bone-specific note: Vitamin D is essential for calcium absorption and bone matrix mineralisation. Deficiency correction (Indication 3.3.2) is the first step in any bone health protocol. Vitamin D alone without calcium and weight-bearing exercise has a modest effect on bone density — it is necessary but not sufficient.
- Post-repletion maintenance: 1,000–2,000 IU/day or 60,000 IU/month.

**Tier 1 — Magnesium glycinate — cross-reference to bone health**

*(Primary entry in Indication 3.3.5. Relevant here because:)*
- Magnesium is required for vitamin D hydroxylation to its active form (calcitriol); magnesium deficiency reduces PTH response and worsens vitamin D resistance; magnesium is incorporated into bone matrix.
- Correcting magnesium deficiency is part of a complete bone health protocol.
- 200–400 mg elemental magnesium/day; same sourcing and safety profile as primary entry.

---

#### 3.3.24 — Allergic / atopic conditions

**Biomarker triggers:** Elevated eosinophils (> 500/μL); elevated total IgE (confirmed atopic pattern); user-reported chronic allergic symptoms (rhinitis, atopic dermatitis, eczema, chronic urticaria).

⚠️ **Scope note:** No Pass 3 or Pass 3B verified supplements have cleared the Tier 1 evidence threshold for primary allergic/atopic indication. Quercetin (V50) has mast-cell stabilisation evidence that is Grade C for this specific application (weaker than its antiviral immune application). This indication is currently the least populated in the Zenoho library. Physician management — and for eosinophilic conditions, allergy testing — is the primary recommended course of action.

**Tier 2 — Quercetin — mast cell stabilisation / atopic adjunct**

*(Cross-reference to Indication 3.3.21 Tier 2 for full entry, FSSAI flag, and contraindications.)*

| Field | Detail |
|---|---|
| **Evidence for this indication** | `evidenceLevel: C` — **"Moderate scientific evidence"** (Grade C for allergic/atopic application specifically — strong in vitro and animal evidence for mast cell histamine release inhibition and IgE-mediated degranulation inhibition; human RCT evidence for general anti-allergic use is limited) |
| **Mechanism** | Quercetin inhibits mast cell degranulation, reduces histamine release, and downregulates IgE-receptor signaling in vitro. Strong mechanistic rationale for atopic conditions even where clinical trial evidence is still limited. |
| **Dose range** | 500 mg/day quercetin extract — same as immune indication. Phase 1 consumer copy: "quercetin from standardised extract" — do not specify phytosome until FSSAI NSF confirmed. |
| **User-facing framing** | "Quercetin has demonstrated mast cell stabilising activity in laboratory and animal studies; human clinical evidence for allergic conditions is limited. This may be supportive as an adjunct. Discuss with your physician or allergist before relying on this for allergy management." |

---

### 3.4 FSSAI NSF status summary (items requiring legal confirmation before listing)

| Supplement | Flag reason | Phase 1 workaround |
|---|---|---|
| Silymarin (milk thistle) | Foreign botanical; not on FSSAI Schedule IV standard list; likely NSF novel ingredient required | "Discuss liver support supplement options with your physician" |
| Bergamot BPF | Foreign botanical; likely NSF novel ingredient required for BPF extract | "Discuss bergamot extract (BPF) as a lipid support option with your physician" |
| Isolated berberine HCl | Isolated alkaloid form may require NSF; Berberis aristata root extract is safer pathway | Specify "berberine from Berberis aristata root extract" in all consumer copy |
| Curcumin phytosome (Meriva, BCM-95, Theracurmin) | Phytosome delivery system (novel formulation) may require NSF | "High-bioavailability curcumin" — omit delivery system name |
| Quercetin phytosome | Same phytosome delivery NSF issue | "Quercetin from standardised extract" — omit phytosome specification |

---

### 3.5 Dual-entry items (Tier 2 Western + Tier 3 Ayurvedic framing — do not surface both simultaneously)

| Tier 2 entry | Tier 3 entry | Shared plant | Rule |
|---|---|---|---|
| V41 Bacopa monnieri 50% bacosides | A3B-5 Brahmi (AYUSH framing) | Bacopa monnieri | Analysis engine: mutually exclusive per session per user |
| V40 Curcumin phytosome | 3.3.7 Haridra / Curcuma longa (provisional) | Curcuma longa | Same — do not surface both in one session |
| V38 Ashwagandha KSM-66 | (No Tier 3 Ashwagandha entry — KSM-66 is itself a root-only extract; framework handles as Tier 2 only) | Withania somnifera | No dual-entry conflict; KSM-66 specification resolves this |

---

### 3.6 Contraindication matrix additions from Pass 3 and Pass 3B

The following contraindications must be incorporated into the Part 5 matrix of the v1.0 framework. They are surfaced here for the developer and analyst integrating this Part 3 into the full document:

| Supplement | Contraindication to add to Part 5 |
|---|---|
| Berberine | Pregnancy/breastfeeding (absolute); warfarin (INR interaction); concurrent antidiabetic drugs without physician oversight; children |
| Ashwagandha KSM-66 | First trimester pregnancy (classical abortifacient concern); thyroid hormone medications (monitor TSH); active hyperthyroidism |
| Curcumin (all forms) | Anticoagulants (additive bleeding); bile duct obstruction; pre-surgical period |
| Silymarin | CYP3A4 and CYP2C9 substrate medications; Asteraceae allergy; estrogen-sensitive conditions |
| Guduchi | Liver disease (any form); autoimmune hepatitis; hepatotoxic medications; > 8 weeks without LFT check |
| Shilajit | Pregnancy; active kidney disease; renal stones; gout |
| Jatamansi | Pregnancy; breastfeeding; benzodiazepines or CNS depressants |
| Shankhpushpi | Thyroid hormone replacement medications (hard exclusion — reduces thyroxine absorption) |
| Shallaki (Boswellia) | Anticoagulant medications; pregnancy |
| Plant sterols | Sitosterolemia (absolute contraindication) |
| CoQ10 | Warfarin (reduces anticoagulant effect); chemotherapy (consult oncologist) |
| Omega-3 > 3 g/day | Anticoagulant or antiplatelet medications (physician oversight required) |
| Quercetin | Anticoagulants; quinolone antibiotics (separate by 2 hours) |

---

### 3.7 Pending verifications and future framework additions

The following are noted gaps that will be addressed in a future framework version:

| Item | Gap | Priority |
|---|---|---|
| Calcium citrate | Tier 1 bone health entry; Grade A evidence; not yet formally pass-verified | HIGH |
| Vitamin K2 MK-7 | Tier 2 bone health and cardiovascular entry; Grade B evidence; not yet pass-verified | HIGH |
| Probiotic strains (Lactobacillus / Bifidobacterium species-specific) | Tier 1/2 gut health; Grade A for IBS; not yet pass-verified | HIGH |
| High-EPA omega-3 for depression adjunct | Currently cross-referenced in mood indication; needs dedicated verification as library entry | MEDIUM |
| Haridra (Curcuma longa) Tier 3 | Provisional entry; needs formal A3B-level verification to upgrade or remove | MEDIUM |
| Phytoestrogens / black cohosh | Perimenopause/menopause indication; not yet verified | MEDIUM |
| Zinc standalone Tier 1 entry | Currently co-supplementation note under selenium (Indication 3.3.13); Grade C for thyroid; needs pass-level verification to become standalone entry | LOW |

---

*Document generated: May 13, 2026 | Zenoho Health Private Limited | Internal use only*
*This Part 3 is verified content. Citations trace to zenoho_pass3_verdicts.md (V32–V51) and zenoho_pass3b_verdicts.md (A3B-1 through A3B-11). No citation in this document is original to this file — all trace to verified passes.*
*Next mandatory review: May 2027 or upon any material FSSAI/AYUSH/CDSCO regulatory action affecting listed supplements.*

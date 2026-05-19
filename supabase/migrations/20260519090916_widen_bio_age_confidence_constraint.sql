/*
  # Widen bio_age_confidence CHECK constraint on panel_scores

  ## Summary
  Comprehensive confidence-constraint sweep (v1.2 SYSTEM_PROMPT alignment).

  Five confidence-type CHECK constraints were audited against the vocabulary
  the v1.2 SYSTEM_PROMPT legitimately emits. Four were already aligned after
  the previous migration. One gap remained:

  ## Change

  ### panel_scores.bio_age_confidence
  - Old constraint: CHECK (bio_age_confidence IN ('HIGH', 'MEDIUM', 'LOW'))
  - New constraint: CHECK (bio_age_confidence IN ('HIGH', 'MEDIUM', 'LOW', 'SUPPRESSED'))

  ### Why SUPPRESSED is a valid value
  The SYSTEM_PROMPT output schema (line 1042) defines biological_age.confidence as:
    "confidence": "HIGH" | "MEDIUM" | "LOW" | "SUPPRESSED"
  The edge function maps biological_age.confidence → panel_scores.bio_age_confidence
  (index.ts line 1403). SUPPRESSED is emitted when biological age cannot be
  calculated (pregnancy, age <18, >4 of 6 primary BioAge markers missing, or
  acute-phase distortion from hs-CRP > 10).

  ## Not changed
  - panels.confidence_overall        — already aligned (HIGH, MEDIUM, LOW)
  - system_scores.confidence         — already aligned (HIGH, MEDIUM, LOW, SKIP)
  - domain_scores.confidence         — already aligned (HIGH, MEDIUM, LOW, INSUFFICIENT_COVERAGE, PREGNANCY_SUPPRESSED)
  - panel_scores.b_score_confidence  — already aligned (HIGH, MEDIUM, LOW)
  - w_scores.confidence              — no CHECK constraint; not in scope (wearable field, not populated by this prompt)
*/

ALTER TABLE panel_scores
  DROP CONSTRAINT IF EXISTS panel_scores_bio_age_confidence_check;

ALTER TABLE panel_scores
  ADD CONSTRAINT panel_scores_bio_age_confidence_check
  CHECK (bio_age_confidence IN ('HIGH', 'MEDIUM', 'LOW', 'SUPPRESSED'));

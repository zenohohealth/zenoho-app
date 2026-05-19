/*
  # Add v1.2 supplement_recommendations columns

  ## Summary
  Adds new columns to supplement_recommendations table to support the v1.2
  Supplement Recommendation Engine schema output from zenoho_analysis_prompt_v1_2.

  ## Changes to supplement_recommendations
  - `framework_indication` (text) — indication subsection reference (e.g. "3.3.6 Cortisol/stress")
  - `indication_rationale` (text) — which marker(s)/value(s) trigger this recommendation
  - `physician_consultation_required` (boolean, default false) — Tier 2/3 flag
  - `standardization` (text) — dosing/standardization string (replaces free-text in dose fields)
  - `sourcing_note` (text) — mandatory for Tier 3 AYUSH items
  - `bioavailability_note` (text) — mandatory for Tier 3 where Tier 2 form exists
  - `safety_template_id` (text) — references SAFETY_TEMPLATE_* registry in Part 9 H

  ## Notes
  - All columns are nullable to avoid breaking existing rows.
  - The `supplement_name` column is retained; v1.2 engine populates it via
    the `compound` field from AI output (mapped in server code).
  - No data is dropped. Existing rows are unaffected.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'framework_indication'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN framework_indication text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'indication_rationale'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN indication_rationale text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'physician_consultation_required'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN physician_consultation_required boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'standardization'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN standardization text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'sourcing_note'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN sourcing_note text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'bioavailability_note'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN bioavailability_note text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'supplement_recommendations' AND column_name = 'safety_template_id'
  ) THEN
    ALTER TABLE supplement_recommendations ADD COLUMN safety_template_id text;
  END IF;
END $$;

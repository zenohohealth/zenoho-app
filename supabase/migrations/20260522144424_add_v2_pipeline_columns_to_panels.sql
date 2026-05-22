/*
  # Add v2 pipeline metadata columns to panels

  ## Summary
  Adds columns needed by the Stage 1 analyze-markers function to persist
  gate results, pregnancy/conservative flags, and crisis state to the panels row.

  ## New columns on panels
  - pregnancy_gate_active (boolean) — true if Gate 2 (pregnancy) fired
  - conservative_mode_active (boolean) — true if conservative mode engaged
  - crisis_detected (text) — 'ACUTE_MEDICAL' | 'MENTAL_HEALTH' | null
  - crisis_message (text) — the canonical crisis message text, or null
  - patient_name (text) — alias/shortcut for patient_name_on_report (separate col)

  ## Notes
  - All new columns are nullable with safe defaults
  - No existing columns are modified
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panels' AND column_name = 'pregnancy_gate_active'
  ) THEN
    ALTER TABLE panels ADD COLUMN pregnancy_gate_active boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panels' AND column_name = 'conservative_mode_active'
  ) THEN
    ALTER TABLE panels ADD COLUMN conservative_mode_active boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panels' AND column_name = 'crisis_detected'
  ) THEN
    ALTER TABLE panels ADD COLUMN crisis_detected text DEFAULT null;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panels' AND column_name = 'crisis_message'
  ) THEN
    ALTER TABLE panels ADD COLUMN crisis_message text DEFAULT null;
  END IF;
END $$;

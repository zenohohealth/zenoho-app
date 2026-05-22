/*
  # Stage 3 Pipeline — blocked_recommendations table + panels/panel_scores columns

  ## Summary
  Adds the infrastructure needed by the analyze-recommendations Stage 3 edge function.

  ## New Tables
  - `blocked_recommendations` — stores supplements that were considered but blocked
    by contraindication rules, conservative mode, pregnancy gate, or pending-verification
    exclusion. Internal audit trail; not displayed to users.

  ## New Columns on panels
  - `completed_at` (timestamptz) — set when processing_status transitions to 'complete'

  ## New Columns on panel_scores
  - `lifestyle_priorities` (jsonb) — lifestyle priority array from Stage 3 output
  - `communication_preferences` (jsonb) — communication preference object from Stage 3
  - `supplement_block_reason` (text) — e.g. OBSTETRICIAN_SIGNOFF_REQUIRED
  - `pending_exclusion_active` (boolean) — true if any pending-verification items excluded
  - `pending_exclusions_referenced` (text[]) — list of excluded pending items

  ## Security
  - RLS enabled on blocked_recommendations
  - Authenticated users can only read their own panel's blocked_recommendations rows
*/

-- blocked_recommendations table
CREATE TABLE IF NOT EXISTS blocked_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id uuid NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  compound text NOT NULL,
  framework_indication text,
  reason_code text NOT NULL,
  reason_detail text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blocked_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own blocked recommendations"
  ON blocked_recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert blocked recommendations"
  ON blocked_recommendations FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS blocked_recommendations_panel_id_idx ON blocked_recommendations(panel_id);

-- panels.completed_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panels' AND column_name = 'completed_at' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panels ADD COLUMN completed_at timestamptz DEFAULT null;
  END IF;
END $$;

-- panel_scores JSONB + supplementary columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panel_scores' AND column_name = 'lifestyle_priorities' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panel_scores ADD COLUMN lifestyle_priorities jsonb DEFAULT null;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panel_scores' AND column_name = 'communication_preferences' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panel_scores ADD COLUMN communication_preferences jsonb DEFAULT null;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panel_scores' AND column_name = 'supplement_block_reason' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panel_scores ADD COLUMN supplement_block_reason text DEFAULT null;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panel_scores' AND column_name = 'pending_exclusion_active' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panel_scores ADD COLUMN pending_exclusion_active boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'panel_scores' AND column_name = 'pending_exclusions_referenced' AND table_schema = 'public'
  ) THEN
    ALTER TABLE panel_scores ADD COLUMN pending_exclusions_referenced text[] DEFAULT '{}';
  END IF;
END $$;

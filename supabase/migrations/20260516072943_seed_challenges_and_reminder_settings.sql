/*
  # Challenge seeds + supplement reminder settings

  1. Seed 7 challenge definitions (idempotent via ON CONFLICT DO NOTHING)
  2. Add supplement_reminder_settings table for per-supplement WhatsApp reminder config
  3. RLS on supplement_reminder_settings
*/

-- ── Challenge seeds ──────────────────────────────────────────────────────────

INSERT INTO challenge_definitions (slug, title, description, challenge_type, duration_days, requires_wearable, tier_required, is_active)
VALUES
  ('hrv_baseline_week',   'HRV Baseline Week',          'Maintain HRV at or above your personal average for 7 consecutive days.',   'streak',           7,  true,  'free', true),
  ('sleep_quality_streak','Sleep Quality Streak',        'Score 70+ on sleep quality for 5 consecutive nights.',                     'streak',           5,  true,  'free', true),
  ('supplement_streak',   'Supplement Streak',           'Take your supplements daily for 30 days.',                                  'streak',           30, false, 'free', true),
  ('steps_10k',           '10K Steps',                   'Hit 10,000 steps for 7 consecutive days.',                                  'streak',           7,  true,  'free', true),
  ('resting_hr_pb',       'Resting Heart Rate Drop',     'Achieve a new personal best resting HR.',                                   'personal_best',    null, true, 'free', true),
  ('score_level_up',      'Score Level Up',              'Improve any domain score by 1 full level in your next retest.',             'score_level_up',   null, false, 'free', true),
  ('retest_90_day',       '90-Day Retest',               'Complete your 90-day retest on schedule.',                                  'streak',           90, false, 'free', true)
ON CONFLICT (slug) DO NOTHING;

-- ── Supplement reminder settings ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS supplement_reminder_settings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  supplement_id     UUID NOT NULL REFERENCES supplement_recommendations(id) ON DELETE CASCADE,
  enabled           BOOLEAN DEFAULT false,
  remind_at         TIME DEFAULT '08:00:00',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, supplement_id)
);

ALTER TABLE supplement_reminder_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reminder_settings_select"
  ON supplement_reminder_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "reminder_settings_insert"
  ON supplement_reminder_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reminder_settings_update"
  ON supplement_reminder_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reminder_settings_delete"
  ON supplement_reminder_settings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ── behavior_streaks: add supplement_taken type helper ───────────────────────
-- Add last_prompted_date to behavior_streaks so we can track daily adherence prompts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'behavior_streaks' AND column_name = 'last_prompted_date'
  ) THEN
    ALTER TABLE behavior_streaks ADD COLUMN last_prompted_date DATE;
  END IF;
END $$;

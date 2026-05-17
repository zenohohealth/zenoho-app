/*
  # Zenoho Initial Schema

  ## Overview
  Full schema for Zenoho health analytics platform.

  ## Tables
  1. users - Extended user profiles linked to auth.users
  2. waitlist - Pre-launch email capture
  3. panels - Blood test panel submissions
  4. marker_results - Individual biomarker values per panel
  5. system_scores - Body system scores per panel (9 systems)
  6. domain_scores - Domain scores per panel (10 domains)
  7. panel_scores - Aggregate B-score per panel
  8. supplement_recommendations - AI-generated supplement suggestions
  9. wearable_connections - Terra wearable integrations
  10. wearable_daily - Daily wearable metrics
  11. w_scores - Weekly wearable scores
  12. challenge_definitions - Challenge templates
  13. user_challenges - User enrollment in challenges
  14. behavior_streaks - Streak tracking per user/challenge
  15. achievements - Earned badges and milestones
  16. terra_webhooks - Raw Terra webhook payloads
  17. subscriptions - Razorpay subscription records

  ## Security
  RLS enabled on every table. All policies restrict to authenticated owner.
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                TEXT UNIQUE NOT NULL,
  name                 TEXT,
  phone                TEXT,
  date_of_birth        DATE,
  gender               TEXT CHECK (gender IN ('male','female','non_binary','prefer_not_to_say')),
  city                 TEXT,
  dietary_pattern      TEXT CHECK (dietary_pattern IN ('omnivore','vegetarian','vegan','pescatarian','other')),
  activity_level       TEXT CHECK (activity_level IN ('sedentary','moderate','athlete')),
  pregnancy_status     TEXT CHECK (pregnancy_status IN ('not_pregnant','pregnant','postpartum')),
  conditions           TEXT[] DEFAULT '{}',
  performance_intent   TEXT CHECK (performance_intent IN ('longevity','energy','mental_sharpness','athletic_recovery')),
  subscription_tier    TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free','starter','essential','optimise','elite')),
  subscription_status  TEXT DEFAULT 'active',
  razorpay_customer_id TEXT,
  terms_accepted_at    TIMESTAMPTZ,
  privacy_accepted_at  TIMESTAMPTZ,
  wearable_consent_at  TIMESTAMPTZ,
  onboarded_at         TIMESTAMPTZ,
  notification_preferences JSONB DEFAULT '{"supplement_reminders":true,"streak_milestones":true,"retest_reminders":true,"whatsapp_enabled":false}',
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  name       TEXT,
  city       TEXT,
  source     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Panels (blood test submissions)
CREATE TABLE IF NOT EXISTS panels (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lab_name               TEXT,
  patient_name_on_report TEXT,
  lab_accession_list     TEXT[] DEFAULT '{}',
  collected_on           DATE NOT NULL,
  registered_at          TIMESTAMPTZ,
  approved_at            TIMESTAMPTZ,
  authenticity_score     TEXT CHECK (authenticity_score IN ('HIGH','MEDIUM','LOW','FAILED')),
  authenticity_flags     JSONB DEFAULT '[]',
  confidence_overall     TEXT CHECK (confidence_overall IN ('HIGH','MEDIUM','LOW')),
  markers_submitted      INTEGER DEFAULT 0,
  markers_scoreable      INTEGER DEFAULT 0,
  raw_pdf_path           TEXT,
  processing_status      TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending','processing','complete','failed','needs_review')),
  processing_error       TEXT,
  processing_model       TEXT,
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Marker results
CREATE TABLE IF NOT EXISTS marker_results (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id            UUID NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES users(id),
  marker_id           INTEGER NOT NULL CHECK (marker_id BETWEEN 1 AND 62),
  value               NUMERIC,
  unit                TEXT,
  lab_ref_low         NUMERIC,
  lab_ref_high        NUMERIC,
  zenoho_zone         TEXT CHECK (zenoho_zone IN ('optimal','watch_low','watch_high','alert_low','alert_high','critical_low','critical_high')),
  zone_score          NUMERIC(5,2),
  raw_marker_name     TEXT,
  lab_error_flag      TEXT,
  retest_required     BOOLEAN DEFAULT FALSE,
  interpretation_note TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- System scores (9 body systems)
CREATE TABLE IF NOT EXISTS system_scores (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id              UUID NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id               UUID NOT NULL REFERENCES users(id),
  system_id             INTEGER NOT NULL CHECK (system_id BETWEEN 1 AND 9),
  system_name           TEXT NOT NULL,
  raw_score             NUMERIC(5,2),
  system_weight         NUMERIC(5,2),
  weighted_contribution NUMERIC(5,2),
  confidence            TEXT CHECK (confidence IN ('HIGH','MEDIUM','LOW')),
  markers_tested        INTEGER,
  markers_available     INTEGER,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(panel_id, system_id)
);

-- Domain scores (10 domains)
CREATE TABLE IF NOT EXISTS domain_scores (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id    UUID NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id),
  domain_id   INTEGER NOT NULL CHECK (domain_id BETWEEN 1 AND 10),
  domain_name TEXT NOT NULL,
  raw_score   NUMERIC(5,2),
  level       INTEGER CHECK (level BETWEEN 1 AND 10),
  confidence  TEXT CHECK (confidence IN ('HIGH','MEDIUM','LOW')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(panel_id, domain_id)
);

-- Panel aggregate scores
CREATE TABLE IF NOT EXISTS panel_scores (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id                UUID NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id                 UUID NOT NULL REFERENCES users(id),
  b_score                 NUMERIC(5,2),
  b_score_confidence      TEXT CHECK (b_score_confidence IN ('HIGH','MEDIUM','LOW')),
  bio_age_estimated       INTEGER,
  bio_age_chronological   INTEGER,
  bio_age_gap             INTEGER,
  bio_age_confidence      TEXT CHECK (bio_age_confidence IN ('HIGH','MEDIUM','LOW')),
  top_lever               TEXT,
  next_test_date          DATE,
  safety_overrides_active BOOLEAN DEFAULT FALSE,
  cross_marker_rules_active INTEGER[] DEFAULT '{}',
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(panel_id)
);

-- Supplement recommendations
CREATE TABLE IF NOT EXISTS supplement_recommendations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id              UUID NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  user_id               UUID NOT NULL REFERENCES users(id),
  supplement_name       TEXT NOT NULL,
  tier                  INTEGER DEFAULT 1 CHECK (tier IN (1,2,3)),
  tier_label            TEXT,
  dose_amount           NUMERIC,
  dose_unit             TEXT,
  dose_frequency        TEXT,
  dose_timing           TEXT,
  pair_with             TEXT,
  evidence_level        TEXT CHECK (evidence_level IN ('HIGH','MEDIUM','LOW')),
  trigger_marker_id     INTEGER,
  trigger_zone          TEXT,
  drug_interaction_warning TEXT,
  is_premium_form       BOOLEAN DEFAULT FALSE,
  premium_form_name     TEXT,
  premium_form_extra_cost_paise INTEGER,
  ayurvedic_classical_name TEXT,
  ayush_recognised      BOOLEAN DEFAULT FALSE,
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Wearable connections (Terra)
CREATE TABLE IF NOT EXISTS wearable_connections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  terra_user_id TEXT UNIQUE,
  provider      TEXT,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','disconnected','error')),
  connected_at  TIMESTAMPTZ DEFAULT NOW(),
  last_sync_at  TIMESTAMPTZ
);

-- Wearable daily metrics
CREATE TABLE IF NOT EXISTS wearable_daily (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date               DATE NOT NULL,
  source             TEXT NOT NULL,
  steps              INTEGER,
  active_calories    INTEGER,
  hrv_rmssd          NUMERIC,
  resting_hr         INTEGER,
  sleep_duration_min INTEGER,
  sleep_score        INTEGER,
  sleep_deep_min     INTEGER,
  sleep_rem_min      INTEGER,
  vo2max             NUMERIC,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date, source)
);

-- Weekly wearable scores
CREATE TABLE IF NOT EXISTS w_scores (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  w_score    NUMERIC(5,2),
  confidence TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- Challenge definitions
CREATE TABLE IF NOT EXISTS challenge_definitions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT UNIQUE NOT NULL,
  title               TEXT NOT NULL,
  description         TEXT,
  challenge_type      TEXT CHECK (challenge_type IN ('streak','personal_best','score_level_up')),
  metric              TEXT,
  threshold_value     NUMERIC,
  target_direction    TEXT CHECK (target_direction IN ('above','below','improve')),
  duration_days       INTEGER,
  grace_days_per_week INTEGER DEFAULT 0,
  requires_wearable   BOOLEAN DEFAULT FALSE,
  tier_required       TEXT DEFAULT 'free',
  is_active           BOOLEAN DEFAULT TRUE
);

-- User challenge enrollments
CREATE TABLE IF NOT EXISTS user_challenges (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id   UUID NOT NULL REFERENCES challenge_definitions(id),
  status         TEXT DEFAULT 'active' CHECK (status IN ('active','completed','abandoned')),
  enrolled_at    TIMESTAMPTZ DEFAULT NOW(),
  completed_at   TIMESTAMPTZ,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0
);

-- Behavior streaks
CREATE TABLE IF NOT EXISTS behavior_streaks (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id   UUID REFERENCES challenge_definitions(id),
  streak_type    TEXT NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_logged_at TIMESTAMPTZ,
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  label            TEXT,
  value            NUMERIC,
  panel_id         UUID REFERENCES panels(id),
  challenge_id     UUID REFERENCES challenge_definitions(id),
  earned_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Terra webhook raw storage
CREATE TABLE IF NOT EXISTS terra_webhooks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terra_user_id TEXT,
  event_type    TEXT,
  payload       JSONB,
  processed     BOOLEAN DEFAULT FALSE,
  received_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier                     TEXT NOT NULL,
  razorpay_subscription_id TEXT,
  razorpay_plan_id         TEXT,
  status                   TEXT DEFAULT 'active',
  current_period_start     TIMESTAMPTZ,
  current_period_end       TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='users_own') THEN
    CREATE POLICY "users_own" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='users_own_insert') THEN
    CREATE POLICY "users_own_insert" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='users_own_update') THEN
    CREATE POLICY "users_own_update" ON users FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;
END $$;

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='waitlist' AND policyname='waitlist_insert_anon') THEN
    CREATE POLICY "waitlist_insert_anon" ON waitlist FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

ALTER TABLE panels ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='panels' AND policyname='panels_own') THEN
    CREATE POLICY "panels_own" ON panels USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE marker_results ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='marker_results' AND policyname='marker_results_own') THEN
    CREATE POLICY "marker_results_own" ON marker_results USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE system_scores ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='system_scores' AND policyname='system_scores_own') THEN
    CREATE POLICY "system_scores_own" ON system_scores USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE domain_scores ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='domain_scores' AND policyname='domain_scores_own') THEN
    CREATE POLICY "domain_scores_own" ON domain_scores USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE panel_scores ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='panel_scores' AND policyname='panel_scores_own') THEN
    CREATE POLICY "panel_scores_own" ON panel_scores USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE supplement_recommendations ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='supplement_recommendations' AND policyname='supplements_own') THEN
    CREATE POLICY "supplements_own" ON supplement_recommendations USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE wearable_connections ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='wearable_connections' AND policyname='wearable_connections_own') THEN
    CREATE POLICY "wearable_connections_own" ON wearable_connections USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE wearable_daily ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='wearable_daily' AND policyname='wearable_daily_own') THEN
    CREATE POLICY "wearable_daily_own" ON wearable_daily USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE w_scores ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='w_scores' AND policyname='w_scores_own') THEN
    CREATE POLICY "w_scores_own" ON w_scores USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='user_challenges' AND policyname='user_challenges_own') THEN
    CREATE POLICY "user_challenges_own" ON user_challenges USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE behavior_streaks ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='behavior_streaks' AND policyname='behavior_streaks_own') THEN
    CREATE POLICY "behavior_streaks_own" ON behavior_streaks USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='achievements' AND policyname='achievements_own') THEN
    CREATE POLICY "achievements_own" ON achievements USING (auth.uid() = user_id);
  END IF;
END $$;

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='subscriptions' AND policyname='subscriptions_own') THEN
    CREATE POLICY "subscriptions_own" ON subscriptions USING (auth.uid() = user_id);
  END IF;
END $$;

-- terra_webhooks: service role only (no user RLS needed for webhook intake)
ALTER TABLE terra_webhooks ENABLE ROW LEVEL SECURITY;
-- challenge_definitions: readable by all authenticated users
ALTER TABLE challenge_definitions ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='challenge_definitions' AND policyname='challenge_definitions_read') THEN
    CREATE POLICY "challenge_definitions_read" ON challenge_definitions FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'users_updated_at') THEN
    CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'panels_updated_at') THEN
    CREATE TRIGGER panels_updated_at BEFORE UPDATE ON panels FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

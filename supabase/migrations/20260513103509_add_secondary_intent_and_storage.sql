/*
  # Add secondary_intent to users + storage bucket for blood reports

  1. Schema changes
    - Add `secondary_intent` column to users table (same CHECK constraint as performance_intent, plus two new values)
    - Supports: longevity, energy, mental_sharpness, athletic_recovery, hormonal_balance, stress_sleep

  2. Storage
    - Create private storage bucket `blood-reports`
    - RLS: authenticated users can upload/read their own files (path starts with their user id)
*/

-- Widen performance_intent to support new values by dropping old CHECK and adding new one
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'secondary_intent'
  ) THEN
    ALTER TABLE users ADD COLUMN secondary_intent TEXT;
  END IF;
END $$;

-- Add CHECK constraints allowing the two new values (drop old constraint first if exists)
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_performance_intent_check;
ALTER TABLE users ADD CONSTRAINT users_performance_intent_check
  CHECK (performance_intent IN ('longevity','energy','mental_sharpness','athletic_recovery','hormonal_balance','stress_sleep'));

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_secondary_intent_check;
ALTER TABLE users ADD CONSTRAINT users_secondary_intent_check
  CHECK (secondary_intent IN ('longevity','energy','mental_sharpness','athletic_recovery','hormonal_balance','stress_sleep'));

-- Storage bucket (insert only if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blood-reports',
  'blood-reports',
  false,
  10485760,
  ARRAY['application/pdf','image/jpeg','image/png','image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: users can manage files under their own user_id prefix
CREATE POLICY "blood_reports_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blood-reports'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "blood_reports_select"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'blood-reports'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "blood_reports_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blood-reports'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

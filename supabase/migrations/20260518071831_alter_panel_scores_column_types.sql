/*
  # Alter panel_scores column types

  1. Changes
    - `cross_marker_rules_active`: cast to TEXT[] to accept string rule names
    - `next_test_date`: cast to TEXT to accept free-form date strings from Claude
*/

ALTER TABLE panel_scores
  ALTER COLUMN cross_marker_rules_active TYPE text[]
  USING cross_marker_rules_active::text[];

ALTER TABLE panel_scores
  ALTER COLUMN next_test_date TYPE text
  USING next_test_date::text;

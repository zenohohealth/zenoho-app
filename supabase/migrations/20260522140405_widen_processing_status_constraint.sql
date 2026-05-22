/*
  # Widen panels.processing_status CHECK constraint

  ## Summary
  Adds 5 new intermediate processing states required by the v2 multi-stage pipeline architecture.

  ## Changes
  - Drops the existing panels_processing_status_check constraint (7 values)
  - Re-creates it with 12 allowed values, adding:
    - analyzing_markers   — Claude is processing markers
    - markers_done        — markers phase complete, awaiting scores
    - analyzing_scores    — Claude is processing scores
    - scores_done         — scores phase complete, awaiting recommendations
    - analyzing_recommendations — Claude is processing supplement recommendations

  ## Before
  pending, processing, text_extracted, analyzing, complete, failed, needs_review

  ## After (12 values)
  pending, processing, text_extracted, analyzing, analyzing_markers, markers_done,
  analyzing_scores, scores_done, analyzing_recommendations, complete, failed, needs_review
*/

ALTER TABLE panels DROP CONSTRAINT IF EXISTS panels_processing_status_check;

ALTER TABLE panels ADD CONSTRAINT panels_processing_status_check
  CHECK (processing_status IN (
    'pending',
    'processing',
    'text_extracted',
    'analyzing',
    'analyzing_markers',
    'markers_done',
    'analyzing_scores',
    'scores_done',
    'analyzing_recommendations',
    'complete',
    'failed',
    'needs_review'
  ));
/*
  # Widen confidence CHECK constraints on domain_scores and system_scores

  ## Summary
  The v1.2 SYSTEM_PROMPT legitimately instructs Claude to emit confidence values
  beyond the original 3-value set (HIGH, MEDIUM, LOW) defined at schema creation.
  This migration widens the constraints on two tables to accept the full vocabulary
  the prompt uses, preventing insert failures on valid analysis output.

  ## Changes

  ### domain_scores.confidence
  - Old constraint: CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW'))
  - New constraint: CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW', 'INSUFFICIENT_COVERAGE', 'PREGNANCY_SUPPRESSED'))
  - INSUFFICIENT_COVERAGE: emitted when <40% of constituent domain markers were tested
  - PREGNANCY_SUPPRESSED: emitted for hormone domains when user is pregnant

  ### system_scores.confidence
  - Old constraint: CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW'))
  - New constraint: CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW', 'SKIP'))
  - SKIP: emitted for a system when 0 markers were tested (excluded from total score)

  ## No other tables, columns, or constraints are modified.
*/

ALTER TABLE domain_scores
  DROP CONSTRAINT IF EXISTS domain_scores_confidence_check;

ALTER TABLE domain_scores
  ADD CONSTRAINT domain_scores_confidence_check
  CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW', 'INSUFFICIENT_COVERAGE', 'PREGNANCY_SUPPRESSED'));

ALTER TABLE system_scores
  DROP CONSTRAINT IF EXISTS system_scores_confidence_check;

ALTER TABLE system_scores
  ADD CONSTRAINT system_scores_confidence_check
  CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW', 'SKIP'));

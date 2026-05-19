# Zenoho Architecture Roadmap: v1 → v2

**Version:** 1.0  
**Date:** May 19, 2026  
**Status:** Living document — update as architectural decisions evolve  
**Owner:** Shashank Arya, Founder, Zenoho Health Private Limited (OPC)

---

## Executive Summary

Zenoho v1.0 is an LLM-assisted clinical decision support platform. PDF blood reports are sent to the Anthropic Claude API with a v1.2 SYSTEM_PROMPT that encodes our supplement framework, marker registry, and SaMD compliance rules. Claude returns structured output (markers, scores, supplement recommendations, safety overrides) which is stored in Supabase and rendered to the user.

This architecture works for alpha testing but is not what Zenoho needs at public launch. LLMs are non-deterministic — the same input can produce different outputs across calls. For a clinical decision support system, that is a structural limitation that must be addressed before claims of clinical reliability can be defended in front of regulators, peer reviewers, or users.

This document outlines the path from v1 (current) to v2 (deterministic rule engine with LLM extraction layer). It captures the architectural patterns we have considered, the recommended phased roadmap, the journal submission posture, and the open questions that still need decisions.

---

## What "Iron-Clad" Means

A clinical decision support system is iron-clad when it satisfies five properties:

1. **Determinism** — Same input produces the same output, every time
2. **Auditability** — Every decision traces to a coded rule firing on specific inputs, not "the AI decided"
3. **Verifiability** — Rules can be tested independently without running the LLM
4. **Versionability** — Rule sets are explicitly versioned, with change history tracked
5. **Defensibility** — In front of journal reviewers, regulators, or lawyers, the exact decision path is showable

v1 satisfies (4) and partially (5). It does not satisfy (1), (2), or (3) by design. This is a property of LLM-driven decision systems generally, not a Zenoho-specific bug.

---

## Current Architecture (v1)

### Pipeline

```
User uploads PDF
  ↓
Supabase Edge Function (process-blood-report)
  ↓
Claude API call with:
  - v1.2 SYSTEM_PROMPT (encoding supplement framework, marker registry, SaMD rules)
  - PDF content as input
  ↓
Claude returns structured JSON
  ↓
Stored in Supabase tables (reports, marker_results, supplement_protocol, domain_scores)
  ↓
User sees report (Overview, Domain Scores, Protocol, Raw Markers tabs)
```

### Components

- **Frontend:** Bolt-built React app, hosted on Bolt webcontainer for alpha
- **Backend:** Supabase Edge Function + Postgres database
- **AI Layer:** Anthropic Claude API
- **System Prompt:** v1.2, approximately 1,150 lines, encodes supplement framework v1.1, marker registry v1.1.5, SaMD compliance v1.0, contraindications, age gates, pregnancy gates, 18–21 conservative mode, tier definitions
- **Specification Documents (`docs/`):**
  - `zenoho_supplement_framework_v1_1_FINAL.md`
  - `zenoho_marker_registry_v1.1.5_FINAL.md`
  - `zenoho_samd_compliance_guidelines_v1_0.md`

### Strengths

- Ships fast — LLM handles OCR, extraction, and interpretation in one pass
- Adapts to unusual report formats across different labs, layouts, terminology
- Encodes substantial clinical logic without writing rule-by-rule code
- Easy to iterate on prompt content during alpha testing

### Limitations (Honest Inventory)

- **Non-determinism:** Same PDF can produce slightly varying outputs across calls. Users could see different recommendations on re-upload of the same report.
- **No deterministic rule enforcement:** The LLM is asked to follow rules; there is no post-output check verifying it did. Edge cases may produce outputs that violate the spec.
- **Weak auditability:** "Why did Claude recommend X?" can only be answered with "because the prompt instructed it to consider doing so" — not with a specific rule firing on specific inputs.
- **Model dependency:** Anthropic could update Claude models in ways that subtly change outputs without notice.
- **Cost variability:** Each report consumes tokens with no caching. Reprocessing the same PDF costs the same as a new analysis.
- **No automated rule-adherence test suite:** There is no regression suite that confirms v1.2 prompt produces correct outputs for a known set of input panels.

---

## Target Architecture (v2)

### Pattern: LLM as Extractor + Deterministic Rule Engine

This is how every production clinical decision support system operates. The LLM is narrowed to one task it is reliably good at — parsing unstructured documents — and a coded rule engine makes all clinical decisions.

```
User uploads PDF
  ↓
Supabase Edge Function
  ↓
Claude API call (narrow extraction task):
  - Extract markers from PDF as structured data only
  - No recommendations, no scoring, no interpretation
  - Output: array of { marker_id, value, unit, confidence }
  ↓
Validation Layer:
  - Verify extracted values against expected formats and ranges
  - Flag low-confidence extractions for human review
  ↓
Deterministic Rule Engine (Python or TypeScript):
  - Inputs: structured markers + user profile (age, sex, medications, conditions, ayurvedic preference, etc.)
  - Applies coded rules from supplement framework, marker registry, SaMD compliance
  - Outputs: scores, supplement recommendations, safety overrides, physician-gates
  ↓
Stored in Supabase
  ↓
User sees report
```

### Why This Is The Right Architecture

- **Determinism:** Same markers plus same profile produce the same recommendations, always
- **Auditability:** Every recommendation traces to a specific coded rule firing on specific input values
- **Verifiability:** Rules are code — testable with unit tests, integration tests, edge-case suites
- **Versionability:** Rule engine versioned alongside spec documents, with diffs visible in version control
- **Defensibility:** Can show reviewers exactly what rule produced what output for any historical report
- **LLM failure mode is safer:** LLM is only doing extraction; its failures (mis-reading a value) are caught by the validation layer, not converted into wrong clinical recommendations

### Trade-Offs

- **Build cost:** Encoding the v1.2 prompt's clinical logic as deterministic code is significant work. Estimated 3–6 weeks of focused build.
- **Less flexibility:** New rules require code changes, not prompt edits. Counter-argument: this is a feature, not a bug, for a medical decision system.
- **Edge-case coverage:** The LLM was implicitly handling edge cases through its general reasoning. The rule engine requires explicit handling of every edge case in code.
- **Extraction limits:** LLM-driven extraction is still LLM-driven — not 100% reliable. The validation layer must be robust.

---

## Migration Patterns

Three patterns considered, in increasing iron-clad-ness and cost.

### Pattern A — Variance Reduction (Days)

Minimal architecture change. Reduces LLM output variability without restructuring the pipeline.

**Tasks:**
- Set Claude API `temperature = 0`
- Implement PDF-hash caching: hash incoming PDF, check cache, return stored result if hit; otherwise call Claude and store the result
- Tag every report row with the exact prompt version it ran under (`prompt_version` column)
- Implement per-user and per-account API rate limits to prevent abuse and cost runaway

**Outcome:** Buys approximately 80% determinism for repeat-identical inputs. Audit trail of which prompt version produced which report. Does not address auditability of individual decisions, verifiability of rules, or edge-case rule violations.

### Pattern B — Validator Layer (Weeks)

LLM continues to make recommendations. A deterministic layer re-checks the output before showing the user.

**Tasks:**
- Build a deterministic post-output validator in Python or TypeScript
- Encode hard-rule checks first: age gates, pregnancy gates, contraindication triggers, the supplement-only-if-trigger-marker-tested constraint
- Wire the validator into the Edge Function flow: Claude output → validator → user response
- Add a `validator_flags` field to the reports table; log every check that fired
- Build a test suite: run the validator against known panels with known expected behavior

**Outcome:** Closes most safety gaps by catching LLM rule violations before users see them. Does not fully solve determinism — the LLM still varies, the validator only catches violations after the fact.

### Pattern C — Full Rule Engine (Months)

LLM is narrowed to extraction only. The rule engine makes all decisions. This is the v2 target architecture described in detail above.

---

## Recommended Roadmap

### Phase 1: v1 Alpha Hardening (Pattern A) — Now

**Goal:** Reduce variance, add audit metadata, enable caching. Ship in days.

**Tasks:**
- Verify `temperature = 0` is set in the Edge Function Claude API call; set it if not
- Implement PDF-hash caching: hash incoming PDF, check cache, return stored result if hit; otherwise call Claude and cache the result
- Add `prompt_version` column to the `reports` table; tag every report with the v1.2 SYSTEM_PROMPT version identifier
- Implement per-user and per-account API rate limits

**Outcome:** Same user re-uploading the same PDF sees the same result. Audit log of which prompt version produced which report. Cost runaway prevented.

### Phase 2: Pre-Public-Launch Validator (Pattern B) — Weeks

**Goal:** Catch LLM rule violations before they reach the user. Ship before any public launch.

**Tasks:**
- Build deterministic post-output validator
- Encode hard-rule checks: age gates, pregnancy gates, contraindication triggers, supplement-trigger-marker constraints
- Wire validator into Edge Function flow
- Add `validator_flags` field to reports table
- Build test suite against known panels with known expected behavior

**Outcome:** Most-likely safety violations caught and corrected before users see them. Auditable trail of validator actions.

### Phase 3: Full Rule Engine (Pattern C) — Months

**Goal:** Production-grade clinical decision support. Required before public-launch claims of clinical reliability.

**Sub-phases:**

1. **Marker Extraction Decoupling**
   - Narrow the Claude prompt to extraction-only output
   - Build the extraction validation layer (format, range, confidence checks)

2. **Rule Engine Build**
   - Encode supplement framework v1.1 as code rules
   - Encode marker registry v1.1.5 as a typed schema
   - Encode SaMD compliance v1.0 as code-enforced output constraints
   - Encode supplement-to-marker trigger mappings as a versioned table

3. **Engine Integration**
   - Replace Claude-driven decision output with engine-driven output
   - Keep Claude only for the extraction step

4. **Test and Verification**
   - Build comprehensive test suite (known panels with known expected outputs)
   - Validate against curated edge-case set (89F, pregnancy, 18–21 conservative mode, multi-condition users, missing markers, etc.)
   - Independent clinical review of rule logic

5. **Deploy**
   - Roll out gradually with A/B testing against the v1 alpha pipeline
   - Monitor for divergence between rule engine output and prior LLM-driven output
   - Investigate every divergence; either fix the engine or accept the divergence as a correction of LLM behavior

**Outcome:** Iron-clad clinical decision support. Defensible to peer reviewers, regulators, lawyers, and users.

---

## Journal Submission Posture

Be transparent. Reviewers respect transparency; they distrust overselling.

### Recommended Framing for Medical India Submission

> "Zenoho v1.0 uses LLM-assisted clinical decision support. A structured SYSTEM_PROMPT encodes the supplement framework, marker registry, and SaMD compliance rules. The current implementation relies on the LLM (Claude) to interpret these rules at runtime. Pattern A safeguards (`temperature = 0`, PDF-hash output caching, prompt version tagging) have been implemented to reduce non-determinism for identical inputs. A deterministic rule engine (Pattern C) is in active development and will be deployed before public clinical use. This architecture and its limitations are described transparently in the supplementary materials."

### Specific Recommendations

- **Do** describe the v1.2 prompt's encoded rules in detail in supplementary materials
- **Do** describe the Pattern A safeguards as implemented
- **Do** describe the v2 architecture roadmap as in development
- **Do** acknowledge non-determinism as a known v1 limitation
- **Do not** claim clinical reliability without Pattern C
- **Do not** describe Zenoho as a Software as Medical Device (it is not; see `zenoho_samd_compliance_guidelines_v1_0.md` for the wellness-not-SaMD positioning)
- **Do not** publish performance metrics on the v1 system as if they were performance metrics on a production system

---

## Open Questions and TODOs

These need decisions before progressing through the roadmap phases.

- **Schema audit (Phase 0):** Confirm the six `userProfile` fields exist in Supabase (`medications`, `diagnoses`, `physician_oversight_flags`, `ayurvedic_preference`, `is_first_trimester_pregnancy`, `profileFlags`). Required for v1.2 prompt features to fire correctly.

- **Gap analysis (Phase 0):** Bolt-generated comparison between the v1.2 prompt's encoded rules and the three spec `.md` documents. Outcome will determine whether v1.2 prompt needs surgical edits before Pattern A work begins.

- **Independent clinical review (before Phase 3):** Bring in a qualified clinical advisor for one structured pass through the science documents and the prompt's encoded rules. Required before public launch. Candidate: Dr. Aastha Bhatia or equivalent.

- **Supplement-marker mapping audit (before Phase 3):** Full clinical audit of every supplement in the library against the 1–62 canonical marker list. Each trigger marker must be (a) clinically defensible and (b) actually present in the canonical list. Required before Pattern C build, since Pattern C encodes these mappings as code.

- **Rule engine language choice (Phase 3 prerequisite):** Python (with FastAPI or similar, deployed separately or via Supabase Functions) vs TypeScript (continuing within the current Supabase Edge Function). Decision pending. Python preferred for clinical computation work; TypeScript preferred for fewer moving parts.

- **Validation suite content (Phase 2 prerequisite):** What is the gold-standard test panel set for Pattern B and Pattern C? Likely 20–50 known panels covering age ranges, sex, panel types (CBC, KFT, LFT, lipid, thyroid, hormone, full), pregnancy, conditions, multi-condition cases, and edge ages (under 18 boundary, 18–21 conservative mode, 75+ elderly override).

- **API key rotation policy:** Currently no formal rotation. Establish before public launch.

- **Data retention policy:** How long are PDF uploads stored? Encrypted at rest? Required for DPDPA compliance before public launch.

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-19 | Roadmap established: A → B → C phased approach | Pattern C alone is too long for v1 alpha. Pattern A unblocks immediate variance issues in days. Pattern B is interim safety before any public-facing usage. Pattern C is required for production clinical claims. |
| 2026-05-19 | Pattern C confirmed as v2 target architecture | Iron-clad property set (determinism, auditability, verifiability, versionability, defensibility) is required for journal submission credibility and regulatory defensibility. LLM-driven decision systems cannot achieve these properties by design. |

---

## Version History

- **v1.0** (2026-05-19) — Initial roadmap. Captured during Zenoho build session with Claude (Opus 4.7). Roadmap formalized from in-conversation strategy discussion.

---

*This is a living document. Update as architectural decisions evolve. Future Claude chats, clinical reviewers, and journal supporting documentation should reference this file as the source of truth on Zenoho's architectural state and direction.*

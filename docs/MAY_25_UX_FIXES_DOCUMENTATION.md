# Zenoho Blood Report Analysis System - May 25 UX Fixes Documentation

## Overview

This document summarizes all changes made on May 25, 2025 to fix 8 UX issues identified during testing. The changes are frontend-only and do not affect the analysis engine.

---

## Executive Summary

| Fix # | Issue | Solution | Files Changed |
|-------|-------|----------|---------------|
| 1 (CRITICAL) | Cross-patient B-Score delta indicator showing wrong comparisons | Removed delta indicator entirely; renamed `BScoreDelta` to `BScoreDisplay` | `ReportsPage.tsx` |
| 2 | "Analyzing X%" pill persists after status=complete/failed | Added polling fallback in `ReportProgressContext` + DB-first hydration on mount | `ReportProgressContext.tsx` |
| 3 | Missing back button on `/reports/processing/{id}` | Added "My Reports" button top-left | `ReportProcessingPage.tsx` |
| 4 | Back button label on detail page | Changed "All Reports" to "Back to My Reports" | `ReportDetailPage.tsx` |
| 5 | Patient name missing on My Reports cards | Added `patient_name_on_report` to query and display | `ReportsPage.tsx` |
| 6 | Patient name missing on report detail page | Added `patient_name_on_report` to header | `ReportDetailPage.tsx` |
| 7 | Loading copy outdated ("1-3 minutes") | Updated to "4-6 minutes — runs in background" | `ReportProcessingPage.tsx`, `AnalysisToastBar.tsx` |
| 8 | INSUFFICIENT_COVERAGE badge shows "Pending physician review" | New label: "Insufficient coverage — retest recommended" | `ReportDetailPage.tsx` |

---

## Detailed Changes

### Fix 1: Cross-Patient B-Score Delta (CRITICAL)

**Problem:**
The My Reports page was showing a delta indicator like "▼ -41.1" comparing HIRA's B-Score (45.0) to Shashank's B-Score (86.1) — fundamentally wrong because these are different patients.

**Root Cause:**
The code was computing `b_score_prev` by taking the previous row in the panels list:
```javascript
// OLD: Gets the next row's score (different patient!)
if (idx < data.length - 1) {
  const { data: prevSc } = await supabase
    .from('panel_scores')
    .select('b_score')
    .eq('panel_id', data[idx + 1].id)  // <-- WRONG: adjacent row = different patient
    .maybeSingle();
  b_score_prev = prevSc?.b_score ?? null;
}
```

**Solution Applied:**
- Removed `b_score_prev` from the `PanelRow` type
- Removed the entire `b_score_prev` fetch logic
- Renamed `BScoreDelta` to `BScoreDisplay` (removed all delta UI)
- Removed unused imports `TrendingUp`, `TrendingDown`

**Result:**
Each panel card now shows only the absolute B-Score (e.g., "45.0 / B-Score") with no comparison arrow.

---

### Fix 2: Stale Analysis Pill After Page Refresh

**Problem:**
The "Analyzing X%" toast pill persisted across page refreshes even when the database showed `complete` or `failed` status. This was caused by:
1. The context reading `localStorage` first and initializing to `processing` before the DB check resolved
2. If realtime missed the final transition, the pill would never update

**Solution Applied:**

#### Part A: DB-First Hydration on Mount
```javascript
// NEW: Query DB as source of truth, NOT localStorage
const { data: inFlight } = await supabase
  .from('panels')
  .select('id, processing_status, processing_error')
  .eq('user_id', user.id)
  .not('processing_status', 'in', '(complete,failed)')
  .order('created_at', { ascending: false })
  .limit(1);

// If no in-flight panels, clear localStorage and stay idle
if (!inFlight || inFlight.length === 0) {
  localStorage.removeItem(STORAGE_KEY);
  setState({ phase: 'idle' });
  return;
}

// Only use localStorage to recover startedAt timestamp for progress accuracy
```

#### Part B: Polling Fallback
Added an 8-second poll that runs in parallel to realtime subscription:
```javascript
pollRef.current = setInterval(async () => {
  const { data } = await supabase
    .from('panels')
    .select('processing_status, processing_error')
    .eq('id', panelId)
    .maybeSingle();
  
  if (data?.processing_status === 'complete') {
    // Transition to complete, cleanup
  } else if (data?.processing_status === 'failed') {
    // Transition to failed, cleanup
  }
  // Otherwise keep polling
}, 8_000);
```

**Result:**
- Hard refresh with all panels in terminal state → pill stays hidden
- Realtime missed events → polling catches it within 8 seconds

---

### Fix 3: Back Button on Processing Page

**Problem:**
`/reports/processing/{id}` had no way to navigate back to the reports list.

**Solution:**
Added a back button at top-left that persists through all states (loading, failed, timed out):
```tsx
<div className="absolute top-4 left-4 z-10">
  <button
    onClick={() => navigate('/reports')}
    className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
  >
    <ArrowLeft size={14} /> My Reports
  </button>
</div>
```

---

### Fix 4: Back Button Label on Detail Page

**Problem:**
The back button said "All Reports" which was confusing.

**Solution:**
```tsx
// BEFORE
<button onClick={() => navigate('/reports')} ...>
  <ArrowLeft size={14} /> All Reports
</button>

// AFTER
<button onClick={() => navigate('/reports')} ...>
  <ArrowLeft size={14} /> Back to My Reports
</button>
```

---

### Fix 5: Patient Name on My Reports Cards

**Problem:**
The `patient_name_on_report` column existed in the database but was not displayed anywhere in the UI.

**Solution:**
1. Added `patient_name_on_report` to the `PanelRow` type
2. Updated the panels query to fetch this column
3. Display it below the lab name:
```tsx
{p.patient_name_on_report && (
  <div className="text-xs text-[#94A3B8] font-medium mb-0.5">
    {p.patient_name_on_report}
  </div>
)}
```

---

### Fix 6: Patient Name on Report Detail Page

**Problem:**
Same as Fix 5 — patient name not shown in the detail page header.

**Solution:**
1. Added `patient_name_on_report` to the `Panel` type
2. Updated the panel query to fetch it
3. Display in header next to date:
```tsx
<div className="flex items-center gap-2 mt-0.5 flex-wrap">
  {panel.patient_name_on_report && (
    <span className="text-sm font-medium text-[#94A3B8]">
      {panel.patient_name_on_report}
    </span>
  )}
  {panel.patient_name_on_report && <span className="text-[#334155]">·</span>}
  <span className="text-[#64748B] text-sm">{formatDate(panel.collected_on)}</span>
</div>
```

---

### Fix 7: Loading Copy Update

**Problem:**
The loading time expectation was outdated ("1-3 minutes" / "30-60 seconds") but the v2 pipeline takes 4-6 minutes.

**Solution:**
Updated copy in two places:

**ReportProcessingPage.tsx:**
```tsx
// BEFORE
<p className="text-[#64748B] text-sm leading-relaxed">
  Usually takes 30–60 seconds. Please don't close this tab.
</p>

// AFTER
<p className="text-[#64748B] text-sm leading-relaxed">
  Usually takes 4–6 minutes — runs in background.
</p>
```

**AnalysisToastBar.tsx:**
```tsx
// BEFORE
<span className="text-[10px] text-[#475569] leading-none">
  Usually takes 1-3 minutes. Runs in background.
</span>

// AFTER
<span className="text-[10px] text-[#475569] leading-none">
  Usually takes 4-6 minutes — runs in background.
</span>
```

Also updated the timeout from 3 minutes to 8 minutes:
```typescript
const TIMEOUT_MS = 8 * 60 * 1000; // 8 minutes (pipeline can take 4-6 min)
```

---

### Fix 8: INSUFFICIENT_COVERAGE Badge Label

**Problem:**
When `confidence === 'INSUFFICIENT_COVERAGE'`, the badge was showing generic confidence level text or "Pending physician review" which didn't convey the actual issue.

**Solution:**
Updated `ConfidenceBadge` component and `TabDomains` to handle this case specially:

```tsx
function ConfidenceBadge({ level }: { level: string | null }) {
  if (!level) return null;
  if (level === 'INSUFFICIENT_COVERAGE') {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-[#F59E0B] bg-[#F59E0B]/10">
        Insufficient coverage — retest recommended
      </span>
    );
  }
  // ... rest of confidence levels (HIGH, MEDIUM, LOW)
}
```

And in `TabDomains` for safety-active mode:
```tsx
{d.confidence === 'INSUFFICIENT_COVERAGE'
  ? <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">
      Insufficient coverage — retest recommended
    </span>
  : <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">
      Pending physician review
    </span>
}
```

**Note:** `LOW` confidence still shows the `LOW` badge — only `INSUFFICIENT_COVERAGE` gets the special label.

---

## System Architecture

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Upload PDF    │────▶│  Edge Function  │────▶│  Analysis Engine │
│ (ReportUpload)  │     │ (extract-pdf)   │     │ (Claude API)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   My Reports    │◀────│  Supabase DB    │◀────│  Stage Tables    │
│  (ReportsPage)  │     │  (panels, etc)  │     │ (panel_scores,   │
└─────────────────┘     └─────────────────┘     │  domain_scores,  │
                        │         ▲              │  marker_results, │
                        │         │              │  supplements)   │
                        │         │ realtime     └─────────────────┘
                        │         │ updates
                ┌───────┴─────────┴───────┐
                │ ReportProgressContext  │
                │ (tracks processing)     │
                └───────────────────────┘
```

### Processing Status Pipeline (v2)

```
pending → text_extracted → markers_done → analyzing_scores → scores_done → analyzing_recommendations → complete
    │                                                                                               │
    └─────────────────────────────────────────────▶ failed ◀───────────────────────────────────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `ReportsPage.tsx` | Lists all user panels; shows B-Score, patient name, bio age gap |
| `ReportDetailPage.tsx` | Full report view with 4 tabs: Overview, Domains, Protocol, Markers |
| `ReportProcessingPage.tsx` | Loading screen while panel is being analyzed |
| `ReportProgressContext.tsx` | Global state for tracking in-progress analysis (pill/toast) |
| `AnalysisToastBar.tsx` | The "Analyzing X%" pill that appears top-right during processing |

---

## Database Schema (Relevant Columns)

```sql
-- panels table
CREATE TABLE panels (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  lab_name TEXT,
  patient_name_on_report TEXT,  -- Added in May 25 fixes for display
  collected_on DATE,
  processing_status TEXT CHECK (processing_status IN (
    'pending', 'text_extracted', 'markers_done', 
    'analyzing_scores', 'scores_done', 'analyzing_recommendations',
    'complete', 'failed'
  )),
  processing_error TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- panel_scores table (B-Score, bio age)
CREATE TABLE panel_scores (
  id UUID PRIMARY KEY,
  panel_id UUID REFERENCES panels(id),
  b_score NUMERIC(5,2),
  b_score_confidence TEXT CHECK (b_score_confidence IN ('HIGH', 'MEDIUM', 'LOW', 'INSUFFICIENT_COVERAGE')),
  bio_age_estimated INTEGER,
  bio_age_chronological INTEGER,
  bio_age_gap INTEGER,
  bio_age_confidence TEXT,
  top_lever TEXT,
  next_test_date DATE,
  safety_overrides_active BOOLEAN DEFAULT FALSE
);

-- domain_scores table
CREATE TABLE domain_scores (
  id UUID PRIMARY KEY,
  panel_id UUID REFERENCES panels(id),
  domain_id INTEGER,
  domain_name TEXT,
  raw_score NUMERIC(5,2),
  level INTEGER,
  confidence TEXT CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW', 'INSUFFICIENT_COVERAGE'))
);
```

---

## Testing Checklist

After deploying these changes, verify:

- [ ] **HIRA JAIN's panel** (`b590a35d-f403-404c-b9da-6d249a5ff5fe`)
  - Shows patient name "HIRA JAIN" on card
  - No delta indicator shown
  - "Insufficient coverage" label on appropriate domains

- [ ] **Shashank's HOD panel** (`0e11504b-2948-4855-825e-5012132550e3`)
  - Shows patient name
  - All domain scores visible

- [ ] **Fresh upload test**
  - Back button works on processing page
  - Pill disappears on completion (no stale state after refresh)
  - Loading copy shows "4-6 minutes"

---

## Build Verification

All changes pass TypeScript compilation:
```
✓ 1566 modules transformed
✓ built in ~3-4 seconds
```

No runtime errors expected. All fixes are backward-compatible with existing data.

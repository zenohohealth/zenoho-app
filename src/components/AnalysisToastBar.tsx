import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { useReportProgress } from '../context/ReportProgressContext';
import { useRouter } from '../hooks/useRouter';

const AUTO_DISMISS_MS = 30_000;

function useElapsedProgress(startedAt: number | null): number {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (startedAt === null) { setPct(0); return; }

    function calc() {
      const elapsed = (Date.now() - startedAt!) / 1000;
      let p: number;
      if (elapsed <= 30)       p = (elapsed / 30) * 25;
      else if (elapsed <= 60)  p = 25 + ((elapsed - 30) / 30) * 30;
      else if (elapsed <= 120) p = 55 + ((elapsed - 60) / 60) * 35;
      else                     p = 95;
      setPct(Math.min(p, 95));
    }

    calc();
    const id = setInterval(calc, 500);
    return () => clearInterval(id);
  }, [startedAt]);

  return pct;
}

export function AnalysisToastBar() {
  const { state, dismiss, startTracking } = useReportProgress();
  const { navigate } = useRouter();
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startedAt = state.phase === 'processing' ? state.startedAt : null;
  const pct = useElapsedProgress(startedAt);

  // Auto-dismiss on complete after 30s
  useEffect(() => {
    if (state.phase === 'complete') {
      dismissTimerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);
    }
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [state.phase, dismiss]);

  if (state.phase === 'idle') return null;

  // ── Processing ──────────────────────────────────────────────────────────────
  if (state.phase === 'processing') {
    return (
      <div className="w-full bg-[#0F2040] border-b border-[#00E5CC]/20 relative overflow-hidden">
        {/* Animated progress fill */}
        <div
          className="absolute inset-0 bg-[#00E5CC]/[0.06] transition-all duration-700 ease-out origin-left"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
        <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5CC] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5CC]" />
            </span>
            <span className="text-xs font-medium text-[#94A3B8]">
              Analysing your report
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#00E5CC]">{Math.round(pct)}%</span>
            <div className="w-24 h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00E5CC] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Complete ─────────────────────────────────────────────────────────────────
  if (state.phase === 'complete') {
    const { panelId } = state;
    return (
      <div className="w-full bg-[#10B981]/10 border-b border-[#10B981]/30">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={14} className="text-[#10B981] flex-shrink-0" />
            <span className="text-xs font-medium text-[#10B981]">Report ready</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { dismiss(); navigate(`/reports/${panelId}`); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-white bg-[#10B981]/15 hover:bg-[#10B981]/25 px-3 py-1 rounded-lg transition-all duration-200"
            >
              <ExternalLink size={11} /> View report
            </button>
            <button
              onClick={dismiss}
              className="text-[#64748B] hover:text-white transition-colors p-1 rounded"
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Failed ───────────────────────────────────────────────────────────────────
  if (state.phase === 'failed') {
    const { panelId, rawError } = state;
    return (
      <div className="w-full bg-[#EF4444]/10 border-b border-[#EF4444]/25">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between h-auto min-h-9 py-1.5 gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <AlertCircle size={14} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-[#EF4444] leading-tight">
              Analysis failed: {rawError}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => { dismiss(); navigate('/reports/upload'); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#EF4444] hover:text-white bg-[#EF4444]/15 hover:bg-[#EF4444]/25 px-3 py-1 rounded-lg transition-all duration-200"
            >
              <RefreshCw size={11} /> Retry
            </button>
            <button
              onClick={dismiss}
              className="text-[#64748B] hover:text-white transition-colors p-1 rounded"
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

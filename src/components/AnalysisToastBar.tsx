import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Loader2 } from 'lucide-react';
import { useReportProgress } from '../context/ReportProgressContext';
import { useRouter } from '../hooks/useRouter';

const AUTO_DISMISS_MS = 30_000;

export function useElapsedProgress(startedAt: number | null): number {
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
  const { state, dismiss } = useReportProgress();
  const { navigate } = useRouter();
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startedAt = state.phase === 'processing' ? state.startedAt : null;
  const pct = useElapsedProgress(startedAt);

  // Auto-dismiss complete state after 30s
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
      <div className="fixed top-[calc(3.5rem+12px)] right-4 z-50 animate-fade-in">
        <div className="flex flex-col gap-1.5 bg-[#0F2040]/95 backdrop-blur-md border border-[#00E5CC]/25 rounded-2xl pl-3 pr-4 py-2.5 shadow-xl shadow-black/40 min-w-[220px]">
          {/* Top row */}
          <div className="flex items-center gap-2.5">
            {/* Spinner */}
            <Loader2 size={14} className="text-[#00E5CC] animate-spin flex-shrink-0" />
            {/* Text */}
            <span className="text-xs font-medium text-[#94A3B8] flex-1 whitespace-nowrap">Analyzing</span>
            {/* Percentage */}
            <span className="text-xs font-mono font-semibold text-[#00E5CC] tabular-nums">
              {Math.round(pct)}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00E5CC] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* Helper text */}
          <span className="text-[10px] text-[#475569] leading-none">Usually takes 4-6 minutes — runs in background.</span>
        </div>
      </div>
    );
  }

  // ── Complete ─────────────────────────────────────────────────────────────────
  if (state.phase === 'complete') {
    const { panelId } = state;
    return (
      <div className="fixed top-[calc(3.5rem+12px)] right-4 z-50 animate-fade-in">
        <div className="flex items-center gap-2 bg-[#0A2A1E]/95 backdrop-blur-md border border-[#10B981]/30 rounded-full pl-3 pr-2 py-1.5 shadow-xl shadow-black/40">
          <CheckCircle2 size={13} className="text-[#10B981] flex-shrink-0" />
          <span className="text-xs font-medium text-[#10B981] whitespace-nowrap">Report ready</span>
          <button
            onClick={() => { dismiss(); navigate(`/reports/${panelId}`); }}
            className="flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 hover:bg-[#10B981]/25 px-2.5 py-1 rounded-full transition-all duration-200 ml-1"
          >
            <ExternalLink size={10} /> View
          </button>
          <button onClick={dismiss} className="text-[#64748B] hover:text-white transition-colors p-1 rounded-full" aria-label="Dismiss">
            <X size={11} />
          </button>
        </div>
      </div>
    );
  }

  // ── Failed ───────────────────────────────────────────────────────────────────
  if (state.phase === 'failed') {
    const { rawError } = state;
    return (
      <div className="fixed top-[calc(3.5rem+12px)] right-4 z-50 animate-fade-in max-w-[280px]">
        <div className="bg-[#2A0A0A]/95 backdrop-blur-md border border-[#EF4444]/30 rounded-2xl p-3 shadow-xl shadow-black/40">
          {/* Top row */}
          <div className="flex items-start gap-2 mb-2.5">
            <AlertCircle size={13} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-[#EF4444] leading-snug flex-1">{rawError}</p>
            <button onClick={dismiss} className="text-[#64748B] hover:text-white transition-colors p-0.5 rounded flex-shrink-0" aria-label="Dismiss">
              <X size={11} />
            </button>
          </div>
          {/* Action row */}
          <div className="flex gap-2 pl-5">
            <button
              onClick={() => { dismiss(); navigate('/reports/upload'); }}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-[#EF4444] bg-[#EF4444]/15 hover:bg-[#EF4444]/25 px-2.5 py-1 rounded-full transition-all duration-200"
            >
              <RefreshCw size={9} /> Retry
            </button>
            <button
              onClick={dismiss}
              className="text-[10px] font-medium text-[#64748B] hover:text-white px-2.5 py-1 rounded-full transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

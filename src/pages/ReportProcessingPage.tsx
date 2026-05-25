import { useEffect, useState, useRef } from 'react';
import { X, Loader2, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';
import { Logo } from '../components/Logo';

const STATUS_MESSAGES = [
  'Reading your report...',
  'Scoring your biomarkers...',
  'Calculating your Performance Domains...',
  'Checking cross-marker rules...',
  'Building your supplement protocol...',
];

const POLL_INTERVAL_MS = 3000;
const TIMEOUT_MS = 8 * 60 * 1000; // 8 minutes (pipeline can take 4-6 min)

// ─── B-Score Count-up Screen ──────────────────────────────────────────────────

function BScoreReveal({ score, panelId }: { score: number; panelId: string }) {
  const [displayed, setDisplayed] = useState(0);
  const { navigate } = useRouter();

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayed(score);
        clearInterval(timer);
        setTimeout(() => navigate(`/reports/${panelId}`), 600);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score, panelId]);

  const color = score >= 75 ? '#10B981' : score >= 50 ? '#00E5CC' : score >= 30 ? '#F59E0B' : '#EF4444';

  return (
    <div className="fixed inset-0 bg-[#0D1B35] flex flex-col items-center justify-center z-50 animate-fade-in">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${color}08` }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <Logo size="md" />
        <div className="mt-10 mb-3">
          <span className="font-mono font-bold text-8xl" style={{ color }}>{displayed}</span>
        </div>
        <div className="text-[#94A3B8] text-sm uppercase tracking-widest">B-Score</div>
        <p className="text-[#64748B] text-xs mt-4">Opening your report...</p>
      </div>
    </div>
  );
}

// ─── Processing Page ──────────────────────────────────────────────────────────

export function ReportProcessingPage({ panelId }: { panelId: string }) {
  const { navigate } = useRouter();
  const [msgIdx, setMsgIdx] = useState(0);
  const [dots, setDots] = useState('');
  const [failed, setFailed] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [revealScore, setRevealScore] = useState<number | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dotsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  async function triggerEdgeFunction() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${supabaseUrl}/functions/v1/extract-pdf-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token ?? anonKey}`,
        'Apikey': anonKey,
      },
      body: JSON.stringify({ panel_id: panelId }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Edge function error:', err);
    }
  }

  function stopTimers() {
    if (pollRef.current) clearInterval(pollRef.current);
    if (msgRef.current) clearInterval(msgRef.current);
    if (dotsRef.current) clearInterval(dotsRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  function startPolling() {
    startTimeRef.current = Date.now();

    pollRef.current = setInterval(async () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= TIMEOUT_MS) {
        stopTimers();
        setTimedOut(true);
        return;
      }

      const { data } = await supabase
        .from('panels')
        .select('processing_status, processing_error')
        .eq('id', panelId)
        .maybeSingle();

      if (data?.processing_status === 'complete') {
        stopTimers();
        const { data: ps } = await supabase
          .from('panel_scores')
          .select('b_score')
          .eq('panel_id', panelId)
          .maybeSingle();
        setRevealScore(ps?.b_score ?? 0);
      } else if (data?.processing_status === 'failed') {
        stopTimers();
        setProcessingError(data.processing_error ?? null);
        setFailed(true);
      }
    }, POLL_INTERVAL_MS);
  }

  useEffect(() => {
    triggerEdgeFunction();
    startPolling();

    msgRef.current = setInterval(() => {
      setMsgIdx(i => (i + 1) % STATUS_MESSAGES.length);
    }, 3000);

    dotsRef.current = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);

    return stopTimers;
  }, []);

  async function handleRetry() {
    setRetrying(true);
    setFailed(false);
    setTimedOut(false);
    setProcessingError(null);
    await supabase.from('panels').update({ processing_status: 'pending', processing_error: null }).eq('id', panelId);
    await triggerEdgeFunction();
    startPolling();

    msgRef.current = setInterval(() => {
      setMsgIdx(i => (i + 1) % STATUS_MESSAGES.length);
    }, 3000);
    dotsRef.current = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);

    setRetrying(false);
  }

  if (revealScore !== null) {
    return <BScoreReveal score={revealScore} panelId={panelId} />;
  }

  return (
    <div className="fixed inset-0 bg-[#0D1B35] flex flex-col z-50">
      {/* Back button — top-left */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
        >
          <ArrowLeft size={14} /> My Reports
        </button>
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00E5CC]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center max-w-sm px-6 mx-auto">
        <div className="mb-10" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
          <Logo size="lg" />
        </div>

        {failed ? (
          <>
            <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
              <X size={22} className="text-[#EF4444]" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Analysis failed</h2>
            <p className="text-[#94A3B8] text-sm mb-3 leading-relaxed">
              Something went wrong analysing your report. Please try again.
            </p>
            {processingError && (
              <pre className="w-full text-left text-xs text-[#EF4444] bg-[#EF4444]/[0.07] border border-[#EF4444]/20 rounded-lg px-3 py-2.5 mb-4 whitespace-pre-wrap break-all font-mono leading-relaxed">
                {processingError}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button onClick={() => navigate('/reports')} className="btn-ghost text-sm flex-1">
                Back to Reports
              </button>
              <button onClick={handleRetry} disabled={retrying} className="btn-primary flex items-center justify-center gap-2 text-sm flex-1">
                {retrying ? <Loader2 size={14} className="animate-spin" /> : null}
                Retry Analysis
              </button>
            </div>
          </>
        ) : timedOut ? (
          <>
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-4">
              <Clock size={22} className="text-[#F59E0B]" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">This is taking longer than usual</h2>
            <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
              You can wait or come back — we'll notify you when it's ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button onClick={() => navigate('/reports')} className="btn-ghost text-sm flex-1">
                Back to Reports
              </button>
              <button onClick={handleRetry} disabled={retrying} className="btn-primary flex items-center justify-center gap-2 text-sm flex-1">
                {retrying ? <Loader2 size={14} className="animate-spin" /> : null}
                Keep Waiting
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full border-2 border-[#00E5CC]/20 border-t-[#00E5CC] animate-spin mb-8" />
            <p className="text-white font-semibold text-lg mb-2 transition-all duration-500">
              {STATUS_MESSAGES[msgIdx]}{dots}
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Usually takes 4–6 minutes — runs in background.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

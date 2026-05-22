import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export type AnalysisState =
  | { phase: 'idle' }
  | { phase: 'processing'; panelId: string; startedAt: number }
  | { phase: 'complete'; panelId: string }
  | { phase: 'failed'; panelId: string; rawError: string };

type ContextType = {
  state: AnalysisState;
  startTracking: (panelId: string) => void;
  dismiss: () => void;
};

const Ctx = createContext<ContextType>({
  state: { phase: 'idle' },
  startTracking: () => {},
  dismiss: () => {},
});

const STORAGE_KEY = 'zenoho_analysis_panel_id';
const WATCHDOG_MS = 5 * 60 * 1000; // 5 minutes

function mapErrorToFriendly(raw: string): string {
  if (!raw) return 'Something went wrong. Please try again.';
  const r = raw.toLowerCase();
  if (r.includes('duplicate key') || r.includes('unique constraint')) {
    return 'Could not save report. Please try again.';
  }
  if (r.includes('check constraint') || r.includes('violates')) {
    return 'Report data unexpected. Please contact support.';
  }
  if (r.includes('timeout') || r.includes('timed out') || r.includes('4-minute')) {
    return 'Analysis took too long. Please try again.';
  }
  if (r.includes('not_found_error') || r.includes('model')) {
    return 'Analysis service temporarily unavailable. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}

export function ReportProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<AnalysisState>({ phase: 'idle' });
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearWatchdog() {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  }

  // Arm the 5-minute watchdog. Respects elapsed time so page-reload resumes
  // correctly rather than resetting the clock.
  const armWatchdog = useCallback((panelId: string, startedAt: number) => {
    clearWatchdog();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(WATCHDOG_MS - elapsed, 0);

    watchdogRef.current = setTimeout(async () => {
      // Re-check DB status before writing — avoid stomping a completed panel
      const { data } = await supabase
        .from('panels')
        .select('processing_status')
        .eq('id', panelId)
        .maybeSingle();

      if (data?.processing_status === 'processing' || data?.processing_status === 'pending') {
        await supabase.from('panels').update({
          processing_status: 'failed',
          processing_error: 'Analysis took longer than expected. Please try again.',
        }).eq('id', panelId);
        // The realtime subscription picks up the DB change and morphs state to 'failed'.
        // Clean up here in case realtime is slow.
        localStorage.removeItem(STORAGE_KEY);
        clearWatchdog();
        if (channelRef.current) {
          supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }
      }
    }, remaining);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function subscribe(panelId: string, startedAt: number) {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const ch = supabase
      .channel(`panel-progress-${panelId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'panels',
          filter: `id=eq.${panelId}`,
        },
        (payload) => {
          const row = payload.new as { processing_status: string; processing_error: string | null };
          if (row.processing_status === 'complete') {
            clearWatchdog();
            setState({ phase: 'complete', panelId });
            localStorage.removeItem(STORAGE_KEY);
            supabase.removeChannel(ch);
          } else if (row.processing_status === 'failed') {
            clearWatchdog();
            setState({
              phase: 'failed',
              panelId,
              rawError: mapErrorToFriendly(row.processing_error ?? ''),
            });
            localStorage.removeItem(STORAGE_KEY);
            supabase.removeChannel(ch);
          }
          // pending/processing — keep showing progress
        }
      )
      .subscribe();

    channelRef.current = ch;
    setState({ phase: 'processing', panelId, startedAt });
    armWatchdog(panelId, startedAt);
  }

  function startTracking(panelId: string) {
    const startedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ panelId, startedAt }));
    subscribe(panelId, startedAt);
  }

  function dismiss() {
    localStorage.removeItem(STORAGE_KEY);
    clearWatchdog();
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setState({ phase: 'idle' });
  }

  // On mount: restore any in-flight panel from localStorage and check its current status
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    let parsed: { panelId: string; startedAt: number };
    try {
      parsed = JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const { panelId, startedAt } = parsed;

    supabase
      .from('panels')
      .select('processing_status, processing_error')
      .eq('id', panelId)
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }
        if (data.processing_status === 'complete') {
          setState({ phase: 'complete', panelId });
          localStorage.removeItem(STORAGE_KEY);
        } else if (data.processing_status === 'failed') {
          setState({
            phase: 'failed',
            panelId,
            rawError: mapErrorToFriendly(data.processing_error ?? ''),
          });
          localStorage.removeItem(STORAGE_KEY);
        } else {
          // Still in flight — subscribe and arm watchdog (elapsed time accounted for)
          subscribe(panelId, startedAt);
        }
      });

    return () => {
      clearWatchdog();
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Ctx.Provider value={{ state, startTracking, dismiss }}>
      {children}
    </Ctx.Provider>
  );
}

export function useReportProgress() {
  return useContext(Ctx);
}

import { useEffect, useState, useCallback } from 'react';
import {
  Upload, ArrowRight, Clock, CheckCircle2, AlertCircle,
  Search, Trash2, X, Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';
import { useReportProgress } from '../context/ReportProgressContext';
import { useElapsedProgress } from '../components/AnalysisToastBar';

type PanelRow = {
  id: string;
  lab_name: string | null;
  patient_name_on_report: string | null;
  collected_on: string;
  registered_at: string | null;
  created_at: string | null;
  processing_status: string;
  b_score: number | null;
  bio_age_gap: number | null;
};

// ── StatusBadge ───────────────────────────────────────────────────────────────

function StatusBadge({ status, pct }: { status: string; pct?: number }) {
  if (status === 'complete') return null;
  const isAnalysing = status === 'pending' || status === 'processing';
  const label = isAnalysing && pct !== undefined
    ? `Analysing... ${Math.round(pct)}%`
    : isAnalysing ? 'Analysing...'
    : status === 'failed' ? 'Failed'
    : 'Review';
  const cls = status === 'failed'
    ? 'text-[#EF4444] bg-[#EF4444]/10'
    : 'text-[#F59E0B] bg-[#F59E0B]/10';
  const icon = status === 'failed' ? <AlertCircle size={11} /> : <Clock size={11} />;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${cls}`}>
      {icon}{label}
    </span>
  );
}

// ── BScoreDisplay ─────────────────────────────────────────────────────────────

function BScoreDisplay({ current }: { current: number | null }) {
  if (current === null) return null;
  return (
    <div className="text-right">
      <div className="font-mono font-bold text-lg text-white">{current.toFixed(1)}</div>
      <div className="text-[10px] text-[#64748B]">B-Score</div>
    </div>
  );
}

// ── DeleteModal ───────────────────────────────────────────────────────────────

function DeleteModal({
  onConfirm,
  onCancel,
  deleting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="card p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
            <Trash2 size={18} className="text-[#EF4444]" />
          </div>
          <button onClick={onCancel} className="text-[#64748B] hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <h3 className="font-semibold text-white mb-1.5">Delete this report?</h3>
        <p className="text-sm text-[#94A3B8] mb-5 leading-relaxed">
          This will permanently remove the report and all its analysis data. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={deleting} className="btn-secondary flex-1 text-sm py-2.5">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 text-sm py-2.5 bg-[#EF4444] text-white font-semibold rounded-xl hover:bg-[#DC2626] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {deleting ? <><Loader2 size={14} className="animate-spin" /> Deleting...</> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-[#0F2040] border border-white/[0.12] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2">
        <CheckCircle2 size={15} className="text-[#10B981]" />
        {message}
      </div>
    </div>
  );
}

// ── deletePanel ───────────────────────────────────────────────────────────────

async function deletePanel(panelId: string) {
  await supabase.from('supplement_recommendations').delete().eq('panel_id', panelId);
  await supabase.from('achievements').delete().eq('panel_id', panelId);
  await supabase.from('domain_scores').delete().eq('panel_id', panelId);
  await supabase.from('system_scores').delete().eq('panel_id', panelId);
  await supabase.from('marker_results').delete().eq('panel_id', panelId);
  await supabase.from('panel_scores').delete().eq('panel_id', panelId);

  const { data: panel } = await supabase
    .from('panels')
    .select('raw_pdf_path')
    .eq('id', panelId)
    .maybeSingle();

  await supabase.from('panels').delete().eq('id', panelId);

  if (panel?.raw_pdf_path) {
    await supabase.storage.from('blood-reports').remove([panel.raw_pdf_path]);
  }
}

// ── PanelCard ─────────────────────────────────────────────────────────────────

function PanelCard({
  p,
  trackingStartedAt,
  onRowClick,
  onDelete,
}: {
  p: PanelRow;
  trackingStartedAt: number | null;
  onRowClick: (p: PanelRow) => void;
  onDelete: (id: string) => void;
}) {
  const pct = useElapsedProgress(trackingStartedAt);
  const isAnalysing = p.processing_status === 'pending' || p.processing_status === 'processing';

  return (
    <div className="card p-5 flex items-center gap-4 hover:border-white/15 transition-all duration-200 group relative overflow-hidden">
      {/* Clickable content */}
      <div
        className="flex-1 min-w-0 cursor-pointer flex items-center gap-4"
        onClick={() => onRowClick(p)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="font-medium text-white">{p.lab_name || 'Blood Report'}</span>
            <StatusBadge
              status={p.processing_status}
              pct={isAnalysing && trackingStartedAt !== null ? pct : undefined}
            />
          </div>
          {p.patient_name_on_report && (
            <div className="text-xs text-[#94A3B8] font-medium mb-0.5">{p.patient_name_on_report}</div>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#64748B]">
            {(p.registered_at || p.created_at) && (
              <span>Uploaded: {formatDateTime(p.registered_at ?? p.created_at!)}</span>
            )}
            <span>Test date: {formatTestDate(p.collected_on)}</span>
            {p.bio_age_gap !== null && (
              <span className={`font-medium ${p.bio_age_gap <= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                Bio age: {p.bio_age_gap <= 0 ? `${Math.abs(p.bio_age_gap)}y younger` : `${p.bio_age_gap}y older`}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <BScoreDisplay current={p.b_score} />
          <ArrowRight size={15} className="text-[#64748B] group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={e => { e.stopPropagation(); onDelete(p.id); }}
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete report"
      >
        <Trash2 size={14} />
      </button>

      {/* Per-card teal progress bar — only while this panel is being tracked */}
      {isAnalysing && trackingStartedAt !== null && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/[0.06]">
          <div
            className="h-full bg-[#00E5CC] transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ── ReportsPage ───────────────────────────────────────────────────────────────

export function ReportsPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const { state: progressState } = useReportProgress();
  const [panels, setPanels] = useState<PanelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('panels')
      .select('id, lab_name, patient_name_on_report, collected_on, registered_at, created_at, processing_status')
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false, nullsFirst: false });

    if (data) {
      const enriched: PanelRow[] = await Promise.all(
        data.map(async (p) => {
          const { data: sc } = await supabase
            .from('panel_scores')
            .select('b_score, bio_age_gap')
            .eq('panel_id', p.id)
            .maybeSingle();

          return {
            ...p,
            b_score: sc?.b_score ?? null,
            bio_age_gap: sc?.bio_age_gap ?? null,
          };
        })
      );
      setPanels(enriched);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deletePanel(deleteTarget);
      setToast('Report deleted');
      setDeleteTarget(null);
      await load();
    } catch {
      setToast('Delete failed. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  function handleRowClick(p: PanelRow) {
    if (p.processing_status === 'pending' || p.processing_status === 'processing') {
      navigate(`/reports/processing/${p.id}`);
    } else {
      navigate(`/reports/${p.id}`);
    }
  }

  const filtered = panels.filter(p =>
    !search || (p.lab_name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Reports</h1>
          <p className="text-[#94A3B8] text-sm mt-1">All your performance scans, newest first</p>
        </div>
        <button onClick={() => navigate('/reports/upload')} className="btn-primary flex items-center gap-2 text-sm">
          <Upload size={15} /> Upload Report
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
        <input
          className="input pl-9 text-sm"
          placeholder="Search by lab name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="card h-20 animate-pulse opacity-40" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center border-dashed border-2 border-white/[0.08]">
          <div className="w-14 h-14 rounded-2xl bg-[#00E5CC]/10 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-[#00E5CC]" />
          </div>
          <h3 className="font-semibold text-white mb-2">{search ? 'No reports found' : 'No reports yet'}</h3>
          <p className="text-[#94A3B8] text-sm mb-5 max-w-xs mx-auto">
            {search
              ? 'Try a different search term.'
              : 'Upload your first blood report to get your B-Score, domain scores, and supplement protocol.'}
          </p>
          {!search && (
            <button onClick={() => navigate('/reports/upload')} className="btn-primary inline-flex items-center gap-2 text-sm">
              <Upload size={15} /> Upload Report
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(p => {
            const isThisCardTracked =
              progressState.phase === 'processing' && progressState.panelId === p.id;
            return (
              <PanelCard
                key={p.id}
                p={p}
                trackingStartedAt={isThisCardTracked ? (progressState as { phase: 'processing'; panelId: string; startedAt: number }).startedAt : null}
                onRowClick={handleRowClick}
                onDelete={id => setDeleteTarget(id)}
              />
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatTestDate(d: string): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

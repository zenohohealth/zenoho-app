import { useEffect, useState, useCallback } from 'react';
import {
  Upload, ArrowRight, Clock, CheckCircle2, AlertCircle,
  TrendingUp, TrendingDown, Search, Trash2, X, Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

type PanelRow = {
  id: string;
  lab_name: string | null;
  collected_on: string;
  registered_at: string | null;
  created_at: string | null;
  processing_status: string;
  b_score: number | null;
  b_score_prev: number | null;
  bio_age_gap: number | null;
};

function StatusBadge({ status }: { status: string }) {
  if (status === 'complete') return null;
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    pending:      { label: 'Analysing...', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <Clock size={11} /> },
    processing:   { label: 'Analysing...', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <Clock size={11} /> },
    failed:       { label: 'Failed',        cls: 'text-[#EF4444] bg-[#EF4444]/10', icon: <AlertCircle size={11} /> },
    needs_review: { label: 'Review',        cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <AlertCircle size={11} /> },
  };
  const s = map[status] ?? map['pending'];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.cls}`}>
      {s.icon}{s.label}
    </span>
  );
}

function BScoreDelta({ current, prev }: { current: number | null; prev: number | null }) {
  if (current === null) return null;
  const delta = prev !== null ? current - prev : null;
  return (
    <div className="text-right">
      <div className="font-mono font-bold text-lg text-white">{current.toFixed(1)}</div>
      {delta !== null && Math.abs(delta) >= 0.1 && (
        <div className={`flex items-center gap-0.5 justify-end text-xs font-medium ${delta > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
          {delta > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {delta > 0 ? '+' : ''}{delta.toFixed(1)}
        </div>
      )}
      <div className="text-[10px] text-[#64748B]">B-Score</div>
    </div>
  );
}

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

async function deletePanel(panelId: string) {
  // Delete child rows in FK-safe order, then parent
  await supabase.from('supplement_recommendations').delete().eq('panel_id', panelId);
  await supabase.from('achievements').delete().eq('panel_id', panelId);
  await supabase.from('domain_scores').delete().eq('panel_id', panelId);
  await supabase.from('system_scores').delete().eq('panel_id', panelId);
  await supabase.from('marker_results').delete().eq('panel_id', panelId);
  await supabase.from('panel_scores').delete().eq('panel_id', panelId);

  // Fetch raw_pdf_path before deleting panel
  const { data: panel } = await supabase
    .from('panels')
    .select('raw_pdf_path')
    .eq('id', panelId)
    .maybeSingle();

  await supabase.from('panels').delete().eq('id', panelId);

  // Best-effort storage cleanup
  if (panel?.raw_pdf_path) {
    await supabase.storage.from('blood-reports').remove([panel.raw_pdf_path]);
  }
}

export function ReportsPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();
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
      .select('id, lab_name, collected_on, registered_at, created_at, processing_status')
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false, nullsFirst: false });

    if (data) {
      const enriched: PanelRow[] = await Promise.all(
        data.map(async (p, idx) => {
          const { data: sc } = await supabase
            .from('panel_scores')
            .select('b_score, bio_age_gap')
            .eq('panel_id', p.id)
            .maybeSingle();

          let b_score_prev: number | null = null;
          if (idx < data.length - 1) {
            const { data: prevSc } = await supabase
              .from('panel_scores')
              .select('b_score')
              .eq('panel_id', data[idx + 1].id)
              .maybeSingle();
            b_score_prev = prevSc?.b_score ?? null;
          }

          return {
            ...p,
            b_score: sc?.b_score ?? null,
            b_score_prev,
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
          {filtered.map(p => (
            <div
              key={p.id}
              className="card p-5 flex items-center gap-4 hover:border-white/15 transition-all duration-200 group"
            >
              {/* Clickable content area */}
              <div
                className="flex-1 min-w-0 cursor-pointer flex items-center gap-4"
                onClick={() => handleRowClick(p)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-white">{p.lab_name || 'Blood Report'}</span>
                    <StatusBadge status={p.processing_status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#64748B]">
                    {/* Upload date */}
                    {(p.registered_at || p.created_at) && (
                      <span>Uploaded: {formatDateTime(p.registered_at ?? p.created_at!)}</span>
                    )}
                    {/* Test / collection date */}
                    <span>Test date: {formatTestDate(p.collected_on)}</span>
                    {/* Bio age gap */}
                    {p.bio_age_gap !== null && (
                      <span className={`font-medium ${p.bio_age_gap <= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        Bio age: {p.bio_age_gap <= 0 ? `${Math.abs(p.bio_age_gap)}y younger` : `${p.bio_age_gap}y older`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <BScoreDelta current={p.b_score} prev={p.b_score_prev} />
                  <ArrowRight size={15} className="text-[#64748B] group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Delete button — separate from row click */}
              <button
                onClick={e => { e.stopPropagation(); setDeleteTarget(p.id); }}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Delete report"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
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
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
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

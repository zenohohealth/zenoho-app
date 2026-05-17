import { useEffect, useState } from 'react';
import { Upload, ArrowRight, Clock, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

type PanelRow = {
  id: string;
  lab_name: string | null;
  collected_on: string;
  processing_status: string;
  b_score: number | null;
  b_score_prev: number | null;
  bio_age_gap: number | null;
};

function StatusBadge({ status }: { status: string }) {
  if (status === 'complete') return null;
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    pending:    { label: 'Analysing...', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <Clock size={11} /> },
    processing: { label: 'Analysing...', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <Clock size={11} /> },
    failed:     { label: 'Failed — tap to retry', cls: 'text-[#EF4444] bg-[#EF4444]/10', icon: <AlertCircle size={11} /> },
    needs_review: { label: 'Review', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <AlertCircle size={11} /> },
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

export function ReportsPage() {
  const { navigate } = useRouter();
  const [panels, setPanels] = useState<PanelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('panels')
        .select('id, lab_name, collected_on, processing_status')
        .order('collected_on', { ascending: false });

      if (data) {
        const enriched: PanelRow[] = await Promise.all(
          data.map(async (p, idx) => {
            const { data: sc } = await supabase
              .from('panel_scores')
              .select('b_score, bio_age_gap')
              .eq('panel_id', p.id)
              .maybeSingle();

            // previous panel score for delta
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
    }
    load();
  }, []);

  const filtered = panels.filter(p =>
    !search || (p.lab_name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Reports</h1>
          <p className="text-[#94A3B8] text-sm mt-1">All your performance scans, newest first</p>
        </div>
        <button onClick={() => navigate('/reports/upload')} className="btn-primary flex items-center gap-2 text-sm">
          <Upload size={15} /> Upload Report
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
        <input
          className="input pl-9 text-sm"
          placeholder="Search by lab name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

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
            {search ? 'Try a different search term.' : 'Upload your first blood report to get your B-Score, domain scores, and supplement protocol.'}
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
              onClick={() => {
                if (p.processing_status === 'pending' || p.processing_status === 'processing') {
                  navigate(`/reports/processing/${p.id}`);
                } else {
                  navigate(`/reports/${p.id}`);
                }
              }}
              className="card p-5 flex items-center gap-4 hover:border-white/15 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-white">{p.lab_name || 'Blood Report'}</span>
                  <StatusBadge status={p.processing_status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span>{formatDate(p.collected_on)}</span>
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
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

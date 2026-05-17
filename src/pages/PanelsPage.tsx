import { useEffect, useState } from 'react';
import { FlaskConical, Upload, ArrowRight, Clock, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

type Panel = {
  id: string;
  lab_name: string | null;
  patient_name_on_report: string | null;
  collected_on: string;
  processing_status: string;
  authenticity_score: string | null;
  markers_submitted: number;
  markers_scoreable: number;
  b_score: number | null;
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    pending: { label: 'Pending', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <Clock size={11} /> },
    processing: { label: 'Processing', cls: 'text-[#00E5CC] bg-[#00E5CC]/10', icon: <Clock size={11} /> },
    complete: { label: 'Complete', cls: 'text-[#10B981] bg-[#10B981]/10', icon: <CheckCircle2 size={11} /> },
    failed: { label: 'Failed', cls: 'text-[#EF4444] bg-[#EF4444]/10', icon: <AlertCircle size={11} /> },
    needs_review: { label: 'Review', cls: 'text-[#F59E0B] bg-[#F59E0B]/10', icon: <AlertCircle size={11} /> },
  };
  const s = map[status] ?? map['pending'];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.cls}`}>
      {s.icon}{s.label}
    </span>
  );
}

export function PanelsPage() {
  const { navigate } = useRouter();
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('panels')
        .select('id, lab_name, patient_name_on_report, collected_on, processing_status, authenticity_score, markers_submitted, markers_scoreable')
        .order('collected_on', { ascending: false });

      if (data) {
        const enriched: Panel[] = await Promise.all(
          data.map(async (p) => {
            const { data: sc } = await supabase
              .from('panel_scores')
              .select('b_score')
              .eq('panel_id', p.id)
              .maybeSingle();
            return { ...p, b_score: sc?.b_score ?? null };
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
          <h1 className="text-2xl font-bold text-white">Blood Panels</h1>
          <p className="text-[#94A3B8] text-sm mt-1">All your lab test submissions</p>
        </div>
        <button onClick={() => navigate('/panels/upload')} className="btn-primary flex items-center gap-2 text-sm">
          <Upload size={15} /> Upload Panel
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

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="card h-20 animate-pulse opacity-50" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center border-dashed border-2 border-white/[0.08]">
          <FlaskConical size={36} className="text-[#00E5CC] mx-auto mb-4 opacity-60" />
          <h3 className="font-semibold text-white mb-2">{search ? 'No panels found' : 'No panels yet'}</h3>
          <p className="text-[#94A3B8] text-sm mb-5 max-w-xs mx-auto">
            {search ? 'Try a different search term.' : 'Upload your first blood test report to get started.'}
          </p>
          {!search && (
            <button onClick={() => navigate('/panels/upload')} className="btn-primary inline-flex items-center gap-2 text-sm">
              <Upload size={15} /> Upload Panel
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/panels/${p.id}`)}
              className="card p-5 flex items-center gap-4 hover:border-white/15 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00E5CC]/10 flex items-center justify-center flex-shrink-0">
                <FlaskConical size={18} className="text-[#00E5CC]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-white text-sm">{p.lab_name || 'Blood Panel'}</span>
                  <StatusBadge status={p.processing_status} />
                </div>
                <div className="text-xs text-[#64748B]">
                  {formatDate(p.collected_on)}
                  {p.markers_submitted > 0 && ` · ${p.markers_submitted} markers`}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                {p.b_score !== null && (
                  <div className="text-right">
                    <div className="score-number text-lg text-white">{p.b_score.toFixed(1)}</div>
                    <div className="text-[10px] text-[#64748B]">B-Score</div>
                  </div>
                )}
                {p.authenticity_score && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    p.authenticity_score === 'HIGH' ? 'bg-[#10B981]/10 text-[#10B981]' :
                    p.authenticity_score === 'MEDIUM' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                    'bg-[#EF4444]/10 text-[#EF4444]'
                  }`}>
                    {p.authenticity_score}
                  </span>
                )}
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

import { useEffect, useState } from 'react';
import { Upload, Activity, Brain, Pill, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

type LatestPanel = {
  id: string;
  lab_name: string | null;
  registered_at: string | null;
  b_score: number | null;
  bio_age_estimated: number | null;
  bio_age_chronological: number | null;
  bio_age_gap: number | null;
};

const STEPS = [
  {
    num: '1',
    icon: <Upload size={18} className="text-[#00E5CC]" />,
    title: 'Upload PDF',
    desc: 'Drop your blood test report from any Indian lab',
    bg: 'bg-[#00E5CC]/10',
  },
  {
    num: '2',
    icon: <Activity size={18} className="text-[#F59E0B]" />,
    title: 'AI Analyzes',
    desc: '60–180 seconds, runs in the background',
    bg: 'bg-[#F59E0B]/10',
  },
  {
    num: '3',
    icon: <Pill size={18} className="text-[#10B981]" />,
    title: 'Get Insights',
    desc: 'Markers, scores, supplement recommendations',
    bg: 'bg-[#10B981]/10',
  },
];

function EmptyState() {
  const { navigate } = useRouter();

  return (
    <div className="flex-1 p-6 lg:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-8 pt-4">
        {/* Hero card */}
        <div
          className="rounded-2xl p-8 lg:p-10 border border-white/[0.08] relative overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #0F2040 0%, #142447 60%, #0F2040 100%)' }}
        >
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#00E5CC]/[0.04] blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#00E5CC]/10 border border-[#00E5CC]/20 flex items-center justify-center mx-auto mb-5">
              <Brain size={28} className="text-[#00E5CC]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">
              Ready to analyze your first report
            </h1>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-7 max-w-md mx-auto">
              Upload any blood test PDF and Zenoho's AI will extract your markers,
              calculate your B-Score, and generate a personalized supplement protocol —
              all in under 3 minutes.
            </p>
            <button
              onClick={() => navigate('/reports/upload')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Upload size={15} /> Upload Report
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map(s => (
            <div key={s.num} className="card p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                  {s.icon}
                </div>
                <span className="text-xs font-mono text-[#64748B]">Step {s.num}</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-0.5">{s.title}</div>
                <div className="text-xs text-[#94A3B8] leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryState({ panel }: { panel: LatestPanel }) {
  const { navigate } = useRouter();
  const bioGap = panel.bio_age_gap;

  return (
    <div className="flex-1 p-6 lg:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6 pt-4">
        {/* Summary hero */}
        <div
          className="rounded-2xl p-6 lg:p-8 border border-white/[0.08] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F2040 0%, #142447 60%, #0F2040 100%)' }}
        >
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#00E5CC]/[0.04] blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Latest Report</p>
                <h2 className="text-lg font-bold text-white">{panel.lab_name ?? 'Blood Report'}</h2>
                {panel.registered_at && (
                  <p className="text-xs text-[#64748B] mt-0.5">{formatDateTime(panel.registered_at)}</p>
                )}
              </div>
              <button
                onClick={() => navigate(`/reports/${panel.id}`)}
                className="btn-ghost text-xs flex items-center gap-1 flex-shrink-0"
              >
                View full report <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* B-Score */}
              <div className="card-elevated rounded-xl p-4">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">B-Score</p>
                {panel.b_score !== null ? (
                  <p className="font-mono font-bold text-3xl text-white">{panel.b_score.toFixed(0)}</p>
                ) : (
                  <p className="text-[#64748B] text-sm">—</p>
                )}
              </div>

              {/* Bio Age */}
              <div className="card-elevated rounded-xl p-4">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Biological Age</p>
                {panel.bio_age_estimated !== null ? (
                  <div>
                    <p className="font-mono font-bold text-3xl text-white">{panel.bio_age_estimated}
                      <span className="text-base font-normal text-[#94A3B8] ml-1">yrs</span>
                    </p>
                    {bioGap !== null && (
                      <p className={`text-xs font-medium mt-1 ${bioGap <= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {bioGap <= 0 ? `${Math.abs(bioGap)}y younger` : `${bioGap}y older`} than chronological
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[#64748B] text-sm">—</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload new */}
        <button
          onClick={() => navigate('/reports/upload')}
          className="w-full card p-4 flex items-center gap-3 hover:border-white/15 transition-all duration-200 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-[#00E5CC]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Upload size={16} className="text-[#00E5CC]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Upload new report</p>
            <p className="text-xs text-[#64748B]">Track your progress over time</p>
          </div>
          <ArrowRight size={14} className="text-[#64748B] group-hover:text-white transition-colors flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const [latest, setLatest] = useState<LatestPanel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data: panels } = await supabase
        .from('panels')
        .select('id, lab_name, registered_at')
        .eq('user_id', user!.id)
        .eq('processing_status', 'complete')
        .order('registered_at', { ascending: false, nullsFirst: false })
        .limit(1);

      if (!panels || panels.length === 0) {
        setLoading(false);
        return;
      }

      const panelId = panels[0].id;
      const { data: ps } = await supabase
        .from('panel_scores')
        .select('b_score, bio_age_estimated, bio_age_chronological, bio_age_gap')
        .eq('panel_id', panelId)
        .maybeSingle();

      setLatest({
        id: panelId,
        lab_name: panels[0].lab_name,
        registered_at: panels[0].registered_at,
        b_score: ps?.b_score ?? null,
        bio_age_estimated: ps?.bio_age_estimated ?? null,
        bio_age_chronological: ps?.bio_age_chronological ?? null,
        bio_age_gap: ps?.bio_age_gap ?? null,
      });
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#00E5CC]/30 border-t-[#00E5CC] rounded-full animate-spin" />
      </div>
    );
  }

  if (!latest) return <EmptyState />;
  return <SummaryState panel={latest} />;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

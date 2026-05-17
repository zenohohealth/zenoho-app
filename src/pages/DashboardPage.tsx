import { useEffect, useState, useRef } from 'react';
import {
  Upload, Watch, Trophy, ArrowRight, AlertTriangle,
  TrendingUp, TrendingDown, Minus, ChevronRight, Pill,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

// ─── Types ────────────────────────────────────────────────────────────────────

type PanelScore = {
  b_score: number | null;
  b_score_confidence: string | null;
  bio_age_estimated: number | null;
  bio_age_chronological: number | null;
  bio_age_gap: number | null;
  bio_age_confidence: string | null;
  top_lever: string | null;
  next_test_date: string | null;
  safety_overrides_active: boolean;
};

type DomainScore = {
  domain_id: number;
  domain_name: string;
  raw_score: number | null;
  level: number | null;
  confidence: string | null;
};

type SystemScore = {
  system_id: number;
  system_name: string;
  raw_score: number | null;
};

type Supplement = {
  id: string;
  supplement_name: string;
  dose_amount: number | null;
  dose_unit: string | null;
  dose_frequency: string | null;
  dose_timing: string | null;
  evidence_level: string | null;
  tier: number;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const DOMAIN_COLORS: Record<string, string> = {
  'Heart Engine': '#E85D26',
  'Metabolic Power': '#27AE60',
  'Brain & Nerve': '#6C3FCB',
  'Vitality & Strength': '#E67E22',
  'Haematology Engine': '#C0392B',
  'Liver & Detox': '#7D3C98',
  'Recovery Capacity': '#16A085',
  'Immunity Shield': '#2471A3',
  'Mood & Calm': '#2980B9',
  'Endocrine System': '#1A6FD4',
};

const DOMAIN_ICONS: Record<string, string> = {
  'Heart Engine': '❤️',
  'Metabolic Power': '⚡',
  'Brain & Nerve': '🧠',
  'Vitality & Strength': '💪',
  'Haematology Engine': '🩸',
  'Liver & Detox': '🍃',
  'Recovery Capacity': '🔄',
  'Immunity Shield': '🛡️',
  'Mood & Calm': '😌',
  'Endocrine System': '⚗️',
};

const INTENT_ORDER: Record<string, string[]> = {
  longevity: ['Heart Engine', 'Metabolic Power', 'Recovery Capacity'],
  energy: ['Haematology Engine', 'Vitality & Strength', 'Endocrine System'],
  mental_sharpness: ['Brain & Nerve', 'Mood & Calm', 'Endocrine System'],
  athletic_recovery: ['Recovery Capacity', 'Vitality & Strength', 'Haematology Engine'],
  hormonal_balance: ['Endocrine System', 'Mood & Calm', 'Metabolic Power'],
  stress_sleep: ['Mood & Calm', 'Recovery Capacity', 'Brain & Nerve'],
};

const INTENT_LABELS: Record<string, string> = {
  longevity: 'Longevity',
  energy: 'Energy & Vitality',
  mental_sharpness: 'Mental Sharpness',
  athletic_recovery: 'Athletic Recovery',
  hormonal_balance: 'Hormonal Balance',
  stress_sleep: 'Stress & Sleep',
};

const INTENT_DOMAINS: Record<string, string[]> = {
  longevity: ['Heart Engine', 'Metabolic Power', 'Recovery Capacity'],
  energy: ['Haematology Engine', 'Vitality & Strength', 'Endocrine System'],
  mental_sharpness: ['Brain & Nerve', 'Mood & Calm', 'Endocrine System'],
  athletic_recovery: ['Recovery Capacity', 'Vitality & Strength', 'Haematology Engine'],
  hormonal_balance: ['Endocrine System', 'Mood & Calm', 'Metabolic Power'],
  stress_sleep: ['Mood & Calm', 'Recovery Capacity', 'Brain & Nerve'],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function BScoreGauge({ score }: { score: number }) {
  const size = 160;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score / 100, 0), 1);
  const dash = pct * circ;
  const gap = circ - dash;

  const color =
    score >= 75 ? '#10B981' :
    score >= 50 ? '#00E5CC' :
    score >= 30 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-4xl text-white leading-none">{score.toFixed(0)}</span>
        <span className="text-xs text-[#64748B] mt-1 uppercase tracking-wider">B-Score</span>
      </div>
    </div>
  );
}

function ConfidenceBadge({ level }: { level: string | null }) {
  if (!level) return null;
  const cls = level === 'HIGH' ? 'text-[#10B981] bg-[#10B981]/10' :
              level === 'MEDIUM' ? 'text-[#F59E0B] bg-[#F59E0B]/10' :
              'text-[#64748B] bg-white/[0.06]';
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{level}</span>;
}

function DomainCard({ d, delta }: { d: DomainScore; delta?: number }) {
  const color = DOMAIN_COLORS[d.domain_name] ?? '#94A3B8';
  const icon = DOMAIN_ICONS[d.domain_name] ?? '•';
  const score = d.raw_score ?? 0;
  const level = d.level ?? 0;

  const levelLabel =
    level >= 9 ? 'Elite' :
    level >= 7 ? 'Strong' :
    level >= 5 ? 'Good' :
    level >= 3 ? 'Fair' : 'Low';

  const size = 56;
  const strokeW = 5;
  const rad = (size - strokeW) / 2;
  const circ = 2 * Math.PI * rad;
  const pct = Math.min(score / 100, 1);

  return (
    <div className="card p-4 flex items-center gap-4 hover:border-white/15 transition-all duration-200">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size / 2} cy={size / 2} r={rad} stroke="rgba(255,255,255,0.06)" strokeWidth={strokeW} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={rad}
            stroke={color} strokeWidth={strokeW} fill="none"
            strokeDasharray={`${pct * circ} ${circ}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base leading-none">{icon}</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-white truncate">{d.domain_name}</span>
          <ConfidenceBadge level={d.confidence} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-lg" style={{ color }}>{score.toFixed(0)}</span>
          <span className="text-xs text-[#64748B]">Level {level} — {levelLabel}</span>
        </div>
        {delta !== undefined && delta !== 0 && (
          <div className={`flex items-center gap-1 text-xs mt-0.5 ${delta > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {delta > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {delta > 0 ? '+' : ''}{delta} pts vs previous
          </div>
        )}
      </div>
    </div>
  );
}

function SupplementCard({ s }: { s: Supplement }) {
  const tierColors: Record<number, string> = {
    1: 'text-[#10B981] bg-[#10B981]/10',
    2: 'text-[#F59E0B] bg-[#F59E0B]/10',
    3: 'text-[#EF4444] bg-[#EF4444]/10',
  };
  return (
    <div className="flex-shrink-0 w-56 card p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-semibold text-white leading-tight">{s.supplement_name}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium ${tierColors[s.tier] || tierColors[1]}`}>
          T{s.tier}
        </span>
      </div>
      <div className="text-xs text-[#94A3B8]">
        {[s.dose_amount && `${s.dose_amount}${s.dose_unit || ''}`, s.dose_frequency].filter(Boolean).join(' · ')}
      </div>
      {s.dose_timing && <div className="text-xs text-[#64748B] mt-0.5">{s.dose_timing}</div>}
      {s.evidence_level && (
        <div className={`text-[10px] mt-2 font-medium ${
          s.evidence_level === 'HIGH' ? 'text-[#10B981]' :
          s.evidence_level === 'MEDIUM' ? 'text-[#F59E0B]' : 'text-[#64748B]'
        }`}>
          {s.evidence_level} evidence
        </div>
      )}
    </div>
  );
}

// Skeleton shimmer for State A preview
function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`card animate-pulse ${className}`} style={{ opacity: 0.35 }}>
      <div className="h-full bg-[#142447] rounded-2xl" />
    </div>
  );
}

// ─── State A — No panels ─────────────────────────────────────────────────────

function StateA() {
  const { navigate } = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Upload hero */}
      <div className="max-w-xl mx-auto text-center pt-6">
        <h1 className="text-2xl font-bold text-white mb-2">Upload your first Performance Scan</h1>
        <p className="text-[#94A3B8] text-sm mb-8">
          Drop any blood report from HOD, Thyrocare, SRL, Metropolis, or any Indian lab.
        </p>
        <label
          className="flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed border-[#00E5CC]/40 bg-[#00E5CC]/[0.03] cursor-pointer hover:border-[#00E5CC]/70 hover:bg-[#00E5CC]/[0.06] transition-all duration-300 group"
        >
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={() => navigate('/reports/upload')}
          />
          <div className="w-14 h-14 rounded-2xl bg-[#00E5CC]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
            <Upload size={24} className="text-[#00E5CC]" />
          </div>
          <p className="text-white font-semibold mb-1">Drop your PDF here</p>
          <p className="text-xs text-[#64748B]">PDF only · Max 10 MB</p>
        </label>
        <button
          onClick={() => navigate('/reports/upload')}
          className="btn-primary mt-5 inline-flex items-center gap-2"
        >
          <Upload size={15} /> Upload Blood Report
        </button>
      </div>

      {/* Blurred preview */}
      <div className="relative pointer-events-none select-none">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
          <div className="bg-[#0F2040]/90 border border-white/[0.08] rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
            <p className="text-white font-semibold text-sm">Your dashboard unlocks after your first scan</p>
            <p className="text-[#64748B] text-xs mt-1">Upload a report to see your B-Score, domain scores, and supplement protocol</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 blur-sm">
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-40" />
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-24 col-span-full" />
        </div>
      </div>
    </div>
  );
}

// ─── State B — Main dashboard ─────────────────────────────────────────────────

function StateB({
  panelScore,
  domains,
  supplements,
  intent,
  secondaryIntent,
}: {
  panelScore: PanelScore;
  domains: DomainScore[];
  supplements: Supplement[];
  intent: string | null;
  secondaryIntent: string | null;
}) {
  const { navigate } = useRouter();
  const bScore = panelScore.b_score ?? 0;
  const bioGap = panelScore.bio_age_gap ?? null;

  // Sort domains: primary intent first, secondary intent second, rest after
  const orderedDomains = (() => {
    const primaryDomains = intent && INTENT_ORDER[intent] ? INTENT_ORDER[intent] : [];
    const secondaryDomains = secondaryIntent && INTENT_ORDER[secondaryIntent]
      ? INTENT_ORDER[secondaryIntent].filter(n => !primaryDomains.includes(n))
      : [];
    const priorityNames = [...primaryDomains, ...secondaryDomains];
    const first = priorityNames.map(name => domains.find(d => d.domain_name === name)).filter(Boolean) as DomainScore[];
    const rest = domains.filter(d => !priorityNames.includes(d.domain_name));
    return [...first, ...rest];
  })();

  const intentLabel = intent ? INTENT_LABELS[intent] ?? intent : null;
  const secondaryLabel = secondaryIntent ? INTENT_LABELS[secondaryIntent] ?? secondaryIntent : null;
  // Show domains for both intents combined (deduplicated)
  const intentDomains = (() => {
    const primary = intent ? (INTENT_DOMAINS[intent] ?? []) : [];
    const secondary = secondaryIntent ? (INTENT_DOMAINS[secondaryIntent] ?? []).filter(d => !primary.includes(d)) : [];
    return [...primary, ...secondary];
  })();

  return (
    <div className="flex-1 space-y-6 animate-fade-in">
      {/* Safety override banner */}
      {panelScore.safety_overrides_active && (
        <div className="flex items-center gap-3 px-6 py-3 bg-[#F59E0B]/10 border-b border-[#F59E0B]/20">
          <AlertTriangle size={16} className="text-[#F59E0B] flex-shrink-0" />
          <span className="text-sm text-[#F59E0B] flex-1">
            One or more markers in your latest report require a physician review.
          </span>
          <button className="text-xs text-[#F59E0B] underline flex-shrink-0 hover:text-white transition-colors">
            View details →
          </button>
        </div>
      )}

      <div className="p-6 lg:p-8 space-y-6">
        {/* B-Score Hero */}
        <div
          className="rounded-2xl p-6 lg:p-8 border border-white/[0.08] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F2040 0%, #142447 60%, #0F2040 100%)' }}
        >
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#00E5CC]/[0.04] blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Gauge */}
            <div className="flex-shrink-0">
              <BScoreGauge score={bScore} />
            </div>

            {/* Right info */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Bio age */}
              <div>
                <div className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Biological Age</div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono font-bold text-2xl text-white">
                    {panelScore.bio_age_estimated ?? '—'} yrs
                  </span>
                  <span className="text-sm text-[#94A3B8]">estimated</span>
                  {panelScore.bio_age_chronological && (
                    <>
                      <span className="text-[#64748B]">/</span>
                      <span className="font-mono font-semibold text-lg text-[#94A3B8]">{panelScore.bio_age_chronological} yrs</span>
                      <span className="text-sm text-[#94A3B8]">actual</span>
                    </>
                  )}
                  {bioGap !== null && (
                    <span className={`font-semibold text-sm px-2 py-0.5 rounded-full ${
                      bioGap <= 0
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}>
                      {bioGap <= 0 ? `${Math.abs(bioGap)} yr${Math.abs(bioGap) !== 1 ? 's' : ''} younger` : `${bioGap} yr${bioGap !== 1 ? 's' : ''} older`}
                    </span>
                  )}
                </div>
                <ConfidenceBadge level={panelScore.bio_age_confidence} />
              </div>

              {/* Top lever */}
              {panelScore.top_lever && (
                <div>
                  <div className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Biggest Lever</div>
                  <div className="text-white font-medium">{panelScore.top_lever}</div>
                </div>
              )}

              {/* Next scan */}
              {panelScore.next_test_date && (
                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <span>Next scan:</span>
                  <span className="text-white font-medium">{formatDate(panelScore.next_test_date)}</span>
                  <ConfidenceBadge level={panelScore.b_score_confidence} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Intent banner */}
        {intentLabel && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#00E5CC]/25 bg-[#00E5CC]/[0.04] flex-wrap">
            <span className="text-xs text-[#64748B]">Your focus:</span>
            <span className="text-sm font-semibold text-[#00E5CC]">{intentLabel}</span>
            {secondaryLabel && (
              <>
                <span className="text-[#64748B]">+</span>
                <span className="text-sm font-semibold text-[#00E5CC]/70">{secondaryLabel}</span>
              </>
            )}
            <span className="text-[#64748B]">·</span>
            <div className="flex flex-wrap gap-1.5">
              {intentDomains.map(d => (
                <span
                  key={d}
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    color: DOMAIN_COLORS[d] ?? '#94A3B8',
                    borderColor: `${DOMAIN_COLORS[d] ?? '#94A3B8'}40`,
                    background: `${DOMAIN_COLORS[d] ?? '#94A3B8'}12`,
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Domain Score Grid */}
        {orderedDomains.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-3">Domain Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orderedDomains.map(d => <DomainCard key={d.domain_id} d={d} />)}
            </div>
          </div>
        )}

        {/* Supplement strip */}
        {supplements.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">Your active protocol</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#A78BFA]/15 text-[#A78BFA] font-medium">
                  {supplements.length}
                </span>
              </div>
              <button
                onClick={() => navigate('/supplements')}
                className="btn-ghost text-xs flex items-center gap-1"
              >
                View full protocol <ArrowRight size={12} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-2 px-2">
              {supplements.slice(0, 6).map(s => <SupplementCard key={s.id} s={s} />)}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Upload size={18} className="text-[#00E5CC]" />, label: 'Upload new report', to: '/reports/upload', bg: 'bg-[#00E5CC]/10' },
              { icon: <Watch size={18} className="text-[#A78BFA]" />, label: 'Connect wearable', to: '/wearables', bg: 'bg-[#A78BFA]/10' },
              { icon: <Trophy size={18} className="text-[#F59E0B]" />, label: 'Join a challenge', to: '/challenges', bg: 'bg-[#F59E0B]/10' },
            ].map(a => (
              <button
                key={a.to}
                onClick={() => navigate(a.to)}
                className="card p-4 flex flex-col items-center gap-2 text-center hover:border-white/15 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.bg} group-hover:scale-105 transition-transform`}>
                  {a.icon}
                </div>
                <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors leading-snug">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export function DashboardPage() {
  const { profile } = useAuth();
  const [panelScore, setPanelScore] = useState<PanelScore | null>(null);
  const [domains, setDomains] = useState<DomainScore[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Get latest completed panel
      const { data: panels } = await supabase
        .from('panels')
        .select('id')
        .eq('processing_status', 'complete')
        .order('collected_on', { ascending: false })
        .limit(1);

      if (!panels || panels.length === 0) {
        setLoading(false);
        return;
      }

      const panelId = panels[0].id;

      const [{ data: ps }, { data: ds }, { data: sups }] = await Promise.all([
        supabase.from('panel_scores').select('*').eq('panel_id', panelId).maybeSingle(),
        supabase.from('domain_scores').select('*').eq('panel_id', panelId).order('domain_id'),
        supabase.from('supplement_recommendations').select('*').eq('panel_id', panelId).eq('is_active', true).order('tier').limit(6),
      ]);

      if (ps) setPanelScore(ps as PanelScore);
      if (ds) setDomains(ds as DomainScore[]);
      if (sups) setSupplements(sups as Supplement[]);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-[#00E5CC]/30 border-t-[#00E5CC] rounded-full animate-spin" />
      </div>
    );
  }

  if (!panelScore) {
    return <StateA />;
  }

  return (
    <StateB
      panelScore={panelScore}
      domains={domains}
      supplements={supplements}
      intent={profile?.performance_intent ?? null}
      secondaryIntent={profile?.secondary_intent ?? null}
    />
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

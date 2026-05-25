import { useEffect, useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ArrowLeft, TrendingUp, TrendingDown, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

// ─── Types ────────────────────────────────────────────────────────────────────

type Panel = {
  id: string;
  lab_name: string | null;
  patient_name_on_report: string | null;
  collected_on: string;
  processing_status: string;
};

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

type MarkerResult = {
  id: string;
  marker_id: number;
  raw_marker_name: string | null;
  value: number | null;
  unit: string | null;
  lab_ref_low: number | null;
  lab_ref_high: number | null;
  zenoho_zone: string | null;
  zone_score: number | null;
  retest_required: boolean;
  interpretation_note: string | null;
  lab_error_flag: string | null;
};

type Supplement = {
  id: string;
  supplement_name: string;
  tier: number | null;
  tier_label: string | null;
  dose_amount: number | null;
  dose_unit: string | null;
  dose_frequency: string | null;
  dose_timing: string | null;
  pair_with: string | null;
  evidence_level: string | null;
  trigger_marker_id: number | null;
  trigger_zone: string | null;
  drug_interaction_warning: string | null;
  is_premium_form: boolean;
  // v1.2 fields
  framework_indication: string | null;
  indication_rationale: string | null;
  physician_consultation_required: boolean;
  standardization: string | null;
  sourcing_note: string | null;
  bioavailability_note: string | null;
  safety_template_id: string | null;
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
  'Heart Engine': '❤️', 'Metabolic Power': '⚡', 'Brain & Nerve': '🧠',
  'Vitality & Strength': '💪', 'Haematology Engine': '🩸', 'Liver & Detox': '🍃',
  'Recovery Capacity': '🔄', 'Immunity Shield': '🛡️', 'Mood & Calm': '😌', 'Endocrine System': '⚗️',
};

const ZONE_COLORS: Record<string, string> = {
  optimal: '#10B981',
  watch_low: '#F59E0B',
  watch_high: '#F59E0B',
  alert_low: '#F97316',
  alert_high: '#F97316',
  critical_low: '#EF4444',
  critical_high: '#EF4444',
};

const ZONE_LABELS: Record<string, string> = {
  optimal: 'Optimal',
  watch_low: 'Watch Low',
  watch_high: 'Watch High',
  alert_low: 'Alert Low',
  alert_high: 'Alert High',
  critical_low: 'Critical Low',
  critical_high: 'Critical High',
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function ConfidenceBadge({ level }: { level: string | null }) {
  if (!level) return null;
  if (level === 'INSUFFICIENT_COVERAGE') {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-[#F59E0B] bg-[#F59E0B]/10">
        Insufficient coverage — retest recommended
      </span>
    );
  }
  const cls = level === 'HIGH' ? 'text-[#10B981] bg-[#10B981]/10' :
              level === 'MEDIUM' ? 'text-[#F59E0B] bg-[#F59E0B]/10' :
              'text-[#64748B] bg-white/[0.06]';
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{level}</span>;
}

function ZoneBadge({ zone }: { zone: string | null }) {
  if (!zone) return null;
  const color = ZONE_COLORS[zone] ?? '#94A3B8';
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
      style={{ color, background: `${color}18` }}
    >
      {ZONE_LABELS[zone] ?? zone}
    </span>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
        active
          ? 'border-[#00E5CC] text-white'
          : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
      }`}
    >
      {children}
    </button>
  );
}

// ─── BScore gauge (same as dashboard) ────────────────────────────────────────

function BScoreGauge({ score }: { score: number }) {
  const size = 140;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score / 100, 0), 1);
  const color = score >= 75 ? '#10B981' : score >= 50 ? '#00E5CC' : score >= 30 ? '#F59E0B' : '#EF4444';
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${pct * circ} ${circ - pct * circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-3xl text-white leading-none">{score.toFixed(0)}</span>
        <span className="text-[10px] text-[#64748B] mt-1 uppercase tracking-wider">B-Score</span>
      </div>
    </div>
  );
}

// ─── Tab 1: Overview ─────────────────────────────────────────────────────────

function TabOverview({ ps }: { ps: PanelScore }) {
  const bScore = ps.b_score ?? 0;
  const bioGap = ps.bio_age_gap ?? null;

  return (
    <div className="space-y-5">
      {/* Safety banner */}
      {ps.safety_overrides_active && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25">
          <AlertTriangle size={16} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#F59E0B]">
            <span className="font-semibold">One or more markers require physician review.</span> This is a precautionary flag, not an emergency.
          </p>
        </div>
      )}

      {/* B-Score hero */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        style={{ background: 'linear-gradient(135deg, #0F2040 0%, #142447 60%, #0F2040 100%)' }}
      >
        <BScoreGauge score={bScore} />
        <div className="flex-1 space-y-4">
          <div>
            <div className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Biological Age</div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono font-bold text-2xl text-white">{ps.bio_age_estimated ?? '—'} yrs</span>
              <span className="text-sm text-[#94A3B8]">estimated</span>
              {ps.bio_age_chronological && (
                <><span className="text-[#64748B]">/</span>
                <span className="font-mono font-semibold text-lg text-[#94A3B8]">{ps.bio_age_chronological} yrs</span>
                <span className="text-sm text-[#94A3B8]">actual</span></>
              )}
              {bioGap !== null && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bioGap <= 0 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'}`}>
                  {bioGap <= 0 ? `${Math.abs(bioGap)}y younger` : `${bioGap}y older`}
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748B] mt-1">This is a biomarker-derived estimate — discuss with your physician.</p>
          </div>
          <ConfidenceBadge level={ps.b_score_confidence} />
        </div>
      </div>

      {/* Top lever */}
      {ps.top_lever && (
        <div className="card p-5 border-l-4 border-[#00E5CC]">
          <div className="text-xs text-[#00E5CC] uppercase tracking-wider font-semibold mb-1">Your Biggest Lever</div>
          <p className="text-white font-medium">{ps.top_lever}</p>
        </div>
      )}

      {/* Next test + confidence */}
      {ps.next_test_date && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
          <div className="text-xs text-[#64748B]">Recommended next scan</div>
          <div className="text-white font-medium text-sm">{formatDate(ps.next_test_date)}</div>
          <ConfidenceBadge level={ps.b_score_confidence} />
        </div>
      )}

      <p className="text-xs text-[#64748B] leading-relaxed">
        Performance supplement recommendations, not prescriptions. All insights should be discussed with a licensed physician before acting on them.
      </p>
    </div>
  );
}

// ─── Tab 2: Domain Scores ─────────────────────────────────────────────────────

function DomainExpanded({ d, markers }: { d: DomainScore; markers: MarkerResult[] }) {
  const [open, setOpen] = useState(false);
  const color = DOMAIN_COLORS[d.domain_name] ?? '#94A3B8';
  const score = d.raw_score ?? 0;
  const level = d.level ?? 0;
  const levelLabel = level >= 9 ? 'Elite' : level >= 7 ? 'Strong' : level >= 5 ? 'Good' : level >= 3 ? 'Fair' : 'Low';

  const size = 52;
  const strokeW = 5;
  const rad = (size - strokeW) / 2;
  const circ = 2 * Math.PI * rad;
  const pct = Math.min(score / 100, 1);

  return (
    <div className="card overflow-hidden">
      <button
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size/2} cy={size/2} r={rad} stroke="rgba(255,255,255,0.06)" strokeWidth={strokeW} fill="none" />
            <circle cx={size/2} cy={size/2} r={rad} stroke={color} strokeWidth={strokeW} fill="none"
              strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 3px ${color}50)` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm">{DOMAIN_ICONS[d.domain_name] ?? '•'}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="font-semibold text-white text-sm">{d.domain_name}</span>
            <ConfidenceBadge level={d.confidence} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg" style={{ color }}>{score.toFixed(0)}</span>
            <span className="text-xs text-[#64748B]">Level {level} — {levelLabel}</span>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-[#64748B] flex-shrink-0" /> : <ChevronDown size={14} className="text-[#64748B] flex-shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-white/[0.06] p-4 space-y-2">
          {markers.length === 0
            ? <p className="text-xs text-[#64748B]">No markers available for this domain.</p>
            : markers.map(m => (
              <div key={m.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#142447]">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-white truncate block">{m.raw_marker_name ?? `Marker ${m.marker_id}`}</span>
                  {m.interpretation_note && <span className="text-[10px] text-[#64748B] leading-snug block mt-0.5">{m.interpretation_note}</span>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {m.value !== null && <span className="text-xs font-mono text-white">{m.value} {m.unit}</span>}
                  <ZoneBadge zone={m.zenoho_zone} />
                </div>
              </div>
            ))
          }
          {d.confidence === 'LOW' && (
            <p className="text-[10px] text-[#64748B] italic mt-1">Low confidence — fewer markers available for this domain.</p>
          )}
        </div>
      )}
    </div>
  );
}

function TabDomains({ domains, markers, safetyActive }: { domains: DomainScore[]; markers: MarkerResult[]; safetyActive: boolean }) {
  return (
    <div className="space-y-3">
      {domains.map(d => (
        safetyActive
          ? (
            <div key={d.domain_id} className="card p-4 flex items-center gap-3">
              <span className="text-lg">{DOMAIN_ICONS[d.domain_name] ?? '•'}</span>
              <span className="text-sm font-medium text-white">{d.domain_name}</span>
              {d.confidence === 'INSUFFICIENT_COVERAGE'
                ? <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">Insufficient coverage — retest recommended</span>
                : <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">Pending physician review</span>
              }
            </div>
          )
          : <DomainExpanded key={d.domain_id} d={d} markers={markers.filter(m => {
              // heuristic: distribute markers across domains by marker_id range
              const ranges: Record<string, [number, number]> = {
                'Heart Engine': [1, 8], 'Haematology Engine': [9, 16],
                'Metabolic Power': [17, 25], 'Liver & Detox': [26, 32],
                'Endocrine System': [33, 40], 'Immunity Shield': [41, 46],
                'Brain & Nerve': [47, 51], 'Mood & Calm': [52, 54],
                'Vitality & Strength': [55, 58], 'Recovery Capacity': [59, 62],
              };
              const range = ranges[d.domain_name];
              return range ? m.marker_id >= range[0] && m.marker_id <= range[1] : false;
            })} />
      ))}
    </div>
  );
}

// ─── Tab 3: Protocol ──────────────────────────────────────────────────────────

function SupplementCard({ s }: { s: Supplement }) {
  const tierNum = parseTierFromLabel(s.tier_label) ?? s.tier;
  const isAyush = tierNum === 3;

  return (
    <div className="card p-4 space-y-2.5">
      {/* Name + tier_label */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-white text-sm leading-snug">{s.supplement_name}</span>
        {s.tier_label && (
          <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: tierNum === 1 ? '#00E5CC18' : tierNum === 2 ? '#3B82F618' : '#F59E0B18',
              color: tierNum === 1 ? '#00E5CC' : tierNum === 2 ? '#3B82F6' : '#F59E0B',
            }}
          >
            {s.tier_label}
          </span>
        )}
      </div>

      {/* Standardization / dosing */}
      {s.standardization ? (
        <p className="text-xs text-[#94A3B8] leading-relaxed">{s.standardization}</p>
      ) : (
        <div className="text-xs text-[#94A3B8]">
          {[s.dose_amount && `${s.dose_amount}${s.dose_unit || ''}`, s.dose_frequency, s.dose_timing].filter(Boolean).join(' · ')}
        </div>
      )}

      {/* Indication rationale */}
      {s.indication_rationale && (
        <p className="text-xs text-[#64748B] leading-relaxed">{s.indication_rationale}</p>
      )}

      {/* Framework indication */}
      {s.framework_indication && (
        <div className="text-[10px] text-[#64748B]">
          Indication: <span className="text-[#94A3B8]">{s.framework_indication}</span>
        </div>
      )}

      {/* Pair with */}
      {s.pair_with && (
        <div className="text-xs text-[#64748B]">Pair with: <span className="text-[#94A3B8]">{s.pair_with}</span></div>
      )}

      {/* Safety warning */}
      {s.drug_interaction_warning && (
        <div className="flex items-start gap-1.5 text-xs text-[#F59E0B] bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-lg px-2.5 py-2">
          <AlertTriangle size={11} className="flex-shrink-0 mt-0.5" />
          <span>{s.drug_interaction_warning}</span>
        </div>
      )}

      {/* Physician consultation flag */}
      {s.physician_consultation_required && (
        <div className="text-[10px] text-[#64748B] bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-1.5">
          Discuss with your physician before starting this supplement.
        </div>
      )}

      {/* Bioavailability note (Tier 3 only) */}
      {s.bioavailability_note && (
        <p className="text-[10px] text-[#64748B] italic leading-relaxed">{s.bioavailability_note}</p>
      )}

      {/* Sourcing note (Tier 3 only) */}
      {isAyush && s.sourcing_note && (
        <p className="text-[10px] text-[#64748B] leading-relaxed">{s.sourcing_note}</p>
      )}
    </div>
  );
}

function parseTierFromLabel(label: string | null): number | null {
  if (!label) return null;
  if (label.startsWith('Tier 1')) return 1;
  if (label.startsWith('Tier 2')) return 2;
  if (label.startsWith('Tier 3')) return 3;
  return null;
}

function TabProtocol({ supplements }: { supplements: Supplement[] }) {
  const tierDefs: [number, string, string, string][] = [
    [1, 'Tier 1 — Strong evidence (Grade A)', 'Strong RCT Evidence', '#00E5CC'],
    [2, 'Tier 2 — Moderate to strong evidence (Grade B)', 'Moderate to Strong Evidence', '#3B82F6'],
    [3, 'Tier 3 — Traditional use, limited modern research', 'Classical Tradition — AYUSH', '#F59E0B'],
  ];

  return (
    <div className="space-y-8">
      {tierDefs.map(([tierNum, tierLabel, desc, color]) => {
        const group = supplements.filter(s => {
          const t = parseTierFromLabel(s.tier_label) ?? s.tier;
          return t === tierNum;
        });
        if (!group.length) return null;
        return (
          <div key={tierNum}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <h4 className="font-semibold text-white text-sm">{tierLabel}</h4>
              <span className="text-xs text-[#64748B]">— {desc}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.map(s => <SupplementCard key={s.id} s={s} />)}
            </div>
          </div>
        );
      })}
      {supplements.length === 0 && (
        <p className="text-[#94A3B8] text-sm text-center py-8">No supplement recommendations for this panel.</p>
      )}
      <div className="px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
        <p className="text-xs text-[#64748B] leading-relaxed">
          <span className="text-white font-medium">These are wellness supplement suggestions, not prescriptions.</span> All recommendations are derived from your biomarker values and should be discussed with a licensed physician before use.
        </p>
      </div>
    </div>
  );
}

// ─── Tab 4: Raw Markers ───────────────────────────────────────────────────────

type SortKey = 'name' | 'zone_score' | 'zenoho_zone';

function TabMarkers({ markers }: { markers: MarkerResult[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('zone_score');
  const [sortAsc, setSortAsc] = useState(true);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(true); }
  }

  const sorted = [...markers].sort((a, b) => {
    let av: any, bv: any;
    if (sortKey === 'name') { av = a.raw_marker_name ?? ''; bv = b.raw_marker_name ?? ''; }
    else if (sortKey === 'zone_score') { av = a.zone_score ?? 0; bv = b.zone_score ?? 0; }
    else { av = a.zenoho_zone ?? ''; bv = b.zenoho_zone ?? ''; }
    if (av < bv) return sortAsc ? -1 : 1;
    if (av > bv) return sortAsc ? 1 : -1;
    return 0;
  });

  function SortHeader({ label, k }: { label: string; k: SortKey }) {
    const active = sortKey === k;
    return (
      <button
        onClick={() => toggleSort(k)}
        className={`text-left text-xs font-semibold uppercase tracking-wide transition-colors ${active ? 'text-[#00E5CC]' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
      >
        {label} {active ? (sortAsc ? '↑' : '↓') : ''}
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-xs text-[#64748B]">
        Sort by:
        <SortHeader label="Name" k="name" />
        <SortHeader label="Score" k="zone_score" />
        <SortHeader label="Zone" k="zenoho_zone" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Marker', 'Value', 'Lab Range', 'Zone', 'Score'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-[#64748B] py-2 pr-4 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sorted.map(m => {
              const zoneColor = m.zenoho_zone ? ZONE_COLORS[m.zenoho_zone] : '#94A3B8';
              return (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 pr-4">
                    <div className="text-white font-medium text-xs truncate max-w-[160px]">
                      {m.raw_marker_name ?? `Marker ${m.marker_id}`}
                    </div>
                    {m.retest_required && <span className="text-[9px] text-[#F59E0B]">Retest needed</span>}
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-white whitespace-nowrap">
                    {m.value !== null ? `${m.value} ${m.unit ?? ''}` : '—'}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-[#64748B] whitespace-nowrap">
                    {m.lab_ref_low !== null && m.lab_ref_high !== null
                      ? `${m.lab_ref_low}–${m.lab_ref_high} ${m.unit ?? ''}`
                      : '—'}
                  </td>
                  <td className="py-2.5 pr-4">
                    <ZoneBadge zone={m.zenoho_zone} />
                  </td>
                  <td className="py-2.5 font-mono text-xs" style={{ color: zoneColor }}>
                    {m.zone_score !== null ? m.zone_score.toFixed(0) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <p className="text-[#94A3B8] text-sm text-center py-8">No marker data available.</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Report Detail Page ──────────────────────────────────────────────────

export function ReportDetailPage({ panelId }: { panelId: string }) {
  const { navigate } = useRouter();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [ps, setPs] = useState<PanelScore | null>(null);
  const [domains, setDomains] = useState<DomainScore[]>([]);
  const [markers, setMarkers] = useState<MarkerResult[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'domains' | 'protocol' | 'markers'>('overview');
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: score }, { data: doms }, { data: marks }, { data: sups }] = await Promise.all([
        supabase.from('panels').select('id, lab_name, patient_name_on_report, collected_on, processing_status').eq('id', panelId).maybeSingle(),
        supabase.from('panel_scores').select('*').eq('panel_id', panelId).maybeSingle(),
        supabase.from('domain_scores').select('*').eq('panel_id', panelId).order('domain_id'),
        supabase.from('marker_results').select('*').eq('panel_id', panelId).order('marker_id'),
        supabase.from('supplement_recommendations').select('*').eq('panel_id', panelId).eq('is_active', true).order('tier'),
      ]);
      setPanel(p as Panel | null);
      setPs(score as PanelScore | null);
      setDomains(doms as DomainScore[] ?? []);
      setMarkers(marks as MarkerResult[] ?? []);
      setSupplements(sups as Supplement[] ?? []);
      setLoading(false);
    }
    load();
  }, [panelId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-[#00E5CC]/30 border-t-[#00E5CC] rounded-full animate-spin" />
      </div>
    );
  }

  async function handleRetry() {
    if (!panel) return;
    setRetrying(true);
    await supabase.from('panels').update({ processing_status: 'pending', processing_error: null }).eq('id', panelId);
    navigate(`/reports/processing/${panelId}`);
  }

  if (!panel) {
    return (
      <div className="flex-1 p-8 text-center">
        <p className="text-[#94A3B8]">Report not found.</p>
        <button onClick={() => navigate('/reports')} className="btn-ghost text-sm mt-4">← Back to Reports</button>
      </div>
    );
  }

  const isFailed = panel.processing_status === 'failed';

  return (
    <div className="flex-1 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-6 pb-0">
        <button onClick={() => navigate('/reports')} className="btn-ghost flex items-center gap-2 text-sm mb-4">
          <ArrowLeft size={14} /> Back to My Reports
        </button>

        {/* Failed banner */}
        {isFailed && (
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/25 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-[#EF4444] flex-shrink-0" />
              <p className="text-sm text-[#EF4444] font-medium">Analysis failed.</p>
            </div>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="flex items-center gap-1.5 text-sm text-[#EF4444] hover:text-white border border-[#EF4444]/40 hover:border-[#EF4444] px-3 py-1.5 rounded-lg transition-all flex-shrink-0"
            >
              {retrying ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
              Retry analysis →
            </button>
          </div>
        )}

        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">{panel.lab_name || 'Blood Report'}</h1>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              {panel.patient_name_on_report && (
                <span className="text-sm font-medium text-[#94A3B8]">{panel.patient_name_on_report}</span>
              )}
              {panel.patient_name_on_report && <span className="text-[#334155]">·</span>}
              <span className="text-[#64748B] text-sm">{formatDate(panel.collected_on)}</span>
            </div>
          </div>
          {panel.processing_status !== 'complete' && (
            <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
              isFailed ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
            }`}>
              {isFailed ? 'Failed' : panel.processing_status}
            </span>
          )}
        </div>

        {/* Tabs — only show if we have results */}
        {ps && (
          <div className="flex border-b border-white/[0.06] overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'domains', label: `Domain Scores ${domains.length ? `(${domains.length})` : ''}` },
              { key: 'protocol', label: `Protocol ${supplements.length ? `(${supplements.length})` : ''}` },
              { key: 'markers', label: `Raw Markers ${markers.length ? `(${markers.length})` : ''}` },
            ].map(t => (
              <TabButton key={t.key} active={tab === t.key as any} onClick={() => setTab(t.key as any)}>
                {t.label}
              </TabButton>
            ))}
          </div>
        )}
      </div>

      {/* Tab content */}
      {ps ? (
        <div className="px-6 lg:px-8 py-6">
          {tab === 'overview' && <TabOverview ps={ps} />}
          {tab === 'domains' && <TabDomains domains={domains} markers={markers} safetyActive={ps.safety_overrides_active} />}
          {tab === 'protocol' && <TabProtocol supplements={supplements} />}
          {tab === 'markers' && <TabMarkers markers={markers} />}
        </div>
      ) : !isFailed ? (
        <div className="px-6 lg:px-8 py-12 text-center">
          <p className="text-[#94A3B8] text-sm">No results available for this report.</p>
        </div>
      ) : null}
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

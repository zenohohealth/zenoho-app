# Zenoho - May 25 UX Fixes - Complete Code Dump

================================================================================
FILE 1: src/pages/ReportsPage.tsx
================================================================================

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

// StatusBadge

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

// BScoreDisplay - Shows absolute B-Score only (no delta)

function BScoreDisplay({ current }: { current: number | null }) {
  if (current === null) return null;
  return (
    <div className="text-right">
      <div className="font-mono font-bold text-lg text-white">{current.toFixed(1)}</div>
      <div className="text-[10px] text-[#64748B]">B-Score</div>
    </div>
  );
}

// DeleteModal

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

// Toast

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

// deletePanel

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

// PanelCard

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

      {/* Per-card teal progress bar */}
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

// ReportsPage

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


================================================================================
FILE 2: src/pages/ReportDetailPage.tsx
================================================================================

import { useEffect, useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ArrowLeft, TrendingUp, TrendingDown, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

// Types

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

// Constants

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
  'Heart Engine': 'heart', 'Metabolic Power': 'zap', 'Brain & Nerve': 'brain',
  'Vitality & Strength': 'dumbbell', 'Haematology Engine': 'droplet', 'Liver & Detox': 'leaf',
  'Recovery Capacity': 'refresh', 'Immunity Shield': 'shield', 'Mood & Calm': 'smile', 'Endocrine System': 'flask',
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

// Small helpers

function ConfidenceBadge({ level }: { level: string | null }) {
  if (!level) return null;
  if (level === 'INSUFFICIENT_COVERAGE') {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-[#F59E0B] bg-[#F59E0B]/10">
        Insufficient coverage - retest recommended
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

// B-Score gauge

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

// Tab 1: Overview

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
              <span className="font-mono font-bold text-2xl text-white">{ps.bio_age_estimated ?? '-'} yrs</span>
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
            <p className="text-xs text-[#64748B] mt-1">This is a biomarker-derived estimate - discuss with your physician.</p>
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

// Tab 2: Domain Scores

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
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            {DOMAIN_ICONS[d.domain_name] ? <span className="text-base">{DOMAIN_ICONS[d.domain_name]}</span> : <span>.</span>}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="font-semibold text-white text-sm">{d.domain_name}</span>
            <ConfidenceBadge level={d.confidence} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg" style={{ color }}>{score.toFixed(0)}</span>
            <span className="text-xs text-[#64748B]">Level {level} - {levelLabel}</span>
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
            <p className="text-[10px] text-[#64748B] italic mt-1">Low confidence - fewer markers available for this domain.</p>
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
              <span className="text-lg">{DOMAIN_ICONS[d.domain_name] ?? '.'}</span>
              <span className="text-sm font-medium text-white">{d.domain_name}</span>
              {d.confidence === 'INSUFFICIENT_COVERAGE'
                ? <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">Insufficient coverage - retest recommended</span>
                : <span className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full ml-auto">Pending physician review</span>
              }
            </div>
          )
          : <DomainExpanded key={d.domain_id} d={d} markers={markers.filter(m => {
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

// Tab 3: Protocol

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
          {[s.dose_amount && `${s.dose_amount}${s.dose_unit || ''}`, s.dose_frequency, s.dose_timing].filter(Boolean).join(' - ')}
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
    [1, 'Tier 1 - Strong evidence (Grade A)', 'Strong RCT Evidence', '#00E5CC'],
    [2, 'Tier 2 - Moderate to strong evidence (Grade B)', 'Moderate to Strong Evidence', '#3B82F6'],
    [3, 'Tier 3 - Traditional use, limited modern research', 'Classical Tradition - AYUSH', '#F59E0B'],
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
              <span className="text-xs text-[#64748B]">- {desc}</span>
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

// Tab 4: Raw Markers

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
        {label} {active ? (sortAsc ? '^' : 'v') : ''}
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
                    {m.value !== null ? `${m.value} ${m.unit ?? ''}` : '-'}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-[#64748B] whitespace-nowrap">
                    {m.lab_ref_low !== null && m.lab_ref_high !== null
                      ? `${m.lab_ref_low}-${m.lab_ref_high} ${m.unit ?? ''}`
                      : '-'}
                  </td>
                  <td className="py-2.5 pr-4">
                    <ZoneBadge zone={m.zenoho_zone} />
                  </td>
                  <td className="py-2.5 font-mono text-xs" style={{ color: zoneColor }}>
                    {m.zone_score !== null ? m.zone_score.toFixed(0) : '-'}
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

// Main Report Detail Page

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
        <button onClick={() => navigate('/reports')} className="btn-ghost text-sm mt-4">Back to Reports</button>
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
              Retry analysis
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
              {panel.patient_name_on_report && <span className="text-[#334155]">.</span>}
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

        {/* Tabs */}
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


================================================================================
FILE 3: src/pages/ReportProcessingPage.tsx
================================================================================

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

// B-Score Count-up Screen

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

// Processing Page

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
      {/* Back button - top-left */}
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
              You can wait or come back - we'll notify you when it's ready.
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
              Usually takes 4-6 minutes - runs in background.
            </p>
          </>
        )}
      </div>
    </div>
  );
}


================================================================================
FILE 4: src/context/ReportProgressContext.tsx
================================================================================

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
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearWatchdog() {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  }

  function clearPoll() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  // Arm the 5-minute watchdog. Respects elapsed time so page-reload resumes
  // correctly rather than resetting the clock.
  const armWatchdog = useCallback((panelId: string, startedAt: number) => {
    clearWatchdog();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(WATCHDOG_MS - elapsed, 0);

    watchdogRef.current = setTimeout(async () => {
      // Re-check DB status before writing - avoid stomping a completed panel
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
        localStorage.removeItem(STORAGE_KEY);
        clearWatchdog();
        if (channelRef.current) {
          supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }
      }
    }, remaining);
  }, []);

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
          } else if (row.processing_status === 'text_extracted' || row.processing_status === 'analyzing') {
            // Intermediate pipeline states - stay in 'processing' UI
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
        }
      )
      .subscribe();

    channelRef.current = ch;
    setState({ phase: 'processing', panelId, startedAt });
    armWatchdog(panelId, startedAt);

    // Polling fallback: if realtime misses the final status transition, catch it by polling every 8s
    clearPoll();
    pollRef.current = setInterval(async () => {
      const { data } = await supabase
        .from('panels')
        .select('processing_status, processing_error')
        .eq('id', panelId)
        .maybeSingle();
      if (!data) return;
      if (data.processing_status === 'complete') {
        clearWatchdog();
        clearPoll();
        setState({ phase: 'complete', panelId });
        localStorage.removeItem(STORAGE_KEY);
        if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null; }
      } else if (data.processing_status === 'failed') {
        clearWatchdog();
        clearPoll();
        setState({ phase: 'failed', panelId, rawError: mapErrorToFriendly(data.processing_error ?? '') });
        localStorage.removeItem(STORAGE_KEY);
        if (channelRef.current) { supabase.removeChannel(channelRef.current!); channelRef.current = null; }
      }
    }, 8_000);
  }

  function startTracking(panelId: string) {
    const startedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ panelId, startedAt }));
    subscribe(panelId, startedAt);
  }

  function dismiss() {
    localStorage.removeItem(STORAGE_KEY);
    clearWatchdog();
    clearPoll();
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setState({ phase: 'idle' });
  }

  // On mount: query DB as source of truth - never trust localStorage alone.
  // localStorage is used only to recover the startedAt timestamp for elapsed-progress display.
  useEffect(() => {
    if (!user) return;

    (async () => {
      // 1. Ask the DB: does this user have any panel that is genuinely in-flight?
      const { data: inFlight } = await supabase
        .from('panels')
        .select('id, processing_status, processing_error')
        .eq('user_id', user.id)
        .not('processing_status', 'in', '(complete,failed)')
        .order('created_at', { ascending: false })
        .limit(1);

      // 2. No in-flight panel - clear any stale localStorage and stay idle.
      if (!inFlight || inFlight.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        setState({ phase: 'idle' });
        return;
      }

      // 3. There IS a real in-flight panel - recover startedAt from localStorage if available.
      const panel = inFlight[0];
      let startedAt = Date.now();
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.panelId === panel.id && typeof parsed.startedAt === 'number') {
            startedAt = parsed.startedAt;
          }
        } catch {
          // ignore malformed cache
        }
      }

      // 4. Re-persist with correct panelId (in case cache had a different id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ panelId: panel.id, startedAt }));
      subscribe(panel.id, startedAt);
    })();

    return () => {
      clearWatchdog();
      clearPoll();
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


================================================================================
FILE 5: src/components/AnalysisToastBar.tsx
================================================================================

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

  // Processing
  if (state.phase === 'processing') {
    return (
      <div className="fixed top-[calc(3.5rem+12px)] right-4 z-50 animate-fade-in">
        <div className="flex flex-col gap-1.5 bg-[#0F2040]/95 backdrop-blur-md border border-[#00E5CC]/25 rounded-2xl pl-3 pr-4 py-2.5 shadow-xl shadow-black/40 min-w-[220px]">
          {/* Top row */}
          <div className="flex items-center gap-2.5">
            <Loader2 size={14} className="text-[#00E5CC] animate-spin flex-shrink-0" />
            <span className="text-xs font-medium text-[#94A3B8] flex-1 whitespace-nowrap">Analyzing</span>
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
          <span className="text-[10px] text-[#475569] leading-none">Usually takes 4-6 minutes - runs in background.</span>
        </div>
      </div>
    );
  }

  // Complete
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

  // Failed
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


================================================================================
END OF CODE DUMP
================================================================================

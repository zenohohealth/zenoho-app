import { useEffect, useState } from 'react';
import { Trophy, Flame, CheckCircle2, Clock, Target, Watch, X, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChallengeDef = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  challenge_type: string | null;
  duration_days: number | null;
  requires_wearable: boolean;
  tier_required: string;
};

type UserChallenge = {
  id: string;
  challenge_id: string;
  status: string;
  current_streak: number;
  longest_streak: number;
  enrolled_at: string;
};

type Achievement = {
  id: string;
  achievement_type: string;
  label: string | null;
  earned_at: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const CHALLENGE_ICONS: Record<string, string> = {
  hrv_baseline_week: '❤️',
  sleep_quality_streak: '🌙',
  supplement_streak: '💊',
  steps_10k: '👟',
  resting_hr_pb: '🫀',
  score_level_up: '📈',
  retest_90_day: '🔬',
};

const ACHIEVEMENT_ICONS: Record<string, string> = {
  first_report: '🏆', streak_7: '🔥', streak_30: '⚡', level_up: '📈',
  retest_complete: '🔬', supplement_30: '💊', hrv_week: '❤️', default: '🏅',
};

const LOCKED_ACHIEVEMENTS = [
  { achievement_type: 'first_report', label: 'First Scan' },
  { achievement_type: 'streak_7', label: '7-Day Streak' },
  { achievement_type: 'streak_30', label: '30-Day Streak' },
  { achievement_type: 'level_up', label: 'Level Up' },
  { achievement_type: 'retest_complete', label: '90-Day Retest' },
  { achievement_type: 'supplement_30', label: 'Supplement Pro' },
];

// ─── Abandon dialog ───────────────────────────────────────────────────────────

function AbandonDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-sm shadow-2xl animate-slide-up p-6 space-y-4">
        <div className="flex items-center gap-2">
          <X size={18} className="text-[#EF4444]" />
          <h3 className="font-semibold text-white">Abandon challenge?</h3>
        </div>
        <p className="text-sm text-[#94A3B8]">Your streak progress will be lost. This cannot be undone.</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="btn-ghost text-sm flex-1">Keep going</button>
          <button onClick={onConfirm} className="text-sm flex-1 bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/25 rounded-xl py-2 font-medium hover:bg-[#EF4444]/25 transition-all">
            Abandon
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Active card ──────────────────────────────────────────────────────────────

function ActiveCard({ uc, def, onAbandon }: { uc: UserChallenge; def: ChallengeDef; onAbandon: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const daysIn = Math.floor((Date.now() - new Date(uc.enrolled_at).getTime()) / 86400000);
  const daysLeft = def.duration_days ? Math.max(0, def.duration_days - daysIn) : null;
  const pct = def.duration_days ? Math.min((daysIn / def.duration_days) * 100, 100) : Math.min(uc.current_streak * 10, 100);
  const icon = CHALLENGE_ICONS[def.slug] ?? '🏆';

  return (
    <>
      {showConfirm && <AbandonDialog onConfirm={() => { setShowConfirm(false); onAbandon(); }} onCancel={() => setShowConfirm(false)} />}
      <div className="card p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0 text-lg">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-semibold text-white text-sm">{def.title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 font-medium">Active</span>
            </div>
            {def.description && <p className="text-xs text-[#94A3B8] line-clamp-1">{def.description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-[#F59E0B]" />
            <span className="font-mono font-bold text-xl text-white">{uc.current_streak}</span>
            <span className="text-xs text-[#64748B]">day streak</span>
          </div>
          {daysLeft !== null && (
            <span className="text-xs text-[#64748B]"><span className="text-white font-medium">{daysLeft}</span> days remaining</span>
          )}
        </div>

        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-[#00E5CC] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#64748B]">Enrolled {formatDate(uc.enrolled_at)}</span>
          <button onClick={() => setShowConfirm(true)} className="text-xs text-[#64748B] hover:text-[#EF4444] transition-colors">
            Abandon
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Available card ───────────────────────────────────────────────────────────

function AvailableCard({ def, onEnroll, enrolling }: { def: ChallengeDef; onEnroll: () => void; enrolling: boolean }) {
  const icon = CHALLENGE_ICONS[def.slug] ?? '🏆';
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0 text-lg">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white text-sm mb-0.5">{def.title}</div>
          {def.description && <p className="text-xs text-[#94A3B8] leading-relaxed">{def.description}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {def.duration_days && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#142447] text-[#94A3B8] border border-white/[0.08] flex items-center gap-1">
            <Clock size={9} />{def.duration_days} days
          </span>
        )}
        {def.requires_wearable ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 flex items-center gap-1">
            <Watch size={9} />Requires wearable
          </span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            No wearable needed
          </span>
        )}
      </div>

      <button onClick={onEnroll} disabled={enrolling} className="btn-primary w-full text-sm py-2.5">
        {enrolling ? 'Enrolling...' : 'Enroll →'}
      </button>
    </div>
  );
}

// ─── Achievement badge ────────────────────────────────────────────────────────

function AchievementBadge({ a, locked = false }: { a: Partial<Achievement> & { achievement_type: string; label?: string | null }; locked?: boolean }) {
  const icon = ACHIEVEMENT_ICONS[a.achievement_type] ?? ACHIEVEMENT_ICONS.default;
  return (
    <div className={`card p-4 flex flex-col items-center text-center gap-2 ${locked ? 'opacity-30 grayscale' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${locked ? 'bg-white/[0.04]' : 'bg-[#F59E0B]/10'}`}>
        {locked ? <Lock size={14} className="text-[#64748B]" /> : icon}
      </div>
      <div className="text-xs font-medium text-white leading-tight">{a.label ?? a.achievement_type.replace(/_/g, ' ')}</div>
      {!locked && a.earned_at && <div className="text-[10px] text-[#64748B]">{formatDate(a.earned_at)}</div>}
      {locked && <div className="text-[10px] text-[#64748B]">Locked</div>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ChallengesPage() {
  const { user } = useAuth();
  const [defs, setDefs] = useState<ChallengeDef[]>([]);
  const [active, setActive] = useState<UserChallenge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [tab, setTab] = useState<'active' | 'available'>('available');

  useEffect(() => {
    async function load() {
      if (!user) return;
      const [{ data: d }, { data: uc }, { data: ach }] = await Promise.all([
        supabase.from('challenge_definitions').select('*').eq('is_active', true).order('title'),
        supabase.from('user_challenges').select('*').eq('user_id', user.id).eq('status', 'active'),
        supabase.from('achievements').select('*').eq('user_id', user.id).order('earned_at', { ascending: false }),
      ]);
      setDefs(d ?? []);
      setActive(uc ?? []);
      setAchievements(ach ?? []);
      setLoading(false);
      if ((uc ?? []).length > 0) setTab('active');
    }
    load();
  }, [user]);

  async function handleEnroll(challengeId: string) {
    if (!user) return;
    setEnrolling(challengeId);
    await supabase.from('user_challenges').insert({ user_id: user.id, challenge_id: challengeId });
    const { data } = await supabase.from('user_challenges').select('*').eq('user_id', user.id).eq('status', 'active');
    setActive(data ?? []);
    setEnrolling(null);
    setTab('active');
  }

  async function handleAbandon(ucId: string) {
    await supabase.from('user_challenges').update({ status: 'abandoned', completed_at: new Date().toISOString() }).eq('id', ucId);
    setActive(prev => prev.filter(u => u.id !== ucId));
  }

  const activeIds = new Set(active.map(u => u.challenge_id));
  const availableDefs = defs.filter(d => !activeIds.has(d.id));
  const earnedTypes = new Set(achievements.map(a => a.achievement_type));
  const lockedOnes = LOCKED_ACHIEVEMENTS.filter(l => !earnedTypes.has(l.achievement_type));

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Challenges</h1>
        <p className="text-[#94A3B8] text-sm mt-1">Build healthy habits with goal-based challenges</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06]">
        {(['active', 'available'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 capitalize ${
              tab === t ? 'border-[#00E5CC] text-white' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}>
            {t === 'active' ? `Active${active.length > 0 ? ` (${active.length})` : ''}` : `Available${availableDefs.length > 0 ? ` (${availableDefs.length})` : ''}`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="card h-32 animate-pulse opacity-40" />)}</div>
      ) : tab === 'active' ? (
        active.length === 0 ? (
          <div className="card p-12 text-center border-dashed border-2 border-white/[0.08]">
            <Target size={32} className="text-[#64748B] mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-white mb-2">No active challenges</h3>
            <p className="text-[#94A3B8] text-sm mb-4">Switch to Available to enroll in a challenge.</p>
            <button onClick={() => setTab('available')} className="btn-primary text-sm">Browse challenges</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {active.map(uc => {
              const def = defs.find(d => d.id === uc.challenge_id);
              if (!def) return null;
              return <ActiveCard key={uc.id} uc={uc} def={def} onAbandon={() => handleAbandon(uc.id)} />;
            })}
          </div>
        )
      ) : (
        availableDefs.length === 0 ? (
          <div className="card p-12 text-center border-dashed border-2 border-white/[0.08]">
            <CheckCircle2 size={32} className="text-[#10B981] mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">You're enrolled in all challenges!</h3>
            <p className="text-[#94A3B8] text-sm">Check your Active tab to track progress.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {availableDefs.map(d => (
              <AvailableCard key={d.id} def={d} onEnroll={() => handleEnroll(d.id)} enrolling={enrolling === d.id} />
            ))}
          </div>
        )
      )}

      {/* Achievements grid */}
      <section className="border-t border-white/[0.06] pt-6">
        <h2 className="font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {achievements.map(a => <AchievementBadge key={a.id} a={a} />)}
          {lockedOnes.map(l => <AchievementBadge key={l.achievement_type} a={l} locked />)}
          {achievements.length === 0 && lockedOnes.length === 0 && (
            <div className="col-span-full text-center py-6 text-[#94A3B8] text-sm">
              Complete challenges to earn achievements.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

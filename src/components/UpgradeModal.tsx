import { X, Zap, Lock } from 'lucide-react';
import { useRouter } from '../hooks/useRouter';

type UpgradeModalProps = {
  feature: string;
  requiredTier?: 'starter' | 'essential' | 'optimise' | 'elite';
  onClose: () => void;
};

const TIER_LABELS: Record<string, string> = {
  starter: 'Starter',
  essential: 'Essential',
  optimise: 'Optimise',
  elite: 'Elite',
};

const TIER_COLORS: Record<string, string> = {
  starter: '#00E5CC',
  essential: '#F59E0B',
  optimise: '#A78BFA',
  elite: '#10B981',
};

const FEATURE_COPY: Record<string, { title: string; desc: string; tier: string }> = {
  unlimited_reports: {
    title: 'Unlimited Reports',
    desc: 'Upload as many blood panels as you need throughout the year. Track your progress with every retest.',
    tier: 'starter',
  },
  full_doses: {
    title: 'Full Supplement Protocol',
    desc: 'See exact doses, timing, and pairings for all your supplements — not just the names.',
    tier: 'starter',
  },
  all_domains: {
    title: 'All 10 Domain Scores',
    desc: 'Unlock all 10 health domains including Brain & Nerve, Immunity Shield, Mood & Calm, and more.',
    tier: 'starter',
  },
  reminders: {
    title: 'WhatsApp Reminders',
    desc: 'Get daily supplement reminders via WhatsApp to stay on track.',
    tier: 'starter',
  },
  wearables: {
    title: 'Wearable Integration',
    desc: 'Connect your Apple Watch, Garmin, Oura, or any major device to unlock your W-Score.',
    tier: 'essential',
  },
  challenges: {
    title: 'Health Challenges',
    desc: 'Enroll in performance challenges and track your streaks against community benchmarks.',
    tier: 'essential',
  },
  history: {
    title: '12-Month History',
    desc: 'View trends across all your panels going back 12 months.',
    tier: 'essential',
  },
  deep_dives: {
    title: 'Deep-Dive Modules',
    desc: 'Unlock cardiovascular and hormonal intelligence modules with specialist-level insights.',
    tier: 'optimise',
  },
  longevity: {
    title: 'Longevity Modelling',
    desc: '60-marker longevity modelling with biological age trajectory projections.',
    tier: 'elite',
  },
};

export function UpgradeModal({ feature, requiredTier, onClose }: UpgradeModalProps) {
  const { navigate } = useRouter();
  const copy = FEATURE_COPY[feature] ?? {
    title: 'Premium Feature',
    desc: 'Upgrade your plan to access this feature.',
    tier: requiredTier ?? 'starter',
  };
  const tier = requiredTier ?? copy.tier;
  const color = TIER_COLORS[tier] ?? '#00E5CC';
  const tierLabel = TIER_LABELS[tier] ?? 'Starter';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-sm shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
              <Lock size={13} style={{ color }} />
            </div>
            <span className="font-semibold text-white text-sm">Upgrade Required</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08] transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <h3 className="font-bold text-white text-base">{copy.title}</h3>
            <p className="text-[#94A3B8] text-sm mt-1.5 leading-relaxed">{copy.desc}</p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl border" style={{ background: `${color}08`, borderColor: `${color}25` }}>
            <Zap size={13} style={{ color }} className="flex-shrink-0" />
            <p className="text-xs" style={{ color }}>
              Available on <span className="font-semibold">{tierLabel}</span> and above
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-2">
          <button onClick={onClose} className="btn-ghost text-sm flex-1">Not now</button>
          <button
            onClick={() => { onClose(); navigate('/billing'); }}
            className="text-sm flex-1 py-2.5 rounded-xl font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: color, color: '#0D1B35' }}
          >
            View Plans →
          </button>
        </div>
      </div>
    </div>
  );
}

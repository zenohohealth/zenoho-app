import { useState } from 'react';
import { CheckCircle2, Zap, Shield, Star, Crown, Gem } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useRouter } from '../hooks/useRouter';

declare global {
  interface Window { Razorpay: any; }
}

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free',
    priceRs: 0,
    icon: <Shield size={20} />,
    color: '#94A3B8',
    tagline: 'Get started',
    features: [
      '1 report per year',
      'B-Score + Biological Age',
      '5 domain scores',
      'Supplement names only (no doses)',
    ],
    cta: 'Current plan',
  },
  {
    id: 'starter' as const,
    name: 'Starter',
    priceRs: 399,
    icon: <Zap size={20} />,
    color: '#00E5CC',
    tagline: 'Everything in Free, plus:',
    features: [
      'Unlimited reports',
      'All 10 domain scores',
      'Full supplement protocol with doses',
      'WhatsApp reminders',
    ],
    cta: 'Start Starter →',
  },
  {
    id: 'essential' as const,
    name: 'Essential',
    priceRs: 1499,
    icon: <Star size={20} />,
    color: '#F59E0B',
    badge: 'POPULAR',
    tagline: 'Everything in Starter, plus:',
    features: [
      'Wearable integration (W-Score)',
      'All challenges',
      '12-month history',
      'Performance trends',
    ],
    cta: 'Start Essential →',
  },
  {
    id: 'optimise' as const,
    name: 'Optimise',
    priceRs: 3499,
    icon: <Crown size={20} />,
    color: '#A78BFA',
    tagline: 'Everything in Essential, plus:',
    features: [
      'Cardiovascular deep-dive',
      'Hormonal intelligence module',
      'Priority AI coaching',
      'Annual trend analysis',
    ],
    cta: 'Start Optimise →',
  },
  {
    id: 'elite' as const,
    name: 'Elite',
    priceRs: 6999,
    icon: <Gem size={20} />,
    color: '#10B981',
    badge: 'BEST VALUE',
    tagline: 'Everything in Optimise, plus:',
    features: [
      '60-marker longevity modelling',
      'Biological age trajectory',
      'Quarterly PDF report',
      'Lab procurement support',
    ],
    cta: 'Start Elite →',
  },
];

type PlanId = 'free' | 'starter' | 'essential' | 'optimise' | 'elite';

export function BillingPage() {
  const { profile, user, refreshProfile } = useAuth();
  const { navigate } = useRouter();
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);

  async function handleUpgrade(planId: PlanId, priceRs: number) {
    if (!user || !profile) return;
    setUpgrading(planId);

    if (typeof window.Razorpay === 'undefined') {
      // Load Razorpay script dynamically
      await new Promise<void>(resolve => {
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        s.onload = () => resolve();
        document.head.appendChild(s);
      });
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID ?? 'rzp_test_placeholder',
      amount: priceRs * 100,
      currency: 'INR',
      name: 'Zenoho Health',
      description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
      prefill: { name: profile.name ?? '', email: profile.email },
      theme: { color: '#00E5CC' },
      handler: async () => {
        await supabase.from('users').update({ subscription_tier: planId, subscription_status: 'active' }).eq('id', user.id);
        await supabase.from('subscriptions').insert({
          user_id: user.id,
          tier: planId,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
        await refreshProfile();
        setUpgrading(null);
        navigate('/settings');
      },
      modal: { ondismiss: () => setUpgrading(null) },
    };

    const rp = new window.Razorpay(options);
    rp.open();
  }

  const currentTier = profile?.subscription_tier ?? 'free';

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Start free. Upgrade when your biology demands it.</h1>
        <p className="text-[#94A3B8] text-sm mt-2">Every plan includes your performance score, biological age, and a personalised supplement protocol.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {PLANS.map(p => {
          const isCurrent = currentTier === p.id;
          const isDowngrade = PLANS.findIndex(pl => pl.id === currentTier) > PLANS.findIndex(pl => pl.id === p.id);
          return (
            <div key={p.id} className={`card p-5 flex flex-col relative overflow-hidden transition-all duration-200 ${
              p.badge === 'POPULAR' ? 'border-[#F59E0B]/30 ring-1 ring-[#F59E0B]/20' :
              p.badge === 'BEST VALUE' ? 'border-[#10B981]/30 ring-1 ring-[#10B981]/20' :
              isCurrent ? 'border-[#00E5CC]/30 ring-1 ring-[#00E5CC]/20' : ''
            }`}>
              {p.badge && (
                <div className="absolute top-3 right-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide"
                    style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                    {p.badge}
                  </span>
                </div>
              )}
              {isCurrent && !p.badge && (
                <div className="absolute top-3 right-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#00E5CC]/15 text-[#00E5CC] border border-[#00E5CC]/30 font-bold uppercase tracking-wide">Current</span>
                </div>
              )}

              <div className="mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${p.color}18`, color: p.color }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-white text-lg">{p.name}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  {p.priceRs === 0
                    ? <span className="text-2xl font-bold text-white">Free</span>
                    : <><span className="text-2xl font-bold text-white">₹{p.priceRs.toLocaleString()}</span><span className="text-xs text-[#64748B]">/month</span></>
                  }
                </div>
                {p.tagline && <p className="text-[11px] text-[#64748B] mt-1.5">{p.tagline}</p>}
              </div>

              <ul className="space-y-2 flex-1 mb-5">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                    <span className="text-[#94A3B8]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent || p.id === 'free' || upgrading === p.id}
                onClick={() => !isCurrent && p.id !== 'free' && handleUpgrade(p.id, p.priceRs)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCurrent ? 'bg-white/[0.06] text-[#64748B] cursor-default' :
                  p.id === 'free' ? 'bg-white/[0.04] text-[#64748B] cursor-default' :
                  isDowngrade ? 'bg-white/[0.06] text-[#94A3B8] hover:bg-white/[0.1]' :
                  'hover:brightness-110 active:scale-[0.98]'
                }`}
                style={!isCurrent && p.id !== 'free' && !isDowngrade ? { background: p.color, color: '#0D1B35' } : {}}
              >
                {isCurrent ? 'Current plan' : upgrading === p.id ? 'Opening...' : isDowngrade ? 'Downgrade' : p.cta}
              </button>
            </div>
          );
        })}
      </div>

      <div className="card p-4 bg-[#142447] border border-[#00E5CC]/10">
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          <span className="text-white font-medium">Lab procurement available on Optimise and Elite</span> — rolling out with our lab partner network. Currently: upload any blood test from any Indian lab.
        </p>
      </div>

      <div className="card p-4">
        <p className="text-xs text-[#64748B] leading-relaxed">
          Secure payments via Razorpay. GST extra as applicable. Cancel anytime — no lock-in.
        </p>
      </div>
    </div>
  );
}

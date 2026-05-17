import { useState } from 'react';
import { ArrowRight, Check, Loader2, Clock, Zap, Brain, Dumbbell, Scale, Moon, Phone, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Logo } from '../components/Logo';

// ─── Legal Modals ─────────────────────────────────────────────────────────────

function LegalModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] flex-shrink-0">
          <h3 className="font-semibold text-white text-sm leading-tight">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-sm text-[#94A3B8] leading-relaxed space-y-3">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-white/[0.08] flex-shrink-0">
          <button onClick={onClose} className="btn-primary w-full text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <LegalModal title="Terms of Service — Zenoho Health Private Limited" onClose={onClose}>
      <p>By using Zenoho, you agree that:</p>
      <ol className="list-decimal list-outside pl-4 space-y-2">
        <li>You are using a wellness information platform, not a medical service.</li>
        <li>All insights provided are for informational purposes only and do not constitute medical advice, diagnosis, or treatment.</li>
        <li>You will consult a licensed physician before acting on any information from this platform.</li>
        <li>Zenoho is not liable for any health decisions made based on platform output.</li>
        <li>Your data is stored securely and processed only to provide your performance analysis. Full privacy policy applies.</li>
      </ol>
    </LegalModal>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <LegalModal title="Privacy Policy — Zenoho Health Private Limited" onClose={onClose}>
      <p>
        Zenoho collects: your blood report PDFs, biomarker values, and wearable data — solely to calculate your performance score and generate personalised recommendations.
      </p>
      <ul className="list-disc list-outside pl-4 space-y-2">
        <li>We do not sell your data.</li>
        <li>We do not share it with third parties except as required by law.</li>
        <li>Blood reports are stored encrypted.</li>
        <li>You may request data deletion at any time by emailing <span className="text-[#00E5CC]">privacy@zenoho.health</span>.</li>
        <li>Data is retained for 24 months from your last active session.</li>
      </ul>
    </LegalModal>
  );
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

const TOTAL = 5;

function ProgressBar({ step }: { step: number }) {
  if (step === 1) return null;
  const pct = ((step - 1) / (TOTAL - 1)) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-[#64748B] mb-2">
        <span>Step {step} of {TOTAL}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00E5CC] to-[#00B4A0] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Step 1 ──────────────────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-[#0D1B35] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden animate-fade-in">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00E5CC]/[0.04] blur-[140px] pointer-events-none" />
      <div className="relative z-10 max-w-md w-full">
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to<br />
          <span className="text-gradient-teal">Zenoho.</span>
        </h1>
        <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
          Let's build your performance profile.<br />
          <span className="text-[#64748B] text-base">Takes 2 minutes.</span>
        </p>
        <button onClick={onNext} className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
          Get started <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2 ──────────────────────────────────────────────────────────────────

type Step2Form = {
  name: string;
  date_of_birth: string;
  gender: string;
  city: string;
  dietary_pattern: string;
  activity_level: string;
};

function Step2({ form, setForm, onNext, onBack, error }: {
  form: Step2Form; setForm: (f: Step2Form) => void;
  onNext: () => void; onBack: () => void; error: string;
}) {
  const diets = ['omnivore', 'vegetarian', 'vegan', 'pescatarian'];
  const activities = [
    { val: 'sedentary', icon: '🪑', label: 'Sedentary', desc: 'Little to no regular exercise' },
    { val: 'moderate', icon: '🚶', label: 'Moderately Active', desc: '2–4 workouts per week' },
    { val: 'athlete', icon: '🏃', label: 'Athlete', desc: 'Training 5+ days a week' },
  ];

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-1">Basic Profile</h2>
      <p className="text-[#94A3B8] text-sm mb-6">Helps us calibrate your biomarker zones accurately.</p>

      {error && <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="label">Full Name *</label>
            <input className="input" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="label">Date of Birth *</label>
            <input type="date" className="input" value={form.date_of_birth} max={new Date().toISOString().split('T')[0]} onChange={e => setForm({ ...form, date_of_birth: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Gender *</label>
            <select className="input" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" placeholder="Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="label">Dietary Pattern *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {diets.map(d => (
              <button key={d} type="button" onClick={() => setForm({ ...form, dietary_pattern: d })}
                className={`py-3 px-3 rounded-xl border text-sm font-medium capitalize transition-all duration-200 ${
                  form.dietary_pattern === d
                    ? 'border-[#00E5CC] bg-[#00E5CC]/10 text-white'
                    : 'border-white/[0.08] bg-[#142447] text-[#94A3B8] hover:border-white/20 hover:text-white'
                }`}
              >{d}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Activity Level *</label>
          <div className="grid grid-cols-3 gap-3">
            {activities.map(a => (
              <button key={a.val} type="button" onClick={() => setForm({ ...form, activity_level: a.val })}
                className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                  form.activity_level === a.val
                    ? 'border-[#00E5CC] bg-[#00E5CC]/10'
                    : 'border-white/[0.08] bg-[#142447] hover:border-white/20'
                }`}
              >
                <div className="text-xl mb-1">{a.icon}</div>
                <div className="text-xs font-semibold text-white">{a.label}</div>
                <div className="text-[10px] text-[#64748B] mt-0.5 leading-snug">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" className="btn-ghost text-sm" onClick={onBack}>← Back</button>
        <button type="button" className="btn-primary flex items-center gap-2 text-sm" onClick={onNext}>
          Continue <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 — Performance Intent (6 options, up to 2) ────────────────────────

const INTENT_CARDS = [
  { val: 'longevity', icon: <Clock size={24} className="text-[#00E5CC]" />, title: 'Live Longer, Better', body: 'Focus on cardiovascular health, metabolic function, and inflammation markers.' },
  { val: 'energy', icon: <Zap size={24} className="text-[#F59E0B]" />, title: 'Energy & Vitality', body: 'Prioritise iron, thyroid, vitamin levels, and sleep quality markers.' },
  { val: 'mental_sharpness', icon: <Brain size={24} className="text-[#A78BFA]" />, title: 'Mental Sharpness', body: 'Spotlight B12, folate, thyroid, cortisol, and neurological performance.' },
  { val: 'athletic_recovery', icon: <Dumbbell size={24} className="text-[#10B981]" />, title: 'Athletic Recovery', body: 'Emphasise recovery capacity, inflammation, testosterone, and haematology.' },
  { val: 'hormonal_balance', icon: <Scale size={24} className="text-[#E67E22]" />, title: 'Hormonal Balance', body: 'Focus on testosterone, DHEA, cortisol, thyroid, and PCOS-related markers.' },
  { val: 'stress_sleep', icon: <Moon size={24} className="text-[#2980B9]" />, title: 'Stress & Sleep', body: 'Prioritise cortisol, magnesium, melatonin pathways, and sleep quality markers.' },
];

function Step3({ intents, setIntents, onNext, onBack, error }: {
  intents: string[]; setIntents: (v: string[]) => void;
  onNext: () => void; onBack: () => void; error: string;
}) {
  const [shake, setShake] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState(false);

  function toggleIntent(val: string) {
    if (intents.includes(val)) {
      setIntents(intents.filter(v => v !== val));
      return;
    }
    if (intents.length >= 2) {
      setShake(val);
      setTooltip(true);
      setTimeout(() => { setShake(null); setTooltip(false); }, 600);
      return;
    }
    setIntents([...intents, val]);
  }

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-1">What are your performance goals?</h2>
      <p className="text-[#94A3B8] text-sm mb-1 leading-relaxed max-w-lg">
        Choose up to 2. Your dashboard adapts to show what matters most to you.
      </p>
      <p className="text-xs text-[#64748B] mb-5">
        Supplement doses are always based on your blood values — not this selection.
      </p>

      {error && <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="relative">
        {tooltip && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 bg-[#0F2040] border border-white/[0.12] text-xs text-[#94A3B8] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg animate-fade-in">
            Choose up to 2 goals.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {INTENT_CARDS.map(c => {
            const selected = intents.includes(c.val);
            const isShaking = shake === c.val;
            return (
              <button
                key={c.val}
                type="button"
                onClick={() => toggleIntent(c.val)}
                style={isShaking ? { animation: 'shake 0.4s ease' } : {}}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none ${
                  selected
                    ? 'border-[#00E5CC] bg-[#00E5CC]/10 shadow-[0_0_24px_rgba(0,229,204,0.12)]'
                    : 'border-white/[0.08] bg-[#142447] hover:border-white/20'
                }`}
              >
                {selected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00E5CC] flex items-center justify-center">
                    <Check size={11} className="text-[#0D1B35]" strokeWidth={3} />
                  </div>
                )}
                {intents.length > 0 && selected && (
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-[#00E5CC]/20 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#00E5CC]">{intents.indexOf(c.val) + 1}</span>
                  </div>
                )}
                <div className="mb-2">{c.icon}</div>
                <div className="font-semibold text-white text-sm">{c.title}</div>
                <div className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{c.body}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button type="button" className="btn-ghost text-sm" onClick={onBack}>← Back</button>
        <button type="button" className="btn-primary flex items-center gap-2 text-sm" onClick={onNext}>
          Continue <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4 — Conditions ─────────────────────────────────────────────────────

const CONDITION_CHIPS = [
  'Diabetes',
  'Pre-diabetes / Insulin Resistance',
  'Hypertension',
  'High Cholesterol (on medication)',
  'Thyroid Disorder',
  'PCOS',
  'Fatty Liver / NAFLD',
  'Anaemia',
  'Gout',
  'Autoimmune Condition',
  'Depression / Anxiety',
  'Heart Condition',
  'Kidney Disease',
  'None of the above',
];

function Step4({ medications, setMedications, conditions, setConditions, onNext, onBack }: {
  medications: string; setMedications: (v: string) => void;
  conditions: string[]; setConditions: (v: string[]) => void;
  onNext: () => void; onBack: () => void;
}) {
  function toggle(c: string) {
    if (c === 'None of the above') {
      setConditions(conditions.includes(c) ? [] : ['None of the above']);
      return;
    }
    const without = conditions.filter(x => x !== 'None of the above');
    setConditions(without.includes(c) ? without.filter(x => x !== c) : [...without, c]);
  }

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-1">Medications & conditions</h2>
      <p className="text-[#94A3B8] text-sm mb-6">Optional. Helps us flag supplement interactions accurately.</p>

      <div className="space-y-5">
        <div>
          <label className="label">Current medications</label>
          <textarea
            className="input resize-none h-24"
            placeholder="e.g. Metformin 500mg, Levothyroxine 50mcg"
            value={medications}
            onChange={e => setMedications(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Conditions</label>
          <div className="flex flex-wrap gap-2">
            {CONDITION_CHIPS.map(c => {
              const sel = conditions.includes(c);
              return (
                <button key={c} type="button" onClick={() => toggle(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    sel
                      ? 'border-[#00E5CC] bg-[#00E5CC]/10 text-white'
                      : 'border-white/[0.08] bg-[#142447] text-[#94A3B8] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {sel && <span className="mr-1 text-[#00E5CC]">✓</span>}{c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
          <span className="text-[#00E5CC] mt-0.5 flex-shrink-0">🔒</span>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Zenoho never shares this. Used only to flag supplement-drug interactions.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" className="btn-ghost text-sm" onClick={onBack}>← Back</button>
        <div className="flex items-center gap-3">
          <button type="button" className="text-[#64748B] text-sm hover:text-white transition-colors" onClick={onNext}>
            Skip for now
          </button>
          <button type="button" className="btn-primary flex items-center gap-2 text-sm" onClick={onNext}>
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 5 — Consent ────────────────────────────────────────────────────────

function Step5({ terms, setTerms, privacy, setPrivacy, whatsapp, setWhatsapp, phone, setPhone, onFinish, onBack, loading, error }: {
  terms: boolean; setTerms: (v: boolean) => void;
  privacy: boolean; setPrivacy: (v: boolean) => void;
  whatsapp: boolean; setWhatsapp: (v: boolean) => void;
  phone: string; setPhone: (v: string) => void;
  onFinish: () => void; onBack: () => void;
  loading: boolean; error: string;
}) {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <div className="animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-1">Almost there</h2>
        <p className="text-[#94A3B8] text-sm mb-6">Review and accept our policies to complete setup.</p>

        {error && <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

        <div className="space-y-4 mb-6">
          {/* Terms */}
          <div className="flex items-start gap-3">
            <div
              onClick={() => setTerms(!terms)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all ${
                terms ? 'bg-[#00E5CC] border-[#00E5CC]' : 'border-white/30 bg-transparent'
              }`}
            >
              {terms && <Check size={12} className="text-[#0D1B35]" strokeWidth={3} />}
            </div>
            <span className="text-sm text-[#94A3B8] leading-relaxed">
              I accept the{' '}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-[#00E5CC] underline hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </span>
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-3">
            <div
              onClick={() => setPrivacy(!privacy)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all ${
                privacy ? 'bg-[#00E5CC] border-[#00E5CC]' : 'border-white/30 bg-transparent'
              }`}
            >
              {privacy && <Check size={12} className="text-[#0D1B35]" strokeWidth={3} />}
            </div>
            <span className="text-sm text-[#94A3B8] leading-relaxed">
              I accept the{' '}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="text-[#00E5CC] underline hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
            </span>
          </div>

          {/* WhatsApp toggle */}
          <div className="card p-4 mt-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-white">Enable WhatsApp supplement reminders</div>
                <div className="text-xs text-[#64748B] mt-0.5">Get daily check-in messages and retest reminders on WhatsApp.</div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsapp(!whatsapp)}
                className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-all duration-200 ${whatsapp ? 'bg-[#00E5CC]' : 'bg-white/[0.12]'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${whatsapp ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
            {whatsapp && (
              <div className="mt-3">
                <label className="label">Phone Number</label>
                <div className="flex gap-2">
                  <div className="input w-16 flex items-center justify-center text-sm text-[#94A3B8] bg-[#0F2040]">+91</div>
                  <div className="relative flex-1">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      className="input pl-8"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Non-dismissible disclaimer */}
        <div className="p-4 rounded-xl bg-[#142447] border border-[#F59E0B]/20 mb-6">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            <span className="text-[#F59E0B] font-semibold">Important: </span>
            Zenoho is a performance optimisation platform. It is not a substitute for medical care. All insights should be discussed with a licensed physician.
          </p>
        </div>

        <div className="flex justify-between">
          <button type="button" className="btn-ghost text-sm" onClick={onBack}>← Back</button>
          <button type="button" className="btn-primary flex items-center gap-2 text-sm" onClick={onFinish} disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} /> Complete setup</>}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function OnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [step2, setStep2] = useState<Step2Form>({
    name: '', date_of_birth: '', gender: '', city: '', dietary_pattern: '', activity_level: '',
  });
  const [intents, setIntents] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [phone, setPhone] = useState('');

  async function saveStep2() {
    if (!step2.name.trim()) { setError('Full name is required.'); return false; }
    if (!step2.date_of_birth) { setError('Date of birth is required.'); return false; }
    if (!step2.gender) { setError('Please select a gender.'); return false; }
    if (!step2.dietary_pattern) { setError('Please select a dietary pattern.'); return false; }
    if (!step2.activity_level) { setError('Please select an activity level.'); return false; }
    setError('');
    await supabase.from('users').update({
      name: step2.name,
      date_of_birth: step2.date_of_birth,
      gender: step2.gender,
      city: step2.city || null,
      dietary_pattern: step2.dietary_pattern,
      activity_level: step2.activity_level,
    }).eq('id', user!.id);
    return true;
  }

  async function saveStep3() {
    if (intents.length === 0) { setError('Please select at least one performance goal.'); return false; }
    setError('');
    await supabase.from('users').update({
      performance_intent: intents[0],
      secondary_intent: intents[1] ?? null,
    }).eq('id', user!.id);
    return true;
  }

  async function handleFinish() {
    if (!terms || !privacy) { setError('Please accept both Terms of Service and Privacy Policy.'); return; }
    setLoading(true);
    setError('');
    try {
      const phoneValue = whatsapp && phone ? `+91${phone}` : undefined;
      const { error: err } = await supabase.from('users').update({
        conditions,
        ...(phoneValue ? { phone: phoneValue } : {}),
        terms_accepted_at: new Date().toISOString(),
        privacy_accepted_at: new Date().toISOString(),
        notification_preferences: {
          supplement_reminders: true,
          streak_milestones: true,
          retest_reminders: true,
          whatsapp_enabled: whatsapp,
        },
        onboarded_at: new Date().toISOString(),
      }).eq('id', user!.id);
      if (err) { setError(err.message); return; }
      await refreshProfile();
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) return <Step1 onNext={() => setStep(2)} />;

  return (
    <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00E5CC]/[0.04] blur-[150px] pointer-events-none" />
      <div className="w-full max-w-xl relative z-10">
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>
        <ProgressBar step={step} />
        <div className="card p-6 lg:p-8">
          {step === 2 && (
            <Step2
              form={step2} setForm={setStep2} error={error}
              onBack={() => setStep(1)}
              onNext={async () => { if (await saveStep2()) setStep(3); }}
            />
          )}
          {step === 3 && (
            <Step3
              intents={intents} setIntents={setIntents} error={error}
              onBack={() => setStep(2)}
              onNext={async () => { if (await saveStep3()) setStep(4); }}
            />
          )}
          {step === 4 && (
            <Step4
              medications={medications} setMedications={setMedications}
              conditions={conditions} setConditions={setConditions}
              onBack={() => setStep(3)} onNext={() => { setError(''); setStep(5); }}
            />
          )}
          {step === 5 && (
            <Step5
              terms={terms} setTerms={setTerms}
              privacy={privacy} setPrivacy={setPrivacy}
              whatsapp={whatsapp} setWhatsapp={setWhatsapp}
              phone={phone} setPhone={setPhone}
              onBack={() => setStep(4)} onFinish={handleFinish}
              loading={loading} error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}

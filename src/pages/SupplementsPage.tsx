import { useEffect, useState } from 'react';
import { Pill, AlertTriangle, X, Phone, Check, Flame, FlaskConical, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

// ─── Types ────────────────────────────────────────────────────────────────────

type Supplement = {
  id: string;
  supplement_name: string;
  tier: number;
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
  premium_form_name: string | null;
  premium_form_extra_cost_paise: number | null;
  ayurvedic_classical_name: string | null;
  ayush_recognised: boolean;
  panel_id: string;
};

type ReminderSetting = {
  supplement_id: string;
  enabled: boolean;
  remind_at: string;
};

type StreakRow = {
  id: string;
  streak_type: string;
  current_streak: number;
  longest_streak: number;
  last_logged_at: string | null;
  last_prompted_date: string | null;
};

// ─── Experimental compounds (educational only) ────────────────────────────────

const EXPERIMENTAL = [
  { name: 'NMN (Nicotinamide Mononucleotide)', note: 'Precursor to NAD+. Early human trials suggest potential in cellular energy metabolism. Ongoing Phase 2 trials.' },
  { name: 'NR (Nicotinamide Riboside)', note: 'Another NAD+ precursor. Smaller evidence base than NMN. Some human trials on muscle function underway.' },
  { name: 'Urolithin A', note: 'Gut-derived compound from ellagitannins. Early data on mitophagy and muscle health. Phase 2 trials ongoing.' },
  { name: 'Fisetin', note: 'Senolytic flavonoid. Animal data strong; limited human trials. No dosing recommendation at this stage.' },
];

// Supplements where a premium bioavailable form is available
const PREMIUM_FORM_MAP: Record<string, { stdLabel: string; premLabel: string; extraRs: number }> = {
  magnesium:   { stdLabel: 'Magnesium Oxide',  premLabel: 'Magnesium Glycinate',       extraRs: 180 },
  'vitamin c': { stdLabel: 'Ascorbic Acid',    premLabel: 'Liposomal Vitamin C',       extraRs: 320 },
  curcumin:    { stdLabel: 'Standard Curcumin',premLabel: 'BCM-95 (95% bioavailability)',extraRs: 250 },
  iron:        { stdLabel: 'Ferrous Sulphate', premLabel: 'Iron Bisglycinate (gentler)',extraRs: 150 },
  coq10:       { stdLabel: 'Ubiquinone',       premLabel: 'Ubiquinol (active form)',   extraRs: 400 },
};

function getPremiumInfo(name: string) {
  const key = Object.keys(PREMIUM_FORM_MAP).find(k => name.toLowerCase().includes(k));
  return key ? PREMIUM_FORM_MAP[key] : null;
}

// ─── WhatsApp modal ───────────────────────────────────────────────────────────

function WhatsAppModal({ onClose, onSave }: { onClose: () => void; onSave: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  function save() {
    if (phone.replace(/\D/g, '').length !== 10) { setErr('Enter a valid 10-digit number.'); return; }
    onSave(`+91${phone.replace(/\D/g, '')}`);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-sm shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h3 className="font-semibold text-white text-sm">Enable WhatsApp Reminders</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08] transition-all"><X size={14} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-[#94A3B8]">Enter your phone number to receive daily supplement reminders on WhatsApp.</p>
          {err && <p className="text-xs text-[#EF4444]">{err}</p>}
          <div>
            <label className="label">Phone Number</label>
            <div className="flex gap-2">
              <div className="input w-14 flex items-center justify-center text-sm text-[#94A3B8]">+91</div>
              <div className="relative flex-1">
                <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input className="input pl-8" placeholder="98765 43210"
                  value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/[0.08] flex gap-2">
          <button onClick={onClose} className="btn-ghost text-sm flex-1">Cancel</button>
          <button onClick={save} className="btn-primary text-sm flex-1">Enable</button>
        </div>
      </div>
    </div>
  );
}

// ─── Experimental modal ───────────────────────────────────────────────────────

function ExperimentalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] flex-shrink-0">
          <div>
            <h3 className="font-semibold text-white text-sm">Experimental Compounds</h3>
            <p className="text-[10px] text-[#EF4444] mt-0.5">Educational only — not recommendations</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08]"><X size={14} /></button>
        </div>
        <div className="overflow-y-auto px-6 py-5 space-y-4">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#EF4444]/8 border border-[#EF4444]/20">
            <AlertTriangle size={14} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#EF4444] leading-relaxed">These compounds are in early-stage or ongoing human trials. Zenoho does not recommend dose, timing, or use of any experimental compound. This information is educational only. Discuss any interest with a licensed physician.</p>
          </div>
          {EXPERIMENTAL.map(e => (
            <div key={e.name} className="card p-4">
              <div className="font-semibold text-white text-sm mb-1">{e.name}</div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{e.note}</p>
              <div className="mt-2 text-[10px] text-[#64748B] italic">No dose recommendation available.</div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-white/[0.08] flex-shrink-0">
          <button onClick={onClose} className="btn-primary w-full text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Supplement card ──────────────────────────────────────────────────────────

function SupplementCard({
  s, reminderSetting, onReminderToggle, onTimeChange, profileName, whatsappEnabled,
}: {
  s: Supplement;
  reminderSetting: ReminderSetting | undefined;
  onReminderToggle: (id: string, v: boolean) => void;
  onTimeChange: (id: string, t: string) => void;
  profileName: string | null;
  whatsappEnabled: boolean;
}) {
  const [premiumMode, setPremiumMode] = useState(false);
  const premInfo = getPremiumInfo(s.supplement_name);
  const displayName = premiumMode && premInfo ? premInfo.premLabel : s.supplement_name;
  const doseStr = [s.dose_amount && `${s.dose_amount}${s.dose_unit || ''}`, s.dose_frequency, s.dose_timing].filter(Boolean).join(' · ');
  const preview = `Good morning ${profileName || 'there'} 👋 Time for your ${displayName}${doseStr ? ` ${doseStr}` : ''}${s.pair_with ? `. Take with ${s.pair_with}` : ''} and food.`;

  const tierBadge =
    s.tier === 1 ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5CC]/10 text-[#00E5CC] border border-[#00E5CC]/20 font-medium">Tier 1</span> :
    s.tier === 2 ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20 font-medium">Tier 2</span> :
    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 font-medium">Tier 3</span>;

  return (
    <div className="card p-5 space-y-3">
      {/* Name + badge */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-white text-base leading-tight">{displayName}</h4>
        {tierBadge}
      </div>

      {doseStr && <p className="text-sm text-[#94A3B8]">{doseStr}</p>}
      {s.pair_with && <p className="text-xs text-[#64748B]">Pair with: <span className="text-[#94A3B8]">{s.pair_with}</span></p>}

      {s.trigger_marker_id && (
        <p className="text-xs text-[#64748B]">Triggered by: <span className="text-[#94A3B8]">Marker {s.trigger_marker_id}</span>{s.trigger_zone && <> at <span className="text-[#94A3B8]">{s.trigger_zone}</span></>}</p>
      )}

      {s.drug_interaction_warning && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25">
          <AlertTriangle size={13} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <span className="text-xs text-[#F59E0B]">{s.drug_interaction_warning}</span>
        </div>
      )}

      {s.tier === 3 && (
        <div className="px-3 py-2.5 rounded-xl bg-[#F59E0B]/6 border border-[#F59E0B]/15">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            From classical Ayurvedic tradition. Labeled Traditional because large-scale RCT evidence is limited.{' '}
            <span className="text-[#F59E0B]">Discuss with your physician.</span>
          </p>
          {s.ayurvedic_classical_name && <p className="text-[10px] text-[#64748B] mt-1">Classical name: {s.ayurvedic_classical_name}</p>}
        </div>
      )}

      {/* Premium toggle — Tier 1 only */}
      {s.tier === 1 && premInfo && (
        <div className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white mb-0.5">
              {premiumMode ? `Premium: ${premInfo.premLabel}` : `Standard: ${premInfo.stdLabel}`}
            </div>
            <div className="text-[10px] text-[#64748B]">
              {premiumMode ? `Better absorbed · ₹${premInfo.extraRs} more/month` : `Switch to premium form: ₹${premInfo.extraRs} more/month`}
            </div>
          </div>
          <button type="button" onClick={() => setPremiumMode(p => !p)}
            className={`relative w-10 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${premiumMode ? 'bg-[#00E5CC]' : 'bg-white/[0.12]'}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${premiumMode ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
      )}

      {/* Reminder row */}
      {whatsappEnabled && (
        <div className="border-t border-white/[0.06] pt-3 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#94A3B8]">Remind me to take this daily</span>
            <button type="button" onClick={() => onReminderToggle(s.id, !reminderSetting?.enabled)}
              className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-all duration-200 ${reminderSetting?.enabled ? 'bg-[#00E5CC]' : 'bg-white/[0.12]'}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${reminderSetting?.enabled ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
          {reminderSetting?.enabled && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B]">Remind me at</span>
              <input type="time" className="input text-xs py-1.5 px-2 w-28"
                value={reminderSetting.remind_at || '08:00'}
                onChange={e => onTimeChange(s.id, e.target.value)} />
            </div>
          )}
          {reminderSetting?.enabled && (
            <div className="px-3 py-2 rounded-lg bg-[#142447] border border-white/[0.06]">
              <p className="text-[10px] text-[#64748B] leading-relaxed">Preview: <span className="text-[#94A3B8]">{preview}</span></p>
            </div>
          )}
        </div>
      )}

      <p className="text-[10px] text-[#64748B] leading-relaxed border-t border-white/[0.04] pt-2">
        Performance supplement recommendation, not a prescription. Discuss with your physician if on any medication.
      </p>
    </div>
  );
}

// ─── 7-day adherence grid ─────────────────────────────────────────────────────

function AdherenceGrid({ streak, onLog }: { streak: StreakRow | null; onLog: () => void }) {
  const today = new Date().toISOString().split('T')[0];
  const alreadyLogged = streak?.last_prompted_date === today;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-white text-sm">7-Day Adherence</h4>
          {streak && streak.current_streak > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Flame size={13} className="text-[#F59E0B]" />
              <span className="text-sm font-semibold text-[#F59E0B]">{streak.current_streak}-day streak</span>
            </div>
          )}
        </div>
        {alreadyLogged
          ? <span className="text-xs text-[#10B981] flex items-center gap-1"><Check size={12} /> Logged today</span>
          : <button onClick={onLog} className="btn-primary flex items-center gap-1.5 text-xs px-3 py-2"><Check size={12} /> Taken today</button>
        }
      </div>
      <div className="flex gap-1.5">
        {days.map(d => {
          const isLogged = streak?.last_logged_at ? streak.last_logged_at.startsWith(d) : false;
          const isToday = d === today;
          return (
            <div key={d} title={d}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-medium transition-all ${
                isLogged ? 'bg-[#00E5CC] text-[#0D1B35]' :
                isToday ? 'bg-[#00E5CC]/20 border border-[#00E5CC]/40 text-[#00E5CC]' :
                'bg-white/[0.05] text-[#64748B]'
              }`}>
              {new Date(d + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 1)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function SupplementsPage() {
  const { profile, user } = useAuth();
  const { navigate } = useRouter();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [latestDate, setLatestDate] = useState<string | null>(null);
  const [reminders, setReminders] = useState<ReminderSetting[]>([]);
  const [streak, setStreak] = useState<StreakRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [showExperimentalWarning, setShowExperimentalWarning] = useState(false);
  const [showExperimental, setShowExperimental] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const whatsappEnabled = !!(profile?.notification_preferences?.whatsapp_enabled);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const { data: panels } = await supabase.from('panels').select('id, collected_on')
        .eq('user_id', user.id).eq('processing_status', 'complete')
        .order('collected_on', { ascending: false }).limit(1);
      const panel = panels?.[0] ?? null;
      if (panel) setLatestDate(panel.collected_on);

      const [{ data: sups }, { data: rs }, { data: st }] = await Promise.all([
        panel
          ? supabase.from('supplement_recommendations').select('*').eq('panel_id', panel.id).eq('is_active', true).order('tier')
          : { data: [] },
        supabase.from('supplement_reminder_settings').select('supplement_id, enabled, remind_at').eq('user_id', user.id),
        supabase.from('behavior_streaks').select('*').eq('user_id', user.id).eq('streak_type', 'supplement_taken').maybeSingle(),
      ]);

      setSupplements(sups ?? []);
      setReminders((rs ?? []).map((r: any) => ({ supplement_id: r.supplement_id, enabled: r.enabled, remind_at: r.remind_at?.slice(0, 5) ?? '08:00' })));
      setStreak(st as StreakRow | null);
      setLoading(false);
    }
    load();
  }, [user]);

  function getReminder(id: string) { return reminders.find(r => r.supplement_id === id); }

  function handleToggle(id: string, enabled: boolean) {
    setReminders(prev => {
      const ex = prev.find(r => r.supplement_id === id);
      if (ex) return prev.map(r => r.supplement_id === id ? { ...r, enabled } : r);
      return [...prev, { supplement_id: id, enabled, remind_at: '08:00' }];
    });
  }

  function handleTimeChange(id: string, t: string) {
    setReminders(prev => prev.map(r => r.supplement_id === id ? { ...r, remind_at: t } : r));
  }

  async function saveReminders() {
    if (!user) return;
    setSaving(true);
    for (const r of reminders) {
      await supabase.from('supplement_reminder_settings').upsert({
        user_id: user.id, supplement_id: r.supplement_id,
        enabled: r.enabled, remind_at: r.remind_at + ':00',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,supplement_id' });
    }
    setSaving(false); setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  async function handleEnableWhatsApp(phone: string) {
    if (!user) return;
    await supabase.from('users').update({
      phone,
      notification_preferences: { ...profile?.notification_preferences, whatsapp_enabled: true },
    }).eq('id', user.id);
    setShowWhatsAppModal(false);
    window.location.reload();
  }

  async function handleLogToday() {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    if (streak) {
      const lastDate = streak.last_logged_at?.split('T')[0] ?? null;
      const yest = new Date(); yest.setDate(yest.getDate() - 1);
      const yestStr = yest.toISOString().split('T')[0];
      const newStreak = lastDate === yestStr ? streak.current_streak + 1 : 1;
      const longest = Math.max(newStreak, streak.longest_streak);
      await supabase.from('behavior_streaks').update({
        current_streak: newStreak, longest_streak: longest,
        last_logged_at: new Date().toISOString(), last_prompted_date: today,
        updated_at: new Date().toISOString(),
      }).eq('id', streak.id);
      setStreak(s => s ? { ...s, current_streak: newStreak, longest_streak: longest, last_logged_at: new Date().toISOString(), last_prompted_date: today } : s);
    } else {
      const { data } = await supabase.from('behavior_streaks').insert({
        user_id: user.id, streak_type: 'supplement_taken', current_streak: 1, longest_streak: 1,
        last_logged_at: new Date().toISOString(), last_prompted_date: today,
      }).select().single();
      setStreak(data as StreakRow);
    }
  }

  const tier1 = supplements.filter(s => s.tier === 1);
  const tier2 = supplements.filter(s => s.tier === 2);
  const tier3 = supplements.filter(s => s.tier === 3);
  const hasSupplements = supplements.length > 0;

  if (loading) {
    return (
      <div className="flex-1 p-6 lg:p-8 space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="card h-32 animate-pulse opacity-40" />)}
      </div>
    );
  }

  return (
    <>
      {showWhatsAppModal && <WhatsAppModal onClose={() => setShowWhatsAppModal(false)} onSave={handleEnableWhatsApp} />}
      {showExperimentalWarning && !showExperimental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowExperimentalWarning(false); }}>
          <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-sm shadow-2xl animate-slide-up p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#EF4444]" />
              <h3 className="font-semibold text-white">Experimental Compounds</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              These compounds are in early-stage human trials. Zenoho does not recommend their use and provides this information for educational purposes only. Always consult a licensed physician.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowExperimentalWarning(false)} className="btn-ghost text-sm flex-1">Cancel</button>
              <button onClick={() => { setShowExperimentalWarning(false); setShowExperimental(true); }} className="btn-secondary text-sm flex-1">I understand, continue</button>
            </div>
          </div>
        </div>
      )}
      {showExperimental && <ExperimentalModal onClose={() => setShowExperimental(false)} />}

      <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Personalised Protocol</h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Every supplement here is driven by your blood values — not your goal.
            {latestDate && <> Specific to your panel from <span className="text-white">{formatDate(latestDate)}</span>.</>}
          </p>
        </div>

        {!hasSupplements && (
          <div className="card p-12 text-center border-dashed border-2 border-white/[0.08]">
            <FlaskConical size={36} className="text-[#00E5CC] mx-auto mb-4 opacity-60" />
            <h3 className="font-semibold text-white mb-2">No protocol yet</h3>
            <p className="text-[#94A3B8] text-sm mb-5 max-w-xs mx-auto">Upload a blood report to unlock your personalised supplement protocol.</p>
            <button onClick={() => navigate('/reports/upload')} className="btn-primary inline-flex items-center gap-2 text-sm">
              <Upload size={15} /> Upload Report
            </button>
          </div>
        )}

        {/* Tier 1 */}
        {tier1.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00E5CC]" />
              <h2 className="font-bold text-white">Tier 1</h2>
              <span className="text-sm text-[#64748B]">— Strong RCT Evidence</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tier1.map(s => <SupplementCard key={s.id} s={s} reminderSetting={getReminder(s.id)} onReminderToggle={handleToggle} onTimeChange={handleTimeChange} profileName={profile?.name ?? null} whatsappEnabled={whatsappEnabled} />)}
            </div>
          </section>
        )}

        {/* Tier 2 */}
        {tier2.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
              <h2 className="font-bold text-white">Tier 2</h2>
              <span className="text-sm text-[#64748B]">— Moderate RCT Evidence</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tier2.map(s => <SupplementCard key={s.id} s={s} reminderSetting={getReminder(s.id)} onReminderToggle={handleToggle} onTimeChange={handleTimeChange} profileName={profile?.name ?? null} whatsappEnabled={whatsappEnabled} />)}
            </div>
          </section>
        )}

        {/* Tier 3 */}
        {tier3.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <h2 className="font-bold text-white">Tier 3</h2>
              <span className="text-sm text-[#64748B]">— Classical Tradition — AYUSH Recognised</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tier3.map(s => <SupplementCard key={s.id} s={s} reminderSetting={getReminder(s.id)} onReminderToggle={handleToggle} onTimeChange={handleTimeChange} profileName={profile?.name ?? null} whatsappEnabled={whatsappEnabled} />)}
            </div>
          </section>
        )}

        {/* Reminders section */}
        {hasSupplements && (
          <section className="border-t border-white/[0.06] pt-6 space-y-4">
            <h2 className="font-bold text-white">Daily Supplement Reminders</h2>
            {whatsappEnabled ? (
              <>
                <p className="text-sm text-[#94A3B8]">Toggle reminders on each card above, then save.</p>
                <button onClick={saveReminders} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                  {saving ? 'Saving...' : savedMsg ? <><Check size={14} /> Saved</> : 'Save reminder settings'}
                </button>
              </>
            ) : (
              <div className="card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white font-medium">Enable WhatsApp reminders to get daily check-ins.</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Receive a personalised message every morning.</p>
                </div>
                <button onClick={() => setShowWhatsAppModal(true)} className="btn-primary text-sm flex-shrink-0">Enable WhatsApp</button>
              </div>
            )}
            <AdherenceGrid streak={streak} onLog={handleLogToday} />
          </section>
        )}

        {/* Experimental link */}
        {hasSupplements && (
          <div className="text-center pb-4">
            <button onClick={() => setShowExperimentalWarning(true)} className="text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors underline underline-offset-2">
              Explore experimental supplements →
            </button>
          </div>
        )}

        {/* Page footer */}
        {hasSupplements && (
          <div className="px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
            <p className="text-xs text-[#64748B] leading-relaxed text-center">
              Zenoho is a performance optimisation platform, not a medical service. Do not exceed recommended doses. All recommendations should be discussed with a licensed physician.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function formatDate(d: string) {
  return new Date(d + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

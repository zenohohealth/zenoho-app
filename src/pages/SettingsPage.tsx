import { useState } from 'react';
import { Save, Loader2, Bell, User, Shield, Watch, Pill, Database, Info, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';
import { supabase } from '../lib/supabase';

const DIETARY_OPTIONS = ['omnivore', 'vegetarian', 'vegan', 'pescatarian', 'other'];
const ACTIVITY_OPTIONS = [
  { val: 'sedentary', label: 'Sedentary' },
  { val: 'moderate', label: 'Moderately Active' },
  { val: 'athlete', label: 'Athlete' },
];
const INTENT_OPTIONS = [
  { val: 'longevity', label: 'Live Longer, Better' },
  { val: 'energy', label: 'Energy & Vitality' },
  { val: 'mental_sharpness', label: 'Mental Sharpness' },
  { val: 'athletic_recovery', label: 'Athletic Recovery' },
  { val: 'hormonal_balance', label: 'Hormonal Balance' },
  { val: 'stress_sleep', label: 'Stress & Sleep' },
];

const CONDITION_CHIPS = [
  'Diabetes', 'Pre-diabetes / Insulin Resistance', 'Hypertension',
  'High Cholesterol (on medication)', 'Thyroid Disorder', 'PCOS',
  'Fatty Liver / NAFLD', 'Anaemia', 'Gout', 'Autoimmune Condition',
  'Depression / Anxiety', 'Heart Condition', 'Kidney Disease', 'None of the above',
];

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[#00E5CC]">{icon}</span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange, label, desc }: { value: boolean; onChange: (v: boolean) => void; label: string; desc?: string }) {
  return (
    <div className="flex items-center justify-between py-2 gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white">{label}</div>
        {desc && <div className="text-xs text-[#64748B]">{desc}</div>}
      </div>
      <button type="button" onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-all duration-200 ${value ? 'bg-[#00E5CC]' : 'bg-white/[0.12]'}`}>
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${value ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const { profile, user, refreshProfile, signOut } = useAuth();
  const { navigate } = useRouter();
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: profile?.name ?? '',
    city: profile?.city ?? '',
    dietary_pattern: profile?.dietary_pattern ?? '',
    activity_level: profile?.activity_level ?? '',
    performance_intent: profile?.performance_intent ?? '',
  });
  const [notifForm, setNotifForm] = useState({
    supplement_reminders: profile?.notification_preferences?.supplement_reminders ?? true,
    streak_milestones: profile?.notification_preferences?.streak_milestones ?? true,
    retest_reminders: profile?.notification_preferences?.retest_reminders ?? true,
    whatsapp_enabled: profile?.notification_preferences?.whatsapp_enabled ?? false,
    phone: profile?.phone ?? '',
  });
  const [conditions, setConditions] = useState<string[]>(profile?.conditions ?? []);
  const [medications, setMedications] = useState('');

  async function save() {
    if (!user) return;
    setSaving(true); setError('');
    const { error: e } = await supabase.from('users').update({
      name: profileForm.name,
      city: profileForm.city || null,
      dietary_pattern: profileForm.dietary_pattern || null,
      activity_level: profileForm.activity_level || null,
      performance_intent: profileForm.performance_intent || null,
      phone: notifForm.phone || null,
      conditions,
      notification_preferences: {
        supplement_reminders: notifForm.supplement_reminders,
        streak_milestones: notifForm.streak_milestones,
        retest_reminders: notifForm.retest_reminders,
        whatsapp_enabled: notifForm.whatsapp_enabled,
      },
    }).eq('id', user.id);
    if (e) { setError(e.message); } else {
      await refreshProfile();
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  function toggleCondition(c: string) {
    if (c === 'None of the above') { setConditions(conditions.includes(c) ? [] : ['None of the above']); return; }
    const without = conditions.filter(x => x !== 'None of the above');
    setConditions(without.includes(c) ? without.filter(x => x !== c) : [...without, c]);
  }

  const SECTIONS = [
    { id: 'profile', label: 'Profile', icon: <User size={15} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
    { id: 'subscription', label: 'Subscription', icon: <Shield size={15} /> },
    { id: 'wearables', label: 'Wearables', icon: <Watch size={15} /> },
    { id: 'health', label: 'Medications & Conditions', icon: <Pill size={15} /> },
    { id: 'privacy', label: 'Data & Privacy', icon: <Database size={15} /> },
    { id: 'about', label: 'About', icon: <Info size={15} /> },
  ];

  return (
    <div className="flex-1 min-h-screen animate-fade-in">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar nav */}
        <aside className="md:w-56 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] p-4 md:p-6 md:min-h-screen">
          <h1 className="text-xl font-bold text-white mb-4 hidden md:block">Settings</h1>
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeSection === s.id
                    ? 'bg-[#00E5CC]/12 text-[#00E5CC] border border-[#00E5CC]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
                }`}>
                {s.icon}{s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8 max-w-2xl space-y-6">
          {error && <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm">{error}</div>}

          {/* Profile */}
          {activeSection === 'profile' && (
            <Section icon={<User size={16} />} title="Profile">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Full Name</label>
                  <input className="input" value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div><label className="label">City</label>
                  <input className="input" value={profileForm.city} onChange={e => setProfileForm(f => ({ ...f, city: e.target.value }))} /></div>
                <div><label className="label">Email</label>
                  <input className="input opacity-50 cursor-not-allowed" value={profile?.email ?? ''} disabled /></div>
                <div><label className="label">Date of Birth</label>
                  <input className="input opacity-50 cursor-not-allowed" value={profile?.date_of_birth ?? ''} disabled /></div>
              </div>
              <div><label className="label">Dietary Pattern</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {DIETARY_OPTIONS.map(d => (
                    <button key={d} type="button" onClick={() => setProfileForm(f => ({ ...f, dietary_pattern: d }))}
                      className={`py-2 rounded-xl border text-xs font-medium capitalize transition-all ${
                        profileForm.dietary_pattern === d ? 'border-[#00E5CC] bg-[#00E5CC]/10 text-white' : 'border-white/[0.08] bg-[#142447] text-[#94A3B8] hover:border-white/20'
                      }`}>{d}</button>
                  ))}
                </div>
              </div>
              <div><label className="label">Activity Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {ACTIVITY_OPTIONS.map(a => (
                    <button key={a.val} type="button" onClick={() => setProfileForm(f => ({ ...f, activity_level: a.val }))}
                      className={`py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        profileForm.activity_level === a.val ? 'border-[#00E5CC] bg-[#00E5CC]/10 text-white' : 'border-white/[0.08] bg-[#142447] text-[#94A3B8] hover:border-white/20'
                      }`}>{a.label}</button>
                  ))}
                </div>
              </div>
              <div><label className="label">Primary Performance Goal</label>
                <select className="input" value={profileForm.performance_intent} onChange={e => setProfileForm(f => ({ ...f, performance_intent: e.target.value }))}>
                  <option value="">Select…</option>
                  {INTENT_OPTIONS.map(i => <option key={i.val} value={i.val}>{i.label}</option>)}
                </select>
              </div>
            </Section>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <Section icon={<Bell size={16} />} title="Notifications">
              <Toggle value={notifForm.supplement_reminders} onChange={v => setNotifForm(f => ({ ...f, supplement_reminders: v }))} label="Supplement Reminders" desc="Daily reminders to take your supplements" />
              <Toggle value={notifForm.streak_milestones} onChange={v => setNotifForm(f => ({ ...f, streak_milestones: v }))} label="Streak Milestones" desc="Alerts when you hit streak goals" />
              <Toggle value={notifForm.retest_reminders} onChange={v => setNotifForm(f => ({ ...f, retest_reminders: v }))} label="Retest Reminders" desc="Remind me when my next panel is due" />
              <Toggle value={notifForm.whatsapp_enabled} onChange={v => setNotifForm(f => ({ ...f, whatsapp_enabled: v }))} label="WhatsApp Notifications" desc="Receive notifications via WhatsApp" />
              {notifForm.whatsapp_enabled && (
                <div><label className="label">Phone Number (+91)</label>
                  <div className="flex gap-2">
                    <div className="input w-14 flex items-center justify-center text-sm text-[#94A3B8]">+91</div>
                    <input className="input flex-1" placeholder="98765 43210"
                      value={notifForm.phone.replace('+91', '')}
                      onChange={e => setNotifForm(f => ({ ...f, phone: '+91' + e.target.value.replace(/\D/g, '').slice(0, 10) }))} />
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* Subscription */}
          {activeSection === 'subscription' && (
            <Section icon={<Shield size={16} />} title="Subscription">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
                <div className="flex-1">
                  <div className="text-xs text-[#64748B]">Current plan</div>
                  <div className="text-white font-semibold capitalize mt-0.5">{profile?.subscription_tier ?? 'free'}</div>
                </div>
                <button onClick={() => navigate('/billing')} className="btn-primary text-sm flex items-center gap-1.5">
                  Manage plan <ChevronRight size={13} />
                </button>
              </div>
              <button onClick={() => navigate('/billing')} className="text-sm text-[#00E5CC] hover:underline">
                View all plans →
              </button>
              {profile?.subscription_tier !== 'free' && (
                <div className="pt-2 border-t border-white/[0.06]">
                  <button className="text-xs text-[#64748B] hover:text-[#EF4444] transition-colors">Cancel subscription</button>
                  <p className="text-[10px] text-[#64748B] mt-1">Cancellation takes effect at end of current billing period.</p>
                </div>
              )}
            </Section>
          )}

          {/* Wearables */}
          {activeSection === 'wearables' && (
            <Section icon={<Watch size={16} />} title="Wearables">
              <p className="text-sm text-[#94A3B8]">Manage your connected devices and wearable data settings.</p>
              <button onClick={() => navigate('/wearables')} className="btn-primary text-sm flex items-center gap-2">
                <Watch size={14} /> Manage Wearables →
              </button>
              {profile?.wearable_consent_at && (
                <p className="text-xs text-[#64748B]">
                  Wearable consent granted on {new Date(profile.wearable_consent_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}.
                </p>
              )}
            </Section>
          )}

          {/* Medications & Conditions */}
          {activeSection === 'health' && (
            <Section icon={<Pill size={16} />} title="Medications & Conditions">
              <div>
                <label className="label">Current Medications</label>
                <textarea className="input resize-none h-24" placeholder="e.g. Metformin 500mg, Levothyroxine 50mcg"
                  value={medications} onChange={e => setMedications(e.target.value)} />
              </div>
              <div>
                <label className="label">Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {CONDITION_CHIPS.map(c => {
                    const sel = conditions.includes(c);
                    return (
                      <button key={c} type="button" onClick={() => toggleCondition(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          sel ? 'border-[#00E5CC] bg-[#00E5CC]/10 text-white' : 'border-white/[0.08] bg-[#142447] text-[#94A3B8] hover:border-white/20'
                        }`}>{sel && '✓ '}{c}</button>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-[#64748B]">Used only to flag supplement-drug interactions. Never shared.</p>
            </Section>
          )}

          {/* Data & Privacy */}
          {activeSection === 'privacy' && (
            <Section icon={<Database size={16} />} title="Data & Privacy">
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06] hover:border-white/15 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">Download my data</span>
                    <ChevronRight size={14} className="text-[#64748B] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">Export all your health data as a JSON file. (Coming soon)</p>
                </button>
                <div className="px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    <span className="text-white font-medium">Data retention:</span> Your health data is retained for 24 months from your last active session. Blood reports are stored encrypted.
                  </p>
                </div>
                {!showDeleteConfirm ? (
                  <button onClick={() => setShowDeleteConfirm(true)} className="text-xs text-[#64748B] hover:text-[#EF4444] transition-colors">
                    Delete my account
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#EF4444]/8 border border-[#EF4444]/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#EF4444] leading-relaxed">
                        Account deletion is subject to a 30-day grace period. All data will be permanently deleted after this period. This cannot be undone.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowDeleteConfirm(false)} className="btn-ghost text-xs flex-1">Cancel</button>
                      <button onClick={() => { signOut(); }} className="text-xs flex-1 bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/25 rounded-lg py-2 font-medium">
                        Request Deletion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* About */}
          {activeSection === 'about' && (
            <Section icon={<Info size={16} />} title="About">
              <div className="space-y-3">
                {[
                  { label: 'App Version', value: 'v1.0.0' },
                  { label: 'Platform', value: 'Zenoho Health Private Limited' },
                  { label: 'Support', value: 'support@zenoho.health' },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
                    <span className="text-xs text-[#64748B]">{r.label}</span>
                    <span className="text-xs text-white font-medium">{r.value}</span>
                  </div>
                ))}
                <div className="flex gap-3 pt-1">
                  <button className="text-xs text-[#00E5CC] hover:underline">Terms of Service</button>
                  <span className="text-[#64748B]">·</span>
                  <button className="text-xs text-[#00E5CC] hover:underline">Privacy Policy</button>
                </div>
              </div>
            </Section>
          )}

          {/* Save button */}
          {['profile', 'notifications', 'health'].includes(activeSection) && (
            <div className="flex items-center gap-3">
              <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>
              {saved && <span className="text-[#10B981] text-sm font-medium">Saved!</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Watch, Activity, Heart, Moon, Zap, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

type DailyData = {
  date: string;
  steps: number | null;
  active_calories: number | null;
  hrv_rmssd: number | null;
  resting_hr: number | null;
  sleep_duration_min: number | null;
  sleep_score: number | null;
};

type Connection = {
  id: string;
  provider: string | null;
  status: string;
  connected_at: string;
  last_sync_at: string | null;
};

type WScore = { w_score: number | null; week_start: string; confidence: string | null };

const DEVICES = [
  { name: 'Apple Watch', color: '#94A3B8', initial: 'AW' },
  { name: 'Garmin', color: '#006CB7', initial: 'G' },
  { name: 'Oura Ring', color: '#10B981', initial: 'OR' },
  { name: 'Fitbit', color: '#00B0B9', initial: 'FB' },
  { name: 'Samsung', color: '#1428A0', initial: 'SH' },
  { name: 'Whoop', color: '#EF4444', initial: 'WP' },
  { name: 'Polar', color: '#D32F2F', initial: 'PL' },
  { name: 'Withings', color: '#5B5EA6', initial: 'W' },
];

function WScoreGauge({ score }: { score: number }) {
  const size = 120, stroke = 8, r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const color = '#A78BFA';
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={`${(score/100)*circ} ${circ-(score/100)*circ}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}60)`, transition: 'stroke-dasharray 1.2s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-2xl text-white leading-none">{score.toFixed(0)}</span>
        <span className="text-[9px] text-[#64748B] mt-0.5 uppercase tracking-wider">W-Score</span>
      </div>
    </div>
  );
}

function ConsentModal({ onAgree, onCancel }: { onAgree: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="bg-[#0F2040] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h3 className="font-semibold text-white">Connect Your Wearable</h3>
          <button onClick={onCancel} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08]"><X size={14} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            By connecting your device, you allow Zenoho to receive your daily activity, sleep, and heart rate data via Terra. Used only to calculate your W-Score and support your challenges. You can disconnect any time from Settings. Data stored for 24 months per our Privacy Policy.
          </p>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#142447] border border-white/[0.06]">
            <Watch size={13} className="text-[#00E5CC] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#64748B]">Terra API connects securely. Raw data is never sold or shared with third parties.</p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-2">
          <button onClick={onCancel} className="btn-ghost text-sm flex-1">Cancel</button>
          <button onClick={onAgree} className="btn-primary text-sm flex-1 flex items-center justify-center gap-2">
            <CheckCircle2 size={14} /> I Agree — Connect My Device
          </button>
        </div>
      </div>
    </div>
  );
}

export function WearablesPage() {
  const { user, refreshProfile } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [recent, setRecent] = useState<DailyData | null>(null);
  const [wscore, setWscore] = useState<WScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConsent, setShowConsent] = useState(false);
  const [terraVisible, setTerraVisible] = useState(false);

  useEffect(() => {
    async function load() {
      const [{ data: conns }, { data: daily }, { data: ws }] = await Promise.all([
        supabase.from('wearable_connections').select('*').order('connected_at', { ascending: false }),
        supabase.from('wearable_daily').select('*').order('date', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('w_scores').select('*').order('week_start', { ascending: false }).limit(1).maybeSingle(),
      ]);
      setConnections(conns ?? []);
      setRecent(daily as DailyData | null);
      setWscore(ws as WScore | null);
      setLoading(false);
    }
    load();
  }, [user]);

  async function handleConsent() {
    setShowConsent(false);
    if (!user) return;
    await supabase.from('users').update({ wearable_consent_at: new Date().toISOString() }).eq('id', user.id);
    await refreshProfile();
    const { data } = await supabase.from('wearable_connections').insert({
      user_id: user.id, provider: 'pending', status: 'active', connected_at: new Date().toISOString(),
    }).select().single();
    if (data) setConnections([data, ...connections]);
    setTerraVisible(true);
  }

  async function handleDisconnect(id: string) {
    await supabase.from('wearable_connections').update({ status: 'disconnected' }).eq('id', id);
    setConnections(prev => prev.map(c => c.id === id ? { ...c, status: 'disconnected' } : c));
  }

  const hasActive = connections.some(c => c.status === 'active');

  return (
    <>
      {showConsent && <ConsentModal onAgree={handleConsent} onCancel={() => setShowConsent(false)} />}
      <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">Connect your wearable</h1>
          <p className="text-[#94A3B8] text-sm mt-1">Sync Apple Watch, Garmin, Oura, Fitbit, Samsung Health, Whoop, or any major device.</p>
        </div>

        {!hasActive && !loading && (
          <div className="card p-6 space-y-5">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {DEVICES.map(d => (
                <div key={d.name} className="flex flex-col items-center gap-1.5" title={d.name}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: `${d.color}22`, border: `1px solid ${d.color}40`, color: d.color }}>
                    {d.initial}
                  </div>
                  <span className="text-[9px] text-[#64748B] text-center">{d.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowConsent(true)} className="btn-primary flex items-center gap-2 text-sm">
              <Watch size={15} /> Connect Device →
            </button>
          </div>
        )}

        {hasActive && connections.filter(c => c.status === 'active').map(c => (
          <div key={c.id} className="card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-[#10B981]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm capitalize">
                  Connected: {c.provider === 'pending' ? 'Device (pending sync)' : c.provider}
                </div>
                <div className="text-xs text-[#64748B]">
                  {c.last_sync_at ? `Last synced: ${fmtDT(c.last_sync_at)}` : 'Not yet synced'}
                </div>
              </div>
            </div>
            {(terraVisible || !c.last_sync_at) && (
              <div className="rounded-xl border-2 border-dashed border-[#00E5CC]/30 bg-[#00E5CC]/[0.03] p-6 text-center">
                <Watch size={22} className="text-[#00E5CC] mx-auto mb-2 opacity-60" />
                <p className="text-sm font-medium text-white mb-1">Terra widget loads here</p>
                <p className="text-xs text-[#64748B]">Add TERRA_API_KEY and TERRA_DEV_ID to secrets to activate.</p>
              </div>
            )}
            <button onClick={() => handleDisconnect(c.id)} className="text-xs text-[#64748B] hover:text-[#EF4444] transition-colors">
              Disconnect device
            </button>
          </div>
        ))}

        {/* W-Score */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-0.5">W-Score</h3>
          <p className="text-xs text-[#64748B] mb-5">Weekly wearable performance score (0–100)</p>
          {wscore?.w_score != null ? (
            <div className="flex items-center gap-6">
              <WScoreGauge score={wscore.w_score} />
              <div className="space-y-1.5">
                <div className="text-white font-semibold">Week of {fmtDate(wscore.week_start)}</div>
                {wscore.confidence && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block ${
                    wscore.confidence === 'HIGH' ? 'text-[#10B981] bg-[#10B981]/10' :
                    wscore.confidence === 'MEDIUM' ? 'text-[#F59E0B] bg-[#F59E0B]/10' : 'text-[#64748B] bg-white/[0.06]'
                  }`}>{wscore.confidence}</span>
                )}
                <p className="text-xs text-[#64748B] leading-relaxed max-w-xs">
                  W-Score is based entirely on wearable data. It does not affect your B-Score.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5 py-2">
              <div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-[#A78BFA]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#64748B] text-xs text-center leading-tight px-2">No W-Score yet</span>
              </div>
              <p className="text-sm text-[#94A3B8]">Connect a wearable to unlock your W-Score — your weekly performance based on activity, sleep, and heart rate data.</p>
            </div>
          )}
        </div>

        {recent && !loading && (
          <div>
            <h3 className="font-semibold text-white mb-3">Latest Data <span className="text-xs text-[#64748B] font-normal ml-1">{fmtDate(recent.date)}</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Steps', val: recent.steps ? recent.steps.toLocaleString() : null, unit: '', icon: <Activity size={13} />, color: '#00E5CC' },
                { label: 'Active Cal', val: recent.active_calories, unit: 'kcal', icon: <Zap size={13} />, color: '#F59E0B' },
                { label: 'HRV', val: recent.hrv_rmssd != null ? Number(recent.hrv_rmssd).toFixed(1) : null, unit: 'ms', icon: <Activity size={13} />, color: '#10B981' },
                { label: 'Resting HR', val: recent.resting_hr, unit: 'bpm', icon: <Heart size={13} />, color: '#EF4444' },
                { label: 'Sleep', val: recent.sleep_duration_min ? (recent.sleep_duration_min/60).toFixed(1) : null, unit: 'hr', icon: <Moon size={13} />, color: '#A78BFA' },
                { label: 'Sleep Score', val: recent.sleep_score, unit: '', icon: <TrendingUp size={13} />, color: '#00E5CC' },
              ].map(m => (
                <div key={m.label} className="card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${m.color}18`, color: m.color }}>{m.icon}</div>
                    <span className="text-xs text-[#64748B]">{m.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-semibold text-xl text-white">{m.val ?? '—'}</span>
                    {m.unit && m.val != null && <span className="text-xs text-[#64748B]">{m.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function fmtDate(d: string) { return new Date(d + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
function fmtDT(d: string) { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }

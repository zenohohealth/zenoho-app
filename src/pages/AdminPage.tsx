import { useEffect, useState } from 'react';
import { Shield, Users, FileText, CreditCard, RefreshCw, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

const ADMIN_EMAIL = 'admin@zenoho.health';

type WaitlistRow = { id: string; email: string; name: string | null; city: string | null; source: string | null; created_at: string };
type UserRow = { id: string; email: string; subscription_tier: string | null; panel_count: number; last_active: string | null };
type PanelRow = { id: string; user_email: string; collected_on: string | null; b_score: number | null; processing_status: string | null; lab_name: string | null };
type RevenueRow = { tier: string; count: number };

type AdminTab = 'waitlist' | 'users' | 'panels' | 'revenue';

function SectionHeader({ title, count, loading, onRefresh }: { title: string; count?: number; loading: boolean; onRefresh: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-white">{title}</h2>
        {count !== undefined && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-[#64748B]">{count}</span>
        )}
      </div>
      <button onClick={onRefresh} disabled={loading}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/[0.08] transition-colors">
        <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-white/[0.06] bg-white/[0.02]">{children}</th>;
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-[#94A3B8] text-xs border-b border-white/[0.04] ${className}`}>{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    complete: 'bg-[#10B981]/10 text-[#10B981]',
    processing: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    failed: 'bg-[#EF4444]/10 text-[#EF4444]',
    pending: 'bg-white/[0.06] text-[#64748B]',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[status] ?? 'bg-white/[0.06] text-[#64748B]'}`}>
      {status}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    free: 'bg-white/[0.06] text-[#64748B]',
    starter: 'bg-[#00E5CC]/10 text-[#00E5CC]',
    essential: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    optimise: 'bg-[#A78BFA]/10 text-[#A78BFA]',
    elite: 'bg-[#10B981]/10 text-[#10B981]',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${map[tier] ?? 'bg-white/[0.06] text-[#64748B]'}`}>
      {tier}
    </span>
  );
}

function fmtDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function AdminPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState<AdminTab>('waitlist');
  const [waitlist, setWaitlist] = useState<WaitlistRow[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [panels, setPanels] = useState<PanelRow[]>([]);
  const [revenue, setRevenue] = useState<RevenueRow[]>([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;
    loadTab(tab);
  }, [tab, isAdmin]);

  async function loadTab(t: AdminTab) {
    setLoading(true);
    try {
      if (t === 'waitlist') {
        const { data } = await supabase.from('waitlist').select('*').order('created_at', { ascending: false }).limit(200);
        setWaitlist((data ?? []) as WaitlistRow[]);
      } else if (t === 'users') {
        const { data: usersData } = await supabase.from('users').select('id, email, subscription_tier, last_active_at').order('last_active_at', { ascending: false }).limit(200);
        if (usersData) {
          const enriched: UserRow[] = await Promise.all(
            usersData.map(async (u: any) => {
              const { count } = await supabase.from('panels').select('id', { count: 'exact', head: true }).eq('user_id', u.id);
              return { id: u.id, email: u.email, subscription_tier: u.subscription_tier ?? 'free', panel_count: count ?? 0, last_active: u.last_active_at };
            })
          );
          setUsers(enriched);
        }
      } else if (t === 'panels') {
        const { data: panelsData } = await supabase
          .from('panels')
          .select('id, user_id, collected_on, processing_status, lab_name')
          .order('created_at', { ascending: false })
          .limit(200);
        if (panelsData) {
          const enriched: PanelRow[] = await Promise.all(
            panelsData.map(async (p: any) => {
              const { data: score } = await supabase.from('panel_scores').select('b_score').eq('panel_id', p.id).maybeSingle();
              const { data: usr } = await supabase.from('users').select('email').eq('id', p.user_id).maybeSingle();
              return {
                id: p.id,
                user_email: usr?.email ?? '—',
                collected_on: p.collected_on,
                b_score: score?.b_score ?? null,
                processing_status: p.processing_status,
                lab_name: p.lab_name,
              };
            })
          );
          setPanels(enriched);
        }
      } else if (t === 'revenue') {
        const { data } = await supabase.from('subscriptions').select('tier').eq('status', 'active');
        if (data) {
          const counts: Record<string, number> = {};
          data.forEach((row: any) => { counts[row.tier] = (counts[row.tier] ?? 0) + 1; });
          const tiers = ['starter', 'essential', 'optimise', 'elite'];
          setRevenue(tiers.map(tier => ({ tier, count: counts[tier] ?? 0 })));
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex-1 min-h-screen p-6 lg:p-8 flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center">
          <Shield size={24} className="text-[#EF4444]" />
        </div>
        <h1 className="text-xl font-bold text-white">Access Denied</h1>
        <p className="text-[#64748B] text-sm text-center max-w-xs">This area is restricted to Zenoho administrators.</p>
        <button onClick={() => navigate('/')} className="btn-primary text-sm mt-2">Back to Dashboard</button>
      </div>
    );
  }

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'waitlist', label: 'Waitlist', icon: <ChevronDown size={13} /> },
    { id: 'users', label: 'Users', icon: <Users size={13} /> },
    { id: 'panels', label: 'Panels', icon: <FileText size={13} /> },
    { id: 'revenue', label: 'Revenue', icon: <CreditCard size={13} /> },
  ];

  const TIER_PRICES: Record<string, number> = { starter: 399, essential: 1499, optimise: 3499, elite: 6999 };

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-[#EF4444]" />
            <span className="text-xs text-[#EF4444] font-semibold uppercase tracking-wide">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Zenoho Admin</h1>
          <p className="text-[#64748B] text-xs mt-0.5">{user?.email}</p>
        </div>
      </div>

      <div className="flex border-b border-white/[0.06]">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
              tab === t.id ? 'border-[#00E5CC] text-white' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'waitlist' && (
        <div>
          <SectionHeader title="Waitlist Signups" count={waitlist.length} loading={loading} onRefresh={() => loadTab('waitlist')} />
          <TableWrapper>
            <thead>
              <tr>
                <Th>Email</Th><Th>Name</Th><Th>City</Th><Th>Source</Th><Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {waitlist.length === 0 && !loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[#64748B] text-xs">No waitlist entries found.</td></tr>
              ) : waitlist.map(row => (
                <tr key={row.id} className="hover:bg-white/[0.02]">
                  <Td className="text-white">{row.email}</Td>
                  <Td>{row.name ?? '—'}</Td>
                  <Td>{row.city ?? '—'}</Td>
                  <Td>{row.source ?? '—'}</Td>
                  <Td>{fmtDate(row.created_at)}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}

      {tab === 'users' && (
        <div>
          <SectionHeader title="Registered Users" count={users.length} loading={loading} onRefresh={() => loadTab('users')} />
          <TableWrapper>
            <thead>
              <tr>
                <Th>Email</Th><Th>Subscription</Th><Th>Panels</Th><Th>Last Active</Th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-[#64748B] text-xs">No users found.</td></tr>
              ) : users.map(row => (
                <tr key={row.id} className="hover:bg-white/[0.02]">
                  <Td className="text-white">{row.email}</Td>
                  <Td><TierBadge tier={row.subscription_tier ?? 'free'} /></Td>
                  <Td className="font-mono">{row.panel_count}</Td>
                  <Td>{fmtDate(row.last_active)}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}

      {tab === 'panels' && (
        <div>
          <SectionHeader title="Blood Panels" count={panels.length} loading={loading} onRefresh={() => loadTab('panels')} />
          <TableWrapper>
            <thead>
              <tr>
                <Th>User</Th><Th>Date</Th><Th>B-Score</Th><Th>Status</Th><Th>Lab</Th>
              </tr>
            </thead>
            <tbody>
              {panels.length === 0 && !loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[#64748B] text-xs">No panels found.</td></tr>
              ) : panels.map(row => (
                <tr key={row.id} className="hover:bg-white/[0.02]">
                  <Td className="text-white">{row.user_email}</Td>
                  <Td>{fmtDate(row.collected_on)}</Td>
                  <Td className="font-mono font-semibold text-white">{row.b_score != null ? row.b_score.toFixed(1) : '—'}</Td>
                  <Td><StatusBadge status={row.processing_status ?? 'pending'} /></Td>
                  <Td>{row.lab_name ?? '—'}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      )}

      {tab === 'revenue' && (
        <div>
          <SectionHeader title="Active Subscriptions" loading={loading} onRefresh={() => loadTab('revenue')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {revenue.map(row => (
              <div key={row.tier} className="card p-5">
                <TierBadge tier={row.tier} />
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-mono font-bold text-3xl text-white">{row.count}</span>
                  <span className="text-xs text-[#64748B]">active</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  ₹{((TIER_PRICES[row.tier] ?? 0) * row.count).toLocaleString()} MRR
                </div>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3 text-sm">Total MRR</h3>
            <div className="font-mono font-bold text-4xl text-[#00E5CC]">
              ₹{revenue.reduce((sum, r) => sum + (TIER_PRICES[r.tier] ?? 0) * r.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-[#64748B] mt-1">Monthly recurring revenue from active subscriptions</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { NavLink } from '../hooks/useRouter';
import {
  LayoutDashboard,
  FlaskConical,
  Pill,
  Watch,
  Trophy,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/panels', icon: FlaskConical, label: 'Blood Panels' },
  { to: '/supplements', icon: Pill, label: 'Supplements' },
  { to: '/wearables', icon: Watch, label: 'Wearables' },
  { to: '/challenges', icon: Trophy, label: 'Challenges' },
  { to: '/billing', icon: CreditCard, label: 'Billing' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ activeRoute, onNavigate }: { activeRoute: string; onNavigate: (path: string) => void }) {
  const { profile, signOut } = useAuth();

  return (
    <aside className="w-60 flex-shrink-0 bg-[#0F2040] border-r border-white/[0.06] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-white/[0.06]">
        <Logo size="md" />
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const active = activeRoute === to || activeRoute.startsWith(to + '/');
          return (
            <NavLink
              key={to}
              to={to}
              active={active}
              onNavigate={onNavigate}
              icon={<Icon size={17} />}
              label={label}
            />
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <div className="px-3 py-2.5 mb-1">
          <div className="text-sm font-medium text-white truncate">{profile?.name || 'User'}</div>
          <div className="text-xs text-[#64748B] truncate">{profile?.email}</div>
          <div className="mt-1.5">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
              profile?.subscription_tier === 'free'
                ? 'bg-white/[0.08] text-[#94A3B8]'
                : 'bg-[#00E5CC]/15 text-[#00E5CC]'
            }`}>
              {profile?.subscription_tier ?? 'free'}
            </span>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all duration-200 text-sm"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

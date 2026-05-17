import { LayoutDashboard, FileText, Pill, Trophy } from 'lucide-react';
import { useRouter } from '../hooks/useRouter';

const TABS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/supplements', icon: Pill, label: 'Protocol' },
  { to: '/challenges', icon: Trophy, label: 'Challenges' },
];

export function BottomTabBar() {
  const { route, navigate } = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0F2040]/95 backdrop-blur-md border-t border-white/[0.06] pb-safe">
      <div className="flex">
        {TABS.map(({ to, icon: Icon, label }) => {
          const active = route === to || route.startsWith(to + '/');
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all duration-200 ${
                active ? 'text-[#00E5CC]' : 'text-[#64748B]'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

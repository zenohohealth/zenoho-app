import { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reports', label: 'My Reports' },
  { to: '/supplements', label: 'Protocol' },
  { to: '/challenges', label: 'Challenges' },
];

export function TopNav() {
  const { profile, signOut } = useAuth();
  const { route, navigate } = useRouter();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-30 bg-[#0D1B35]/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/dashboard')}>
            <Logo size="sm" />
          </button>
          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => {
              const active = route === l.to || route.startsWith(l.to + '/');
              return (
                <button
                  key={l.to}
                  onClick={() => navigate(l.to)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-white/[0.08]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Bell */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-all duration-200 relative">
            <Bell size={17} />
          </button>

          {/* Avatar dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen(o => !o)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-white/[0.06] transition-all duration-200"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00E5CC] to-[#00B4A0] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#0D1B35]">{initials}</span>
              </div>
              <ChevronDown size={13} className={`text-[#64748B] transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 card py-1 z-50 shadow-xl animate-fade-in">
                <div className="px-3 py-2 border-b border-white/[0.06]">
                  <div className="text-xs font-medium text-white truncate">{profile?.name}</div>
                  <div className="text-[10px] text-[#64748B] truncate">{profile?.email}</div>
                </div>
                {[
                  { icon: <User size={13} />, label: 'Profile', to: '/settings' },
                  { icon: <Settings size={13} />, label: 'Settings', to: '/settings' },
                ].map(item => (
                  <button
                    key={item.to + item.label}
                    onClick={() => { navigate(item.to); setDropOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    {item.icon}{item.label}
                  </button>
                ))}
                <div className="border-t border-white/[0.06] mt-1 pt-1">
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

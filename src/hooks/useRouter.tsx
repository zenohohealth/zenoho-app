import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type RouterContextType = {
  route: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<RouterContextType>({ route: '/', navigate: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handler = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  function navigate(path: string) {
    window.history.pushState({}, '', path);
    setRoute(path);
  }

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function NavLink({
  to,
  active,
  onNavigate,
  icon,
  label,
}: {
  to: string;
  active: boolean;
  onNavigate: (path: string) => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={() => onNavigate(to)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-[#00E5CC]/12 text-[#00E5CC] border border-[#00E5CC]/20'
          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

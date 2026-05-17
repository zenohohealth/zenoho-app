import { Activity } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 18, text: 'text-lg' },
    md: { icon: 24, text: 'text-xl' },
    lg: { icon: 32, text: 'text-3xl' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5CC] to-[#00B4A0] flex items-center justify-center">
          <Activity size={s.icon - 8} className="text-[#0D1B35]" strokeWidth={2.5} />
        </div>
      </div>
      <span className={`${s.text} font-bold tracking-tight text-white`}>
        Zeno<span className="text-[#00E5CC]">ho</span>
      </span>
    </div>
  );
}

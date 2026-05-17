import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';

type Mode = 'login' | 'signup' | 'magic';

export function AuthPage() {
  const { signIn, signUp, signInMagicLink } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'magic') {
        const { error } = await signInMagicLink(email);
        if (error) { setError(error.message); } else { setMagicSent(true); }
      } else if (mode === 'signup') {
        if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
        const { error } = await signUp(email, password, name);
        if (error) setError(error.message);
      } else {
        const { error } = await signIn(email, password);
        if (error) setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (magicSent) {
    return (
      <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center p-4">
        <div className="card p-8 max-w-md w-full text-center animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-[#00E5CC]/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-[#00E5CC]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Check your inbox</h2>
          <p className="text-[#94A3B8] text-sm">
            We sent a magic link to <span className="text-white font-medium">{email}</span>. Click the link to sign in.
          </p>
          <button className="btn-ghost mt-6 text-sm" onClick={() => setMagicSent(false)}>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00E5CC]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-[#94A3B8] text-sm">Your biology, decoded.</p>
        </div>

        <div className="card p-8">
          {/* Tab bar */}
          <div className="flex bg-[#142447] rounded-xl p-1 mb-6">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  mode === m ? 'bg-[#0F2040] text-white shadow' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          {mode === 'magic' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="email"
                    className="input pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={16} /> Send Magic Link</>}
              </button>
              <button type="button" className="btn-ghost w-full text-sm" onClick={() => setMode('login')}>
                Use password instead
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="label">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="text"
                      className="input pl-10"
                      placeholder="Arjun Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="email"
                    className="input pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="password"
                    className="input pl-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading
                  ? <Loader2 size={16} className="animate-spin" />
                  : <>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight size={16} /></>
                }
              </button>
              <div className="relative flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-xs text-[#64748B]">or</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>
              <button type="button" className="btn-secondary w-full flex items-center justify-center gap-2 text-sm" onClick={() => { setMode('magic'); setError(''); }}>
                <Zap size={15} className="text-[#00E5CC]" />
                Sign in with Magic Link
              </button>
            </form>
          )}

          {mode === 'signup' && (
            <p className="text-[#64748B] text-xs text-center mt-5 leading-relaxed">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

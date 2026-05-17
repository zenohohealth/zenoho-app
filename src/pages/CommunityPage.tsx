import { useState } from 'react';
import { Heart, MessageCircle, Trophy, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

// ─── Hardcoded feed ───────────────────────────────────────────────────────────

const FEED = [
  { id: 1, name: 'Priya S.', initials: 'PS', color: '#00E5CC', achievement: 'hit a new personal best — HRV 68ms', time: '2 hours ago', icon: '❤️' },
  { id: 2, name: 'Arjun M.', initials: 'AM', color: '#F59E0B', achievement: 'completed his 60-day supplement streak', time: '5 hours ago', icon: '🔥' },
  { id: 3, name: 'Kavya T.', initials: 'KT', color: '#A78BFA', achievement: 'improved her Heart Engine to Level 8', time: 'Yesterday', icon: '📈' },
  { id: 4, name: 'Rohit K.', initials: 'RK', color: '#10B981', achievement: 'achieved bio age 4 years younger than actual', time: '2 days ago', icon: '🧬' },
  { id: 5, name: 'Shreya P.', initials: 'SP', color: '#EF4444', achievement: "just uploaded her 5th Zenoho Read", time: '3 days ago', icon: '🔬' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Priya S.', improvement: '+12.4', bioGap: '−5y', isCurrentUser: false },
  { rank: 2, name: 'Arjun M.', improvement: '+9.8', bioGap: '−3y', isCurrentUser: false },
  { rank: 3, name: 'You', improvement: '+7.2', bioGap: '−2y', isCurrentUser: true },
  { rank: 4, name: 'Kavya T.', improvement: '+6.1', bioGap: '+1y', isCurrentUser: false },
  { rank: 5, name: 'Rohit K.', improvement: '+4.3', bioGap: '−1y', isCurrentUser: false },
];

const CHALLENGES_PREVIEW = [
  { slug: 'hrv_baseline_week', title: 'HRV Baseline Week', desc: 'Maintain HRV at or above your personal average for 7 consecutive days.', icon: '❤️', wearable: true },
  { slug: 'sleep_quality_streak', title: 'Sleep Quality Streak', desc: 'Score 70+ on sleep quality for 5 consecutive nights.', icon: '🌙', wearable: true },
  { slug: 'supplement_streak', title: 'Supplement Streak', desc: 'Take your supplements daily for 30 days.', icon: '💊', wearable: false },
  { slug: 'steps_10k', title: '10K Steps', desc: 'Hit 10,000 steps for 7 consecutive days.', icon: '👟', wearable: true },
  { slug: 'resting_hr_pb', title: 'Resting Heart Rate Drop', desc: 'Achieve a new personal best resting HR.', icon: '🫀', wearable: true },
  { slug: 'score_level_up', title: 'Score Level Up', desc: 'Improve any domain score by 1 full level in your next retest.', icon: '📈', wearable: false },
  { slug: 'retest_90_day', title: '90-Day Retest', desc: 'Complete your 90-day retest on schedule.', icon: '🔬', wearable: false },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = 'feed' | 'leaderboard' | 'challenges';

export function CommunityPage() {
  const { profile } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState<Tab>('feed');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Community</h1>
          <p className="text-[#94A3B8] text-sm mt-1">See what fellow Zenoho members are achieving</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#142447] border border-white/[0.08]">
          <Users size={12} className="text-[#00E5CC]" />
          <span className="text-xs text-[#94A3B8]">247 members</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06]">
        {(['feed', 'leaderboard', 'challenges'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all capitalize ${
              tab === t ? 'border-[#00E5CC] text-white' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Feed */}
      {tab === 'feed' && (
        <div className="space-y-4">
          {FEED.map(post => (
            <div key={post.id} className="card p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0D1B35] flex-shrink-0"
                  style={{ background: post.color }}>
                  {post.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white leading-relaxed">
                    <span className="font-semibold">{post.name}</span>{' '}
                    <span className="text-[#94A3B8]">{post.achievement}</span>{' '}
                    <span className="text-lg">{post.icon}</span>
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">{post.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pl-12">
                <button
                  onClick={() => setLiked(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${liked.has(post.id) ? 'text-[#EF4444]' : 'text-[#64748B] hover:text-[#EF4444]'}`}>
                  <Heart size={13} fill={liked.has(post.id) ? 'currentColor' : 'none'} />
                  <span>{liked.has(post.id) ? 1 : 0}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors">
                  <MessageCircle size={13} />
                  <span>0</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {tab === 'leaderboard' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] grid grid-cols-4 gap-4">
            {['Rank', 'Member', 'Score Improvement', 'Bio Age Gap'].map(h => (
              <div key={h} className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">{h}</div>
            ))}
          </div>
          <div className="divide-y divide-white/[0.04]">
            {LEADERBOARD.map(row => (
              <div key={row.rank}
                className={`px-5 py-4 grid grid-cols-4 gap-4 items-center transition-colors ${
                  row.isCurrentUser ? 'bg-[#00E5CC]/[0.05] border-l-2 border-[#00E5CC]' : 'hover:bg-white/[0.02]'
                }`}>
                <div className="flex items-center gap-2">
                  {row.rank <= 3 ? (
                    <span className="text-base">{row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : '🥉'}</span>
                  ) : (
                    <span className="font-mono text-sm text-[#64748B] w-6 text-center">{row.rank}</span>
                  )}
                </div>
                <div className={`text-sm font-medium ${row.isCurrentUser ? 'text-[#00E5CC]' : 'text-white'}`}>
                  {row.name} {row.isCurrentUser && <span className="text-[10px] text-[#64748B]">(you)</span>}
                </div>
                <div className="text-sm font-mono font-semibold text-[#10B981]">{row.improvement}</div>
                <div className={`text-sm font-mono font-semibold ${row.bioGap.startsWith('−') ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {row.bioGap}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {tab === 'challenges' && (
        <div className="grid md:grid-cols-2 gap-4">
          {CHALLENGES_PREVIEW.map(c => (
            <div key={c.slug} className="card p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-lg flex-shrink-0">{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{c.title}</div>
                  <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{c.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {c.wearable
                  ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">Requires wearable</span>
                  : <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">No wearable needed</span>
                }
                <button onClick={() => navigate('/challenges')} className="text-xs text-[#00E5CC] hover:underline">Join →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="px-4 py-3 rounded-xl bg-[#142447] border border-white/[0.06]">
        <p className="text-xs text-[#64748B] text-center">
          Community features expand in v1.1. All shared data requires explicit opt-in.
        </p>
      </div>
    </div>
  );
}

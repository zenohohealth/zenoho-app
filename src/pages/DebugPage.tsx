import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const CHILD_TABLES = [
  'marker_results',
  'system_scores',
  'domain_scores',
  'panel_scores',
  'supplement_recommendations',
] as const;

type Counts = Record<string, number>;

export function DebugPage() {
  const [panel, setPanel] = useState<Record<string, any> | null>(null);
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    let latestPanel: Record<string, any> | null = null;

    if (user) {
      const { data } = await supabase
        .from('panels')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      latestPanel = data;
    }

    setPanel(latestPanel);

    if (latestPanel?.id) {
      const panelId = latestPanel.id;
      const results: Counts = {};
      await Promise.all(
        CHILD_TABLES.map(async (table) => {
          const { count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
            .eq('panel_id', panelId);
          results[table] = count ?? 0;
        })
      );
      setCounts(results);
    } else {
      setCounts({});
    }

    setFetchedAt(new Date().toLocaleTimeString());
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const highlight: Record<string, string> = {
    processing_status: '#00E5CC',
    processing_error: '#EF4444',
    markers_submitted: '#F59E0B',
    markers_scoreable: '#F59E0B',
  };

  const topKeys = ['processing_status', 'processing_error', 'markers_submitted', 'markers_scoreable'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#e2e8f0', fontFamily: 'monospace', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#00E5CC' }}>/debug</span>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            background: loading ? '#1e293b' : '#00E5CC',
            color: loading ? '#64748b' : '#0a0f1e',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 20px',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '14px',
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
        {fetchedAt && <span style={{ fontSize: '12px', color: '#475569' }}>fetched at {fetchedAt}</span>}
      </div>

      {/* Section 1: Latest panel */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Section 1 — Latest Panel
        </div>

        {!panel ? (
          <div style={{ color: '#64748b', fontSize: '13px' }}>{loading ? '…' : 'No panel found.'}</div>
        ) : (
          <div style={{ background: '#0f1929', border: '1px solid #1e293b', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Top highlighted fields */}
            <div style={{ padding: '16px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {topKeys.map((key) => (
                <div key={key}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>{key}</div>
                  {key === 'processing_error' && panel[key] != null ? (
                    <pre style={{
                      color: '#EF4444',
                      fontSize: '12px',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      background: '#1a0a0a',
                      border: '1px solid #7f1d1d',
                      borderRadius: '4px',
                      padding: '8px',
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      maxWidth: '600px',
                    }}>
                      {String(panel[key])}
                    </pre>
                  ) : (
                    <div style={{ fontSize: '16px', fontWeight: 700, color: highlight[key] ?? '#e2e8f0' }}>
                      {panel[key] == null ? <span style={{ color: '#334155' }}>null</span> : String(panel[key])}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* All fields */}
            <div style={{ padding: '16px' }}>
              {Object.entries(panel)
                .filter(([k]) => !topKeys.includes(k))
                .map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: '12px', padding: '3px 0', borderBottom: '1px solid #0f172a', alignItems: 'flex-start' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', minWidth: '200px', flexShrink: 0 }}>{k}</span>
                    {k === 'processing_error' && v != null ? (
                      <pre style={{
                        color: '#EF4444',
                        fontSize: '12px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        background: '#1a0a0a',
                        border: '1px solid #7f1d1d',
                        borderRadius: '4px',
                        padding: '8px',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        flex: 1,
                      }}>
                        {String(v)}
                      </pre>
                    ) : (
                      <span style={{ fontSize: '12px', color: v == null ? '#334155' : '#e2e8f0', wordBreak: 'break-all' }}>
                        {v == null ? 'null' : typeof v === 'object' ? JSON.stringify(v) : String(v)}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Child table counts */}
      <section>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Section 2 — Child Table Row Counts {panel?.id ? <span style={{ color: '#334155' }}>for panel {panel.id}</span> : ''}
        </div>

        {!panel ? (
          <div style={{ color: '#64748b', fontSize: '13px' }}>No panel selected.</div>
        ) : (
          <div style={{ background: '#0f1929', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {CHILD_TABLES.map((table) => {
              const n = counts[table] ?? '…';
              const hasRows = typeof n === 'number' && n > 0;
              return (
                <div key={table}>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>{table}: </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: hasRows ? '#00E5CC' : '#475569' }}>
                    {n} {typeof n === 'number' ? 'rows' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

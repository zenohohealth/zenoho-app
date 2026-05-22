import { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Play, RotateCcw, ExternalLink, FileText, Upload, ChevronDown, AlertTriangle, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

// ── Types ────────────────────────────────────────────────────────────────────

type Mode = 'extract' | 'analyze' | 'e2e';
type LogLevel = 'info' | 'success' | 'error' | 'progress';

interface LogEntry {
  ts: number;
  level: LogLevel;
  msg: string;
  delta: number | null;
}

interface PanelRow {
  id: string;
  patient_name_on_report: string | null;
  lab_name: string | null;
  processing_status: string;
  processing_error: string | null;
  raw_text: string | null;
  markers_submitted: number;
  created_at: string;
}

interface ChildCounts {
  marker_results: number;
  domain_scores: number;
  system_scores: number;
  panel_scores: number;
  supplement_recommendations: number;
}

interface PanelScore {
  score: number | null;
  bio_age: number | null;
}

interface ResultsState {
  panel: PanelRow;
  counts: ChildCounts;
  panelScore: PanelScore | null;
}

interface DropdownPanel {
  id: string;
  patient_name_on_report: string | null;
  lab_name: string | null;
  processing_status: string;
  created_at: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function hhmmss(ts: number): string {
  const d = new Date(ts);
  return d.toTimeString().slice(0, 8);
}

function relativeTime(isoStr: string): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

const LEVEL_COLORS: Record<LogLevel, string> = {
  info: 'text-[#94A3B8]',
  success: 'text-[#10B981]',
  error: 'text-[#EF4444]',
  progress: 'text-[#38BDF8]',
};

const LEVEL_LABELS: Record<LogLevel, string> = {
  info: 'INFO',
  success: 'OK  ',
  error: 'ERR ',
  progress: 'WAIT',
};

// ── Auth Gate ────────────────────────────────────────────────────────────────

function AdminAuthGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const configured = !!import.meta.env.VITE_ADMIN_PASSWORD;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      onAuth();
    } else {
      setErr('Incorrect password.');
    }
  }

  if (!configured) {
    return (
      <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center p-6">
        <div className="card p-8 max-w-sm w-full text-center">
          <AlertTriangle size={28} className="text-[#F59E0B] mx-auto mb-3" />
          <p className="text-[#EF4444] text-sm font-medium">Admin password not configured.</p>
          <p className="text-[#64748B] text-xs mt-1">Set VITE_ADMIN_PASSWORD in .env.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1B35] flex items-center justify-center p-6">
      <div className="card p-8 max-w-sm w-full">
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={18} className="text-[#00E5CC]" />
          <span className="font-semibold text-white">Admin Access</span>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(''); }}
              autoFocus
              placeholder="Enter admin password"
            />
          </div>
          {err && <p className="text-[#EF4444] text-xs">{err}</p>}
          <button type="submit" className="btn-primary w-full text-sm">Unlock</button>
        </form>
      </div>
    </div>
  );
}

// ── Log Feed ─────────────────────────────────────────────────────────────────

function LogFeed({ entries, onClear }: { entries: LogEntry[]; onClear: () => void }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-xs font-semibold text-[#64748B] tracking-wider uppercase">Live Log</span>
        <button onClick={onClear} className="flex items-center gap-1 text-xs text-[#64748B] hover:text-white transition-colors">
          <RotateCcw size={11} /> Clear
        </button>
      </div>
      <div className="h-72 overflow-y-auto bg-[#060F1E] p-3 font-mono text-[11px] leading-relaxed">
        {entries.length === 0 && (
          <span className="text-[#334155]">No log entries. Run a test to see output here.</span>
        )}
        {entries.map((e, i) => (
          <div key={i} className={`flex gap-2 ${LEVEL_COLORS[e.level]}`}>
            <span className="text-[#334155] flex-shrink-0">[{hhmmss(e.ts)}]</span>
            <span className="text-[#475569] flex-shrink-0">[{LEVEL_LABELS[e.level]}]</span>
            <span className="flex-1 break-all">{e.msg}</span>
            {e.delta !== null && (
              <span className="text-[#334155] flex-shrink-0 ml-2">+{e.delta}ms</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ── Results Panel ─────────────────────────────────────────────────────────────

function ResultsPanel({ results }: { results: ResultsState }) {
  const { navigate } = useRouter();
  const { panel, counts, panelScore } = results;

  const statusColor =
    panel.processing_status === 'complete' ? 'text-[#10B981]' :
    panel.processing_status === 'failed' ? 'text-[#EF4444]' :
    'text-[#F59E0B]';

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B] tracking-wider uppercase">Results</span>
        <button
          onClick={() => navigate(`/reports/${panel.id}`)}
          className="flex items-center gap-1.5 text-xs text-[#00E5CC] hover:text-white transition-colors"
        >
          <ExternalLink size={12} /> Open in My Reports
        </button>
      </div>

      {/* Panel state */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Panel ID', value: panel.id.slice(0, 8) + '…' },
          { label: 'Status', value: panel.processing_status, cls: statusColor },
          { label: 'raw_text', value: panel.raw_text ? `${panel.raw_text.length.toLocaleString()} chars` : 'null' },
          { label: 'markers_submitted', value: String(panel.markers_submitted) },
          { label: 'processing_error', value: panel.processing_error ?? 'none', cls: panel.processing_error ? 'text-[#EF4444]' : undefined },
          ...(panelScore ? [
            { label: 'B-Score', value: panelScore.score != null ? String(panelScore.score) : '—' },
            { label: 'Bio Age', value: panelScore.bio_age != null ? String(panelScore.bio_age) : '—' },
          ] : []),
        ].map(({ label, value, cls }) => (
          <div key={label} className="bg-[#0A1628] rounded-xl p-3">
            <p className="text-[10px] text-[#475569] mb-0.5">{label}</p>
            <p className={`text-xs font-medium font-mono truncate ${cls ?? 'text-white'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Child table counts */}
      <div>
        <p className="text-[10px] text-[#475569] mb-2 uppercase tracking-wider font-semibold">Child table counts</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(counts).map(([tbl, count]) => (
            <div key={tbl} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${count > 0 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-white/[0.04] text-[#475569]'}`}>
              <span>{tbl.replace(/_/g, ' ')}</span>
              <span className="font-mono font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Harness ───────────────────────────────────────────────────────────────────

async function fetchPanelState(panelId: string): Promise<PanelRow | null> {
  const { data } = await supabase
    .from('panels')
    .select('id, patient_name_on_report, lab_name, processing_status, processing_error, raw_text, markers_submitted, created_at')
    .eq('id', panelId)
    .maybeSingle();
  return data ?? null;
}

async function fetchChildCounts(panelId: string): Promise<ChildCounts> {
  const [mr, ds, ss, ps, sr] = await Promise.all([
    supabase.from('marker_results').select('id', { count: 'exact', head: true }).eq('panel_id', panelId),
    supabase.from('domain_scores').select('id', { count: 'exact', head: true }).eq('panel_id', panelId),
    supabase.from('system_scores').select('id', { count: 'exact', head: true }).eq('panel_id', panelId),
    supabase.from('panel_scores').select('id', { count: 'exact', head: true }).eq('panel_id', panelId),
    supabase.from('supplement_recommendations').select('id', { count: 'exact', head: true }).eq('panel_id', panelId),
  ]);
  return {
    marker_results: mr.count ?? 0,
    domain_scores: ds.count ?? 0,
    system_scores: ss.count ?? 0,
    panel_scores: ps.count ?? 0,
    supplement_recommendations: sr.count ?? 0,
  };
}

async function fetchPanelScore(panelId: string): Promise<PanelScore | null> {
  const { data } = await supabase
    .from('panel_scores')
    .select('score, bio_age')
    .eq('panel_id', panelId)
    .maybeSingle();
  return data ?? null;
}

function AdminTestPipelineHarness() {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('extract');
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [results, setResults] = useState<ResultsState | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dropdownPanels, setDropdownPanels] = useState<DropdownPanel[]>([]);
  const [selectedPanelId, setSelectedPanelId] = useState('');
  const lastLogTs = useRef<number | null>(null);

  // Load panels with raw_text for Mode B dropdown
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('panels')
        .select('id, patient_name_on_report, lab_name, processing_status, created_at')
        .not('raw_text', 'is', null)
        .order('created_at', { ascending: false })
        .limit(20);
      if (data) {
        setDropdownPanels(data);
        if (data.length > 0) setSelectedPanelId(data[0].id);
      }
    }
    load();
  }, []);

  const log = useCallback((level: LogLevel, msg: string) => {
    const now = Date.now();
    const delta = lastLogTs.current !== null ? now - lastLogTs.current : null;
    lastLogTs.current = now;
    setLogs(prev => [...prev, { ts: now, level, msg, delta }]);
  }, []);

  function clearLogs() {
    setLogs([]);
    setResults(null);
    lastLogTs.current = null;
  }

  // Poll helper — returns final panel state
  async function pollUntil(
    panelId: string,
    terminalStatuses: string[],
    intervalMs: number,
    maxMs: number,
  ): Promise<PanelRow | null> {
    const deadline = Date.now() + maxMs;
    let lastStatus = '';

    while (Date.now() < deadline) {
      await new Promise(r => setTimeout(r, intervalMs));
      let panel: PanelRow | null = null;
      try {
        panel = await fetchPanelState(panelId);
      } catch (e) {
        log('error', `Poll error: ${e instanceof Error ? e.message : String(e)}`);
      }
      if (!panel) continue;

      if (panel.processing_status !== lastStatus) {
        log('progress', `Status transition: ${lastStatus || '(start)'} → ${panel.processing_status}`);
        lastStatus = panel.processing_status;
      }

      if (terminalStatuses.includes(panel.processing_status)) {
        return panel;
      }
    }
    return await fetchPanelState(panelId);
  }

  async function buildResults(panelId: string): Promise<ResultsState | null> {
    const [panel, counts] = await Promise.all([
      fetchPanelState(panelId),
      fetchChildCounts(panelId),
    ]);
    if (!panel) return null;
    const panelScore = panel.processing_status === 'complete' ? await fetchPanelScore(panelId) : null;
    return { panel, counts, panelScore };
  }

  // ── Create panel row helper ────────────────────────────────────────────────
  async function createTestPanel(labLabel: string): Promise<string> {
    const path = `${user!.id}/${Date.now()}_${pdfFile!.name}`;
    const { error: uploadErr } = await supabase.storage
      .from('blood-reports')
      .upload(path, pdfFile!, { contentType: pdfFile!.type });
    if (uploadErr) throw new Error('Storage upload failed: ' + uploadErr.message);
    log('info', `PDF uploaded to storage: ${path}`);

    const { data: panel, error: insertErr } = await supabase
      .from('panels')
      .insert({
        user_id: user!.id,
        patient_name_on_report: `TEST: ${new Date().toISOString()}`,
        lab_name: labLabel,
        raw_pdf_path: path,
        collected_on: new Date().toISOString().split('T')[0],
        registered_at: new Date().toISOString(),
        processing_status: 'pending',
      })
      .select('id')
      .single();

    if (insertErr || !panel) throw new Error('Panel insert failed: ' + (insertErr?.message ?? 'unknown'));
    log('info', `Panel created: ${panel.id}`);
    return panel.id;
  }

  // ── Mode A: Extract Only ────────────────────────────────────────────────────
  async function runExtract() {
    if (!pdfFile) { log('error', 'No PDF file selected.'); return; }
    setRunning(true);
    setResults(null);
    try {
      const panelId = await createTestPanel('Test Harness - Extract Only');

      log('info', 'Invoking extract-pdf-text…');
      let invokeResult: { data: unknown; error: Error | null };
      try {
        invokeResult = await supabase.functions.invoke('extract-pdf-text', { body: { panel_id: panelId } });
      } catch (e) {
        log('error', `Invoke threw: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
      if (invokeResult.error) {
        log('error', `extract-pdf-text returned error: ${invokeResult.error.message}`);
      } else {
        log('success', `extract-pdf-text responded: ${JSON.stringify(invokeResult.data).slice(0, 200)}`);
      }

      log('progress', 'Polling for text_extracted or failed (max 60s)…');
      const final = await pollUntil(panelId, ['text_extracted', 'failed'], 1000, 60_000);

      if (!final) {
        log('error', 'Polling timed out or panel disappeared.');
      } else if (final.processing_status === 'text_extracted') {
        log('success', `Extraction complete. raw_text: ${final.raw_text?.length ?? 0} chars`);
      } else if (final.processing_status === 'failed') {
        log('error', `Extraction failed: ${final.processing_error ?? 'no error message'}`);
      } else {
        log('error', `Unexpected terminal status: ${final.processing_status}`);
      }

      const r = await buildResults(panelId);
      if (r) setResults(r);
    } catch (e) {
      log('error', `Unhandled error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRunning(false);
    }
  }

  // ── Mode B: Analyze Only ────────────────────────────────────────────────────
  async function runAnalyze() {
    if (!selectedPanelId) { log('error', 'No panel selected.'); return; }
    setRunning(true);
    setResults(null);
    try {
      log('info', `Invoking process-blood-report for panel: ${selectedPanelId}`);

      let startPanel: PanelRow | null = null;
      try {
        startPanel = await fetchPanelState(selectedPanelId);
        log('info', `Starting status: ${startPanel?.processing_status ?? 'unknown'}`);
      } catch (e) {
        log('error', `Could not read panel state: ${e instanceof Error ? e.message : String(e)}`);
      }

      let invokeResult: { data: unknown; error: Error | null };
      try {
        invokeResult = await supabase.functions.invoke('process-blood-report', { body: { panel_id: selectedPanelId } });
      } catch (e) {
        log('error', `Invoke threw: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
      if (invokeResult.error) {
        log('error', `process-blood-report returned error: ${invokeResult.error.message}`);
      } else {
        log('success', `process-blood-report responded: ${JSON.stringify(invokeResult.data).slice(0, 200)}`);
      }

      log('progress', 'Polling for complete or failed (max 5 min)…');
      const final = await pollUntil(selectedPanelId, ['complete', 'failed'], 2000, 300_000);

      if (!final) {
        log('error', 'Polling timed out or panel disappeared.');
      } else if (final.processing_status === 'complete') {
        log('success', `Analysis complete. markers_submitted: ${final.markers_submitted}`);
      } else if (final.processing_status === 'failed') {
        log('error', `Analysis failed: ${final.processing_error ?? 'no error message'}`);
      } else {
        log('error', `PIPELINE STALLED at ${final.processing_status} after 5 minutes`);
      }

      const r = await buildResults(selectedPanelId);
      if (r) setResults(r);
    } catch (e) {
      log('error', `Unhandled error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRunning(false);
    }
  }

  // ── Mode C: End-to-End ─────────────────────────────────────────────────────
  async function runE2E() {
    if (!pdfFile) { log('error', 'No PDF file selected.'); return; }
    setRunning(true);
    setResults(null);
    try {
      const panelId = await createTestPanel('Test Harness - End-to-End');

      log('info', 'Invoking extract-pdf-text…');
      let invokeResult: { data: unknown; error: Error | null };
      try {
        invokeResult = await supabase.functions.invoke('extract-pdf-text', { body: { panel_id: panelId } });
      } catch (e) {
        log('error', `Invoke threw: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
      if (invokeResult.error) {
        log('error', `extract-pdf-text returned error: ${invokeResult.error.message}`);
      } else {
        log('success', `extract-pdf-text responded: ${JSON.stringify(invokeResult.data).slice(0, 200)}`);
      }

      log('progress', 'Polling for complete or failed (max 6 min — watching full chain)…');
      const final = await pollUntil(panelId, ['complete', 'failed'], 2000, 360_000);

      if (!final) {
        log('error', 'Polling timed out or panel disappeared.');
      } else if (final.processing_status === 'complete') {
        log('success', `End-to-end complete. markers_submitted: ${final.markers_submitted}`);
      } else if (final.processing_status === 'failed') {
        log('error', `Pipeline failed: ${final.processing_error ?? 'no error message'}`);
      } else {
        log('error', `PIPELINE STALLED at ${final.processing_status} after 6 minutes`);
      }

      const r = await buildResults(panelId);
      if (r) setResults(r);
    } catch (e) {
      log('error', `Unhandled error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRunning(false);
    }
  }

  function handleRun() {
    lastLogTs.current = null;
    if (mode === 'extract') runExtract();
    else if (mode === 'analyze') runAnalyze();
    else runE2E();
  }

  const MODES: { id: Mode; label: string }[] = [
    { id: 'extract', label: 'Extract Only' },
    { id: 'analyze', label: 'Analyze Only' },
    { id: 'e2e', label: 'End-to-End' },
  ];

  const canRun =
    !running &&
    (mode === 'analyze' ? !!selectedPanelId : !!pdfFile);

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 max-w-3xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#00E5CC]/10 flex items-center justify-center flex-shrink-0">
          <Terminal size={17} className="text-[#00E5CC]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Engine Test Harness</h1>
            <span className="text-[10px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-0.5 rounded-full">Admin only</span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">Isolate and diagnose extract / analyze pipeline stages</p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 p-1 bg-[#0A1628] rounded-xl mb-3">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); clearLogs(); }}
            disabled={running}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
              mode === m.id
                ? 'bg-[#00E5CC]/15 text-[#00E5CC] border border-[#00E5CC]/25'
                : 'text-[#64748B] hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Notice banner */}
      <div className="flex items-start gap-2 bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-xl px-3.5 py-2.5 mb-5 text-xs text-[#D97706]">
        <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
        Test panels are tagged with TEST: prefix in patient_name. They will appear in My Reports under your account.
      </div>

      {/* Inputs */}
      <div className="card p-5 mb-4 space-y-4">
        {/* PDF input — Mode A + C */}
        {(mode === 'extract' || mode === 'e2e') && (
          <div>
            <label className="label">PDF File</label>
            <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
              pdfFile ? 'border-[#00E5CC]/40 bg-[#00E5CC]/5' : 'border-white/[0.12] bg-[#0A1628] hover:border-white/25'
            }`}>
              <input
                type="file"
                className="hidden"
                accept=".pdf,image/*"
                onChange={e => setPdfFile(e.target.files?.[0] ?? null)}
                disabled={running}
              />
              {pdfFile ? (
                <div className="flex items-center gap-2 text-[#00E5CC]">
                  <FileText size={16} />
                  <span className="text-sm font-medium">{pdfFile.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-[#475569]">
                  <Upload size={18} />
                  <span className="text-xs">Click to select PDF</span>
                </div>
              )}
            </label>
          </div>
        )}

        {/* Panel dropdown — Mode B */}
        {mode === 'analyze' && (
          <div>
            <label className="label">Panel with extracted text</label>
            {dropdownPanels.length === 0 ? (
              <p className="text-xs text-[#64748B] italic">No panels with extracted text available.</p>
            ) : (
              <div className="relative">
                <select
                  className="input appearance-none pr-8 cursor-pointer"
                  value={selectedPanelId}
                  onChange={e => setSelectedPanelId(e.target.value)}
                  disabled={running}
                >
                  {dropdownPanels.map(p => (
                    <option key={p.id} value={p.id}>
                      {[
                        p.patient_name_on_report ?? '(no name)',
                        p.lab_name ?? '(no lab)',
                        p.processing_status,
                        relativeTime(p.created_at),
                      ].join(' — ')}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
              </div>
            )}
          </div>
        )}

        {/* Run button */}
        <button
          onClick={handleRun}
          disabled={!canRun}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          {running ? (
            <><Loader2 size={14} className="animate-spin" /> Running…</>
          ) : (
            <><Play size={14} /> {mode === 'extract' ? 'Run Extract' : mode === 'analyze' ? 'Run Analyze' : 'Run End-to-End'}</>
          )}
        </button>
      </div>

      {/* Log feed */}
      <div className="mb-4">
        <LogFeed entries={logs} onClear={clearLogs} />
      </div>

      {/* Status summary while running */}
      {running && (
        <div className="flex items-center gap-2 text-xs text-[#38BDF8] mb-4">
          <Loader2 size={12} className="animate-spin" />
          Test in progress — do not navigate away
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            {results.panel.processing_status === 'complete' ? (
              <CheckCircle2 size={14} className="text-[#10B981]" />
            ) : results.panel.processing_status === 'failed' ? (
              <XCircle size={14} className="text-[#EF4444]" />
            ) : (
              <AlertTriangle size={14} className="text-[#F59E0B]" />
            )}
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Test Complete</span>
          </div>
          <ResultsPanel results={results} />
        </div>
      )}
    </div>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export function AdminTestPipelinePage() {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem('admin_authenticated') === 'true'
  );

  if (!authed) return <AdminAuthGate onAuth={() => setAuthed(true)} />;
  return <AdminTestPipelineHarness />;
}

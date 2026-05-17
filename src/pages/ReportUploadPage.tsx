import { useState, useRef } from 'react';
import { Upload, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

const MAX_SIZE = 10 * 1024 * 1024;

let uploadInProgress = false;

export function ReportUploadPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validateFile(f: File): string | null {
    if (f.type !== 'application/pdf') return 'Only PDF files are accepted.';
    if (f.size > MAX_SIZE) return 'File exceeds 10 MB limit.';
    return null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFileError('');
    if (!f) { setFile(null); return; }
    const err = validateFile(f);
    if (err) { setFileError(err); setFile(null); return; }
    setFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (!f) return;
    const err = validateFile(f);
    if (err) { setFileError(err); return; }
    setFileError('');
    setFile(f);
  }

  async function handleAnalyse() {
    if (uploadInProgress || !file || !user) return;
    uploadInProgress = true;
    setUploadError('');
    setUploading(true);

    try {
      const path = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadErr } = await supabase.storage
        .from('blood-reports')
        .upload(path, file, { contentType: 'application/pdf' });

      if (uploadErr) {
        uploadInProgress = false;
        setUploadError('Upload failed: ' + uploadErr.message);
        setUploading(false);
        return;
      }

      // DB-level duplicate guard: reuse panel if same filename uploaded in last 30s
      const thirtySecondsAgo = new Date(Date.now() - 30_000).toISOString();
      const { data: existing } = await supabase
        .from('panels')
        .select('id')
        .eq('user_id', user.id)
        .ilike('raw_pdf_path', `%${file.name}`)
        .gte('registered_at', thirtySecondsAgo)
        .maybeSingle();

      if (existing?.id) {
        navigate(`/reports/processing/${existing.id}`);
        return;
      }

      const { data: panel, error: insertErr } = await supabase
        .from('panels')
        .insert({
          user_id: user.id,
          raw_pdf_path: path,
          registered_at: new Date().toISOString(),
          processing_status: 'pending',
          collected_on: new Date().toISOString().split('T')[0],
        })
        .select('id')
        .single();

      if (insertErr || !panel) {
        uploadInProgress = false;
        setUploadError(insertErr?.message ?? 'Could not create panel record.');
        setUploading(false);
        return;
      }

      navigate(`/reports/processing/${panel.id}`);
    } catch (err: any) {
      uploadInProgress = false;
      setUploadError(err.message ?? 'Unexpected error.');
      setUploading(false);
    }
  }

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 animate-fade-in">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate('/reports')} className="btn-ghost flex items-center gap-2 text-sm mb-8">
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-white mb-1">Upload Blood Report</h1>
        <p className="text-[#94A3B8] text-sm mb-8">Any Indian lab accepted · The AI reads your report automatically</p>

        {uploadError && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-5">
            {uploadError}
          </div>
        )}

        {/* Drop zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
            file
              ? 'border-[#00E5CC]/60 bg-[#00E5CC]/[0.05]'
              : fileError
              ? 'border-[#EF4444]/50 bg-[#EF4444]/[0.04]'
              : dragOver
              ? 'border-[#00E5CC]/50 bg-[#00E5CC]/[0.06]'
              : 'border-white/[0.12] bg-[#142447] hover:border-[#00E5CC]/40 hover:bg-[#00E5CC]/[0.03]'
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <FileText size={30} className="text-[#00E5CC]" />
              <span className="text-white font-medium text-sm">{file.name}</span>
              <span className="text-xs text-[#64748B]">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setFile(null); setFileError(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                className="text-xs text-[#64748B] hover:text-[#EF4444] transition-colors mt-1"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5 text-[#64748B]">
              <Upload size={28} />
              <span className="text-sm font-medium text-[#94A3B8]">Drop your PDF here or click to browse</span>
              <span className="text-xs">PDF only · Max 10MB</span>
            </div>
          )}
        </div>
        {fileError && <p className="text-xs text-[#EF4444] mt-1.5">{fileError}</p>}

        <button
          onClick={handleAnalyse}
          disabled={uploading || !file}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-5"
        >
          {uploading
            ? <><Loader2 size={16} className="animate-spin" /> Uploading...</>
            : <>Analyse this report <ArrowRight size={16} /></>
          }
        </button>

        <p className="text-xs text-[#64748B] text-center mt-4 leading-relaxed">
          Your report is stored encrypted and processed only to generate your performance score.
        </p>
      </div>
    </div>
  );
}

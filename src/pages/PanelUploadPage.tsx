import { useState } from 'react';
import { Upload, FileText, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../hooks/useRouter';

export function PanelUploadPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    lab_name: '',
    patient_name_on_report: '',
    collected_on: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.collected_on) { setError('Collection date is required.'); return; }
    setLoading(true);
    setError('');

    try {
      let raw_pdf_path: string | null = null;

      if (file) {
        const path = `${user!.id}/${Date.now()}_${file.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('blood-reports')
          .upload(path, file, { contentType: file.type });
        if (uploadErr) {
          setError('File upload failed: ' + uploadErr.message);
          setLoading(false);
          return;
        }
        raw_pdf_path = path;
      }

      const { error: insertErr } = await supabase.from('panels').insert({
        user_id: user!.id,
        lab_name: form.lab_name || null,
        patient_name_on_report: form.patient_name_on_report || null,
        collected_on: form.collected_on,
        raw_pdf_path,
        registered_at: new Date().toISOString(),
        processing_status: 'pending',
      });

      if (insertErr) { setError(insertErr.message); return; }
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex-1 min-h-screen p-6 lg:p-8 flex items-center justify-center animate-fade-in">
        <div className="card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Panel Submitted</h2>
          <p className="text-[#94A3B8] text-sm mb-6">
            Your blood panel has been registered and is queued for processing. Results will appear on your dashboard once complete.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/panels')} className="btn-secondary text-sm">
              View All Panels
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen p-6 lg:p-8 max-w-xl animate-fade-in">
      <button onClick={() => navigate('/panels')} className="btn-ghost flex items-center gap-2 text-sm mb-6">
        <ArrowLeft size={14} /> Back to Panels
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Upload Blood Panel</h1>
        <p className="text-[#94A3B8] text-sm mt-1">Submit your lab report for analysis</p>
      </div>

      {error && (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">Collection Date *</label>
          <input
            type="date"
            className="input"
            value={form.collected_on}
            onChange={e => setForm(f => ({ ...f, collected_on: e.target.value }))}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="label">Lab Name</label>
          <input
            className="input"
            placeholder="e.g. Thyrocare, Dr Lal PathLabs"
            value={form.lab_name}
            onChange={e => setForm(f => ({ ...f, lab_name: e.target.value }))}
          />
        </div>

        <div>
          <label className="label">Patient Name on Report</label>
          <input
            className="input"
            placeholder="As shown on the report"
            value={form.patient_name_on_report}
            onChange={e => setForm(f => ({ ...f, patient_name_on_report: e.target.value }))}
          />
        </div>

        <div>
          <label className="label">Upload PDF / Image (optional)</label>
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
              file ? 'border-[#00E5CC]/40 bg-[#00E5CC]/5' : 'border-white/[0.12] bg-[#142447] hover:border-white/25 hover:bg-[#142447]'
            }`}
          >
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <div className="flex items-center gap-2 text-[#00E5CC]">
                <FileText size={18} />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#64748B]">
                <Upload size={22} />
                <span className="text-sm">Drop PDF or image here, or click to browse</span>
              </div>
            )}
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
          {loading ? <Loader2 size={15} className="animate-spin" /> : <><Upload size={15} /> Submit Panel</>}
        </button>
      </form>
    </div>
  );
}

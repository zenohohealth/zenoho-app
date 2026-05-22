import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { extractText } from "npm:unpdf";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  let panel_id: string | null = null;

  // 60-second hard abort — keeps well within Pro's 150s wall-clock limit
  const TIMEOUT_MS = 60_000;
  const abortController = new AbortController();
  const timeoutHandle = setTimeout(
    () => abortController.abort(new Error("PDF extraction exceeded 60-second limit")),
    TIMEOUT_MS
  );

  try {
    const body = await req.json();
    panel_id = body.panel_id ?? null;
    if (!panel_id) {
      clearTimeout(timeoutHandle);
      return new Response(JSON.stringify({ error: "panel_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("panels").update({ processing_status: "pending" }).eq("id", panel_id);

    const { data: panel, error: panelErr } = await supabase
      .from("panels").select("id, raw_pdf_path").eq("id", panel_id).single();
    if (panelErr || !panel) throw new Error("Panel not found: " + (panelErr?.message ?? "unknown"));

    if (!panel.raw_pdf_path) throw new Error("No PDF path on panel");

    const { data: fileData, error: storageErr } = await supabase.storage
      .from("blood-reports").download(panel.raw_pdf_path);
    if (storageErr || !fileData) throw new Error("Storage download failed: " + (storageErr?.message ?? "no data"));

    const arrayBuf = await fileData.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuf);

    // Extract plain text from PDF using unpdf
    let rawText = "";
    try {
      const { text } = await extractText(uint8, { mergePages: true });
      rawText = Array.isArray(text) ? text.join("\n") : (text ?? "");
    } catch (extractErr: any) {
      // If unpdf fails (e.g. scanned image-only PDF), fall back to empty string
      // process-blood-report will handle the no-text case gracefully
      console.error("PDF text extraction failed, falling back to empty:", extractErr.message);
      rawText = "";
    }

    await supabase.from("panels").update({
      raw_text: rawText || null,
      processing_status: "text_extracted",
    }).eq("id", panel_id);

    // Fire-and-forget: invoke process-blood-report asynchronously
    // We do NOT await — return 200 immediately so the frontend watchdog clock starts
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    EdgeRuntime.waitUntil(
      fetch(`${supabaseUrl}/functions/v1/process-blood-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceKey}`,
          "Apikey": serviceKey,
        },
        body: JSON.stringify({ panel_id }),
      }).catch((err) => {
        console.error("Fire-and-forget to process-blood-report failed:", err.message);
      })
    );

    clearTimeout(timeoutHandle);
    return new Response(JSON.stringify({ success: true, panel_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    clearTimeout(timeoutHandle);
    console.error("extract-pdf-text error:", err.message ?? err, err.stack);
    if (panel_id) {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await supabase.from("panels").update({
          processing_status: "failed",
          processing_error: (err.message ?? "Unknown error").slice(0, 500),
        }).eq("id", panel_id);
      } catch { /* best-effort */ }
    }
    return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

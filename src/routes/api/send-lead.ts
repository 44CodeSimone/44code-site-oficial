import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const OUTLOOK_GATEWAY = "https://connector-gateway.lovable.dev/microsoft_outlook";
const TO_EMAIL = "tecnologia.44code@outlook.com";
const MAX_ATTACHMENT_BYTES = 3_000_000; // 3MB cada anexo embutido (Graph aceita até ~4MB total)
const MAX_TOTAL_ATTACH = 18_000_000;    // ~18MB no email todo (margem)

interface UploadRef {
  path: string;
  name: string;
  mime?: string;
  size?: number;
}

interface LeadPayload {
  lead?: { name?: string; phone?: string; email?: string; summary?: string };
  intent?: string;
  transcript?: { role: "user" | "assistant"; content: string }[];
  uploads?: UploadRef[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Throttle por IP (best-effort, em memória do worker)
const THROTTLE = new Map<string, { count: number; reset: number }>();
function throttle(ip: string): boolean {
  const now = Date.now();
  const rec = THROTTLE.get(ip);
  if (!rec || rec.reset < now) {
    THROTTLE.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (rec.count >= 5) return false;
  rec.count++;
  return true;
}

export const Route = createFileRoute("/api/send-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ||
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";
          if (!throttle(ip)) {
            return Response.json({ error: "Muitos envios. Aguarde um momento." }, { status: 429 });
          }

          const body = (await request.json()) as LeadPayload;
          const lead = body?.lead || {};
          const transcript = Array.isArray(body?.transcript) ? body.transcript.slice(-30) : [];
          const uploads = Array.isArray(body?.uploads) ? body.uploads.slice(0, 10) : [];

          // Validação mínima
          const name = (lead.name || "").toString().trim().slice(0, 200);
          const phone = (lead.phone || "").toString().trim().slice(0, 50);
          const email = (lead.email || "").toString().trim().slice(0, 200);
          const summary = (lead.summary || "").toString().trim().slice(0, 4000);

          if (!name && !phone && !email) {
            return Response.json({ error: "Dados insuficientes para envio." }, { status: 400 });
          }

          const lovableKey = process.env.LOVABLE_API_KEY;
          const outlookKey = process.env.MICROSOFT_OUTLOOK_API_KEY;
          if (!lovableKey || !outlookKey) {
            return Response.json({ error: "Email não configurado." }, { status: 500 });
          }

          // === Baixar arquivos do storage e gerar links assinados ===
          const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
          const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          let signedLinks: { name: string; url: string; size?: number }[] = [];
          const attachments: { name: string; bytes: Uint8Array; mime: string }[] = [];

          if (supabaseUrl && serviceKey && uploads.length > 0) {
            const admin = createClient(supabaseUrl, serviceKey);
            let totalAttached = 0;
            for (const u of uploads) {
              if (!u?.path) continue;
              // Link assinado (7 dias)
              const { data: signed } = await admin.storage
                .from("nexa-uploads")
                .createSignedUrl(u.path, 60 * 60 * 24 * 7);
              if (signed?.signedUrl) {
                signedLinks.push({ name: u.name, url: signed.signedUrl, size: u.size });
              }
              // Anexar inline se couber no orçamento
              if (
                u.size &&
                u.size <= MAX_ATTACHMENT_BYTES &&
                totalAttached + u.size <= MAX_TOTAL_ATTACH
              ) {
                const { data: blob } = await admin.storage.from("nexa-uploads").download(u.path);
                if (blob) {
                  const buf = new Uint8Array(await blob.arrayBuffer());
                  attachments.push({
                    name: u.name,
                    bytes: buf,
                    mime: u.mime || "application/octet-stream",
                  });
                  totalAttached += buf.byteLength;
                }
              }
            }
          }

          // === Montar HTML do email ===
          const transcriptHtml = transcript
            .map(
              (m) =>
                `<div style="margin:8px 0;padding:8px 12px;border-left:3px solid ${
                  m.role === "user" ? "#3b82f6" : "#10b981"
                };background:#f9fafb;border-radius:4px"><strong style="font-size:11px;text-transform:uppercase;color:#6b7280">${
                  m.role === "user" ? "Cliente" : "Nexa"
                }</strong><div style="margin-top:4px;color:#111827;white-space:pre-wrap">${escapeHtml(
                  m.content,
                )}</div></div>`,
            )
            .join("");

          const uploadsHtml = signedLinks.length
            ? `<h3 style="color:#111827;margin-top:24px">Arquivos enviados (links válidos por 7 dias)</h3><ul>${signedLinks
                .map(
                  (l) =>
                    `<li><a href="${l.url}" style="color:#3b82f6">${escapeHtml(l.name)}</a>${
                      l.size ? ` <span style="color:#6b7280">(${(l.size / 1024).toFixed(0)} KB)</span>` : ""
                    }</li>`,
                )
                .join("")}</ul>`
            : "";

          const html = `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:680px;margin:0 auto;padding:24px;color:#111827">
<h1 style="color:#111827;border-bottom:2px solid #3b82f6;padding-bottom:12px">Novo contato / projeto — 44CODE</h1>
<p style="color:#6b7280">Atendimento conduzido pela <strong>Nexa</strong> (assistente virtual).</p>

<h2 style="color:#111827;margin-top:24px">Dados do cliente</h2>
<table style="width:100%;border-collapse:collapse">
  <tr><td style="padding:6px 0;color:#6b7280;width:120px">Nome</td><td style="padding:6px 0"><strong>${escapeHtml(name) || "—"}</strong></td></tr>
  <tr><td style="padding:6px 0;color:#6b7280">Telefone</td><td style="padding:6px 0"><strong>${escapeHtml(phone) || "—"}</strong></td></tr>
  <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><strong>${escapeHtml(email) || "—"}</strong></td></tr>
  <tr><td style="padding:6px 0;color:#6b7280">Intenção</td><td style="padding:6px 0">${escapeHtml(body?.intent || "—")}</td></tr>
</table>

<h2 style="color:#111827;margin-top:24px">Resumo do projeto</h2>
<div style="padding:12px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap">${escapeHtml(summary) || "<em>Não informado</em>"}</div>

${uploadsHtml}

<h2 style="color:#111827;margin-top:24px">Histórico do atendimento</h2>
${transcriptHtml || "<p><em>Sem transcrição</em></p>"}

<hr style="margin-top:32px;border:none;border-top:1px solid #e5e7eb">
<p style="color:#9ca3af;font-size:12px">Enviado automaticamente pela Nexa — site 44CODE</p>
</body></html>`;

          // === Montar payload Microsoft Graph ===
          const subject = `Novo contato / projeto — 44CODE${name ? ` — ${name}` : ""}`;

          // base64 dos anexos (se houver)
          const toBase64 = (bytes: Uint8Array) => {
            let s = "";
            for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
            return btoa(s);
          };

          const message: any = {
            subject,
            body: { contentType: "HTML", content: html },
            toRecipients: [{ emailAddress: { address: TO_EMAIL } }],
          };

          if (email) {
            message.replyTo = [{ emailAddress: { address: email } }];
          }

          if (attachments.length > 0) {
            message.attachments = attachments.map((a) => ({
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: a.name,
              contentType: a.mime,
              contentBytes: toBase64(a.bytes),
            }));
          }

          const sendRes = await fetch(`${OUTLOOK_GATEWAY}/me/sendMail`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": outlookKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, saveToSentItems: true }),
          });

          if (!sendRes.ok) {
            const errTxt = await sendRes.text();
            console.error("Outlook send error:", sendRes.status, errTxt);
            return Response.json(
              { error: "Não foi possível enviar agora. Tente novamente em instantes." },
              { status: 502 },
            );
          }

          return Response.json({ ok: true });
        } catch (e) {
          console.error("/api/send-lead error:", e);
          return Response.json({ error: "Erro interno." }, { status: 500 });
        }
      },
    },
  },
});
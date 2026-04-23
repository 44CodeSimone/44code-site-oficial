import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X, Phone, Loader2, Sparkles, Paperclip, FileText, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  NEXA_API_URL,
  NEXA_LEAD_URL,
  NEXA_OFFLINE_MESSAGE,
  NEXA_WHATSAPP,
  NEXA_ACCEPTED_TYPES,
  NEXA_MAX_FILE_SIZE,
} from "@/lib/nexa-config";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}
interface UploadedFile {
  path: string;
  name: string;
  size: number;
  mime: string;
}
interface Lead {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  summary?: string | null;
}

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Olá, sou a **Nexa**, assistente virtual da 44CODE. Posso te ajudar a estruturar sua ideia, entender o seu projeto e orientar a melhor solução para o que você precisa.\n\nPor onde podemos começar?",
};

const SUGGESTIONS = [
  "Quero criar um site",
  "Preciso de um sistema",
  "Quero automatizar um processo",
  "Preciso de um orçamento",
  "Tenho uma ideia de projeto",
];

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold">
              {p.slice(2, -2)}
            </strong>
          );
        }
        return (
          <span key={i} style={{ whiteSpace: "pre-wrap" }}>
            {p}
          </span>
        );
      })}
    </>
  );
}

function mergeLead(prev: Lead, incoming: Lead | undefined): Lead {
  if (!incoming) return prev;
  return {
    name: incoming.name || prev.name || null,
    phone: incoming.phone || prev.phone || null,
    email: incoming.email || prev.email || null,
    summary: incoming.summary || prev.summary || null,
  };
}

export function NexaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lead, setLead] = useState<Lead>({});
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sentRef = useRef(false); // evita envio duplo
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open, uploads]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function sendLeadEmail(currentLead: Lead, intent: string, transcript: Msg[]) {
    if (sentRef.current) return;
    sentRef.current = true;
    setLeadStatus("sending");
    try {
      const res = await fetch(NEXA_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: currentLead,
          intent,
          transcript: transcript.map((m) => ({ role: m.role, content: m.content })),
          uploads,
        }),
      });
      if (res.ok) {
        setLeadStatus("sent");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "✓ Suas informações foram **enviadas com segurança** para a equipe da 44CODE. Em breve entraremos em contato.\n\nSe preferir, você também pode falar diretamente pelo WhatsApp.",
          },
        ]);
      } else {
        sentRef.current = false; // permite retry
        setLeadStatus("error");
      }
    } catch {
      sentRef.current = false;
      setLeadStatus("error");
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      let data: any = null;
      try {
        const res = await fetch(NEXA_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role, content: m.content })),
            lead,
          }),
          signal: controller.signal,
        });
        try {
          data = await res.json();
        } catch {
          data = null;
        }
        if (!res.ok) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data?.error || NEXA_OFFLINE_MESSAGE },
          ]);
          return;
        }
      } finally {
        clearTimeout(timeout);
      }

      const reply: string = data?.reply?.trim() || NEXA_OFFLINE_MESSAGE;
      const finalMessages: Msg[] = [...next, { role: "assistant", content: reply }];
      setMessages(finalMessages);

      const updatedLead = mergeLead(lead, data?.lead);
      setLead(updatedLead);

      // Envio automático quando a Nexa indica que está pronto
      if (data?.shouldEmail && !sentRef.current) {
        await sendLeadEmail(updatedLead, data?.intent || "projeto", finalMessages);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: "assistant", content: NEXA_OFFLINE_MESSAGE }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setUploadError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > NEXA_MAX_FILE_SIZE) {
          setUploadError(`${file.name}: excede 25MB`);
          continue;
        }
        const ext = file.name.split(".").pop() || "bin";
        const path = `chat/${sessionId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from("nexa-uploads").upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
        if (error) {
          setUploadError(`Falha ao enviar ${file.name}`);
          continue;
        }
        setUploads((prev) => [
          ...prev,
          { path, name: file.name, size: file.size, mime: file.type || "application/octet-stream" },
        ]);
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: `📎 Enviou um arquivo: **${file.name}** (${(file.size / 1024).toFixed(0)} KB)`,
          },
        ]);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating trigger — agora no canto inferior direito */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Falar com a Nexa"
        className={cn(
          "fixed bottom-5 right-5 z-50 group inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-3.5 sm:py-2.5 text-primary-foreground shadow-elegant transition-smooth",
          "bg-gradient-to-r from-primary to-accent hover:scale-105 hover:shadow-glow",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping -z-10" />
        <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline text-xs font-semibold">Fale com a Nexa</span>
      </button>

      {open && (
        <div
          className={cn(
            "fixed z-50 bg-card border border-border shadow-2xl flex flex-col",
            "inset-x-2 bottom-2 top-16 rounded-2xl",
            "sm:inset-auto sm:bottom-20 sm:right-6 sm:top-auto sm:w-[380px] sm:h-[560px] sm:max-h-[80vh] sm:rounded-2xl",
          )}
          role="dialog"
          aria-label="Chat com a Nexa"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-2xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">Nexa</p>
                <p className="text-xs text-muted-foreground truncate">
                  Assistente virtual · 44CODE
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
              className="rounded-full p-2 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm",
                  )}
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Nexa está pensando…
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de arquivos enviados */}
            {uploads.length > 0 && (
              <div className="pt-2 space-y-1">
                {uploads.map((u) => (
                  <div
                    key={u.path}
                    className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg bg-muted/60 border border-border"
                  >
                    <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate flex-1">{u.name}</span>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                ))}
              </div>
            )}

            {uploadError && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2 flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5" />
                {uploadError}
              </div>
            )}

            {leadStatus === "sending" && (
              <div className="text-xs text-muted-foreground flex items-center gap-2 px-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Enviando para a equipe da 44CODE…
              </div>
            )}
            {leadStatus === "error" && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                Não consegui enviar agora. Você pode continuar pelo WhatsApp.
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2 border-t border-border flex items-center gap-2 flex-wrap">
            <a
              href={NEXA_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
            >
              <Phone className="h-3.5 w-3.5" />
              Falar no WhatsApp
            </a>
            <span className="text-[10px] text-muted-foreground ml-auto">
              Aceita: PDF, DOC, XLS, PNG, JPG…
            </span>
          </div>

          {/* Input + Upload */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-border flex items-center gap-2"
          >
            <input
              ref={fileRef}
              type="file"
              multiple
              accept={NEXA_ACCEPTED_TYPES}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              aria-label="Enviar arquivo"
              title="Anexar arquivo"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Paperclip className="h-4 w-4" />
              )}
            </Button>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem…"
              disabled={loading}
              maxLength={2000}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Enviar">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

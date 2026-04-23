import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, Mail, Phone, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}

const WHATSAPP_URL = "https://wa.me/5549999257621?text=Ol%C3%A1%20Nexa!%20Vim%20pelo%20site%20da%2044CODE.";
const EMAIL_TO = "tecnologia.44code@outlook.com";

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Olá, sou a **Nexa**, assistente virtual da 44CODE. Posso te ajudar a estruturar uma solução completa para o seu projeto.\n\nPor onde podemos começar?",
};

const SUGGESTIONS = [
  "Quero criar um site",
  "Preciso de um sistema",
  "Quero automação com IA",
  "Preciso de um orçamento",
];

function renderContent(text: string) {
  // very small markdown: **bold** and line breaks
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

function buildMailto(messages: Msg[]) {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "Cliente" : "Nexa"}: ${m.content}`)
    .join("\n\n");
  const subject = encodeURIComponent("Novo projeto - 44CODE");
  const body = encodeURIComponent(
    `Resumo do atendimento conduzido pela Nexa (assistente virtual da 44CODE).\n\n` +
      `--- Transcrição ---\n\n${transcript}\n\n--- Fim ---\n\n` +
      `Por favor, revise e entre em contato com o cliente.`,
  );
  return `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
}

export function NexaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Falha ao falar com a Nexa.");
        setLoading(false);
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "" }]);
    } catch (e) {
      console.error(e);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Falar com a Nexa"
        className={cn(
          "fixed bottom-5 left-5 z-50 group inline-flex items-center gap-2 rounded-full px-4 py-3 text-primary-foreground shadow-elegant transition-smooth",
          "bg-gradient-to-r from-primary to-accent hover:scale-105 hover:shadow-glow",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping -z-10" />
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Fale com a Nexa</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed z-50 bg-card border border-border shadow-2xl flex flex-col",
            // Mobile: full screen-ish bottom sheet
            "inset-x-2 bottom-2 top-16 rounded-2xl",
            // Desktop: bottom-left panel
            "sm:inset-auto sm:bottom-24 sm:left-5 sm:top-auto sm:w-[400px] sm:h-[600px] sm:rounded-2xl",
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
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
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
            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                {error}
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
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2 border-t border-border flex items-center gap-2 flex-wrap">
            <a
              href={buildMailto(messages)}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Enviar resumo por email
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
            >
              <Phone className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-border flex items-center gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem…"
              disabled={loading}
              maxLength={2000}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              aria-label="Enviar"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
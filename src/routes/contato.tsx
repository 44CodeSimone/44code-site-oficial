import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail, MapPin, Linkedin, Phone } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — 44CodeSimone | Simone da Silva" },
      { name: "description", content: "Entre em contato com Simone da Silva para projetos em Engenharia de Software, DevOps e Cybersecurity." },
      { property: "og:title", content: "Contato — 44CodeSimone" },
      { property: "og:description", content: "Vamos conversar sobre seu próximo projeto." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <header className="mb-14 text-center animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Contato</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vamos <span className="text-gradient">construir juntos</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tem um projeto, ideia ou desafio técnico? Será um prazer conversar.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "WhatsApp", value: "(49) 99925-6721", href: "https://wa.me/5549999256721" },
            { icon: Mail, label: "E-mail", value: "tecnologia.44code@outlook.com", href: "mailto:tecnologia.44code@outlook.com" },
            { icon: Linkedin, label: "LinkedIn", value: "simone-da-silva-44code", href: "https://www.linkedin.com/in/simone-da-silva-44code" },
            { icon: Github, label: "GitHub", value: "github.com/44CodeSimone", href: "https://github.com/44CodeSimone" },
            { icon: MapPin, label: "Localização", value: "Santa Catarina — Brasil" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card p-4 transition-smooth hover:border-primary/60 hover:shadow-glow"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                <p className="text-sm font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <form
          className="rounded-2xl border border-border bg-gradient-card p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const subject = encodeURIComponent(`Contato site — ${fd.get("name")}`);
            const body = encodeURIComponent(`${fd.get("message")}\n\n— ${fd.get("name")} (${fd.get("email")})`);
            window.location.href = `mailto:tecnologia.44code@outlook.com?subject=${subject}&body=${body}`;
          }}
        >
          <h2 className="text-lg font-semibold mb-2">Envie uma mensagem</h2>
          <input name="name" required placeholder="Seu nome" className="w-full rounded-lg border border-border bg-input/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-smooth" />
          <input name="email" type="email" required placeholder="Seu e-mail" className="w-full rounded-lg border border-border bg-input/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-smooth" />
          <textarea name="message" required rows={5} placeholder="Sua mensagem..." className="w-full rounded-lg border border-border bg-input/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-smooth resize-none" />
          <button type="submit" className="w-full rounded-lg bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
            Enviar mensagem
          </button>
        </form>
      </div>
    </div>
  );
}
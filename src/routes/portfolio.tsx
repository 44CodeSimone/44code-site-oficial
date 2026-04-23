import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — 44CodeSimone | Projetos & Repositórios" },
      { name: "description", content: "Projetos de Simone da Silva: SaaS multi-tenant, APIs com IA, plataformas de turismo e mais." },
      { property: "og:title", content: "Portfólio — 44CodeSimone" },
      { property: "og:description", content: "Projetos reais em produção: água, turismo e IA." },
    ],
  }),
  component: PortfolioPage,
});

const projects = [
  {
    name: "Água Nativa",
    tag: "SaaS • Multi-tenant",
    desc: "Plataforma SaaS multi-tenant para gestão de associações rurais de água. Frontend e backend dedicados.",
    stack: ["Node.js", "Multi-tenant", "SaaS"],
    url: "https://github.com/44CodeSimone/agua-nativa",
  },
  {
    name: "Água Nativa — Backend",
    tag: "Backend Enterprise",
    desc: "Backend enterprise para plataforma de gestão de água, com isolamento por tenant e APIs escaláveis.",
    stack: ["JavaScript", "Node.js", "API REST"],
    url: "https://github.com/44CodeSimone/agua-nativa-backend",
  },
  {
    name: "Python API Chat IA",
    tag: "IA • API",
    desc: "API de chat com Inteligência Artificial em Python/Flask, utilizando o modelo Grok (xAI) e hospedada no Replit.",
    stack: ["Python", "Flask", "Grok / xAI"],
    url: "https://github.com/44CodeSimone/python-api-chat-ia",
  },
  {
    name: "Turistei",
    tag: "Plataforma • Turismo",
    desc: "Plataforma de turismo conectando viajantes e experiências locais com foco em usabilidade.",
    stack: ["Full Stack", "Web"],
    url: "https://github.com/44CodeSimone/turistei",
  },
];

function PortfolioPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <header className="mb-14 text-center animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Portfólio</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Projetos em <span className="text-gradient">produção</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Uma seleção de projetos desenvolvidos com foco em arquitetura, segurança e escalabilidade.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.name} className="rounded-2xl border border-border bg-gradient-card p-7 transition-smooth hover:border-primary/60 hover:shadow-elegant group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">{p.tag}</p>
                <h2 className="text-xl font-semibold">{p.name}</h2>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-smooth" aria-label={`Abrir ${p.name}`}>
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">{s}</span>
              ))}
            </div>
            <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-glow transition-smooth">
              <Github className="h-4 w-4" /> Ver repositório
            </a>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="https://github.com/44CodeSimone?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm hover:border-primary hover:shadow-glow transition-smooth">
          <Github className="h-4 w-4" /> Ver todos os repositórios no GitHub
        </a>
      </div>
    </div>
  );
}
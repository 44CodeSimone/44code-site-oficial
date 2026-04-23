import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/data/projects";

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
              {p.live ? (<><Globe className="h-4 w-4" /> Acessar site</>) : (<><Github className="h-4 w-4" /> Ver repositório</>)}
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
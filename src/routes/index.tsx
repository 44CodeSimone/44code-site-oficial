import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, ShieldCheck, Cloud, Code2, Bot, Sparkles } from "lucide-react";
import logo from "@/assets/logo-44code-wide.png";
import { projectsCount } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "44CODE — Tecnologia e Soluções | Conectando desafios a soluções" },
      { name: "description", content: "44CODE — empresa de Engenharia de Software, Backend & Full Stack, DevOps, DevSecOps, Cibersegurança e Automação com IA. Fundada por Simone da Silva." },
      { property: "og:title", content: "44CODE — Tecnologia e Soluções" },
      { property: "og:description", content: "Conectando desafios a soluções: software, segurança e automação com IA." },
    ],
  }),
  component: Index,
});

const highlights = [
  { icon: Code2, label: "Backend & Full Stack" },
  { icon: Cloud, label: "DevOps & Cloud" },
  { icon: ShieldCheck, label: "DevSecOps" },
  { icon: Bot, label: "Automação com IA" },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32 max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-6">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> 44CODE — disponível para novos projetos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="text-gradient">44CODE</span> — Tecnologia e Soluções para o seu negócio
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Conectando desafios a soluções. Engenharia de Software, Backend & Full Stack,
                DevOps & DevSecOps, Cibersegurança e Automação com IA — fundada e liderada por Simone da Silva.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/empresa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
                  Conheça a 44CODE <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-smooth">
                  Ver projetos
                </Link>
                <a href="https://github.com/44CodeSimone" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-smooth">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {highlights.map((h) => (
                  <span key={h.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
                    <h.icon className="h-3.5 w-3.5 text-primary" /> {h.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="relative animate-float w-full max-w-md md:max-w-none">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-30 blur-3xl" />
                <img
                  src={logo}
                  alt="Logo 44CODE — Tecnologia e Soluções"
                  className="relative w-full h-auto aspect-[3/2] rounded-3xl object-cover border border-border shadow-elegant"
                />
                <div className="absolute -bottom-4 -right-4 rounded-xl bg-card/90 backdrop-blur border border-border px-4 py-2 text-xs">
                  <span className="text-muted-foreground">Santa Catarina · </span><span className="text-primary">BR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3 rounded-2xl border border-border bg-gradient-card p-8">
          {[
            { k: "10+", v: "Projetos públicos" },
            { k: "10+", v: "Áreas de atuação" },
            { k: "100%", v: "Foco em qualidade & segurança" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronta para construir o <span className="text-gradient">próximo projeto</span> com você
        </h2>
        <p className="text-muted-foreground mb-8">
          Do design da arquitetura à operação segura em produção — vamos conversar.
        </p>
        <Link to="/contato" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
          Entrar em contato <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Github, ExternalLink, Globe, ShieldCheck, ArrowRight } from "lucide-react";
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
          <span className="text-gradient">Projetos</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Uma seleção de projetos desenvolvidos com foco em arquitetura, segurança e escalabilidade.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.name} className="rounded-2xl border border-border bg-gradient-card p-7 transition-smooth hover:border-primary/60 hover:shadow-elegant group active:scale-[0.97] active:shadow-glow active:border-primary/70 touch-manipulation">
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

      {/* QUEM ESTÁ POR TRÁS DA 44CODE */}
      <section className="mt-24 rounded-2xl border border-border bg-gradient-card p-8 md:p-12 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Quem está por trás da <span className="text-gradient">44CODE</span>
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl">
          <p>
            <strong className="text-foreground">Simone da Silva</strong> é Analista de Sistemas, idealizadora e fundadora da 44CODE.
          </p>
          <p>
            Com mais de <strong className="text-foreground">15 anos de experiência em tecnologia</strong>, atua na criação de sistemas, plataformas e soluções digitais que vão além do funcionamento básico — são pensadas para serem seguras, organizadas e preparadas para crescer.
          </p>
          <p>
            Sua atuação conecta engenharia de software, arquitetura de sistemas, backend, full stack, DevOps, DevSecOps e cibersegurança, sempre com foco em entregar soluções consistentes, confiáveis e alinhadas à realidade de quem utiliza.
          </p>
          <p>
            Ao longo da sua trajetória, desenvolveu projetos completos — desde a ideia até a operação — incluindo plataformas SaaS, APIs escaláveis, sistemas web e soluções com Inteligência Artificial.
          </p>
          <p>
            É graduada em <strong className="text-foreground">Análise e Desenvolvimento de Sistemas pela UNIGRAN</strong> e possui formação em cibersegurança pelo programa <strong className="text-foreground">Hackers do Bem (RNP, Softex e SENAI)</strong>, além de manter atualização contínua nas áreas de DevOps, DevSecOps, desenvolvimento de aplicações web, arquitetura de software, banco de dados e computação em nuvem (cloud computing).
          </p>
          <p>
            Também possui experiência prática em ambientes reais, incluindo sistemas de gestão e integração de dados, com foco em organização, confiabilidade e continuidade operacional.
          </p>
          <p className="text-foreground font-medium">
            Seu trabalho é guiado por um princípio simples: <span className="text-gradient">tecnologia precisa funcionar bem, ser segura e fazer sentido para quem usa</span>.
          </p>
        </div>
      </section>

      {/* BLOCO DE REFORÇO */}
      <section className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-3">
          Cada projeto apresentado aqui não é apenas um sistema entregue.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          É resultado de um processo pensado, estruturado e executado com <strong className="text-foreground">responsabilidade técnica</strong>, <strong className="text-foreground">visão de negócio</strong> e <strong className="text-foreground">foco no longo prazo</strong>.
        </p>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth"
        >
          Conversar com a 44CODE <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
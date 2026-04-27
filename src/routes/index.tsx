import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, ShieldCheck, Cloud, Code2, Bot, Sparkles } from "lucide-react";
import logo from "@/assets/logo-44code-wide.png";
import { projectsCount } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Desenvolvimento de Sistemas e Sites com IA | 44CODE" },
      { name: "description", content: "Desenvolvimento de sistemas, criação de sites profissionais e soluções com inteligência artificial para empresas no Brasil e em Santa Catarina." },
      { property: "og:title", content: "Desenvolvimento de Sistemas, Sites e IA | 44CODE" },
      { property: "og:description", content: "Software sob medida, automação de processos e sistemas web seguros para negócios em todo o Brasil." },
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
                Desenvolvimento de Sistemas, Sites e Soluções com Inteligência Artificial
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                A 44CODE é especializada em criação de sistemas, sites e soluções tecnológicas sob medida.
                Desenvolvemos software moderno, seguro e preparado para crescer com o seu negócio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/empresa" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
                  Vamos entender seu projeto <ArrowRight className="h-4 w-4" />
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

      {/* VALUE */}
      <section className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Soluções para negócios</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Transformamos ideias em <span className="text-gradient">sistemas reais</span>.
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Criamos soluções digitais para empresas que precisam de organização, automação e crescimento.
              Atuamos no desenvolvimento de sistemas personalizados, aplicações web, integrações e automações
              com Inteligência Artificial, sempre com foco em segurança, performance e experiência de uso.
            </p>
            <p>
              A 44CODE atende online para todo o Brasil e desenvolve software sob medida para negócios que buscam
              eficiência, controle e presença digital profissional. Se sua empresa precisa sair de planilhas,
              organizar processos, criar um sistema web seguro ou lançar um site otimizado para aparecer no Google,
              nós estruturamos o caminho com clareza e responsabilidade técnica.
            </p>
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
          Solicite um orçamento para o <span className="text-gradient">seu projeto</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Vamos entender sua necessidade e orientar o melhor caminho para criar um site profissional,
          sistema personalizado ou automação com IA para sua empresa.
        </p>
        <Link to="/contato" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
          Fale com a 44CODE <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Code2,
  Globe,
  Plug,
  Bot,
  Cloud,
  Database,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos — 44CODE | Tecnologia e Soluções" },
      { name: "description", content: "A 44CODE desenvolve sistemas, sites e soluções digitais sob medida — com segurança, qualidade e visão de crescimento." },
      { property: "og:title", content: "Quem Somos — 44CODE" },
      { property: "og:description", content: "Tecnologia feita para resolver problemas reais, com segurança, estratégia e visão de crescimento." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      {/* HEADLINE / SUBHEADLINE */}
      <header className="mb-16 animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Quem Somos</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Tecnologia feita para <span className="text-gradient">resolver problemas reais</span>, com segurança, estratégia e visão de crescimento.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A <strong className="text-foreground">44CODE</strong> desenvolve sistemas, sites e soluções digitais sob medida
          para empresas e pessoas que precisam de tecnologia confiável, funcional e preparada para evoluir.
        </p>
      </header>

      {/* AUTORIDADE */}
      <section className="mb-16 rounded-2xl border border-border bg-gradient-card p-8 md:p-10">
        <div className="flex items-start gap-4">
          <Sparkles className="h-7 w-7 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Mais de <span className="text-gradient">15 anos</span> construindo tecnologia com propósito
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A 44CODE é uma empresa idealizada por sua fundadora, com mais de{" "}
              <strong className="text-foreground">15 anos de experiência em tecnologia</strong>, atuando na construção de
              soluções completas — do planejamento à operação — com foco em segurança, qualidade e crescimento sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-3">O que fazemos</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Criamos soluções digitais alinhadas à necessidade real de cada cliente.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: Code2, title: "Sistemas web e plataformas completas", text: "Desenvolvimento de plataformas robustas, do conceito à operação em produção." },
            { icon: Globe, title: "Sites profissionais e aplicações sob medida", text: "Presença digital construída com qualidade, performance e identidade." },
            { icon: Plug, title: "APIs e integrações entre sistemas", text: "Conexões confiáveis entre ferramentas, serviços e dados do seu negócio." },
            { icon: Bot, title: "Automação de processos com IA", text: "Tarefas repetitivas resolvidas por inteligência artificial aplicada ao seu fluxo." },
            { icon: Cloud, title: "Ambientes seguros e escaláveis", text: "Infraestrutura preparada para crescer com estabilidade e proteção desde a base." },
            { icon: Database, title: "Organização e modelagem de dados", text: "Estrutura de dados clara, consistente e pronta para gerar informação útil." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-gradient-card p-6 transition-smooth hover:border-primary/60 hover:shadow-glow">
              <item.icon className="h-7 w-7 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="mb-16 rounded-2xl border border-border bg-gradient-card p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">O que nos torna diferente</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          Na 44CODE, tecnologia não é só código. Cada solução é pensada para funcionar na prática:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Arquitetura bem definida",
            "Segurança desde a base",
            "Código limpo e organizado",
            "Estrutura pronta para crescimento",
            "Clareza e simplicidade para quem usa",
          ].map((s) => (
            <div key={s} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-foreground font-medium">
          Não entregamos apenas algo que funciona — entregamos algo que <span className="text-gradient">resolve</span>.
        </p>
      </section>

      {/* VISÃO DE VALOR */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Nossa visão de valor</h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed text-lg">
          Acreditamos que tecnologia precisa facilitar a vida e gerar resultado. Por isso, nossas soluções são pensadas para:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Organizar processos",
            "Reduzir erros e retrabalho",
            "Aumentar eficiência",
            "Trazer controle e praticidade no dia a dia",
          ].map((v) => (
            <div key={v} className="rounded-xl border border-border bg-background/40 p-5 transition-smooth hover:border-primary/60">
              <p className="text-sm text-foreground font-medium">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="rounded-2xl border border-border bg-gradient-card p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Soluções <span className="text-gradient">bem feitas</span>, confiáveis e pensadas para o futuro
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          A 44CODE atende empresas e pessoas que precisam de tecnologia que realmente funcione e faça sentido para o dia a dia.
          Se é isso que você procura — <strong className="text-foreground">nós construímos</strong>.
        </p>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth"
        >
          Fale com a 44CODE <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
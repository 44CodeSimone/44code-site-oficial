import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2,
  Server,
  ShieldCheck,
  Cloud,
  Bot,
  Workflow,
  Globe,
  Palette,
  Megaphone,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de Desenvolvimento de Sistemas e Sites | 44CODE" },
      { name: "description", content: "Criação de sites profissionais, desenvolvimento de sistemas web com segurança, software sob medida e automação de processos com IA no Brasil." },
      { property: "og:title", content: "Serviços de Desenvolvimento de Sistemas e Sites | 44CODE" },
      { property: "og:description", content: "Sistemas personalizados, sites profissionais, automações com IA, integrações e soluções digitais para empresas." },
    ],
  }),
  component: ServicosPage,
});

const categories = [
  {
    label: "Presença Digital",
    description: "Sites, identidade visual e marketing para sua marca crescer com consistência.",
    services: [
      {
        icon: Globe,
        title: "Criação de Sites",
        desc: "Sites profissionais, modernos e otimizados para aparecer no Google e gerar clientes.",
      },
      {
        icon: Palette,
        title: "Web Design & UI/UX",
        desc: "Design moderno, identidade visual coerente e experiências pensadas para converter visitantes em clientes.",
      },
      {
        icon: Megaphone,
        title: "Marketing Digital",
        desc: "Estratégia de presença online, SEO, tráfego e conteúdo para gerar autoridade e resultados reais.",
      },
    ],
  },
  {
    label: "Sistemas & Software",
    description: "Plataformas sob medida que organizam processos e crescem junto com o seu negócio.",
    services: [
      {
        icon: Code2,
        title: "Desenvolvimento de Sistemas",
        desc: "Sistemas sob medida para atender exatamente o que sua empresa precisa, com segurança, performance e escalabilidade.",
      },
      {
        icon: Server,
        title: "Backend & APIs",
        desc: "Construção de APIs REST e serviços em Node.js, Python e plataformas multi-tenant.",
      },
      {
        icon: Workflow,
        title: "SaaS Multi-tenant",
        desc: "Plataformas SaaS sob medida, com isolamento por cliente e governança de dados.",
      },
    ],
  },
  {
    label: "Infraestrutura & Inteligência",
    description: "Cloud, segurança e automação com IA para uma operação confiável e eficiente.",
    services: [
      {
        icon: Cloud,
        title: "DevOps & Cloud",
        desc: "Pipelines CI/CD, containerização, infraestrutura como código e deploy contínuo.",
      },
      {
        icon: ShieldCheck,
        title: "DevSecOps & Cybersecurity",
        desc: "Segurança integrada ao ciclo de desenvolvimento, hardening e análise de vulnerabilidades.",
      },
      {
        icon: Bot,
        title: "Automação com IA",
        desc: "Automatizamos processos utilizando Inteligência Artificial, reduzindo custos e aumentando eficiência.",
      },
    ],
  },
];

function ServicosPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <header className="mb-14 text-center max-w-2xl mx-auto animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Serviços</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Serviços de desenvolvimento de sistemas, sites e automação com IA
        </h1>
        <p className="text-muted-foreground">
          A 44CODE cria sistemas personalizados para empresas, sites profissionais e soluções com Inteligência Artificial
          para negócios que precisam crescer com segurança, organização e presença digital.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((cat, ci) => (
          <section key={cat.label} className="animate-fade-up" style={{ animationDelay: `${ci * 100}ms` }}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-primary text-xs font-medium tracking-widest uppercase mb-1">
                  {cat.label}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold">{cat.description}</h2>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((s, i) => (
                <article
                  key={s.title}
                  className="group rounded-2xl border border-border bg-gradient-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/60 hover:shadow-elegant"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-smooth">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 rounded-2xl border border-border bg-gradient-card p-8 md:p-12 text-center animate-fade-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Vamos entender seu projeto?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Conte o seu desafio e nós avaliamos a melhor solução — do site ao sistema, com estratégia, design, tecnologia e atendimento online para todo o Brasil.
        </p>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-primary-foreground font-medium shadow-glow hover:scale-[1.03] transition-smooth"
        >
          Fale com a 44CODE
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
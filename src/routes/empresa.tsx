import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Target, Lightbulb, Handshake, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-44code-wide.png";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "44CODE | Empresa de Tecnologia em Santa Catarina" },
      { name: "description", content: "44CODE é uma empresa de tecnologia em Santa Catarina com atendimento online para todo o Brasil, especializada em sistemas, sites e IA." },
      { property: "og:title", content: "44CODE | Empresa de Tecnologia em Santa Catarina" },
      { property: "og:description", content: "Desenvolvimento de software sob medida, criação de sistemas personalizados, sites profissionais e automação com IA." },
    ],
  }),
  component: EmpresaPage,
});

const valores = [
  { icon: Target, title: "Missão", text: "Conectar desafios a soluções tecnológicas seguras, escaláveis e que geram valor real." },
  { icon: Lightbulb, title: "Visão", text: "Ser referência em desenvolvimento, DevSecOps e automação inteligente para empresas que querem crescer com confiança." },
  { icon: Handshake, title: "Valores", text: "Transparência, qualidade técnica, segurança por padrão e parceria de longo prazo com cada cliente." },
];

function EmpresaPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <header className="mb-16 grid gap-10 md:grid-cols-[1fr_minmax(280px,360px)] items-center animate-fade-up">
        <div>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">A empresa</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-gradient">44CODE</span> — empresa de tecnologia em Santa Catarina
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Conectando desafios a soluções. A 44CODE nasceu para entregar desenvolvimento de software
            sob medida — do planejamento à operação segura. Atuamos na criação de sistemas personalizados,
            sites profissionais, automação de processos, cibersegurança e soluções com Inteligência Artificial,
            com atendimento online para todo o Brasil.
          </p>
        </div>
        <div className="relative mx-auto md:mx-0 w-full max-w-md animate-float">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-30 blur-3xl" />
          <img
            src={logo}
            alt="Logo 44CODE Tecnologia e Soluções"
            className="relative w-full h-auto aspect-[3/2] rounded-3xl object-cover border border-border shadow-elegant"
          />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3 mb-16">
        {valores.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-gradient-card p-6 transition-smooth hover:border-primary/60 hover:shadow-glow">
            <v.icon className="h-7 w-7 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-gradient-card p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Por que a 44CODE?</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          {[
            "Experiência em desenvolvimento de sistemas web com segurança",
            "Especialização contínua em Cibersegurança (Programa Hackers do Bem / RNP)",
            "Foco em DevSecOps: segurança integrada ao ciclo de desenvolvimento",
            "Plataformas SaaS multi-tenant em produção",
            "Automação inteligente com soluções de Inteligência Artificial",
            "Parceria próxima, comunicação clara e entregas iterativas",
          ].map((s) => (
            <div key={s} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/contato" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth">
            Solicite um orçamento <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
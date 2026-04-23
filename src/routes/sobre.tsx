import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Target } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — 44CodeSimone | Simone da Silva" },
      { name: "description", content: "Conheça a trajetória de Simone da Silva: Analista de Sistemas, Engenheira de Software, DevOps & DevSecOps." },
      { property: "og:title", content: "Sobre — Simone da Silva" },
      { property: "og:description", content: "Trajetória, formação e experiência em Engenharia de Software e Cybersecurity." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <header className="mb-16 animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Sobre mim</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Construindo software com <span className="text-gradient">propósito e segurança</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Sou Simone da Silva, de Santa Catarina — Brasil. Atuo como Analista de Sistemas com foco em
          Engenharia de Software, desenvolvimento Backend & Full Stack, DevOps, DevSecOps, Cybersecurity
          e Automação com Inteligência Artificial. Acredito em código confiável, seguro e em entregas que
          geram impacto real no negócio.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: GraduationCap, title: "Formação", text: "Análise e Desenvolvimento de Sistemas com especializações contínuas em Cloud, Segurança e IA." },
          { icon: Briefcase, title: "Experiência", text: "Desenvolvimento de plataformas SaaS multi-tenant, APIs escaláveis e pipelines DevOps." },
          { icon: Target, title: "Objetivo", text: "Entregar soluções resilientes que combinem performance, segurança e boa experiência de uso." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-gradient-card p-6 transition-smooth hover:border-primary/50 hover:shadow-glow">
            <item.icon className="h-7 w-7 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-border bg-gradient-card p-8">
        <h2 className="text-2xl font-bold mb-6">Áreas de atuação</h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          {[
            "Engenharia de Software & Arquitetura",
            "Backend & Full Stack (Node.js, Python, JavaScript)",
            "DevOps & DevSecOps",
            "Cybersecurity aplicada ao ciclo de desenvolvimento",
            "Automação de processos com Inteligência Artificial",
            "Plataformas SaaS e soluções multi-tenant",
          ].map((s) => (
            <div key={s} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
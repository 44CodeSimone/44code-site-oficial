import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Target, ShieldCheck, Award } from "lucide-react";

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
          15+ anos construindo tecnologia com <span className="text-gradient">estratégia, segurança e propósito</span>
        </h1>
        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            Sou <strong className="text-foreground">Simone da Silva</strong>, Analista de Sistemas, idealizadora e fundadora
            da <strong className="text-foreground">44CODE — Tecnologia e Soluções</strong>. São mais de{" "}
            <strong className="text-foreground">15 anos atuando com tecnologia</strong>, conduzindo projetos de software do
            conceito à operação em produção, com entregas consistentes, seguras e orientadas a resultado.
          </p>
          <p>
            Atuo na interseção entre <strong className="text-foreground">Engenharia de Software</strong>,{" "}
            <strong className="text-foreground">Arquitetura</strong>,{" "}
            <strong className="text-foreground">DevOps/DevSecOps</strong> e{" "}
            <strong className="text-foreground">Cybersecurity</strong>, projetando plataformas robustas, APIs escaláveis e
            ambientes preparados para crescer. Trato tecnologia como instrumento de negócio: cada decisão técnica precisa
            sustentar produto, performance, segurança e custo no longo prazo.
          </p>
          <p>
            Minha experiência cobre <strong className="text-foreground">Backend e Full Stack</strong>, desenvolvimento de
            aplicações web, <strong className="text-foreground">APIs escaláveis</strong>, plataformas{" "}
            <strong className="text-foreground">SaaS multi-tenant</strong>, modelagem de{" "}
            <strong className="text-foreground">banco de dados</strong>, <strong className="text-foreground">Cloud Computing</strong>,
            pipelines de CI/CD, segurança aplicada ao ciclo de desenvolvimento e{" "}
            <strong className="text-foreground">automação com Inteligência Artificial</strong>. Construo software pensado
            para ser mantido, auditado e evoluído — não apenas para entrar no ar.
          </p>
          <p>
            A base técnica vem da graduação em <strong className="text-foreground">Análise e Desenvolvimento de Sistemas pela UNIGRAN</strong>{" "}
            e da formação em <strong className="text-foreground">Cibersegurança pelo programa Hackers do Bem</strong> (RNP, Softex
            e SENAI — Ministério da Ciência, Tecnologia e Inovações). Atualmente, sigo em formação contínua nas áreas de{" "}
            <strong className="text-foreground">DevOps</strong>, <strong className="text-foreground">DevSecOps</strong>,{" "}
            Desenvolvimento de Aplicações Web, <strong className="text-foreground">Arquitetura de Software</strong>, Banco
            de Dados e Cloud Computing — porque tecnologia exige evolução constante, e maturidade profissional se mantém com
            estudo, prática e entrega real.
          </p>
          <p>
            O diferencial do meu trabalho está na combinação entre <strong className="text-foreground">qualidade de engenharia</strong>,{" "}
            <strong className="text-foreground">segurança desde a base</strong> e estrutura para crescer. Priorizo código limpo,
            arquitetura sólida, observabilidade e processos automatizados, entregando soluções que servem ao negócio hoje e
            sustentam a operação amanhã.
          </p>
          <p>
            À frente da 44CODE, meu compromisso é claro: entregar <strong className="text-foreground">valor real</strong>, e
            não apenas código. Projetos sérios, executados com método, segurança e visão de longo prazo — para clientes que
            esperam tecnologia à altura do que estão construindo.
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: GraduationCap, title: "Formação", text: "Tecnóloga em Análise e Desenvolvimento de Sistemas — UNIGRAN (2023)." },
          { icon: Briefcase, title: "Experiência", text: "Plataformas SaaS multi-tenant, APIs escaláveis e pipelines DevOps em produção." },
          { icon: Target, title: "Objetivo", text: "Entregar soluções resilientes que combinem performance, segurança e ótima UX." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-gradient-card p-6 transition-smooth hover:border-primary/50 hover:shadow-glow">
            <item.icon className="h-7 w-7 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-border bg-gradient-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Formação & Certificações</h2>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background/40 p-5">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold">Tecnologia em Análise e Desenvolvimento de Sistemas</h3>
                <p className="text-sm text-muted-foreground mt-1">Centro Universitário da Grande Dourados (UNIGRAN) — Conclusão em 2022, colação de grau em 2023.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold">Programa Hackers do Bem — Formação em Cibersegurança</h3>
                <p className="text-sm text-muted-foreground mt-1">RNP / Softex / SENAI — Ministério da Ciência, Tecnologia e Inovações.</p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Nivelamento</li>
                  <li>Básico</li>
                  <li>Fundamental — 96h (princípios de segurança, criptografia, resposta a incidentes, desenvolvimento seguro, controle de acesso e mais)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
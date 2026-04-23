import { createFileRoute } from "@tanstack/react-router";
import { Code2, Server, ShieldCheck, Cloud, Bot, Workflow } from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — 44CodeSimone | Engenharia de Software & DevOps" },
      { name: "description", content: "Desenvolvimento Backend & Full Stack, DevOps, DevSecOps, Cybersecurity, Cloud e Automação com IA." },
      { property: "og:title", content: "Serviços — 44CodeSimone" },
      { property: "og:description", content: "Conheça os serviços oferecidos: software, segurança, DevOps e automação com IA." },
    ],
  }),
  component: ServicosPage,
});

const services = [
  { icon: Code2, title: "Engenharia de Software", desc: "Arquitetura, design e desenvolvimento de aplicações Full Stack robustas e escaláveis." },
  { icon: Server, title: "Backend & APIs", desc: "Construção de APIs REST e serviços em Node.js, Python e plataformas multi-tenant." },
  { icon: Cloud, title: "DevOps & Cloud", desc: "Pipelines CI/CD, containerização, infraestrutura como código e deploy contínuo." },
  { icon: ShieldCheck, title: "DevSecOps & Cybersecurity", desc: "Segurança integrada ao ciclo de desenvolvimento, hardening e análise de vulnerabilidades." },
  { icon: Bot, title: "Automação com IA", desc: "Integração com modelos de IA (Grok, OpenAI) para chatbots, análise e produtividade." },
  { icon: Workflow, title: "SaaS Multi-tenant", desc: "Plataformas SaaS sob medida, com isolamento por cliente e governança de dados." },
];

function ServicosPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <header className="mb-14 text-center max-w-2xl mx-auto animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Serviços</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Soluções <span className="text-gradient">end-to-end</span> em tecnologia
        </h1>
        <p className="text-muted-foreground">
          Do código à nuvem, com segurança e automação aplicadas em cada etapa.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
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
    </div>
  );
}
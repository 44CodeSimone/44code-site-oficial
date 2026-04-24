export type Project = {
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  url: string;
  live?: boolean;
};

// Fonte única da verdade dos projetos da 44CODE.
// As estatísticas da home (Projetos públicos) e o portfólio leem daqui.
// Para adicionar/remover projetos, edite apenas este array.
export const projects: Project[] = [
  {
    name: "Site institucional 44CODE",
    tag: "Site • Enterprise",
    desc: "Site oficial da 44CODE com identidade premium, SSR, SEO otimizado e a assistente virtual Nexa integrada — atendimento inteligente, qualificação de leads, upload de arquivos e envio automático de email.",
    stack: ["TanStack Start", "React 19", "Tailwind v4", "Lovable Cloud", "IA"],
    url: "https://github.com/44CodeSimone/44code-site-oficial",
  },
  {
    name: "Água Nativa",
    tag: "SaaS • Multi-tenant",
    desc: "Plataforma SaaS multi-tenant para gestão de associações rurais de água. Frontend e backend dedicados.",
    stack: ["Node.js", "Multi-tenant", "SaaS"],
    url: "https://github.com/44CodeSimone/agua-nativa",
  },
  {
    name: "Água Nativa — Backend",
    tag: "Backend Enterprise",
    desc: "Backend enterprise para plataforma de gestão de água, com isolamento por tenant e APIs escaláveis.",
    stack: ["JavaScript", "Node.js", "API REST"],
    url: "https://github.com/44CodeSimone/agua-nativa-backend",
  },
  {
    name: "Python API Chat IA",
    tag: "IA • API",
    desc: "API de chat com Inteligência Artificial em Python/Flask, utilizando o modelo Grok (xAI) e hospedada no Replit.",
    stack: ["Python", "Flask", "Grok / xAI"],
    url: "https://github.com/44CodeSimone/python-api-chat-ia",
  },
  {
    name: "Turistei",
    tag: "Plataforma • Turismo",
    desc: "Plataforma de turismo conectando viajantes e experiências locais com foco em usabilidade.",
    stack: ["Full Stack", "Web"],
    url: "https://github.com/44CodeSimone/turistei",
  },
];

export const projectsCount = projects.length;
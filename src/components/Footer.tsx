import { Github, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-44code.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-24">
      <div className="container mx-auto px-6 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="44CODE" className="h-9 w-9 rounded-md object-cover ring-1 ring-primary/40" />
            <div className="leading-tight">
              <div className="font-bold text-gradient">44CODE</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tecnologia e Soluções</div>
            </div>
          </div>
          <p className="text-muted-foreground">
            Conectando desafios a soluções. Engenharia de Software, DevOps, Cibersegurança e Automação com IA.
          </p>
        </div>
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Santa Catarina — Brasil</span>
          </div>
          <a href="https://github.com/44CodeSimone" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-smooth">
            <Github className="h-4 w-4 text-primary" />
            <span>github.com/44CodeSimone</span>
          </a>
          <a href="mailto:contato@44code.com.br" className="flex items-center gap-2 hover:text-foreground transition-smooth">
            <Mail className="h-4 w-4 text-primary" />
            <span>contato@44code.com.br</span>
          </a>
        </div>
        <div className="text-muted-foreground md:text-right">
          © {new Date().getFullYear()} 44CODE Tecnologia e Soluções.<br />Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
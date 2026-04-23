import { Github, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-24">
      <div className="container mx-auto px-6 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-bold text-gradient text-lg mb-2">44CodeSimone</div>
          <p className="text-muted-foreground">
            Engenharia de Software, DevOps & Cybersecurity. Construindo soluções confiáveis e seguras.
          </p>
        </div>
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Santa Catarina — Brasil</div>
          <a href="https://github.com/44CodeSimone" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-smooth"><Github className="h-4 w-4 text-primary" /> github.com/44CodeSimone</a>
          <a href="mailto:contato@44codesimone.dev" className="flex items-center gap-2 hover:text-foreground transition-smooth"><Mail className="h-4 w-4 text-primary" /> contato@44codesimone.dev</a>
        </div>
        <div className="text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Simone da Silva.<br />Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
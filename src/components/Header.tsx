import { Link } from "@tanstack/react-router";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-44code-wide.png";

const links = [
  { to: "/", label: "Início" },
  { to: "/empresa", label: "Empresa" },
  { to: "/sobre", label: "Quem Somos" },
  { to: "/servicos", label: "Serviços" },
  { to: "/portfolio", label: "Portfólio" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold">
          <span className="relative inline-flex animate-float">
            <span className="absolute -inset-1.5 rounded-xl bg-gradient-primary opacity-30 blur-md" />
            <img src={logo} alt="44CODE — Tecnologia e Soluções" className="relative h-10 w-[60px] aspect-[3/2] rounded-lg object-cover border border-border ring-1 ring-primary/40 shadow-glow" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-gradient text-base">44CODE</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Tecnologia e Soluções</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/44CodeSimone"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-smooth"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/44CodeSimone"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
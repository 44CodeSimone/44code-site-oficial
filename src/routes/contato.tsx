import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail, MapPin, Linkedin, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — 44CODE | Simone da Silva" },
      { name: "description", content: "Entre em contato com a 44CODE para projetos em Engenharia de Software, DevOps e Cibersegurança." },
      { property: "og:title", content: "Contato — 44CODE" },
      { property: "og:description", content: "Vamos conversar sobre seu próximo projeto." },
    ],
  }),
  component: ContatoPage,
});

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome (mín. 2 caracteres)" })
    .max(100, { message: "Nome muito longo (máx. 100 caracteres)" }),
  email: z
    .string()
    .trim()
    .email({ message: "Informe um e-mail válido" })
    .max(255, { message: "E-mail muito longo" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Mensagem muito curta (mín. 10 caracteres)" })
    .max(1000, { message: "Mensagem muito longa (máx. 1000 caracteres)" }),
});

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

function ContatoPage() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Verifique os campos do formulário", {
        description: "Corrija os erros destacados e tente novamente.",
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { name, email, message } = result.data;
    const subject = encodeURIComponent(`Contato site — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    toast.success("Abrindo seu cliente de e-mail...", {
      description: "Sua mensagem foi preparada. Conclua o envio no seu app de e-mail.",
      icon: <CheckCircle2 className="h-4 w-4" />,
      duration: 6000,
    });

    setTimeout(() => {
      window.location.href = `mailto:tecnologia.44code@outlook.com?subject=${subject}&body=${body}`;
      form.reset();
      setSubmitting(false);
    }, 600);
  };

  const inputBase =
    "w-full rounded-lg border bg-input/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none transition-smooth";
  const inputOk = "border-border focus:border-primary";
  const inputErr = "border-destructive focus:border-destructive";

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <header className="mb-14 text-center animate-fade-up">
        <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Contato</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vamos <span className="text-gradient">construir juntos</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tem um projeto, ideia ou desafio técnico? Será um prazer conversar.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "WhatsApp", value: "(49) 99925-6721", href: "https://wa.me/5549999256721" },
            { icon: Mail, label: "E-mail", value: "tecnologia.44code@outlook.com", href: "mailto:tecnologia.44code@outlook.com" },
            { icon: Linkedin, label: "LinkedIn", value: "simone-da-silva-44code", href: "https://www.linkedin.com/in/simone-da-silva-44code" },
            { icon: Github, label: "GitHub", value: "github.com/44CodeSimone", href: "https://github.com/44CodeSimone" },
            { icon: MapPin, label: "Localização", value: "Santa Catarina — Brasil" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card p-4 transition-smooth hover:border-primary/60 hover:shadow-glow"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                <p className="text-sm font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <form
          noValidate
          className="rounded-2xl border border-border bg-gradient-card p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold mb-2">Envie uma mensagem</h2>

          <div className="space-y-1">
            <label htmlFor="name" className="text-xs text-muted-foreground">Nome <span className="text-destructive">*</span></label>
            <input
              id="name"
              name="name"
              maxLength={100}
              placeholder="Seu nome"
              aria-invalid={!!errors.name}
              className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
            />
            {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs text-muted-foreground">E-mail <span className="text-destructive">*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={255}
              placeholder="voce@exemplo.com"
              aria-invalid={!!errors.email}
              className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            />
            {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-xs text-muted-foreground">Mensagem <span className="text-destructive">*</span></label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              placeholder="Conte sobre seu projeto..."
              aria-invalid={!!errors.message}
              className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
            />
            {errors.message && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Abrindo e-mail..." : "Enviar mensagem"}
          </button>
        </form>
      </div>
    </div>
  );
}

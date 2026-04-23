import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NexaChat } from "../components/NexaChat";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "44CODE — Tecnologia e Soluções" },
      { name: "description", content: "44CODE — Tecnologia e Soluções. Engenharia de Software, DevOps, DevSecOps, Cibersegurança e Automação com IA. Conectando desafios a soluções." },
      { name: "author", content: "44CODE — Simone da Silva" },
      { property: "og:title", content: "44CODE — Tecnologia e Soluções" },
      { property: "og:description", content: "44CODE — Tecnologia e Soluções. Engenharia de Software, DevOps, DevSecOps, Cibersegurança e Automação com IA. Conectando desafios a soluções." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "44CODE — Tecnologia e Soluções" },
      { name: "twitter:description", content: "44CODE — Tecnologia e Soluções. Engenharia de Software, DevOps, DevSecOps, Cibersegurança e Automação com IA. Conectando desafios a soluções." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/abf9ae3f-b243-4cdb-8a71-f2405d29710b/id-preview-bb9d0b97--ad065a5c-050b-4baa-b71f-df571b4ef439.lovable.app-1776967416219.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/abf9ae3f-b243-4cdb-8a71-f2405d29710b/id-preview-bb9d0b97--ad065a5c-050b-4baa-b71f-df571b4ef439.lovable.app-1776967416219.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global tech background — applied once, covers every page */}
      <div className="tech-bg" aria-hidden="true" />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <NexaChat />
      <Toaster richColors position="top-right" />
    </div>
  );
}

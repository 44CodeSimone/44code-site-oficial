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
      {/* Global tech background — fluid digital waves + connected particles */}
      <div className="tech-bg" aria-hidden="true">
        <svg
          className="tech-bg__svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="particle-glow">
              <stop offset="0%" stopColor="oklch(0.95 0.12 210)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wave-grad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0" />
              <stop offset="60%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="oklch(0.6 0.18 230)" stopOpacity="0.85" />
            </linearGradient>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>

            {/* Circuito reutilizável — lado esquerdo */}
            <symbol id="circuit-left" viewBox="0 0 360 900">
              <g
                stroke="oklch(0.78 0.16 215)"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0,120 L90,120 L120,150 L200,150 L230,180 L300,180" />
                <path d="M0,200 L70,200 L100,170 L180,170" />
                <path d="M0,280 L60,280 L90,310 L160,310 L190,280 L260,280 L290,310 L340,310" />
                <path d="M0,380 L80,380 L110,350 L210,350" />
                <path d="M0,460 L100,460 L130,490 L240,490 L270,460 L320,460" />
                <path d="M0,560 L70,560 L100,590 L180,590" />
                <path d="M0,640 L60,640 L90,610 L150,610 L180,640 L260,640 L290,670 L340,670" />
                <path d="M0,740 L80,740 L110,710 L200,710" />
                <path d="M0,820 L90,820 L120,790 L210,790 L240,820 L300,820" />
              </g>
              {/* Nós do circuito */}
              <g fill="oklch(0.85 0.14 210)">
                {[
                  [120, 150], [230, 180], [300, 180],
                  [100, 170], [180, 170],
                  [90, 310], [190, 280], [290, 310], [340, 310],
                  [110, 350], [210, 350],
                  [130, 490], [270, 460], [320, 460],
                  [100, 590], [180, 590],
                  [90, 610], [180, 640], [290, 670], [340, 670],
                  [110, 710], [200, 710],
                  [120, 790], [240, 820], [300, 820],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={2.2} />
                ))}
              </g>
            </symbol>
          </defs>

          {/* === CIRCUITOS LATERAIS (esquerda + espelhado à direita) === */}
          <g filter="url(#soft-glow)" opacity="0.85">
            <use href="#circuit-left" x="0" y="0" width="360" height="900" />
            <use
              href="#circuit-left"
              x="0"
              y="0"
              width="360"
              height="900"
              transform="translate(1440 0) scale(-1 1)"
            />
          </g>

          {/* === ESTRELAS / POEIRA DIGITAL === */}
          <g fill="oklch(0.95 0.05 220)">
            {Array.from({ length: 70 }).map((_, i) => {
              const seed = i * 9301 + 49297;
              const x = (seed % 1440);
              const y = ((seed * 7) % 900);
              const r = ((i % 3) + 0.4) * 0.6;
              return (
                <circle
                  key={`s-${i}`}
                  className="star"
                  cx={x}
                  cy={y}
                  r={r}
                  style={{ animationDelay: `${(i % 8) * 0.4}s` }}
                />
              );
            })}
          </g>

          {/* === ONDAS DE PARTÍCULAS DIGITAIS (parte inferior) === */}
          <g className="wave-1" opacity="0.85">
            {Array.from({ length: 90 }).map((_, i) => {
              const x = (i / 89) * 1440;
              // curva senoidal suave para criar a forma de onda
              const baseY = 760;
              const amp = 70;
              const y = baseY - Math.sin((i / 89) * Math.PI * 2) * amp - Math.sin((i / 89) * Math.PI) * 30;
              const r = 1 + ((i % 5) * 0.25);
              return (
                <circle
                  key={`w1-${i}`}
                  className="particle"
                  cx={x}
                  cy={y}
                  r={r}
                  fill="oklch(0.85 0.14 215)"
                  style={{ animationDelay: `${(i % 10) * 0.25}s` }}
                />
              );
            })}
          </g>

          <g className="wave-2" opacity="0.7">
            {Array.from({ length: 110 }).map((_, i) => {
              const x = (i / 109) * 1440;
              const baseY = 820;
              const amp = 50;
              const y = baseY - Math.sin((i / 109) * Math.PI * 3 + 1) * amp - Math.sin((i / 109) * Math.PI) * 20;
              const r = 0.8 + ((i % 4) * 0.2);
              return (
                <circle
                  key={`w2-${i}`}
                  cx={x}
                  cy={y}
                  r={r}
                  fill="oklch(0.78 0.16 220)"
                  opacity={0.85}
                />
              );
            })}
          </g>

          {/* Linha horizontal central de luz (como na referência) */}
          <line
            x1="320"
            y1="700"
            x2="1120"
            y2="700"
            stroke="oklch(0.9 0.12 215)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />

          {/* Halos / partículas grandes brilhantes */}
          <g fill="url(#particle-glow)">
            {[
              [180, 240, 18],
              [1260, 240, 18],
              [200, 680, 22],
              [1240, 680, 22],
              [720, 760, 30],
            ].map(([cx, cy, r], i) => (
              <circle key={`g-${i}`} cx={cx} cy={cy} r={r} opacity="0.7" />
            ))}
          </g>
        </svg>
      </div>
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

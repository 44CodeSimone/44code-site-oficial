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
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.85 0.14 200)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.85 0.14 200)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="oklch(0.85 0.14 200)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.7 0.18 240)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.7 0.18 240)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.7 0.18 240)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="particle-glow">
              <stop offset="0%" stopColor="oklch(0.95 0.12 200)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(0.85 0.14 220)" stopOpacity="0" />
            </radialGradient>
            <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* Camadas de ondas digitais — curvas orgânicas, sem grid */}
          <g className="wave-1" filter="url(#soft-blur)">
            <path
              d="M0,520 C240,420 420,640 720,520 C1020,400 1200,640 1440,500 L1440,900 L0,900 Z"
              fill="url(#wave-grad-1)"
              opacity="0.35"
            />
            <path
              d="M0,520 C240,420 420,640 720,520 C1020,400 1200,640 1440,500"
              stroke="oklch(0.85 0.14 210)"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              fill="none"
            />
          </g>

          <g className="wave-2" filter="url(#soft-blur)">
            <path
              d="M0,640 C260,560 460,760 760,640 C1040,540 1240,740 1440,620 L1440,900 L0,900 Z"
              fill="url(#wave-grad-2)"
              opacity="0.30"
            />
            <path
              d="M0,640 C260,560 460,760 760,640 C1040,540 1240,740 1440,620"
              stroke="oklch(0.85 0.14 200)"
              strokeOpacity="0.28"
              strokeWidth="1"
              fill="none"
            />
          </g>

          <g className="wave-3" filter="url(#soft-blur)">
            <path
              d="M0,360 C300,280 500,460 800,360 C1080,260 1260,440 1440,340"
              stroke="oklch(0.78 0.16 230)"
              strokeOpacity="0.25"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0,200 C320,140 520,300 820,210 C1100,130 1280,280 1440,200"
              stroke="oklch(0.85 0.14 210)"
              strokeOpacity="0.18"
              strokeWidth="0.8"
              fill="none"
            />
          </g>

          {/* Conexões finas entre partículas (rede neural / fluxo de dados) */}
          <g
            stroke="oklch(0.85 0.14 210)"
            strokeOpacity="0.22"
            strokeWidth="0.6"
            fill="none"
            strokeDasharray="3 5"
          >
            <line className="connector" x1="180" y1="180" x2="420" y2="260" />
            <line className="connector" x1="420" y1="260" x2="640" y2="160" />
            <line className="connector" x1="640" y1="160" x2="900" y2="280" />
            <line className="connector" x1="900" y1="280" x2="1180" y2="200" />
            <line className="connector" x1="180" y1="180" x2="320" y2="420" />
            <line className="connector" x1="320" y1="420" x2="560" y2="500" />
            <line className="connector" x1="560" y1="500" x2="780" y2="420" />
            <line className="connector" x1="780" y1="420" x2="1040" y2="500" />
            <line className="connector" x1="1040" y1="500" x2="1280" y2="380" />
            <line className="connector" x1="220" y1="700" x2="480" y2="780" />
            <line className="connector" x1="480" y1="780" x2="760" y2="700" />
            <line className="connector" x1="760" y1="700" x2="1020" y2="780" />
            <line className="connector" x1="1020" y1="780" x2="1280" y2="700" />
          </g>

          {/* Partículas luminosas */}
          <g fill="url(#particle-glow)">
            {[
              [180, 180, 6], [420, 260, 5], [640, 160, 7], [900, 280, 5], [1180, 200, 6],
              [320, 420, 5], [560, 500, 7], [780, 420, 5], [1040, 500, 6], [1280, 380, 5],
              [220, 700, 6], [480, 780, 5], [760, 700, 6], [1020, 780, 5], [1280, 700, 6],
            ].map(([cx, cy, r], i) => (
              <circle
                key={i}
                className="particle"
                cx={cx}
                cy={cy}
                r={r}
                style={{ animationDelay: `${(i % 6) * 0.6}s` }}
              />
            ))}
          </g>

          {/* Núcleos sólidos das partículas */}
          <g fill="oklch(0.95 0.08 200)">
            {[
              [180, 180], [420, 260], [640, 160], [900, 280], [1180, 200],
              [320, 420], [560, 500], [780, 420], [1040, 500], [1280, 380],
              [220, 700], [480, 780], [760, 700], [1020, 780], [1280, 700],
            ].map(([cx, cy], i) => (
              <circle key={`c-${i}`} cx={cx} cy={cy} r={1.4} opacity={0.85} />
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

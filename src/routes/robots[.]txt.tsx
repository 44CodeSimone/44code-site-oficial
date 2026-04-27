import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://44code.tech";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
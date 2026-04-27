import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://44code.tech";
const routes = ["", "/portfolio", "/servicos", "/contato"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = routes
          .map(
            (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`,
          )
          .join("\n");

        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
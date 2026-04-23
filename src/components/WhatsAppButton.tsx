import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5549999256721?text=Olá%20Simone!%20Vim%20pelo%20site%20da%2044CODE."
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-elegant hover:scale-105 hover:shadow-glow transition-smooth"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping -z-10" />
      <MessageCircle className="h-6 w-6 fill-white" />
      <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
    </a>
  );
}
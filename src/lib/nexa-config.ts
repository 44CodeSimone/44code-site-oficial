/**
 * Configuração central da API da Nexa.
 *
 * - VITE_NEXA_API_URL: URL completa do endpoint externo da Nexa.
 *   Exemplo: https://SEU-BACKEND-DA-NEXA.replit.app/api/chat
 *
 * Se não estiver definida, o chat usa o endpoint interno em /api/chat
 * (server route do próprio site, com Lovable AI Gateway).
 */
export const NEXA_API_URL: string =
  (import.meta.env.VITE_NEXA_API_URL as string | undefined)?.trim() || "/api/chat";

export const NEXA_LEAD_URL = "/api/send-lead";

export const NEXA_WHATSAPP =
  "https://wa.me/5549999256721?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%2044CODE.";

export const NEXA_EMAIL = "tecnologia.44code@outlook.com";

export const NEXA_ACCEPTED_TYPES =
  ".png,.jpg,.jpeg,.webp,.gif,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.ppt,.pptx";

export const NEXA_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export const NEXA_OFFLINE_MESSAGE =
  "Estou temporariamente indisponível no momento. Se preferir, você pode continuar pelo WhatsApp ou enviar os detalhes do projeto por email.";
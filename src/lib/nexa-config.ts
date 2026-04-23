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

export const NEXA_OFFLINE_MESSAGE =
  "Estou temporariamente indisponível no momento. Se preferir, você pode continuar pelo WhatsApp ou enviar os detalhes do projeto por email.";
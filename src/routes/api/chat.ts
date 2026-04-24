import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Você é a Nexa, assistente virtual oficial da 44CODE — empresa de tecnologia e soluções (Engenharia de Software, Backend, Frontend, Web Design/UX, Arquitetura, DevOps, DevSecOps, Cibersegurança, Automação com IA, Produto e Marketing).

IDENTIDADE:
- Nome: Nexa. Persona feminina, elegante, humanizada, sênior, acolhedora.
- Estilo: profissional, gentil, clara, objetiva, estratégica, refinada, persuasiva de forma ética.
- NUNCA se apresente como humana. Você é uma assistente virtual da 44CODE.
- Você responde com a profundidade de um time multidisciplinar sênior (engenharia, frontend, backend, UX, DevOps, segurança, IA, marketing), mas NUNCA mencione "comitê", "time" ou "equipe interna".

PRINCÍPIO FUNDAMENTAL — NUNCA SUPOR:
- Sempre pergunte antes de concluir.
- Deixe o cliente explicar completamente.
- Valide o entendimento ("Isso faz sentido para você?").
- Construa a solução JUNTO com o cliente. Nunca invente prazos, preços, stacks ou escopo.

FLUXO:
1. ACOLHIMENTO — receba com cordialidade.
2. EXPLORAÇÃO — pergunte sobre objetivo, público, se já tem algo pronto, escopo (site, sistema, automação).
3. ESTRUTURAÇÃO — organize: "Com base no que você descreveu, podemos estruturar assim: [resumo]. Faz sentido?"
4. COLETA — peça nome, telefone e um resumo: "Para avançarmos com uma análise mais precisa, pode me informar seu nome, telefone e um resumo do projeto?"
5. ENCERRAMENTO — confirme os dados; a interface enviará automaticamente para a equipe da 44CODE. Ofereça o WhatsApp como canal direto.

ORIENTAÇÃO DE WHATSAPP (OBRIGATÓRIA quando o cliente quiser falar agora ou ao encerrar):
- Sempre oriente o cliente a clicar no **botão verde "Falar no WhatsApp"** que aparece logo abaixo do chat.
- Como alternativa, ofereça o link direto: https://wa.me/5549999256721
- Use exatamente este formato (adapte o nome quando souber):
  "Perfeito[, NOME]! 😊 Para falar com um de nossos especialistas:\n\n👉 Clique no **botão verde \"Falar no WhatsApp\"** logo abaixo\nou\n👉 Use este link direto: https://wa.me/5549999256721\n\nAssim você é direcionado(a) imediatamente para nosso atendimento."
- NUNCA invente outro número. O único WhatsApp oficial da 44CODE é +55 49 99925-6721 (link: https://wa.me/5549999256721).

BLOQUEIOS — recuse com a frase exata, sem variações:
Conteúdo +18, relacionamentos, romance, flerte, conversas pessoais, política, religião, entretenimento aleatório, ou qualquer assunto fora de tecnologia, projetos ou serviços da 44CODE.
Resposta obrigatória: "Sou a Nexa, assistente virtual da 44CODE. Posso te ajudar apenas com tecnologia, projetos, sistemas, soluções digitais e serviços da 44CODE."

FORMATO:
- Respostas curtas, claras, em português do Brasil.
- Use markdown leve (negrito, listas curtas) quando ajudar.
- Nunca prometa o que não foi definido.

SAÍDA ESTRUTURADA — você DEVE responder SEMPRE em JSON válido com este formato exato:
{
  "reply": "sua resposta ao cliente em texto",
  "intent": "duvida" | "projeto" | "orcamento" | "contato_direto" | "bloqueado",
  "shouldEmail": boolean,
  "shouldWhatsapp": boolean,
  "lead": { "name": string|null, "phone": string|null, "email": string|null, "summary": string|null }
}

Regras do JSON:
- shouldEmail = true APENAS quando o cliente já forneceu nome E telefone (ou pelo menos um meio claro de contato) E há um resumo de projeto. Caso contrário false.
- shouldWhatsapp = true quando o cliente pedir explicitamente para falar com humano/WhatsApp.
- intent = "bloqueado" quando o assunto for proibido.
- Em "lead", preencha apenas os campos que o cliente já informou; use null para o que faltar.
- "reply" é o que aparece no chat — escreva natural, não mostre JSON nem campos.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Throttle simples por IP (em memória do worker — best effort)
const THROTTLE = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function checkThrottle(ip: string): boolean {
  const now = Date.now();
  const rec = THROTTLE.get(ip);
  if (!rec || rec.reset < now) {
    THROTTLE.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_PER_WINDOW) return false;
  rec.count++;
  return true;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("cf-connecting-ip") ||
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";
          if (!checkThrottle(ip)) {
            return Response.json(
              { error: "Muitas mensagens em pouco tempo. Aguarde alguns instantes." },
              { status: 429 },
            );
          }

          const body = await request.json();
          const message: string = body?.message ?? "";
          const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

          if (!message || typeof message !== "string" || message.length > 4000) {
            return Response.json({ error: "Mensagem inválida." }, { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "AI não configurada." }, { status: 500 });
          }

          const cleanHistory = history
            .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
            .slice(-20)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...cleanHistory,
                { role: "user", content: message },
              ],
              response_format: { type: "json_object" },
            }),
          });

          if (!aiResponse.ok) {
            if (aiResponse.status === 429) {
              return Response.json(
                { error: "Muitas mensagens em pouco tempo. Aguarde alguns instantes." },
                { status: 429 },
              );
            }
            if (aiResponse.status === 402) {
              return Response.json(
                { error: "Créditos de IA esgotados. Adicione créditos no workspace." },
                { status: 402 },
              );
            }
            const t = await aiResponse.text();
            console.error("AI gateway error:", aiResponse.status, t);
            return Response.json({ error: "Falha ao consultar a IA." }, { status: 500 });
          }

          const data = await aiResponse.json();
          const raw: string = data?.choices?.[0]?.message?.content ?? "";
          let parsed: {
            reply?: string;
            intent?: string;
            shouldEmail?: boolean;
            shouldWhatsapp?: boolean;
            lead?: { name?: string | null; phone?: string | null; email?: string | null; summary?: string | null };
          } = {};
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = { reply: raw || "Desculpe, não consegui processar agora. Pode reformular?" };
          }

          return Response.json({
            reply: parsed.reply || "Desculpe, não consegui processar agora. Pode reformular?",
            intent: parsed.intent || "duvida",
            shouldEmail: !!parsed.shouldEmail,
            shouldWhatsapp: !!parsed.shouldWhatsapp,
            lead: parsed.lead || {},
          });
        } catch (e) {
          console.error("/api/chat error:", e);
          return Response.json({ error: "Erro interno." }, { status: 500 });
        }
      },
    },
  },
});
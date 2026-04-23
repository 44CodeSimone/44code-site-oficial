import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Você é a Nexa, assistente virtual da 44CODE — empresa de tecnologia e soluções (Engenharia de Software, Backend, Frontend, Web Design/UX, Arquitetura, DevOps, DevSecOps, Cibersegurança, Automação com IA, Produto e Marketing).

IDENTIDADE:
- Nome: Nexa. Persona feminina. Representa a 44CODE.
- Estilo: extremamente profissional, gentil, clara, objetiva, estratégica e persuasiva de forma ética.
- NUNCA se apresente como humana. Você é uma assistente virtual.
- Você atua como um time multidisciplinar sênior, mas NUNCA mencione "comitê", "time" ou "equipe interna" — apenas entregue respostas no nível de quem tem essa visão.

PRINCÍPIO FUNDAMENTAL — NUNCA SUPOR:
- Sempre faça perguntas antes de concluir.
- Deixe o cliente explicar completamente.
- Valide o entendimento ("Isso faz sentido para você?").
- Construa a solução JUNTO com o cliente. Nunca invente informações, prazos, preços ou tecnologias que o cliente não confirmou.

FLUXO DE ATENDIMENTO (siga nesta ordem, sem pular etapas):
1. EXPLORAÇÃO — pergunte: "Pode me explicar o que você deseja construir?", "Qual problema você quer resolver?", "Você já tem algo pronto ou está começando do zero?", "Quem é o público do projeto?". Faça uma pergunta por vez quando fizer sentido.
2. ESTRUTURAÇÃO — quando tiver contexto, organize: "Com base no que você descreveu, podemos estruturar assim: [resumo]. Isso faz sentido para você?".
3. EVOLUÇÃO — ajuste continuamente, sem impor decisões.
4. COLETA DE DADOS (OBRIGATÓRIA antes de encerrar ou direcionar): peça nome, telefone e um resumo do projeto: "Para avançarmos com a análise, pode me informar seu nome, telefone e um resumo do projeto?".

APÓS COLETA:
- Confirme os dados e diga que a equipe da 44CODE entrará em contato.
- Ofereça enviar o resumo por email ou conectar diretamente via WhatsApp.
- Email: tecnologia.44code@outlook.com — WhatsApp: https://wa.me/5549999257621
- A interface do chat já cuida do envio do email e do link do WhatsApp — apenas oriente o cliente a usar os botões que aparecerem.

BLOQUEIOS DE SEGURANÇA (recuse com a frase exata abaixo, sem variações):
Conteúdo +18, relacionamentos, romance, flerte, conversas pessoais, política, religião, ou qualquer assunto fora de tecnologia e soluções digitais.
Resposta padrão obrigatória nestes casos: "Sou a Nexa, assistente virtual da 44CODE. Posso ajudar apenas com tecnologia e soluções digitais."

FORMATO:
- Respostas curtas, claras, em português do Brasil.
- Use markdown leve (negrito, listas curtas) quando ajudar a clareza.
- Nunca faça suposições sobre orçamento, prazo ou stack sem o cliente ter dito.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
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
          const reply: string =
            data?.choices?.[0]?.message?.content ??
            "Desculpe, não consegui processar agora. Pode reformular?";

          return Response.json({ reply });
        } catch (e) {
          console.error("/api/chat error:", e);
          return Response.json({ error: "Erro interno." }, { status: 500 });
        }
      },
    },
  },
});
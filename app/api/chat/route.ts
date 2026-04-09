import OpenAI from "openai";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `
You are a helpful GenLayer AI assistant.
Answer ONLY about GenLayer, GenLayer docs, GenLayer explorer, and official GenLayer ecosystem links.
If the user asks unrelated questions, politely say you only answer GenLayer-related questions.
Official website: https://www.genlayer.com
Docs: https://docs.genlayer.com
Explorer: https://explorer-studio.genlayer.com
Twitter/X: https://x.com/genlayer
Discord: https://discord.gg/genlayerlabs
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { reply: "ERROR: OPENAI_API_KEY not found in Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const userMessage = body.message || "";

    const client = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      temperature: 0.4,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Please check the GenLayer docs: https://docs.genlayer.com";

    return Response.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        reply:
          "API ERROR: Check if your OpenAI API key is valid and has credits."
      },
      { status: 500 }
    );
  }
}

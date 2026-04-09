import OpenAI from "openai";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `
You are a helpful GenLayer AI assistant.

Rules:
1. Answer ONLY questions related to GenLayer.
2. Topics allowed: GenLayer, Intelligent Contracts, GenLayer Studio, GenLayer docs, GenLayer explorer, GenLayer ecosystem, GenLayer testnet, GenLayer community links.
3. If the user asks something unrelated to GenLayer, politely say:
   "I only answer GenLayer-related questions. Please ask me about GenLayer, Intelligent Contracts, GenLayer Studio, or the official docs."
4. Keep answers clear and beginner-friendly.
5. If useful, mention official links:
- Website: https://www.genlayer.com
- Docs: https://docs.genlayer.com
- Explorer: https://explorer-studio.genlayer.com
- X/Twitter: https://x.com/genlayer
- Discord: https://discord.gg/genlayerlabs
6. If you are unsure, say:
   "Please check the official GenLayer docs here: https://docs.genlayer.com"
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          reply:
            "OPENAI_API_KEY is missing. Please add it in your Vercel Environment Variables."
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = body.messages || [];

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.4
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Please check the official GenLayer docs here: https://docs.genlayer.com";

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        reply:
          "Something went wrong with the AI response. Please make sure your OpenAI API key is added correctly in Vercel."
      },
      { status: 500 }
    );
  }
}

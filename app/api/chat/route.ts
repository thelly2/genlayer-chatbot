import OpenAI from "openai";

export const dynamic = "force-dynamic"; // Very important!

const SYSTEM_PROMPT = `
You are a helpful GenLayer AI assistant.
Answer ONLY about GenLayer, its docs, explorer, or ecosystem.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "OPENAI_API_KEY is missing in Vercel. Add it in Environment Variables." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = body.messages || [];

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.4
    });

    const reply = completion.choices?.[0]?.message?.content || "Check GenLayer docs at https://docs.genlayer.com";

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { reply: "Something went wrong. Make sure your OpenAI API key is added in Vercel." },
      { status: 500 }
    );
  }
}

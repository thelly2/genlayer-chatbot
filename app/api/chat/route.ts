export const dynamic = "force-dynamic";

function getGenLayerReply(message: string) {
  const msg = message.toLowerCase();

  if (msg.includes("what is genlayer")) {
    return `GenLayer is a blockchain-focused AI network/project that combines intelligent automation with decentralized infrastructure. You can learn more on the official website: https://www.genlayer.com`;
  }

  if (msg.includes("official website") || msg.includes("website")) {
    return `The official GenLayer website is:\nhttps://www.genlayer.com`;
  }

  if (msg.includes("docs") || msg.includes("documentation")) {
    return `You can read the official GenLayer docs here:\nhttps://docs.genlayer.com`;
  }

  if (msg.includes("explorer")) {
    return `The official GenLayer explorer is:\nhttps://explorer-studio.genlayer.com`;
  }

  if (msg.includes("twitter") || msg.includes("x")) {
    return `GenLayer official Twitter/X:\nhttps://x.com/genlayer`;
  }

  if (msg.includes("discord")) {
    return `GenLayer official Discord:\nhttps://discord.gg/genlayerlabs`;
  }

  if (msg.includes("hello") || msg.includes("hi")) {
    return `Hello 👋 I am your GenLayer assistant.\nAsk me about GenLayer website, docs, explorer, Twitter, or Discord.`;
  }

  if (msg.includes("how to start") || msg.includes("getting started")) {
    return `To get started with GenLayer:\n1. Visit the official website: https://www.genlayer.com\n2. Read the docs: https://docs.genlayer.com\n3. Check the explorer: https://explorer-studio.genlayer.com\n4. Join the Discord community: https://discord.gg/genlayerlabs`;
  }

  return `I currently answer GenLayer-related basics only.\n\nTry asking:\n- What is GenLayer?\n- Where are the GenLayer docs?\n- What is the GenLayer explorer?\n- What is GenLayer Twitter/X?\n- How do I get started with GenLayer?\n\nOfficial links:\nWebsite: https://www.genlayer.com\nDocs: https://docs.genlayer.com\nExplorer: https://explorer-studio.genlayer.com\nTwitter/X: https://x.com/genlayer\nDiscord: https://discord.gg/genlayerlabs`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message || "";

    const reply = getGenLayerReply(message);

    return Response.json({ reply });
  } catch (error) {
    return Response.json(
      { reply: "Something went wrong. Please ask a GenLayer question again." },
      { status: 500 }
    );
  }
}

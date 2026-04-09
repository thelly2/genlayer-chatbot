"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "What is GenLayer?",
  "How does GenLayer work?",
  "What is Intelligent Contracts?",
  "How do I use GenLayer Studio?",
  "What is the GenLayer testnet?",
  "Where can I find GenLayer docs?"
];

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your GenLayer AI assistant. Ask me anything about GenLayer, Intelligent Contracts, the docs, or GenLayer Studio."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: newMessages
        })
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I could not answer that right now."
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. Ask me anything about GenLayer, and I’ll help you."
      }
    ]);
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Could not copy.");
    }
  }

  return (
    <main className="page">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="container">
        <header className="hero">
          <div className="badge">GENLAYER AI CHATBOT</div>
          <h1>Ask about GenLayer</h1>
          <p>
            Your AI guide for GenLayer, Intelligent Contracts, GenLayer Studio,
            docs, and ecosystem resources.
          </p>

          <div className="quick-links">
            <a href="https://www.genlayer.com" target="_blank" rel="noreferrer">
              Website
            </a>
            <a href="https://docs.genlayer.com" target="_blank" rel="noreferrer">
              Docs
            </a>
            <a
              href="https://explorer-studio.genlayer.com"
              target="_blank"
              rel="noreferrer"
            >
              Explorer
            </a>
            <a href="https://x.com/genlayer" target="_blank" rel="noreferrer">
              X / Twitter
            </a>
            <a href="https://discord.gg/genlayerlabs" target="_blank" rel="noreferrer">
              Discord
            </a>
          </div>
        </header>

        <section className="chat-card">
          <div className="suggested-wrap">
            <p className="suggested-title">Suggested questions:</p>
            <div className="suggested-grid">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  className="suggested-btn"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-box">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === "user" ? "user" : "assistant"}`}
              >
                <div className="message-top">
                  <span className="message-role">
                    {message.role === "user" ? "You" : "GenLayer AI"}
                  </span>
                  {message.role === "assistant" && (
                    <button
                      className="copy-btn"
                      onClick={() => copyText(message.content)}
                    >
                      Copy
                    </button>
                  )}
                </div>
                <p>{message.content}</p>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="message-top">
                  <span className="message-role">GenLayer AI</span>
                </div>
                <p className="typing">Typing...</p>
              </div>
            )}
          </div>

          <div className="input-area">
            <textarea
              placeholder="Ask anything about GenLayer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
            />
            <div className="button-row">
              <button className="clear-btn" onClick={clearChat}>
                Clear Chat
              </button>
              <button className="send-btn" onClick={() => sendMessage()}>
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

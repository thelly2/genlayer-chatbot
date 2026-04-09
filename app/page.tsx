"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function HomePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Welcome to the GenLayer Chatbot 👋\nAsk me anything about GenLayer basics."
    }
  ]);

  const suggestions = [
    "What is GenLayer?",
    "Where are the GenLayer docs?",
    "What is the GenLayer explorer?",
    "How do I get started with GenLayer?"
  ];

  async function sendMessage(customText?: string) {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No reply received." }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="chatbox">
        <div className="header">
          <h1>GenLayer Chatbot</h1>
          <p>Ask about GenLayer website, docs, explorer, and community links</p>
        </div>

        <div className="quick-links">
          <a href="https://www.genlayer.com" target="_blank">Website</a>
          <a href="https://docs.genlayer.com" target="_blank">Docs</a>
          <a href="https://explorer-studio.genlayer.com" target="_blank">Explorer</a>
          <a href="https://discord.gg/genlayerlabs" target="_blank">Discord</a>
        </div>

        <div className="suggestions">
          {suggestions.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user" : "bot"}`}
            >
              <strong>{msg.role === "user" ? "You" : "GenLayer Bot"}:</strong>
              <br />
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <strong>GenLayer Bot:</strong>
              <br />
              Typing...
            </div>
          )}
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Ask about GenLayer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
    </main>
  );
}

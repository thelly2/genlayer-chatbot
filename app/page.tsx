"use client";

import { useEffect, useRef, useState } from "react";

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
      text: "Hey 👋 I’m your GenLayer AI Assistant.\nAsk me about GenLayer docs, explorer, website, community, and getting started.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "What is GenLayer?",
    "Where are the docs?",
    "What is the explorer?",
    "How do I get started?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "No reply received.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(0,255,208,0.08), transparent 25%), #0a0f1c",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "950px",
          height: "92vh",
          background: "rgba(15, 23, 42, 0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(2, 6, 23, 0.7)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #00ffd0 0%, #00b8ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#001018",
                fontSize: "18px",
              }}
            >
              G
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "17px" }}>
                GenLayer AI Assistant
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "3px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Online
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.genlayer.com"
              target="_blank"
              style={topLinkStyle}
            >
              Website
            </a>
            <a
              href="https://docs.genlayer.com"
              target="_blank"
              style={topLinkStyle}
            >
              Docs
            </a>
            <a
              href="https://explorer-studio.genlayer.com"
              target="_blank"
              style={topLinkStyle}
            >
              Explorer
            </a>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 18px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
          }}
        >
          {/* Welcome card */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "16px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                marginBottom: "12px",
                lineHeight: 1.6,
              }}
            >
              Ask anything about GenLayer basics. Quick prompts:
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(30, 41, 59, 0.7)",
                    color: "#e2e8f0",
                    borderRadius: "999px",
                    padding: "10px 14px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {messages.map((msg, index) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-end",
                    flexDirection: isUser ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "12px",
                      background: isUser
                        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                        : "linear-gradient(135deg, #00ffd0, #00b8ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "13px",
                      color: isUser ? "white" : "#001018",
                      flexShrink: 0,
                    }}
                  >
                    {isUser ? "You" : "AI"}
                  </div>

                  <div
                    style={{
                      background: isUser
                        ? "linear-gradient(135deg, #1d4ed8, #2563eb)"
                        : "rgba(17, 24, 39, 0.95)",
                      border: isUser
                        ? "none"
                        : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: isUser
                        ? "20px 20px 6px 20px"
                        : "20px 20px 20px 6px",
                      padding: "14px 16px",
                      lineHeight: 1.7,
                      fontSize: "14px",
                      color: "#f8fafc",
                      whiteSpace: "pre-wrap",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #00ffd0, #00b8ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "13px",
                    color: "#001018",
                    flexShrink: 0,
                  }}
                >
                  AI
                </div>

                <div
                  style={{
                    background: "rgba(17, 24, 39, 0.95)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "20px 20px 20px 6px",
                    padding: "14px 16px",
                    fontSize: "14px",
                    color: "#cbd5e1",
                  }}
                >
                  Typing...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(2, 6, 23, 0.85)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Ask GenLayer AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "15px",
                padding: "12px 10px",
              }}
            />

            <button
              onClick={() => sendMessage()}
              style={{
                border: "none",
                background: "linear-gradient(135deg, #00ffd0, #00b8ff)",
                color: "#001018",
                fontWeight: 800,
                borderRadius: "14px",
                padding: "0 20px",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              Send
            </button>
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Free no-API version • GenLayer basics assistant
          </div>
        </div>
      </div>
    </main>
  );
}

const topLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#cbd5e1",
  fontSize: "13px",
  padding: "10px 12px",
  borderRadius: "12px",
  background: "rgba(30, 41, 59, 0.7)",
  border: "1px solid rgba(255,255,255,0.06)",
};

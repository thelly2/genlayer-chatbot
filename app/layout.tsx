import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenLayer AI Chatbot",
  description: "Ask anything about GenLayer"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

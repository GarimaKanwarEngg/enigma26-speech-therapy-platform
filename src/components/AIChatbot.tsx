import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I am your AI assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, no response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg"
        >
          Chat with AI
        </button>
      ) : (
        <div className="w-[320px] rounded-xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <p className="font-semibold">AI Assistant</p>
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
              Close
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] bg-blue-600 text-white"
                    : "mr-auto w-fit max-w-[85%] bg-gray-100 text-gray-900"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-gray-500">AI is typing...</p>}
          </div>

          <div className="flex gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

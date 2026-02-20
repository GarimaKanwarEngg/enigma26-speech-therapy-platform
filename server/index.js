import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: messages.map((m) => ({
        role: m.role,
        content: [{ type: "text", text: m.content }],
      })),
    });

    return res.json({ reply: response.output_text || "No response." });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Failed to get AI response" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Chat API running on http://localhost:${PORT}`);
});

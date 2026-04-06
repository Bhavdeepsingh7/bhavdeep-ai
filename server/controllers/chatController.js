// controllers/chatController.js
import { generateResponse } from "../services/geminiService.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await generateResponse(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
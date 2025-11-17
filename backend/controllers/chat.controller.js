import Message from "../models/Message.model.js";
import Analysis from "../models/Analysis.model.js";
import { runMultimodalAnalysis } from "../services/analysis.service.js";

// @desc    Get chat history
// @route   GET /api/chat/history
export const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({
      createdAt: "asc",
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Analyze uploaded data and user query (Combined function)
// @route   POST /api/chat/analyze
export const analyzeData = async (req, res) => {
  // The user's text query is expected in req.body.query
  const { query } = req.body;
  const file = req.file;
  const userId = req.user.id;

  if (!query && !file) {
    return res.status(400).json({ message: "Must provide a query or a file." });
  }

  try {
    // 1. Save User's request as the initial message
    const userMessageContent = `File uploaded: ${
      file ? file.originalname : "None"
    }. Query: ${query || "Please analyze the data."}`;
    await Message.create({
      user: userId,
      role: "user",
      content: userMessageContent,
    });

    // 2. **Immediately** trigger the complex, asynchronous service
    // We pass the file buffer directly. We do not await this.
    runMultimodalAnalysis(userId, query, file);

    // 3. Send a placeholder response indicating the job started
    const initialResponse =
      "I received your file and query. I'm starting the analysis pipeline now. This may take a minute!";

    const aiMessage = await Message.create({
      user: userId,
      role: "assistant",
      content: initialResponse,
    });

    // 4. Respond to the client immediately (202 Accepted)
    res.status(202).json(aiMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear chat history
// @route   DELETE /api/chat/clear
export const clearChat = async (req, res) => {
  try {
    await Message.deleteMany({ user: req.user.id });

    // Send back a new welcome message
    const welcomeMessage = await Message.create({
      user: req.user.id,
      role: "assistant",
      content:
        "Hello! I'm ProQure, your AI procurement advisor. Chat cleared. How can I help you?",
    });

    res.json(welcomeMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

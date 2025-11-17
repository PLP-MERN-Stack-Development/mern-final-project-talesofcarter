import express from "express";
const chatRoutes = express.Router();
import {
  getChatHistory,
  analyzeData,
  clearChat,
} from "../controllers/chat.controller.js";
import upload from "../middleware/upload.middleware.js";

chatRoutes.get("/history", getChatHistory);
chatRoutes.delete("/clear", clearChat);

chatRoutes.post("/analyze", upload.single("file"), analyzeData);

export default chatRoutes;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authMiddleware from "./middleware/auth.middleware.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import reportRoutes from "./routes/report.routes.js";
import chatRoutes from "./routes/chat.routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// --- Core Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// --- API Routes ---

// Public route for authentication
app.use("/api/auth", authRoutes);

// Protected routes (require a valid JWT)
app.use("/api/files", authMiddleware, fileRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);
app.use("/api/suppliers", authMiddleware, supplierRoutes);
app.use("/api/reports", authMiddleware, reportRoutes);
app.use("/api/chat", authMiddleware, chatRoutes);

// Basic health check route
app.get("/", (req, res) => {
  res.send("ProQure AI Backend is running...");
});

// --- Server Listen ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server connection is succcessfully established.");
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import getLatestDashboard from "../controllers/dashboard.controller.js";

const dashboardRoutes = express.Router();

// Gets the most recent completed analysis for the dashboard
dashboardRoutes.get("/latest", getLatestDashboard);

export default dashboardRoutes;

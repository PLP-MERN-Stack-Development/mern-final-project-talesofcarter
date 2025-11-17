import express from "express";
import {
  getReports,
  getReportById,
  generateNewReport,
} from "../controllers/report.controller.js";

const reportRoutes = express.Router();

reportRoutes.get("/", getReports);
reportRoutes.get("/:id", getReportById);

// Triggers the generation of a new report
reportRoutes.post("/generate", generateNewReport);

export default reportRoutes;

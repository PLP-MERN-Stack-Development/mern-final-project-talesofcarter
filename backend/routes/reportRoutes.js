import express from "express";
import {
  getAllReports,
  getReportById,
  getSuppliers,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const reportRouter = express.Router();

reportRouter.use(protect); // all routes require authentication

reportRouter.get("/", getAllReports); // GET /api/reports
reportRouter.get("/:id", getReportById); // GET /api/reports/:id
reportRouter.get("/suppliers/list", getSuppliers); // GET /api/reports/suppliers/list

export default reportRouter;

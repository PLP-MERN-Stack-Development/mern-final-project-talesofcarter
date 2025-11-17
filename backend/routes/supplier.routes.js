import express from "express";
import {
  getAllSuppliers,
  getSupplierById,
} from "../controllers/supplier.controller.js";

const supplierRoutes = express.Router();

supplierRoutes.get("/", getAllSuppliers);
supplierRoutes.get("/:id", getSupplierById);

export default supplierRoutes;

import express from "express";
import {
  uploadFile,
  getFiles,
  removeFile,
} from "../controllers/file.controller.js";
import upload from "../middleware/upload.middleware.js";

const fileRoutes = express.Router();

// Route to upload a single file. 'file' is the field name from the form.
fileRoutes.post("/upload", upload.single("file"), uploadFile);

fileRoutes.get("/", getFiles);

fileRoutes.delete("/:id", removeFile);

export default fileRoutes;

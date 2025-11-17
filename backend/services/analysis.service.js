import Analysis from "../models/Analysis.model.js";
import Supplier from "../models/Supplier.model.js";
import Message from "../models/Message.model.js";
import { runFullAnalysis } from "./openai.service.js";
import cloudinary from "../config/cloudinary.js";
import csv from "csv-parser";
import xlsx from "xlsx";
import { Readable } from "stream";

/**
 * Uploads a file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer from req.file.buffer.
 * @param {string} userId - The user's ID for folder organization.
 * @param {string} originalName - The original name of the file.
 * @returns {Promise<string>} A promise that resolves with the secure URL of the uploaded file.
 */
const uploadToCloudinary = (fileBuffer, userId, originalName) => {
  return new Promise((resolve, reject) => {
    // Create a unique public_id for the file
    const public_id = `${Date.now()}-${originalName.replace(/\s+/g, "_")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Automatically detect file type
        folder: `proqure/${userId}/uploads`,
        public_id: public_id,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(new Error("Failed to upload file to storage."));
        }
        resolve(result.secure_url);
      }
    );
    // Pipe the buffer into the upload stream
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Parses a file buffer into a JSON array.
 * @param {Buffer} buffer - The file buffer.
 * @param {string} fileType - The mimetype of the file (e.g., 'text/csv').
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of JSON objects.
 */
const parseFile = (buffer, fileType) => {
  if (fileType.includes("csv")) {
    const results = [];
    return new Promise((resolve, reject) => {
      Readable.from(buffer)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  } else if (fileType.includes("sheet") || fileType.includes("excel")) {
    // For Excel files
    return new Promise((resolve) => {
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
      resolve(jsonData);
    });
  } else {
    // For PDF/DOCX, etc., we can't parse structured data,
    // so we return an empty array for the data sample.
    // The AI will rely mostly on the user's query.
    return Promise.resolve([]);
  }
};

/**
 * Updates or inserts (upserts) supplier data into the database.
 * @param {Array<Object>} suppliers - An array of supplier objects from the AI.
 * @param {string} userId - The user's ID.
 */
const upsertSuppliers = async (suppliers, userId) => {
  if (!suppliers || suppliers.length === 0) {
    console.log(`No suppliers to upsert for user ${userId}`);
    return;
  }

  const operations = suppliers.map((supplier) => ({
    updateOne: {
      filter: { user: userId, name: supplier.name }, // Unique key
      update: { $set: { ...supplier, user: userId } },
      upsert: true, // Create the document if it doesn't exist
    },
  }));
  await Supplier.bulkWrite(operations);
  console.log(`Upserted ${suppliers.length} suppliers for user ${userId}`);
};

/**
 * Main function to start the asynchronous analysis pipeline from the chat endpoint.
 * This function is NOT awaited by the controller.
 */
export const runMultimodalAnalysis = async (userId, query, file) => {
  let analysis;
  let fileUrl = null;

  try {
    // 1. Create initial Analysis document (status: 'running')
    analysis = await Analysis.create({
      user: userId,
      status: "running",
      chartsData: {},
      metrics: {},
    });

    // 2. Upload file to Cloudinary (if it exists)
    if (file) {
      fileUrl = await uploadToCloudinary(
        file.buffer,
        userId,
        file.originalname
      );
    }

    // 3. Parse file data (if it exists)
    let jsonData = [];
    if (file) {
      jsonData = await parseFile(file.buffer, file.mimetype);
    }

    // 4. Run AI analysis (THE MAIN CALL)
    // This calls the 'runFullAnalysis' function from openai.service.js
    const analysisResult = await runFullAnalysis(query, jsonData);

    // 5. Save Analysis results
    analysis.status = "completed";
    analysis.metrics = analysisResult.metrics;
    analysis.chartsData = analysisResult.chartsData;
    analysis.rawInsights = analysisResult.rawInsights;
    await analysis.save();

    // 6. Update/Insert Supplier data
    await upsertSuppliers(analysisResult.suppliers, userId);

    // 7. Send final "success" message back to the user via chat
    const successMessage = `Analysis complete! I've processed your request. Based on the data, your spend analyzed is $${
      analysisResult.metrics.spendAnalyzed || 0
    } and I've identified ${
      analysisResult.metrics.riskAlerts || 0
    } high-risk suppliers. Check your Dashboard and Suppliers tabs for the full breakdown.`;

    await Message.create({
      user: userId,
      role: "assistant",
      content: successMessage,
    });

    console.log(`Analysis completed successfully for user: ${userId}`);
  } catch (error) {
    console.error(`Analysis failed for user ${userId}:`, error);

    // Update Analysis status to 'error'
    if (analysis) {
      analysis.status = "error";
      await analysis.save();
    }

    // Send error message to user via chat
    await Message.create({
      user: userId,
      role: "assistant",
      content: `I'm sorry, I encountered a critical error during the analysis: ${error.message}. Please check your file format or try again later.`,
    });
  }
};

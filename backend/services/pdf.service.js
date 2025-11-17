import PDFDocument from "pdfkit";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

/**
 * Creates a PDF report and uploads it to Cloudinary.
 * Returns the secure URL.
 */
export const generatePdfReport = (analysis, summary, userId) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        const pdfStream = Readable.from(pdfBuffer);

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `proqure/${userId}/reports`,
            format: "pdf",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.secure_url);
          }
        );

        pdfStream.pipe(uploadStream);
      } catch (error) {
        reject(error);
      }
    });

    // --- Add content to the PDF ---
    doc.fontSize(20).text("ProQure AI Procurement Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).text("Executive Summary");
    doc.fontSize(12).text(summary);
    doc.moveDown(2);

    doc.fontSize(16).text("Key Metrics");
    doc.fontSize(12).text(`CO₂ Reduction: ${analysis.metrics.co2Reduction}%`);
    doc
      .fontSize(12)
      .text(
        `Spend Analyzed: $${analysis.metrics.spendAnalyzed.toLocaleString()}`
      );
    doc.fontSize(12).text(`Risk Alerts: ${analysis.metrics.riskAlerts}`);
    doc.moveDown(2);

    doc.fontSize(16).text("AI Insights");
    analysis.rawInsights.slice(0, 5).forEach((insight) => {
      doc.fontSize(12).text(`- ${insight.title} (${insight.priority})`);
    });

    doc.end();
  });
};

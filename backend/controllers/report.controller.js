import Report from "../models/Report.model.js";
import { generatePdfReport } from "../services/pdf.service.js";
import { generateReportSummary } from "../services/openai.service.js";
import Analysis from "../models/Analysis.model.js";

// @desc    Get all reports for the user
// @route   GET /api/reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single report by ID
// @route   GET /api/reports/:id
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Trigger generation of a new report
// @route   POST /api/reports/generate
export const generateNewReport = async (req, res) => {
  const { title, type } = req.body;

  try {
    // 1. Create a placeholder report
    const newReport = await Report.create({
      user: req.user.id,
      title: title || "New AI Report",
      type: type || "Monthly Summary",
      status: "processing",
    });

    // 2. Asynchronously run the generation logic
    (async () => {
      try {
        // 3. Get latest analysis data
        const analysis = await Analysis.findOne({
          user: req.user.id,
          status: "completed",
        }).sort({ createdAt: -1 });

        if (!analysis) {
          throw new Error("No analysis data to generate report from.");
        }

        // 4. Generate AI summary
        const summary = await generateReportSummary(analysis);

        // 5. Generate PDF
        const pdfUrl = await generatePdfReport(analysis, summary, req.user.id);

        // 6. Update report with final data
        newReport.summary = summary;
        newReport.pdfUrl = pdfUrl;
        newReport.status = "completed";
        newReport.tags = ["AI Generated", analysis.file.originalName];
        await newReport.save();
      } catch (genError) {
        console.error("Report generation failed:", genError);
        newReport.status = "error";
        await newReport.save();
      }
    })();

    // 7. Respond immediately to the user
    res
      .status(202)
      .json({ message: "Report generation started.", report: newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

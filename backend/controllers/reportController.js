import Report from "../models/Report.js";

// Get all reports for the logged-in user
export const getAllReports = async (req, res) => {
  try {
    const userId = req.user;
    const reports = await Report.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    // Ensure the user owns the report
    if (report.userId.toString() !== req.user) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get unique suppliers for a user
export const getSuppliers = async (req, res) => {
  try {
    const userId = req.user;
    const suppliers = await Report.find({ userId }).distinct("supplierName");
    res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

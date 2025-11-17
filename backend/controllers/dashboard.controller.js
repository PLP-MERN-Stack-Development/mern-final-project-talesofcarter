import Analysis from "../models/Analysis.model.js";

// @desc    Get the latest completed dashboard data
// @route   GET /api/dashboard/latest
const getLatestDashboard = async (req, res) => {
  try {
    const latestAnalysis = await Analysis.findOne({
      user: req.user.id,
      status: "completed",
    }).sort({ createdAt: -1 });

    if (!latestAnalysis) {
      return res
        .status(404)
        .json({ success: false, message: "No completed analysis found." });
    }

    res.json(latestAnalysis);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getLatestDashboard;

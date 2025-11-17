import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // This field stores the URL to the file in Cloudinary.
    // It's optional because a user might just ask a question.
    fileUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["running", "completed", "error"],
      default: "running",
    },
    // Metrics to power the Dashboard
    metrics: {
      co2Reduction: Number,
      sustainableSuppliers: Number,
      spendAnalyzed: Number,
      aiInsights: Number,
      riskAlerts: Number,
      greenAlternatives: Number,
    },
    // Data for charts
    chartsData: {
      co2Trend: [Object], // [{ month: 'Jan', emissions: 2800, target: 2500 }]
      spendDistribution: [Object], // [{ category: 'Raw Materials', amount: 285000 }]
      esgData: [Object], // [{ category: 'Environmental', score: 85 }]
      diversityData: [Object], // [{ name: 'Women-owned', value: 30 }]
      riskData: [Object], // [{ category: 'Supply Chain', high: 3, ... }]
    },
    // Raw recommendations from AI
    rawInsights: [
      {
        title: String,
        description: String,
        priority: String, // 'High', 'Medium', 'Low'
      },
    ],
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;

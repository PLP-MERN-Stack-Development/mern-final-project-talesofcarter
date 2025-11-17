import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., 'CO₂ Impact', 'Spend Analysis'
    },
    summary: {
      type: String, // AI-generated summary
    },
    tags: [String],
    status: {
      type: String,
      enum: ["completed", "processing", "draft"],
      default: "processing",
    },
    pdfUrl: String, // URL from Cloudinary
    csvUrl: String, // URL from Cloudinary
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;

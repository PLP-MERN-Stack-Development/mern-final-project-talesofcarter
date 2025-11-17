import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: String,
    esgScore: String, // 'A+', 'B', 'C'
    co2Impact: Number, // in kg
    risk: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    sustainability: Number, // Percentage
    spend: Number, // Total spend
    aiNote: String,
    insights: [String],
    region: String,
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a user doesn't have duplicate suppliers
supplierSchema.index({ user: 1, name: 1 }, { unique: true });

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;

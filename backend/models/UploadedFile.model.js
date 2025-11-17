import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    storageUrl: {
      type: String, // URL from Cloudinary
      required: true,
    },
    fileType: {
      type: String, // e.g., 'csv', 'xlsx', 'pdf'
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "error"],
      default: "pending",
    },
    columnMappings: {
      type: Object, // { "User Header": "our_db_field_name" }
    },
    analysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
    },
  },
  { timestamps: true }
);

const UploadedFile = mongoose.model("UploadedFile", uploadedFileSchema);
export default UploadedFile;

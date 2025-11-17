import cloudinary from "../config/cloudinary.js";
import UploadedFile from "../models/UploadedFile.model.js";

// @desc    Upload a file
// @route   POST /api/files/upload
export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Upload file buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: `proqure/${req.user.id}/uploads`,
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ message: "Error uploading to storage" });
        }

        // Create file entry in database
        const newFile = await UploadedFile.create({
          user: req.user.id,
          originalName: req.file.originalname,
          storageUrl: result.secure_url,
          fileType: req.file.mimetype,
          status: "pending",
        });

        // ** ASYNCHRONOUSLY trigger the analysis pipeline **
        // We don't await this, so the API can respond immediately.

        // Respond to the user immediately
        res.status(202).json({
          success: true,
          message: "File uploaded and analysis started.",
          file: newFile,
        });
      }
    );

    // Pipe the file buffer to the upload stream
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all uploaded files for a user
// @route   GET /api/files
export const getFiles = async (req, res) => {
  try {
    const files = await UploadedFile.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove an uploaded file
// @route   DELETE /api/files/:id
export const removeFile = async (req, res) => {
  try {
    const file = await UploadedFile.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // TODO: Add logic to delete from Cloudinary

    await file.remove();
    res.json({ message: "File removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

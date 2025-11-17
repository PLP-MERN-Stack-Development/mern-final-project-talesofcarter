import multer from "multer";

// Store files in memory as buffers
const storage = multer.memoryStorage();

// File filter to allow only specific types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only CSV, Excel, PDF, or DOCX are allowed."
      ),
      false
    );
  }
};

// 10MB file size limit
const fileSizeLimit = 10 * 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: fileSizeLimit },
});

export default upload;

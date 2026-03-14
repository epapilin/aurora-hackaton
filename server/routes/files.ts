import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export const filesRouter = Router();

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure database.json exists
const DB_FILE = path.join(process.cwd(), "database.json");
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Create a unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data: any) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- Routes ---

// 1. Upload a file
filesRouter.post("/upload", upload.single("file"), (req, res) => {
  console.log("Upload route hit!", req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const newFileRecord = {
      id: Date.now().toString(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
    };

    // Save to database.json
    const db = readDB();
    db.push(newFileRecord);
    writeDB(db);

    res.json({ success: true, file: newFileRecord });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get all uploaded files
filesRouter.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, files: db });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware for multer
filesRouter.use((err: any, req: any, res: any, next: any) => {
  console.error("Files router error caught:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, error: err.message });
  }
  res.status(500).json({ success: false, error: err.message || "Internal server error" });
});

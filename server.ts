import express from "express";
import { createServer as createViteServer } from "vite";
import { mcpRouter } from "./server/routes/mcp.ts";
import { filesRouter } from "./server/routes/files.ts";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve uploaded files statically
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/config", (req, res) => {
    console.log("GEMINI_API_KEY in /api/config:", process.env.GEMINI_API_KEY);
    console.log("API_KEY in /api/config:", process.env.API_KEY);
    res.json({ apiKey: process.env.GEMINI_API_KEY || '' });
  });

  app.get("/api/env", (req, res) => {
    res.json({ env: process.env });
  });

  // MCP Routes
  app.use("/api/mcp", mcpRouter);

  // File Upload Routes
  app.use("/api/files", filesRouter);

  // Catch-all for /api to prevent Vite from serving index.html for missing API routes
  app.use("/api", (req, res) => {
    res.status(404).json({ error: "API route not found", path: req.path, method: req.method });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
      const apiKey = process.env.GEMINI_API_KEY || '';
      const safeApiKey = apiKey.replace(/"/g, '\\"').replace(/\n/g, '\\n').trim();
      const scriptTag = `<script>window.__GEMINI_API_KEY__ = "${safeApiKey}";</script>`;
      html = html.replace('</head>', `${scriptTag}</head>`);
      res.send(html);
    });
  }

  // Global error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Global error caught:", err);
    res.status(500).json({ success: false, error: err.message || "Internal server error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("EXPRESS SERVER IS ALIVE AND LISTENING!");
  });
}

startServer();

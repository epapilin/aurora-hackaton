import { Router } from "express";
import { mcpService } from "../services/mcpService.ts";

export const mcpRouter = Router();

// Initialize connection (can be called on startup or lazily)
mcpRouter.post("/connect", async (req, res) => {
  try {
    await mcpService.connect();
    res.json({ success: true, message: "MCP connection initialized" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get available tools from the MCP server
mcpRouter.get("/tools", async (req, res) => {
  try {
    const tools = await mcpService.getTools();
    res.json({ success: true, tools });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Call a specific tool on the MCP server
mcpRouter.post("/tool", async (req, res) => {
  try {
    const { toolName, args } = req.body;
    const result = await mcpService.callTool(toolName, args);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

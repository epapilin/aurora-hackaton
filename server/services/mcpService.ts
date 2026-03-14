import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
// import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

class MCPService {
  private client: Client | null = null;
  private isConnected = false;

  async connect() {
    if (this.isConnected) return;

    const mcpUrl = process.env.MCP_SERVER_URL;
    if (!mcpUrl) {
      console.log("MCP_SERVER_URL is not defined. Skipping MCP connection.");
      return;
    }

    try {
      // Defaulting to SSE Transport for remote MCP servers
      const transport = new SSEClientTransport(new URL(mcpUrl));
      
      // Note: For local CLI tools, you would use StdioClientTransport instead:
      // const transport = new StdioClientTransport({ command: "npx", args: ["-y", "@modelcontextprotocol/server-everything"] });

      this.client = new Client(
        { name: "aurora-voice-backend", version: "1.0.0" },
        { capabilities: {} }
      );

      await this.client.connect(transport);
      this.isConnected = true;
      console.log("Successfully connected to MCP Server at", mcpUrl);
    } catch (error) {
      console.error("Failed to connect to MCP Server:", error);
      throw error;
    }
  }

  async callTool(name: string, args: any) {
    if (!this.client || !this.isConnected) {
      throw new Error("MCP Client is not connected. Please check MCP_SERVER_URL.");
    }
    return await this.client.callTool({ name, arguments: args });
  }
  
  async getTools() {
    if (!this.client || !this.isConnected) {
      throw new Error("MCP Client is not connected. Please check MCP_SERVER_URL.");
    }
    return await this.client.listTools();
  }
}

export const mcpService = new MCPService();

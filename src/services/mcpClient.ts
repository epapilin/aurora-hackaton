/**
 * Frontend utility to interact with the backend MCP routes.
 * Use this in your React components to call MCP tools.
 */
export const mcpClient = {
  /**
   * Initializes the connection to the MCP server
   */
  connect: async () => {
    const res = await fetch('/api/mcp/connect', { method: 'POST' });
    return res.json();
  },

  /**
   * Lists all available tools from the connected MCP server
   */
  getTools: async () => {
    const res = await fetch('/api/mcp/tools');
    return res.json();
  },

  /**
   * Calls a specific tool on the MCP server
   * @param toolName The name of the tool to call
   * @param args The arguments to pass to the tool
   */
  callTool: async (toolName: string, args: any) => {
    const res = await fetch('/api/mcp/tool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolName, args })
    });
    return res.json();
  }
};

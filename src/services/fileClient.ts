/**
 * Frontend utility to interact with the backend file upload routes.
 */
export const fileClient = {
  /**
   * Uploads a file to the server
   */
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error("Failed to upload file");
    }
    
    return res.json();
  },

  /**
   * Gets the list of all uploaded files
   */
  getFiles: async () => {
    const res = await fetch("/api/files");
    if (!res.ok) {
      throw new Error("Failed to fetch files");
    }
    return res.json();
  },
};

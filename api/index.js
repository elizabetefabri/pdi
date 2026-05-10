/**
 * Vercel API Route Entry Point for Angular SSR
 * This is an ESM module that wraps the Angular server handler
 */

export default async (req, res) => {
  try {
    // Import the compiled server module at runtime
    const { reqHandler } = await import("../dist/pdi/server/server.mjs");

    if (!reqHandler) {
      throw new Error("reqHandler not exported from dist/pdi/server/server.mjs");
    }

    // Call the handler
    return await reqHandler(req, res);
  } catch (error) {
    console.error("[SSR Error]", error);

    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || String(error)
    });
  }
};

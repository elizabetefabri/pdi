/**
 * Vercel Serverless Function Handler
 * Written in pure JavaScript (not TypeScript) to avoid type checking issues
 * with dynamically imported compiled modules
 */

export default async (req, res) => {
  try {
    // Import the compiled Angular SSR server at runtime
    // By using dynamic import, we avoid TypeScript trying to resolve the module at compile time
    const { reqHandler } = await import("../dist/pdi/server/server.mjs");

    if (!reqHandler || typeof reqHandler !== "function") {
      throw new Error(
        "reqHandler not found in server.mjs. " +
        "Check that 'npm run build' completed successfully."
      );
    }

    return reqHandler(req, res);
  } catch (error) {
    console.error("[SSR Error]", error);

    // Return error response
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error),
      // Only show stack in development
      ...(process.env.NODE_ENV === "development" && {
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
  }
};

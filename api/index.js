module.exports = async (req, res) => {
  try {
    const { reqHandler } = await import("../dist/pdi/server/server.mjs");

    if (!reqHandler) {
      throw new Error("reqHandler not exported from dist/pdi/server/server.mjs");
    }

    return await reqHandler(req, res);
  } catch (error) {
    console.error("[SSR Error]", error);

    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || String(error)
    });
  }
};

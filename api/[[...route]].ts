import { VercelRequest, VercelResponse } from "@vercel/node";
import { reqHandler } from "../dist/pdi/server/main.server.mjs";

/**
 * Vercel serverless function handler
 * Intercepts all requests and routes them through the Angular SSR handler
 */
export default async (req: VercelRequest, res: VercelResponse) => {
  return reqHandler(req, res);
};

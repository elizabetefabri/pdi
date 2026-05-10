import { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel serverless function handler
 * Intercepts all requests and routes them through the Angular SSR handler
 */
export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  // @ts-ignore - compiled .mjs file from Angular SSR doesn't have TypeScript declarations
  const { reqHandler } = await import("../dist/pdi/server/server.mjs");
  return reqHandler(req, res);
};

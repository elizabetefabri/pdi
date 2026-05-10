import { VercelRequest, VercelResponse } from "@vercel/node";
import { getReqHandler } from "./ssr-handler";

/**
 * Vercel serverless function handler
 * Intercepts all requests and routes them through the Angular SSR handler
 */
export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const reqHandler = await getReqHandler();
  return reqHandler(req, res);
};

/**
 * SSR Request Handler Wrapper
 * Re-exports the compiled Angular SSR handler for Vercel serverless functions
 */

// Dynamic import with type safety
let reqHandlerInstance: any = null;

export async function getReqHandler() {
  if (!reqHandlerInstance) {
    // Import at runtime - suppress TypeScript error for compiled .mjs
    const module = await import("../dist/pdi/server/server.mjs") as any;
    reqHandlerInstance = module.reqHandler;
  }
  return reqHandlerInstance;
}

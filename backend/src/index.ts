/**
 * backend/src/index.ts
 *
 * Express.js entry point for the Vnertia backend.
 *
 * Endpoints scaffolded:
 *   GET  /api/health   — health check, confirms server is running
 *   POST /api/contact  — handles contact form submissions from Next.js frontend
 *
 * Environment variables (create a .env file in the backend/ directory):
 *   PORT     — port to listen on (default: 4000)
 *   NODE_ENV — "development" | "production"
 *
 * To start the development server:
 *   cd backend
 *   npm install
 *   npm run dev
 *
 * The Next.js frontend will proxy API requests to http://localhost:4000
 * when NEXT_PUBLIC_API_URL is set to "http://localhost:4000" in frontend/.env.local
 */

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middleware/cors";
import contactRouter from "./routes/contact";

// Load environment variables from .env file
dotenv.config();

const app  = express();
const PORT = process.env.PORT ?? 4000;

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------

// CORS — allow Next.js frontend to make requests
app.use(corsMiddleware);

// Parse JSON request bodies (needed for the contact form POST)
app.use(express.json());

// Parse URL-encoded bodies (for standard HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// Request logger — logs every incoming request in development
if (process.env.NODE_ENV !== "production") {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health check — useful for monitoring and deployment verification
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status:    "ok",
    service:   "Vnertia API",
    timestamp: new Date().toISOString(),
    version:   "1.0.0",
  });
});

// Contact form submissions — POST /api/contact
app.use("/api/contact", contactRouter);

// ---------------------------------------------------------------------------
// 404 handler — catches any unmatched routes
// ---------------------------------------------------------------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error:   "Not Found",
    message: "The requested endpoint does not exist.",
  });
});

// ---------------------------------------------------------------------------
// Global error handler — catches any unhandled errors in route handlers
// ---------------------------------------------------------------------------
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Error]", err.message);
  res.status(500).json({
    error:   "Internal Server Error",
    message: process.env.NODE_ENV === "production"
      ? "Something went wrong. Please try again later."
      : err.message,
  });
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🚀 Vnertia API running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment : ${process.env.NODE_ENV ?? "development"}\n`);
});

export default app;

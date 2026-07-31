/**
 * backend/src/middleware/cors.ts
 *
 * CORS middleware configuration for the Vnertia Express backend.
 *
 * Allows requests from the Next.js frontend running on localhost:3000
 * during development, and from the production domain when deployed.
 *
 * Add your production domain to the ALLOWED_ORIGINS array when deploying.
 */

import cors from "cors";

// Origins that are allowed to make requests to this API.
// Expand this list when you deploy to staging/production.
const ALLOWED_ORIGINS = [
  "http://localhost:3000",   // Next.js dev server
  "http://localhost:3001",   // Next.js alternate dev port
  "https://vnertia.com",     // Production domain
  "https://www.vnertia.com", // WWW variant
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl, Postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
    }
  },
  methods:     ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

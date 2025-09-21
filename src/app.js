/**
 * Express application configuration - This is my main app setup
 * I keep this separate from server.js to make testing easier
 * and to follow separation of concerns principle
 */

import express from "express";
import { STATUS } from "./constants/statusCodes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sendResponse } from "./utils/sendResponse.js";

// Create Express application instance
export const app = express();

// Middleware setup - Order matters here!
// Parse JSON bodies - I need this for POST/PUT requests
app.use(express.json());

// TODO: Add more middleware here as the app grows
// - CORS for cross-origin requests
// - Rate limiting to prevent abuse
// - Request logging for debugging
// - Authentication middleware

/**
 * Health check endpoint - Simple way to verify the server is running
 * I include the client's IP for debugging network issues
 * This endpoint should always return 200 if the server is healthy
 */
app.get("/", (req, res) => {
  sendResponse(res, STATUS.OK, "Backend Working", {
    data: "hello",
    yourIp: `${req.ip}`,
    timestamp: new Date().toISOString(),
  });
  // throw new AppError('User not found', STATUS.NOT_FOUND); // For testing error handling
});

// TODO: Add route imports here
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);

// Global error handler - MUST be last middleware!
// This catches any errors thrown in the application
app.use(errorHandler);

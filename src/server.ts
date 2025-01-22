import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { loadRoutes } from "./utils/route-loader";
import { errorHandler } from "./middlewares/error-handler/error-handler.middleware";

// Function to start the server
export const startServer = async (): Promise<void> => {
  // Load environment variables
  dotenv.config();

  // Create the Express app
  const app = express();

  // Middleware
  app.use(express.json()); // Parse incoming JSON requests
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  app.use(helmet()); // Add security headers to the response
  app.use(cors()); // Enable Cross-Origin Resource Sharing

  // Use the loadVersionedRoutes function to register versioned routes
  try {
    // Attempt to load routes
    await loadRoutes(app);
    console.log("Routes has been registered successfully.");
  } catch (error: any) {
    console.error(error.message);
    return;
  }

  // Global error handler
  app.use(errorHandler);

  // Start the server
  const SERVER_PORT = process.env.SERVER_PORT || 4000;
  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${SERVER_PORT}`);
  });
};
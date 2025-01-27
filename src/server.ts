import express from "express";
import cors from "cors";
import helmet from "helmet";
import { loadRoutes } from "./core/utils/route-loader";
import { errorHandler } from "./core/middleware/errorHandler";
import { config } from "./config/config";
import { resInterceptor } from "./core/middleware/responseHandler";
import { connectToDatabase } from "./core/database/connectDatabase";

// Function to start the server
export const startServer = async (): Promise<void> => {  

  // Create the Express app
  const app = express();

  // Middleware
  app.use(express.json()); // Parse incoming JSON requests
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  app.use(helmet()); // Add security headers to the response
  app.use(cors()); // Enable Cross-Origin Resource Sharing
  app.use(resInterceptor);

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

  await connectToDatabase(); 

  // Start the server
  const SERVER_PORT = config.app.port;
  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${SERVER_PORT}`);
  });
};

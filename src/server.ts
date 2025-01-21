import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Function to start the server
export const startServer = (): void => {
  
// Load environment variables
  dotenv.config();

  // Create the Express app
  const app = express();

  // Middleware
  app.use(express.json()); // Parse incoming JSON requests
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  app.use(helmet()); // Add security headers to the response
  app.use(cors()); // Enable Cross-Origin Resource Sharing

  // Start the server
  const SERVER_PORT = process.env.SERVER_PORT || 4000;
  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${SERVER_PORT}`);
  });
};
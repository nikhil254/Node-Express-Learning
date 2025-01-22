import fs from "fs";
import path from "path";
import { Express } from "express";

export const loadRoutes = async (app: Express): Promise<void> => {
  const servicesDir = path.join(__dirname, "..", "services");

  try {
    // Check if the services directory exists
    if (!fs.existsSync(servicesDir)) {
      throw new Error(
        "Unable to load the routes because services directory does not exist."
      );
    }

    const serviceDirs = fs.readdirSync(servicesDir);

    // Loop through each service directory (e.g., users, orders) and register routes
    for (const serviceDir of serviceDirs) {
      const routePath = path.join(
        servicesDir,
        serviceDir,
        `${serviceDir}.routes.ts`
      );

      // Check if the route file exists
      if (fs.existsSync(routePath)) {
        try {
          // Dynamically import the route module
          const routeModule = await import(routePath);
          app.use(`/api/`, routeModule.default);
        } catch (error) {
          throw new Error(`Failed to load routes for ${serviceDir}`);
        }
      } else {
        throw new Error(
          `Route file for ${serviceDir} does not exist: ${routePath}`
        );
      }
    }
  } catch (error) {
    throw error;
  }
};
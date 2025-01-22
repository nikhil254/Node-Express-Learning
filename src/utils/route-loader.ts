import fs from "fs";
import path from "path";
import { Express } from "express";

export const loadRoutes = async (app: Express): Promise<void> => {
  const servicesDir = path.join(__dirname, "..", "services");

  if (!fs.existsSync(servicesDir)) {
    console.warn('Services directory does not exist!');
    return;
  }

  const serviceDirs = fs.readdirSync(servicesDir);
  
  for (const serviceDir of serviceDirs) {
    const routePath = path.join(servicesDir, serviceDir, `${serviceDir}.routes.ts`);

    if (fs.existsSync(routePath)) {
      try {
        const routeModule = await import(routePath);        
        app.use(`/api`, routeModule.default);
      } catch (error) {
        console.error(`Failed to load routes for ${serviceDir}:`, error);
      }
    } else {
      console.warn(`No route file found for service ${serviceDir}`);
    }
  }
};
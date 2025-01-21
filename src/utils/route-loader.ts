import fs from 'fs';
import path from 'path';
import { Express } from 'express';

export const loadRoutes = async (app: Express): Promise<void> => {
    const servicesDir = path.join(__dirname, '..', 'services');

    try {
        // Check if the services directory exists
        if (!fs.existsSync(servicesDir)) {
            throw new Error('Unable to load the routes because services directory does not exist.');
        }

        const serviceDirs = fs.readdirSync(servicesDir);

        // Loop through each service directory (e.g., users, orders) and register routes
        for (const serviceDir of serviceDirs) {
            const routePath = path.join(servicesDir, serviceDir, `${serviceDir}.route.ts`);

            // Check if the route file exists
            if (fs.existsSync(routePath)) {
                try {
                    // Dynamically import the route module
                    const routeModule = await import(routePath);
                    app.use(`/api/${serviceDir}`, routeModule.default);
                    console.log(`Routes for ${serviceDir} are loaded.`);
                } catch (error) {
                    console.error(`Failed to import routes for ${serviceDir}:`, error);
                    throw new Error(`Failed to load routes for ${serviceDir}`); // Re-throw the error
                }
            } else {
                console.warn(`Route file for ${serviceDir} does not exist: ${routePath}`);
            }
        }
    } catch (error) {
        throw error;
    }
};
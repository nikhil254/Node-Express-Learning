import fs from 'fs/promises';
import path from 'path';
import { Express } from 'express';
import { AppError } from './AppError';
import { EErrorTypes } from '../enum/errorTypes.enum';

const registerRoute = async (app: Express, routePath: string, apiPath: string) => {
  try {
    const routeModule = await import(routePath);
    app.use(apiPath, routeModule.default);
    const routeName = routePath.split('\\services')[1]?.split('\\')[1];        
    console.log(`Routes for ${apiPath}${routeName} registered.`);
  } catch (error) {
    // Instead of a generic error, throw an AppError
    if (error instanceof Error) {
      throw new AppError(EErrorTypes.INTERNAL_SERVER_ERROR, `Failed to load routes for ${apiPath}: Unknown error`, error);
    } else {
      throw new AppError(EErrorTypes.INTERNAL_SERVER_ERROR, `Failed to load routes for ${apiPath}: Unknown error`, error);
    }
  }
};

export const loadRoutes = async (app: Express): Promise<void> => {
  const servicesDir = path.join(__dirname, '..', '..', 'services');  

  try {
    const serviceDirs = await fs.readdir(servicesDir);
    
    // Loop through each service directory
    for (const serviceDir of serviceDirs) {
      const servicePath = path.join(servicesDir, serviceDir);

      // Check if it's a directory
      const stat = await fs.stat(servicePath);
      if (!stat.isDirectory()) continue;

      const versionDirs = await fs.readdir(servicePath);
      const versionedRoutes = versionDirs.some((versionDir) =>
        versionDir.startsWith('v')
      );

      if (versionedRoutes) {
        // Register versioned routes
        for (const versionDir of versionDirs) {
          const versionPath = path.join(servicePath, versionDir);
          const routePath = path.join(versionPath, `${serviceDir}.routes.ts`);

          if (await fs.access(routePath).then(() => true).catch(() => false)) {
            const apiPath = `/api/${versionDir}/`;
            await registerRoute(app, routePath, apiPath);
          }
        }
      } else {
        // Register non-versioned routes
        const routePath = path.join(servicePath, `${serviceDir}.routes.ts`);
        if (await fs.access(routePath).then(() => true).catch(() => false)) {
          const apiPath = `/api/`;
          await registerRoute(app, routePath, apiPath);
        }
      }
    }
  } catch (error) {
    // Handle the error using AppError
    if (error instanceof Error) {
      throw new AppError(EErrorTypes.INTERNAL_SERVER_ERROR, `Error loading routes: ${error.message}`, error);
    } else {
      throw new AppError(EErrorTypes.INTERNAL_SERVER_ERROR, `Error loading routes`, error);
    }
  }
};

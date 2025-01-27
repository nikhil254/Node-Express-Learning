import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Initialize the commander program
const program = new Command();

// Load environment variables from the .env file
dotenv.config();

// Get the version from the environment variable (fallback to 'v1' if not defined)
const serviceVersion = process.env.SERVICE_VERSION || 'v1';

// Function to generate the module
function generateModule(name: string): void {
  const rootPath = process.cwd();  // Get the current working directory, which should be the project root
  const srcPath = path.join(rootPath, 'src');  // Path to the existing src folder
  const servicesPath = path.join(srcPath, 'services');
  const servicePath = path.join(servicesPath, name);
  
  // Create the service directory if it doesn't exist
  if (!fs.existsSync(servicePath)) {
    console.log(`'${name}' service does not exist. Creating service directory.`);
    fs.ensureDirSync(servicePath);
  }

  // Define the version folder path inside the service directory
  const versionPath = path.join(servicePath, serviceVersion);
  
  // Check if the version folder exists, and create it if not
  if (!fs.existsSync(versionPath)) {
    console.log(`Version folder '${serviceVersion}' does not exist. Creating version folder.`);
    fs.ensureDirSync(versionPath);
  }

  // Define file paths for controller, route, and service inside the version folder
  const routePath = path.join(versionPath, `${name}.routes.ts`);
  const controllerPath = path.join(versionPath, `${name}.controller.ts`);
  const servicePathFile = path.join(versionPath, `${name}.services.ts`);
  const repositoryPath = path.join(versionPath, `${name}.repository.ts`);
  const modelPath = path.join(versionPath, `${name}.model.ts`);
  const constantsPath = path.join(versionPath, `${name}.constants.ts`);
  const typePath = path.join(versionPath, `${name}.types.ts`);
  const validatorPath = path.join(versionPath, `${name}.validator.ts`);
  const errorPath = path.join(versionPath, `${name}.error.ts`);

  // Create empty files inside the version folder
  fs.writeFileSync(controllerPath, '');
  fs.writeFileSync(routePath, '');
  fs.writeFileSync(servicePathFile, '');
  fs.writeFileSync(repositoryPath, '');
  fs.writeFileSync(modelPath, '');
  fs.writeFileSync(constantsPath, '');
  fs.writeFileSync(typePath, '');
  fs.writeFileSync(validatorPath, '');
  fs.writeFileSync(errorPath, '');

  console.log(`Module "${name}" generated successfully under version "${serviceVersion}" with empty files!`);
}

// Define CLI command for generating modules with version from .env
program
  .command('generate <name>')
  .description('Generate a new module (controller, route, service) with empty files under a specified version')
  .action((name: string) => {
    generateModule(name);
  });

// Parse command-line arguments
program.parse(process.argv);

import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';

// Initialize the commander program
const program = new Command();

// Function to generate the module
function generateModule(name: string): void {
  const rootPath = process.cwd();  // Get the current working directory, which should be the project root
  const srcPath = path.join(rootPath, 'src');  // Path to the existing src folder
  const servicesPath = path.join(srcPath, 'services');
  const modulePath = path.join(servicesPath, name);

  // Check if the 'services' directory exists
  if (!fs.existsSync(servicesPath)) {
    console.log(`'services' directory does not exist. Creating 'services' directory.`);
    fs.ensureDirSync(servicesPath);
  }

  // If the module (service) already exists
  if (fs.existsSync(modulePath)) {
    console.log(`Service module "${name}" already exists!`);
    return;
  }

  // Create the module directory
  fs.ensureDirSync(modulePath);

  // Define file paths for controller, route, and service
  const routePath = path.join(modulePath, `${name}.routes.ts`);
  const controllerPath = path.join(modulePath, `${name}.controller.ts`);
  const servicePath = path.join(modulePath, `${name}.services.ts`);
  const repositoryPath = path.join(modulePath, `${name}.repository.ts`);
  const modelPath = path.join(modulePath, `${name}.model.ts`);
  const constantsPath = path.join(modulePath, `${name}.constants.ts`);
  const typePath = path.join(modulePath, `${name}.types.ts`);
  const validatorPath = path.join(modulePath, `${name}.validator.ts`);
  const errorPath = path.join(modulePath, `${name}.error.ts`);

  // Create empty files
  fs.writeFileSync(controllerPath, '');
  fs.writeFileSync(routePath, '');
  fs.writeFileSync(servicePath, '');
  fs.writeFileSync(repositoryPath, '');
  fs.writeFileSync(modelPath, '');
  fs.writeFileSync(constantsPath, '');
  fs.writeFileSync(typePath, '');
  fs.writeFileSync(validatorPath, '');
  fs.writeFileSync(errorPath, '');

  console.log(`Module "${name}" generated successfully with empty files!`);
}

// Define CLI command for generating modules
program
  .command('generate <name>')
  .description('Generate a new module (controller, route, service) with empty files')
  .action((name: string) => {
    generateModule(name);
  });

// Parse command-line arguments
program.parse(process.argv);
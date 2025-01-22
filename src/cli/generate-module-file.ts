import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';

// Initialize the commander program
const program = new Command();

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate the module
function generateModule(name: string, empty: boolean = false): void {
  const rootPath = process.cwd();
  const srcPath = path.join(rootPath, 'src');
  const servicesPath = path.join(srcPath, 'services');
  const modulePath = path.join(servicesPath, name);

  if (!fs.existsSync(servicesPath)) {
    console.log(`'services' directory does not exist. Creating...`);
    fs.ensureDirSync(servicesPath);
  }

  if (fs.existsSync(modulePath)) {
    console.log(`Error: Service module "${name}" already exists!`);
    return;
  }

  fs.ensureDirSync(modulePath);

  const files = [
    { path: `${name}.routes.ts`, content: ''},
    { path: `${name}.controller.ts`, content: ''},
    { path: `${name}.services.ts`, content: ''},
    { path: `${name}.repository.ts`, content: ''},
    { path: `${name}.model.ts`, content: ''},
    { path: `${name}.constants.ts`, content: ''},
    { path: `${name}.types.ts`, content: ''},
    { path: `${name}.validator.ts`, content: ''},
    { path: `${name}.error.ts`, content: ''},
  ];

  files.forEach(({ path: filePath, content }) => {
    const fullPath = path.join(modulePath, filePath);
    fs.writeFileSync(fullPath, empty ? '' : content);
  });

  console.log(`Module "${name}" has been generated successfully!`);
}

// Define CLI command
program
  .command('generate <name>')
  .description('Generate a new module (controller, route, service) with empty files')
  .action((name: string) => {
    generateModule(name);
  });

program.parse(process.argv);
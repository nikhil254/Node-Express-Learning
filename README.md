# Node-Express-Learning

#For Read code frfom all files
import * as fs from 'fs';
import * as path from 'path';

// Function to append content to the output file
const appendToFile = (content: string) => {
    const outputPath = path.join(__dirname, 'output.txt');
    fs.appendFileSync(outputPath, content + '\n\n'); // Appending content with a newline
};

// Recursive function to read all files in the given directory
const readFilesRecursive = (dirPath: string, rootDir: string) => {
    // Read the contents of the directory
    const files = fs.readdirSync(dirPath);

    // Iterate through each file/folder
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        // Skip directories or files that should be excluded
        if (stats.isDirectory()) {
            // Recurse deeper except for node_modules, .git, or package-lock.json
            if (file !== 'node_modules' && file !== '.git') {
                readFilesRecursive(filePath, rootDir); // Recurse into subfolder
            }
        } else {
            // Skip package-lock.json and tsconfig.json
            if (file === 'package-lock.json' || file === 'tsconfig.json' || file === 'output.txt') {
                return;
            }

            // Calculate relative path starting from rootDir
            const relativePath = path.relative(rootDir, filePath);

            // If it's a file, log its relative path and content (appending to output.txt)
            const content = fs.readFileSync(filePath, 'utf-8');
            const logMessage = `Reading file: ${relativePath}\n${content}\n--------------`;
            appendToFile(logMessage);  // Append content to output.txt
        }
    });
};

// Set the root project folder to start reading
const rootPath = path.resolve(__dirname);  // Assuming current directory is project root

// Clear any previous content in output.txt before starting
fs.writeFileSync(path.join(__dirname, 'output.txt'), '');  // Clear the file

// Start reading from the root project folder
readFilesRecursive(rootPath, rootPath);

console.log('Process completed. The output has been stored in output.txt');
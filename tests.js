const fs = require('fs');
const path = require('path');

// 1. Load the models and extract expected links
const modelsPath = path.join(__dirname, 'api', 'models.json');
if (!fs.existsSync(modelsPath)) {
    console.error(`Error: Could not find models file at ${modelsPath}`);
    process.exit(1);
}

let models;
try {
    models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));
} catch (e) {
    console.error(`Error parsing models.json: ${e.message}`);
    process.exit(1);
}

const expectedLinks = models.map(m => m.download_link);

// 2. Find all hub.html files
function findHubFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        
        // Skip hidden folders/files and node_modules/git
        if (file.startsWith('.') || file === 'node_modules') continue;

        try {
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                findHubFiles(filePath, fileList);
            } else {
                if (file === 'hub.html') {
                    fileList.push(filePath);
                }
            }
        } catch (e) {
            // Ignore access errors
        }
    }
    return fileList;
}

const hubFiles = findHubFiles(__dirname);
let totalFailures = 0;

console.log(`Loaded ${expectedLinks.length} model links.`);
console.log(`Found ${hubFiles.length} hub.html files to check.
`);

// 3. Check each file
for (const file of hubFiles) {
    const relativePath = path.relative(__dirname, file);
    const content = fs.readFileSync(file, 'utf8');
    let fileFailures = 0;

    for (const link of expectedLinks) {
        if (!content.includes(link)) {
            console.error(`[FAIL] ${relativePath} is missing link: ${link}`);
            fileFailures++;
            totalFailures++;
        }
    }
}

// 4. Report results
if (totalFailures > 0) {
    console.log(`
Tests finished with ${totalFailures} failures.`);
    process.exit(1);
} else {
    console.log('All tests passed successfully.');
    process.exit(0);
}

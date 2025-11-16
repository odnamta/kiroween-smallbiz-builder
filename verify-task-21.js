/**
 * Verification Script for Task 21: Deployment Instructions Integration
 * Tests that deployment instructions are properly integrated into the generation flow
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 21 Verification: Deployment Instructions Integration');
console.log('='.repeat(60));
console.log();

let allTestsPassed = true;

// Test 1: Verify file-writer.js has createDeploymentInstructions function
console.log('Test 1: Checking file-writer.js for createDeploymentInstructions...');
try {
    const fileWriterPath = path.join(__dirname, 'public/js/file-writer.js');
    const fileWriterContent = fs.readFileSync(fileWriterPath, 'utf8');
    
    if (fileWriterContent.includes('function createDeploymentInstructions()')) {
        console.log('✓ PASS: createDeploymentInstructions function exists');
    } else {
        console.log('✗ FAIL: createDeploymentInstructions function not found');
        allTestsPassed = false;
    }

    if (fileWriterContent.includes('function createTextFile(')) {
        console.log('✓ PASS: createTextFile function exists');
    } else {
        console.log('✗ FAIL: createTextFile function not found');
        allTestsPassed = false;
    }

    // Check for key content in deployment instructions
    const instructionsSections = [
        'DEPLOYMENT INSTRUCTIONS',
        'Netlify',
        'GitHub Pages',
        'Vercel',
        'Cloudflare Pages',
        'UPDATING YOUR WEBSITE',
        'TROUBLESHOOTING'
    ];

    let missingContent = [];
    instructionsSections.forEach(section => {
        if (!fileWriterContent.includes(section)) {
            missingContent.push(section);
        }
    });

    if (missingContent.length === 0) {
        console.log('✓ PASS: Deployment instructions contain all required sections');
    } else {
        console.log(`✗ FAIL: Missing sections in deployment instructions: ${missingContent.join(', ')}`);
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error reading file-writer.js: ${error.message}`);
    allTestsPassed = false;
}

console.log();

// Test 2: Verify generator.js calls createDeploymentInstructions
console.log('Test 2: Checking generator.js integration...');
try {
    const generatorPath = path.join(__dirname, 'public/js/generator.js');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    if (generatorContent.includes('createDeploymentInstructions()')) {
        console.log('✓ PASS: generator.js calls createDeploymentInstructions()');
    } else {
        console.log('✗ FAIL: generator.js does NOT call createDeploymentInstructions()');
        allTestsPassed = false;
    }

    if (generatorContent.includes('const deploymentInstructions = createDeploymentInstructions()')) {
        console.log('✓ PASS: Deployment instructions are stored in a variable');
    } else {
        console.log('✗ FAIL: Deployment instructions are not properly stored');
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error reading generator.js: ${error.message}`);
    allTestsPassed = false;
}

console.log();

// Test 3: Verify createOutputFiles accepts deploymentInstructions parameter
console.log('Test 3: Checking createOutputFiles function signature...');
try {
    const generatorPath = path.join(__dirname, 'public/js/generator.js');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    if (generatorContent.includes('function createOutputFiles(html, css, menuData, deploymentInstructions)')) {
        console.log('✓ PASS: createOutputFiles accepts deploymentInstructions parameter');
    } else {
        console.log('✗ FAIL: createOutputFiles does NOT accept deploymentInstructions parameter');
        allTestsPassed = false;
    }

    if (generatorContent.includes('createOutputFiles(generatedHTML, css, sanitizedData.menu_items, deploymentInstructions)')) {
        console.log('✓ PASS: createOutputFiles is called with deploymentInstructions');
    } else {
        console.log('✗ FAIL: createOutputFiles is NOT called with deploymentInstructions');
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error checking createOutputFiles: ${error.message}`);
    allTestsPassed = false;
}

console.log();

// Test 4: Verify createTextFile is called in createOutputFiles
console.log('Test 4: Checking if deployment instructions are written to file...');
try {
    const generatorPath = path.join(__dirname, 'public/js/generator.js');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    if (generatorContent.includes('createTextFile(deploymentInstructions')) {
        console.log('✓ PASS: createTextFile is called with deploymentInstructions');
    } else {
        console.log('✗ FAIL: createTextFile is NOT called with deploymentInstructions');
        allTestsPassed = false;
    }

    if (generatorContent.includes('deployment-instructions.txt')) {
        console.log('✓ PASS: File is named deployment-instructions.txt');
    } else {
        console.log('✗ FAIL: File is NOT named deployment-instructions.txt');
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error checking file creation: ${error.message}`);
    allTestsPassed = false;
}

console.log();

// Test 5: Verify success message mentions 4 files
console.log('Test 5: Checking success message...');
try {
    const generatorPath = path.join(__dirname, 'public/js/generator.js');
    const generatorContent = fs.readFileSync(generatorPath, 'utf8');
    
    if (generatorContent.includes('4 files')) {
        console.log('✓ PASS: Success message mentions 4 files');
    } else {
        console.log('✗ FAIL: Success message does NOT mention 4 files');
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error checking success message: ${error.message}`);
    allTestsPassed = false;
}

console.log();

// Test 6: Verify file-writer.js exports functions globally
console.log('Test 6: Checking if functions are exported globally...');
try {
    const fileWriterPath = path.join(__dirname, 'public/js/file-writer.js');
    const fileWriterContent = fs.readFileSync(fileWriterPath, 'utf8');
    
    if (fileWriterContent.includes('window.createDeploymentInstructions')) {
        console.log('✓ PASS: createDeploymentInstructions is exported globally');
    } else {
        console.log('✗ FAIL: createDeploymentInstructions is NOT exported globally');
        allTestsPassed = false;
    }

    if (fileWriterContent.includes('window.createTextFile')) {
        console.log('✓ PASS: createTextFile is exported globally');
    } else {
        console.log('✗ FAIL: createTextFile is NOT exported globally');
        allTestsPassed = false;
    }

} catch (error) {
    console.log(`✗ FAIL: Error checking exports: ${error.message}`);
    allTestsPassed = false;
}

console.log();
console.log('='.repeat(60));

if (allTestsPassed) {
    console.log('✓ ALL TESTS PASSED');
    console.log();
    console.log('Task 21 is complete! The deployment instructions are properly');
    console.log('integrated into the generation flow.');
    console.log();
    console.log('Next steps:');
    console.log('1. Open test-task-21.html in a browser to run interactive tests');
    console.log('2. Open public/index.html and generate a website');
    console.log('3. Verify that 4 files download:');
    console.log('   - index.html');
    console.log('   - styles.css');
    console.log('   - menu.json');
    console.log('   - deployment-instructions.txt');
    console.log('4. Open deployment-instructions.txt and verify the content');
    process.exit(0);
} else {
    console.log('✗ SOME TESTS FAILED');
    console.log();
    console.log('Please review the failed tests above and fix the issues.');
    process.exit(1);
}

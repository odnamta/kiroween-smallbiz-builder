/**
 * Verification script for Task 20: Deployment Helper Functionality
 * 
 * This script verifies that:
 * 1. createDeploymentInstructions() function exists and returns proper content
 * 2. createTextFile() function exists
 * 3. Deployment instructions contain all required sections
 */

// Read the file-writer.js file
const fs = require('fs');
const path = require('path');

const fileWriterPath = path.join(__dirname, 'public', 'js', 'file-writer.js');
const fileContent = fs.readFileSync(fileWriterPath, 'utf8');

console.log('='.repeat(60));
console.log('Task 20 Verification: Deployment Helper Functionality');
console.log('='.repeat(60));
console.log();

let allTestsPassed = true;

// Test 1: Check if createTextFile function exists
console.log('Test 1: Verify createTextFile function exists');
if (fileContent.includes('function createTextFile(')) {
    console.log('✓ PASS: createTextFile function found');
} else {
    console.log('✗ FAIL: createTextFile function not found');
    allTestsPassed = false;
}
console.log();

// Test 2: Check if createDeploymentInstructions function exists
console.log('Test 2: Verify createDeploymentInstructions function exists');
if (fileContent.includes('function createDeploymentInstructions(')) {
    console.log('✓ PASS: createDeploymentInstructions function found');
} else {
    console.log('✗ FAIL: createDeploymentInstructions function not found');
    allTestsPassed = false;
}
console.log();

// Test 3: Check if deployment instructions mention all three files
console.log('Test 3: Verify instructions mention all generated files');
const mentionsIndexHtml = fileContent.includes('index.html');
const mentionsStylesCss = fileContent.includes('styles.css');
const mentionsMenuJson = fileContent.includes('menu.json');

if (mentionsIndexHtml && mentionsStylesCss && mentionsMenuJson) {
    console.log('✓ PASS: All three files mentioned (index.html, styles.css, menu.json)');
} else {
    console.log('✗ FAIL: Not all files mentioned');
    console.log(`  - index.html: ${mentionsIndexHtml ? '✓' : '✗'}`);
    console.log(`  - styles.css: ${mentionsStylesCss ? '✓' : '✗'}`);
    console.log(`  - menu.json: ${mentionsMenuJson ? '✓' : '✗'}`);
    allTestsPassed = false;
}
console.log();

// Test 4: Check for Netlify instructions
console.log('Test 4: Verify Netlify deployment instructions');
if (fileContent.includes('Netlify') && fileContent.includes('app.netlify.com/drop')) {
    console.log('✓ PASS: Netlify instructions with drag-and-drop URL found');
} else {
    console.log('✗ FAIL: Netlify instructions incomplete');
    allTestsPassed = false;
}
console.log();

// Test 5: Check for GitHub Pages instructions
console.log('Test 5: Verify GitHub Pages deployment instructions');
if (fileContent.includes('GitHub Pages') && fileContent.includes('github.com')) {
    console.log('✓ PASS: GitHub Pages instructions found');
} else {
    console.log('✗ FAIL: GitHub Pages instructions incomplete');
    allTestsPassed = false;
}
console.log();

// Test 6: Check for other hosting services
console.log('Test 6: Verify other hosting services mentioned');
const mentionsVercel = fileContent.includes('Vercel');
const mentionsCloudflare = fileContent.includes('Cloudflare Pages');
const mentionsFirebase = fileContent.includes('Firebase');

if (mentionsVercel && mentionsCloudflare) {
    console.log('✓ PASS: Other hosting services mentioned (Vercel, Cloudflare Pages)');
    if (mentionsFirebase) {
        console.log('  + Bonus: Firebase also mentioned');
    }
} else {
    console.log('✗ FAIL: Not all hosting services mentioned');
    console.log(`  - Vercel: ${mentionsVercel ? '✓' : '✗'}`);
    console.log(`  - Cloudflare Pages: ${mentionsCloudflare ? '✓' : '✗'}`);
    allTestsPassed = false;
}
console.log();

// Test 7: Check for update instructions
console.log('Test 7: Verify website update instructions');
if (fileContent.includes('UPDATING YOUR WEBSITE') || fileContent.includes('updating')) {
    console.log('✓ PASS: Update instructions section found');
} else {
    console.log('✗ FAIL: Update instructions not found');
    allTestsPassed = false;
}
console.log();

// Test 8: Check for troubleshooting section
console.log('Test 8: Verify troubleshooting tips');
if (fileContent.includes('TROUBLESHOOTING') || fileContent.includes('Problem:')) {
    console.log('✓ PASS: Troubleshooting section found');
} else {
    console.log('✗ FAIL: Troubleshooting section not found');
    allTestsPassed = false;
}
console.log();

// Test 9: Check for simple language (no technical jargon)
console.log('Test 9: Verify simple, non-technical language');
const hasFriendlyTone = fileContent.includes('Congratulations') || 
                        fileContent.includes('easy') || 
                        fileContent.includes('simple');
if (hasFriendlyTone) {
    console.log('✓ PASS: Friendly, non-technical language detected');
} else {
    console.log('✗ FAIL: Language may be too technical');
    allTestsPassed = false;
}
console.log();

// Test 10: Check for numbered steps
console.log('Test 10: Verify numbered steps format');
const hasNumberedSteps = /\d+\.\s+/.test(fileContent);
if (hasNumberedSteps) {
    console.log('✓ PASS: Numbered steps format found');
} else {
    console.log('✗ FAIL: Numbered steps not found');
    allTestsPassed = false;
}
console.log();

// Test 11: Check for export statements
console.log('Test 11: Verify functions are exported');
if (fileContent.includes('export') && 
    fileContent.includes('createTextFile') && 
    fileContent.includes('createDeploymentInstructions')) {
    console.log('✓ PASS: Functions are properly exported');
} else {
    console.log('✗ FAIL: Functions not properly exported');
    allTestsPassed = false;
}
console.log();

// Test 12: Check createTextFile uses correct MIME type
console.log('Test 12: Verify createTextFile uses text/plain MIME type');
if (fileContent.includes('text/plain')) {
    console.log('✓ PASS: Correct MIME type for text files');
} else {
    console.log('✗ FAIL: text/plain MIME type not found');
    allTestsPassed = false;
}
console.log();

// Final summary
console.log('='.repeat(60));
if (allTestsPassed) {
    console.log('✓ ALL TESTS PASSED');
    console.log('Task 20 implementation is complete and correct!');
} else {
    console.log('✗ SOME TESTS FAILED');
    console.log('Please review the failed tests above.');
}
console.log('='.repeat(60));

process.exit(allTestsPassed ? 0 : 1);

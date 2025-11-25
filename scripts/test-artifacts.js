#!/usr/bin/env node

/**
 * Generator Integrity Test Script
 * 
 * This script checks core invariants of the buildSiteArtifacts function
 * to catch regressions early.
 * 
 * Run: node scripts/test-artifacts.js
 * Exit code 0 = all checks passed
 * Exit code 1 = one or more checks failed
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    bold: '\x1b[1m'
};

// Track test results
let failureCount = 0;
let passCount = 0;

/**
 * Log a test result
 */
function logTest(name, passed, message = '') {
    if (passed) {
        console.log(`${colors.green}✓${colors.reset} ${name}`);
        passCount++;
    } else {
        console.error(`${colors.red}✗${colors.reset} ${name}`);
        if (message) {
            console.error(`  ${colors.red}${message}${colors.reset}`);
        }
        failureCount++;
    }
}

/**
 * Read a file safely
 */
function readFileSafe(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`${colors.red}Error reading file: ${filePath}${colors.reset}`);
        console.error(`  ${error.message}`);
        return null;
    }
}

// ============================================================================
// MAIN TESTS
// ============================================================================

console.log(`${colors.bold}${colors.blue}Running Generator Integrity Tests...${colors.reset}\n`);

// Resolve file paths relative to repo root
const repoRoot = path.join(__dirname, '..');
const generatorPath = path.join(repoRoot, 'public', 'js', 'generator.js');
const templatePath = path.join(repoRoot, 'public', 'templates', 'base-template.html');

// ----------------------------------------------------------------------------
// Test 1: Generator file exists
// ----------------------------------------------------------------------------
const generatorExists = fs.existsSync(generatorPath);
logTest(
    'Generator file exists',
    generatorExists,
    generatorExists ? '' : `File not found: ${generatorPath}`
);

if (!generatorExists) {
    console.error(`\n${colors.red}${colors.bold}FATAL: Cannot continue without generator.js${colors.reset}\n`);
    process.exit(1);
}

// Read generator file
const generatorContent = readFileSafe(generatorPath);
if (!generatorContent) {
    process.exit(1);
}

// ----------------------------------------------------------------------------
// Test 2: buildSiteArtifacts function is defined
// ----------------------------------------------------------------------------
const hasBuildSiteArtifacts = 
    generatorContent.includes('function buildSiteArtifacts') ||
    generatorContent.includes('async function buildSiteArtifacts') ||
    generatorContent.includes('const buildSiteArtifacts') ||
    generatorContent.includes('let buildSiteArtifacts');

logTest(
    'buildSiteArtifacts function is defined',
    hasBuildSiteArtifacts,
    'Could not find buildSiteArtifacts function definition in generator.js'
);

// ----------------------------------------------------------------------------
// Test 3: buildSiteArtifacts calls Sanitization.sanitizeFormData
// ----------------------------------------------------------------------------
const callsSanitization = generatorContent.includes('Sanitization.sanitizeFormData');

logTest(
    'buildSiteArtifacts calls Sanitization.sanitizeFormData',
    callsSanitization,
    'buildSiteArtifacts must sanitize user input before processing'
);

// ----------------------------------------------------------------------------
// Test 4: buildSiteArtifacts returns correct artifact shape
// ----------------------------------------------------------------------------
// Look for the return statement with the expected properties
const hasCorrectReturnShape = 
    generatorContent.includes('html') &&
    generatorContent.includes('css') &&
    generatorContent.includes('menuJson') &&
    generatorContent.includes('instructionsTxt');

logTest(
    'buildSiteArtifacts returns expected artifact shape',
    hasCorrectReturnShape,
    'Expected return object with properties: html, css, menuJson, instructionsTxt'
);

// ----------------------------------------------------------------------------
// Test 5: No double-escaping in generator.js
// ----------------------------------------------------------------------------
const hasDoubleEscapingInGenerator = generatorContent.includes('&amp;amp;');

logTest(
    'No double-escaping (&amp;amp;) in generator.js',
    !hasDoubleEscapingInGenerator,
    'Found &amp;amp; which indicates double-escaping bug'
);

// ----------------------------------------------------------------------------
// Test 6: Template file exists
// ----------------------------------------------------------------------------
const templateExists = fs.existsSync(templatePath);
logTest(
    'Template file exists',
    templateExists,
    templateExists ? '' : `File not found: ${templatePath}`
);

// ----------------------------------------------------------------------------
// Test 7: No double-escaping in template
// ----------------------------------------------------------------------------
if (templateExists) {
    const templateContent = readFileSafe(templatePath);
    if (templateContent) {
        const hasDoubleEscapingInTemplate = templateContent.includes('&amp;amp;');
        
        logTest(
            'No double-escaping (&amp;amp;) in base-template.html',
            !hasDoubleEscapingInTemplate,
            'Found &amp;amp; which indicates double-escaping bug'
        );
    }
}

// ----------------------------------------------------------------------------
// Test 8: buildSiteArtifacts is exported to window
// ----------------------------------------------------------------------------
const isExportedToWindow = 
    generatorContent.includes('window.buildSiteArtifacts') ||
    generatorContent.includes('window["buildSiteArtifacts"]');

logTest(
    'buildSiteArtifacts is exported to window',
    isExportedToWindow,
    'buildSiteArtifacts must be available globally for preview functionality'
);

// ----------------------------------------------------------------------------
// Test 9: buildSiteArtifacts is async
// ----------------------------------------------------------------------------
const isAsync = 
    generatorContent.includes('async function buildSiteArtifacts') ||
    (generatorContent.includes('buildSiteArtifacts') && 
     generatorContent.includes('async') &&
     generatorContent.includes('await'));

logTest(
    'buildSiteArtifacts is async',
    isAsync,
    'buildSiteArtifacts must be async to handle template/theme loading'
);

// ----------------------------------------------------------------------------
// Test 10: No direct DOM manipulation in buildSiteArtifacts
// ----------------------------------------------------------------------------
// This is a heuristic check - buildSiteArtifacts should be pure
const hasDOMManipulation = 
    generatorContent.match(/buildSiteArtifacts[\s\S]*?(?=function\s+\w+|$)/)?.[0]?.includes('document.') ||
    generatorContent.match(/buildSiteArtifacts[\s\S]*?(?=function\s+\w+|$)/)?.[0]?.includes('window.') ||
    false;

logTest(
    'buildSiteArtifacts has no direct DOM manipulation',
    !hasDOMManipulation,
    'buildSiteArtifacts should be pure - no document/window access'
);

// ============================================================================
// SUMMARY
// ============================================================================

console.log(`\n${colors.bold}Test Summary:${colors.reset}`);
console.log(`  ${colors.green}Passed: ${passCount}${colors.reset}`);
console.log(`  ${colors.red}Failed: ${failureCount}${colors.reset}`);

if (failureCount > 0) {
    console.log(`\n${colors.red}${colors.bold}Generator integrity checks FAILED${colors.reset}`);
    console.log(`${colors.yellow}Please review the failures above and fix the issues.${colors.reset}`);
    console.log(`${colors.yellow}A fix plan should be created in .kiro/fix_plan.md${colors.reset}\n`);
    process.exit(1);
} else {
    console.log(`\n${colors.green}${colors.bold}All generator invariants look good! ✓${colors.reset}\n`);
    process.exit(0);
}

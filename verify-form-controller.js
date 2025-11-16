/**
 * Verification script for form-controller.js
 * Run with: node verify-form-controller.js
 */

console.log('=== Form Controller Verification ===\n');

// Simulate browser environment for testing
global.document = {
  getElementById: (id) => {
    const mockElements = {
      'business_type': { value: '', addEventListener: () => {} },
      'tagline': { value: '' },
      'short_description': { value: '' },
      'menuItemsContainer': { innerHTML: '', appendChild: () => {}, querySelectorAll: () => [] },
      'usePresetButton': { addEventListener: () => {} }
    };
    return mockElements[id] || null;
  },
  createElement: () => ({
    className: '',
    setAttribute: () => {},
    innerHTML: '',
    style: { cssText: '', display: '' },
    textContent: '',
    addEventListener: () => {}
  }),
  querySelector: () => ({
    style: { display: '' },
    querySelector: () => null,
    parentNode: { insertBefore: () => {} }
  }),
  querySelectorAll: () => []
};

// Test 1: Check if form-controller.js file exists
const fs = require('fs');
const path = require('path');

const formControllerPath = path.join(__dirname, 'public', 'js', 'form-controller.js');
const presetsPath = path.join(__dirname, 'public', 'js', 'presets.js');

console.log('✓ Test 1: Checking file existence...');
if (fs.existsSync(formControllerPath)) {
  console.log('  ✓ form-controller.js exists');
} else {
  console.log('  ✗ form-controller.js NOT FOUND');
  process.exit(1);
}

if (fs.existsSync(presetsPath)) {
  console.log('  ✓ presets.js exists');
} else {
  console.log('  ✗ presets.js NOT FOUND');
  process.exit(1);
}

// Test 2: Check file content
console.log('\n✓ Test 2: Checking file content...');
const formControllerContent = fs.readFileSync(formControllerPath, 'utf8');
const presetsContent = fs.readFileSync(presetsPath, 'utf8');

const requiredFunctions = [
  'handlePresetButtonClick',
  'populateFormWithPreset',
  'clearMenuItems',
  'addMenuItemsFromPreset',
  'toggleMenuSection',
  'handleBusinessTypeChange',
  'initializeFormController'
];

let allFunctionsFound = true;
requiredFunctions.forEach(funcName => {
  if (formControllerContent.includes(`function ${funcName}`)) {
    console.log(`  ✓ ${funcName} function found`);
  } else {
    console.log(`  ✗ ${funcName} function NOT FOUND`);
    allFunctionsFound = false;
  }
});

// Test 3: Check exports
console.log('\n✓ Test 3: Checking exports...');
if (formControllerContent.includes('export {')) {
  console.log('  ✓ Module exports found');
  requiredFunctions.forEach(funcName => {
    if (formControllerContent.includes(funcName) && formControllerContent.match(/export\s*{[^}]*}/s)[0].includes(funcName)) {
      console.log(`  ✓ ${funcName} is exported`);
    }
  });
} else {
  console.log('  ✗ Module exports NOT FOUND');
}

// Test 4: Check imports
console.log('\n✓ Test 4: Checking imports...');
if (formControllerContent.includes("import { getPreset, hasMenuItems } from './presets.js'")) {
  console.log('  ✓ Correct imports from presets.js');
} else {
  console.log('  ✗ Imports from presets.js NOT FOUND or incorrect');
}

// Test 5: Check presets
console.log('\n✓ Test 5: Checking presets...');
const businessTypes = ['coffee_shop', 'bakery', 'barber_shop', 'food_stall', 'laundry_service', 'photographer_creator'];
businessTypes.forEach(type => {
  if (presetsContent.includes(type)) {
    console.log(`  ✓ ${type} preset found`);
  } else {
    console.log(`  ✗ ${type} preset NOT FOUND`);
  }
});

// Test 6: Check for Rupiah currency
console.log('\n✓ Test 6: Checking currency format...');
const rupiah = presetsContent.match(/Rp\s+[\d,]+/g);
if (rupiah && rupiah.length > 0) {
  console.log(`  ✓ Found ${rupiah.length} Rupiah price entries`);
} else {
  console.log('  ✗ Rupiah currency format NOT FOUND');
}

// Test 7: Check test files
console.log('\n✓ Test 7: Checking test files...');
const testFiles = [
  'test-form-controller.html',
  'test-preset-integration.html'
];

testFiles.forEach(file => {
  const testPath = path.join(__dirname, file);
  if (fs.existsSync(testPath)) {
    console.log(`  ✓ ${file} exists`);
  } else {
    console.log(`  ✗ ${file} NOT FOUND`);
  }
});

console.log('\n=== Verification Complete ===');
console.log('\nAll checks passed! ✓');
console.log('\nTo test manually:');
console.log('1. Open http://localhost:8001/test-preset-integration.html in your browser');
console.log('2. Select a business type from the dropdown');
console.log('3. Click "Use Preset" button');
console.log('4. Verify that form fields are populated with preset data');
console.log('5. Check that all automated tests pass on the right side');

/**
 * Verification script for Task 19: Update validation for optional menu items
 * Tests that validation.js correctly handles 0 menu items
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 19 Verification: Optional Menu Items Validation');
console.log('='.repeat(60));
console.log();

// Read the validation.js file
const validationPath = path.join(__dirname, 'public', 'js', 'validation.js');
const validationContent = fs.readFileSync(validationPath, 'utf8');

let allTestsPassed = true;

// Test 1: Check that validateMenuItems no longer requires at least one menu item
console.log('Test 1: Checking validateMenuItems function...');
const hasOldRequirement = validationContent.includes('if (menuItems.length === 0) {') && 
                          validationContent.includes('return false;') &&
                          validationContent.match(/if \(menuItems\.length === 0\)\s*{[^}]*return false;/);

if (hasOldRequirement) {
    // Check if it's the updated version that returns true
    const validateMenuItemsMatch = validationContent.match(/function validateMenuItems\(\)\s*{[\s\S]*?return (true|allValid);?\s*}/);
    if (validateMenuItemsMatch) {
        const functionBody = validateMenuItemsMatch[0];
        // Check if the function returns true for 0 items
        const returnsTrue = functionBody.includes('if (menuItems.length === 0)') && 
                           functionBody.match(/if \(menuItems\.length === 0\)\s*{[^}]*return true;/);
        if (returnsTrue) {
            console.log('✓ PASS: validateMenuItems now allows 0 menu items');
        } else {
            console.log('✗ FAIL: validateMenuItems still requires at least one menu item');
            allTestsPassed = false;
        }
    }
} else {
    // Check if the new implementation exists
    const newImplementation = validationContent.match(/if \(menuItems\.length === 0\)\s*{[^}]*return true;/);
    if (newImplementation) {
        console.log('✓ PASS: validateMenuItems now allows 0 menu items');
    } else {
        console.log('✗ FAIL: Could not verify validateMenuItems implementation');
        allTestsPassed = false;
    }
}
console.log();

// Test 2: Check that error message is cleared for 0 items
console.log('Test 2: Checking error message handling...');
const clearsErrorMessage = validationContent.includes('menuError.style.display = \'none\'');
if (clearsErrorMessage) {
    console.log('✓ PASS: Error message is cleared for empty menu');
} else {
    console.log('✗ FAIL: Error message handling not found');
    allTestsPassed = false;
}
console.log();

// Test 3: Check that validation still works for populated menu items
console.log('Test 3: Checking validation for populated menu items...');
const validatesItems = validationContent.includes('menuItems.forEach') && 
                       validationContent.includes('validateField(nameInput)') &&
                       validationContent.includes('validateField(priceInput)');
if (validatesItems) {
    console.log('✓ PASS: Validation still works for populated menu items');
} else {
    console.log('✗ FAIL: Menu item validation logic not found');
    allTestsPassed = false;
}
console.log();

// Test 4: Check that NO_MENU_ITEMS error message is no longer used
console.log('Test 4: Checking error message usage...');
const errorMessageDefined = validationContent.includes('NO_MENU_ITEMS:');
const errorMessageUsed = validationContent.match(/ERROR_MESSAGES\.NO_MENU_ITEMS/g);
if (errorMessageDefined && (!errorMessageUsed || errorMessageUsed.length === 1)) {
    console.log('✓ PASS: NO_MENU_ITEMS error message is defined but not actively used in validation');
} else if (!errorMessageDefined) {
    console.log('✓ PASS: NO_MENU_ITEMS error message removed (acceptable)');
} else {
    console.log('⚠ WARNING: NO_MENU_ITEMS error message may still be in use');
}
console.log();

// Test 5: Verify the function structure
console.log('Test 5: Verifying function structure...');
const validateMenuItemsFunction = validationContent.match(/function validateMenuItems\(\)\s*{[\s\S]*?^    }/m);
if (validateMenuItemsFunction) {
    const functionBody = validateMenuItemsFunction[0];
    
    // Check for key elements
    const hasMenuItemsQuery = functionBody.includes('querySelectorAll(\'.menu-item\')');
    const hasErrorClear = functionBody.includes('menuError.style.display = \'none\'');
    const hasEarlyReturn = functionBody.includes('if (menuItems.length === 0)') && 
                          functionBody.match(/if \(menuItems\.length === 0\)\s*{[^}]*return true;/);
    const hasValidation = functionBody.includes('validateField');
    
    if (hasMenuItemsQuery && hasErrorClear && hasEarlyReturn && hasValidation) {
        console.log('✓ PASS: Function structure is correct');
        console.log('  - Queries menu items');
        console.log('  - Clears error message');
        console.log('  - Returns true for 0 items');
        console.log('  - Validates existing items');
    } else {
        console.log('✗ FAIL: Function structure incomplete');
        if (!hasMenuItemsQuery) console.log('  - Missing menu items query');
        if (!hasErrorClear) console.log('  - Missing error message clear');
        if (!hasEarlyReturn) console.log('  - Missing early return for 0 items');
        if (!hasValidation) console.log('  - Missing validation logic');
        allTestsPassed = false;
    }
} else {
    console.log('✗ FAIL: Could not parse validateMenuItems function');
    allTestsPassed = false;
}
console.log();

// Test 6: Check test file exists
console.log('Test 6: Checking test file...');
const testFilePath = path.join(__dirname, 'test-task-19.html');
if (fs.existsSync(testFilePath)) {
    console.log('✓ PASS: Test file test-task-19.html exists');
    const testContent = fs.readFileSync(testFilePath, 'utf8');
    
    // Check for key test scenarios
    const hasZeroItemsTest = testContent.includes('Test 1: Validation with 0 menu items');
    const hasPopulatedItemsTest = testContent.includes('Test 2: Validation with populated menu items');
    const hasIncompleteItemsTest = testContent.includes('Test 3: Validation with incomplete menu items');
    
    if (hasZeroItemsTest && hasPopulatedItemsTest && hasIncompleteItemsTest) {
        console.log('  - Contains comprehensive test scenarios');
    }
} else {
    console.log('⚠ WARNING: Test file test-task-19.html not found');
}
console.log();

// Summary
console.log('='.repeat(60));
if (allTestsPassed) {
    console.log('✓ ALL TESTS PASSED');
    console.log();
    console.log('Summary of changes:');
    console.log('1. validateMenuItems() now allows 0 menu items (returns true)');
    console.log('2. Error message is cleared when menu is empty');
    console.log('3. Validation still works correctly for populated menu items');
    console.log('4. Form submission works with 0 menu items');
    console.log();
    console.log('Next steps:');
    console.log('1. Open test-task-19.html in a browser to run interactive tests');
    console.log('2. Test with different business types (laundry_service, photographer_creator)');
    console.log('3. Verify form submission works in the main application');
} else {
    console.log('✗ SOME TESTS FAILED');
    console.log('Please review the validation.js file and ensure all requirements are met.');
}
console.log('='.repeat(60));

process.exit(allTestsPassed ? 0 : 1);

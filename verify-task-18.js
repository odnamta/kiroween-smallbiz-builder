/**
 * Verification script for Task 18 - Preset UI functionality
 * Checks that all required elements are present in the HTML
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Task 18 Implementation...\n');

// Read the HTML file
const htmlPath = path.join(__dirname, 'public', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const tests = [
    {
        name: 'Business type dropdown has coffee_shop option',
        check: () => htmlContent.includes('value="coffee_shop"')
    },
    {
        name: 'Business type dropdown has bakery option',
        check: () => htmlContent.includes('value="bakery"')
    },
    {
        name: 'Business type dropdown has barber_shop option',
        check: () => htmlContent.includes('value="barber_shop"')
    },
    {
        name: 'Business type dropdown has food_stall option',
        check: () => htmlContent.includes('value="food_stall"')
    },
    {
        name: 'Business type dropdown has laundry_service option',
        check: () => htmlContent.includes('value="laundry_service"')
    },
    {
        name: 'Business type dropdown has photographer_creator option',
        check: () => htmlContent.includes('value="photographer_creator"')
    },
    {
        name: 'Use Preset button exists with correct ID',
        check: () => htmlContent.includes('id="usePresetButton"')
    },
    {
        name: 'Use Preset button is initially disabled',
        check: () => htmlContent.includes('id="usePresetButton"') && htmlContent.match(/id="usePresetButton"[^>]*disabled/s)
    },
    {
        name: 'Helper text exists below preset button',
        check: () => htmlContent.includes('You can customize these after applying the preset')
    },
    {
        name: 'Preset feedback container exists',
        check: () => htmlContent.includes('id="presetFeedback"')
    },
    {
        name: 'Menu helper text exists',
        check: () => htmlContent.includes('class="menu-helper-text"')
    },
    {
        name: 'Menu helper text mentions optional service items',
        check: () => htmlContent.includes('Optional: Add service items if desired')
    },
    {
        name: 'CSS styling for btn-preset exists',
        check: () => htmlContent.includes('.btn-preset')
    },
    {
        name: 'CSS styling for helper-text exists',
        check: () => htmlContent.includes('.helper-text')
    },
    {
        name: 'CSS styling for menu-helper-text exists',
        check: () => htmlContent.includes('.menu-helper-text')
    },
    {
        name: 'Presets module is linked',
        check: () => htmlContent.includes('src="js/presets.js"')
    },
    {
        name: 'Form controller module is linked',
        check: () => htmlContent.includes('src="js/form-controller.js"')
    },
    {
        name: 'Form controller initialization script exists',
        check: () => htmlContent.includes('initializeFormController')
    },
    {
        name: 'Business type change handler exists',
        check: () => htmlContent.includes('businessTypeSelect.addEventListener') && htmlContent.includes('usePresetButton.disabled')
    },
    {
        name: 'Preset button has proper disabled state handling',
        check: () => htmlContent.includes('.btn-preset:disabled')
    }
];

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
    const result = test.check();
    const status = result ? '✅ PASS' : '❌ FAIL';
    console.log(`${index + 1}. ${status} - ${test.name}`);
    
    if (result) {
        passed++;
    } else {
        failed++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`Total: ${tests.length} tests`);
console.log(`Passed: ${passed} ✅`);
console.log(`Failed: ${failed} ❌`);
console.log('='.repeat(60));

if (failed === 0) {
    console.log('\n🎉 All tests passed! Task 18 implementation is complete.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some tests failed. Please review the implementation.');
    process.exit(1);
}

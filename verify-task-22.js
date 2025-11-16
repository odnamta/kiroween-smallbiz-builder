/**
 * Verification script for Task 22 - Empty Menu Handling
 * Tests template engine's conditional rendering for empty menu_items arrays
 */

// Mock Sanitization module for Node.js environment
global.Sanitization = {
    sanitizeHTML: function(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }
};

// Load template engine
const { parseTemplate } = require('./public/js/template-engine.js');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 22 Verification - Empty Menu Handling');
console.log('='.repeat(60));
console.log();

let passCount = 0;
let failCount = 0;

function test(description, fn) {
    try {
        const result = fn();
        if (result.passed) {
            console.log(`✓ PASS: ${description}`);
            passCount++;
        } else {
            console.log(`✗ FAIL: ${description}`);
            console.log(`  Reason: ${result.reason}`);
            failCount++;
        }
    } catch (error) {
        console.log(`✗ FAIL: ${description}`);
        console.log(`  Error: ${error.message}`);
        failCount++;
    }
}

// Test template with conditional sections
const testTemplate = `
<div>
    <h1>{{business_name}}</h1>
    
    {{?hasItems:menu_items}}
    <section class="menu">
        <h2>Our Menu</h2>
        <ul>
            {{#menu_items}}
            <li>{{name}} - {{price}}</li>
            {{/menu_items}}
        </ul>
    </section>
    {{/hasItems:menu_items}}
    
    {{?empty:menu_items}}
    <section class="menu">
        <h2>Our Services</h2>
        <p>Contact us for custom pricing and service details.</p>
    </section>
    {{/empty:menu_items}}
</div>`;

// Test 1: Empty menu_items array shows fallback message
test('Empty menu_items array shows fallback message', () => {
    const data = {
        business_name: "Test Business",
        menu_items: []
    };
    
    const result = parseTemplate(testTemplate, data);
    
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    const hasMenuList = result.includes('<ul>');
    const hasOurMenu = result.includes('Our Menu');
    const hasOurServices = result.includes('Our Services');
    
    if (!hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message not found' };
    }
    if (hasMenuList) {
        return { passed: false, reason: 'Menu list should not be present for empty array' };
    }
    if (hasOurMenu) {
        return { passed: false, reason: '"Our Menu" heading should not be present for empty array' };
    }
    if (!hasOurServices) {
        return { passed: false, reason: '"Our Services" heading should be present for empty array' };
    }
    
    return { passed: true };
});

// Test 2: Populated menu_items array shows menu list
test('Populated menu_items array shows menu list', () => {
    const data = {
        business_name: "Test Business",
        menu_items: [
            { name: "Coffee", price: "Rp 15,000" },
            { name: "Tea", price: "Rp 10,000" }
        ]
    };
    
    const result = parseTemplate(testTemplate, data);
    
    const hasMenuList = result.includes('<ul>');
    const hasCoffee = result.includes('Coffee');
    const hasTea = result.includes('Tea');
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    const hasOurMenu = result.includes('Our Menu');
    const hasOurServices = result.includes('Our Services');
    
    if (!hasMenuList) {
        return { passed: false, reason: 'Menu list not found' };
    }
    if (!hasCoffee || !hasTea) {
        return { passed: false, reason: 'Menu items not rendered correctly' };
    }
    if (hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message should not be present for populated array' };
    }
    if (!hasOurMenu) {
        return { passed: false, reason: '"Our Menu" heading should be present for populated array' };
    }
    if (hasOurServices) {
        return { passed: false, reason: '"Our Services" heading should not be present for populated array' };
    }
    
    return { passed: true };
});

// Test 3: Base template with empty menu
test('Base template handles empty menu correctly', () => {
    const templatePath = path.join(__dirname, 'public/templates/base-template.html');
    const baseTemplate = fs.readFileSync(templatePath, 'utf8');
    
    const data = {
        business_name: "Empty Menu Business",
        tagline: "Test Tagline",
        short_description: "Test description",
        contact_whatsapp: "628123456789",
        instagram_handle: "testbusiness",
        menu_items: []
    };
    
    const result = parseTemplate(baseTemplate, data);
    
    const hasMenuSection = result.includes('class="menu"');
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    const hasMenuList = result.includes('class="menu-list"');
    
    if (!hasMenuSection) {
        return { passed: false, reason: 'Menu section not found' };
    }
    if (!hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message not found in base template' };
    }
    if (hasMenuList) {
        return { passed: false, reason: 'Menu list should not be present for empty array' };
    }
    
    return { passed: true };
});

// Test 4: Base template with populated menu
test('Base template displays menu items correctly', () => {
    const templatePath = path.join(__dirname, 'public/templates/base-template.html');
    const baseTemplate = fs.readFileSync(templatePath, 'utf8');
    
    const data = {
        business_name: "Full Menu Business",
        tagline: "Test Tagline",
        short_description: "Test description",
        contact_whatsapp: "628123456789",
        instagram_handle: "testbusiness",
        menu_items: [
            { name: "Item 1", price: "Rp 20,000" },
            { name: "Item 2", price: "Rp 25,000" },
            { name: "Item 3", price: "Rp 30,000" }
        ]
    };
    
    const result = parseTemplate(baseTemplate, data);
    
    const hasMenuSection = result.includes('class="menu"');
    const hasMenuList = result.includes('class="menu-list"');
    const hasItem1 = result.includes('Item 1');
    const hasItem2 = result.includes('Item 2');
    const hasItem3 = result.includes('Item 3');
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    
    if (!hasMenuSection) {
        return { passed: false, reason: 'Menu section not found' };
    }
    if (!hasMenuList) {
        return { passed: false, reason: 'Menu list not found' };
    }
    if (!hasItem1 || !hasItem2 || !hasItem3) {
        return { passed: false, reason: 'Not all menu items rendered correctly' };
    }
    if (hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message should not be present for populated array' };
    }
    
    return { passed: true };
});

// Test 5: Undefined menu_items array
test('Undefined menu_items array shows fallback message', () => {
    const data = {
        business_name: "Test Business"
        // menu_items is undefined
    };
    
    const result = parseTemplate(testTemplate, data);
    
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    const hasMenuList = result.includes('<ul>');
    
    if (!hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message not found for undefined array' };
    }
    if (hasMenuList) {
        return { passed: false, reason: 'Menu list should not be present for undefined array' };
    }
    
    return { passed: true };
});

// Test 6: Single menu item
test('Single menu item displays correctly', () => {
    const data = {
        business_name: "Test Business",
        menu_items: [
            { name: "Only Item", price: "Rp 50,000" }
        ]
    };
    
    const result = parseTemplate(testTemplate, data);
    
    const hasMenuList = result.includes('<ul>');
    const hasOnlyItem = result.includes('Only Item');
    const hasEmptyMessage = result.includes('Contact us for custom pricing');
    
    if (!hasMenuList) {
        return { passed: false, reason: 'Menu list not found for single item' };
    }
    if (!hasOnlyItem) {
        return { passed: false, reason: 'Single menu item not rendered' };
    }
    if (hasEmptyMessage) {
        return { passed: false, reason: 'Fallback message should not be present for single item' };
    }
    
    return { passed: true };
});

console.log();
console.log('='.repeat(60));
console.log('Test Summary');
console.log('='.repeat(60));
console.log(`Total Tests: ${passCount + failCount}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);
console.log('='.repeat(60));

process.exit(failCount > 0 ? 1 : 0);

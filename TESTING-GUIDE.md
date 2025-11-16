# Website Builder - Testing Guide

This guide provides step-by-step instructions for manually testing the complete website generation flow.

## Automated Tests

We've created automated test files that verify the integration:

1. **test-complete-integration.html** - Comprehensive test suite covering all requirements
2. **test-generation-flow.html** - Basic generation flow test
3. **test-validation.html** - Form validation tests
4. **test-template-engine.html** - Template processing tests
5. **test-sanitization.html** - Input sanitization tests

To run automated tests, simply open any of these files in a web browser.

## Manual Testing Checklist

### Test 1: Classic Theme - Coffee Shop

1. Open `public/index.html` in your browser
2. Fill in the form with the following data:
   - **Business Name**: Brew Haven
   - **Business Type**: Coffee Shop
   - **Tagline**: Your Daily Dose of Happiness
   - **Short Description**: Artisan coffee and fresh pastries in a cozy atmosphere.
   - **WhatsApp Number**: 1234567890
   - **Instagram Handle**: brewhaven_cafe
   - **Theme**: Classic
   - **Menu Items**:
     - Espresso - $3.50
     - Cappuccino - $4.50
     - Croissant - $3.00

3. Click "Generate My Website"
4. Verify three files are downloaded:
   - `index.html`
   - `styles.css`
   - `menu.json`

5. Open the downloaded `index.html` in a browser
6. Verify:
   - ✓ Business name "Brew Haven" appears in header
   - ✓ Tagline appears below business name
   - ✓ Description appears in About section
   - ✓ All 3 menu items appear with correct prices
   - ✓ WhatsApp link works (https://wa.me/1234567890)
   - ✓ Instagram link works (https://instagram.com/brewhaven_cafe)
   - ✓ Classic theme styling is applied (light colors, professional look)
   - ✓ Page is responsive on mobile, tablet, and desktop

### Test 2: Kiroween Theme - Barber Shop

1. Refresh `public/index.html`
2. Fill in the form with the following data:
   - **Business Name**: Sharp Cuts
   - **Business Type**: Barber
   - **Tagline**: Where Style Meets Precision
   - **Short Description**: Professional haircuts and grooming services for the modern gentleman.
   - **WhatsApp Number**: 9876543210
   - **Instagram Handle**: sharpcuts_barber
   - **Theme**: Kiroween
   - **Menu Items**:
     - Classic Cut - $25
     - Beard Trim - $15
     - Hot Towel Shave - $30

3. Click "Generate My Website"
4. Verify three files are downloaded (overwriting previous files)
5. Open the downloaded `index.html` in a browser
6. Verify:
   - ✓ Business name "Sharp Cuts" appears in header
   - ✓ Tagline appears below business name
   - ✓ Description appears in About section
   - ✓ All 3 menu items appear with correct prices
   - ✓ WhatsApp link works (https://wa.me/9876543210)
   - ✓ Instagram link works (https://instagram.com/sharpcuts_barber)
   - ✓ Kiroween theme styling is applied (dark colors, modern look)
   - ✓ Page is responsive on mobile, tablet, and desktop

### Test 3: Form Validation

1. Open `public/index.html`
2. Try to submit the form without filling any fields
3. Verify:
   - ✓ Error messages appear for all required fields
   - ✓ Form does not submit
   - ✓ First error field is focused

4. Fill in invalid data:
   - **WhatsApp Number**: abc-123-def
   - **Instagram Handle**: test@handle!

5. Try to submit
6. Verify:
   - ✓ Error message for WhatsApp: "Please enter a valid WhatsApp number (digits only)"
   - ✓ Error message for Instagram: "Please enter a valid Instagram handle (letters, numbers, and underscores only)"

### Test 4: Dynamic Menu Items

1. Open `public/index.html`
2. Click "Add Menu Item" button multiple times
3. Verify:
   - ✓ New menu item fields appear
   - ✓ Each has unique name and price inputs
   - ✓ Remove buttons appear when more than 1 item exists

4. Try to remove all menu items except one
5. Verify:
   - ✓ Remove button is hidden when only 1 item remains
   - ✓ Alert appears if trying to remove the last item

6. Add 20 menu items
7. Try to add a 21st item
8. Verify:
   - ✓ Alert appears: "Maximum 20 menu items allowed"

### Test 5: File Overwriting

1. Generate a website with any data
2. Note the downloaded files
3. Generate another website with different data
4. Verify:
   - ✓ New files are downloaded
   - ✓ Files have the same names (index.html, styles.css, menu.json)
   - ✓ New files contain the updated data

### Test 6: Responsive Design

1. Generate a website with any theme
2. Open the generated `index.html`
3. Test on different screen sizes:
   - **Mobile (320px)**: 
     - ✓ Content stacks vertically
     - ✓ Text is readable
     - ✓ Buttons are touch-friendly (44px minimum)
   - **Tablet (768px)**:
     - ✓ Layout adapts appropriately
     - ✓ Menu items may display in columns
   - **Desktop (1024px+)**:
     - ✓ Content is centered with max-width
     - ✓ Optimal reading experience

### Test 7: XSS Protection

1. Open `public/index.html`
2. Try to inject malicious code:
   - **Business Name**: `<script>alert('xss')</script>Test`
   - **Tagline**: `<img src=x onerror=alert('xss')>`
   - **Menu Item Name**: `<b>Bold</b> Item`

3. Generate the website
4. Open the generated `index.html`
5. Verify:
   - ✓ No script alerts appear
   - ✓ HTML tags are escaped and displayed as text
   - ✓ Page functions normally

### Test 8: Browser Compatibility

Test the form and generated websites in:
- ✓ Chrome/Edge (Chromium)
- ✓ Firefox
- ✓ Safari

Verify all features work in each browser.

## Expected Results

After completing all tests, you should have verified:

1. ✓ All modules are properly integrated
2. ✓ Form validation works correctly
3. ✓ Both themes (Classic and Kiroween) generate correctly
4. ✓ All user data appears in generated HTML
5. ✓ Menu items render properly
6. ✓ WhatsApp links format as https://wa.me/{phone}
7. ✓ Instagram links format as https://instagram.com/{handle}
8. ✓ Three files are created (index.html, styles.css, menu.json)
9. ✓ File overwriting works via re-download
10. ✓ Responsive design works on all screen sizes
11. ✓ XSS protection prevents malicious code injection
12. ✓ All features work across major browsers

## Troubleshooting

### Files Not Downloading
- Check browser settings for download permissions
- Try a different browser (Chrome, Firefox, Safari)
- Check browser console for errors

### Generated Website Looks Wrong
- Verify the correct theme was selected
- Check that styles.css was downloaded
- Ensure styles.css is in the same directory as index.html

### Links Not Working
- Verify WhatsApp number contains only digits
- Verify Instagram handle contains only letters, numbers, and underscores
- Check the generated HTML source to see the actual URLs

## Success Criteria

All tests should pass with:
- ✓ No console errors
- ✓ All files download successfully
- ✓ Generated websites display correctly
- ✓ All links work properly
- ✓ Responsive design functions on all screen sizes
- ✓ Security measures prevent XSS attacks

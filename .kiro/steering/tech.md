# Technology Stack

## Build System

No build system required - this is a pure static application that runs entirely in the browser.

## Languages & Frameworks

- **Primary Language**: JavaScript (ES6+)
- **Framework**: None (Vanilla JavaScript)
- **Runtime**: Browser-based (no server-side processing)
- **Markup**: HTML5
- **Styling**: CSS3

## Key Libraries & Dependencies

- **No external dependencies** - The entire application uses vanilla JavaScript, HTML, and CSS
- Browser APIs used:
  - DOM API for form manipulation and event handling
  - Blob API for file generation
  - URL.createObjectURL for file downloads
  - Fetch API for loading templates

## Common Commands

```bash
# No installation required - open directly in browser
# Simply open public/index.html in any modern browser

# For local development with live server (optional)
# Using Python:
python -m http.server 8000

# Using Node.js http-server (if installed):
npx http-server public -p 8000

# No build step required
# No test runner configured (manual testing only)

# To use the website builder:
# 1. Open public/index.html in a browser
# 2. Select a business type and optionally click "Use Preset"
# 3. Fill out or customize the form with business information
# 4. Click "Generate Website" button
# 5. Four files will download: index.html, styles.css, menu.json, deployment-instructions.txt
# 6. Follow deployment-instructions.txt to publish your website
```

## Development Tools

- **Package Manager**: None required
- **Linter**: None configured (can add ESLint if desired)
- **Formatter**: None configured (can add Prettier if desired)
- **Testing Framework**: Manual testing only (no automated test framework)

## Architecture

- **Client-side only**: All processing happens in the browser
- **Static file generation**: Creates downloadable HTML, CSS, and JSON files
- **No backend**: No server-side code or database
- **No authentication**: Open access, no user accounts

## Module Organization

JavaScript modules are organized in `/public/js/`:
- `generator.js` - Main orchestration and form handling
- `template-engine.js` - Template processing and placeholder replacement
- `file-writer.js` - File creation, download utilities, and deployment instructions generation
- `validation.js` - Form input validation (supports optional menu items)
- `sanitization.js` - Input sanitization for security
- `presets.js` - Business preset data and retrieval functions for 6 business types
- `form-controller.js` - Preset application logic and form interaction management

### Module Details

**presets.js**:
- Defines default content for 6 business types: coffee_shop, bakery, barber_shop, food_stall, laundry_service, photographer_creator
- Each preset includes: default_tagline, default_short_description, default_menu_items
- Uses Indonesian Rupiah (Rp) pricing format
- Exports `getPreset(businessType)` and `hasMenuItems(businessType)` functions

**form-controller.js**:
- Handles "Use Preset" button clicks
- Populates form fields with preset data
- Manages menu item visibility for service-based businesses
- Coordinates with validation and sanitization modules
- Exports `handlePresetButtonClick()` and related form manipulation functions

**file-writer.js** (enhanced):
- Added `createDeploymentInstructions()` function
- Generates plain text deployment guide with step-by-step instructions
- Includes guidance for Netlify, GitHub Pages, Vercel, and other static hosts
- Uses simple, non-technical language for beginners
- Added `createTextFile()` function for .txt file generation

## Browser Compatibility

- **Minimum Requirements**: Modern browsers with ES6+ support
- **Tested Browsers**: Chrome, Firefox, Safari, Edge
- **Required APIs**: Blob, URL.createObjectURL, Fetch, FormData

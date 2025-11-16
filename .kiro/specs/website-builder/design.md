# Design Document

## Overview

The Code-Free Website Builder is a client-side static application that transforms business information into professional landing pages. The system consists of an input form, a generator script, template files, and theme configurations. All processing occurs in the browser using vanilla JavaScript, with no server-side dependencies or external frameworks.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│                                                             │
│  ┌──────────────┐      ┌─────────────────┐                │
│  │ Input Form   │─────▶│ Generator Script│                │
│  │ (public/)    │      │ (public/js/)    │                │
│  └──────────────┘      └────────┬────────┘                │
│                                  │                          │
│                                  ▼                          │
│                        ┌─────────────────┐                 │
│                        │ Template Engine │                 │
│                        │ (in-memory)     │                 │
│                        └────────┬────────┘                 │
│                                  │                          │
│                                  ▼                          │
│                        ┌─────────────────┐                 │
│                        │ File Generator  │                 │
│                        └────────┬────────┘                 │
│                                  │                          │
│                                  ▼                          │
│                        ┌─────────────────┐                 │
│                        │ Generated Files │                 │
│                        │ (generated/)    │                 │
│                        └─────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
.
├── public/
│   ├── index.html              # Input form interface
│   ├── js/
│   │   ├── generator.js        # Main generation logic
│   │   ├── template-engine.js  # Template processing
│   │   └── file-writer.js      # File creation utilities
│   ├── templates/
│   │   └── base-template.html  # Base HTML structure
│   └── themes/
│       ├── classic.css         # Classic theme styles
│       └── kiroween.css        # Kiroween theme styles
├── generated/
│   ├── index.html              # Generated landing page
│   ├── styles.css              # Generated theme CSS
│   └── menu.json               # Generated menu data
└── .kiro/
    └── hooks/
        └── auto-generate.json  # Agent hook configuration
```

## Components and Interfaces

### 1. Input Form (public/index.html)

**Purpose**: Collect business information from users through a web form

**Key Elements**:
- Form fields for all business data (name, type, tagline, description, contacts)
- Dynamic menu item section with add/remove functionality
- Theme selector (radio buttons or dropdown)
- Submit button triggering generation
- Basic styling for usability

**Interface**:
```javascript
// Form data structure
{
  business_name: string,
  business_type: string,
  tagline: string,
  short_description: string,
  contact_whatsapp: string,
  instagram_handle: string,
  menu_items: Array<{name: string, price: string}>,
  theme_choice: 'classic' | 'kiroween'
}
```

### 2. Generator Script (public/js/generator.js)

**Purpose**: Orchestrate the website generation process

**Responsibilities**:
- Capture form submission event
- Validate form data
- Load base template
- Process template with user data
- Generate theme-specific CSS
- Create output files
- Provide user feedback

**Key Functions**:
```javascript
function handleFormSubmit(event)
function validateFormData(formData)
function generateWebsite(formData)
function loadTemplate()
function injectData(template, data)
function generateCSS(themeChoice)
function createOutputFiles(html, css, menuData, deploymentInstructions)
```

### 2a. Business Presets Module (public/js/presets.js)

**Purpose**: Provide default content templates for different business types

**Responsibilities**:
- Define preset data for each business type
- Provide interface to retrieve presets by business type
- Support both menu-based and non-menu businesses

**Data Model**:
```javascript
const businessPresets = {
  coffee_shop: {
    default_tagline: "Your Daily Dose of Happiness",
    default_short_description: "Artisan coffee and fresh pastries in a cozy atmosphere. We serve premium coffee beans sourced from local farms.",
    default_menu_items: [
      { name: "Espresso", price: "Rp 15,000" },
      { name: "Cappuccino", price: "Rp 25,000" },
      { name: "Latte", price: "Rp 28,000" },
      { name: "Croissant", price: "Rp 18,000" }
    ]
  },
  bakery: {
    default_tagline: "Freshly Baked Every Day",
    default_short_description: "Homemade breads, cakes, and pastries made with love. Using traditional recipes and quality ingredients.",
    default_menu_items: [
      { name: "Sourdough Bread", price: "Rp 35,000" },
      { name: "Chocolate Cake", price: "Rp 120,000" },
      { name: "Croissant", price: "Rp 15,000" },
      { name: "Cinnamon Roll", price: "Rp 20,000" }
    ]
  },
  barber_shop: {
    default_tagline: "Where Style Meets Precision",
    default_short_description: "Professional haircuts and grooming services for the modern gentleman. Walk-ins welcome.",
    default_menu_items: [
      { name: "Classic Haircut", price: "Rp 50,000" },
      { name: "Beard Trim", price: "Rp 30,000" },
      { name: "Hot Towel Shave", price: "Rp 45,000" },
      { name: "Hair + Beard Combo", price: "Rp 75,000" }
    ]
  },
  food_stall: {
    default_tagline: "Delicious & Affordable Street Food",
    default_short_description: "Authentic Indonesian street food made fresh daily. Quality meals at prices everyone can afford. Perfect for quick lunch or dinner.",
    default_menu_items: [
      { name: "Nasi Goreng", price: "Rp 15,000" },
      { name: "Mie Ayam", price: "Rp 12,000" },
      { name: "Sate Ayam", price: "Rp 18,000" },
      { name: "Es Teh Manis", price: "Rp 5,000" }
    ]
  },
  laundry_service: {
    default_tagline: "Clean Clothes, Fast Service",
    default_short_description: "Professional laundry service with same-day turnaround. We handle your clothes with care, using quality detergents for fresh, clean results every time.",
    default_menu_items: [
      { name: "Wash & Fold (per kg)", price: "Rp 8,000" },
      { name: "Wash & Iron (per kg)", price: "Rp 12,000" },
      { name: "Dry Clean (per item)", price: "Rp 25,000" },
      { name: "Express Service", price: "Rp 15,000" }
    ]
  },
  photographer_creator: {
    default_tagline: "Capturing Your Best Moments",
    default_short_description: "Professional photography and content creation services. Specializing in portraits, events, and social media content. Let's create something amazing together.",
    default_menu_items: [
      { name: "Portrait Session (1 hour)", price: "Rp 500,000" },
      { name: "Event Coverage (half day)", price: "Rp 1,500,000" },
      { name: "Social Media Package (10 photos)", price: "Rp 750,000" },
      { name: "Product Photography (per item)", price: "Rp 100,000" }
    ]
  }
};
```

**Key Functions**:
```javascript
function getPreset(businessType)
function hasMenuItems(businessType)
function applyPresetToForm(businessType)
```

### 2b. Form Controller (public/js/form-controller.js)

**Purpose**: Manage form interactions including preset application

**Responsibilities**:
- Handle "Use Preset" button clicks
- Populate form fields with preset data
- Manage menu items visibility for non-menu businesses
- Coordinate with validation and sanitization

**Key Functions**:
```javascript
function handlePresetButtonClick(event)
function populateFormWithPreset(preset)
function toggleMenuSection(visible)
function clearMenuItems()
function addMenuItemsFromPreset(menuItems)
```

**UI Flow**:
1. User selects business_type from dropdown
2. "Use Preset" button becomes visible/enabled
3. User clicks "Use Preset"
4. Form fields populate with preset data:
   - Tagline field fills with default_tagline
   - Description field fills with default_short_description
   - Menu items replace with default_menu_items (if applicable)
5. Helper text displays: "You can customize these after applying the preset"
6. User can edit any field
7. User submits form normally

### 3. Template Engine (public/js/template-engine.js)

**Purpose**: Process HTML templates with dynamic data injection

**Responsibilities**:
- Parse template placeholders
- Replace placeholders with actual data
- Handle conditional sections
- Process loops for menu items

**Placeholder Syntax**:
```
{{business_name}}
{{tagline}}
{{short_description}}
{{contact_whatsapp}}
{{instagram_handle}}
{{#menu_items}}
  {{name}} - {{price}}
{{/menu_items}}
```

**Key Functions**:
```javascript
function parseTemplate(template, data)
function replacePlaceholders(template, data)
function processLoop(template, arrayData, loopName)
```

### 4. File Writer (public/js/file-writer.js)

**Purpose**: Create and download generated files

**Responsibilities**:
- Create Blob objects from generated content
- Trigger browser downloads
- Handle file naming
- Manage file overwriting through re-download
- Generate deployment instructions

**Key Functions**:
```javascript
function createFile(content, filename, mimeType)
function downloadFile(blob, filename)
function createHTMLFile(content)
function createCSSFile(content)
function createJSONFile(content)
function createDeploymentInstructions()
function createTextFile(content)
```

**Deployment Instructions Generation**:

The `createDeploymentInstructions()` function generates a text file with step-by-step deployment guidance:

```javascript
function createDeploymentInstructions() {
  const instructions = `
DEPLOYMENT INSTRUCTIONS
=======================

Your website has been generated! You now have three files:
- index.html (your landing page)
- styles.css (your website styling)
- menu.json (your menu data)

HOW TO DEPLOY YOUR WEBSITE
===========================

Option 1: Netlify (Recommended - Easiest)
------------------------------------------
1. Go to https://app.netlify.com/drop
2. Drag and drop ALL THREE FILES (index.html, styles.css, menu.json) into the upload area
3. Wait a few seconds for the upload to complete
4. Netlify will give you a free website URL (like: https://your-site-name.netlify.app)
5. Share this URL with your customers!

Optional: You can change your site name in Netlify settings.

Option 2: GitHub Pages (Free)
------------------------------
1. Create a free GitHub account at https://github.com
2. Create a new repository (name it anything you like)
3. Upload all three files (index.html, styles.css, menu.json) to the repository
4. Go to repository Settings > Pages
5. Under "Source", select "main" branch and click Save
6. Your website will be live at: https://your-username.github.io/repository-name

Option 3: Other Static Hosts
-----------------------------
You can also use:
- Vercel (https://vercel.com)
- Cloudflare Pages (https://pages.cloudflare.com)
- Firebase Hosting (https://firebase.google.com/docs/hosting)

All of these services offer free hosting for static websites.
Simply upload your three files to any of these platforms.

UPDATING YOUR WEBSITE
======================
To update your website:
1. Go back to the website builder form
2. Make your changes
3. Click "Generate Website" again
4. Upload the new files to your hosting service (they will replace the old ones)

NEED HELP?
==========
- Make sure all three files are uploaded together
- Keep the filenames exactly as they are (index.html, styles.css, menu.json)
- If your website doesn't look right, try clearing your browser cache

Congratulations on your new website! 🎉
`;
  
  return instructions.trim();
}
```

**File Output Strategy**:
- Write deployment-instructions.txt to the /generated directory alongside other files
- Include in the same download flow as HTML, CSS, and JSON files
- Use plain text format for maximum compatibility
- Keep language simple and non-technical

### 5. Base Template (public/templates/base-template.html)

**Purpose**: Provide the HTML structure for generated websites

**Structure**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{business_name}}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>{{business_name}}</h1>
        <p class="tagline">{{tagline}}</p>
    </header>
    
    <main>
        <section class="about">
            <h2>About Us</h2>
            <p>{{short_description}}</p>
        </section>
        
        <section class="menu">
            <h2>Our Menu</h2>
            <ul class="menu-list">
                {{#menu_items}}
                <li>
                    <span class="item-name">{{name}}</span>
                    <span class="item-price">{{price}}</span>
                </li>
                {{/menu_items}}
            </ul>
        </section>
        
        <section class="contact">
            <h2>Get in Touch</h2>
            <div class="contact-links">
                <a href="https://wa.me/{{contact_whatsapp}}" class="whatsapp-link">
                    WhatsApp Us
                </a>
                <a href="https://instagram.com/{{instagram_handle}}" class="instagram-link">
                    Follow on Instagram
                </a>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 {{business_name}}. All rights reserved.</p>
    </footer>
</body>
</html>
```

### 6. Theme Files

**Classic Theme (public/themes/classic.css)**:
- Clean, professional design
- Light background with dark text
- Serif fonts for elegance
- Subtle shadows and borders
- Traditional color palette (blues, grays)

**Kiroween Theme (public/themes/kiroween.css)**:
- Dark, modern aesthetic
- Dark background with light text
- Sans-serif fonts
- Bold accent colors (oranges, purples)
- Halloween-inspired elements

**Common Responsive Rules**:
```css
/* Mobile-first base styles */
body { font-size: 16px; padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  body { padding: 2rem; }
  .menu-list { columns: 2; }
}

/* Desktop */
@media (min-width: 1024px) {
  body { max-width: 1200px; margin: 0 auto; }
}

/* Touch targets */
a, button { min-height: 44px; min-width: 44px; }
```

## Data Models

### FormData Model
```javascript
{
  business_name: string,        // Required, max 100 chars
  business_type: 'coffee_shop' | 'bakery' | 'barber_shop' | 'food_stall' | 'laundry_service' | 'photographer_creator',  // Required
  tagline: string,              // Required, max 150 chars
  short_description: string,    // Required, max 500 chars
  contact_whatsapp: string,     // Required, phone number format
  instagram_handle: string,     // Required, alphanumeric + underscore
  menu_items: MenuItem[],       // Optional for non-menu businesses, min 0 items
  theme_choice: 'classic' | 'kiroween'  // Required
}
```

### BusinessPreset Model
```javascript
{
  default_tagline: string,
  default_short_description: string,
  default_menu_items: MenuItem[]  // May be empty array for non-menu businesses
}
```

### MenuItem Model
```javascript
{
  name: string,    // Required, max 100 chars
  price: string    // Required, max 20 chars (allows currency symbols)
}
```

### GeneratedOutput Model
```javascript
{
  html: string,                    // Complete HTML document
  css: string,                     // Theme-specific styles
  menuJson: string,                // JSON stringified menu data
  deploymentInstructions: string   // Plain text deployment guide
}
```

## Non-Menu Business Handling

### Menu Section Visibility

**Dynamic Menu Section**:
- When user selects a business_type, check if it typically has menu items
- For laundry_service and photographer_creator, menu items are optional but still allowed
- Menu section remains visible but shows helper text: "Optional: Add service items if desired"
- If preset has no default_menu_items, menu section starts empty
- User can still add menu items manually if they want

**Implementation Strategy**:
```javascript
function updateMenuSectionVisibility(businessType) {
  const menuSection = document.getElementById('menu-section');
  const menuHelper = document.getElementById('menu-helper-text');
  
  const preset = getPreset(businessType);
  
  if (preset.default_menu_items.length === 0) {
    menuHelper.textContent = 'Optional: Add service items or packages if desired';
    menuHelper.style.display = 'block';
  } else {
    menuHelper.textContent = 'Add your menu items below';
    menuHelper.style.display = 'block';
  }
  
  // Menu section always visible, just guidance changes
  menuSection.style.display = 'block';
}
```

**Template Handling**:
- If menu_items array is empty, the menu section in generated HTML should be hidden or show "Contact us for pricing"
- Use conditional rendering in template engine

## Error Handling

### Validation Errors

**Form Validation**:
- Check all required fields are filled
- Validate phone number format for WhatsApp
- Validate Instagram handle format
- Menu items are optional (allow 0 items for non-menu businesses)
- Display inline error messages next to invalid fields
- Prevent form submission until all errors are resolved

**Error Display Strategy**:
```javascript
function displayError(fieldName, message) {
  // Add error class to field
  // Show error message below field
  // Focus on first error field
}

function clearErrors() {
  // Remove all error classes
  // Hide all error messages
}
```

### Generation Errors

**Template Loading Failures**:
- Display user-friendly error message
- Log technical details to console
- Provide retry option

**File Creation Failures**:
- Catch browser API errors
- Inform user of browser compatibility issues
- Suggest alternative browsers if needed

**Error Messages**:
```javascript
const ERROR_MESSAGES = {
  TEMPLATE_LOAD_FAILED: 'Unable to load template. Please refresh and try again.',
  INVALID_PHONE: 'Please enter a valid WhatsApp number (digits only).',
  INVALID_INSTAGRAM: 'Instagram handle can only contain letters, numbers, and underscores.',
  GENERATION_FAILED: 'Website generation failed. Please try again.',
  BROWSER_NOT_SUPPORTED: 'Your browser does not support file downloads. Please use a modern browser.',
  PRESET_LOAD_FAILED: 'Unable to load preset. Please try again.'
};
```

## Testing Strategy

### Manual Testing Checklist

**Form Functionality**:
- [ ] All input fields accept and display text correctly
- [ ] Business type dropdown shows all 6 options
- [ ] "Use Preset" button appears when business type is selected
- [ ] Clicking "Use Preset" populates form fields correctly
- [ ] Preset data can be edited after application
- [ ] Add menu item button creates new fields
- [ ] Remove menu item button deletes fields
- [ ] Menu section shows appropriate helper text for non-menu businesses
- [ ] Theme selector switches between options
- [ ] Form validation catches empty required fields
- [ ] Form validation catches invalid formats
- [ ] Submit button triggers generation

**Generation Process**:
- [ ] Classic theme generates correct CSS
- [ ] Kiroween theme generates correct CSS
- [ ] All user data appears in generated HTML
- [ ] Menu items render correctly in list (or hidden if empty)
- [ ] WhatsApp link formats correctly
- [ ] Instagram link formats correctly
- [ ] Files download with correct names
- [ ] deployment-instructions.txt file is created
- [ ] Deployment instructions contain correct content
- [ ] All 4 files (HTML, CSS, JSON, TXT) are generated

**Responsive Design**:
- [ ] Form displays correctly on mobile (320px)
- [ ] Form displays correctly on tablet (768px)
- [ ] Form displays correctly on desktop (1024px+)
- [ ] Generated site displays correctly on mobile
- [ ] Generated site displays correctly on tablet
- [ ] Generated site displays correctly on desktop
- [ ] Touch targets are at least 44px

**Browser Compatibility**:
- [ ] Works in Chrome/Edge (Chromium)
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] File downloads work in all browsers

### Test Data Sets

**Test Case 1: Coffee Shop (with preset)**
```javascript
{
  business_name: "Brew Haven",
  business_type: "coffee_shop",
  tagline: "Your Daily Dose of Happiness",  // From preset
  short_description: "Artisan coffee and fresh pastries in a cozy atmosphere. We serve premium coffee beans sourced from local farms.",  // From preset
  contact_whatsapp: "628123456789",
  instagram_handle: "brewhaven_cafe",
  menu_items: [  // From preset
    {name: "Espresso", price: "Rp 15,000"},
    {name: "Cappuccino", price: "Rp 25,000"},
    {name: "Latte", price: "Rp 28,000"},
    {name: "Croissant", price: "Rp 18,000"}
  ],
  theme_choice: "classic"
}
```

**Test Case 2: Barber Shop (with preset)**
```javascript
{
  business_name: "Sharp Cuts",
  business_type: "barber_shop",
  tagline: "Where Style Meets Precision",  // From preset
  short_description: "Professional haircuts and grooming services for the modern gentleman. Walk-ins welcome.",  // From preset
  contact_whatsapp: "628987654321",
  instagram_handle: "sharpcuts_barber",
  menu_items: [  // From preset
    {name: "Classic Haircut", price: "Rp 50,000"},
    {name: "Beard Trim", price: "Rp 30,000"},
    {name: "Hot Towel Shave", price: "Rp 45,000"},
    {name: "Hair + Beard Combo", price: "Rp 75,000"}
  ],
  theme_choice: "kiroween"
}
```

**Test Case 3: Food Stall (with preset)**
```javascript
{
  business_name: "Warung Makan Sederhana",
  business_type: "food_stall",
  tagline: "Delicious & Affordable Street Food",  // From preset
  short_description: "Authentic Indonesian street food made fresh daily. Quality meals at prices everyone can afford. Perfect for quick lunch or dinner.",  // From preset
  contact_whatsapp: "628111222333",
  instagram_handle: "warung_sederhana",
  menu_items: [  // From preset
    {name: "Nasi Goreng", price: "Rp 15,000"},
    {name: "Mie Ayam", price: "Rp 12,000"},
    {name: "Sate Ayam", price: "Rp 18,000"},
    {name: "Es Teh Manis", price: "Rp 5,000"}
  ],
  theme_choice: "classic"
}
```

**Test Case 4: Laundry Service (non-menu business with preset)**
```javascript
{
  business_name: "Fresh Laundry",
  business_type: "laundry_service",
  tagline: "Clean Clothes, Fast Service",  // From preset
  short_description: "Professional laundry service with same-day turnaround. We handle your clothes with care, using quality detergents for fresh, clean results every time.",  // From preset
  contact_whatsapp: "628444555666",
  instagram_handle: "fresh_laundry",
  menu_items: [  // From preset
    {name: "Wash & Fold (per kg)", price: "Rp 8,000"},
    {name: "Wash & Iron (per kg)", price: "Rp 12,000"},
    {name: "Dry Clean (per item)", price: "Rp 25,000"},
    {name: "Express Service", price: "Rp 15,000"}
  ],
  theme_choice: "classic"
}
```

**Test Case 5: Photographer (non-menu business with preset)**
```javascript
{
  business_name: "Capture Moments Studio",
  business_type: "photographer_creator",
  tagline: "Capturing Your Best Moments",  // From preset
  short_description: "Professional photography and content creation services. Specializing in portraits, events, and social media content. Let's create something amazing together.",  // From preset
  contact_whatsapp: "628777888999",
  instagram_handle: "capture_moments_id",
  menu_items: [  // From preset
    {name: "Portrait Session (1 hour)", price: "Rp 500,000"},
    {name: "Event Coverage (half day)", price: "Rp 1,500,000"},
    {name: "Social Media Package (10 photos)", price: "Rp 750,000"},
    {name: "Product Photography (per item)", price: "Rp 100,000"}
  ],
  theme_choice: "kiroween"
}
```

## Integration with Kiro Features

### Agent Hooks

**Auto-Generation Hook**:
- Trigger: Manual button click or file save event
- Action: Run generator script with current form data
- Location: `.kiro/hooks/auto-generate.json`

**Hook Configuration**:
```json
{
  "name": "Auto-Generate Website",
  "trigger": "manual",
  "description": "Generate website from current form data",
  "command": "node scripts/generate-from-hook.js"
}
```

### MCP Tool Integration

**Generation MCP Tool**:
- Tool name: `generate_website`
- Input: FormData object
- Output: Generated file paths
- Purpose: Allow programmatic website generation

**Tool Schema**:
```json
{
  "name": "generate_website",
  "description": "Generate a static website from business information",
  "inputSchema": {
    "type": "object",
    "properties": {
      "business_name": {"type": "string"},
      "business_type": {"type": "string"},
      "tagline": {"type": "string"},
      "short_description": {"type": "string"},
      "contact_whatsapp": {"type": "string"},
      "instagram_handle": {"type": "string"},
      "menu_items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "price": {"type": "string"}
          }
        }
      },
      "theme_choice": {"type": "string", "enum": ["classic", "kiroween"]}
    },
    "required": ["business_name", "business_type", "tagline", "short_description", "contact_whatsapp", "instagram_handle", "menu_items", "theme_choice"]
  }
}
```

### Steering Documentation

**Update Required Steering Files**:

1. **tech.md**: Add HTML/CSS/JS stack details
2. **structure.md**: Document public/ and generated/ directories
3. **product.md**: Describe website builder purpose and features

## Performance Considerations

**Optimization Strategies**:
- Inline critical CSS in generated HTML for faster initial render
- Minimize template size
- Use efficient string replacement algorithms
- Lazy load theme CSS files
- Cache template in memory after first load

**Expected Performance**:
- Form interaction: Instant (<50ms)
- Generation time: <500ms for typical input
- File download: Depends on browser, typically <100ms
- Generated page load: <1s on 3G connection

## Security Considerations

**Input Sanitization**:
- Escape HTML special characters in user input
- Prevent XSS through template injection
- Validate URL formats for social links
- Limit input lengths to prevent abuse

**Sanitization Function**:
```javascript
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function sanitizeURL(url, type) {
  if (type === 'whatsapp') {
    return url.replace(/[^0-9]/g, '');
  }
  if (type === 'instagram') {
    return url.replace(/[^a-zA-Z0-9_]/g, '');
  }
  return '';
}
```

**No Sensitive Data**:
- No authentication means no passwords
- No database means no data persistence
- All processing client-side means no server vulnerabilities
- Users responsible for their own generated files

## Accessibility

**WCAG 2.1 Compliance**:
- Semantic HTML elements (header, main, section, footer)
- Proper heading hierarchy (h1, h2)
- Alt text for any images (if added later)
- Sufficient color contrast (4.5:1 minimum)
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus indicators on all interactive elements

**Generated HTML Accessibility**:
```html
<a href="https://wa.me/{{contact_whatsapp}}" 
   class="whatsapp-link"
   aria-label="Contact us on WhatsApp">
    WhatsApp Us
</a>
```

## Implementation Notes

### Integration with Existing Flow

**Preset Integration**:
1. Presets module loads independently
2. Form controller imports presets module
3. Generator script remains unchanged (receives form data as before)
4. Validation and sanitization apply to preset data same as manual input
5. No breaking changes to existing generation flow

**Deployment Instructions Integration**:
1. File writer creates deployment-instructions.txt alongside other files
2. Generator script calls `createDeploymentInstructions()` after creating HTML/CSS/JSON
3. All 4 files written to /generated directory
4. No changes to download mechanism (each file downloads separately)
5. Future enhancement: Bundle all 4 files into a ZIP for single download

**Non-Menu Business Support**:
1. Template engine checks if menu_items array is empty
2. If empty, menu section in generated HTML shows "Contact us for custom pricing" or is hidden
3. Form validation updated to allow 0 menu items
4. No breaking changes to existing menu-based businesses

### File Organization

```
public/
├── js/
│   ├── generator.js           # Existing - minimal changes
│   ├── template-engine.js     # Existing - add empty array handling
│   ├── file-writer.js         # Existing - add createDeploymentInstructions()
│   ├── validation.js          # Existing - update menu validation
│   ├── sanitization.js        # Existing - no changes
│   ├── presets.js             # NEW - business presets data
│   └── form-controller.js     # NEW - preset application logic
```

## Future Enhancements

**Potential Features** (not in current scope):
- Additional themes
- Image upload for logo/photos
- Business hours section
- Location/map integration
- Gallery section
- Testimonials section
- Multi-page support
- Export as ZIP file (bundle all 4 files)
- Preview before download
- Custom color picker
- Font selection
- Social media meta tags
- More business type presets
- Customizable preset templates
- Multi-language support for deployment instructions

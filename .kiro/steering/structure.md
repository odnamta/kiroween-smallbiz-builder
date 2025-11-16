# Project Structure

## Directory Organization

```
.
├── public/              # Application source files
│   ├── index.html       # Main form interface
│   ├── js/              # JavaScript modules
│   ├── templates/       # HTML templates
│   └── themes/          # CSS theme files
├── generated/           # Output directory for generated websites
├── .kiro/               # Kiro configuration
│   ├── specs/           # Feature specifications
│   ├── steering/        # Project documentation
│   └── hooks/           # Agent hooks (future)
└── test-*.html          # Manual test files
```

## Code Organization

### Public Directory (`public/`)

The `public/` directory contains all application source code and assets:

- **index.html**: Main entry point with the input form interface
  - Contains form fields for business information
  - Business type dropdown with 6 options
  - "Use Preset" button for quick form filling
  - Includes dynamic menu item management UI
  - Theme selector interface
  - Links to all JavaScript modules

- **js/**: JavaScript modules (all use vanilla ES6+)
  - `generator.js` - Main orchestration script that handles form submission and coordinates generation
  - `template-engine.js` - Processes HTML templates with placeholder replacement and loop handling
  - `file-writer.js` - Creates Blob objects, triggers browser downloads, and generates deployment instructions
  - `validation.js` - Validates form inputs (required fields, formats, constraints)
  - `sanitization.js` - Sanitizes user input to prevent XSS attacks
  - `presets.js` - Defines business presets with default content for 6 business types
  - `form-controller.js` - Manages preset application and form interactions

- **templates/**: HTML template files
  - `base-template.html` - Base HTML structure for generated websites with placeholders

- **themes/**: CSS theme files
  - `classic.css` - Professional light theme with blues and grays
  - `kiroween.css` - Dark Halloween-inspired theme with oranges and purples

### Generated Directory (`generated/`)

The `generated/` directory is the output location for user-generated websites:

- **index.html**: Generated landing page with user's business information
- **styles.css**: Theme-specific CSS copied from selected theme
- **menu.json**: JSON file containing menu items data
- **deployment-instructions.txt**: Plain text file with step-by-step deployment guidance for static hosting platforms (Netlify, GitHub Pages, Vercel, etc.)
- **.gitkeep**: Placeholder to maintain directory in version control

**Note**: Files in this directory are overwritten each time the user generates a new website.

### Kiro Configuration (`.kiro/`)

- **specs/website-builder/**: Feature specification documents
  - `requirements.md` - EARS-formatted requirements
  - `design.md` - Architecture and component design
  - `tasks.md` - Implementation task list

- **steering/**: Project documentation
  - `tech.md` - Technology stack and development guide
  - `structure.md` - This file - project structure documentation
  - `product.md` - Product overview and feature descriptions

- **hooks/**: Agent hooks for automation (planned, not yet implemented)

### Test Files

Manual test files in the root directory:
- `test-*.html` - Various test pages for validating functionality
- Used for manual browser-based testing of individual components

## Naming Conventions

- **Files**: kebab-case (e.g., `template-engine.js`, `base-template.html`)
- **Functions**: camelCase (e.g., `handleFormSubmit`, `parseTemplate`)
- **Classes**: Not used (functional programming approach)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_MENU_ITEMS`, `ERROR_MESSAGES`)
- **CSS Classes**: kebab-case (e.g., `.menu-list`, `.contact-links`)

## Module Guidelines

### JavaScript Modules

All JavaScript files follow these patterns:

1. **Module Structure**:
   - Functions are defined and then exported at the end
   - No classes or constructors
   - Pure functions where possible

2. **Import/Export**:
   - Use ES6 module syntax
   - Export functions explicitly at module end
   - Import only what's needed from other modules

3. **Example Pattern**:
```javascript
// Module: template-engine.js

function parseTemplate(template, data) {
  // Implementation
}

function replacePlaceholders(template, data) {
  // Implementation
}

// Export at end
export { parseTemplate, replacePlaceholders };
```

### HTML Templates

- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Use `{{placeholder}}` syntax for variable injection
- Use `{{#array}}...{{/array}}` syntax for loops

### CSS Themes

- Mobile-first responsive design
- Use CSS custom properties for theme colors
- Maintain 4.5:1 contrast ratio for accessibility
- Ensure touch targets are minimum 44px
- Include breakpoints at 768px (tablet) and 1024px (desktop)

## Configuration

No configuration files required. The application is entirely self-contained and runs in the browser without external configuration.

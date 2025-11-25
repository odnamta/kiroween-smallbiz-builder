# Testing Guide

## Quick Start

```bash
# Serve the application locally
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/public/
```

## Manual Testing Checklist

### Form Functionality
- [ ] Select business type from dropdown
- [ ] Click "Use Haunted Preset" to auto-fill form
- [ ] Verify tagline, description, and menu items populate
- [ ] Edit any field after preset application
- [ ] Add/remove menu items
- [ ] Toggle between Classic and Kiroween themes
- [ ] Submit form to generate website

### Live Preview
- [ ] Preview updates automatically as you type
- [ ] Theme changes reflect in preview immediately
- [ ] Menu items appear in preview

### Generation Output
- [ ] 4 files download: index.html, styles.css, menu.json, deployment-instructions.txt
- [ ] Generated HTML contains all business info
- [ ] CSS matches selected theme
- [ ] Deployment instructions are readable

### Responsive Design
- [ ] Form works on mobile (320px)
- [ ] Form works on tablet (768px)
- [ ] Form works on desktop (1024px+)
- [ ] Generated site is responsive

## Test Files

Individual component tests are in the root directory:
- `test-preview.html` - Live preview functionality
- `test-validation.html` - Form validation
- `test-sanitization.html` - XSS protection
- `test-template-engine.html` - Template processing

## MCP Server Testing

```bash
cd mcp-server
node test-mcp-server.js
```

# Product Overview – Code-Free Website Builder

## Purpose

The Code-Free Website Builder is a browser-based tool that enables small business owners with no coding experience to generate professional landing pages instantly. Users fill out a simple form with their business information, select a theme, and receive a complete static website ready to deploy.

## Goal

Help non-technical small business owners in Indonesia and Southeast Asia generate a simple, professional website (landing page + menu) by filling out a form. The system uses Kiro's agents, specs, hooks, and MCP to auto-generate a fully structured static website.

## Target Users

### Primary Audience: Small Business Owners

**Demographics**:
- Coffee shop owners
- Bakery operators
- Barber shop owners
- Food stall vendors
- Home-based businesses
- Artisan and craft sellers

**Characteristics**:
- No coding or technical experience
- Limited budget for web development
- Need online presence quickly
- Want professional-looking website
- Primarily mobile users
- Located in Indonesia and Southeast Asia

**Pain Points**:
- Cannot afford professional web developers
- Don't have time to learn web development
- Intimidated by website builders like WordPress or Wix
- Need something simple that "just works"
- Want to update menu/prices easily

**User Goals**:
- Create a landing page in under 10 minutes
- Display business name, description, and menu
- Share WhatsApp and Instagram contact info
- Choose a theme that matches their brand
- Download and deploy website files

## Core Features

### 1. Simple Input Form
- **Business Information**: Name, type (6 options available), tagline, description
- **Contact Details**: WhatsApp number, Instagram handle
- **Menu Builder**: Dynamic add/remove menu items with name and price (optional for some business types)
- **Business Presets**: One-click preset application for quick form filling
- **Theme Selector**: Choose between Classic or Kiroween themes
- **Validation**: Real-time input validation with helpful error messages
- **Mobile-Friendly**: Responsive form layout works on all devices

### 2. Instant Website Generation
- **One-Click Generation**: Submit form to generate complete website
- **Four Output Files**:
  - `/generated/index.html` - Complete landing page
  - `/generated/styles.css` - Theme-specific styling
  - `/generated/menu.json` - Structured menu data
  - `/generated/deployment-instructions.txt` - Step-by-step deployment guide
- **Automatic Download**: Files download immediately to user's device
- **File Overwriting**: Generate multiple times to update website

### 3. Professional Themes

**Classic Theme**:
- Light, professional design
- Blue and gray color palette
- Serif fonts for elegance
- Subtle shadows and borders
- Perfect for traditional businesses

**Kiroween Theme**:
- Dark mode background (#0B0B0C)
- Orange accent (#FF8A00)
- Purple highlight (#6C5CE7)
- Modern, bold aesthetic
- Halloween-inspired elements
- Sans-serif typography

### 4. Responsive Design
- Mobile-first approach
- Adapts to screens from 320px to 1920px wide
- Touch-friendly buttons (minimum 44px)
- Optimized for mobile viewing
- Works on all modern browsers

### 5. Security & Accessibility
- Input sanitization prevents XSS attacks
- WCAG 2.1 compliant generated websites
- Semantic HTML structure
- Proper color contrast ratios
- Keyboard navigation support
- ARIA labels for screen readers

### 6. Business Presets
- **Quick Start Templates**: Pre-filled content for 6 business types
- **Supported Business Types**:
  - **Coffee Shop**: Coffee-focused menu with beverages and pastries
  - **Bakery**: Baked goods including breads, cakes, and pastries
  - **Barber Shop**: Grooming services like haircuts, beard trims, and shaves
  - **Food Stall**: Affordable Southeast Asian street food menu
  - **Laundry Service**: Laundry and dry cleaning service packages
  - **Photographer/Creator**: Photography sessions and content creation packages
- **One-Click Application**: Click "Use Preset" to auto-fill form fields
- **Fully Customizable**: Edit any preset field before generating
- **Indonesian Rupiah Pricing**: All presets use Rp currency format
- **Smart Menu Handling**: Menu items optional for service-based businesses

### 7. Deployment Helper
- **Beginner-Friendly Instructions**: Simple, non-technical language
- **Multiple Hosting Options**: 
  - Netlify drag-and-drop (recommended)
  - GitHub Pages
  - Vercel, Cloudflare Pages, Firebase Hosting
- **Step-by-Step Guidance**: Numbered steps for each platform
- **Update Instructions**: How to regenerate and redeploy
- **Troubleshooting Tips**: Common issues and solutions
- **Automatic Generation**: Instructions file created with every website

## Key Features Summary

✅ **No Account Required**: Use immediately without registration
✅ **No Installation**: Runs entirely in browser
✅ **No Backend**: Pure client-side application
✅ **No Cost**: Completely free to use
✅ **Instant Results**: Generate website in seconds
✅ **Professional Output**: Clean, modern designs
✅ **Mobile Optimized**: Perfect for mobile-first businesses
✅ **Easy Updates**: Regenerate anytime with new information

## Technical Constraints

- **No Authentication**: No login or user accounts (MVP)
- **No Database**: Static generation only, no data persistence
- **No Server**: Entirely client-side, browser-based
- **Framework-Free**: Vanilla JavaScript, HTML, CSS only
- **Mobile-First**: Responsive design prioritizes mobile experience
- **Accessibility**: WCAG 2.1 Level AA compliance

## Kiro Integration

This project showcases deep Kiro usage:
- **Specs**: Complete requirements, design, and task documentation
- **Steering Docs**: Product, structure, and tech documentation
- **Agent Hooks**: Planned for auto-generation workflows
- **MCP Tool**: Planned for programmatic website generation

## Use Cases

### Use Case 1: Coffee Shop Owner (Using Preset)
Maria owns a small coffee shop and wants an online presence. She selects "Coffee Shop" from the business type dropdown and clicks "Use Preset". The form instantly fills with a coffee-themed tagline, description, and menu items. She customizes the business name, adds her WhatsApp number and Instagram handle, selects the Classic theme, and generates her website in under 3 minutes. She follows the deployment-instructions.txt file to upload to Netlify and shares the link with customers.

### Use Case 2: Barber Shop (Using Preset)
Ahmad runs a barber shop and needs to showcase his services. He selects "Barber Shop" and applies the preset, which fills in grooming services. He uses the Kiroween theme for a modern look and customizes the prices. After generating, he reads the deployment instructions and uploads his site to GitHub Pages. He updates his Instagram bio with the website link.

### Use Case 3: Home Bakery (Manual Entry)
Siti bakes cakes from home and wants to display her products online. She manually enters her bakery name, description, and custom menu of specialty cakes with prices. She regenerates the website weekly when she updates her offerings, following the same deployment steps each time.

### Use Case 4: Food Stall Vendor (Using Preset)
Budi runs a street food stall and wants to reach more customers. He selects "Food Stall" and applies the preset with affordable Indonesian dishes. He edits the menu to match his actual offerings, adds his WhatsApp for orders, and generates the site. The deployment instructions help him publish to Netlify for free.

### Use Case 5: Laundry Service (Service-Based Business)
Dewi operates a laundry service. She selects "Laundry Service" and applies the preset, which includes service packages instead of food items. She customizes the pricing and contact info, generates the website, and deploys it following the simple instructions provided.

## How to Use Presets

1. **Select Business Type**: Choose from the dropdown (coffee_shop, bakery, barber_shop, food_stall, laundry_service, photographer_creator)
2. **Click "Use Preset"**: Button appears after selecting business type
3. **Review Auto-Filled Content**: Form populates with:
   - Default tagline relevant to your business
   - Professional description
   - Sample menu items or service packages (with Rp pricing)
4. **Customize as Needed**: All fields remain editable - change anything you want
5. **Add Contact Info**: Enter your WhatsApp number and Instagram handle
6. **Generate Website**: Click submit to create your site with deployment instructions

## Future Enhancements

**Potential Features** (not in current scope):
- Additional themes (minimalist, colorful, elegant)
- More business type presets (restaurant, salon, gym, etc.)
- Image upload for logo and product photos
- Business hours section
- Location/map integration
- Gallery section for photos
- Customer testimonials
- Multi-page support (about, menu, contact pages)
- Export as ZIP file (bundle all files)
- Live preview before download
- Custom color picker
- Font selection
- Social media meta tags for sharing
- Direct deploy integration (one-click deploy to Netlify/Vercel)

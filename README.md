# 🎃 Kiroween Website Builder

> **Conjure a professional landing page for your business in minutes — no coding required!**

A spooky-themed, browser-based website generator built for the [Kiroween Hackathon 2025](https://kiroween.devpost.com). This tool enables small business owners with zero coding experience to create professional, mobile-responsive landing pages instantly.

![Kiroween Builder](https://img.shields.io/badge/Hackathon-Kiroween%202025-orange?style=for-the-badge)
![Category](https://img.shields.io/badge/Category-Costume%20Contest-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- **🎃 Haunted UI** — Spooky, Halloween-themed interface with floating ghosts, flickering effects, and eerie animations
- **👁️ Live Preview** — See your website update in real-time as you type
- **🧙 Business Presets** — One-click templates for 6 business types with "haunted mode" content
- **🌙 Kiroween Theme** — Dark, modern design with orange/purple accents and spooky micro-interactions
- **📱 Mobile-First** — Responsive design that works beautifully on all devices
- **🔒 Secure** — XSS-protected input sanitization
- **♿ Accessible** — WCAG 2.1 compliant with proper ARIA labels
- **📦 Zero Dependencies** — Pure vanilla JavaScript, HTML, and CSS

## 🚀 Quick Start

```bash
# No installation required! Just open in browser:
open public/index.html

# Or serve locally:
python -m http.server 8000
# Then visit http://localhost:8000/public/
```

## 🎬 Demo

1. Select a business type (Coffee Shop, Bakery, Barber, etc.)
2. Click **"🎃 Use Haunted Preset"** for spooky sample content
3. Customize your business details
4. Watch the **Live Preview** update in real-time
5. Click **"Generate My Haunted Website"**
6. Download your 4 files and deploy!


## 🛠️ How Kiro Was Used

This project showcases deep integration with Kiro's AI-powered development features:

### 📋 Spec-Driven Development

We used Kiro's spec system to plan and implement features systematically:

```
.kiro/specs/website-builder/
├── requirements.md    # EARS-formatted acceptance criteria
├── design.md          # Architecture and component design
└── tasks.md           # Implementation task breakdown
```

**How it helped:** The spec-driven approach let us define clear requirements upfront, then have Kiro implement each task methodically. This was especially valuable for complex features like the template engine and form validation — we could iterate on the design before writing code.

### 📚 Steering Documents

Four steering docs guide Kiro's behavior throughout the project:

| Document | Purpose |
|----------|---------|
| `product.md` | Product vision, user personas, feature descriptions |
| `tech.md` | Technology stack, commands, architecture patterns |
| `structure.md` | File organization, naming conventions, module guidelines |
| `personality.md` | **Haunted Mode** — controls spooky tone for generated content |

**The `personality.md` steering is key for Costume Contest:** It defines "haunted mode" rules that generate playfully spooky taglines and descriptions while keeping content business-appropriate. Think Addams Family, not horror movie.

### 🪝 Agent Hooks

We implemented a manual hook for website generation:

```json
// .kiro/hooks/generate-website.kiro.hook
{
  "name": "Generate Website (Hook)",
  "when": { "type": "manual" },
  "then": {
    "type": "askAgent",
    "prompt": "Generate a website using the generate_website MCP tool..."
  }
}
```

**Use case:** Click the hook to generate a sample website programmatically, useful for testing and demos.

### 🔌 MCP (Model Context Protocol)

We built a custom MCP server that exposes website generation as a tool:

```javascript
// mcp-server/website-generator-server.js
{
  name: 'generate_website',
  description: 'Generate a static website from business information',
  inputSchema: { /* business_name, tagline, menu_items, etc. */ }
}
```

**Why MCP matters:** This enables programmatic website generation from any MCP-compatible client. Kiro can call `generate_website` directly to create sites without using the UI — powerful for automation and batch generation.

### 💬 Vibe Coding Highlights

Key conversations with Kiro that shaped the project:

1. **"Make the form spooky for Costume Contest"** — Kiro added floating ghost particles, flickering title effects, and eerie hover states
2. **"Add live preview that updates as I type"** — Implemented debounced auto-preview with fallback rendering
3. **"Create haunted presets for each business type"** — Generated playfully dark taglines like "Coffee so dark it might wake the dead"


## 🎨 Costume Contest: Haunting UI Elements

This project was built for the **Costume Contest** category. Here's what makes our UI spooky:

### Visual Effects
- **Floating ghost particles** — 👻🦇🎃💀🕷️ drift up the screen
- **Flickering title** — "Kiroween Builder" flickers like a haunted sign
- **Pulsing glows** — Orange and purple gradients pulse in the background
- **Spiderweb corners** — 🕸️ decorations on form cards
- **Eerie hover states** — Inputs glow purple on hover, orange on focus

### Kiroween Theme (Generated Sites)
- **Dark mode** with #0a0a0f background
- **Orange accent** (#ff6b35) with text-shadow glow
- **Purple highlights** (#9b59b6) for secondary elements
- **Animated menu items** — 🎃 slides in on hover
- **Shimmer effects** — Gradient animations on headers/footers

### Haunted Mode Content
Toggle "Haunted" tone to generate spooky-but-professional copy:

| Business | Normal | Haunted |
|----------|--------|---------|
| Coffee Shop | "Your daily dose of fresh coffee" | "Coffee so dark it might wake the dead" |
| Bakery | "Fresh-baked goodness every day" | "Baked fresh daily. Some say our recipes are centuries old." |
| Barber | "Sharp cuts, smooth fades" | "A cut so sharp you'll forget who you were" |

## 📁 Project Structure

```
.
├── public/                 # Application source
│   ├── index.html          # Main form with spooky UI
│   ├── js/                 # JavaScript modules
│   │   ├── generator.js    # Main orchestration
│   │   ├── preview.js      # Live preview with auto-update
│   │   ├── template-engine.js
│   │   ├── validation.js
│   │   ├── sanitization.js
│   │   ├── presets.js      # Business presets
│   │   └── form-controller.js
│   ├── templates/          # HTML templates
│   └── themes/             # CSS themes (classic, kiroween)
├── mcp-server/             # MCP server for programmatic generation
├── generated/              # Output directory
└── .kiro/                  # Kiro configuration
    ├── specs/              # Feature specifications
    ├── steering/           # Steering documents
    ├── hooks/              # Agent hooks
    └── settings/           # MCP configuration
```

## 🎯 Target Users

Small business owners in Indonesia and Southeast Asia who need an online presence but lack technical skills:

- ☕ Coffee shop owners
- 🥐 Bakery operators  
- 💈 Barber shops
- 🍜 Food stall vendors
- 🧺 Laundry services
- 📸 Photographers/creators

## 🌐 Deployment

Generated websites can be deployed to any static hosting:

1. **Netlify** (recommended) — Drag & drop the `generated/` folder
2. **GitHub Pages** — Push to a repo and enable Pages
3. **Vercel** — Import and deploy
4. **Cloudflare Pages** — Connect repo or upload

The `deployment-instructions.txt` file included with each generation provides step-by-step guidance.


## 🧪 Testing

Manual testing files are included in the root directory:

```bash
# Open any test file in browser
open test-preview.html
open test-validation.html
open test-sanitization.html
```

## 🔧 Technical Details

- **No build system** — Pure static application
- **No dependencies** — Vanilla JS, HTML, CSS only
- **ES6+ modules** — Modern JavaScript patterns
- **Browser APIs** — Blob, URL.createObjectURL, Fetch
- **Accessibility** — WCAG 2.1 Level AA compliant

## 📜 License

MIT License — see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

- Built with [Kiro](https://kiro.dev) — AI-powered IDE
- Created for [Kiroween Hackathon 2025](https://kiroween.devpost.com)
- Inspired by small business owners who deserve great websites

---

<p align="center">
  <strong>🎃 Happy Haunting! 👻</strong>
</p>

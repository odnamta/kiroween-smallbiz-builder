# 👻 GhostHost - Spooky Website Builder

> **Conjure a hauntingly beautiful website for your business in minutes — no coding required!**

A spooky-themed, browser-based website generator built for the [Kiroween Hackathon 2025](https://kiroween.devpost.com). GhostHost enables small business owners with zero coding experience to create professional, mobile-responsive landing pages instantly.

![Kiroween Builder](https://img.shields.io/badge/Hackathon-Kiroween%202025-orange?style=for-the-badge)
![Category](https://img.shields.io/badge/Category-Costume%20Contest-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- **👻 Spooky Splash Screen** — Dramatic animated intro that sets the haunted mood
- **🎃 Haunted UI** — Floating ghosts, flickering effects, eerie animations throughout
- **👁️ Live Preview** — See your website update in real-time as you type
- **🧙 Haunted Presets** — One-click templates with playfully spooky content
- **🌙 Kiroween Theme** — Dark, modern design with orange/purple accents
- **📱 Mobile-First** — Responsive design that works beautifully on all devices
- **🚀 Quick Start Guide** — 3-step visual guide for new users
- **❓ FAQ Section** — Common questions answered inline
- **🔒 Secure** — XSS-protected input sanitization
- **♿ Accessible** — WCAG 2.1 compliant
- **📦 Zero Dependencies** — Pure vanilla JavaScript, HTML, and CSS

## 🚀 Quick Start

```bash
# No installation required! Just serve locally:
python3 -m http.server 8000

# Open in browser:
open http://localhost:8000/public/
```

## 🎬 Demo Flow

1. **Watch the spooky splash screen** — Ghost animation welcomes you
2. **Select a business type** — Coffee Shop, Bakery, Barber, etc.
3. **Click "🎃 Use Haunted Preset"** — Auto-fills with spooky content
4. **Watch the Live Preview** — Updates as you type
5. **Click "Generate My Haunted Website"** — Downloads 4 files
6. **Deploy to Netlify** — Drag & drop, get a live URL!


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

**Impact:** The spec-driven approach let us define clear requirements upfront, then have Kiro implement each task methodically. This was especially valuable for complex features like the template engine and form validation.

### 📚 Steering Documents

Four steering docs guide Kiro's behavior throughout the project:

| Document | Purpose |
|----------|---------|
| `product.md` | Product vision, user personas, feature descriptions |
| `tech.md` | Technology stack, commands, architecture patterns |
| `structure.md` | File organization, naming conventions, module guidelines |
| `personality.md` | **Haunted Mode** — controls spooky tone for generated content |

**The `personality.md` steering is key for Costume Contest:** It defines "haunted mode" rules that generate playfully spooky taglines and descriptions while keeping content business-appropriate.

### 🪝 Agent Hooks

We implemented hooks for automated workflows:

```json
// .kiro/hooks/generate-website.kiro.hook
{
  "name": "Generate Website (Hook)",
  "when": { "type": "manual" },
  "then": { "type": "askAgent", "prompt": "Generate a website using MCP..." }
}
```

### 🔌 MCP (Model Context Protocol)

Custom MCP server exposes website generation as a tool:

```javascript
// mcp-server/website-generator-server.js
{
  name: 'generate_website',
  description: 'Generate a static website from business information',
  inputSchema: { /* business_name, tagline, menu_items, etc. */ }
}
```

**Why MCP matters:** Enables programmatic website generation from any MCP-compatible client — powerful for automation and batch generation.

### 💬 Vibe Coding Highlights

Key conversations with Kiro that shaped the project:

1. **"Make the form spooky for Costume Contest"** — Added floating ghosts, flickering effects, eerie hover states
2. **"Add a dramatic splash screen"** — Created animated ghost intro with loading bar
3. **"Create haunted presets"** — Generated playfully dark taglines like "Coffee so dark it might wake the dead"


## 🎨 Costume Contest: Haunting UI Elements

This project was built for the **Costume Contest** category. Here's what makes our UI spooky:

### Splash Screen
- **Floating ghost animation** with pulsing glow
- **Flickering "GhostHost" title** in Creepster font
- **Animated loading bar** that builds anticipation
- **Smooth fade transition** to main app

### Form Interface
- **Floating particles** — 👻🦇🎃💀🕷️ drift across the screen
- **Spiderweb corners** — 🕸️ decorations on cards
- **Eerie hover states** — Purple glow on hover, orange on focus
- **Flickering header** — Title pulses like a haunted sign

### Generated Websites (Kiroween Theme)
- **Dark mode** with #0a0a0f background
- **Orange accent** (#ff6b35) with text-shadow glow
- **Animated menu items** — 🎃 slides in on hover
- **Shimmer effects** — Gradient animations on headers

### Haunted Mode Content

| Business | Normal | Haunted |
|----------|--------|---------|
| Coffee Shop | "Your daily dose of fresh coffee" | "Coffee so dark it might wake the dead" |
| Bakery | "Fresh-baked goodness every day" | "Baked fresh daily. Some say our recipes are centuries old." |
| Barber | "Sharp cuts, smooth fades" | "A cut so sharp you'll forget who you were" |
| Laundry | "Clean clothes, fast service" | "Your stains will vanish without a trace. No questions asked." |

## 📁 Project Structure

```
.
├── public/                 # Application source
│   ├── index.html          # Main form with spooky UI + splash screen
│   ├── js/                 # JavaScript modules
│   │   ├── generator.js    # Main orchestration
│   │   ├── preview.js      # Live preview with auto-update
│   │   ├── presets.js      # Haunted business presets
│   │   ├── ai-helpers.js   # Auto-generate content
│   │   └── ...
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

Small business owners in Indonesia and Southeast Asia:

- ☕ Coffee shop owners
- 🥐 Bakery operators  
- 💈 Barber shops
- 🍜 Food stall vendors
- 🧺 Laundry services
- 📸 Photographers/creators

## 🌐 Deployment

Generated websites can be deployed to any static hosting:

1. **Netlify** (recommended) — Drag & drop the files
2. **GitHub Pages** — Push to a repo and enable Pages
3. **Vercel** — Import and deploy

The `deployment-instructions.txt` file provides step-by-step guidance.

## 🧪 Testing

```bash
python3 -m http.server 8000
open http://localhost:8000/public/
```

## 📜 License

MIT License — see [LICENSE](LICENSE) file.

---

<p align="center">
  <strong>👻 Happy Haunting! 🎃</strong><br>
  <em>Built with Kiro for Kiroween Hackathon 2025</em>
</p>

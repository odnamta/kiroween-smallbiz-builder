# 👻 GhostHost - Spooky Website Builder

> **Conjure a hauntingly beautiful website for your business in minutes — no coding required!**

A spooky-themed, browser-based website generator built for the [Kiroween Hackathon 2025](https://kiroween.devpost.com). GhostHost enables small business owners with zero coding experience to create professional, mobile-responsive landing pages instantly.

![Hackathon](https://img.shields.io/badge/Hackathon-Kiroween%202025-orange?style=for-the-badge)
![Category](https://img.shields.io/badge/Category-Costume%20Contest-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- 👻 **Spooky Splash Screen** — Dramatic animated intro that sets the haunted mood
- 📦 **ZIP Export** — Single file download containing all website files
- 🎃 **Haunted UI** — Floating ghosts, flickering effects, eerie animations
- 👁️ **Live Preview** — See your website update in real-time as you type
- 🧙 **Haunted Presets** — One-click templates with playfully spooky content
- 🌙 **Kiroween Theme** — Dark, modern design with orange/purple accents
- 📱 **Mobile-First** — Responsive design that works on all devices
- 🚀 **Quick Start Guide** — 3-step visual guide for new users
- ❓ **FAQ Section** — Common questions answered inline
- 🔒 **Secure** — XSS-protected input sanitization
- ♿ **Accessible** — WCAG 2.1 compliant

## 🚀 Quick Start

**Live Demo:** [https://ghosthost.netlify.app/](https://ghosthost.netlify.app/)

### Run Locally

```bash
# Serve locally for development:
python3 -m http.server 8000

# Open in browser:
open http://localhost:8000/public/
```

## 🎬 Demo Flow

1. Watch the **spooky splash screen** — Ghost animation welcomes you
2. Select a **business type** — Coffee Shop, Bakery, Barber, etc.
3. Click **"Use Haunted Preset"** — Auto-fills with spooky content
4. Watch the **Live Preview** — Updates as you type
5. Click **"Generate"** — Downloads single ZIP file
6. **Deploy to Netlify** — Unzip, drag & drop, get a live URL!


## 🛠️ How Kiro Was Used

This project showcases deep integration with Kiro's AI-powered development features:

### 📋 Spec-Driven Development

```
.kiro/specs/website-builder/
├── requirements.md    # EARS-formatted acceptance criteria
├── design.md          # Architecture and component design
└── tasks.md           # Implementation task breakdown
```

### 📚 Steering Documents

| Document | Purpose |
|----------|---------|
| `product.md` | Product vision, user personas, features |
| `tech.md` | Technology stack, architecture patterns |
| `structure.md` | File organization, naming conventions |
| `personality.md` | **Haunted Mode** — spooky tone for content |

### 🪝 Agent Hooks

```json
// .kiro/hooks/generate-website.kiro.hook
{
  "name": "Generate Website (Hook)",
  "when": { "type": "manual" },
  "then": { "type": "askAgent", "prompt": "Generate website using MCP..." }
}
```

### 🔌 MCP Server

Custom MCP server for programmatic website generation:

```javascript
// mcp-server/website-generator-server.js
{ name: 'generate_website', inputSchema: { /* business info */ } }
```

## 🎨 Costume Contest: Haunting UI

### Splash Screen
- Floating ghost animation with pulsing glow
- Flickering "GhostHost" title in Creepster font
- Animated loading bar

### Form Interface
- Floating particles: 👻🦇🎃💀🕷️
- Spiderweb corners on cards
- Eerie hover states (purple/orange glows)

### Haunted Mode Content

| Business | Haunted Tagline |
|----------|-----------------|
| Coffee Shop | "Coffee so dark it might wake the dead" |
| Bakery | "Some say our recipes are centuries old" |
| Barber | "A cut so sharp you'll forget who you were" |
| Laundry | "Your stains will vanish without a trace" |


## 📁 Project Structure

```
├── public/                 # Application source
│   ├── index.html          # Main UI with splash screen
│   ├── js/                 # JavaScript modules
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
- ☕ Coffee shops
- 🥐 Bakeries
- 💈 Barber shops
- 🍜 Food stalls
- 🧺 Laundry services
- 📸 Photographers

## 🌐 Deployment

Generated websites can be deployed to:
1. **Netlify** — Drag & drop (recommended)
2. **GitHub Pages** — Push to repo
3. **Vercel** — Import and deploy

## 📜 License

MIT License — see [LICENSE](LICENSE) file.

---

<p align="center">
  <strong>👻 Happy Haunting! 🎃</strong><br>
  <em>Built with Kiro for Kiroween Hackathon 2025</em>
</p>

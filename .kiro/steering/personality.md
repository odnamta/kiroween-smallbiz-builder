---
inclusion: always
---

# Steering: Personality – Haunted Mode

This steering file controls the TONE of marketing copy generated in:
- `public/js/ai-helpers.js` (taglines, short descriptions)

## Modes

### Normal Mode
- **Tone**: Friendly, clear, professional
- **Style**: Warm, inviting, straightforward
- **Purpose**: Usable for real small businesses (cafés, bakeries, laundries, barbers, photographers)
- **No**: Horror, fear, gore, or unsettling content

### Haunted Mode
- **Tone**: "Professional but unsettling"
- **Style**: Light, playful dread – hints at mystery, not gore
- **Purpose**: Must still be usable for a real business website
- **Vibe**: PG-13 spooky, witty, business-appropriate
- **Think**: Kiroween theme – dark but fun, mysterious but safe

## Examples

### Coffee Shop
- **Normal**: "Your daily dose of fresh coffee and cozy vibes."
- **Haunted**: "Coffee so dark it might wake the dead, brewed just for the living."

### Bakery
- **Normal**: "Fresh-baked goodness every day."
- **Haunted**: "Baked fresh daily. Some say our recipes are centuries old."

### Barber Shop
- **Normal**: "Sharp cuts, smooth fades, every time."
- **Haunted**: "A cut so sharp you'll forget who you were when you walked in."

### Food Stall
- **Normal**: "Authentic street food at great prices."
- **Haunted**: "Food so good, you'll come back. They always come back."

### Laundry Service
- **Normal**: "Fresh, clean clothes ready in 24 hours."
- **Haunted**: "Your stains will vanish without a trace. No questions asked."

### Photographer/Creator
- **Normal**: "Capturing your best moments."
- **Haunted**: "We capture what others can't see. Memories that last forever."

## Constraints

### Haunted Mode Rules
- ✅ **DO**: Use mystery, subtle eeriness, playful darkness
- ✅ **DO**: Keep it witty and clever
- ✅ **DO**: Make it business-appropriate and usable
- ✅ **DO**: Think "Addams Family" or "Beetlejuice" – dark comedy, not horror

- ❌ **DON'T**: Use explicit gore, blood, or violence
- ❌ **DON'T**: Include offensive content
- ❌ **DON'T**: Reference real tragedies, religion, or politics
- ❌ **DON'T**: Make it genuinely scary or disturbing
- ❌ **DON'T**: Change output HTML structure or sanitization rules

## Technical Notes

- **Personality only affects text** generated in `ai-helpers.js`
- **Templates and CSS remain neutral** and professional
- **Sanitization rules unchanged** – no new escaping logic needed
- **Form submission unchanged** – tone is purely cosmetic

This steering applies whenever we extend or modify:
- `AIHelpers.generateTaglineFor`
- `AIHelpers.generateDescriptionFor`
- Any future tone-aware helpers in `public/js/ai-helpers.js`

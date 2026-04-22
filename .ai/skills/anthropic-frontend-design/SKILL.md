---
name: anthropic-frontend-design
description: >
  Create distinctive, production-grade frontend interfaces with high design quality.
  Use this skill when the user asks to build web components, pages, or applications.
  Generates creative, polished code that avoids generic AI aesthetics. Based on
  the official Anthropic/Frontend-Design plugin for Claude Code.
---

# Frontend Design — Production-Grade UI Creation

This skill guides creation of **distinctive, production-grade** frontend interfaces
that avoid generic "AI slop" aesthetics. Implement real working code with exceptional
attention to aesthetic detail and creative choices.

## Step 1: Design Thinking (Before Writing Any Code)

Understand the context and commit to a **BOLD aesthetic direction**:

| Question | What to Answer |
|----------|---------------|
| **Purpose** | What problem does this interface solve? Who uses it? |
| **Tone** | Pick an extreme aesthetic direction (see below) |
| **Constraints** | Framework, performance requirements, accessibility needs |
| **Differentiation** | What makes this UNFORGETTABLE? One memorable detail. |

### Aesthetic Directions (Pick One and Commit)
- Brutally minimal
- Maximalist chaos
- Retro-futuristic
- Organic / natural
- Luxury / refined
- Playful / toy-like
- Editorial / magazine
- Brutalist / raw
- Art Deco / geometric
- Soft / pastel dreamcore
- Industrial / utilitarian

**CRITICAL**: Choose ONE clear conceptual direction and execute it with precision.
Bold maximalism and refined minimalism both work — the key is **intentionality, not intensity.**

---

## Step 2: Implementation

Write working code (HTML/CSS/JS, React, Vue, etc.) that is:
- **Production-grade and functional** — not a prototype
- **Visually striking and memorable** — someone will screenshot this
- **Cohesive** — every detail serves the aesthetic point-of-view
- **Meticulously refined** — nothing feels like a default

---

## Frontend Aesthetics Guidelines

### Typography
- Choose **beautiful, unique, and interesting** fonts
- **NEVER** use Arial, Inter, Roboto, or system-ui as the primary typeface
- Pair a distinctive **display font** with a refined **body font**
- Unexpected, characterful font choices elevate everything

### Color & Theme
- Commit to a cohesive aesthetic
- Use CSS variables / design tokens for consistency
- **Dominant colors with sharp accents** outperform timid, evenly-distributed palettes
- Dark themes, earth tones, neons, monochromatics — all work if intentional

### Motion & Animation
- Use animations for effects and micro-interactions
- Prefer **CSS-only** for HTML; use Motion library for React when available
- **One well-orchestrated page load** with staggered reveals creates more delight than scattered micro-interactions
- Use scroll-triggering and hover states that **surprise**

### Spatial Composition
- Unexpected layouts — don't reach for the default 12-column grid
- **Asymmetry**, overlap, diagonal flow
- Grid-breaking elements
- Generous negative space **OR** controlled density (not both)

### Backgrounds & Visual Details
Create **atmosphere and depth** rather than solid colors:
- Gradient meshes
- Noise textures
- Geometric patterns
- Layered transparencies
- Dramatic shadows
- Decorative borders
- Custom cursors
- Grain overlays

---

## ❌ NEVER Use These (Generic AI Aesthetics)

- **Fonts**: Inter, Roboto, Arial, system-ui, Space Grotesk (as a default)
- **Colors**: Purple gradients on white backgrounds; safe corporate blues
- **Layouts**: Predictable centered card layouts with rounded corners and shadows
- **Patterns**: Cookie-cutter designs that lack context-specific character

---

## Design Quality Principle

> "No design should be the same. Vary between light and dark themes, different fonts,
> different aesthetics. NEVER converge on common choices across generations."

Match **implementation complexity to the aesthetic vision**:
- Maximalist designs → elaborate code with extensive animations and effects
- Minimalist/refined designs → restraint, precision, careful spacing and typography

---

## Source
Anthropic/Frontend-Design plugin for Claude Code  
https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design  
MIT License

# CL-01W Project Context

> This file exists so any Claude instance (Cowork, Cursor, Claude Code) can pick up where the last one left off. Last updated: 2026-02-08.

---

## What This Project Is

A personal website documenting Hafsah's experiments building things with AI. The first major piece of content is a security guide for non-technical users experimenting with AI agents. The site itself is proof of concept — a human and an AI built it together, and the process is part of the story.

**Project ID:** CL-01W
**Owner:** Hafsah Mijinyawa (chatter@wetcloudmedia.com)
**Repo:** git@github.com:mijinyawah/cl-01w.git
**Live URL:** cl-01w.vercel.app
**Figma wireframes:** https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k

---

## Current Status: Stage 0 Complete

### What's done
- Astro project scaffolded (minimal starter, no TypeScript)
- GitHub repo connected via SSH
- Vercel auto-deploying from `main` branch
- Security check passed — clean .gitignore, no secrets in repo, SSH auth
- Framework decision: **Astro on Vercel**
- Dev workflow decision: **Cursor** (primary build tool) + **Cowork** (planning, content, project management)
- Two interactive effects prototyped and approved (see Effects section below)
- Full project plan and stage-by-stage setup guide written

### What's next: Stage 1 — Design System Extraction
- Set up Figma MCP in Cursor
- Extract design tokens from wireframes (colors, fonts, spacing)
- Build BaseLayout.astro (sidebar + content area + footer)
- Port the interactive grid background and cursor trail effects into Astro components
- Set up basic responsive behavior

---

## Tech Stack

- **Framework:** Astro (content-first, minimal JS, MDX support)
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Version control:** GitHub via SSH
- **Design:** Figma
- **Code editor:** Cursor (with AI + Figma MCP)
- **Project support:** Claude Cowork (planning, content, research)

Not needed for this project: Digital Ocean (that's for Clawdbot), Tailscale (home network mesh).

---

## Design Decisions

### Wireframes (3 pages)

**Home** — Article feed. Left sidebar (light bg) with logo/tagline, about blurb, nav links (Home, Projects, Articles), connect links (portfolio, bluesky). Dark content area with stacked article snippets. Each snippet has metadata tags (date, category, type), title in pixel/monospace font, and dual bylines (Hafsah + Claude model name).

**Blog.Post** — Individual article. Same sidebar. Content blocks: section headings, body text, code blocks (dark styled), two-column layouts (left-aligned and right-aligned), image blocks with captions. Article footer with category tags and prev/next navigation.

**Project** — Project grid page. Same sidebar. Page title in pixel font. 2x3 grid of project cards (dark background, green accent border) showing project ID tag, title, and file references.

### Visual Language
- Graph-paper grid background on dark content area
- Dark navy/charcoal content area (#0c1117), light sidebar (#f5f5f0)
- Pixel/monospace font for titles (Press Start 2P)
- Sans-serif for body text (Inter)
- Green accent color (#2dd4a0)
- Metadata in small bordered tag pills
- Minimal, code-adjacent aesthetic

### Interactive Effects (approved in prototyping)

**1. Cursor Trail**
Multi-dot chain that follows the mouse with progressive lerp delays, creating a ribbon/comet-tail effect. Lead dot follows cursor snappily, each subsequent dot follows the one ahead with slower lerp. Dots shrink and fade along the tail. Scales up on hover over interactive elements. Hides on touch devices. Dims over the sidebar.

**2. Interactive Grid Background**
Canvas-based grid where individual cells light up with a green fill + border highlight when the cursor enters them, then fade back to normal. Configurable fade speed, highlight opacity, and cell size. Combined with a subtle radial glow that follows the cursor (CSS custom properties updated from the same mousemove listener).

**3. User Controls Panel (future)**
Hafsah wants to expose the effect settings (trail count, speed, grid size, colors, etc.) as a visible control panel that end users can play with. This is a Stage 3 feature — fits as a "playground" page.

Reference implementation: `CL-01W-effects-demo-v2.html` in the project parent folder.

---

## Content Plan

### Security Guide — 5 sections
1. **Why Security Matters** — What AI agents can access, real risks, prompt injection explained simply, the soul_evil vulnerability story
2. **IT Basics You Need to Know** — Tokens, file permissions, root access, sandboxing, OAuth vs API keys
3. **Security Steps Anyone Can Take** — Start small, review access, approval flows, logs, kill switches
4. **The Cost Reality Check** — API pricing, model choice, billing alerts, compromised agent costs
5. **Build Your Own Pocket IT Admin** — Step-by-step setup guide for a security-focused bot

### Narrative arc
Excitement about AI agents → Here's what could go wrong → Don't panic, here's what you need to know → Here's how to protect yourself → Let's build something together

### Tone
Conversational, not preachy. Real examples, not abstract scenarios. Empowering, not fear-mongering. Technical accuracy without jargon overload.

### Meta article
A piece about the process of building this site with AI — the development philosophy. Anchoring quote: "The act of development is like design — it's adjacent to good communication, good direction, and good intention."

---

## File Structure

```
ClaudeCoWork/projects-inprogress/CL-01W/
  CL-01W-project-plan.md          ← Full project plan (what + why)
  CL-01W-setup-guide.md           ← Stage-by-stage how-to guide
  CL-01W-effects-demo.html        ← v1 demo (grid glow + single cursor)
  CL-01W-effects-demo-v2.html     ← v2 demo (interactive grid cells + ribbon trail) ← approved version
  cl-01w/                          ← Astro project (this is the actual repo root)
    src/
      pages/
        index.astro
    public/
    package.json
    astro.config.mjs
    CLAUDE.md                      ← this file
```

---

## About Hafsah (for tone calibration)

Motion designer and video editor. Proficient in Adobe Suite (AE, Illustrator, Photoshop, InDesign), learning Cavalry, Figma, DaVinci. Experiments with web dev tools (Framer, Webflow) and AI platforms (Runway, ElevenLabs, Higgsfield, Lovable). Not a trained coder but technically curious — built her own PC, runs a home NAS. Learning Japanese (kana level). Values direct communication, pushback when warranted, and explanations calibrated to the specific topic rather than assuming a fixed skill level.

---

## Existing Project Context (Notion)

The full project brief lives in Notion under Bot Cowork → OpenClaw Adventures → "CL-01W: Security Guide for Non-Technical Users". There's also a Clawdbot Docs page with infrastructure notes. An earlier `CL-01W-project-brief.md` file (~8.9K) was lost during a git cleanup on the Clawdbot Digital Ocean droplet.

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-08 | Astro over Next.js | Content-first site, minimal JS needed, easier learning curve for non-developer |
| 2026-02-08 | Cursor + Cowork split | Fewer tools, clear roles: Cursor builds code, Cowork handles planning/content |
| 2026-02-08 | No Figma mobile breakpoints | Responsive behavior defined in code, not mockups — site structure is simple enough |
| 2026-02-08 | Interactive grid cells (canvas) | Per-cell highlight on hover with fade, approved over simple CSS gradient approach |
| 2026-02-08 | Multi-dot cursor trail | Ribbon/chain effect approved over single-circle follower |
| 2026-02-08 | SSH over HTTPS for GitHub | One-time setup, no token management, works across all repos |

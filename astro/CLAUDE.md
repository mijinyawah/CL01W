# CL-01W Project Context

> Shared context for any AI working on this project (Cursor, Cowork, Claude Code). Last updated: 2026-02-09.

---

## What This Project Is

A personal website documenting Hafsah's experiments building things with AI. The site itself is proof of concept — a human and an AI built it together, and the process is part of the story.

**Project ID:** CL-01W
**Owner:** Hafsah Mijinyawa (chatter@wetcloudmedia.com)
**Repo:** git@github.com:mijinyawah/cl-01w.git
**Live URL:** cl-01w.vercel.app
**Figma wireframes:** https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k

---

## Current Status: Fresh Start

Previous iteration archived. Astro scaffold and git history preserved. Rebuilding the site from scratch with lessons learned from the first pass.

---

## Tech Stack

- **Framework:** Astro (content-first, minimal JS, MDX support)
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Version control:** GitHub via SSH
- **Design:** Figma
- **Code editor:** Cursor (primary build tool, with Figma MCP)
- **Project support:** Claude Cowork (planning, content, research)

---

## Design Direction

### Wireframes (3 pages)

**Home** — Article feed. Left sidebar with logo/tagline, about blurb, nav links (Articles, Projects). Dark content area with stacked article snippets. Each snippet has metadata tags, title in pixel/monospace font, and dual bylines (Hafsah + Claude model name).

**Blog.Post** — Individual article. Same sidebar. Content blocks: section headings, body text, code blocks, two-column layouts, image blocks with captions. Article footer with category tags and prev/next navigation.

**Project** — Project grid page. Same sidebar. Page title in pixel font. 2x3 grid of project cards with project ID tag, title, and file references.

### Visual Language
- Graph-paper grid background on dark content area
- Dark navy/charcoal content area, light sidebar
- Pixel/monospace font for titles
- Sans-serif for body text
- Green accent color (#2dd4a0)
- Metadata in small bordered tag pills
- Minimal, code-adjacent aesthetic

### Interactive Background
Exploring a CSS-based cursor trail grid (Daily Fire technique) — a grid of div elements where hover triggers instant opacity, and the non-hovered state fades slowly via transition-duration asymmetry. Pure CSS transitions, no canvas, no requestAnimationFrame. Details TBD as the rebuild takes shape.

---

## Content Plan

### Security Guide — 5 sections
1. **Why Security Matters** — What AI agents can access, real risks, prompt injection explained simply
2. **IT Basics You Need to Know** — Tokens, file permissions, root access, sandboxing, OAuth vs API keys
3. **Security Steps Anyone Can Take** — Start small, review access, approval flows, logs, kill switches
4. **The Cost Reality Check** — API pricing, model choice, billing alerts, compromised agent costs
5. **Build Your Own Pocket IT Admin** — Step-by-step setup guide for a security-focused bot

### Tone
Conversational, not preachy. Real examples, not abstract scenarios. Empowering, not fear-mongering. Technical accuracy without jargon overload.

### Meta article
A piece about the process of building this site with AI — the development philosophy. Anchoring quote: "The act of development is like design — it's adjacent to good communication, good direction, and good intention."

---

## About Hafsah (for tone calibration)

Motion designer and video editor. Proficient in Adobe Suite (AE, Illustrator, Photoshop, InDesign), learning Cavalry, Figma, DaVinci. Experiments with web dev tools (Framer, Webflow) and AI platforms (Runway, ElevenLabs, Higgsfield, Lovable). Not a trained coder but technically curious — built her own PC, runs a home NAS. Learning Japanese (kana level). Values direct communication, pushback when warranted, and explanations calibrated to the specific topic rather than assuming a fixed skill level.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-08 | Astro over Next.js | Content-first site, minimal JS needed, easier learning curve |
| 2026-02-08 | Cursor + Cowork split | Clear roles: Cursor builds code, Cowork handles planning/content |
| 2026-02-08 | SSH over HTTPS for GitHub | One-time setup, no token management |
| 2026-02-09 | Fresh start on implementation | First iteration taught the workflow; rebuilding with cleaner approach |
| 2026-02-09 | CSS trail grid over canvas grid | Pure CSS transitions instead of requestAnimationFrame — simpler, more performant |

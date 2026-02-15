# CL-01W Project Context

> Shared context for any AI working on this project (Cursor, Cowork, Claude Code). Last updated: 2026-02-14.

---

## What This Project Is

A personal website documenting Hafsah's experiments building things with AI. The site itself is proof of concept — a human and an AI built it together, and the process is part of the story.

**Project ID:** CL-01W
**Owner:** Hafsah Mijinyawa
**Repo:** git@github.com:mijinyawah/cl-01w.git
**Live URL:** cl-01w.vercel.app
**Figma wireframes:** https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k

---

## Current Status: Active Development

Site is live at cl-01w.vercel.app. Three published articles, one placeholder project. Keystatic CMS integrated for content management via GitHub API. Interactive cursor trail grid with control panel. Fully responsive (desktop/tablet/mobile).

**Next feature:** Chirps (see Queued Work below).

---

## Tech Stack

- **Framework:** Astro 5.17.1 (content-first, minimal JS, MDX support)
- **CMS:** Keystatic (GitHub-backed, `@keystatic/core` 0.5.48)
- **Integrations:** MDX, React 18, Vercel SSR adapter
- **Hosting:** Vercel (auto-deploys from GitHub main branch)
- **Version control:** GitHub via SSH (repo: `mijinyawah/CL01W`)
- **Design:** Figma
- **Code editor:** Cursor (primary build tool, with Figma MCP)
- **Project support:** Claude Code (planning, content, research)

## Site Architecture

```
astro/
├── astro.config.mjs          # SSR output, Vercel adapter, MDX + React + Keystatic
├── keystatic.config.ts       # CMS collections (articles, projects) + MDX components
├── src/
│   ├── content/
│   │   ├── config.ts          # Zod schemas for content collections
│   │   ├── articles/*.mdx     # 3 published articles
│   │   └── projects/*.mdx     # 1 placeholder project
│   ├── layouts/
│   │   ├── BaseLayout.astro   # HTML shell, fonts, meta
│   │   └── Layout.astro       # Two-column layout (sidebar + content)
│   ├── pages/
│   │   ├── index.astro        # Home (article feed)
│   │   ├── articles/          # Feed + [...slug] detail
│   │   └── projects/          # Grid page
│   ├── components/            # ControlPanel, CursorTrailGrid, ImageBlock, etc.
│   └── styles/tokens.css      # Full design token system
└── public/keystatic/          # CMS-uploaded images
```

### Design Tokens (key values)
- **Page bg:** `#ffeded` (light pink) | **Content bg:** `#08131b` (dark navy) | **Sidebar bg:** `rgba(255,255,255,0.80)`
- **Card bg:** `rgba(7,81,135,0.49)` | **Card border:** semi-transparent white | **No border-radius**
- **Accent:** `#ec8cff` (magenta) | **Links:** `#8f62ff` (purple) | **Code accent:** `rgba(74,246,255,0.40)` (cyan)
- **Body font:** Urbanist 17px | **Pixel font:** Tiny5 | **Code font:** Fira Code
- **Eyebrow:** 11px uppercase Urbanist, bordered pills
- **Content max-width:** 685px (`--content-max`)
- **Breakpoints:** 1440+ desktop, 1200-1439 desktop-mini, 768-1199 tablet, <767 mobile
- **Date format:** `JAN 14 | 2026` (uppercase month, pipe separator)

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

## Queued Work: Chirps Feature

Tweet-style microblog. 140-character posts (OG Twitter limit), each with a permalink. Matches existing site design language.

**Schema:** `date` (datetime, required), `content` (string, max 140, required), `tags` (string[], optional), `link` (URL, optional), `image` (optional), `draft` (boolean)

**Implementation — 7 steps:**
1. Add `chirps` data collection to `src/content/config.ts` (Zod schema, `type: 'data'`)
2. Add `chirps` collection to `keystatic.config.ts` (`format: { data: 'yaml' }`, 140-char text field, update UI nav)
3. Create `src/pages/chirps/index.astro` — feed page (reverse-chron timeline, same card styling as articles but compact)
4. Create `src/pages/chirps/[...slug].astro` — detail page (chirp at 25px, prev/all/next nav, optional link/image)
5. Update `src/layouts/Layout.astro` — add "Chirps" to desktop nav + mobile overlay nav with active state
6. Create seed chirp at `src/content/chirps/first-chirp.yaml`
7. Test: dev server, feed, detail pages, Keystatic CMS, nav active states, mobile layout

**Design rules for chirps:**
- Same `--snippet-bg`, `--snippet-border`, hover behavior as article cards
- 16px 24px padding (slightly tighter than articles' 20px 24px)
- Body font for chirp text (not pixel font — conversational, not headline)
- Date pill in eyebrow style + time as secondary element
- Tags in magenta (`--content-title`)
- `white-space: pre-wrap` for line breaks within 140 chars
- Mobile: `clamp(300px, 90vw, 317px)` card width
- Detail page: content at 25px (H2 size), footer with prev/all chirps/next

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-08 | Astro over Next.js | Content-first site, minimal JS needed, easier learning curve |
| 2026-02-08 | Cursor + Cowork split | Clear roles: Cursor builds code, Cowork handles planning/content |
| 2026-02-08 | SSH over HTTPS for GitHub | One-time setup, no token management |
| 2026-02-09 | Fresh start on implementation | First iteration taught the workflow; rebuilding with cleaner approach |
| 2026-02-09 | CSS trail grid over canvas grid | Pure CSS transitions instead of requestAnimationFrame — simpler, more performant |
| 2026-02-14 | Chirps as `type: 'data'` collection | No MDX body needed — 140 chars lives in frontmatter. YAML files, not MDX |
| 2026-02-14 | 140 char limit (OG Twitter) | Enforced at Keystatic UI level + Zod schema level. Belt and suspenders |
| 2026-02-14 | Body font for chirp text | Chirps are conversational — pixel font reserved for titles/headlines |

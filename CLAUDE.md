# CL-01W — AI Experiment Log Site

> Shared context for any AI working on this project (Cursor, Cowork, Claude Code). Last updated: 2026-02-16.

---

## Overview

- **Project ID:** CL-01W
- **Type:** Website
- **Owner:** Hafsah Mijinyawa
- **Repo:** git@github.com:mijinyawah/CL01W.git
- **Live URL:** cl-01w.vercel.app
- **Figma wireframes:** https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k

Astro-based personal site documenting Hafsah's AI build experiments. The site itself is part of the story: a human + AI collaboration with a living record of design, content, and tooling decisions.

---

## Current Status

**Active phase:** Phase 1 — Content + CMS polish  
**What's happening now:** Chirps are live (feed + detail), Keystatic CMS stable, recent date-schema fixes deployed.  
**Blocked by:** Nothing.  
**Next milestone:** Validate Keystatic project creation workflow and do a content QA pass.

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
│   │   ├── projects/*.mdx     # 1 placeholder project
│   │   └── chirps/*.yaml      # Chirp data entries (YAML)
│   ├── layouts/
│   │   ├── BaseLayout.astro   # HTML shell, fonts, meta
│   │   └── Layout.astro       # Two-column layout (sidebar + content)
│   ├── pages/
│   │   ├── index.astro        # Home (article feed)
│   │   ├── articles/          # Feed + [...slug] detail
│   │   ├── projects/          # Grid page
│   │   └── chirps/            # Feed + [...slug] detail
│   ├── components/            # ControlPanel, CursorTrailGrid, ImageBlock, etc.
│   └── styles/tokens.css      # Full design token system
└── public/keystatic/          # CMS-uploaded images
    └── chirps/                # Chirp images (optional)
```

### Design Tokens (key values)
- **Page bg:** `#ffeded` (light pink) | **Content bg:** `#08131b` (dark navy) | **Sidebar bg:** `rgba(255,255,255,0.80)`
- **Card bg:** `rgba(7,81,135,0.49)` | **Snippet cards:** transparent w/ border | **No border-radius**
- **Accent:** `#ec8cff` (magenta) | **Links:** `#8f62ff` (purple) | **Code accent:** `rgba(74,246,255,0.40)` (cyan)
- **Body font:** Urbanist 17px | **Pixel font:** BitBlox Monospaced (local OTF) | **Code font:** Fira Code
- **Eyebrow:** 11px uppercase Urbanist, bordered pills
- **Blockquote:** bg `#001A2B`, text `#00FFFB`
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
- Subtle panel drop shadow + underline-reveal hover on sidebar nav
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

## Chirps (Implemented)

Tweet-style microblog. 140-character posts (OG Twitter limit), each with a permalink. Matches existing site design language.

**Storage:** `astro/src/content/chirps/*.yaml` (data collection)  
**Schema:** `date` (ISO string), `content` (max 140), `tags` (string[]), `link` (optional URL), `image` (optional), `draft` (boolean)  
**UI:** feed at `/chirps/`, detail at `/chirps/[slug]`, nav link in sidebar

**Date handling:** Keystatic `fields.datetime` can serialize YAML timestamps. The content schema coerces Date → ISO string, and pages accept `string | Date` to avoid build failures or “Invalid time value”.

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
| 2026-02-15 | Coerce chirp dates to ISO strings in schema | Keystatic datetime writes YAML timestamps; avoids Astro schema mismatch |
| 2026-02-15 | Normalize chirp timestamps to ISO Z | Prevent invalid time parsing and build failures |
| 2026-02-15 | Removed two bugged chirps | Unblocked builds and removed invalid data |
| 2026-02-16 | Swap pixel font to BitBlox Monospaced | Use local pixel font instead of Google Tiny5 |
| 2026-02-16 | UI polish pass across breakpoints | Transparent snippet cards, panel shadow, sidebar hover, linked-only project hover, chirp nav sizing, tablet/desktop spacing refinements |
| 2026-02-16 | Blockquote & callout tablet sizing | Fixed widths, padding, and colors for readability |

## Known Issues & Gotchas

- Keystatic `fields.datetime` may serialize YAML timestamps. Keep chirp `date` values as ISO strings or resave entries if you see “Invalid time value”.
- If a build error says “Expected type string, received date”, check the chirp YAML for an unquoted date and resave through Keystatic.

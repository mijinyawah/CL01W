# CL-01W Codex Plan

## Status
Approved by stakeholder. Implementation must wait for explicit sign-off before any code changes.

## Goals
1. Translate the Figma “Blog - v2” designs into a production Astro site with 1:1 visual fidelity.
2. Preserve content-first architecture (MDX collections for articles/projects).
3. Keep the interactive cursor trail grid and control panel concept, tuned to the new visual system.
4. Deploy to Vercel with the existing GitHub pipeline.
5. Integrate Keystatic CMS for article editing (mapping to `/articles/:slug`).

## Non-Goals
1. No new content generation beyond existing MDX unless explicitly requested.
2. No redesign changes outside the Figma specs.
3. No additional pages beyond Home, Article, Projects, and Chirps.

## Source of Truth
- Codebase: `./astro`
- Design: Figma file `CL-01W` (Blog - v2 frames and node IDs in the rebuild plan).
- Tokens: `./CL-01W-color-tokens.md`

## Breakpoint Priority Order
1. Desktop 1440
2. Desktop-mini 1200
3. Tablet 768
4. Mobile 375

## Phases

### Phase 1: Foundations (Tokens, Typography, Breakpoints)
1. Replace `src/styles/tokens.css` with new color tokens, font tokens, type scale, and spacing tokens.
2. Add Google Fonts in `src/layouts/BaseLayout.astro` (Urbanist, Tiny5, Roboto, Fira Code).
3. Standardize breakpoints across layout and components: 375, 768, 1200, 1440.
4. Verify site boots and renders with new background and fonts.

### Phase 2: Global Layout (Sidebar + Content Shell)
1. Rebuild `src/layouts/Layout.astro` and `src/layouts/BaseLayout.astro` to match Figma layout proportions.
2. Implement sidebar styles: translucent white, nav labels, typography, social icons, CTRL PANEL.
3. Implement content panel: dark surface, grid overlay, layering.
4. Mobile layout: header bar, hamburger overlay, full-width content, mobile footer.

### Phase 3: Page Templates (Home, Article, Projects)
1. Home page layout and article card styles.
2. Article template with headings, code blocks, quotes, image blocks, prev/next.
3. Projects grid layout and card styling.

### Phase 4: Keystatic CMS Integration
1. Add Keystatic config and wiring for article editing.
2. Ensure CMS edits map to `/articles/:slug` routes.
3. Document any constraints (collection schema, file locations, deployment considerations).

### Phase 5: Interaction Layer
1. Tune cursor trail grid and control panel values to match new visual palette.
2. Ensure interactions don’t clash with layout or mobile behavior.

### Phase 6: QA + Deploy
1. Pixel alignment pass against Figma desktop/mobile frames.
2. Check responsive behavior at 375/768/1200/1440.
3. Build and deploy via existing Vercel pipeline.

### Phase 7: Chirps — Tweet-Style Microblog
> Added 2026-02-14. Approved by stakeholder.

**Goal:** Add a 140-character microblog feed ("Chirps") with permalinks, Keystatic CMS support, and design matching the existing site aesthetic.

**Schema:** `date` (datetime, required), `content` (string, max 140, required), `tags` (string[], optional), `link` (URL, optional), `image` (optional), `draft` (boolean)

**Steps:**

1. **Content collection** — Add `chirps` data collection to `src/content/config.ts`
   - `type: 'data'` (no MDX body — chirp text lives in frontmatter as YAML)
   - Zod: `z.string().max(140)` for content, `z.coerce.date()` for date
   - Add to `export const collections = { articles, projects, chirps }`

2. **Keystatic config** — Add `chirps` collection to `keystatic.config.ts`
   - `format: { data: 'yaml' }`, `path: 'src/content/chirps/*'`
   - `fields.text` with `multiline: true`, `validation.length.max: 140`
   - `fields.datetime` (required), `fields.array(fields.text(...))` for tags
   - `fields.url` for link (fallback: `fields.text` if unavailable in 0.5.48)
   - `fields.image` with directory `public/keystatic/chirps`
   - Update `ui.navigation` → `Content: ['articles', 'projects', 'chirps']`

3. **Feed page** — Create `src/pages/chirps/index.astro`
   - Pattern: mirrors `src/pages/articles/index.astro`
   - Reverse-chron timeline, filter drafts, same `formatDate` helper
   - Card styling matches articles: `var(--snippet-bg)`, `var(--snippet-border)`, hover behavior
   - Compact adaptation: padding `16px 24px` (vs articles' `20px 24px`)
   - Chirp text in body font (Urbanist 17px) — conversational, not pixel headline
   - Date pill (eyebrow style) + time as secondary element
   - Tags in magenta (`var(--content-title)`), `white-space: pre-wrap`
   - Mobile: `clamp(300px, 90vw, 317px)` card width, gap 20px

4. **Detail page** — Create `src/pages/chirps/[...slug].astro`
   - Pattern: mirrors `src/pages/articles/[...slug].astro`
   - `prerender = false` (SSR), load by `chirp.id` (data collections use ID, not slug)
   - Chirp content at 25px (`var(--text-h2-size)`) for emphasis on its own page
   - Optional link (purple `#8f62ff`), optional image (max-width 100%)
   - Footer nav: prev / all chirps / next (pixel font, magenta)
   - Mobile: `clamp(16px, 6vw, 24px)` padding, content 20px/28px

5. **Layout nav** — Update `src/layouts/Layout.astro`
   - Add `const isChirps = currentPath.startsWith('/chirps');` (~line 12)
   - Desktop: `<a href="/chirps/">Chirps</a>` in `.sidebar__nav` (after Projects)
   - Mobile overlay: Chirps link with active state detection (after Projects block)
   - No new CSS — existing nav styles apply

6. **Seed data** — Create `src/content/chirps/first-chirp.yaml`
   - Test chirp with date, content, tags for verification

7. **Verify** — `npm run dev`, test feed + detail + Keystatic + nav + mobile

**Design rules:**
- Same card bg/border/hover as articles
- Body font for chirp text (pixel font reserved for titles)
- 140-char limit enforced at Keystatic UI + Zod schema (belt and suspenders)
- Date format: `JAN 14 | 2026` + time (e.g. `2:30 PM`)

---

## Deliverables
1. Updated Astro site matching Figma visuals for all three pages + Chirps.
2. Tokenized design system in `tokens.css`.
3. Clean, consistent breakpoints and typography across pages.
4. Keystatic CMS integration for articles and chirps.
5. Vercel deployment ready.

## Risks / Open Questions
1. Figma coverage for Tablet and Desktop-mini is inferred; interpolate carefully.
2. Control Panel visuals in Figma may need interpretation unless a specific frame exists.
3. Keystatic specifics (schema, content location, deployment) require alignment to avoid breaking routes.
4. `fields.url` availability in `@keystatic/core` 0.5.48 — fallback to `fields.text` if needed.
5. Data collection ID format: Astro 5 uses filename (minus extension) as entry `id`. Detail page routes via `chirp.id`, not `chirp.slug`.

## Stakeholder Sign-Off
Implementation must not begin until the stakeholder explicitly approves the plan.

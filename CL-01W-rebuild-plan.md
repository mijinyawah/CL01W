# CL-01W Rebuild Plan

> Project plan for rebuilding cl-01w.vercel.app from Figma designs. Authored by Claude Cowork, Feb 2026.
> Hand this doc to Cursor alongside the Figma file and CLAUDE.md.

---

## Current State

The Astro project has a working scaffold from a previous iteration — 3 pages (home, article, projects), a sidebar+content layout, a CSS cursor trail grid, a control panel, and placeholder content. However, the visual layer is outdated. Fonts, colors, spacing, and breakpoints all need to be rebuilt to match the new Figma designs.

**What's being kept:**
- Astro framework + MDX integration
- CursorTrailGrid.astro (CSS trail grid concept — will need visual tuning)
- ControlPanel.astro (mood presets concept — will need color updates)
- CustomCursor.astro
- Content collections structure (articles, projects)
- GitHub repo + Vercel deploy pipeline

**What's changing:**
- Full color system overhaul (teal → pink/purple palette)
- Font stack swap (Micro 5 → Tiny5, Roboto body → Urbanist, add Fira Code)
- Responsive breakpoints (800px → 375/768/1200/1440)
- Layout refinements to match Figma 1:1
- Page background from transparent → `#ffeded` (light pink)
- Keystatic CMS integration (new)

---

## Figma Reference

**File:** https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k
**Page:** Blog - v2

**Key frames:**
| Frame | Node ID |
|---|---|
| HOME Desktop 1440 | `116:1639` |
| HOME Mobile 375 | `121:529` |
| ARTICLE Desktop 1440 | `122:1273` |
| ARTICLE Mobile 375 | `122:1769` |
| PROJECTS Desktop 1440 | `126:65` |
| PROJECTS Mobile 375 | `126:702` |

**Breakpoints:**
| Name | Width | Notes |
|---|---|---|
| Desktop | 1440px | Primary design target |
| Desktop-mini | 1200px | No Figma frame — interpolate from 1440 |
| Tablet | 768px | No Figma frame — interpolate between 1440 and 375 |
| Mobile | 375px | Figma frames provided |

---

## Font Stack

| Role | Font | Weight(s) | Source | Current state |
|---|---|---|---|---|
| Body text | Urbanist | Regular 400, Medium 500, Bold 700, Black 900 | Google Fonts | ❌ Not in project (currently Roboto) |
| Pixel titles | Tiny5 | Regular 400 | Google Fonts | ❌ Not in project (currently Micro 5) |
| Eyebrow/metadata | Roboto | Bold 700 | Google Fonts | ✅ Already referenced |
| Code blocks | Fira Code | Regular 400 | Google Fonts | ❌ Not in project |

**Font sizes from Figma:**
- Body: Urbanist Regular 17px / 25px line-height
- H2: Urbanist Bold 25px / 1.3
- H3: Urbanist Medium 20px / 32px
- Eyebrow: Roboto Bold 11px / 20px (uppercase)
- Pixel H1 Jumbo: Tiny5 Regular 70px / 75px
- Pixel H1 Mini: Tiny5 Regular 35px / 35px
- Special-02: Urbanist Black 9px / 24px (uppercase, letter-spacing 5px)
- Codeblock: Fira Code Regular 15px / 22px
- Quote: Urbanist Regular 20px / 35px

---

## Color Tokens

Full token system extracted from Figma and set up as Figma Variables (collection: "Color Tokens", 17 variables).

See `CL-01W-color-tokens.md` for the complete reference. Summary:

```css
:root {
  /* Backgrounds */
  --page-bg: #ffeded;
  --content-bg: #08131b;
  --sidebar-bg: rgba(255, 255, 255, 0.80);
  --card-bg: rgba(7, 81, 135, 0.49);
  --codeblock-bg: #001a2b;
  --quote-bg: rgba(147, 49, 166, 0.44);

  /* Text */
  --text-primary: #001a2b;
  --text-secondary: rgba(0, 0, 0, 0.44);
  --text-tertiary: rgba(0, 0, 0, 0.50);
  --text-on-dark: #ffffff;
  --text-on-dark-muted: rgba(255, 255, 255, 0.80);
  --text-code: rgba(74, 246, 255, 0.40);

  /* Accents */
  --accent-primary: #ec8cff;
  --accent-purple: rgba(147, 49, 166, 0.44);
  --accent-grid: rgba(143, 98, 255, 0.35);

  /* Borders */
  --border-light: rgba(255, 255, 255, 0.80);
  --border-quote: #ec8cff;
}
```

---

## Phases

### Phase 1: Foundation (tokens, fonts, breakpoints)

**Goal:** Replace the entire design token layer so every subsequent component inherits the correct palette, type scale, and spacing.

**Files to modify:**
- `src/styles/tokens.css` — full rewrite

**Tasks:**

1. **Rewrite tokens.css** with the color tokens above, replacing all old values. Remove old color variables (--sidebar-bg, --sidebar-text, --sidebar-nav, --sidebar-divider, --content-title, --content-heading, --content-body, --content-caption, --snippet-bg, --snippet-border, --meta-border, --meta-text, --grid-line, --grid-highlight, --cursor-trail, --glow-color). Replace with the 17 new tokens.

2. **Add font tokens:**
   ```css
   --font-body: 'Urbanist', sans-serif;
   --font-pixel: 'Tiny5', monospace;
   --font-eyebrow: 'Roboto', sans-serif;
   --font-code: 'Fira Code', monospace;
   ```

3. **Add type scale tokens** matching the Figma font styles listed above (body, h2, h3, eyebrow, pixel-h1-jumbo, pixel-h1-mini, special-02, codeblock, quote).

4. **Add spacing tokens.** Current spacing uses 44px grid cells. Review against Figma and adjust. Key values:
   - `--page-padding` — outer page margin
   - `--sidebar-width` — sidebar width (Figma shows ~30% / 340px)
   - `--content-max` — max content width within the dark area

5. **Load Google Fonts.** In `BaseLayout.astro`, add Google Fonts `<link>` tags for Urbanist (400, 500, 700, 900), Tiny5 (400), Roboto (700), and Fira Code (400). Remove any old font references.

6. **Update breakpoints.** The current codebase uses `800px` as the mobile breakpoint. Replace with the agreed system:
   - Mobile: `max-width: 767px` (targets ≤375 design)
   - Tablet: `min-width: 768px` and `max-width: 1199px`
   - Desktop-mini: `min-width: 1200px` and `max-width: 1439px`
   - Desktop: `min-width: 1440px`

   Apply these consistently across Layout.astro, BaseLayout.astro, and all component files.

**Verification:** After this phase, `npm run dev` should show the site with the correct pink page background, updated fonts loading, and no visual regressions in layout structure (even if colors within components are still wrong — those get fixed in Phase 2).

---

### Phase 2: Layout Rebuild

**Goal:** Match the Figma layout structure precisely — sidebar, content area, page background, and responsive behavior.

**Files to modify:**
- `src/layouts/Layout.astro` — major restyle
- `src/layouts/BaseLayout.astro` — page background, font loading

**Tasks:**

1. **Page background.** Set `body` or the outermost wrapper to `background: var(--page-bg)` (#ffeded light pink). The sidebar and content area float on top of this.

2. **Sidebar.** Match Figma:
   - Semi-transparent white background: `var(--sidebar-bg)` (rgba 255,255,255,0.80)
   - Text uses `var(--text-primary)` for headings, `var(--text-secondary)` for nav links
   - Copyright text uses `var(--text-tertiary)`
   - Nav links: "Articles" and "Projects" (currently "Home" and "Projects" — update labels)
   - Logo/tagline in Urbanist Bold (currently references --font-sidebar)
   - About blurb in Urbanist Regular
   - Social icons: portfolio + Bluesky (keep current SVGs, update colors)
   - "CTRL PANEL" button: uses `var(--accent-purple)` for text color
   - The sidebar should be translucent enough for the grid background to show through

3. **Content area.** Match Figma:
   - Background: `var(--content-bg)` (#08131b)
   - The grid pattern (CursorTrailGrid) covers the full dark area
   - Content floats on top of the grid (z-index layering)

4. **Mobile layout (≤767px).** Match Figma mobile frames:
   - Stacked layout (sidebar collapses to header bar)
   - Hamburger menu opens full-screen dark overlay (existing behavior, update colors)
   - Content goes full-width, edge-to-edge
   - Footer visible on mobile

5. **Tablet layout (768–1199px).** No Figma frame exists — interpolate:
   - Same sidebar+content layout as desktop
   - Sidebar narrows proportionally
   - Content area fills remaining space

**Verification:** Side-by-side comparison with Figma desktop 1440 and mobile 375 frames. Layout proportions, colors, and font rendering should match.

---

### Phase 3: Page Templates

**Goal:** Build each page to match its Figma frame 1:1.

#### 3A: Home Page (`src/pages/index.astro`)

**Figma reference:** HOME Desktop 1440 (`116:1639`), HOME Mobile 375 (`121:529`)

- Article feed as vertically stacked snippet cards
- Each card: metadata tag pills (date, category, type) → pixel-font title → dual bylines (Hafsah + Claude model)
- Card background: `var(--card-bg)` (blue glass)
- Card borders: `var(--border-light)` at 1px
- Metadata pills: `var(--border-light)` border at 0.5px, `var(--text-on-dark-muted)` text
- Title: Tiny5 (pixel font), `var(--accent-primary)` (#ec8cff pink)
- Bylines: Urbanist, `var(--text-on-dark-muted)`
- Mobile: cards stack full-width, metadata wraps

#### 3B: Article Page (`src/pages/articles/[...slug].astro`)

**Figma reference:** ARTICLE Desktop 1440 (`122:1273`), ARTICLE Mobile 375 (`122:1769`)

Content blocks to implement:
- **Article.Header** — pixel-font title (Tiny5 jumbo), metadata pills, dual bylines
- **Article.Content** — body text in Urbanist 17/25, `var(--text-on-dark)` white
- **Article.H2** — Urbanist Bold 25/1.3
- **Article.H3** — Urbanist Medium 20/32
- **Article.Image** — full-width image with optional caption (use existing ImageBlock.astro, restyle)
- **Article.Video** — responsive embed (use existing VideoEmbed.astro, restyle)
- **Article.Quote** — left border `var(--border-quote)` at 10px, background `var(--quote-bg)`, text in Urbanist 20/35
- **Article.Codeblock** — background `var(--codeblock-bg)`, text `var(--text-code)` in Fira Code 15/22
- **Article.Lists** — styled ordered/unordered lists matching body text style
- **Article.Footer** — category/type tag pills, prev/next navigation in `var(--accent-primary)`
- **Article.Callout** — restyle existing Callout.astro to match new palette

#### 3C: Projects Page (`src/pages/projects/index.astro`)

**Figma reference:** PROJECTS Desktop 1440 (`126:65`), PROJECTS Mobile 375 (`126:702`)

- Page title in Tiny5 pixel font
- 2-column grid of project cards (1-column on mobile)
- Cards: project ID tag, title, description, technology tag pills
- Card styling matches article snippet cards (glass bg, light border)

**Verification:** Screenshot each page at 1440px and 375px. Compare with Figma frames side by side.

---

### Phase 4: Interactive Layer

**Goal:** Tune the CSS trail grid, control panel, and cursor to work with the new color palette.

**Files to modify:**
- `src/components/CursorTrailGrid.astro`
- `src/components/ControlPanel.astro`
- `src/components/CustomCursor.astro`
- `src/components/CursorTrail.astro`

**Tasks:**

1. **CursorTrailGrid defaults.** Update default grid colors to use the new palette:
   - Grid line color: `var(--accent-grid)` (rgba 143,98,255,0.35 — purple)
   - Highlight/trail color: `var(--accent-primary)` (#ec8cff — pink)
   - Background: transparent (sits behind content-bg)

2. **ControlPanel mood presets.** Update the 6 mood presets (neon, midnight, ember, matrix, vapor, mono) to use HSL ranges that harmonize with the new pink/purple palette instead of the old teal palette.

3. **ControlPanel UI styling.** Update the panel's own styling to use new tokens (button colors, text colors, slider accents).

4. **CustomCursor.** Update default cursor color from teal to pink (`var(--accent-primary)`).

5. **Mobile behavior.** Grid and custom cursor should remain hidden on mobile (existing behavior, verify breakpoint updated to 767px).

**Verification:** Open desktop view, hover over content area, confirm grid cells light up with pink/purple palette. Open control panel, cycle through mood presets, confirm each produces a visually coherent palette.

---

### Phase 5: Keystatic CMS

**Goal:** Add Keystatic so articles can be edited through a browser-based admin UI at `/keystatic`.

**New dependencies:**
- `@keystatic/core`
- `@keystatic/astro`

**Tasks:**

1. **Install Keystatic:**
   ```bash
   npm install @keystatic/core @keystatic/astro
   ```

2. **Create `keystatic.config.ts`** at project root with collection schemas that match the existing content collections:
   - Articles collection: title, date, category, type, authors array, draft flag, MDX body
   - Projects collection: title, description, tags array, linkedArticle, draft flag, MDX body

3. **Update `astro.config.mjs`:**
   - Add Keystatic integration
   - Set output to `hybrid` (Keystatic needs server routes for its admin UI)
   - Add Vercel adapter for hybrid mode

4. **Add Keystatic pages.** Keystatic auto-generates its admin routes, but verify `/keystatic` loads correctly in dev.

5. **Migrate existing content.** Ensure the 3 articles and 6 projects work with Keystatic's expected file structure (they should — Keystatic reads from the same `src/content/` directory).

6. **Test the editor.** Create a test article through the Keystatic UI at `localhost:4321/keystatic`, verify it creates an .mdx file with correct frontmatter, and that the article renders correctly on the site.

**Verification:** Navigate to `/keystatic` in dev, create a new article, save it, verify it appears on the home page feed and renders correctly as a full article.

---

### Phase 6: Polish and Ship

**Goal:** Final QA, performance, accessibility, and deploy.

**Tasks:**

1. **Cross-browser check.** Test in Chrome, Firefox, Safari. Key things: CSS grid transitions, rgba transparency, Google Fonts rendering, scrollbar styling.

2. **Responsive QA.** Test at all 4 breakpoints (375, 768, 1200, 1440) plus a few odd sizes in between. Pay attention to:
   - Sidebar collapse behavior at tablet→mobile transition
   - Card grid reflow on projects page
   - Article content readability at all widths
   - Image/video blocks scaling

3. **Accessibility pass:**
   - Keyboard navigation (tab order, focus states)
   - Screen reader: semantic HTML, ARIA labels (existing ones look good)
   - Color contrast ratios (especially text-on-dark-muted on content-bg)
   - Reduced motion: respect `prefers-reduced-motion` for grid animations and cursor trail

4. **Performance:**
   - Lighthouse audit
   - Google Fonts: use `display=swap` to prevent FOIT
   - Images: add width/height attributes, consider lazy loading
   - CursorTrailGrid: verify no layout thrashing on resize

5. **Meta tags and SEO:**
   - Page titles and descriptions for each route
   - Open Graph / social card meta tags
   - Sitemap (Astro has a sitemap integration)
   - robots.txt

6. **Deploy.** Push to GitHub main branch → Vercel auto-deploys. Verify:
   - Build succeeds
   - All routes work
   - Keystatic admin accessible (if hybrid mode configured)
   - Custom domain if applicable

---

## Execution Order for Cursor

This is the recommended order for handing phases to Cursor:

1. **Phase 1** first — everything else depends on correct tokens
2. **Phase 2** second — layout is the skeleton
3. **Phase 3** third — fill in the pages
4. **Phase 4** fourth — tune the interactive layer to the new palette
5. **Phase 5** fifth — CMS is additive, doesn't affect visual layer
6. **Phase 6** last — QA and ship

Each phase can be a separate Cursor session/prompt. Reference this doc + the Figma file + CLAUDE.md in each session.

---

## Reference Docs

| Doc | Location |
|---|---|
| Project context | `astro/CLAUDE.md` |
| Color tokens | `CL-01W-color-tokens.md` |
| Figma designs | https://www.figma.com/design/ZppG0NGKHwQhFylxGUvJ7k |
| This plan | `CL-01W-rebuild-plan.md` |

---

## Decisions Log (Addendum)

| Date | Decision | Rationale |
|---|---|---|
| 2026-02-09 | Keystatic for CMS | Git-based, browser admin UI, writes MDX to repo, no external service |
| 2026-02-09 | Figma Dev Mode (not Figma Sites) | Sites is a website builder; Dev Mode is design-to-code handoff — matches Astro workflow |
| 2026-02-09 | Breakpoints: 375/768/1200/1440 | Industry-standard widths, covers iPhone SE through large desktop |
| 2026-02-09 | Urbanist over Neue Einstellung | Free (Google Fonts), similar geometric sans aesthetic, no licensing issues |
| 2026-02-09 | 17 color tokens in Figma Variables | Named variables map 1:1 to CSS custom properties, Cursor reads them via Figma MCP |

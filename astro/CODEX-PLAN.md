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
3. No additional pages beyond Home, Article, and Projects.

## Source of Truth
- Codebase: `/Users/hafsah/ClaudeCoWork/projects-inprogress/CL-01W/astro`
- Design: Figma file `CL-01W` (Blog - v2 frames and node IDs in the rebuild plan).
- Tokens: `/Users/hafsah/ClaudeCoWork/projects-inprogress/CL-01W-color-tokens.md`

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

## Deliverables
1. Updated Astro site matching Figma visuals for all three pages.
2. Tokenized design system in `tokens.css`.
3. Clean, consistent breakpoints and typography across pages.
4. Keystatic CMS integration for articles.
5. Vercel deployment ready.

## Risks / Open Questions
1. Figma coverage for Tablet and Desktop-mini is inferred; interpolate carefully.
2. Control Panel visuals in Figma may need interpretation unless a specific frame exists.
3. Keystatic specifics (schema, content location, deployment) require alignment to avoid breaking routes.

## Stakeholder Sign-Off
Implementation must not begin until the stakeholder explicitly approves the plan.

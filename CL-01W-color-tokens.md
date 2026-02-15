# CL-01W Color Tokens

Extracted from the Figma designs (Blog - v2 page). These map directly to CSS custom properties in the Astro build.

---

## Backgrounds

| Token name | Value | Where it's used |
|---|---|---|
| `page-bg` | `#ffeded` | Full page background (light pink) |
| `content-bg` | `#08131b` | Content area / dark panel |
| `sidebar-bg` | `rgba(255, 255, 255, 0.80)` | Sidebar (semi-transparent white) |
| `card-bg` | `rgba(7, 81, 135, 0.49)` | Article snippet cards (blue glass) |
| `codeblock-bg` | `#001a2b` | Code blocks (deep navy) |
| `quote-bg` | `rgba(147, 49, 166, 0.44)` | Blockquote background (purple) |

## Text

| Token name | Value | Where it's used |
|---|---|---|
| `text-primary` | `#001a2b` | Sidebar headings, logo text |
| `text-secondary` | `rgba(0, 0, 0, 0.44)` | Nav links (sidebar, light bg) |
| `text-tertiary` | `rgba(0, 0, 0, 0.50)` | Footer copyright |
| `text-on-dark` | `#ffffff` | Article body text (on dark bg) |
| `text-on-dark-muted` | `rgba(255, 255, 255, 0.80)` | Bylines, metadata tags (on dark bg) |
| `text-code` | `rgba(74, 246, 255, 0.40)` | Code block text (cyan) |

## Accents

| Token name | Value | Where it's used |
|---|---|---|
| `accent-primary` | `#ec8cff` | Pixel titles, prev/next nav, quote border (pink/magenta) |
| `accent-purple` | `rgba(147, 49, 166, 0.44)` | CTRL PANEL button text, quote bg |
| `accent-grid` | `rgba(143, 98, 255, 0.35)` | Grid background lines (purple) |

## Borders

| Token name | Value | Where it's used |
|---|---|---|
| `border-light` | `rgba(255, 255, 255, 0.80)` | Metadata tags (0.5px), card borders (1px) |
| `border-quote` | `#ec8cff` | Blockquote left border (10px) |

---

## As CSS custom properties

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

## How to set these up in Figma

### Option A: Figma Variables (recommended)

1. Open the **Variables** panel (click the grid icon in the right sidebar, or go to the main menu → Variables)
2. Create a new **Collection** called "Color Tokens"
3. For each token above, click **+** to add a new variable:
   - Name it using the token name (e.g., `page-bg`, `content-bg`)
   - Set the type to **Color**
   - Enter the hex or rgba value
4. Once created, apply them to your frames:
   - Select a frame → in the Fill section, click the color swatch → click the **Variables** icon (small square grid) → pick the token

When Cursor reads your file through the Figma MCP, it will see named variables instead of raw hex values, and can map them directly to CSS custom properties.

### Option B: Color Styles (simpler, less powerful)

1. Select any element with a fill color you want to tokenize
2. In the right panel under **Fill**, click the 4-dot icon → **Create style**
3. Name it with the token name
4. Repeat for each color

Color Styles are easier to set up but don't support modes (light/dark) or aliasing like Variables do. For your project, either approach works — Variables are just more future-proof.

---

## Notes for the build

- The `accent-grid` color is used for the grid background lines in Figma, but the actual CSS trail grid will use CSS custom properties controlled by the Control Panel. The Figma value is the default/reference.
- Several tokens use rgba with transparency — these are intentional for the glass/layered aesthetic. In CSS, these work as-is.
- The `quote-bg` and `accent-purple` are the same value (`rgba(147, 49, 166, 0.44)`) — they're semantically different (one is a background, one is text) but visually identical. Keeping them as separate tokens lets you change one without affecting the other.

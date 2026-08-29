# MUREC — Redesigned Home Page

A ground-up UI redesign of the MUREC (Madhusudan Urban Real Estate Collection) home page,
built with **React + Vite + Tailwind CSS v4 + Framer Motion**. All copy, images, video and
links are sourced from [murec.com](https://www.murec.com/) — only the interface, layout and
motion are new.

Design language takes its cue from [timeless.club](https://timeless.club/en): a moody,
near-black canvas, a restrained serif/sans type pairing, generous negative space, ambient
gradient glows, and an editorial tab-driven content explorer — reinterpreted with a palette
and voice that belong to MUREC's own world (heritage, forest, and IGBC-certified sustainable
design) rather than copied wholesale.

## Design plan

**Palette**
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0a0b09` | Base background |
| `ink-2` | `#14150f` | Secondary section background |
| `surface` | `#181910` | Card surfaces |
| `parchment` | `#ece6d8` | Primary text |
| `parchment-dim` | `#b9b3a3` | Secondary text |
| `moss` | `#7c8a63` | Accent — IGBC / sustainability / "Forest Walk" |
| `brass` | `#b98f52` | Accent — legacy, heritage, primary CTAs |

**Type**
- `Fraunces` (display serif) — headlines, quotes, the wordmark. Set light/regular with tight
  tracking on large sizes, italic for editorial voice.
- `Inter` (sans) — body copy, navigation, and a small-caps "eyebrow" utility
  (`0.72rem`, `0.32em` tracking) used for labels throughout, echoing the reference site's
  understated navigation typography.

**Layout**
- Full-bleed video hero with a single serif thesis statement and a slow parallax pull.
- **Signature element:** a tabbed "Explorer" (Legacy / Principles / Collection) that
  re-interprets Timeless's Flavours–Bar–Snacks menu switcher for MUREC's three home-page
  pillars — image and copy cross-fade as the visitor switches tabs.
- IGBC philosophy section as a quiet, centered statement with ambient blurred glows.
- Editorial two-up partner quotes, a logo strip for associations, a closing CTA band, and a
  structured footer carrying the legal disclaimer and corporate details verbatim.
- Scroll-triggered reveals (Framer Motion `whileInView`) are used once per section rather
  than scattered per element, so the page-load rhythm reads as one orchestrated pass.

## Project structure

```
src/
  data/
    content.js       # All Murec copy, links & media in one place (single source of truth)
  components/
    Navbar.jsx        # Fixed nav, scroll-aware background, mobile menu
    Hero.jsx           # Full-bleed video hero with parallax
    Explorer.jsx        # Signature tabbed Legacy/Principles/Collection section
    Philosophy.jsx      # IGBC design philosophy statement
    Associations.jsx    # Partner/association logo strip
    Partners.jsx         # Editorial partner quote cards
    Contact.jsx           # Closing "Get in Touch" CTA
    Footer.jsx             # Address, contact, disclaimer, socials
    Reveal.jsx              # Shared scroll-reveal wrapper (motion primitive)
  App.jsx
  main.jsx
  index.css            # Tailwind v4 theme tokens + base styles
```

Content is centralized in `src/data/content.js` so copy or links can be updated without
touching any component.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Notes

- Responsive from ~360px mobile through desktop; layouts collapse to a single column on
  small screens and re-flow to multi-column grids from the `md` breakpoint up.
- Respects `prefers-reduced-motion`.
- Visible keyboard focus rings on all interactive elements.
- Images/video are referenced directly from murec.com's own CDN, matching the assignment's
  "use the original content" requirement without re-hosting assets.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for a fictional luxury interior design studio ("ELORIA").
Vite + React 19 + TypeScript SPA, Tailwind CSS 3, framer-motion. No backend, no tests.

## Commands

| Command | Notes |
|---|---|
| `npm run dev` | Vite dev server on **port 3000** |
| `npm run build` | `tsc -b` typecheck **then** `vite build` — a type error fails the build |
| `npm run lint` | ESLint flat config |
| `npm run preview` | Serve the production build |

No test framework is configured. Node >= 20.19 required.

## Architecture

**Routing** — `main.tsx` mounts `BrowserRouter`; `App.tsx` declares all routes inside a single
`<Route element={<Layout />}>`. `Layout.tsx` is the only shell: `ScrollToTop` (resets scroll on
every pathname change) + `Navbar` + `<Outlet />` + `Footer`. Adding a page means adding a file in
`src/pages/` and one `<Route>` in `App.tsx`; the nav menu is a separate hardcoded `menuItems`
array at the top of `src/sections/Navbar.tsx` — update both.

**pages/ vs sections/** — this split is not cosmetic:
- `src/sections/*` are the **home page** composition blocks (Hero, About, FeaturedSlider,
  Services, Listings, Journal) plus the global Navbar/Footer. They read their copy from
  `src/data/content.ts` and use bundled images from `src/assets/img/`.
- `src/pages/*` are standalone routes. `Home.tsx` is a 19-line file that just stacks the
  sections. Every other page (About, Projects, Services, Journal, Contact) is a self-contained
  300–500 line file that **defines its own local data arrays inline** and pulls imagery from
  remote Unsplash URLs rather than from `content.ts` or `assets/`. Editing home-page copy means
  editing `content.ts`; editing any other page's copy means editing that page file.

**Styling** — hand-written Tailwind using a hardcoded warm palette in literal hex:
`#2b241d` / `#33291f` / `#241c14` (dark browns, text and dark sections), `#6b6156` / `#8a7d6c` /
`#a89a83` (muted body copy), `#e2d9c8` / `#f6f2ea` / `#faf7f1` (cream backgrounds), `#e9ebef`
(page background, set on `Layout`). Match these literals when adding UI.

`index.css` defines only four CSS variables (`--background`, `--foreground`, `--border`,
`--radius`), consumed by the `body`/`*` base layer and by the `borderRadius` scale in
`tailwind.config.js` — so `rounded-lg` is 0.625rem, not Tailwind's default. There is no dark
theme despite `darkMode: ["class"]` being set.

The one custom class is `.font-serif-display` (Playfair Display) in `index.css`, used for all
display headings; body text is Inter. Both come from a Google Fonts `@import`.

**Animation** — framer-motion throughout. The recurring idiom is a local
`const fadeUp = { initial: {opacity:0,y:40}, whileInView: {opacity:1,y:0}, viewport: {once:true,
margin:"-80px"} }` object spread onto `motion.*` elements, re-declared per file. Hero images
animate with a scale-down `[0.22, 1, 0.36, 1]` ease. `pages/About.tsx` has a `CountUp` component
driven by `useInView` + `requestAnimationFrame`.

**Contact form** — `pages/Contact.tsx` holds a controlled multi-field form whose `handleSubmit`
is a stubbed 1.5s `setTimeout`, not a real backend call. There is no API layer in the project.

## Conventions & gotchas

- `@/` aliases `src/` (set in both `vite.config.ts` and `tsconfig.app.json`).
- Import from `react-router` (v7), not `react-router-dom`.
- `src/lucide-react.d.ts` ambiently declares `lucide-react` because the package ships no types —
  icon imports are `any`. Don't delete it; typecheck breaks.
- Runtime dependencies are deliberately minimal: react, react-dom, react-router, framer-motion,
  lucide-react. A vendored shadcn/ui library was removed as unused — if you want one of its
  components, run `npx shadcn@latest init` then `add <component>` rather than hand-rolling the
  Radix wiring.
- Deployment: Vercel auto-detects the Vite preset. `vercel.json` only adds the SPA rewrite to
  `index.html` and immutable caching for `/assets/*`.

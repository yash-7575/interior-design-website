# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for **MegaDream Associates**, a real turnkey interior execution and
furniture manufacturing firm in Pune, India. Vite + React 19 + TypeScript SPA,
Tailwind CSS 3, framer-motion. No backend, no tests.

**Business details live in exactly one place: `src/data/business.ts`** — name, phone
numbers, WhatsApp number, email, address, maps link, working hours, socials and the
headline stats. Never hardcode a phone number or address in a component; import from
there. `whatsappLink(message?)` in that file builds the `wa.me` deep links every CTA
uses. Items marked `// TODO:` in that file are placeholders awaiting client
confirmation.

**Leads route to WhatsApp, not a backend.** `pages/Contact.tsx` formats its form fields
into a message and opens `wa.me` in a new tab; there is no API layer. A floating
`WhatsAppButton` is mounted globally in `Layout.tsx`.

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

**Service catalogue** — `src/data/services.ts` holds all 25 services grouped into six
`serviceGroups`; `allServices` is the flat numbered list derived from those groups, so
the "Everything We Execute" section on the Services page cannot drift out of sync with
the category tabs. Add a service to a group's `features` and both update.

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

**Logo** — `src/components/Logo.tsx` draws the yellow MD disc as inline SVG (`LogoMark`)
plus the MEGADREAM wordmark. It is a placeholder: when the client supplies the
high-resolution logo file, swap the `<svg>` for an `<img>` and the layout is unchanged.
`public/favicon.svg` is the same mark and should be updated alongside it.

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
- Imagery is still placeholder: home-page sections use the bundled stock photos in
  `src/assets/img/`, and the standalone pages pull from Unsplash URLs. Every array holding
  project names, locations or photos carries a `// TODO:` marking it for replacement with
  the client's real project photography.

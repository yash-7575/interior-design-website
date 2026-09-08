# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site for **MegaDream Associates**, a real turnkey interior execution and
furniture manufacturing firm in Pune, India. Vite + React 19 + TypeScript SPA,
Tailwind CSS 3, framer-motion. Supabase (Auth + Postgres + Storage) backs the
`/admin` panel and the projects page. No tests.

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

`supabase/migrations/0001_projects.sql` is the committed record of the database schema,
RLS policies and storage bucket. It is not run by any build step — apply it once through
the Supabase SQL editor or CLI.

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
  sections. About, Services, Journal and Contact are self-contained 300–500 line files that
  **define their own local data arrays inline** — editing home-page copy means editing
  `content.ts`, editing one of those pages means editing that page file. `Projects.tsx` is
  the exception: it renders `src/data/projects.ts` and holds no project data of its own.

**Project portfolio** — two sources, merged at runtime by `src/hooks/useProjects.ts`:

- `src/data/projects.ts` is the **bundled baseline** — ten curated projects imported at build
  time as fingerprinted WebP with hand-written captions. Each `Project` carries a descriptive
  name, a `ProjectCategory`, a `scope` line and an `images: ProjectImage[]` gallery where every
  frame has a `caption` used as both alt text and lightbox caption. Deliberately no `location`
  or `year` field: the photographs arrived without project identity attached, so projects are
  named for the work visible in the frame rather than for an invented address.
- **Supabase** holds whatever the client publishes themselves through `/admin`.
  `useProjects` maps those rows onto the *same* `Project` shape (using `slug` as the
  `Project.id`) and puts them ahead of the bundled set, so `Lightbox`, the category filter and
  the search all work on CMS content with no special-casing. The `category` CHECK constraint in
  the migration must stay in step with `ProjectCategory`.

**The fallback is load-bearing.** If Supabase is unreachable, misconfigured, or
`VITE_SUPABASE_*` is unset, `/projects` renders the bundled ten rather than an empty grid, and
a stalled request clears its skeletons after 5s. Keep that property when touching the hook —
it is why the site cannot be taken down by a backend outage.

**Admin panel** — `/admin` is a second route group in `App.tsx`, deliberately *outside*
`<Route element={<Layout />}>` so it gets none of the marketing chrome. `/admin/login` is
public; everything else sits behind `components/admin/RequireAuth.tsx`, which waits for
`AuthProvider` to restore the session before deciding to redirect (without that gate a refresh
flashes the login screen). All reads and writes go through `src/lib/adminProjects.ts`.
Authorisation is enforced by Postgres RLS, never by the client — the browser only ever holds
the anon key. **Never add the service-role key to this repo.**

Deleting a project removes its storage objects *first*, then the row: `project_images` cascades
with the project but storage objects do not, and an orphaned file is invisible through the UI.

`content.ts` derives the home page's `featured`, `listings` and `posts` from the **bundled**
array only. The home page is a fixed composition (three slider items, a five-card mosaic with
one `wide` slot) and deliberately does not show CMS projects.
`components/Lightbox.tsx` renders the galleries (Escape closes, arrows page, body scroll locks).

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
  lucide-react, @supabase/supabase-js. A vendored shadcn/ui library was removed as unused — if you want one of its
  components, run `npx shadcn@latest init` then `add <component>` rather than hand-rolling the
  Radix wiring.
- Deployment: Vercel auto-detects the Vite preset. `vercel.json` only adds the SPA rewrite to
  `index.html` and immutable caching for `/assets/*`. `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` must be set in the Vercel project or `/admin` cannot sign in.
- Supabase image transformations are **not** used for thumbnails — they are a paid-plan feature
  that fails silently on the free tier. `ProjectImage.thumb` stays undefined for CMS images.
- Imagery is the client's own, bundled as WebP under `src/assets/img/projects/` and named for
  what the photograph shows. There are no remote image URLs left anywhere in `src/` — keep it
  that way; import assets so Vite fingerprints and caches them. Two exceptions are generated
  rather than photographed, both marked in `content.ts`/`Projects.tsx`: the full-bleed hero and
  the Projects page banner, because no supplied photograph was wide or high-resolution enough.
- Still outstanding: the two `team` members in `pages/About.tsx` have no photographs and fall
  back to initials (`// TODO:` there). Never substitute a stock face under a real person's name.
- The client's 11 site videos are in the shared Drive folder and unused — the repo bundles no
  video. Compress before ever committing one; the raw clips run to 137 MB.
- A Sanity Studio previously occupied this role in `studio/`. It was never connected to an
  account and was removed when Supabase replaced it; don't resurrect references to it.

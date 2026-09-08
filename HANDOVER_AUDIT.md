# Technical Handover & Audit Report — MegaDream Associates Website

**Audit date:** 2026-09-08
**Branch audited:** `claude/project-handover-audit-8yfya0` (clean, identical to `main` @ `57ee6ec`)
**Method:** Static source reading only — read-only inspection, no code modified, no packages installed

---

## ⚠️ Framing correction before anything else

The audit brief assumed an admin panel, database, authentication, and file uploads. **None of those exist in this application.** There is no backend, no API, no database, no login, and no upload endpoint in the site's code.

The nearest thing to an "admin panel" is a Sanity Studio in `studio/`, which is written but **not connected to any Sanity account yet** — so it does not currently function.

### Verification limits (read this first)

- `node_modules/` and `studio/node_modules/` are **NOT installed**. `npm run build`, `npm run lint` and `tsc -b` were **not run**. **No claim below that the code compiles, renders, or is responsive at runtime has been verified by execution.** Everything is inferred from source.
- Vercel project settings, DNS, the Sanity account, and dashboard state are not in the repo and could not be checked.
- **No secrets, API keys, or tokens** were found anywhere in `src/`, `studio/`, config files, or in git history. Only `.env.example` files are tracked; `.env` is gitignored.

---

## 1. Project overview

### In plain language

This is a **brochure website** — a marketing site for a Pune interior-design and furniture-manufacturing firm. It is a pure front-end application: everything a visitor sees is either compiled into the JavaScript bundle at build time, or fetched from a hosted content service (Sanity) at page load. There is no server the project owns, no database it controls, and no user accounts.

When a visitor fills in the contact form, **nothing is sent anywhere**. The browser formats the answers into a text message and opens WhatsApp with that text pre-filled. The visitor then presses send inside WhatsApp themselves. That is the entire lead pipeline.

The client is meant to be able to add new portfolio projects without a developer. That is what `studio/` is for — a Sanity Studio (a hosted CMS admin UI). It is written and schema-complete, but **it has never been connected to a Sanity account**, so today it cannot run and the website ignores it.

### Technical facts

| Concern | Finding | Evidence |
|---|---|---|
| Project name | `interior-design-website` (npm), site is "MegaDream Associates" | `package.json:2`, `src/data/business.ts:11` |
| Purpose | Marketing/portfolio site + WhatsApp lead capture | `src/pages/Contact.tsx:88-118` |
| Frontend framework | React 19.2 + TypeScript 5.9, Vite 7 SPA | `package.json` |
| Backend / API | **NONE.** No server code, no serverless functions, no `/api` | no `api/` dir, no fetch to own origin |
| Database | **NONE owned.** Sanity Content Lake is the only datastore, read-only, unconfigured | `src/lib/sanity.ts` |
| Authentication | **NONE in the app.** Sanity Studio would use Sanity's own hosted auth | no auth code anywhere in `src/` |
| Hosting | Vercel (config committed, account state unverifiable) | `vercel.json`, `README.md:38-46` |
| File upload | **NONE in the app.** Would live inside Sanity Studio if provisioned | no upload code in `src/` |
| Third-party services | Sanity (CMS, unprovisioned), Google Fonts (CSS `@import`), WhatsApp `wa.me`, Google Maps search link | `src/index.css:1`, `src/data/business.ts:47-52,71-74` |
| Package manager | npm (`package-lock.json` v3, 310 packages) | root lockfile |
| Languages | TypeScript, TSX, CSS | |
| Major libraries | react-router 7.18.2, framer-motion 13.1.1, lucide-react 0.562, @sanity/client 8.4.0, @sanity/image-url 2.1.1, Tailwind 3.4.19 | `package-lock.json` |
| Environments | Only two env vars, both public identifiers. **No separate dev/staging/prod config in the repo** | `.env.example` |
| Node | `>=20.19` declared | `package.json` |

### Architecture

```
Browser
 |-- Vite SPA bundle (all copy, all 39 WebP images compiled in)
 |     `-- /projects -> useProjects()
 |            |-- fetch Sanity CDN  --- currently a no-op (no project id) --,
 |            `-- fallback: 10 bundled projects  <- always renders ---------'
 |-- Contact form -> window.open("https://wa.me/...?text=...") -> WhatsApp (client's phone)
 `-- Every CTA -> wa.me / tel: / mailto:

Vercel  = static file host + SPA rewrite. No compute.
Sanity  = would hold CMS projects + images. NOT PROVISIONED.
```

---

## 2. File / folder structure

| Path | What it does | Used? | Complete? | Notes |
|---|---|---|---|---|
| `index.html` | SPA shell, all static SEO meta | Yes | For one page | Single global `<title>`/description for all 7 routes |
| `src/main.tsx` | Mounts `BrowserRouter` + `<App/>` in StrictMode | Yes | Yes | 11 lines |
| `src/App.tsx` | All 7 routes under one `<Layout>` | Yes | Yes | `/`, `/about`, `/projects`, `/services`, `/contact`, `/journal`, `*` |
| `src/components/Layout.tsx` | Only shell: ScrollToTop + Navbar + Outlet + Footer + WhatsAppButton | Yes | Yes | |
| `src/components/Lightbox.tsx` | Full-screen gallery; Esc closes, arrows page, body scroll lock, `role="dialog"` | Yes | Yes | No focus trap (see §11) |
| `src/components/Logo.tsx` | Inline SVG "MD" disc + wordmark | Yes | **Placeholder** | Awaiting real logo file (`Logo.tsx:7`) |
| `src/components/ScrollToTop.tsx` | Resets scroll on route change | Yes | Yes | |
| `src/components/WhatsAppButton.tsx` | Global floating CTA | Yes | Yes | |
| `src/pages/*` (7 files) | Standalone routes; About/Services/Journal/Contact hold their own inline data | Yes | Mostly | Journal articles have no detail pages |
| `src/sections/*` (8 files) | Home-page blocks + Navbar/Footer | Yes | Yes | |
| `src/data/business.ts` | **Single source of truth** for contact details, socials, stats | Yes | 3 TODOs | Stats are unverified placeholders |
| `src/data/projects.ts` | 10 bundled projects, 39 captioned images | Yes | Yes | The load-bearing fallback |
| `src/data/content.ts` | Home-page composition derived from `projects.ts` | Yes | Partial | 5 of 7 entries have empty `desc: ""` |
| `src/data/services.ts` | 6 groups -> 25 services (verified) + 6 process steps | Yes | Yes | Genuinely cannot drift |
| `src/hooks/useProjects.ts` | Merges Sanity + bundled, with 5s loading timeout | Yes | Code complete | **Never exercised against a live CMS** |
| `src/lib/sanity.ts` | Read-only client, `null` when env unset | Yes | Code complete | Currently always `null` |
| `src/lucide-react.d.ts` | Ambient decl — icons are `any` | Yes | Yes | Deleting breaks typecheck |
| `src/assets/img/` | 39 WebP, 3.4 MB total | Yes | Yes | All local, no remote URLs |
| `public/` | `favicon.svg` (284 B), `og-image.jpg` (1200x514) | Yes | Partial | **No `robots.txt`, no `sitemap.xml`** |
| `studio/` | Sanity Studio: config, CLI config, one schema, README | **Not running** | Code complete, **not provisioned** | No lockfile, no node_modules, no project id |
| `vercel.json` | SPA rewrite + immutable `/assets/*` caching | Yes | Partial | **No security headers** |
| `.github/` | — | — | — | **NOT FOUND** — no CI, no automated build/lint check |

---

## 3. Features implemented

### Public website

**Home page — COMPLETE (code)**
Files: `src/pages/Home.tsx` (19 lines) + `src/sections/{Hero,About,FeaturedSlider,Services,Listings,Journal}.tsx`, copy from `src/data/content.ts`.
How: fixed composition — hero, about + animated stat counters, 3-item slider, 5-category service tabs, 5-card mosaic (one `wide`), 3 journal teasers. Deliberately shows only bundled projects, never CMS ones.
Limitations: home-page CTAs use raw `<a href="/...">`, forcing a **full page reload** instead of client-side routing (`Hero.tsx:49,55`, `Listings.tsx:68,74`, `Services.tsx:62,68`, `About.tsx:70,76`, `Journal.tsx:32,38`).

**About page — COMPLETE with placeholders**
Files: `src/pages/About.tsx` (344 lines).
How: hero, story, `CountUp` stats (useInView + rAF), 4 values, 2-person team, CTA.
Limitations: both team members render **initials only** — no photographs (`About.tsx:50,60`). Team phone numbers are **hardcoded** (`About.tsx:49,59`), violating the project's own single-source-of-truth rule.

**Services page — COMPLETE**
Files: `src/pages/Services.tsx` (350), `src/data/services.ts`.
How: 6 tabbed groups -> 25 numbered services derived by `flatMap`, plus 6 process steps. Verified count: 6 groups, exactly 25 features.
Limitations: home page shows a **separate hand-written 5-item list** (`content.ts:44-51`) that omits "Residential Interiors" and duplicates the group titles — it can drift.

**Projects / portfolio — COMPLETE (bundled path only)**
Files: `src/pages/Projects.tsx` (294), `src/data/projects.ts`, `src/hooks/useProjects.ts`, `src/components/Lightbox.tsx`.
How: category filter (5 buttons), live text search over name/scope/description, responsive card grid, skeleton loaders, lightbox gallery, empty-state with "clear filters", featured teaser.
Limitations: **no per-project detail routes/URLs** — a gallery is modal state only, not linkable or shareable. Search/filter state is not in the URL either.

**Project detail pages — NOT IMPLEMENTED.** No `/projects/:slug` route exists. The Sanity schema defines a `slug` field the website **never uses as a URL** — it is only consumed as a document id (`useProjects.ts:39`).

**Contact page — PARTIAL**
Files: `src/pages/Contact.tsx` (541).
How: 5 contact cards, 7-field form, 7-question FAQ (`<details>`), map link. Submit builds a text block and calls `window.open(wa.me?text=...)`, then unconditionally shows a success panel.
Limitations: **no validation actually runs** (see §7 SEC-2); the `"error"` status is declared but never set — dead branch; no delivery confirmation is possible.

**Journal — PARTIAL / effectively decorative**
Files: `src/pages/Journal.tsx` (269), `src/sections/Journal.tsx`.
Limitations: **every "Read More" is `href="#"`** (`Journal.tsx:118`). There are no article bodies and no article routes. Category chips render with **no filter wired to them**. Home-page teasers pull from a different array (`content.ts:88-110`) where **2 of 3 have empty descriptions**. Dates (2025 - Feb 2026) are already stale.

**Testimonials — NOT IMPLEMENTED.** No testimonial data, component, or section exists anywhere.

**Gallery — COMPLETE** (the lightbox, see Projects above).

**404 page — COMPLETE.** `src/pages/NotFound.tsx`, wired to `path="*"`.

**Responsive design — PARTIAL / UNVERIFIED.** Tailwind `md:`/`lg:` breakpoints are used consistently across every page and section, mobile nav is a full-screen overlay, images use `object-cover` + `loading="lazy"`. This reads as fully responsive, but **it was never rendered** — no device testing evidence exists.

**SEO — PARTIAL.**
Present: one good `<title>`, meta description, `theme-color`, OG title/description/image (1200x514 real JPEG verified), Twitter card, `lang="en"`, semantic headings, alt text on **all 21 images** (verified programmatically).
Missing: **no per-route titles/meta** (every page shares the home title), **no `robots.txt`**, **no `sitemap.xml`**, **no canonical URL**, **no `og:url`**, **no JSON-LD / LocalBusiness schema** despite `business.ts:44` claiming the address is "flattened for schema.org" — that consumer does not exist. **No pre-rendering/SSR**, so crawlers see an empty `<div id="root">` on first byte.

### Admin panel

Every item below is **NOT IMPLEMENTED in this application**:

| Feature | Status |
|---|---|
| Admin login | **NOT IMPLEMENTED** (no route, no form, no auth code) |
| Authentication | **NOT IMPLEMENTED** |
| Dashboard | **NOT IMPLEMENTED** |
| Project create/edit/delete | **NOT IMPLEMENTED in-app** — would be Sanity Studio, unprovisioned |
| Image upload / management | **NOT IMPLEMENTED in-app** — would be Sanity, unprovisioned |
| Content management (copy, services, journal, business details) | **NOT IMPLEMENTED** — code edit + redeploy only |
| Any other CRUD | **NOT IMPLEMENTED** |

---

## 4. Admin panel — deep analysis

**There is no admin panel to trace.** The requested flow (LOGIN -> AUTH -> SESSION -> AUTHZ -> DASHBOARD -> CRUD -> DB -> STORAGE) **does not exist in this codebase**. Confirmed by grepping `src/` and `studio/` for `admin|login|auth|password|token|jwt|session|bcrypt|cookie|localStorage|sessionStorage` — the only hits are a resident's name in service copy, article author names, and comments explicitly stating no token is used.

**What exists instead:** `studio/` — a Sanity Studio v6 app, 5 source files, one document schema. If provisioned, the flow would be:

```
Client opens https://<hostname>.sanity.studio
        |  (Google SSO — Sanity's hosted identity, not ours)
   Sanity issues its own session
        |  (role check against Sanity project membership: Editor)
   Studio UI (structureTool + visionTool)
        |  create/edit/delete `project` documents, upload images
   Sanity Content Lake  +  Sanity asset CDN
        |  (public dataset, read via CDN)
   Website /projects renders them ahead of the bundled ten
```

### Answers to the specific questions

| Question | Answer |
|---|---|
| Where are admin credentials stored | **Nowhere in this repo.** They would be Sanity accounts (Google SSO) held by sanity.io |
| How are passwords handled | **No passwords exist in this project.** Delegated entirely to Sanity |
| Are passwords hashed | N/A — none stored |
| Authentication mechanism | **None implemented.** Sanity's hosted auth if provisioned |
| Session/token mechanism | **None.** The website's Sanity client is explicitly token-free and `useCdn: true` (`src/lib/sanity.ts:16-24`). No cookies, no localStorage, no JWT anywhere |
| How logout works | **NOT IMPLEMENTED** (Sanity Studio's own logout, if provisioned) |
| Protected routes | **NONE EXIST.** All 7 routes are public by design |
| Protected API endpoints | **NO API ENDPOINTS EXIST** |
| How authorization is enforced | Only by Sanity project membership, once provisioned. Nothing in this repo enforces anything |
| AuthN vs AuthZ distinction | **N/A** — neither is implemented |
| **Could an attacker access admin functionality without logging in?** | **There is no admin functionality in the deployed site to reach.** The site is 100% static public content; there is no privileged action a request to it can perform. The risk surface moves entirely to the Sanity project once created — and there the real control is who is invited as an Editor, plus the fact the dataset must be public-read. See SEC-4 |

**Provisioning gap (blocking):** `studio/README.md:52-84` documents the setup, but nothing has been done. Evidence: `SANITY_STUDIO_PROJECT_ID` is unset everywhere; `studio/sanity.config.ts:13-17` **throws at startup** without it; `studio/node_modules` absent; **`studio/package-lock.json` does not exist**, so studio dependency versions are unpinned.

---

## 5. Database

**The application owns no database.** No SQL, no ORM, no connection string, no migration files, no seed scripts. Confirmed by full-repo grep.

The only datastore is **Sanity Content Lake** (hosted document store), reached read-only from the browser.

- **Provider:** sanity.io, free plan per `studio/README.md:88-92`. **Project not created.**
- **Collections:** exactly one document type — `project` (`studio/schemaTypes/project.ts`).

### Schema (all validation is Studio-side only)

| Field | Type | Validation |
|---|---|---|
| `name` | string | required, 3-80 chars |
| `slug` | slug | required, from `name`, max 96 — **never used as a URL by the site** |
| `category` | string radio | required; Residential / Commercial / Modular / Furniture |
| `scope` | string | required, <= 70 |
| `description` | text | required, 40-600 |
| `images[]` | array of image (hotspot) | required, >= 1; each image's `caption` required, 10-160 |
| `order` | number | optional, ascending |

- **Relationships:** none. Flat, single-type.
- **Read path (the only one in the app):** `useProjects.ts:31-38` runs a GROQ query `*[_type == "project" && count(images) > 0] | order(coalesce(order,9999) asc, _createdAt desc)`. Reads **published documents only** — drafts are not returned to an unauthenticated client.
- **Write path:** **none from the website.** Writes happen exclusively inside Sanity Studio.
- **Access layer:** `src/lib/sanity.ts` — a client that is `null` unless `VITE_SANITY_PROJECT_ID` is set, `useCdn: true`, `timeout: 8000`, `maxRetries: 1`, **no token**.
- **Server-side vs client-side:** **100% client-side.** Every visitor's browser queries the Sanity CDN directly. Requires the dataset to be **public-read**.
- **Runtime validation:** `toProject()` (`useProjects.ts:47-68`) rejects documents missing `id`/`name`/`images`, rejects unknown categories, defaults `scope`/`description`/`caption`. Genuinely defensive and correct.
- **Authorization rules / RLS:** **NONE, and none possible** — a public Sanity dataset has no row-level security. Everything published is world-readable.
- **Seed data:** the 10 bundled projects in `src/data/projects.ts` are the de-facto seed — but compiled into the bundle, **not** loaded into Sanity. No import script exists.
- **Migrations:** **NOT FOUND**, and not applicable to Sanity's schemaless documents.

**What the admin can modify, once provisioned:** only the `/projects` page grid — adding, editing, reordering and deleting project entries and their photographs. **They cannot touch** the home page, About, Services, Journal, Contact, business phone numbers, address, hours, stats, or any site copy. All of that requires a code change and redeploy.

---

## 6. File / image upload system

**The website has no upload capability.** No `<input type="file">`, no `FormData`, no upload endpoint, no signed-URL logic anywhere in `src/`.

Uploads would occur **only inside Sanity Studio** (`images[]`, `type: "image"`, `options: {hotspot:true}`) once provisioned.

| Question | Finding |
|---|---|
| Where uploaded | Sanity's asset store / CDN (`cdn.sanity.io`) — third-party, not our infrastructure |
| Storage provider | Sanity (free tier: 100 GB assets, 100 GB bandwidth per `studio/README.md:88-92`) |
| Allowed file types | `type: "image"` — Sanity restricts to image MIME types. **No project-level allowlist configured** |
| File size limits | **NOT CONFIGURED in the schema.** Sanity's platform default applies. `studio/README.md:39-40` actively tells the client to upload originals from phone or camera |
| Filename handling | Sanity assigns content-hash asset ids; original filenames are not used in URLs — **no path-traversal or overwrite risk** |
| AuthN required | Yes — Sanity Studio login (Google SSO) |
| AuthZ required | Yes — Sanity project Editor role |
| Publicly accessible | **Yes, by design.** Public dataset => every uploaded asset is world-readable at its CDN URL, whether or not its document is published |
| Server-side validation | Sanity validates image type server-side; **our schema adds nothing** |
| Malicious file risk | **LOW.** The site renders assets only through `imageUrl()` (`src/lib/sanity.ts:35-38`) producing `<img src>` URLs. Sanity re-encodes/transforms images. No path makes an uploaded file executable on our origin. Residual risk is an authenticated Editor uploading inappropriate imagery — governance, not technical |
| Old files deleted/replaced | **NO.** Deleting a Sanity document does not delete its assets; orphaned assets accumulate against the 100 GB quota. No cleanup exists |

---

## 7. Security — preliminary audit

**Overall:** the attack surface is unusually small — a static site with no server, no database of its own, no auth, no uploads, and no user input that is ever persisted or reflected. Most classic vulnerability classes are **structurally absent**, not merely unobserved. The genuine findings are configuration and privacy issues, not code exploits.

### [HIGH] SEC-1 — No security headers on the production host

- **Finding:** `vercel.json` sets only a rewrite and asset caching. No CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, or `X-Frame-Options`.
- **Evidence:** `vercel.json` (entire file — 12 lines).
- **Why it matters:** no clickjacking protection (the site can be framed and overlaid), no MIME-sniffing protection, no CSP to constrain script origins if a third-party script is ever added, and full referrer leakage to WhatsApp/Instagram/YouTube/Google on every outbound click.
- **Impact:** clickjacking of the WhatsApp CTAs (a framed overlay could redirect enquiries to an attacker's number); referrer leakage of visited pages to third parties.
- **Fix:** add a `headers` block in `vercel.json` for `/(.*)`: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and a CSP allowing `self`, `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.sanity.io`, `*.api.sanity.io`.

### [HIGH] SEC-2 — Form input collected with validation entirely disabled

- **Finding:** the contact `<form>` carries `noValidate` (`Contact.tsx:264`), which **switches off** the browser validation implied by the `required`, `type="email"` and `type="tel"` attributes on all 7 fields — and `handleSubmit` (`Contact.tsx:88-118`) performs **no validation of its own**.
- **Evidence:** `src/pages/Contact.tsx:88-118, 264, 270-391`.
- **Why it matters:** the "required" markers shown to users are cosmetic. A blank or garbage submission proceeds straight to `window.open`.
- **Impact:** the client receives empty/nonsense WhatsApp enquiries with no name or contact detail; users get no field-level feedback. This is a **functional defect with security-adjacent input-handling implications** rather than an exploitable vulnerability — there is no server to inject into.
- **Fix:** remove `noValidate`, or better, validate in `handleSubmit` and render inline errors, plus length caps on `name`/`message` before URL construction.

### [MEDIUM] SEC-3 — Lead data leaves the app with no consent notice, no privacy policy, and no record

- **Finding:** `handleSubmit` places the visitor's name, email, phone, budget and free-text message into a `wa.me` URL query string. The Footer's "Privacy Policy" and "Terms of Service" links are `href="#"` — **there are no such pages**.
- **Evidence:** `Contact.tsx:98-114`; `Footer.tsx:148,150`.
- **Why it matters:** personal data (including budget, an inferred financial attribute) is handed to Meta/WhatsApp. The full message sits in a URL, visible in browser history, and may be captured by any browser extension or corporate proxy. There is no consent checkbox and no policy to point at. India's DPDP Act 2023 expects notice and purpose limitation.
- **Impact:** regulatory exposure for the client; no audit trail — if WhatsApp fails to open, the lead is **silently and permanently lost** with no server-side copy.
- **Fix:** write real Privacy Policy and Terms pages and link them; add a one-line consent notice above the submit button; consider a lightweight form backend (Formspree/Web3Forms/Vercel function) as a durable second copy of every lead.

### [MEDIUM] SEC-4 — Sanity dataset must be public-read, with no row-level security

- **Finding:** the browser queries Sanity directly with no token (`src/lib/sanity.ts:16-24`), which requires a **public** dataset.
- **Evidence:** `src/lib/sanity.ts:7-9`; `studio/README.md:60`.
- **Why it matters:** anyone who learns the project id (it is in the shipped JS bundle by design) can query the entire dataset via the public API and enumerate every document and asset — including any field the client might later add thinking it is internal.
- **Impact:** today, near-zero (only public portfolio content). It becomes real the moment anyone adds a client name, address, or pricing note to a project document.
- **Fix:** accept the model, but **write it into the client handover**: "anything typed into the Studio is public the moment it is saved." Never add a private field to this schema. Configure CORS origins to the production domain + localhost only, with **Allow credentials unchecked** (already correctly documented at `studio/README.md:74-82`).

### [MEDIUM] SEC-5 — No CI, no automated build/lint gate, no dependency-audit pipeline

- **Finding:** `.github/` **NOT FOUND**. Nothing runs `tsc -b` or `eslint` before a deploy.
- **Evidence:** repository root listing.
- **Why it matters:** `npm run build` runs `tsc -b` first, so a type error fails the Vercel build — but only after a push, and nothing checks lint or dependency advisories at all.
- **Impact:** broken deploys discovered late; vulnerable transitive dependencies go unnoticed indefinitely.
- **Fix:** a minimal GitHub Actions workflow running `npm ci && npm run lint && npm run build` on PRs, plus Dependabot.

### [LOW] SEC-6 — `studio/` dependencies are unpinned (no lockfile)

- **Finding:** `studio/package-lock.json` **NOT FOUND**, while `studio/package.json` uses caret ranges (`sanity: ^6.11.0`, `styled-components: ^6.5.3`).
- **Why it matters:** two developers, or two `npm install` runs a month apart, get different Sanity versions; a bad minor release breaks the client's only content tool with no rollback point.
- **Fix:** run `npm install` in `studio/` once and commit the resulting lockfile.

### [LOW] SEC-7 — Third-party font CDN loaded via CSS `@import`

- **Finding:** `src/index.css:1` imports Playfair Display + Inter from `fonts.googleapis.com`.
- **Why it matters:** a render-blocking third-party request on every page load; leaks visitor IPs to Google; a GDPR/DPDP irritant; site typography breaks if the CDN is unreachable.
- **Fix:** self-host both families under `src/assets/fonts/` with `@font-face` and `font-display: swap`. Also removes the `@import` from the CSP allowlist.

### [INFORMATIONAL] SEC-8 — Outbound link hygiene is correct

Verified: **21 of 21** `target="_blank"` links carry `rel="noreferrer noopener"`. `window.open` at `Contact.tsx:114` also passes `"noopener,noreferrer"`. **No reverse-tabnabbing exposure.**

### [INFORMATIONAL] SEC-9 — Classic injection classes are structurally absent

| Class | Status | Reason |
|---|---|---|
| SQL injection | **N/A** | No SQL, no database owned |
| NoSQL / GROQ injection | **N/A** | The GROQ query is a fixed template literal with **no interpolated user input** (`useProjects.ts:31-38`). Search/filter run client-side in JS on an already-fetched array (`Projects.tsx:78-89`) |
| XSS | **NOT FOUND** | Zero occurrences of `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, or `document.write` — verified by grep. React auto-escapes all rendered values, including CMS-supplied strings |
| Command injection | **N/A** | No server, no shell execution |
| Path traversal | **N/A** | No filesystem access; Sanity assets are content-hash addressed |
| Open redirect | **NOT FOUND** | Every external destination is a hardcoded constant from `business.ts`. No URL is ever built from user input or query params |
| CSRF | **N/A** | No state-changing endpoint exists to forge a request against |
| Brute-force / rate limiting | **N/A for the site** | No login. If provisioned, Sanity's own auth handles this |
| Password reset | **N/A** | No passwords |

### [INFORMATIONAL] SEC-10 — Secrets: clean

No hardcoded credentials, API keys, tokens, or connection strings found in `src/`, `studio/`, config, or lockfiles. `.gitignore` correctly excludes `.env` and `.env.*` while allowing `.env.example`. Git history contains **only** `.env.example` and `studio/.env.example` — **no `.env` file was ever committed**. Both env vars are public identifiers by design and correctly documented as such.

### [INFORMATIONAL] SEC-11 — Dependencies

310 packages in the root lock (v3). Key pinned versions: `react-router@7.18.2`, `framer-motion@13.1.1`, `@sanity/client@8.4.0`, `vite@7.3.6`, `react@19.2.x`, `tailwindcss@3.4.19`, `typescript@5.9.3`. All are current-generation and recently released; the runtime dependency list is deliberately minimal (7 packages).

**Vulnerability status could not be verified** — `node_modules` is not installed and `npm audit` was not run. **No claim is made that any dependency is or is not vulnerable.** Run `npm audit --omit=dev` before launch.

### [INFORMATIONAL] SEC-12 — HTTPS / CORS / debug

HTTPS is assumed to come from Vercel's automatic TLS (not asserted anywhere in the repo — unverifiable from code). CORS is not applicable to the site itself; the only cross-origin concern is Sanity's CORS allowlist, correctly documented but **not yet configured** because no project exists. No debug flags, no stray `console.log` in production paths — the single `console.error` (`useProjects.ts:88`) is a deliberate, appropriate failure log.

---

## 8. Environment & deployment

| Item | Value | Source |
|---|---|---|
| Hosting provider | Vercel (Vite preset auto-detected) | `README.md:38-46`, `vercel.json` |
| Build command | `npm run build` -> `tsc -b && vite build` (type error **fails** the build) | `package.json:8` |
| Output directory | `dist/` | Vite default |
| Start command | none (static). `npm run preview` serves a local prod build | `package.json:10` |
| Dev command | `npm run dev` -> Vite on **port 3000** | `vite.config.ts:11` |
| Node requirement | >= 20.19 | `package.json` engines |
| Env vars required | `VITE_SANITY_PROJECT_ID` (**currently unset**), `VITE_SANITY_DATASET` (defaults `production`). Studio: `SANITY_STUDIO_PROJECT_ID` (**required — throws if absent**), `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_HOSTNAME` | `.env.example`, `studio/.env.example` |
| Prod vs dev config | **No distinction exists.** Same two vars, same build, no staging config, no feature flags | — |
| Domain | **NOT CONFIGURED / NOT FOUND** in the repo. No canonical URL, no `og:url`, no domain string anywhere | — |
| API config | **N/A** — no API | — |
| DB connection | Sanity project id via `VITE_SANITY_PROJECT_ID` only | `src/lib/sanity.ts:13-14` |
| Storage config | **NONE** — delegated to Sanity | — |
| CI/CD | Vercel git integration assumed; **no GitHub Actions** | — |
| `studio/` deploy | Excluded from Vercel via `.vercelignore`; deployed separately with `npx sanity deploy` — **never run** | `.vercelignore`, `studio/README.md:52-66` |

### Things that will cause deployment problems

1. **`studio/sanity.config.ts:13-17` throws hard** if `SANITY_STUDIO_PROJECT_ID` is absent. The Studio cannot start today. **Blocking for the CMS.**
2. **`studio/` has no lockfile** -> `npm install` there resolves fresh versions each time; a Sanity minor bump could break the client's tool with no pinned rollback.
3. **Sanity CORS is unconfigured.** Even after the env var is set, `/projects` will log CORS errors until the production origin is added at manage.sanity.io. It will *silently fall back* to the bundled ten, making the failure easy to miss (`useProjects.ts:86-89` only writes to the console).
4. **No `robots.txt` / `sitemap.xml`** in `public/`.
5. **SPA with no pre-rendering.** All 7 routes serve an empty shell; search engines and social scrapers see no content on first byte, and every route shares one `<title>`. For a business whose sole discovery channel is Google, this is material.
6. **`.vercelignore` excludes `studio` from the build but not the deployment source** — harmless, but confirm the Vercel root directory is the repo root and the framework preset is Vite.
7. **Node 20.19+ must be set in Vercel project settings**; a default of Node 18 would fail the Vite 7 build.

---

## 9. Current status

Percentages are against *a delivered, launched client website*, not against "code written."

| Area | Status | Completion | Notes |
|---|---|---|---|
| Public website | Near-complete, unverified at runtime | **80%** | 7 routes built. Journal is a shell; no project detail pages; placeholder logo, stats, team photos |
| Admin login | **Not implemented** | **0%** | None exists; none planned in-app |
| Dashboard | **Not implemented** | **0%** | None exists; none planned in-app |
| Database | Code path complete, **not provisioned** | **35%** | Client + hook + schema written and defensive; **no Sanity project, no data, never exercised live** |
| CRUD | Schema-only, unreachable | **30%** | Would be Sanity Studio; **cannot start** without a project id |
| Image uploads | Delegated, unprovisioned, untested | **25%** | No size limits configured; no orphan-asset cleanup |
| Authentication | Not applicable / not implemented | **0%** | Delegated to Sanity if provisioned |
| Authorization | Not applicable / not implemented | **0%** | Public dataset; no RLS possible |
| Security | Small surface, config gaps | **55%** | Clean of injection/secrets; missing headers, validation, privacy policy, CI |
| Responsive UI | Written throughout, **never device-tested** | **75%** | Breakpoints consistent; zero verification evidence |
| Deployment | Config committed, state unknown | **50%** | `vercel.json` correct; no domain, no env vars, no CI, no Studio deploy |
| SEO | Basic tags only | **40%** | No sitemap/robots/canonical/per-route meta/JSON-LD/pre-render |
| Content accuracy | Placeholders present | **60%** | Stats, hours, maps link, logo, team photos all unconfirmed |

**Honest overall: ~55% of a deliverable product.** The front-end craft is high and mostly finished; the operational half — provisioning, verification, content confirmation, legal pages, SEO plumbing — is largely untouched.

---

## 10. What is left to build

### MUST DO before client delivery

**M1 — Install dependencies and prove the build passes.** *(LOW)*
Nobody has demonstrated this tree compiles in its current state. Run `npm ci && npm run lint && npm run build` and fix whatever surfaces. Everything else is speculation until this is done. Files: repo root.

**M2 — Provision Sanity end-to-end, or cut the CMS out entirely.** *(MEDIUM)*
Right now the client's promised self-service ability does not exist. Follow `studio/README.md:52-84`: create the project, set both env var pairs (locally *and* in Vercel), `npx sanity deploy`, add CORS origins with **Allow credentials unchecked**, invite the client as Editor. **Then publish a real test project and confirm it appears on `/projects`** — the entire Sanity path has never executed. Also commit `studio/package-lock.json`. Files: `studio/*`, `.env`, Vercel env settings. *If the client will not use it, delete `studio/`, `src/lib/sanity.ts` and `src/hooks/useProjects.ts` rather than shipping a dead half-feature.*

**M3 — Fix the contact form's dead validation.** *(LOW)*
Remove `noValidate` (`Contact.tsx:264`) or validate in `handleSubmit`; render field errors; handle the case where `window.open` returns `null` (popup blocked) by using the declared-but-unused `"error"` state instead of always showing success. Files: `src/pages/Contact.tsx`.

**M4 — Confirm every placeholder with the client, in writing.** *(LOW effort, HIGH consequence)*
The four `stats` (`business.ts:82-88`) — "12+ years", "250+ projects" — are explicitly flagged as unverified placeholders and displayed as fact in a large animated counter on two pages. Publishing unverified business claims is a real liability. Also confirm working hours (`business.ts:56`) and replace the Google Maps *search* link with the real place link (`business.ts:48`). Files: `src/data/business.ts`.

**M5 — Write and link Privacy Policy and Terms pages.** *(LOW)*
`Footer.tsx:148,150` are `href="#"`. The form collects personal data and routes it to Meta. Add two routes, add to `App.tsx`, link them. Files: `src/pages/`, `src/App.tsx`, `src/sections/Footer.tsx`.

**M6 — Add security headers to `vercel.json`.** *(LOW)* — see SEC-1.

**M7 — Fix or remove the Journal's dead links.** *(MEDIUM if building, LOW if removing)*
Six articles with `href="#"` "Read More" buttons (`Journal.tsx:118`) and a category row with no filter behind it. Either write the article bodies and add `/journal/:slug` routes, or drop the buttons and present the cards as non-clickable summaries. Shipping visibly broken buttons on a trust-selling site is worse than shipping fewer features. Files: `src/pages/Journal.tsx`, `src/data/content.ts`.

**M8 — Add `robots.txt`, `sitemap.xml`, canonical and `og:url`.** *(LOW)*
Requires knowing the final domain. Files: `public/`, `index.html`.

**M9 — Real device testing across the 7 routes.** *(MEDIUM)*
No evidence any page has been opened on a phone. Priority: mobile nav overlay, the Lightbox on small screens, the home mosaic, the contact form, and the `h-[92vh]` hero on short viewports.

**M10 — Fix internal navigation using `<Link>`.** *(LOW)*
11 internal links are raw `<a href="/...">`, each triggering a full reload that re-downloads the bundle and kills the SPA feel on exactly the CTA paths that matter most.

**M11 — Configure the domain and confirm the Vercel project.** *(LOW)*
Node >= 20.19, both env vars, custom domain, HTTPS.

### SHOULD DO

**S1 — Per-route SEO metadata.** *(MEDIUM)* All 7 routes share one title/description. Add `react-helmet-async` or a small `useEffect` title hook. High commercial value for a local-search business. Files: all `src/pages/*`.

**S2 — LocalBusiness JSON-LD.** *(LOW)* `business.ts:44` already flattens the address "for schema.org" — but **no consumer exists**. Add the script; directly improves Google Business surfacing.

**S3 — Project detail pages with real URLs.** *(MEDIUM)* Galleries are modal-only — nothing is shareable or linkable, and the Sanity `slug` field is collected but unused. `/projects/:slug` would make individual work sendable over WhatsApp, which is the client's entire sales channel.

**S4 — Second copy of every lead.** *(MEDIUM)* If WhatsApp fails to open, the enquiry vanishes with no record. A Formspree/Web3Forms/Vercel-function mirror costs little and eliminates silent lead loss.

**S5 — Replace the placeholder logo.** *(LOW)* `Logo.tsx` + `public/favicon.svg` must change together.

**S6 — Self-host fonts.** *(LOW)* — see SEC-7.

**S7 — Add CI.** *(LOW)* — see SEC-5.

**S8 — Derive the home-page service list from `services.ts`.** *(LOW)* `content.ts:44-51` is a hand-written 5-item duplicate of the 6 group titles, omitting "Residential Interiors". It can drift; the Services page cannot.

**S9 — Team photographs.** *(LOW)* Two initials-only cards on the About page. The existing decision *not* to use stock faces is correct — get real photos.

**S10 — Focus trap + return-focus in the Lightbox.** *(LOW)* `aria-modal="true"` is set but focus is not managed, so keyboard users tab into the page behind the overlay.

### NICE TO HAVE

- **N1 — Testimonials section** *(MEDIUM)* — the strongest missing trust signal for this business type; nothing exists today.
- **N2 — Filter/search state in the URL** on `/projects` *(LOW)*.
- **N3 — Client-visible error notice** when Sanity fails, instead of a silent console-only fallback *(LOW)*.
- **N4 — Compress and add the 11 client videos** currently sitting unused in Drive at 137 MB raw *(MEDIUM)*.
- **N5 — Analytics** (Vercel Analytics or Plausible) — currently zero visibility into traffic or conversion *(LOW)*.
- **N6 — Deduplicate `CountUp`**, defined identically in `pages/About.tsx:10` and `sections/About.tsx:7` *(LOW)*.
- **N7 — Sanity orphan-asset cleanup** routine *(LOW)*.

---

## 11. Bugs / problems / technical debt

### A. Confirmed — verified directly in source

| # | Issue | Location |
|---|---|---|
| A1 | **`noValidate` disables all form validation**; `handleSubmit` adds none — blank submissions proceed | `Contact.tsx:264`, `88-118` |
| A2 | **`"error"` status declared but never set** — dead branch; a blocked popup still shows "success" | `Contact.tsx:86`, `114-117` |
| A3 | **Footer Privacy Policy / Terms are `href="#"`** — dead links on every page | `Footer.tsx:148,150` |
| A4 | **All 6 Journal "Read More" links are `href="#"`** | `Journal.tsx:118` |
| A5 | **Journal category chips render but no filter is wired to them** | `Journal.tsx:76` |
| A6 | **2 of 3 home-page journal teasers have `desc: ""`**; 3 of 4 home service items have `desc: ""` | `content.ts:60-62, 97, 105` |
| A7 | **11 internal links use raw `<a href="/...">`** -> full page reload, SPA state lost | `Hero.tsx:49,55`; `sections/About.tsx:70,76`; `sections/Services.tsx:62,68`; `Listings.tsx:68,74`; `sections/Journal.tsx:32,38`; `pages/About.tsx:158` |
| A8 | **Team phone numbers hardcoded**, violating the project's documented single-source rule | `pages/About.tsx:49,59` |
| A9 | **`CountUp` duplicated verbatim** in two files (~28 lines each) | `pages/About.tsx:10`, `sections/About.tsx:7` |
| A10 | **Home service list duplicates group titles and omits one of six** | `content.ts:44-51` vs `services.ts` |
| A11 | **Stats presented as fact are flagged unverified in their own comment** | `business.ts:82-88` |
| A12 | **Maps link is an address *search*, not the business's place link** | `business.ts:48-53` |
| A13 | **Logo and favicon are placeholders** | `Logo.tsx:7`, `public/favicon.svg` |
| A14 | **Two team members have no photographs** (initials fallback) | `pages/About.tsx:50,60` |
| A15 | **`studio/sanity.config.ts` throws at startup** without `SANITY_STUDIO_PROJECT_ID` — Studio cannot run today | `studio/sanity.config.ts:13-17` |
| A16 | **`studio/package-lock.json` missing** — unpinned CMS dependencies | `studio/` |
| A17 | **No `robots.txt`, no `sitemap.xml`** | `public/` |
| A18 | **Single global `<title>`/description for all 7 routes** | `index.html:6-11` |
| A19 | **No JSON-LD despite `business.ts:44` claiming schema.org use** — the stated consumer does not exist | `business.ts:44` |
| A20 | **No `.github/` — zero CI** | repo root |
| A21 | **Journal dates are stale** (Sep 2025 - Feb 2026) | `Journal.tsx:13-74` |
| A22 | **Lightbox has `aria-modal` but no focus trap or focus restoration** | `Lightbox.tsx:14-33` |
| A23 | **CMS-image `thumb` optimisation never applies to bundled images** — `ProjectCard` requests the full-size WebP for every grid card (`cover.thumb ?? cover.src`), and no bundled image sets `thumb` | `Projects.tsx:33`, `projects.ts:100-104` |

### B. Conflicts between documentation and implementation

| # | Conflict |
|---|---|
| B1 | `CLAUDE.md:13-14` and `README.md` state business details "live in exactly one place" and "never hardcode a phone number in a component." **`pages/About.tsx:49,59` hardcodes two.** |
| B2 | `CLAUDE.md` documents the Sanity integration in the present tense as if operational. **It has never been connected to an account and cannot currently run.** |
| B3 | `business.ts:44` says the address is "flattened for schema.org." **No schema.org output exists.** |
| B4 | `studio/README.md:33-35` tells the client "the project appears on `/projects` within a few seconds." **Untestable and unproven — the path has never executed.** |

### C. Suspected — flagged, not proven

| # | Suspicion | Why unproven |
|---|---|---|
| C1 | **`content.ts` can crash the entire app at module load.** `project(id)` throws on an unknown id (`content.ts:17-21`) and hardcoded indexes like `.images[5]` (`content.ts:93`) would throw on `undefined`. Both run at import time, so a mistake in `projects.ts` white-screens **every route** | Current data is consistent; a fragility, not a live bug |
| C2 | **The 5s loading-timeout race.** `useProjects.ts:79-81` sets `loading=false` at 5s, but `.finally()` can also fire later. Skeletons may flash back or data arrive after the grid settles | Needs a live Sanity endpoint under a slow network |
| C3 | **Responsive layout defects.** `h-[92vh] min-h-[620px]` hero, the 5-card mosaic, and the Lightbox flex column on small landscape viewports are the likely trouble spots | Never rendered — no device testing possible |
| C4 | **`useCdn: true` caching delay.** The client may publish and not see the change immediately, contradicting the README's "few seconds" | Requires a live project |
| C5 | **CMS/bundled category drift.** `useProjects.ts:45` silently discards any document whose category is not in the hardcoded set — a schema edit without a matching code change makes projects vanish with no error shown to the client | Correct today; a maintenance trap |
| C6 | **Unused dependencies.** All 7 runtime deps appear used (`@sanity/*` only via the currently-dormant path) | Could not confirm with bundle analysis — `node_modules` absent |

---

## 12. Client-ready checklist

### Generic

- [ ] Public website works *(**unverified** — never built or rendered in this audit)*
- [ ] Mobile responsive *(written, **never device-tested**)*
- [ ] ~~Admin login works~~ — **N/A: no admin login exists**
- [ ] ~~Admin routes protected~~ — **N/A: no admin routes exist**
- [ ] ~~API routes protected~~ — **N/A: no API exists**
- [ ] Database configured — **NOT DONE: Sanity project does not exist**
- [ ] CRUD tested — **NOT DONE: Studio cannot start**
- [ ] Image uploads tested — **NOT DONE**
- [ ] Error handling *(fallback path well designed but never exercised)*
- [ ] Production environment variables — **NOT SET**
- [ ] Security review *(this document; fixes not applied)*
- [ ] Deployment *(config committed; live state unverifiable)*
- [ ] Domain — **NOT CONFIGURED**
- [ ] Backup/recovery *(Sanity export exists via `npx sanity dataset export`; **no schedule or owner assigned**)*
- [ ] Final client testing

### Project-specific — added from this audit

- [ ] `npm ci && npm run lint && npm run build` passes locally
- [ ] Sanity project created; both env var pairs set locally **and in Vercel**
- [ ] `npx sanity deploy` run; Studio URL handed to the client
- [ ] CORS origins added (prod + localhost:3000), **Allow credentials unchecked**
- [ ] Client invited as Editor; **one real test project published and confirmed on `/projects`**
- [ ] `studio/package-lock.json` committed
- [ ] **Fallback verified**: unset `VITE_SANITY_PROJECT_ID` and confirm `/projects` still renders the bundled ten
- [ ] Contact form: validation fixed, and a **real end-to-end WhatsApp enquiry received on the client's phone**
- [ ] All four `stats` figures confirmed **in writing** by the client
- [ ] Working hours confirmed; real Google Maps place link supplied
- [ ] Privacy Policy + Terms pages written, routed, and linked
- [ ] Security headers added to `vercel.json`
- [ ] `robots.txt` + `sitemap.xml` added; canonical + `og:url` set
- [ ] Journal: articles written **or** dead "Read More" buttons removed
- [ ] High-resolution logo supplied; `Logo.tsx` **and** `public/favicon.svg` updated together
- [ ] All 11 internal `<a href="/...">` converted to `<Link>`
- [ ] Team photographs supplied (or initials accepted as final)
- [ ] `npm audit --omit=dev` reviewed
- [ ] Analytics installed
- [ ] Client shown that **anything typed into the Studio is publicly readable**
- [ ] Handover doc: what the client can change themselves (**projects only**) vs. what needs a developer (**everything else**)

---

## 13. Executive summary

### A. What has been built

A polished 7-route marketing SPA for MegaDream Associates: React 19 + TypeScript + Vite + Tailwind + framer-motion. Home (six composed sections), About (animated stat counters, values, team), Services (6 tabbed groups -> 25 services + 6 process steps), Projects (filter + search + skeleton loaders + accessible lightbox over 10 curated projects / 39 captioned WebP images), Journal (6 article cards), Contact (5 info cards, 7-field form, 7-question FAQ), and a 404. Business details are centralised in one file; leads route to WhatsApp deep links; all imagery is local and fingerprinted. Alongside it, a written-but-unprovisioned Sanity Studio with a single well-validated `project` schema and a defensive runtime merge hook.

### B. What actually works

Verified **from source only** — nothing below was executed:

- Routing, layout shell, scroll reset, mobile nav overlay are correctly wired.
- The Sanity **fallback is genuinely load-bearing and correctly implemented**: `sanityClient` is `null` without env vars, the hook returns the bundled ten, and `toProject()` rejects malformed documents. Since Sanity is unconfigured, **this is the only path currently running — and it is the good path.**
- `allServices` is derived by `flatMap` from `serviceGroups`; verified 6 groups / exactly 25 services, structurally drift-proof.
- Lightbox: Escape closes, arrows page, body scroll locks and restores, listeners clean up.
- Contact form correctly formats and URL-encodes fields into a `wa.me` link.
- **Security hygiene is genuinely good**: 21/21 external links carry `rel="noreferrer noopener"`; zero XSS sinks; GROQ query has no interpolated input; **no secrets in the tree or in git history**; `.gitignore` correct.
- All 21 images have descriptive alt text.

**Not verified by execution: that the project builds, that any page renders, or that anything is responsive.**

### C. What is incomplete

Sanity provisioning (blocking — the client's self-service promise is currently unfulfillable); contact-form validation (`noValidate` makes it inert); Journal (six dead "Read More" links, unwired category chips, empty home-page teaser descriptions); Privacy/Terms pages (dead footer links); business stats, working hours and maps link (all unverified placeholders); logo and favicon (placeholders); team photographs (initials); SEO plumbing (no robots/sitemap/canonical/per-route meta/JSON-LD/pre-render); security headers; CI; domain; project detail pages.

### D. Biggest risks

1. **The CMS does not exist.** `studio/` throws on startup without a project id, has no lockfile and no account behind it. The website silently ignores it. **The client cannot add a single project today**, and because the fallback is silent, this failure is easy to hand over unnoticed.
2. **Unverified business claims are displayed as fact.** "12+ Years", "250+ Projects" animate prominently on two pages and are marked in their own source comment as unconfirmed placeholders. A reputational and potentially legal exposure, and a 10-minute fix that only the client can authorise.
3. **Leads can vanish silently.** Validation is disabled, `handleSubmit` always reports success, there is no server-side copy, and no analytics. A popup blocker, a typo, or a mis-set number loses enquiries with **zero trace** — on a site whose entire commercial purpose is capturing them.
4. **Nothing has ever been verified running.** No CI, no build proof, no device testing, no live CMS test, no end-to-end WhatsApp test. Confidence in this codebase rests entirely on reading it.
5. **Personal data leaves the app with no policy and no consent.** Name, email, phone and budget go into a WhatsApp URL while the Privacy Policy link is `href="#"` — a DPDP-Act-relevant gap, compounded by absent security headers.

### E. What to do next — in order

1. `npm ci && npm run lint && npm run build`. Fix whatever breaks. **Nothing else is trustworthy until this passes.**
2. Provision Sanity end-to-end (project, env vars in Vercel, `sanity deploy`, CORS, Editor invite) and **publish one real test project**, confirming it appears on `/projects`. Then unset the env var and confirm the fallback still renders ten. Commit `studio/package-lock.json`. *(Or delete the CMS entirely if the client will not use it.)*
3. Send the client one list — stats, working hours, maps place link, logo file, team photos — and **block launch on the stats**.
4. Fix the contact form: remove `noValidate`, validate, handle blocked popups via the unused `"error"` state. Then send a real enquiry to the client's phone and confirm receipt.
5. Write Privacy Policy + Terms, route them, link them; add security headers to `vercel.json`.
6. Resolve the Journal: write the articles and add `/journal/:slug`, **or** remove the six dead buttons. Fill the empty home-page teaser descriptions.
7. SEO pass: `robots.txt`, `sitemap.xml`, canonical, `og:url`, per-route titles, LocalBusiness JSON-LD.
8. Convert the 11 raw internal `<a>` tags to `<Link>`; remove the hardcoded phone numbers from `pages/About.tsx`.
9. Device-test all 7 routes on real phones.
10. Domain, HTTPS, Node 20.19 in Vercel, analytics, `npm audit`, minimal CI, and a written client handover of **what they can and cannot change themselves**.

### F. Production readiness

## NEEDS WORK

Not "almost ready." The front-end craft is high — clean architecture, a genuinely well-designed fallback, disciplined data centralisation, good accessibility instincts, and a notably clean security posture with no secrets and no injection surface. If it were purely a static brochure with confirmed content, it would be close.

But three things keep it out of "almost ready": **the CMS — the one feature that makes this deliverable to a non-technical client — has never been connected and cannot start**; **the site displays business statistics its own source code labels as unverified**; and **nothing in this repository has ever been proven to build or run**, with no CI to establish that. Add dead links in the footer and Journal, a contact form whose validation is switched off, and no privacy policy behind a form that collects personal data.

None of this is deep architectural trouble. It is roughly **3-5 focused days** of provisioning, verification, content confirmation and polish. But shipping today would put visibly broken buttons, unverified claims, and an undeliverable client promise in front of the customer.

---

## PROJECT HANDOVER COMPLETE

- **Stack:** Vite 7 · React 19.2 · TypeScript 5.9 · Tailwind 3.4 · framer-motion 13 · react-router 7 · Sanity (unprovisioned) · Vercel · npm · **no backend, no database, no auth, no uploads**
- **Implemented:** 7 routes (Home/About/Services/Projects/Journal/Contact/404), 10-project portfolio with filter + search + lightbox over 39 captioned WebP, 25-service catalogue, WhatsApp lead routing, global floating CTA, responsive Tailwind throughout, basic OG/meta
- **Remaining:** Sanity provisioning · contact-form validation · Journal articles or link removal · Privacy/Terms pages · confirm stats/hours/maps/logo/team photos · SEO plumbing (robots, sitemap, canonical, per-route meta, JSON-LD) · security headers · CI · domain · device testing
- **Security:** small surface, **clean of injection and secrets**. 3 notable findings: no security headers (HIGH), validation disabled (HIGH), PII to WhatsApp with no policy or consent (MEDIUM). **No admin panel, API, or database of our own exists to attack.**
- **Deployment:** Vercel config committed and correct; **no domain, no env vars set, no CI, Studio never deployed**; live state unverifiable from the repo
- **Next 5:** (1) prove the build passes · (2) provision Sanity end-to-end and test both paths · (3) get client sign-off on stats/hours/logo/photos · (4) fix form validation + confirm a real WhatsApp lead lands · (5) Privacy/Terms + security headers

---

*This is a temporary audit artifact. Delete this file once the handover work is complete.*

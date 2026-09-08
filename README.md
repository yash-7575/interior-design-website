# MegaDream Associates

Marketing site for MegaDream Associates — turnkey interior execution specialists and
furniture manufacturers based in Pune, Maharashtra.

Vite + React 19 + TypeScript + Tailwind CSS, with Supabase behind the `/admin` panel.

## Editing business details

Phone numbers, WhatsApp number, email, address, working hours, social links and the
headline stats all live in [`src/data/business.ts`](src/data/business.ts). Change them
there and every page updates. The 25 services live in
[`src/data/services.ts`](src/data/services.ts).

Enquiries route to WhatsApp (+91 83298 42119) — the contact form pre-fills a message
and opens `wa.me` rather than posting to a server.

## Admin panel

The client manages the portfolio at `/admin` (email + password, Supabase Auth). Projects
added there appear on `/projects` once **Published**. If Supabase is unreachable or
unconfigured, `/projects` falls back to the ten projects bundled in
[`src/data/projects.ts`](src/data/projects.ts).

Setup is documented in [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md); the schema lives in
[`supabase/migrations/0001_projects.sql`](supabase/migrations/0001_projects.sql).

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Only the anon key belongs in the browser. The service-role key must never be committed.

## Local development

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:3000.

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build to `dist/` |
| `npm run lint` | ESLint |
| `npm run preview` | Serve the production build locally |

Requires Node 20.19+.

## Deploying to Vercel

Import the repository on Vercel and accept the defaults — the Vite framework
preset is detected automatically (`npm run build` → `dist`).

[vercel.json](vercel.json) adds two things on top of that:

- rewrites every path to `index.html` so React Router routes deep-link correctly
- sets immutable caching on hashed `/assets/*`

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project's environment
variables, or the deployed `/admin` cannot sign in.

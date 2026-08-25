# MegaDream Associates

Marketing site for MegaDream Associates — turnkey interior execution specialists and
furniture manufacturers based in Pune, Maharashtra.

Vite + React 19 + TypeScript + Tailwind CSS.

## Editing business details

Phone numbers, WhatsApp number, email, address, working hours, social links and the
headline stats all live in [`src/data/business.ts`](src/data/business.ts). Change them
there and every page updates. The 25 services live in
[`src/data/services.ts`](src/data/services.ts).

Enquiries route to WhatsApp (+91 83298 42119) — the contact form pre-fills a message
and opens `wa.me` rather than posting to a server.

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

# interior-design-website

Marketing site for a fictional luxury interior design studio ("ELORIA").
Vite + React 19 + TypeScript + Tailwind CSS.

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

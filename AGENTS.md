# AGENTS.md — interior-design-website

## Project Structure

The actual app lives in `Kimi_Agent_Website Replication Essentials/app/` — a Vite + React 19 + TypeScript project.

```
Kimi_Agent_Website Replication Essentials/app/
├── src/
│   ├── components/ui/     # shadcn/ui components (50+)
│   ├── sections/          # Page sections (Hero, Services, Listings, etc.)
│   ├── pages/             # Route pages (Home)
│   ├── hooks/             # Custom hooks (use-mobile)
│   ├── lib/utils.ts       # cn() helper (clsx + tailwind-merge)
│   ├── data/content.ts    # Static content data
│   ├── App.tsx            # Routes (only "/" → Home)
│   └── main.tsx           # Entry (BrowserRouter + App)
├── package.json           # Scripts, deps
├── vite.config.ts         # Vite config (port 3000, @ alias)
├── tailwind.config.js     # shadcn/new-york theme, CSS vars
├── eslint.config.js       # Flat config (TS, React hooks, React refresh)
├── tsconfig.json          # Project references (app + node)
└── components.json        # shadcn registry config
```

## Commands

Run from `Kimi_Agent_Website Replication Essentials/app/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3000 (HMR) |
| `npm run build` | Type-check (`tsc -b`) → production build |
| `npm run lint` | ESLint (flat config, TS + React) |
| `npm run preview` | Preview production build |

**Order matters**: `build` runs typecheck first. Run `lint` before `build` locally.

## Key Conventions

- **Path aliases**: `@/` → `src/` (configured in vite + tsconfig)
- **UI components**: shadcn/ui "new-york" style, Radix primitives, Tailwind CSS variables
- **Styling**: `cn()` helper from `@/lib/utils` for class merging
- **Routing**: React Router v7, single route `/` → `Home` page
- **Theming**: CSS variables in `src/index.css`, dark mode via `class` strategy
- **Components**: 50+ pre-installed shadcn/ui components under `@/components/ui`

## Gotchas

- Repo root (`D:\yash\interior-design-website\`) only has this AGENTS.md and a minimal README — all code is in the `Kimi_Agent_Website Replication Essentials/app/` subdirectory
- `kimi-plugin-inspect-react` is in devDependencies (Vite plugin for inspection); it is applied only when `command === 'serve'`, so it never reaches production builds
- Deployment: root `vercel.json` drives Vercel — it installs/builds inside the nested app dir, serves `.../app/dist`, and rewrites all paths to `index.html` for React Router. Import the repo at its root on Vercel; do **not** also set a Root Directory
- No test framework configured
- ESLint uses flat config; no type-aware rules enabled by default (see app/README.md for how to enable)
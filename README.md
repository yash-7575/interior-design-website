# interior-design-website

Vite + React 19 + TypeScript site. The app lives in
`Kimi_Agent_Website Replication Essentials/app/` — see [AGENTS.md](AGENTS.md).

## Local development

```bash
cd "Kimi_Agent_Website Replication Essentials/app"
npm install
npm run dev
```

## Deploying to Vercel

Import this repository on Vercel with the **root** of the repo as the project
directory (leave Root Directory blank). The root [vercel.json](vercel.json)
handles the rest:

- installs and builds inside the nested app directory
- serves `Kimi_Agent_Website Replication Essentials/app/dist`
- rewrites every path to `index.html` so React Router routes deep-link correctly
- sets immutable caching on hashed `/assets/*`

Requires Node 20.19+.

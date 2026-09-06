# MegaDream Studio

This is where MegaDream Associates add projects to the website. It is a Sanity
Studio — a separate small app from the website itself.

---

## Part 1 — For MegaDream: adding a project

**Your studio address:** `https://<your-name>.sanity.studio`
*(filled in after the first deploy — see Part 2)*

1. Open the address above and sign in with the Google account you were invited on.
2. Click **Project** in the left sidebar, then the **+** (new document) button.
3. Fill in the fields:

   | Field | What to write |
   |---|---|
   | **Project name** | Describe the *work*, not the client. "Handleless Modular Kitchen — Acrylic Finish", not "Flat 402" or a customer's name. |
   | **Web address** | Click **Generate**. You don't need to change it. |
   | **Category** | Residential, Commercial, Modular or Furniture. This decides which filter button on the website shows the project. |
   | **Scope line** | The short line under the title, e.g. "Turnkey execution · 3 BHK apartment". Keep it under about eight words. |
   | **Description** | Two or three sentences on what was actually built — the trades, the materials, anything unusual about the job. |
   | **Photographs** | Drag your photos in. **The first photo is the cover** shown on the Projects page — put your best one first. Drag to reorder at any time. |
   | **Sort order** | Leave empty. Your newest project automatically appears first. |

4. **Every photo needs a caption.** The Studio will not let you publish without
   one, on purpose. The caption is read aloud to blind visitors and shown under
   the photo in the gallery, so describe the room and the workmanship —
   "Master bedroom with a curved cove-lit false ceiling and tufted headboard",
   not "photo 1" or "bedroom".
5. Click **Publish** (bottom right). The project appears on
   `/projects` on the website within a few seconds. Refresh the page to see it.

### Things worth knowing

- **Nothing is live until you press Publish.** Drafts are only visible to you.
- **To edit or remove a project**, open it from the list and change it, or use
  the **⋮** menu → Delete. Deleting removes it from the website immediately.
- **Photo size:** upload the original from your phone or camera. Sanity resizes
  them for the website automatically — you don't need to compress anything first.
- **The home page does not change.** It shows a fixed set of ten hand-picked
  projects. Everything you add here appears on the **Projects** page.
- **Don't upload photos with another company's watermark or logo on them.**
  A few of the images in the original Drive folder had this, and they were left
  out for that reason.

---

## Part 2 — For the developer: first-time setup

The Studio is not connected to a Sanity account yet. To finish it:

```bash
# 1. Create a free Sanity project (opens a browser to log in)
cd studio
npm install
npx sanity login
npx sanity init --create-project "MegaDream Associates" --dataset production
#    ↳ choose: create a *public* dataset, and "no" to adding sample templates

# 2. Note the project id it prints, then:
cp .env.example .env          # fill in SANITY_STUDIO_PROJECT_ID and a hostname
npm run dev                   # http://localhost:3333 to check the schema loads

# 3. Publish the Studio to a free sanity.studio address
npx sanity deploy             # pick a hostname, e.g. "megadream"
```

Then wire the website to it:

1. Copy the root `.env.example` to `.env` and set `VITE_SANITY_PROJECT_ID` to the
   same project id. Add both vars to the Vercel project's environment variables.
2. In [manage.sanity.io](https://manage.sanity.io) → your project → **API** →
   **CORS origins**, add:
   - `http://localhost:3000` (the Vite dev server)
   - the production domain, e.g. `https://megadream.vercel.app`

   **Leave "Allow credentials" unchecked.** The website reads a public dataset
   and sends no token; ticking that box is the most common cause of CORS errors
   that survive adding the origin. No trailing slashes on the URLs.
3. **Members** → invite MegaDream's email as an **Editor**.

### How the two sources fit together

`src/data/projects.ts` holds the ten curated projects, bundled into the build as
optimised WebP with hand-written captions. `src/hooks/useProjects.ts` fetches the
Studio's projects at runtime and puts them **in front** of that bundled set.

If Sanity is unreachable, misconfigured, or the env vars are missing, the Projects
page renders the bundled ten instead of failing. That is deliberate — verify it
still holds after any change to the hook.

### Cost

Sanity's free plan covers this comfortably: 20 seats, 100 GB asset storage,
100 GB bandwidth and 1M CDN requests a month. Content is exportable at any time
with `npx sanity dataset export`, so this is not a lock-in.

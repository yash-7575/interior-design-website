# Supabase setup

Everything the `/admin` panel needs.

## Current state

| | |
|---|---|
| Project | `megadream-website` |
| Ref | `hpgfajztlofpxtrwjatn` |
| URL | `https://hpgfajztlofpxtrwjatn.supabase.co` |
| Region | `ap-south-1` (Mumbai) |
| Plan | Free ($0/month) |

**Steps 1 and 2 below are already done** — the project exists and the schema,
RLS policies and storage bucket are applied and verified. They are kept here as
the record of what was run, and for rebuilding from scratch.

**Still outstanding: steps 3, 4 and 5.**

## 1. Create the project ✅ done

[supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
Region `ap-south-1` (Mumbai) is closest to Pune. Free tier is sufficient.

> The free tier allows **2 active projects per owner**. If creation is refused,
> pause an unused project first (Dashboard → project → Settings → Pause).

## 2. Apply the schema ✅ done

Dashboard → **SQL Editor** → paste the whole of
[`supabase/migrations/0001_projects.sql`](supabase/migrations/0001_projects.sql) → **Run**.

That single script creates:

- tables `projects` and `project_images`
- the `updated_at` trigger and three indexes
- Row Level Security policies on both tables
- the public `project-images` storage bucket and its policies

Verify afterwards: **Table Editor** shows both tables, and each shows
"RLS enabled". **Storage** shows a `project-images` bucket marked Public.

Verified on the live project: both tables present with RLS enabled, 14 policies
(10 on the two tables, 4 on `storage.objects`), bucket public, and the Supabase
security advisor reports no findings.

## 3. Wire up the website

Dashboard → **Project Settings → API**. Copy the **Project URL** and the
**anon / publishable** key. Either key format works — the client is
`@supabase/supabase-js` 2.116, and both the legacy `anon` JWT and the newer
`sb_publishable_…` key were confirmed against this project.

Local — copy `.env.example` to `.env`:

```
VITE_SUPABASE_URL=https://<your-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Vercel — add the same two variables under **Settings → Environment Variables**
for Production and Preview, then redeploy. Vite inlines `VITE_*` at build time,
so a redeploy is required; setting them without rebuilding changes nothing.

**Never add `SUPABASE_SERVICE_ROLE_KEY` here or anywhere in this repo.** It
bypasses every RLS policy. The anon key is the only key the browser needs.

## 4. Create the admin login

Dashboard → **Authentication → Users → Add user**.

- Enter the client's email and a strong password
- Tick **Auto Confirm User** — otherwise they cannot sign in until they click a
  confirmation email

Then **Authentication → Providers → Email**: turn **Enable sign-ups** *off*.
The admin accounts are created by hand; leaving public sign-up on would let
anyone register and, because the RLS policies grant writes to any authenticated
user, edit the portfolio.

To add more admins later, repeat "Add user". There are no roles — every
authenticated user can manage projects, which is the intended simplicity.

## 5. Check it

1. `npm run dev`, open <http://localhost:3000/admin>
2. You should be redirected to `/admin/login`
3. Sign in, add a project, upload photographs, tick **Published**, save
4. Open `/projects` — the new project appears ahead of the bundled ten
5. Sign out and reload `/admin` — you should be redirected to the login again

## How security works here

There is no custom authentication. Supabase Auth issues the session; Postgres
RLS decides what that session may do.

| Who | projects / project_images | storage |
|---|---|---|
| Anonymous visitor | read rows where `published = true` | read files |
| Authenticated user | read all, insert, update, delete | upload, update, delete |

An unauthenticated request carrying the anon key therefore cannot write
anything, and cannot read an unpublished draft, no matter what the frontend
does. Guarding `/admin` in React is a convenience for the user, not the
security boundary.

That claim was tested rather than assumed. Against the live project, with one
published row and one draft row seeded, acting as the `anon` role:

| Attempt | Result |
|---|---|
| read projects | only the published row returned; the draft was invisible |
| read project_images | only the published project's image returned |
| insert a project | blocked — violates row-level security policy |
| publish the draft (update) | blocked — no rows updated |
| delete the published row | blocked — no rows deleted |
| upload to `storage.objects` | blocked — violates row-level security policy |

The test rows were removed afterwards; the database is empty.

## What has NOT been tested

The browser flow — sign in, add a project, upload photographs, edit, delete —
has never been run. No admin user exists yet. Step 5 above is the first thing
to do after step 4.

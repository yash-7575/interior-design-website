# Supabase setup

Everything the `/admin` panel needs. Do this once.

## 1. Create the project

[supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
Region `ap-south-1` (Mumbai) is closest to Pune. Free tier is sufficient.

> The free tier allows **2 active projects per owner**. If creation is refused,
> pause an unused project first (Dashboard → project → Settings → Pause).

## 2. Apply the schema

Dashboard → **SQL Editor** → paste the whole of
[`supabase/migrations/0001_projects.sql`](supabase/migrations/0001_projects.sql) → **Run**.

That single script creates:

- tables `projects` and `project_images`
- the `updated_at` trigger and three indexes
- Row Level Security policies on both tables
- the public `project-images` storage bucket and its policies

Verify afterwards: **Table Editor** shows both tables, and each shows
"RLS enabled". **Storage** shows a `project-images` bucket marked Public.

## 3. Wire up the website

Dashboard → **Project Settings → API**. Copy the **Project URL** and the
**anon / publishable** key.

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

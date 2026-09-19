-- MegaDream Associates — portfolio schema for the Supabase-backed admin panel.
--
-- Public visitors read only published projects; every write requires an
-- authenticated session. There is no service-role key anywhere in the browser:
-- admin authority comes from RLS plus a Supabase Auth session.

-- ---------------------------------------------------------------- tables ----

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 3 and 80),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- Must stay in step with ProjectCategory in src/data/projects.ts.
  category    text not null check (category in ('Residential', 'Commercial', 'Modular', 'Furniture')),
  scope       text not null default '',
  description text not null default '',
  -- "order" is a SQL reserved word: always quote it.
  "order"     integer not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.project_images (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects (id) on delete cascade,
  -- Storage object key, not a URL. The public URL is derived at render time so
  -- the bucket can move without a data migration.
  image_path    text not null,
  caption       text not null default '',
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists project_images_project_id_idx on public.project_images (project_id);
create index if not exists projects_published_idx on public.projects (published);
create index if not exists projects_order_idx on public.projects ("order");

-- ------------------------------------------------------------- updated_at ---

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------------- RLS: DB ----

alter table public.projects enable row level security;
alter table public.project_images enable row level security;

-- Anonymous visitors: published work only.
create policy "Published projects are readable by anyone"
  on public.projects for select to anon
  using (published = true);

-- Signed-in admins see drafts too, so the dashboard can list them.
create policy "Authenticated users read all projects"
  on public.projects for select to authenticated using (true);

create policy "Authenticated users insert projects"
  on public.projects for insert to authenticated with check (true);

create policy "Authenticated users update projects"
  on public.projects for update to authenticated using (true) with check (true);

create policy "Authenticated users delete projects"
  on public.projects for delete to authenticated using (true);

-- The public page selects project_images nested inside the projects query, so
-- this anon policy is required or the galleries come back empty.
create policy "Images of published projects are readable by anyone"
  on public.project_images for select to anon
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id and p.published
    )
  );

create policy "Authenticated users read all project images"
  on public.project_images for select to authenticated using (true);

create policy "Authenticated users insert project images"
  on public.project_images for insert to authenticated with check (true);

create policy "Authenticated users update project images"
  on public.project_images for update to authenticated using (true) with check (true);

create policy "Authenticated users delete project images"
  on public.project_images for delete to authenticated using (true);

-- ----------------------------------------------------------- RLS: storage ---

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Project images are publicly readable"
  on storage.objects for select to public
  using (bucket_id = 'project-images');

create policy "Authenticated users upload project images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-images');

create policy "Authenticated users update project images"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-images')
  with check (bucket_id = 'project-images');

create policy "Authenticated users delete project images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-images');

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for the public site and the admin panel.
 *
 * Only the anon/publishable key is used here — it is designed to sit in a
 * browser bundle. Every privilege boundary is enforced by Row Level Security in
 * the database, never by which key the page holds. The service-role key must
 * never appear in this repository.
 *
 * If the env vars are missing the client is `null` and `useProjects` falls back
 * to the projects bundled in `src/data/projects.ts`, so a misconfigured deploy
 * degrades to the curated set rather than an empty page.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Storage bucket holding project photographs. Public-read, authenticated-write. */
export const PROJECT_IMAGE_BUCKET = "project-images";

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

/** Whether the site has been pointed at a Supabase project at all. */
export const isSupabaseConfigured = supabase !== null;

/**
 * Public CDN URL for a stored object.
 *
 * Deliberately not using Supabase image transformations: those are a paid-plan
 * feature and would fail silently on the free tier. Cards therefore render the
 * full-size file, which is what the bundled WebP images already do.
 */
export function publicImageUrl(path: string): string {
  if (!supabase) return "";
  return supabase.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

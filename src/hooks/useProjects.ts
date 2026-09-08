import { useEffect, useState } from "react";
import { supabase, publicImageUrl } from "@/lib/supabase";
import {
  projects as bundledProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

/**
 * The portfolio has two sources, deliberately:
 *
 * - `src/data/projects.ts` — the ten curated projects, bundled at build time as
 *   fingerprinted WebP with hand-written captions. Always available.
 * - Supabase — everything MegaDream publishes themselves through /admin.
 *
 * Supabase projects lead (newest work first), the bundled set follows. If
 * Supabase is unreachable, misconfigured or empty, the page still renders the
 * bundled ten. That property is load-bearing: it is why a backend outage cannot
 * take the portfolio down. Keep it when touching this hook.
 */

/**
 * Hard stop on the loading state. A request that stalls at the network layer can
 * sit well past its own timeout, and skeleton cards that never resolve look
 * broken. Late data still renders.
 */
const LOADING_TIMEOUT = 5000;

type ProjectRow = {
  slug: string;
  name: string;
  category: string;
  scope: string | null;
  description: string | null;
  project_images:
    | { image_path: string; caption: string | null; display_order: number }[]
    | null;
};

const validCategories = new Set<string>(projectCategories.filter((c) => c !== "All"));

function toProject(row: ProjectRow): Project | null {
  // Guard against half-filled rows rather than rendering a broken card.
  if (!row.slug || !row.name) return null;
  if (!validCategories.has(row.category)) return null;

  const images = [...(row.project_images ?? [])]
    .sort((a, b) => a.display_order - b.display_order)
    .map((image) => ({
      src: publicImageUrl(image.image_path),
      caption: image.caption?.trim() || row.name,
    }))
    .filter((image) => image.src !== "");

  if (images.length === 0) return null;

  return {
    id: row.slug,
    name: row.name,
    category: row.category as ProjectCategory,
    scope: row.scope ?? "",
    description: row.description ?? "",
    images,
  };
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [fromSupabase, setFromSupabase] = useState<Project[]>([]);
  const [loading, setLoading] = useState(supabase !== null);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;
    const giveUp = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, LOADING_TIMEOUT);

    (async () => {
      try {
        // RLS restricts anonymous readers to published rows, but filtering here
        // too keeps the intent obvious at the call site.
        const { data, error } = await supabase
          .from("projects")
          .select(
            "slug, name, category, scope, description, project_images (image_path, caption, display_order)",
          )
          .eq("published", true)
          .order("order", { ascending: true });

        if (cancelled) return;
        if (error) throw new Error(error.message);

        setFromSupabase(
          (data as unknown as ProjectRow[])
            .map(toProject)
            .filter((p): p is Project => p !== null),
        );
      } catch (e) {
        // Not fatal: the bundled projects below carry the page.
        console.error("Could not load projects from Supabase:", e);
      } finally {
        if (!cancelled) {
          setLoading(false);
          clearTimeout(giveUp);
        }
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
    };
  }, []);

  // A published project sharing a slug with a bundled one wins, so a project can
  // be moved into the CMS later without appearing twice.
  const remoteIds = new Set(fromSupabase.map((p) => p.id));
  const projects = [...fromSupabase, ...bundledProjects.filter((p) => !remoteIds.has(p.id))];

  return { projects, loading };
}

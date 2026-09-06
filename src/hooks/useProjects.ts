import { useEffect, useState } from "react";
import { sanityClient, imageUrl } from "@/lib/sanity";
import {
  projects as bundledProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * The portfolio has two sources, deliberately:
 *
 * - `src/data/projects.ts` — the ten curated projects, bundled at build time as
 *   fingerprinted WebP with hand-written captions. Always available.
 * - Sanity — everything MegaDream adds themselves through the Studio.
 *
 * CMS projects lead (newest work first), the bundled set follows. If Sanity is
 * unreachable, misconfigured or empty, the page still renders the bundled ten.
 */

/** Widths requested from Sanity's CDN. Cards are ~440px at their largest. */
const THUMB_WIDTH = 800;
const FULL_WIDTH = 1600;

/**
 * Hard stop on the loading state. The client has its own timeout, but a request
 * that stalls at the network layer can sit in retry backoff well past it, and
 * skeleton cards that never resolve look broken. Late data still renders.
 */
const LOADING_TIMEOUT = 5000;

const QUERY = `*[_type == "project" && count(images) > 0] | order(coalesce(order, 9999) asc, _createdAt desc){
  "id": coalesce(slug.current, _id),
  name,
  category,
  scope,
  description,
  "images": images[defined(asset)]{ caption, asset }
}`;

type SanityProject = {
  id: string;
  name: string;
  category: string;
  scope: string;
  description: string;
  images: { caption?: string; asset: SanityImageSource }[];
};

const validCategories = new Set<string>(projectCategories.filter((c) => c !== "All"));

function toProject(doc: SanityProject): Project | null {
  // Guard against half-filled documents rather than rendering a broken card.
  if (!doc.id || !doc.name || !doc.images?.length) return null;
  if (!validCategories.has(doc.category)) return null;

  return {
    id: doc.id,
    name: doc.name,
    category: doc.category as ProjectCategory,
    scope: doc.scope ?? "",
    description: doc.description ?? "",
    images: doc.images.map((image) => ({
      src: imageUrl(image.asset, FULL_WIDTH),
      thumb: imageUrl(image.asset, THUMB_WIDTH),
      caption: image.caption ?? doc.name,
    })),
  };
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [fromSanity, setFromSanity] = useState<Project[]>([]);
  const [loading, setLoading] = useState(sanityClient !== null);

  useEffect(() => {
    if (!sanityClient) return;

    let cancelled = false;
    const giveUp = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, LOADING_TIMEOUT);

    sanityClient
      .fetch<SanityProject[]>(QUERY)
      .then((docs) => {
        if (cancelled) return;
        setFromSanity(docs.map(toProject).filter((p): p is Project => p !== null));
      })
      .catch((error) => {
        // Not fatal: the bundled projects below carry the page.
        console.error("Could not load projects from Sanity:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
    };
  }, []);

  // A CMS entry sharing an id with a bundled one wins, so a project can be
  // moved into the CMS later without appearing twice.
  const cmsIds = new Set(fromSanity.map((p) => p.id));
  const projects = [...fromSanity, ...bundledProjects.filter((p) => !cmsIds.has(p.id))];

  return { projects, loading };
}

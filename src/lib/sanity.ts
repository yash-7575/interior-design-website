import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

/**
 * Read-only Sanity client for the published project portfolio.
 *
 * The dataset is public, so no API token is involved and nothing here is a
 * secret — the project id travels in every request the browser makes anyway.
 * If the env vars are missing the client is `null` and `useProjects` falls back
 * to the projects bundled in `src/data/projects.ts`, so a misconfigured deploy
 * degrades to the curated set rather than an empty page.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-08-28",
      useCdn: true,
      // The bundled projects already carry the page, so a slow or failing
      // request should give up quickly rather than retry with a long backoff.
      timeout: 8000,
      maxRetries: 1,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Build a CDN URL for a Sanity image at a given width.
 *
 * `auto("format")` lets Sanity serve WebP or AVIF based on the browser, which
 * keeps CMS imagery roughly in line with the hand-optimised WebP files bundled
 * under `src/assets/img/`. `fit("max")` never upscales past the original.
 */
export function imageUrl(source: SanityImageSource, width: number): string {
  if (!builder) return "";
  return builder.image(source).width(width).fit("max").auto("format").url();
}

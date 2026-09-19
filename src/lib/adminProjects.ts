import { supabase, PROJECT_IMAGE_BUCKET } from "@/lib/supabase";
import type { ProjectCategory } from "@/data/projects";

/**
 * Every read and write the admin panel performs.
 *
 * Authorisation is not implemented here — it is enforced by Row Level Security
 * in Postgres and on storage.objects. These helpers simply fail if the caller
 * has no session, which is the correct behaviour.
 */

export type AdminImage = {
  id: string;
  image_path: string;
  caption: string;
  display_order: number;
};

export type AdminProject = {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  scope: string;
  description: string;
  order: number;
  published: boolean;
  images: AdminImage[];
};

export type ProjectFields = {
  name: string;
  slug: string;
  category: ProjectCategory;
  scope: string;
  description: string;
  order: number;
  published: boolean;
};

function client() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
}

/** URL-safe slug matching the CHECK constraint on projects.slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

const SELECT = `id, name, slug, category, scope, description, "order", published,
  project_images (id, image_path, caption, display_order)`;

type Row = Omit<AdminProject, "images" | "category"> & {
  category: string;
  project_images: AdminImage[] | null;
};

function toAdminProject(row: Row): AdminProject {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as ProjectCategory,
    scope: row.scope ?? "",
    description: row.description ?? "",
    order: row.order ?? 0,
    published: row.published,
    images: [...(row.project_images ?? [])].sort((a, b) => a.display_order - b.display_order),
  };
}

export async function listProjects(): Promise<AdminProject[]> {
  const { data, error } = await client()
    .from("projects")
    .select(SELECT)
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as Row[]).map(toAdminProject);
}

export async function getProject(id: string): Promise<AdminProject | null> {
  const { data, error } = await client().from("projects").select(SELECT).eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toAdminProject(data as unknown as Row) : null;
}

export async function createProject(fields: ProjectFields): Promise<string> {
  const { data, error } = await client().from("projects").insert(fields).select("id").single();
  if (error) throw new Error(error.message);
  return (data as { id: string }).id;
}

export async function updateProject(id: string, fields: ProjectFields): Promise<void> {
  const { error } = await client().from("projects").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Deletes the project and its photographs.
 *
 * project_images rows cascade with the project, but storage objects do not, so
 * the files are removed first. If that fails we stop rather than delete the row
 * — an orphaned file with no row pointing at it is invisible and unrecoverable
 * through the UI.
 */
export async function deleteProject(id: string): Promise<void> {
  const sb = client();

  const { data, error: readError } = await sb
    .from("project_images")
    .select("image_path")
    .eq("project_id", id);
  if (readError) throw new Error(readError.message);

  const paths = (data ?? []).map((row) => (row as { image_path: string }).image_path);
  if (paths.length > 0) {
    const { error: removeError } = await sb.storage.from(PROJECT_IMAGE_BUCKET).remove(paths);
    if (removeError) {
      throw new Error(`Could not delete the project's images: ${removeError.message}`);
    }
  }

  const { error } = await sb.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** Uploads one file and returns its storage path. */
export async function uploadImage(projectId: string, file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `projects/${projectId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client()
    .storage.from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw new Error(`Could not upload ${file.name}: ${error.message}`);
  return path;
}

export async function insertImageRow(
  projectId: string,
  imagePath: string,
  caption: string,
  displayOrder: number,
): Promise<void> {
  const { error } = await client().from("project_images").insert({
    project_id: projectId,
    image_path: imagePath,
    caption,
    display_order: displayOrder,
  });
  if (error) throw new Error(error.message);
}

export async function updateImageRow(
  id: string,
  caption: string,
  displayOrder: number,
): Promise<void> {
  const { error } = await client()
    .from("project_images")
    .update({ caption, display_order: displayOrder })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

/** Removes image rows and their stored files. Files first, same reasoning as above. */
export async function deleteImages(images: { id: string; image_path: string }[]): Promise<void> {
  if (images.length === 0) return;
  const sb = client();

  const { error: removeError } = await sb.storage
    .from(PROJECT_IMAGE_BUCKET)
    .remove(images.map((image) => image.image_path));
  if (removeError) throw new Error(`Could not delete images: ${removeError.message}`);

  const { error } = await sb
    .from("project_images")
    .delete()
    .in("id", images.map((image) => image.id));
  if (error) throw new Error(error.message);
}

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import AdminShell from "@/components/admin/AdminShell";
import { publicImageUrl } from "@/lib/supabase";
import { projectCategories, type ProjectCategory } from "@/data/projects";
import {
  createProject,
  deleteImages,
  getProject,
  insertImageRow,
  slugify,
  updateImageRow,
  updateProject,
  uploadImage,
} from "@/lib/adminProjects";

const categories = projectCategories.filter((c) => c !== "All") as ProjectCategory[];

/**
 * One row in the image editor. An existing photograph has `id` and `path`; a
 * newly picked one has `file` until it is uploaded on save.
 */
type FormImage = {
  key: string;
  id?: string;
  path?: string;
  file?: File;
  preview: string;
  caption: string;
};

const field =
  "w-full px-4 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f]";
const label = "block text-sm font-medium text-[#6b6156] mb-2";

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState<ProjectCategory>(categories[0]);
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(false);
  const [images, setImages] = useState<FormImage[]>([]);
  const [removed, setRemoved] = useState<{ id: string; image_path: string }[]>([]);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      try {
        const project = await getProject(id);
        if (cancelled) return;
        if (!project) {
          setError("That project no longer exists.");
          return;
        }
        setName(project.name);
        setSlug(project.slug);
        setSlugTouched(true);
        setCategory(project.category);
        setScope(project.scope);
        setDescription(project.description);
        setOrder(project.order);
        setPublished(project.published);
        setImages(
          project.images.map((image) => ({
            key: image.id,
            id: image.id,
            path: image.image_path,
            preview: publicImageUrl(image.image_path),
            caption: image.caption,
          })),
        );
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load the project.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Object URLs for pending uploads are created below; release them on unmount.
  useEffect(
    () => () => {
      images.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.preview);
      });
    },
    // Intentionally on unmount only — revoking on every change would break previews.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? []);
    setImages((current) => [
      ...current,
      ...picked.map((file) => ({
        key: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        caption: "",
      })),
    ]);
    event.target.value = "";
  };

  const removeImage = (key: string) => {
    setImages((current) => {
      const target = current.find((image) => image.key === key);
      if (target?.id && target.path) {
        setRemoved((r) => [...r, { id: target.id!, image_path: target.path! }]);
      }
      if (target?.file) URL.revokeObjectURL(target.preview);
      return current.filter((image) => image.key !== key);
    });
  };

  const move = (index: number, delta: number) => {
    setImages((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const setCaption = (key: string, caption: string) =>
    setImages((current) =>
      current.map((image) => (image.key === key ? { ...image, caption } : image)),
    );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError("Add at least one photograph before saving.");
      return;
    }
    if (images.some((image) => image.caption.trim().length === 0)) {
      setError("Every photograph needs a caption — it is used as the alt text for screen readers.");
      return;
    }

    setSaving(true);
    try {
      const fields = {
        name: name.trim(),
        slug: slug.trim(),
        category,
        scope: scope.trim(),
        description: description.trim(),
        order,
        published,
      };

      const projectId = isEdit && id ? (await updateProject(id, fields), id) : await createProject(fields);

      if (removed.length > 0) await deleteImages(removed);

      for (const [index, image] of images.entries()) {
        const caption = image.caption.trim();
        if (image.id) {
          await updateImageRow(image.id, caption, index);
        } else if (image.file) {
          const path = await uploadImage(projectId, image.file);
          await insertImageRow(projectId, path, caption, index);
        }
      }

      navigate("/admin", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the project.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title={isEdit ? "Edit project" : "Add project"}>
        <p className="text-sm text-[#8a7d6c]">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={isEdit ? "Edit project" : "Add project"}>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <p
            role="alert"
            className="text-sm text-[#8a2f2f] bg-[#f7e9e9] border border-[#e6cccc] rounded-lg p-3"
          >
            {error}
          </p>
        )}

        <div className="bg-white border border-[#e2d9c8] rounded-xl p-6 space-y-5">
          <div>
            <label htmlFor="name" className={label}>
              Project name
            </label>
            <input
              id="name"
              className={field}
              required
              minLength={3}
              maxLength={80}
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Handleless Modular Kitchen — Acrylic Finish"
            />
            <p className="text-xs text-[#a89a83] mt-2">
              Describe the work, not the client. Not a flat number or an address.
            </p>
          </div>

          <div>
            <label htmlFor="slug" className={label}>
              Web address
            </label>
            <input
              id="slug"
              className={field}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
            <p className="text-xs text-[#a89a83] mt-2">
              Generated from the name. Lowercase letters, numbers and hyphens only.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="category" className={label}>
                Category
              </label>
              <select
                id="category"
                className={field}
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="order" className={label}>
                Display order
              </label>
              <input
                id="order"
                type="number"
                className={field}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
              <p className="text-xs text-[#a89a83] mt-2">Lower numbers appear first.</p>
            </div>
          </div>

          <div>
            <label htmlFor="scope" className={label}>
              Scope line
            </label>
            <input
              id="scope"
              className={field}
              maxLength={70}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Turnkey execution · 3 BHK apartment"
            />
          </div>

          <div>
            <label htmlFor="description" className={label}>
              Description
            </label>
            <textarea
              id="description"
              className={`${field} resize-none`}
              rows={4}
              maxLength={600}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Two or three sentences on what was actually built — the trades, the materials, anything unusual about the job."
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-[#2b241d]">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4"
            />
            Published — visible on the public website
          </label>
        </div>

        <div className="bg-white border border-[#e2d9c8] rounded-xl p-6">
          <h2 className="font-serif-display text-xl text-[#2b241d]">Photographs</h2>
          <p className="text-xs text-[#a89a83] mt-2 mb-5">
            The first photograph is the cover shown on the Projects page. Every photograph needs a
            caption — it is read aloud to visually impaired visitors and shown in the gallery.
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="block w-full text-sm text-[#6b6156] file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-[#33291f] file:text-white file:text-sm file:font-medium hover:file:bg-[#241c14] file:cursor-pointer"
          />

          <ul className="mt-6 space-y-4">
            {images.map((image, index) => (
              <li
                key={image.key}
                className="flex flex-col sm:flex-row gap-4 border-t border-[#e2d9c8] pt-4"
              >
                <img
                  src={image.preview}
                  alt={image.caption || "Project photograph"}
                  className="w-full sm:w-32 aspect-[4/3] object-cover rounded-lg bg-[#e2d9c8]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs tracking-wider uppercase text-[#a89a83]">
                      {index === 0 ? "Cover" : `Photo ${index + 1}`}
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        className="text-[#33291f] disabled:opacity-30"
                      >
                        Move up
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === images.length - 1}
                        className="text-[#33291f] disabled:opacity-30"
                      >
                        Move down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.key)}
                        className="text-[#8a2f2f]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <input
                    className={field}
                    value={image.caption}
                    maxLength={160}
                    onChange={(e) => setCaption(image.key, e.target.value)}
                    placeholder="Master bedroom with a curved cove-lit false ceiling and tufted headboard"
                    aria-label={`Caption for photo ${index + 1}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#33291f] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#241c14] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create project"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-sm text-[#6b6156] hover:text-[#2b241d]"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

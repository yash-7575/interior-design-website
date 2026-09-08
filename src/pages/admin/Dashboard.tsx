import { useEffect, useState } from "react";
import { Link } from "react-router";
import AdminShell from "@/components/admin/AdminShell";
import { publicImageUrl } from "@/lib/supabase";
import { deleteProject, listProjects, type AdminProject } from "@/lib/adminProjects";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  // Same shape as useProjects: an async IIFE inside the effect, so every state
  // write happens after an await rather than synchronously on mount.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const rows = await listProjects();
        if (cancelled) return;
        setProjects(rows);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load projects.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const handleDelete = async (project: AdminProject) => {
    const confirmed = window.confirm(
      `Delete "${project.name}" and its ${project.images.length} photograph(s)? This cannot be undone.`,
    );
    if (!confirmed) return;

    setBusyId(project.id);
    setError(null);
    try {
      await deleteProject(project.id);
      setReloadToken((token) => token + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete the project.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminShell
      title="Projects"
      action={
        <Link
          to="/admin/projects/new"
          className="bg-[#33291f] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#241c14] transition-colors"
        >
          Add project
        </Link>
      }
    >
      {error && (
        <p
          role="alert"
          className="mb-6 text-sm text-[#8a2f2f] bg-[#f7e9e9] border border-[#e6cccc] rounded-lg p-3"
        >
          {error}
        </p>
      )}

      {loading && <p className="text-sm text-[#8a7d6c]">Loading projects…</p>}

      {!loading && projects.length === 0 && !error && (
        <div className="bg-white border border-[#e2d9c8] rounded-xl p-10 text-center">
          <p className="text-[#6b6156]">
            No projects yet. The website is showing its ten built-in projects.
          </p>
          <Link
            to="/admin/projects/new"
            className="inline-block mt-5 text-sm font-medium text-[#33291f] underline underline-offset-4"
          >
            Add your first project
          </Link>
        </div>
      )}

      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const cover = project.images[0];
            return (
              <article
                key={project.id}
                className="bg-white border border-[#e2d9c8] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#e2d9c8]">
                  {cover && (
                    <img
                      src={publicImageUrl(cover.image_path)}
                      alt={cover.caption || project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs tracking-wider uppercase text-[#8a7d6c]">
                      {project.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        project.published
                          ? "bg-[#e6efe6] text-[#3d6b3d]"
                          : "bg-[#f0ece4] text-[#8a7d6c]"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h2 className="font-serif-display text-xl text-[#2b241d] leading-snug">
                    {project.name}
                  </h2>
                  <p className="text-sm text-[#8a7d6c] mt-1">{project.scope}</p>
                  <p className="text-xs text-[#a89a83] mt-2">
                    {project.images.length} photo{project.images.length === 1 ? "" : "s"} · order{" "}
                    {project.order}
                  </p>

                  <div className="flex gap-3 mt-5 pt-4 border-t border-[#e2d9c8]">
                    <Link
                      to={`/admin/projects/${project.id}`}
                      className="text-sm font-medium text-[#33291f] hover:underline underline-offset-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => void handleDelete(project)}
                      disabled={busyId === project.id}
                      className="text-sm font-medium text-[#8a2f2f] hover:underline underline-offset-4 disabled:opacity-50"
                    >
                      {busyId === project.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}

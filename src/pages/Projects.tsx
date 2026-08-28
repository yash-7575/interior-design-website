import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Layers, Search, Images } from "lucide-react";
import { business, whatsappLink } from "@/data/business";
import { projectCategories, coverOf, type Project } from "@/data/projects";
import { useProjects } from "@/hooks/useProjects";
import Lightbox from "@/components/Lightbox";
import pageBanner from "@/assets/img/banner-projects-marble-living.webp";

function ProjectCard({
  project,
  delay,
  onOpen,
}: {
  project: Project;
  delay: number;
  onOpen: () => void;
}) {
  const cover = coverOf(project);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group text-left w-full"
      aria-label={`Open the ${project.name} gallery`}
    >
      <div className="overflow-hidden rounded-lg relative">
        <img
          src={cover.thumb ?? cover.src}
          alt={cover.caption}
          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <Images className="w-4 h-4" />
          {project.images.length} photo{project.images.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-[#8a7d6c] mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span className="font-medium text-[#2b241d]">{project.category}</span>
        </div>
        <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d] group-hover:text-[#6b5b4a] transition-colors">
          {project.name}
        </h3>
        <p className="text-xs tracking-wider uppercase text-[#8a7d6c] mt-2">{project.scope}</p>
      </div>
    </motion.button>
  );
}

/** Placeholder cards shown while Sanity is still answering. */
function SkeletonCard() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="w-full aspect-[4/5] rounded-lg bg-[#e2d9c8]" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-24 rounded bg-[#e2d9c8]" />
        <div className="h-5 w-3/4 rounded bg-[#e2d9c8]" />
        <div className="h-3 w-1/2 rounded bg-[#e2d9c8]" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.scope.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  const paginate = (direction: number) =>
    setOpen((current) =>
      current
        ? {
            ...current,
            index:
              (current.index + direction + current.project.images.length) %
              current.project.images.length,
          }
        : null,
    );

  const lead = projects[0];

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={pageBanner}
          alt="Contemporary living room with a marble feature wall and fluted oak television unit"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-10 max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-white text-5xl md:text-7xl leading-[1.08] max-w-3xl"
          >
            Portfolio of
            <br />
            Completed Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Residential, commercial and modular work delivered across Pune and
            surrounding Maharashtra.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-[#33291f] text-white"
                    : "bg-[#f6f2ea] text-[#6b6156] hover:bg-[#e2d9c8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 md:justify-between mb-12 items-start md:items-center"
          >
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a7d6c]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f]"
              />
            </div>
            <p className="text-sm text-[#8a7d6c]">
              {visible.length} of {projects.length} projects
              {loading && <span className="ml-2 text-[#a89a83]">· loading more…</span>}
            </p>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={(i % 3) * 0.08}
                onOpen={() => setOpen({ project, index: 0 })}
              />
            ))}
            {/* The bundled projects render immediately; these stand in for the
                CMS entries still in flight, so the grid never jumps. */}
            {loading &&
              Array.from({ length: 3 }, (_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
          </div>

          {!loading && visible.length === 0 && (
            <p className="text-center text-[#6b6156] py-20">
              No projects match that search. Try another term, or{" "}
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="underline underline-offset-4 hover:text-[#2b241d]"
              >
                clear the filters
              </button>
              .
            </p>
          )}
        </div>
      </section>

      {/* Featured Project Detail Teaser */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8a7d6c] font-medium">FEATURED PROJECT</p>
              <h2 className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12] mt-6">
                {lead.name}
              </h2>
              <p className="text-white/70 mt-6 leading-relaxed text-[15px] max-w-lg">
                {lead.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-8 text-white/70 text-sm">
                <span>{lead.category}</span>
                <span>{lead.scope}</span>
              </div>
              <a
                href={whatsappLink(
                  `Hello ${business.name}, I'd like to know more about your turnkey interior projects.`,
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 mt-8 text-white hover:text-white/80 transition-colors"
              >
                Ask About This Project
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setOpen({ project: lead, index: 0 })}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] w-full"
            >
              <img
                src={coverOf(lead).src}
                alt={coverOf(lead).caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white flex items-center gap-2 text-sm text-white/80">
                <Images className="w-4 h-4" />
                View all {lead.images.length} photographs
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <Lightbox
        project={open?.project ?? null}
        index={open?.index ?? 0}
        onClose={() => setOpen(null)}
        onPaginate={paginate}
      />
    </>
  );
}

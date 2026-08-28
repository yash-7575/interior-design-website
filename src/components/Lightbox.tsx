import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  /** Index within `project.images`. */
  index: number;
  onClose: () => void;
  onPaginate: (direction: number) => void;
};

export default function Lightbox({ project, index, onClose, onPaginate }: Props) {
  const open = project !== null;

  // Escape closes, arrows page. The rest of the site has no keyboard handling,
  // but a full-screen overlay with no way out except the mouse is a trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onPaginate(1);
      if (e.key === "ArrowLeft") onPaginate(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, onPaginate]);

  const image = project?.images[index];

  return (
    <AnimatePresence>
      {project && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#241c14]/95 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — photographs`}
          onClick={onClose}
        >
          {/* header */}
          <div
            className="flex items-start justify-between gap-6 px-6 md:px-10 pt-6 md:pt-8 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="font-serif-display text-white text-2xl md:text-3xl">{project.name}</h2>
              <p className="text-xs tracking-wider uppercase text-white/50 mt-2">
                {project.category} &middot; {index + 1} of {project.images.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 shrink-0 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#2b241d] transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* image */}
          <div
            className="flex-1 min-h-0 flex items-center justify-center px-4 md:px-20 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={image.src}
                alt={image.caption}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </AnimatePresence>
          </div>

          {/* caption + controls */}
          <div
            className="flex items-center justify-between gap-6 px-6 md:px-10 pb-8 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">{image.caption}</p>
            {project.images.length > 1 && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onPaginate(-1)}
                  className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#2b241d] transition-colors"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPaginate(1)}
                  className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#2b241d] transition-colors"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

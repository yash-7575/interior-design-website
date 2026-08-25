import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const suggestions = [
  { label: "Projects", path: "/projects" },
  { label: "About Studio", path: "/about" },
  { label: "Design Services", path: "/services" },
  { label: "Journal", path: "/journal" },
];

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#33291f] text-[#e8e0d2] flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl text-center"
      >
        <p className="text-xs tracking-[0.35em] text-[#a89a83] uppercase mb-6">Error 404</p>
        <h1 className="font-serif-display text-[clamp(3rem,10vw,6rem)] leading-[1.05] text-[#f6f2ea]">
          This Room
          <br />
          Doesn't Exist
        </h1>
        <p className="mt-7 text-[#c9bda9] leading-relaxed">
          The page you're looking for has been moved, renamed, or never made it past the drawing board.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {suggestions.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group flex items-center gap-2 border border-white/15 text-sm text-[#c9bda9] px-5 py-2.5 rounded-full hover:border-white/40 hover:text-white transition-colors"
            >
              {s.label}
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#f6f2ea] text-[#2b241d] text-sm px-7 py-3.5 rounded-full hover:bg-white transition-colors"
          >
            Back to Home
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

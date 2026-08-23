import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About Studio", path: "/about" },
  { label: "Design Services", path: "/services" },
  { label: "Journal", path: "/journal" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-6">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-sm tracking-wide">Menu</span>
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
          <span className="font-serif-display text-white text-xl tracking-[0.25em] font-medium">ELORIA</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="bg-white text-[#2b241d] text-sm px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/contact"
            className="bg-white text-[#2b241d] p-2.5 rounded-md hover:bg-white/90 transition-colors"
            aria-label="Contact"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#221b14]/97 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-10 py-6">
              <span className="font-serif-display text-white text-xl tracking-[0.25em]">ELORIA</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-2">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 font-serif-display text-4xl md:text-5xl py-2 transition-colors ${
                      location.pathname === item.path ? "text-white" : "text-[#efe9df] hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="w-7 h-7 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-60 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="text-center text-white/40 text-xs tracking-widest pb-8">@2026 ELORIA — TIMELESS INTERIORS</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
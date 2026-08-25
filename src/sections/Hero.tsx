import { motion } from "framer-motion";
import { ChevronRight, Mouse } from "lucide-react";
import { images } from "@/data/content";
import { business, whatsappLink, defaultEnquiry } from "@/data/business";

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[620px] overflow-hidden">
      <motion.img
        src={images.hero}
        alt="Turnkey interior project by MegaDream Associates"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display text-white text-5xl md:text-7xl leading-[1.08] max-w-3xl"
        >
          Turnkey Interiors,
          <br />
          Built End to End
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
        >
          {business.pitch} Every trade handled in-house — design, manufacturing
          and site execution under one accountable team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex items-center gap-4 mt-8"
        >
          <div className="flex">
            <a
              href="/projects"
              className="bg-white text-[#2b241d] text-sm px-6 py-3 rounded-l-md hover:bg-white/90 transition-colors"
            >
              View Our Work
            </a>
            <a
              href="/projects"
              className="bg-white text-[#2b241d] px-3.5 py-3 rounded-r-md border-l border-black/10 hover:bg-white/90 transition-colors"
              aria-label="View our work"
            >
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <a
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noreferrer noopener"
            className="text-white text-sm underline underline-offset-8 decoration-white/50 hover:decoration-white transition-all"
          >
            Get a Free Quote
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Mouse className="w-6 h-6" strokeWidth={1.2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
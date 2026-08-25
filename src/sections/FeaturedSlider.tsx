import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { featured } from "@/data/content";

export default function FeaturedSlider() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const current = featured[index];

  const paginate = (dir: number) => {
    setIndex(([i]) => [(i + dir + featured.length) % featured.length, dir]);
  };

  return (
    <section className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl h-[70vh] min-h-[520px]"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={current.image}
              alt={current.name}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 120 : -120, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction >= 0 ? -120 : 120, scale: 1.02 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

          {/* info card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-[#faf7f1] rounded-xl p-6 md:p-8 max-w-sm shadow-xl"
            >
              <h3 className="font-serif-display text-2xl text-[#2b241d]">{current.name}</h3>
              <p className="flex items-center gap-1.5 text-[#8a7d6c] text-sm mt-2">
                <MapPin className="w-3.5 h-3.5" />
                {current.location}
              </p>
              <p className="text-[#6b6156] text-sm leading-relaxed mt-4">{current.desc}</p>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-full border border-[#d8cebc] flex items-center justify-center text-[#2b241d] hover:bg-[#33291f] hover:text-white hover:border-[#33291f] transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-full border border-[#d8cebc] flex items-center justify-center text-[#2b241d] hover:bg-[#33291f] hover:text-white hover:border-[#33291f] transition-colors"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5 ml-1">
                    {featured.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? "w-5 bg-[#33291f]" : "w-1.5 bg-[#cfc4b0]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-serif-display text-xl text-[#2b241d]">{current.price}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* floating tag card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${index}`}
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden md:block absolute top-1/2 -translate-y-1/2 right-16 bg-[#faf7f1]/95 backdrop-blur rounded-xl p-3 shadow-lg w-44"
            >
              <p className="font-serif-display text-sm text-[#2b241d] px-1 pt-1 pb-2">{current.tag}</p>
              <img
                src={current.image}
                alt=""
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

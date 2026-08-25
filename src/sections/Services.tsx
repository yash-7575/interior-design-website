import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { images, serviceCategories, serviceItems, featured, listings, posts } from "@/data/content";

const categoryImages = [
  images.services,
  featured[1].image,
  listings[3].image,
  posts[0].image,
  images.aboutDining,
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12]">
            Design, Manufacture<br />
            &amp; Execute — In-House
          </h2>

          <ul className="mt-12 space-y-1">
            {serviceCategories.map((cat, i) => (
              <li key={cat}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-4 w-full text-left font-serif-display text-2xl md:text-3xl py-3 transition-all duration-300 ${
                    active === i ? "text-[#2b241d] translate-x-2" : "text-[#b3a58f] hover:text-[#2b241d]"
                  }`}
                >
                  {cat}
                  <ArrowRight
                    className={`w-6 h-6 transition-all duration-300 ${
                      active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex mt-12">
            <a
              href="/services"
              className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
            >
              All 25 Services
            </a>
            <a
              href="/services"
              className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
              aria-label="See all services"
            >
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={categoryImages[active]}
                alt={serviceCategories[active]}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="mt-10 divide-y divide-[#e2d9c8]">
            {serviceItems.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-6 flex gap-6"
              >
                <span className="text-sm text-[#a89a83] pt-1.5 font-medium">{item.num}</span>
                <div>
                  <h3 className="font-serif-display text-2xl md:text-[28px] text-[#2b241d]">{item.title}</h3>
                  {item.desc && (
                    <p className="text-[#6b6156] text-sm leading-relaxed mt-3 max-w-md">{item.desc}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

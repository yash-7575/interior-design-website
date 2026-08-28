import { motion } from "framer-motion";
import { ChevronRight, Layers } from "lucide-react";
import { listings } from "@/data/content";

function ListingCard({
  item,
  delay,
}: {
  item: (typeof listings)[number];
  delay: number;
}) {
  const { wide } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${wide ? "md:col-span-2 md:max-w-3xl md:mx-auto w-full" : ""}`}
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
            wide ? "aspect-[21/10]" : "aspect-[4/3]"
          }`}
        />
      </div>
      <div className="flex items-start justify-between mt-4 gap-4">
        <div>
          <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d]">{item.name}</h3>
          <p className="flex items-center gap-1.5 text-[#8a7d6c] text-sm mt-1.5">
            <Layers className="w-3.5 h-3.5" />
            {item.category}
          </p>
        </div>
        <span className="text-xs tracking-wider uppercase text-[#8a7d6c] whitespace-nowrap pt-2">{item.scope}</span>
      </div>
    </motion.div>
  );
}

export default function Listings() {
  return (
    <section id="listings" className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium text-left md:text-center">Recent Work</p>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
            Interiors We Have Designed, Built and Handed Over Across Pune
          </h2>
          <p className="text-[#6b6156] mt-7 leading-relaxed text-[15px] max-w-2xl mx-auto">
            Residential flats, corporate offices and modular kitchens — executed
            end to end by our own teams, from civil and ceiling work through to
            the furniture manufactured in our facility.
          </p>
          <div className="flex justify-center mt-9">
            <div className="flex">
              <a
                href="/projects"
                className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
              >
                Explore More
              </a>
              <a
                href="/projects"
                className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                aria-label="Explore more"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 mt-16 md:mt-20">
          {listings.map((item, i) => (
            <ListingCard key={item.name} item={item} delay={(i % 2) * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

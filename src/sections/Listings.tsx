import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { listings } from "@/data/content";

function ListingCard({
  item,
  delay,
  wide,
}: {
  item: (typeof listings)[number];
  delay: number;
  wide?: boolean;
}) {
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
          alt={item.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
            wide ? "aspect-[21/10]" : "aspect-[4/3]"
          }`}
        />
      </div>
      <div className="flex items-start justify-between mt-4 gap-4">
        <div>
          <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d]">{item.name}</h3>
          <p className="flex items-center gap-1.5 text-[#8a7d6c] text-sm mt-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {item.location}
          </p>
        </div>
        <span className="font-serif-display text-lg md:text-xl text-[#2b241d] whitespace-nowrap">{item.price}</span>
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
          <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium text-left md:text-center">New Listings</p>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
            Discover Newly Curated Luxury Interiors for Modern Elegant Living Spaces
          </h2>
          <p className="text-[#6b6156] mt-7 leading-relaxed text-[15px] max-w-2xl mx-auto">
            Discover our latest curated interior listings, showcasing timeless
            elegance, premium craftsmanship, modern aesthetics, and refined living
            spaces designed to inspire comfort, beauty, and luxury lifestyle experience.
          </p>
          <div className="flex justify-center mt-9">
            <div className="flex">
              <a
                href="#journal"
                className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
              >
                Explore More
              </a>
              <a
                href="#journal"
                className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                aria-label="Explore more"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 mt-16 md:mt-20">
          <ListingCard item={listings[0]} delay={0} />
          <ListingCard item={listings[1]} delay={0.12} />
          <ListingCard item={listings[2]} delay={0.05} wide />
          <ListingCard item={listings[3]} delay={0} />
          <ListingCard item={listings[4]} delay={0.12} />
        </div>
      </div>
    </section>
  );
}

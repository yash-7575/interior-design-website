import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { posts } from "@/data/content";

export default function Journal() {
  return (
    <section id="journal" className="bg-[#f6f2ea] px-6 md:px-10 pb-28 md:pb-36">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12]"
          >
            Luxury interior spaces crafted with elegance, precision, and refined aesthetics
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:justify-self-end max-w-sm"
          >
            <p className="text-[#6b6156] text-[15px] leading-relaxed">
              Thoughtfully crafted spaces blending elegance, comfort, and
              functionality to enhance modern living.
            </p>
            <div className="flex mt-7">
              <a
                href="#listings"
                className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
              >
                View All Project
              </a>
              <a
                href="#listings"
                className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                aria-label="View all projects"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 md:mt-16">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d] mt-5 leading-snug group-hover:text-[#6b5b4a] transition-colors">
                {post.title}
              </h3>
              {post.desc && (
                <p className="text-[#6b6156] text-sm leading-relaxed mt-3">{post.desc}</p>
              )}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#e2d9c8]">
                <span className="text-sm text-[#8a7d6c]">{post.date}</span>
                <span className="text-sm text-[#8a7d6c]">{post.category}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

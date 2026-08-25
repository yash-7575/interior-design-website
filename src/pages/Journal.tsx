import { motion } from "framer-motion";
import { ChevronRight, Calendar, Tag, Clock, ArrowUpRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Enduring Luxury: Interiors Designed to Inspire",
    desc: "Designed with precision and refined aesthetics, our featured projects showcase modern elegance, functional design, curated textures, bespoke elements, and a timeless sense of luxury.",
    date: "12 Feb 2026",
    category: "Interior Design",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    author: "Elena Vasquez",
  },
  {
    id: 2,
    title: "Elevating Modern Living with Minimalist Elegance",
    desc: "How restraint and careful curation create spaces that feel both serene and sophisticated. A deep dive into our latest Manhattan penthouse project.",
    date: "8 Dec 2025",
    category: "Residential",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    author: "Marcus Chen",
  },
  {
    id: 3,
    title: "Sustainable Luxury: Designing Eco-Conscious Interiors",
    desc: "Responsible sourcing doesn't mean compromising on beauty. Explore how we integrate reclaimed materials, energy-efficient systems, and ethical craftsmanship.",
    date: "25 Jan 2026",
    category: "Eco Design",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    author: "Sophie Laurent",
  },
  {
    id: 4,
    title: "The Art of Lighting: Transforming Spaces After Dark",
    desc: "Layered lighting design that shifts atmosphere from day to night. Technical insights from our lighting curation specialists.",
    date: "15 Nov 2025",
    category: "Lighting Design",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
    author: "Marcus Chen",
  },
  {
    id: 5,
    title: "Curating Art for the Home: A Collector's Guide",
    desc: "How to select, frame, and place artwork that resonates with your space and story. Tips from our art advisory team.",
    date: "3 Oct 2025",
    category: "Art & Decor",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1578301978593-12a6334f6812?w=800&h=600&fit=crop",
    author: "Elena Vasquez",
  },
  {
    id: 6,
    title: "Behind the Project: Coastal Modern Villa",
    desc: "An exclusive walkthrough of our Malibu cliffside residence — from concept sketches to final reveal. Challenges, solutions, and design decisions.",
    date: "22 Sep 2025",
    category: "Case Studies",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    author: "Elena Vasquez",
  },
];

const categories = ["All", "Interior Design", "Residential", "Eco Design", "Lighting Design", "Art & Decor", "Case Studies"];

function ArticleCard({ post, delay }: { post: (typeof posts)[number]; delay: number }) {
  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#8a7d6c] mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5 bg-[#e2d9c8] px-3 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>
        <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d] leading-snug group-hover:text-[#6b5b4a] transition-colors mb-3">
          {post.title}
        </h3>
        <p className="text-[#6b6156] text-sm leading-relaxed mb-4 line-clamp-2">{post.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#8a7d6c]">By {post.author}</span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#33291f] hover:text-[#241c14] transition-colors"
          >
            Read More
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Journal() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Design journal and inspiration"
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
            Journal &
            <br />
            Inspiration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Insights, case studies, and design wisdom from the Eloria studio.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-[#33291f] text-white"
                    : "bg-white text-[#6b6156] hover:bg-[#f6f2ea]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <ArticleCard key={post.id} post={post} delay={i * 0.1} />
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button className="bg-[#33291f] text-white text-sm px-8 py-4 rounded-full hover:bg-[#241c14] transition-colors flex items-center gap-2 mx-auto">
              Load More Articles
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12]">
                Stay Inspired
              </h2>
              <p className="text-white/70 mt-6 leading-relaxed text-[15px] max-w-lg">
                Monthly design insights, project highlights, and exclusive studio updates — delivered to your inbox.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
              onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-l-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="bg-white text-[#2b241d] px-7 py-4 rounded-r-full hover:bg-white/90 transition-colors flex items-center gap-2 font-medium"
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
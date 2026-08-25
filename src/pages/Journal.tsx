import { motion } from "framer-motion";
import { ChevronRight, Calendar, Tag, Clock, ArrowUpRight, MessageCircle } from "lucide-react";
import { contact, whatsappLink, defaultEnquiry } from "@/data/business";

const posts = [
  {
    id: 1,
    title: "What a Turnkey Interior Project Actually Includes",
    desc: "Turnkey means more than furniture. Here is every trade a complete interior touches — civil, ceiling, electrical, plumbing, carpentry, finishing — and the questions worth asking before you sign a quotation.",
    date: "12 Feb 2026",
    category: "Turnkey Execution",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    author: "Durgesh Mishra",
  },
  {
    id: 2,
    title: "Choosing Materials for a Modular Kitchen in Pune",
    desc: "Plywood grade, laminate versus acrylic, hardware brands and the humidity a Pune monsoon puts them through. A practical guide to specifying a kitchen that lasts.",
    date: "8 Dec 2025",
    category: "Modular Kitchens",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    author: "Raj Mishra",
  },
  {
    id: 3,
    title: "Plan Your Electricals Before the Carpentry Starts",
    desc: "Switchboards behind wardrobes and missing points above the counter are the most common — and most expensive — rework we see. Here is the sequence that avoids it.",
    date: "25 Jan 2026",
    category: "Execution Notes",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
    author: "Durgesh Mishra",
  },
  {
    id: 4,
    title: "False Ceiling Types: Cove, Gypsum, Grid and Acoustic",
    desc: "Which ceiling suits which room, what each costs to run per square foot, and where a grid ceiling makes more sense than gypsum in a commercial space.",
    date: "15 Nov 2025",
    category: "Civil & Ceiling",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop",
    author: "Raj Mishra",
  },
  {
    id: 5,
    title: "Reading an Interior Quotation Line by Line",
    desc: "What an itemised quotation should contain, which line items commonly hide extra cost, and how to compare two estimates that look nothing alike.",
    date: "3 Oct 2025",
    category: "Costing",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    author: "Durgesh Mishra",
  },
  {
    id: 6,
    title: "Fitting Out an Office Without Shutting It Down",
    desc: "How we phase commercial fit-outs around working hours — sequencing, dust control, and the trades that have to run at night.",
    date: "22 Sep 2025",
    category: "Commercial",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    author: "Raj Mishra",
  },
];

const categories = ["All", "Turnkey Execution", "Modular Kitchens", "Execution Notes", "Civil & Ceiling", "Costing", "Commercial"];

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
            Notes From
            <br />
            the Site
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Practical guidance on materials, costing and execution, written by the
            team that does the work.
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
                Have a Question?
              </h2>
              <p className="text-white/70 mt-6 leading-relaxed text-[15px] max-w-lg">
                If something here applies to your own project, message us — we&rsquo;re
                happy to talk through materials, sequencing or costing before you
                commit to anything.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 bg-[#f5c518] text-[#2b241d] font-medium px-7 py-4 rounded-full hover:bg-[#ffd23f] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp {contact.whatsapp.display}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Email Us
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
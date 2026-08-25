import { motion } from "framer-motion";
import { ChevronRight, MapPin, Search, Filter } from "lucide-react";

const allProjects = [
  {
    id: 1,
    name: "Coastal Modern Villa",
    location: "Malibu, CA",
    category: "Residential",
    price: "$2.4M",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop",
    ],
    description: "A stunning cliffside residence overlooking the Pacific. Floor-to-ceiling windows frame the ocean while natural stone and warm woods ground the contemporary architecture.",
    year: 2024,
    size: "6,200 sq ft",
  },
  {
    id: 2,
    name: "Manhattan Penthouse",
    location: "New York, NY",
    category: "Residential",
    price: "$3.1M",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
    ],
    description: "Triplex penthouse on Central Park West. Custom millwork, curated art collection, and a private terrace with skyline views define this urban sanctuary.",
    year: 2023,
    size: "4,800 sq ft",
  },
  {
    id: 3,
    name: "Boutique Hotel Lobby",
    location: "Charleston, SC",
    category: "Hospitality",
    price: "$850K",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
    ],
    description: "Historic building restoration with contemporary luxury. Hand-painted wallcoverings, bespoke lighting, and locally sourced furnishings honor the property's heritage.",
    year: 2024,
    size: "3,200 sq ft",
  },
  {
    id: 4,
    name: "Mountain Retreat",
    location: "Aspen, CO",
    category: "Residential",
    price: "$1.9M",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop",
    ],
    description: "Ski-in/ski-out chalet blending rustic warmth with refined elegance. Reclaimed timber, stone fireplaces, and floor-to-ceiling glazing capture mountain vistas.",
    year: 2022,
    size: "5,100 sq ft",
  },
  {
    id: 5,
    name: "Corporate Headquarters",
    location: "San Francisco, CA",
    category: "Commercial",
    price: "$1.2M",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
    ],
    description: "Tech campus executive suite and collaborative spaces. Biophilic design, acoustic excellence, and flexible work environments for modern leadership.",
    year: 2023,
    size: "8,500 sq ft",
  },
  {
    id: 6,
    name: "Historic Townhouse",
    location: "London, UK",
    category: "Residential",
    price: "$2.8M",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
    ],
    description: "Grade II listed Georgian townhouse in Mayfair. Painstaking restoration meets contemporary luxury — original cornices, modern amenities, private garden.",
    year: 2024,
    size: "4,200 sq ft",
  },
];

const categories = ["All", "Residential", "Hospitality", "Commercial"];

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof allProjects)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={project.image}
          alt={project.name}
          className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-[#8a7d6c] mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
          <span className="text-[#d8cebc]">·</span>
          <span className="font-medium text-[#2b241d]">{project.category}</span>
        </div>
        <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d] group-hover:text-[#6b5b4a] transition-colors">
          {project.name}
        </h3>
        <p className="font-serif-display text-lg text-[#2b241d] mt-2">{project.price}</p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury interior project showcase"
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
            Portfolio of
            <br />
            Completed Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Explore our curated collection of luxury residential, hospitality, and commercial projects worldwide.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-[#33291f] text-white"
                    : "bg-[#f6f2ea] text-[#6b6156] hover:bg-[#e2d9c8]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Search & Filter Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 md:justify-between mb-12 items-start md:items-center"
          >
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a7d6c]" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f]"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#6b6156] hover:bg-[#f6f2ea] transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.08} />
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button className="bg-[#33291f] text-white text-sm px-8 py-4 rounded-full hover:bg-[#241c14] transition-colors flex items-center gap-2 mx-auto">
              Load More Projects
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Project Detail Teaser */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8a7d6c] font-medium">FEATURED PROJECT</p>
              <h2 className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12] mt-6">
                Coastal Modern Villa — Malibu
              </h2>
              <p className="text-white/70 mt-6 leading-relaxed text-[15px] max-w-lg">
                A stunning cliffside residence overlooking the Pacific. Floor-to-ceiling windows frame the ocean while natural stone and warm woods ground the contemporary architecture.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 text-white/70 text-sm">
                <span>2024 · 6,200 sq ft</span>
                <span>Residential</span>
                <span>$2.4M</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-8 text-white hover:text-white/80 transition-colors"
              >
                View Full Case Study
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative overflow-hidden rounded-2xl aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop"
                alt="Coastal Modern Villa interior"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm text-white/70">Swipe to view more →</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
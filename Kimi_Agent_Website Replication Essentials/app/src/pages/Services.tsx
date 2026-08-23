import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Check } from "lucide-react";

const serviceCategories = [
  {
    id: "residential",
    title: "Residential Design",
    description: "Full-service interior design for luxury homes — from concept development through final installation. New builds, renovations, and historic restorations.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    features: ["Space planning & layout optimization", "Custom millwork & built-ins", "Furniture procurement & styling", "Lighting design & specification", "Art curation & placement", "Project management & oversight"],
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    description: "Elevated workplace and hospitality environments that reflect brand identity while enhancing productivity and guest experience.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    features: ["Executive suite design", "Collaborative workspace strategy", "Boutique hotel & restaurant interiors", "Retail & showroom design", "Wellness & amenity spaces", "Brand-aligned material palettes"],
  },
  {
    id: "bespoke",
    title: "Bespoke Furniture",
    description: "One-of-a-kind furniture pieces designed and crafted exclusively for your space. Heirloom-quality, made by master artisans.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    features: ["Custom sofas & seating", "Dining & conference tables", "Casegoods & storage solutions", "Upholstery in curated fabrics", "Metalwork & stone detailing", "Limited edition collections"],
  },
  {
    id: "lighting",
    title: "Lighting Curation",
    description: "Architectural and decorative lighting design that transforms atmosphere. Technical precision meets artistic vision.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
    features: ["Lighting master plans", "Custom fixture design", "Smart lighting integration", "Art & display lighting", "Outdoor & landscape lighting", "Energy-efficient specifications"],
  },
  {
    id: "art",
    title: "Art & Decor",
    description: "Curated art collections and decorative objects that personalize and elevate your interiors. Access to emerging and established artists.",
    image: "https://images.unsplash.com/photo-1578301978593-12a6334f6812?w=800&h=600&fit=crop",
    features: ["Art advisory & acquisition", "Custom framing & installation", "Sculpture & object placement", "Textile & rug sourcing", "Vintage & antique procurement", "Commissioned artwork coordination"],
  },
  {
    id: "renovation",
    title: "Renovation Management",
    description: "End-to-end project management for complex renovations. We coordinate architects, contractors, and trades for seamless execution.",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop",
    features: ["Budget development & tracking", "Contractor selection & bidding", "Construction administration", "Timeline management", "Quality control inspections", "Move-in coordination"],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery & Vision",
    desc: "We begin with an in-depth consultation to understand your lifestyle, aesthetic preferences, and functional needs. Site analysis and feasibility assessment follow.",
  },
  {
    num: "02",
    title: "Concept Development",
    desc: "Mood boards, space plans, and preliminary renderings bring the vision to life. Material palettes and furniture concepts are presented for your feedback.",
  },
  {
    num: "03",
    title: "Design Refinement",
    desc: "Detailed drawings, specifications, and 3D visualizations finalize every decision. Custom pieces are designed; vendors and artisans are selected.",
  },
  {
    num: "04",
    title: "Procurement & Production",
    desc: "We manage all ordering, fabrication, and delivery logistics. Custom items enter production; lead times are tracked meticulously.",
  },
  {
    num: "05",
    title: "Installation & Reveal",
    desc: "Our team orchestrates the final installation — furniture placement, art hanging, styling, and the walkthrough. Your vision, realized.",
  },
];

export default function Services() {
  const [active, setActive] = useState("residential");

  const activeService = serviceCategories.find((s) => s.id === active) || serviceCategories[0];

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Interior design services showcase"
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
            Design Services
            <br />
            Tailored to You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            From concept to completion, we offer comprehensive interior design services for discerning clients worldwide.
          </motion.p>
        </div>
      </section>

      {/* Service Categories - Extended from existing Services section */}
      <section id="services" className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* left - categories */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12]">
              Curate, Design &<br />
              Elevate with Eloria
            </h2>

            <ul className="mt-12 space-y-1">
              {serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onMouseEnter={() => setActive(cat.id)}
                    onClick={() => setActive(cat.id)}
                    className={`group flex items-center gap-4 w-full text-left font-serif-display text-2xl md:text-3xl py-4 transition-all duration-300 ${
                      active === cat.id ? "text-[#2b241d] translate-x-2" : "text-[#b3a58f] hover:text-[#2b241d]"
                    }`}
                  >
                    {cat.title}
                    <ArrowRight
                      className={`w-6 h-6 transition-all duration-300 ${
                        active === cat.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex mt-12">
              <a
                href="/contact"
                className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
              >
                Start a Project
              </a>
              <a
                href="/contact"
                className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                aria-label="Start a project"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* right - active service detail */}
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
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="mt-10 divide-y divide-[#e2d9c8]">
              <div className="py-6 flex gap-6">
                <span className="text-sm text-[#a89a83] pt-1.5 font-medium">01</span>
                <div>
                  <h3 className="font-serif-display text-2xl md:text-[28px] text-[#2b241d]">{activeService.title}</h3>
                  <p className="text-[#6b6156] text-sm leading-relaxed mt-3 max-w-md">{activeService.description}</p>
                </div>
              </div>
              <div className="py-6">
                <h4 className="text-sm font-medium text-[#a89a83] tracking-wide mb-4">What's Included</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeService.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center gap-3 text-[#6b6156] text-sm"
                    >
                      <Check className="w-4 h-4 text-[#33291f] flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="bg-[#e9ebef] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">ALL SERVICES</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              Comprehensive Design Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif-display text-xl text-white">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#6b6156] text-sm leading-relaxed mb-6">{service.description}</p>
                  <a
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#33291f] hover:text-[#241c14] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">OUR PROCESS</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              From Vision to Reality
            </h2>
            <p className="text-[#6b6156] mt-6 leading-relaxed text-[15px]">
              A proven five-phase approach ensures every project is delivered on time, on budget, and beyond expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative"
              >
                <span className="font-serif-display text-5xl md:text-6xl text-[#e2d9c8] block mb-4">{step.num}</span>
                <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d] mb-3">{step.title}</h3>
                <p className="text-[#6b6156] text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-[60px] right-[-50%] w-full h-px bg-gradient-to-r from-transparent via-[#e2d9c8] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12]"
          >
            Let's Begin Your Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to transform your space? Schedule a complimentary consultation to discuss your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 mt-10"
          >
            <a
              href="/contact"
              className="bg-white text-[#2b241d] text-sm px-7 py-3.5 rounded-l-full hover:bg-white/90 transition-colors"
            >
              Book Consultation
            </a>
            <a
              href="/projects"
              className="bg-white text-[#2b241d] px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-white/90 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
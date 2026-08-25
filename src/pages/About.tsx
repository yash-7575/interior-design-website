import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif-display text-5xl md:text-6xl text-[#2b241d]">
      {display}
      <span className="text-4xl md:text-5xl">{suffix}</span>
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const team = [
  {
    name: "Elena Vasquez",
    role: "Founder & Principal Designer",
    bio: "20+ years crafting timeless interiors for discerning clients worldwide. Featured in AD, Elle Decor, and Wallpaper*.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Marcus Chen",
    role: "Creative Director",
    bio: "Former senior designer at Kelly Wearstler. Specializes in residential luxury and bespoke furniture curation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sophie Laurent",
    role: "Lead Project Manager",
    bio: "Architecture background with 15 years managing complex luxury renovations across Europe and North America.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  },
];

const values = [
  {
    title: "Timeless Over Trendy",
    desc: "We design spaces that endure beyond seasons, blending classic proportions with modern sensibility.",
  },
  {
    title: "Craftsmanship First",
    desc: "Every detail is executed by master artisans. Quality is never compromised for speed or cost.",
  },
  {
    title: "Client as Collaborator",
    desc: "Your vision guides our process. We listen deeply, then elevate your ideas with expertise.",
  },
  {
    title: "Sustainable Luxury",
    desc: "Responsible sourcing, durable materials, and energy-conscious design are non-negotiable.",
  },
];

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Elegant interior design studio workspace"
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
            Our Story:
            <br />
            Timeless Interiors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Two decades of crafting spaces that define luxury living. Meet the team behind the vision.
          </motion.p>
        </div>
      </section>

      {/* About Content - Extended from existing About section */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="lg:col-span-3 order-2 lg:order-1">
              <p className="text-xs tracking-[0.3em] text-[#6b5b4a] mb-8 font-medium">ABOUT US</p>
              <div className="overflow-hidden rounded-sm max-w-[260px]">
                <motion.img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=520&h=650&fit=crop"
                  alt="Elegant dining area with modern chandelier"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-5 order-1 lg:order-2">
              <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.1]">
                Timeless Interiors
                <br />
                Elevated Living
              </h2>
              <p className="text-[#6b6156] mt-8 max-w-md leading-relaxed text-[15px]">
                Founded in 2004 by Elena Vasquez, Eloria began as a small atelier in Manhattan
                and has grown into an internationally recognized design studio. We specialize in
                luxury residential and commercial interiors that balance aesthetic excellence with
                livable comfort.
              </p>
              <p className="text-[#6b6156] mt-6 max-w-md leading-relaxed text-[15px]">
                Every project begins with listening — understanding how you live, work, and dream
                in your spaces. We then translate that into environments that feel both inevitable
                and extraordinary.
              </p>
              <div className="flex mt-10">
                <a
                  href="#services"
                  className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
                >
                  Explore Services
                </a>
                <a
                  href="#services"
                  className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                  aria-label="Explore services"
                >
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-4 order-3">
              <div className="overflow-hidden rounded-sm lg:mt-16">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop"
                  alt="Modern luxury kitchen with marble island"
                  className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-24 md:mt-32 border-t border-[#e2d9c8]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="pt-10 pb-4 px-2 md:px-8"
            >
              <div className="flex items-end gap-2 flex-wrap">
                <CountUp value={20} suffix="+" />
                <span className="text-[#8a7d6c] text-sm mb-2">Years</span>
              </div>
              <p className="text-[#6b6156] text-sm mt-6 border-t border-[#e2d9c8] pt-5">Years of Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="pt-10 pb-4 px-2 md:px-8 lg:border-l border-[#e2d9c8]"
            >
              <div className="flex items-end gap-2 flex-wrap">
                <CountUp value={150} suffix="+" />
                <span className="text-[#8a7d6c] text-sm mb-2">Projects</span>
              </div>
              <p className="text-[#6b6156] text-sm mt-6 border-t border-[#e2d9c8] pt-5">Completed Projects</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="pt-10 pb-4 px-2 md:px-8 lg:border-l border-[#e2d9c8]"
            >
              <div className="flex items-end gap-2 flex-wrap">
                <CountUp value={12} suffix="" />
                <span className="text-[#8a7d6c] text-sm mb-2">Team</span>
              </div>
              <p className="text-[#6b6156] text-sm mt-6 border-t border-[#e2d9c8] pt-5">Design Professionals</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="pt-10 pb-4 px-2 md:px-8 lg:border-l border-[#e2d9c8]"
            >
              <div className="flex items-end gap-2 flex-wrap">
                <CountUp value={98} suffix="%" />
                <span className="text-[#8a7d6c] text-sm mb-2">Satisfied</span>
              </div>
              <p className="text-[#6b6156] text-sm mt-6 border-t border-[#e2d9c8] pt-5">Client Retention Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Philosophy / Values */}
      <section className="bg-[#e9ebef] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">OUR PHILOSOPHY</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              Principles That Guide Every Design Decision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-[#f6f2ea] p-8 md:p-10 rounded-xl hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
              >
                <h3 className="font-serif-display text-2xl md:text-3xl text-[#2b241d] leading-snug">
                  {value.title}
                </h3>
                <p className="text-[#6b6156] mt-4 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">MEET THE TEAM</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              The Visionaries Behind Eloria
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif-display text-xl md:text-2xl text-[#2b241d]">{member.name}</h3>
                  <p className="text-[#8a7d6c] text-sm mt-1 font-medium">{member.role}</p>
                  <p className="text-[#6b6156] text-sm leading-relaxed mt-4">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12]"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Let's create something extraordinary together. Schedule a consultation to begin your design journey.
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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { serviceGroups as serviceCategories, allServices, processSteps } from "@/data/services";
import { business, whatsappLink, defaultEnquiry } from "@/data/business";

import servicesBanner from "@/assets/img/projects/office-fitout-workstation-rows.webp";

export default function Services() {
  const [active, setActive] = useState(serviceCategories[0].id);

  const activeService = serviceCategories.find((s) => s.id === active) || serviceCategories[0];

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={servicesBanner}
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
            25 Services,
            <br />
            One Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Every trade a complete interior needs — design, manufacturing, civil work
            and services — handled in-house across Pune.
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
              Design, Manufacture<br />
              &amp; Execute &mdash; In-House
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
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-[#f5c518] text-[#2b241d] text-sm font-medium px-7 py-3.5 rounded-l-full hover:bg-[#ffd23f] transition-colors"
              >
                Start a Project
              </a>
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-[#f5c518] text-[#2b241d] px-4 py-3.5 rounded-r-full border-l border-black/10 hover:bg-[#ffd23f] transition-colors"
                aria-label="Start a project on WhatsApp"
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
                <div className="grid grid-cols-1 gap-3">
                  {activeService.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-start gap-3 text-[#6b6156] text-sm"
                    >
                      <Check className="w-4 h-4 text-[#33291f] flex-shrink-0 mt-0.5" />
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
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">WHAT WE HANDLE</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              Six Disciplines, Twenty-Five Capabilities
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
                    href={whatsappLink(
                      `Hello ${business.name}, I'd like to enquire about ${service.title}.`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#33291f] hover:text-[#241c14] transition-colors"
                  >
                    Enquire on WhatsApp
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full capability list */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-16"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">FULL SERVICE LIST</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              Everything We Execute
            </h2>
            <p className="text-[#6b6156] mt-6 leading-relaxed text-[15px]">
              Take the whole project or any single trade — each of these is available
              on its own.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-1">
            {allServices.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 9) * 0.04 }}
                className="flex items-baseline gap-4 py-4 border-b border-[#e2d9c8]"
              >
                <span className="text-xs text-[#a89a83] font-medium tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#2b241d] text-sm leading-relaxed">{service}</span>
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
              From Site Visit to Handover
            </h2>
            <p className="text-[#6b6156] mt-6 leading-relaxed text-[15px]">
              A six-stage process with a written scope and an itemised quotation before
              any work begins, so you know what is happening at every stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
            Let&rsquo;s Begin Your Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Send us the floor plan or a photo of the space and we&rsquo;ll come back
            with a scope and an itemised estimate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 mt-10"
          >
            <a
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#f5c518] text-[#2b241d] text-sm font-medium px-7 py-3.5 rounded-l-full hover:bg-[#ffd23f] transition-colors"
            >
              Message Us on WhatsApp
            </a>
            <a
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#f5c518] text-[#2b241d] px-4 py-3.5 rounded-r-full border-l border-black/10 hover:bg-[#ffd23f] transition-colors"
              aria-label="Message us on WhatsApp"
            >
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
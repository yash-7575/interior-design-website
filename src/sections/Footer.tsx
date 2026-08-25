import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { footerLinks } from "@/data/content";
import { business, contact, socials, whatsappLink, defaultEnquiry } from "@/data/business";
import { LogoMark } from "@/components/Logo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#33291f] text-[#e8e0d2] px-6 md:px-10 pt-20 md:pt-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* top */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-16 border-b border-white/10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl md:text-6xl leading-[1.15] max-w-2xl"
          >
            Planning an Interior Project?
            <br />
            Let&rsquo;s Talk on WhatsApp
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="shrink-0"
          >
            <p className="text-sm text-[#c9bda9] max-w-xs leading-relaxed">
              Send us your floor plan or requirement and we&rsquo;ll get back with a
              scope and an itemised estimate.
            </p>
            <div className="flex mt-6">
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-[#f5c518] text-[#2b241d] text-sm font-medium px-7 py-3.5 rounded-l-full hover:bg-[#ffd23f] transition-colors"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-[#f5c518] text-[#2b241d] px-4 py-3.5 rounded-r-full border-l border-black/10 hover:bg-[#ffd23f] transition-colors"
                aria-label="Enquire on WhatsApp"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div className="space-y-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between py-2.5 border-b border-white/10 text-[#c9bda9] hover:text-white transition-colors"
              >
                <span className="text-sm">{s.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quick.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-[#a89a83] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-5">What We Do</h4>
            <ul className="space-y-3">
              {footerLinks.property.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-[#a89a83] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-5">Visit Us</h4>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[#a89a83] hover:text-white transition-colors leading-relaxed block"
            >
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
            </a>

            <h4 className="text-sm font-medium text-white mt-7 mb-3">Call Us</h4>
            <ul className="space-y-2">
              {contact.phones.slice(0, 2).map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="text-sm text-[#a89a83] hover:text-white transition-colors">
                    {p.display}
                    <span className="text-[#6b6156]"> · {p.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-medium text-white mt-7 mb-3">Email</h4>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-[#a89a83] hover:text-white transition-colors break-all"
            >
              {contact.email}
            </a>

            <h4 className="text-sm font-medium text-white mt-7 mb-3">Hours</h4>
            <p className="text-sm text-[#a89a83] leading-relaxed">
              {contact.hours.weekdays}
              <br />
              {contact.hours.weekend}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-6 border-t border-white/10 text-xs text-[#8a7d6c]">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </p>
        </div>

        {/* giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="select-none flex items-center justify-center gap-[0.06em] text-center font-serif-display text-[#f6f2ea] leading-[0.85] text-[clamp(3.2rem,12vw,11rem)] tracking-tight pb-2"
          aria-hidden="true"
        >
          <motion.span
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex shrink-0"
          >
            <LogoMark className="w-[0.85em] h-[0.85em]" />
          </motion.span>
          <span>MEGADREAM</span>
        </motion.div>
      </div>
    </footer>
  );
}

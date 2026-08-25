import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { images, footerLinks } from "@/data/content";

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
            Discover Timeless Interiors
            <br />
            Crafted for Modern Living
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {images.avatars.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt="Member"
                    className="w-11 h-11 rounded-full border-2 border-[#33291f] object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-[#c9bda9]">50k+ Members Joined Us</p>
            </div>
            <div className="flex mt-6">
              <Link
                to="/contact"
                className="bg-[#f6f2ea] text-[#2b241d] text-sm px-7 py-3.5 rounded-l-full hover:bg-white transition-colors"
              >
                Start Your Design
              </Link>
              <Link
                to="/contact"
                className="bg-[#f6f2ea] text-[#2b241d] px-4 py-3.5 rounded-r-full border-l border-black/10 hover:bg-white transition-colors"
                aria-label="Start your design"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div className="space-y-1">
            {footerLinks.socials.map((s) => (
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
            <h4 className="text-sm font-medium text-white mb-5">Property Types</h4>
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
            <h4 className="text-sm font-medium text-white mb-5">Location</h4>
            <p className="text-sm text-[#a89a83] leading-relaxed">
              4520 Washington Ave.
              <br />
              Manchester, 39495
            </p>
            <h4 className="text-sm font-medium text-white mt-7 mb-3">Call Us</h4>
            <a href="tel:+6281575658150" className="text-sm text-[#a89a83] hover:text-white transition-colors">
              +62 815 7565 8150
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-6 border-t border-white/10 text-xs text-[#8a7d6c]">
          <p>@2026 Eloria copyright. All right reserved</p>
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
          className="select-none text-center font-serif-display text-[#f6f2ea] leading-[0.85] text-[clamp(5rem,17.5vw,17rem)] tracking-tight pb-2"
          aria-hidden="true"
        >
          <span>EL</span>
          <span className="relative inline-block">
            O
            <span className="absolute inset-0 flex items-center justify-center">
              <motion.img
                src={images.hero}
                alt=""
                className="w-[46%] h-[62%] object-cover rounded-full"
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </span>
          <span>RIA</span>
        </motion.div>
      </div>
    </footer>
  );
}

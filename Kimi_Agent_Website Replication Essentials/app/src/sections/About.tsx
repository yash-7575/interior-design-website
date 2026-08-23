import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { images, stats } from "@/data/content";

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

export default function About() {
  return (
    <section className="bg-[#f6f2ea] px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* left small image + label */}
          <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="lg:col-span-3 order-2 lg:order-1">
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] mb-8 font-medium">ABOUT US</p>
            <div className="overflow-hidden rounded-sm max-w-[260px]">
              <motion.img
                src={images.aboutDining}
                alt="Elegant dining area"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* center text */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-5 order-1 lg:order-2">
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.1]">
              Timeless Interiors
              <br />
              Elevated Living
            </h2>
            <p className="text-[#6b6156] mt-8 max-w-md leading-relaxed text-[15px]">
              Specializing in luxury interiors, we transform spaces into refined
              living experiences. Every project is thoughtfully designed, ensuring
              comfort elegance, and a seamless journey from concept to completion.
            </p>
            <div className="flex mt-10">
              <a
                href="#services"
                className="bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-l-full hover:bg-[#241c14] transition-colors"
              >
                More About Us
              </a>
              <a
                href="#services"
                className="bg-[#33291f] text-white px-4 py-3.5 rounded-r-full border-l border-white/15 hover:bg-[#241c14] transition-colors"
                aria-label="More about us"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* right tall image */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-4 order-3">
            <div className="overflow-hidden rounded-sm lg:mt-16">
              <img
                src={images.aboutKitchen}
                alt="Modern luxury kitchen"
                className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-24 md:mt-32 border-t border-[#e2d9c8]">
          {stats.map((s, i) => (
            <motion.div
              key={s.sub}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`pt-10 pb-4 px-2 md:px-8 ${i > 0 ? "lg:border-l border-[#e2d9c8]" : ""}`}
            >
              <div className="flex items-end gap-2 flex-wrap">
                <CountUp value={s.value} suffix={s.suffix} />
                <span className="text-[#8a7d6c] text-sm mb-2">{s.label}</span>
              </div>
              <p className="text-[#6b6156] text-sm mt-6 border-t border-[#e2d9c8] pt-5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

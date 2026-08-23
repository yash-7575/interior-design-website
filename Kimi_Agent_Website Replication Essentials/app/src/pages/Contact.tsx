import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ChevronRight, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@eloria.com",
    subtitle: "We respond within 24 hours",
    link: "mailto:hello@eloria.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (212) 555-0147",
    subtitle: "Mon–Fri, 9am–6pm EST",
    link: "tel:+12125550147",
  },
  {
    icon: MapPin,
    title: "Visit Our Studio",
    value: "4520 Washington Ave",
    subtitle: "Manchester, 39495 — By appointment only",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Studio Hours",
    value: "Mon–Fri: 9am–6pm",
    subtitle: "Sat: 10am–4pm · Sun: Closed",
    link: null,
  },
];

const projectTypes = [
  "Full Home Renovation",
  "Single Room Design",
  "Commercial / Hospitality",
  "Bespoke Furniture Only",
  "Lighting Design",
  "Art Curation",
  "Renovation Management",
  "Consultation Only",
];

const budgetRanges = [
  "Under $50,000",
  "$50,000 – $150,000",
  "$150,000 – $500,000",
  "$500,000 – $1,000,000",
  "$1,000,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Just exploring",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", projectType: "", budget: "", timeline: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
          alt="Modern design studio meeting space"
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
            Let's Start Your
            <br />
            Design Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Every great project begins with a conversation. Tell us about your vision.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-[#f6f2ea] px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif-display text-4xl md:text-5xl text-[#2b241d] leading-[1.12]">
                Get in Touch
              </h2>
              <p className="text-[#6b6156] mt-6 leading-relaxed text-[15px] max-w-md">
                We'd love to hear about your project. Fill out the form or reach out directly —
                we'll be in touch within 24 hours to schedule a complimentary consultation.
              </p>

              <div className="mt-12 space-y-8">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#33291f] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif-display text-lg text-[#2b241d]">{item.title}</h3>
                      <a
                        href={item.link || "#"}
                        className="text-[#33291f] font-medium hover:text-[#241c14] transition-colors block mt-1"
                      >
                        {item.value}
                      </a>
                      <p className="text-[#8a7d6c] text-sm mt-0.5">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-16 pt-8 border-t border-[#e2d9c8]">
                <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium mb-4">FOLLOW US</p>
                <div className="flex gap-4">
                  {["Instagram", "Pinterest", "LinkedIn", "Houzz"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full border border-[#d8cebc] flex items-center justify-center text-[#6b6156] hover:bg-[#33291f] hover:border-[#33291f] hover:text-white transition-all"
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white rounded-2xl p-6 md:p-10 shadow-xl shadow-black/5"
            >
              <h3 className="font-serif-display text-2xl md:text-3xl text-[#2b241d] mb-8">
                Book a Consultation
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-[#33291f] mx-auto mb-4" />
                  <h4 className="font-serif-display text-2xl text-[#2b241d] mb-2">Message Sent!</h4>
                  <p className="text-[#6b6156]">Thank you for reaching out. We'll be in touch within 24 hours to schedule your consultation.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-[#33291f] hover:text-[#241c14] underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all appearance-none bg-no-repeat bg-right-4"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a7d6c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all appearance-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a7d6c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-[#6b6156] mb-2">
                        Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all appearance-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a7d6c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((tl) => (
                          <option key={tl} value={tl}>
                            {tl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#6b6156] mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#faf7f1] border border-[#e2d9c8] rounded-lg text-[#2b241d] placeholder-[#a89a83] focus:outline-none focus:ring-2 focus:ring-[#33291f] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your vision, style preferences, must-haves, and any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-3 bg-[#33291f] text-white text-sm px-7 py-3.5 rounded-full hover:bg-[#241c14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#a89a83]">
                    By submitting, you agree to our{" "}
                    <a href="#" className="underline hover:text-[#33291f]">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="#" className="underline hover:text-[#33291f]">Terms of Service</a>
                    .
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#e9ebef] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[#6b5b4a] font-medium">FREQUENTLY ASKED</p>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#2b241d] leading-[1.12] mt-6">
              Questions We Often Hear
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What does the initial consultation involve?",
                a: "A complimentary 60-minute meeting (virtual or in-studio) where we discuss your project scope, timeline, budget, and aesthetic vision. We'll share our process and answer all your questions.",
              },
              {
                q: "How do you charge for design services?",
                a: "We offer both flat-fee and hourly structures depending on project scope. Full-service design typically starts at a design fee plus procurement markup. We provide transparent pricing before any commitment.",
              },
              {
                q: "What's the typical project timeline?",
                a: "Residential projects range from 4–18 months depending on scope. New builds and major renovations take longer than single-room refreshes. We provide a detailed timeline during the proposal phase.",
              },
              {
                q: "Do you work remotely or only locally?",
                a: "We work globally. While our studio is in Manchester, we manage projects worldwide with regular site visits, virtual reviews, and local vendor coordination. Distance is never a barrier to exceptional design.",
              },
              {
                q: "Can we purchase furniture through you?",
                a: "Yes. We have access to trade-only showrooms, artisan workshops, and vintage dealers worldwide. Clients benefit from our buying power, curation expertise, and seamless logistics management.",
              },
              {
                q: "What if we already have an architect/contractor?",
                a: "We collaborate seamlessly with your existing team. Early integration yields the best results — we coordinate lighting, millwork, and finish selections directly with your architect and builder.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-serif-display text-lg md:text-xl text-[#2b241d] pr-8">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-[#8a7d6c] group-open:rotate-90 transition-transform duration-300 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#6b6156] leading-relaxed border-t border-[#e2d9c8] pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2b241d] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl md:text-6xl text-white leading-[1.12]"
          >
            Ready to Begin?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Your dream space is one conversation away. Let's create something extraordinary together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 mt-10"
          >
            <a
              href="#"
              className="bg-white text-[#2b241d] text-sm px-7 py-3.5 rounded-l-full hover:bg-white/90 transition-colors"
            >
              Schedule Consultation
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
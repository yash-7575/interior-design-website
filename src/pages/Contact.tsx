import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ChevronRight, MessageCircle, CheckCircle } from "lucide-react";
import { business, contact, socials, whatsappLink } from "@/data/business";

import contactBanner from "@/assets/img/projects/main-door-veneer-and-brass-inlay.webp";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    value: contact.whatsapp.display,
    subtitle: "Fastest way to reach us — we reply the same day",
    link: whatsappLink(`Hello ${business.name}, I'd like to discuss an interior project.`),
  },
  {
    icon: Phone,
    title: "Call Us",
    value: contact.phones[0].display,
    subtitle: `${contact.phones[0].name} · also ${contact.phones[1].display} (${contact.phones[1].name})`,
    link: `tel:${contact.phones[0].tel}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    value: contact.email,
    subtitle: "Send us floor plans, references or a requirement list",
    link: `mailto:${contact.email}`,
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    value: contact.address.line1,
    subtitle: `${contact.address.line2} — ${contact.address.line3}`,
    link: contact.mapsUrl,
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: contact.hours.weekdays,
    subtitle: contact.hours.weekend,
    link: null,
  },
];

const projectTypes = [
  "Full Home Turnkey Interior",
  "Single Room / Partial Work",
  "Modular Kitchen & Storage",
  "Custom Furniture Only",
  "Office / Commercial Fit-Out",
  "Retail, Showroom or Restaurant",
  "Renovation & Remodelling",
  "False Ceiling / Civil Work Only",
  "Not sure yet — need guidance",
];

const budgetRanges = [
  "Under ₹3 Lakh",
  "₹3 – 7 Lakh",
  "₹7 – 15 Lakh",
  "₹15 – 30 Lakh",
  "₹30 Lakh+",
  "Not sure yet",
];

const timelines = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
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

  /**
   * There is no backend. Enquiries are routed to the studio's WhatsApp inbox:
   * the form fields are formatted into a message and opened via a wa.me link.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const lines = [
      `New enquiry via ${business.name} website`,
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      `Project type: ${formData.projectType}`,
      `Budget: ${formData.budget}`,
      formData.timeline && `Timeline: ${formData.timeline}`,
      "",
      "Details:",
      formData.message,
    ].filter(Boolean) as string[];

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", projectType: "", budget: "", timeline: "", message: "" });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={contactBanner}
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
            Let&rsquo;s Plan Your
            <br />
            Interior Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base mt-6 max-w-md leading-relaxed"
          >
            Tell us about the space and we&rsquo;ll come back with a scope and an
            itemised estimate.
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
                WhatsApp is the quickest way to reach us — send a photo of the space
                or your floor plan and we&rsquo;ll take it from there. You can also call
                either number below or drop us an email.
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
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-[#6b6156] hover:text-[#2b241d] underline underline-offset-4 transition-colors"
                    >
                      {social.label}
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
                Send Us Your Requirement
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-[#33291f] mx-auto mb-4" />
                  <h4 className="font-serif-display text-2xl text-[#2b241d] mb-2">WhatsApp Opened</h4>
                  <p className="text-[#6b6156]">
                    Your enquiry is ready in WhatsApp — press send there and we&rsquo;ll
                    reply the same day. If the chat didn&rsquo;t open, message us
                    directly at{" "}
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline font-medium text-[#2b241d]"
                    >
                      {contact.whatsapp.display}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-[#33291f] hover:text-[#241c14] underline"
                  >
                    Send Another Enquiry
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
                        placeholder="Your full name"
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
                        placeholder="you@example.com"
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
                        placeholder="+91 98765 43210"
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
                      placeholder="Tell us about the space — flat or office, carpet area, location in Pune, what work is needed, and when you'd like to start..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-3 bg-[#f5c518] text-[#2b241d] text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#ffd23f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        Send Enquiry on WhatsApp
                        <MessageCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#a89a83]">
                    This opens WhatsApp with your details pre-filled — nothing is sent
                    until you press send there.
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
                q: "What does 'turnkey' actually include?",
                a: "Everything between an empty space and a finished one — layout and 3D design, civil and ceiling work, electrical and plumbing, carpentry and modular furniture, painting and polishing, right through to final cleaning and handover. One quotation, one schedule, one team answerable for the result.",
              },
              {
                q: "Do you manufacture the furniture yourselves?",
                a: "Yes. Modular kitchens, wardrobes and custom furniture are built in our own facility rather than outsourced, which keeps the finish consistent and the delivery timeline under our control.",
              },
              {
                q: "Which areas do you work in?",
                a: "Pune and the surrounding Maharashtra regions. Our office is in Ambegaon Budruk, and we regularly execute projects across the city and nearby areas.",
              },
              {
                q: "How is the project costed?",
                a: "After a site visit and requirement discussion we share an itemised quotation broken down by trade — carpentry, ceiling, electrical, plumbing, painting and so on. You can see what each element costs and adjust the scope before any work begins.",
              },
              {
                q: "Can you take on only part of the work?",
                a: "Yes. Plenty of clients come to us for a modular kitchen, a false ceiling, aluminium windows or a single room. Turnkey is what we are known for, but individual trades are available on their own.",
              },
              {
                q: "How long does a typical project take?",
                a: "It depends on scope and site conditions. A modular kitchen or a single room is usually a few weeks; a full home turnkey project generally runs two to four months. We commit to a schedule in writing before starting.",
              },
              {
                q: "Do you follow Vastu requirements?",
                a: "We do. Vastu Shastra and space harmonisation consultation is part of our planning stage, and we work your requirements into the layout from the beginning rather than adjusting afterwards.",
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
            Send us your requirement on WhatsApp and we&rsquo;ll get back to you with
            a scope and an estimate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 mt-10"
          >
            <a
              href={whatsappLink(`Hello ${business.name}, I'd like to discuss an interior project.`)}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#f5c518] text-[#2b241d] text-sm font-medium px-7 py-3.5 rounded-l-full hover:bg-[#ffd23f] transition-colors"
            >
              Message Us on WhatsApp
            </a>
            <a
              href={whatsappLink(`Hello ${business.name}, I'd like to discuss an interior project.`)}
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
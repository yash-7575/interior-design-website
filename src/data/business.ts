/**
 * Single source of truth for MegaDream Associates' business details.
 *
 * Every phone number, address, link and hour shown anywhere on the site reads
 * from this file — change it here and it changes everywhere.
 *
 * Items marked TODO are placeholders awaiting confirmation from the client.
 */

export const business = {
  name: "MegaDream Associates",
  shortName: "MegaDream",
  initials: "MD",
  tagline: "Turnkey Interior Execution & Furniture Manufacturing",
  pitch:
    "Leading turnkey interior execution specialists and furniture manufacturers based in Pune.",
  about:
    "We undertake comprehensive turnkey interior projects across residential, corporate and commercial sectors, with an emphasis on seamless space planning, durable quality craftsmanship and long-term client trust.",
  city: "Pune",
  serviceArea: "Pune & surrounding Maharashtra regions",
};

export const contact = {
  email: "mdassociates999@gmail.com",

  /** Primary inquiry channel — every form and CTA routes here. */
  whatsapp: {
    /** Digits only, with country code — used to build wa.me links. */
    number: "918329842119",
    display: "+91 83298 42119",
  },

  phones: [
    { name: "Durgesh Mishra", display: "+91 97623 08053", tel: "+919762308053" },
    { name: "Raj Mishra", display: "+91 83298 42119", tel: "+918329842119" },
    { name: "Office", display: "+91 83080 91958", tel: "+918308091958" },
    { name: "Office", display: "+91 88558 09642", tel: "+918855809642" },
  ],

  address: {
    line1: "Sr. No. 32/8/2, Shop No. 1, Vikrant Villa",
    line2: "Ambegaon Budruk, Pune",
    line3: "Maharashtra – 411046",
    /** Flattened for schema.org and mailto/WhatsApp message bodies. */
    full: "Sr. No. 32/8/2, Shop No. 1, Vikrant Villa, Ambegaon Budruk, Pune, Maharashtra – 411046",
  },

  // TODO: replace with the studio's own Google Maps place link once shared.
  // Until then this is an address search, which resolves to the right pin.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Vikrant Villa, Ambegaon Budruk, Pune, Maharashtra 411046",
    ),

  // TODO: confirm exact weekly schedule and weekly off with the client.
  hours: {
    weekdays: "Mon – Sat: 10:00 AM – 7:30 PM",
    weekend: "Sunday: Closed",
  },
};

export const socials = [
  { label: "Instagram", url: "https://www.instagram.com/md_associates_" },
  { label: "YouTube", url: "http://www.youtube.com/@mdassociates3378" },
  { label: "WhatsApp", url: `https://wa.me/${contact.whatsapp.number}` },
  { label: "Email", url: `mailto:${contact.email}` },
];

/**
 * Builds a wa.me deep link with an optional pre-filled message.
 * Used by every "enquire" CTA so leads land in one inbox.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default pre-filled text for generic enquiry buttons. */
export const defaultEnquiry = `Hello ${business.name}, I'd like to discuss an interior project.`;

// TODO: confirm these figures with the client before launch — they are
// conservative placeholders, not verified numbers.
export const stats = [
  { value: 12, suffix: "+", label: "Years", sub: "Years of execution experience" },
  { value: 250, suffix: "+", label: "Projects", sub: "Interiors delivered across Pune" },
  { value: 25, suffix: "", label: "Services", sub: "Trades handled fully in-house" },
  { value: 100, suffix: "%", label: "Turnkey", sub: "Single point of accountability" },
];

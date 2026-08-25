import hero from "@/assets/img/hero.jpg";
import aboutDining from "@/assets/img/about-dining.jpg";
import aboutKitchen from "@/assets/img/about-kitchen.jpg";
import slide1 from "@/assets/img/slide-1.jpg";
import slide2 from "@/assets/img/slide-2.jpg";
import slide3 from "@/assets/img/slide-3.jpg";
import services from "@/assets/img/services.jpg";
import listing1 from "@/assets/img/listing-1.jpg";
import listing2 from "@/assets/img/listing-2.jpg";
import listing3 from "@/assets/img/listing-3.jpg";
import listing4 from "@/assets/img/listing-4.jpg";
import listing5 from "@/assets/img/listing-5.jpg";
import blog1 from "@/assets/img/blog-1.jpg";
import blog2 from "@/assets/img/blog-2.jpg";
import blog3 from "@/assets/img/blog-3.jpg";
import avatar1 from "@/assets/img/avatar-1.jpg";
import avatar2 from "@/assets/img/avatar-2.jpg";
import avatar3 from "@/assets/img/avatar-3.jpg";

export const images = {
  hero,
  aboutDining,
  aboutKitchen,
  services,
  avatars: [avatar1, avatar2, avatar3],
};

export const stats = [
  { value: 10, suffix: "+", label: "Years", sub: "Years of Interior Experience" },
  { value: 98, suffix: "%", label: "Satisfied", sub: "Satisfied Valued Clients" },
  { value: 50, suffix: "+", label: "Projects", sub: "Active Interior Projects" },
  { value: 50, suffix: "K+", label: "Clients", sub: "Happy Clients" },
];

export const featured = [
  {
    name: "Shaazzz Interior Studio",
    location: "Elegant Coastal Living Concept",
    desc: "Minimalist luxury interiors with premium materials, open spaces, and calming ocean-inspired elegance.",
    price: "$19,500.00",
    image: slide1,
    tag: "Infinity View Concept",
  },
  {
    name: "The Private Sanctuary",
    location: "Coral Gables, FL",
    desc: "A perfect balance of modern design and tranquil textures, creating an elegant space for relaxation.",
    price: "$28,900.00",
    image: slide2,
    tag: "Infinity View Concept",
  },
  {
    name: "Serene Coastal Retreat",
    location: "Malibu, CA",
    desc: "Soft neutral palettes and natural light compose a timeless retreat crafted for calm modern living.",
    price: "$24,700.00",
    image: slide3,
    tag: "Infinity View Concept",
  },
];

export const serviceCategories = [
  "Residential Design",
  "Commercial Spaces",
  "Bespoke Furniture",
  "Lighting Curation",
  "Art & Decor",
];

export const serviceItems = [
  {
    num: "01",
    title: "Residential Living Space",
    desc: "Thoughtfully designed residential spaces that blend comfort, functionality, and modern aesthetics to enhance everyday lifestyle experiences.",
  },
  { num: "02", title: "High-Performance Collaboration", desc: "" },
  { num: "03", title: "Curated Private Art Collections", desc: "" },
  { num: "04", title: "Heritage Material Sourcing", desc: "" },
];

export const listings = [
  { name: "Elegant Modern Dining Haven", location: "Syracuse, Connecticut", price: "$19,500.00", image: listing1 },
  { name: "Minimalist Luxury Lounge", location: "Syracuse, Connecticut", price: "$19,500.00", image: listing2 },
  { name: "Bright Contemporary Serenity Space", location: "Syracuse, Connecticut", price: "$19,500.00", image: listing3, wide: true },
  { name: "Warm Modern Comfort Living", location: "Syracuse, Connecticut", price: "$19,500.00", image: listing4 },
  { name: "Cozy Elegant Haven", location: "Syracuse, Connecticut", price: "$19,500.00", image: listing5 },
];

export const posts = [
  {
    title: "Enduring Luxury: Interiors Designed to Inspire",
    desc: "Designed with precision and refined aesthetics, our featured projects showcase modern elegance, functional design, curated textures, bespoke elements, and a timeless sense of luxury.",
    date: "12 Feb 2026",
    category: "Interior Design",
    image: blog1,
  },
  {
    title: "Elevating Modern Living with Minimalist Elegance",
    desc: "",
    date: "8 Dec 2025",
    category: "Residential",
    image: blog2,
  },
  {
    title: "Sustainable Luxury: Designing Eco-Conscious Interiors",
    desc: "",
    date: "25 Jan 2026",
    category: "Eco Design",
    image: blog3,
  },
];

export const footerLinks = {
  socials: [
    { label: "Facebook", url: "https://facebook.com" },
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Twitter", url: "https://twitter.com" },
    { label: "Linkedin", url: "https://linkedin.com" },
  ],
  quick: [
    { label: "Projects", path: "/projects" },
    { label: "About Studio", path: "/about" },
    { label: "Design Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ],
  property: [
    { label: "Living Spaces", path: "/projects" },
    { label: "Luxury Bedrooms", path: "/projects" },
    { label: "Modular Kitchens", path: "/projects" },
    { label: "Office Interiors", path: "/services" },
  ],
};

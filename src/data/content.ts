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

export const images = {
  hero,
  aboutDining,
  aboutKitchen,
  services,
};

export { stats } from "@/data/business";

// TODO: replace with real MegaDream project photos and names once the client
// uploads them to the shared Drive folder.
export const featured = [
  {
    name: "3 BHK Turnkey Interior",
    location: "Ambegaon Budruk, Pune",
    desc: "Full-home execution with in-house modular kitchen, wardrobes, false ceiling and electrical rework — handed over in twelve weeks.",
    scope: "Turnkey · 1,250 sq ft",
    image: slide1,
    tag: "Residential",
  },
  {
    name: "Corporate Office Fit-Out",
    location: "Katraj, Pune",
    desc: "Workstations, cabin partitions, acoustic ceiling and glass glazing delivered around the client's working hours with zero downtime.",
    scope: "Commercial · 3,400 sq ft",
    image: slide2,
    tag: "Corporate",
  },
  {
    name: "Modular Kitchen & Storage",
    location: "Dhankawadi, Pune",
    desc: "Custom-manufactured modular kitchen with tall units, corner solutions and matching utility storage, built in our own facility.",
    scope: "Modular · 180 sq ft",
    image: slide3,
    tag: "Furniture",
  },
];

export const serviceCategories = [
  "Turnkey Execution",
  "Furniture & Modular",
  "Civil & Fabrication",
  "Electrical & Plumbing",
  "Commercial Fit-Outs",
];

export const serviceItems = [
  {
    num: "01",
    title: "One team, every trade",
    desc: "Carpentry, ceiling, electrical, plumbing, glazing and painting are all handled in-house — so there is one schedule, one quotation and one person answerable for the result.",
  },
  { num: "02", title: "Furniture built in our own facility", desc: "" },
  { num: "03", title: "3D renders before work begins", desc: "" },
  { num: "04", title: "Itemised, transparent costing", desc: "" },
];

// TODO: replace with real MegaDream project photos and names.
export const listings = [
  { name: "Contemporary Living Room", location: "Ambegaon Budruk, Pune", scope: "Residential", image: listing1 },
  { name: "Master Bedroom & Wardrobe", location: "Katraj, Pune", scope: "Residential", image: listing2 },
  { name: "Open-Plan Modular Kitchen", location: "Dhankawadi, Pune", scope: "Modular", image: listing3, wide: true },
  { name: "Corporate Cabin Interior", location: "Kondhwa, Pune", scope: "Commercial", image: listing4 },
  { name: "Compact Apartment Makeover", location: "Narhe, Pune", scope: "Renovation", image: listing5 },
];

export const posts = [
  {
    title: "What Turnkey Interiors Actually Include",
    desc: "Turnkey means more than furniture. Here is every trade a complete interior project touches — and the questions worth asking before you sign a quotation.",
    date: "12 Feb 2026",
    category: "Turnkey Execution",
    image: blog1,
  },
  {
    title: "Choosing Materials for a Pune Modular Kitchen",
    desc: "",
    date: "8 Dec 2025",
    category: "Modular Kitchens",
    image: blog2,
  },
  {
    title: "Planning Electricals Before the Carpentry Starts",
    desc: "",
    date: "25 Jan 2026",
    category: "Execution Notes",
    image: blog3,
  },
];

export const footerLinks = {
  quick: [
    { label: "Projects", path: "/projects" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ],
  property: [
    { label: "Residential Interiors", path: "/services" },
    { label: "Modular Kitchens", path: "/services" },
    { label: "Custom Furniture", path: "/services" },
    { label: "Office Fit-Outs", path: "/services" },
  ],
};

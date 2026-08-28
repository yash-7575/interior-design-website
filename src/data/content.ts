import { projects, type Project } from "@/data/projects";

import heroTurnkey from "@/assets/img/hero-turnkey-living-dining.webp";
import aboutDining from "@/assets/img/projects/sofa-beige-sectional-installed.webp";
import aboutKitchen from "@/assets/img/projects/jali-partition-pooja-alcove-screen.webp";

export const images = {
  hero: heroTurnkey,
  aboutDining,
  aboutKitchen,
};

export { stats } from "@/data/business";

/** Look a project up by id, failing loudly rather than rendering a blank card. */
function project(id: string): Project {
  const found = projects.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown project id: ${id}`);
  return found;
}

/**
 * Home-page carousel. Derived from `projects` so the home page and the Projects
 * page can never show different copy for the same work. `imageIndex` picks the
 * widest frame in each gallery, since the slider is a very wide container.
 */
export const featured = (
  [
    ["turnkey-living-dining", 1, "Residential"],
    ["corporate-office-fitout", 0, "Commercial"],
    ["upholstered-furniture", 0, "Furniture"],
  ] as const
).map(([id, imageIndex, tag]) => {
  const p = project(id);
  return {
    name: p.name,
    category: p.category,
    desc: p.description,
    scope: p.scope,
    image: p.images[imageIndex].src,
    alt: p.images[imageIndex].caption,
    tag,
  };
});

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

/** Home-page "Recent Work" mosaic. One entry is `wide` and spans two columns. */
export const listings = (
  [
    ["master-bedroom-cove-lit", 0, false],
    ["bedroom-wardrobe-study", 0, false],
    ["corporate-office-fitout", 0, true],
    ["modular-kitchen", 0, false],
    ["upholstered-furniture", 1, false],
  ] as const
).map(([id, imageIndex, wide]) => {
  const p = project(id);
  return {
    name: p.name,
    category: p.category,
    scope: p.scope,
    image: p.images[imageIndex].src,
    alt: p.images[imageIndex].caption,
    wide,
  };
});

export const posts = [
  {
    title: "What Turnkey Interiors Actually Include",
    desc: "Turnkey means more than furniture. Here is every trade a complete interior project touches — and the questions worth asking before you sign a quotation.",
    date: "12 Feb 2026",
    category: "Turnkey Execution",
    image: project("turnkey-living-dining").images[5].src,
    alt: project("turnkey-living-dining").images[5].caption,
  },
  {
    title: "Choosing Materials for a Pune Modular Kitchen",
    desc: "",
    date: "8 Dec 2025",
    category: "Modular Kitchens",
    image: project("modular-kitchen").images[0].src,
    alt: project("modular-kitchen").images[0].caption,
  },
  {
    title: "Planning Electricals Before the Carpentry Starts",
    desc: "",
    date: "25 Jan 2026",
    category: "Execution Notes",
    image: project("modular-kitchen").images[1].src,
    alt: project("modular-kitchen").images[1].caption,
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

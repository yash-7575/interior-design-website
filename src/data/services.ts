/**
 * MegaDream Associates' full service catalogue.
 *
 * `serviceGroups` organises all 25 capabilities into the six buckets the
 * Services page and the home-page Services section render. `allServices` is the
 * flat, numbered list of the same 25 — kept in sync by construction, since the
 * page derives it from the groups.
 */

export type ServiceGroup = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "turnkey",
    title: "Turnkey Execution",
    description:
      "One contract, one accountable team, from empty shell to handover. We plan the space, visualise it, procure the materials and supervise every trade on site so you deal with a single point of contact.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    features: [
      "Turnkey interior execution & project management",
      "Space planning & 2D/3D architectural layouts",
      "3D visualisation, photorealistic renders & virtual walkthroughs",
      "Material selection & procurement assistance",
      "Vastu Shastra & space harmonisation consultation",
      "Site supervision, quality control & vendor coordination",
    ],
  },
  {
    id: "furniture",
    title: "Furniture & Modular",
    description:
      "We manufacture what we design. Modular kitchens, wardrobes and loose furniture are built in our own facility, which keeps quality, finish and delivery timelines under our control.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    features: [
      "Modular kitchen & storage design",
      "Custom furniture design & manufacturing",
      "Soft furnishings & upholstery — curtains, blinds, rugs, cushions",
      "Styling, decor curation & art sourcing",
    ],
  },
  {
    id: "civil",
    title: "Civil, Ceiling & Fabrication",
    description:
      "The structural work that everything else sits on. Ceilings, partitions, glazing, masonry and finishes executed by in-house teams to a measured standard.",
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop",
    features: [
      "False ceiling & POP works — cove, gypsum, grid, acoustic",
      "Aluminium & fabrication — sliding windows, doors, partitions, balcony enclosures",
      "Glass & glazing — toughened glass, ACP panel cladding, partitions",
      "Civil & structural modification — tiling, masonry, flooring, plastering",
      "Painting, polishing & textured wall finishes",
    ],
  },
  {
    id: "services-mep",
    title: "Electrical, Plumbing & HVAC",
    description:
      "Services planned alongside the design rather than bolted on afterwards, so switchboards, outlets, ducting and drainage land where the furniture actually needs them.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
    features: [
      "Electrical planning & smart lighting integration",
      "Plumbing & sanitary fitting work",
      "HVAC & ventilation planning",
      "Acoustic treatment & home theatre design",
    ],
  },
  {
    id: "residential",
    title: "Residential Interiors",
    description:
      "Flats, bungalows and row houses across Pune — whole homes or a single room, new possession or a full remodel of a place you have lived in for years.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    features: [
      "Residential interior design — living rooms, master bedrooms, kids' spaces",
      "Home renovation, remodelling & makeovers",
      "Bathroom & powder room modernisation",
      "Landscape, terrace & balcony garden design",
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Retail",
    description:
      "Offices, showrooms, restaurants and cafes built to run — durable materials, service-friendly layouts and schedules that work around your business hours.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    features: [
      "Commercial & corporate office fit-outs",
      "Retail & hospitality design — showrooms, restaurants, cafes",
    ],
  },
];

/** All 25 capabilities as one flat list, derived from the groups above. */
export const allServices: string[] = serviceGroups.flatMap((g) => g.features);

export const processSteps = [
  {
    num: "01",
    title: "Site Visit & Requirement Study",
    desc: "We visit the site, take measurements, and understand how you actually use the space — family size, storage needs, work habits, Vastu preferences, and your budget range.",
  },
  {
    num: "02",
    title: "Layout & 3D Design",
    desc: "2D layouts establish the plan; photorealistic 3D renders and walkthroughs let you see the finished space before a single sheet of ply is cut. We revise until it's right.",
  },
  {
    num: "03",
    title: "Transparent Costing",
    desc: "An itemised quotation covering every trade — carpentry, ceiling, electrical, plumbing, painting. You see what each element costs and can adjust scope before we begin.",
  },
  {
    num: "04",
    title: "In-House Manufacturing",
    desc: "Modular units and custom furniture are built in our own facility while civil, ceiling and services work runs in parallel on site, compressing the overall timeline.",
  },
  {
    num: "05",
    title: "Execution & Supervision",
    desc: "A dedicated supervisor coordinates every vendor and trade on site, with regular progress updates so you always know what stage the project is at.",
  },
  {
    num: "06",
    title: "Handover & Support",
    desc: "Final finishing, deep cleaning and a walkthrough against the agreed scope — followed by continued support on anything that needs attention after you move in.",
  },
];

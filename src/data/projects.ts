// MegaDream Associates' own project photography, supplied by the client.
//
// This is the *bundled baseline* — the ten curated projects, imported at build
// time so they are fingerprinted, cached and always available. Projects the
// client adds through the Sanity Studio are layered on top at runtime by
// `src/hooks/useProjects.ts`; this file stays the fallback when Sanity is
// unreachable. The home page renders only this set.
//
// Naming note: these photographs arrived without client names, addresses or
// dates attached, so each project is described by the work that is visible in
// the frame rather than by an invented address. If MegaDream confirms the real
// project names and locations, add a `location` field here and surface it in
// ProjectCard — nothing else needs to change.

// -- Turnkey apartment: living & dining -------------------------------------
import livingBlueSofa from "@/assets/img/projects/turnkey-living-dining-blue-sofa.webp";
import livingTowardsKitchen from "@/assets/img/projects/turnkey-living-dining-towards-kitchen.webp";
import livingTelevisionWall from "@/assets/img/projects/turnkey-living-dining-television-wall.webp";
import livingSeatingView from "@/assets/img/projects/turnkey-living-dining-seating-view.webp";
import livingCoveCeiling from "@/assets/img/projects/turnkey-living-dining-cove-ceiling.webp";
import livingFullLength from "@/assets/img/projects/turnkey-living-dining-full-length.webp";

// -- Master bedroom ---------------------------------------------------------
import bedroomCurvedCove from "@/assets/img/projects/master-bedroom-curved-cove-ceiling.webp";
import bedroomGoldHeadboard from "@/assets/img/projects/master-bedroom-gold-panelled-headboard.webp";
import ceilingCoveDetail from "@/assets/img/projects/false-ceiling-cove-lighting-detail.webp";

// -- CNC jali partitions ----------------------------------------------------
import jaliDiningDivider from "@/assets/img/projects/jali-partition-dining-divider.webp";
import jaliFloralScreen from "@/assets/img/projects/jali-partition-floral-cnc-screen.webp";
import jaliPoojaAlcove from "@/assets/img/projects/jali-partition-pooja-alcove-screen.webp";
import jaliInterlocking from "@/assets/img/projects/jali-partition-interlocking-circles.webp";

// -- Corporate office fit-out -----------------------------------------------
import officeOpenPlan from "@/assets/img/projects/office-fitout-open-plan-workstations.webp";
import officeWorkstationRows from "@/assets/img/projects/office-fitout-workstation-rows.webp";
import officeFeatureWall from "@/assets/img/projects/office-fitout-feature-wall-graphics.webp";
import officeGlazedCabins from "@/assets/img/projects/office-fitout-glazed-cabin-partitions.webp";

// -- Television & feature wall units ----------------------------------------
import tvMarbleFluted from "@/assets/img/projects/television-unit-marble-and-fluted-oak.webp";
import tvBacklitPanel from "@/assets/img/projects/television-unit-backlit-fluted-panel.webp";
import tvOpenShelving from "@/assets/img/projects/television-unit-open-display-shelving.webp";

// -- Joinery: main door, pooja unit, foyer ----------------------------------
import mainDoorVeneer from "@/assets/img/projects/main-door-veneer-and-brass-inlay.webp";
import poojaUnitShutters from "@/assets/img/projects/pooja-unit-cnc-carved-shutters.webp";
import foyerConsolePanel from "@/assets/img/projects/foyer-console-fluted-feature-panel.webp";
import bedroomWardrobeStudy from "@/assets/img/projects/bedroom-sliding-wardrobe-study-nook.webp";

// -- Upholstered furniture manufacturing ------------------------------------
import sofaGreyOttoman from "@/assets/img/projects/sofa-grey-sectional-with-ottoman.webp";
import sofaTealTufted from "@/assets/img/projects/sofa-teal-tufted-three-piece-set.webp";
import sofaBlueVelvet from "@/assets/img/projects/sofa-blue-velvet-corner-sectional.webp";
import sofaTanScalloped from "@/assets/img/projects/sofa-tan-scalloped-loveseat.webp";
import sofaBrownLounger from "@/assets/img/projects/sofa-brown-lounger-with-storage.webp";
import sofaBlueChesterfield from "@/assets/img/projects/sofa-blue-chesterfield-sectional.webp";
import sofaBeigeInstalled from "@/assets/img/projects/sofa-beige-sectional-installed.webp";

// -- Modular kitchens -------------------------------------------------------
import kitchenInstallation from "@/assets/img/projects/modular-kitchen-installation-underway.webp";
import kitchenTallUnits from "@/assets/img/projects/modular-kitchen-tall-units-and-wiring.webp";
import kitchenRedAcrylic from "@/assets/img/projects/modular-kitchen-red-acrylic-base-units.webp";

// -- Site execution ---------------------------------------------------------
import flutedMarbleCounter from "@/assets/img/projects/fluted-partition-marble-counter.webp";
import flutedCarpentryOnSite from "@/assets/img/projects/fluted-partition-carpentry-on-site.webp";

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Modular"
  | "Furniture";

export type ProjectImage = {
  src: string;
  /** Describes the actual room and workmanship — used as alt text and as the
   *  lightbox caption, so keep it specific. */
  caption: string;
  /** Smaller variant for grid cards. Only set for CMS images, where the CDN can
   *  serve a narrower file; bundled images fall back to `src`. */
  thumb?: string;
};

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  /** Short line under the card title, e.g. "Turnkey execution · 3 BHK". */
  scope: string;
  description: string;
  images: ProjectImage[];
  /** Renders the card across two columns in the home-page Listings mosaic. */
  wide?: boolean;
  /** Promoted into the home-page FeaturedSlider. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "turnkey-living-dining",
    name: "Turnkey Living & Dining",
    category: "Residential",
    scope: "Turnkey execution · 3 BHK apartment",
    description:
      "A full-home design worked through in 3D before a single panel was cut — open-plan living running into the dining and kitchen, a stepped cove-lit false ceiling, fluted accent panelling and in-house furniture throughout.",
    featured: true,
    images: [
      { src: livingBlueSofa, caption: "Living room with a blue linen sofa, cove-lit false ceiling and fluted accent panelling" },
      { src: livingTowardsKitchen, caption: "View from the living room through the dining area into the modular kitchen" },
      { src: livingTelevisionWall, caption: "Television wall with a wall-hung console and backlit fluted panelling" },
      { src: livingSeatingView, caption: "Occasional seating and nesting coffee tables against sheer floor-length curtains" },
      { src: livingCoveCeiling, caption: "Cove-lit ceiling with a decorative cluster pendant over the seating group" },
      { src: livingFullLength, caption: "Full length of the open-plan living and dining space" },
    ],
  },
  {
    id: "master-bedroom-cove-lit",
    name: "Master Bedroom, Cove-Lit Ceiling",
    category: "Residential",
    scope: "False ceiling · Bed & wall panelling",
    description:
      "A finished master bedroom carrying a curved gypsum false ceiling with concealed warm lighting, an upholstered headboard wall and matching bedside joinery.",
    images: [
      { src: bedroomCurvedCove, caption: "Master bedroom with a curved cove-lit false ceiling and tufted upholstered headboard" },
      { src: bedroomGoldHeadboard, caption: "Bedroom with a gold-panelled headboard wall and layered profile lighting" },
      { src: ceilingCoveDetail, caption: "Detail of a gypsum false ceiling with a concealed cove-lighting reveal" },
    ],
  },
  {
    id: "jali-partition-screens",
    name: "CNC Jali Partition Screens",
    category: "Modular",
    scope: "CNC fabrication · Partition joinery",
    description:
      "Laser and CNC-cut partition screens that divide open plans without closing them off — each pattern cut to the opening, finished in-house and installed with concealed fixings.",
    images: [
      { src: jaliDiningDivider, caption: "CNC-cut jali screen dividing the dining area, set over a wooden storage base" },
      { src: jaliFloralScreen, caption: "Floral CNC-cut partition screen in a dark walnut finish" },
      { src: jaliPoojaAlcove, caption: "Gold-finished jali screen framing a marble-clad pooja alcove" },
      { src: jaliInterlocking, caption: "Interlocking-circle jali screen in a solid teak frame" },
    ],
  },
  {
    id: "corporate-office-fitout",
    name: "Corporate Office Fit-Out",
    category: "Commercial",
    scope: "Commercial fit-out · Open-plan floor",
    description:
      "An open-plan office floor delivered end to end — workstation systems, glazed cabin partitions, an acoustic grid ceiling with recessed panel lighting and a printed feature wall.",
    wide: true,
    featured: true,
    images: [
      { src: officeOpenPlan, caption: "Open-plan office floor with linear workstation clusters and an acoustic grid ceiling" },
      { src: officeWorkstationRows, caption: "Rows of workstations with orange privacy screens along a glazed facade" },
      { src: officeFeatureWall, caption: "Printed feature wall behind the workstation bays" },
      { src: officeGlazedCabins, caption: "Workstation bays alongside glazed cabin partitions and branded graphics" },
    ],
  },
  {
    id: "television-feature-walls",
    name: "Television & Feature Wall Units",
    category: "Modular",
    scope: "Custom joinery · Living room units",
    description:
      "Television units built as the anchor of the living room — marble cladding, fluted oak, backlit reveals and concealed storage, each one manufactured to the wall it sits on.",
    images: [
      { src: tvMarbleFluted, caption: "Television unit combining book-matched marble cladding with fluted oak and lit display niches" },
      { src: tvBacklitPanel, caption: "Backlit fluted panel television unit with a floating storage console" },
      { src: tvOpenShelving, caption: "Wall-mounted television unit with open display shelving in a white matte finish" },
    ],
  },
  {
    id: "entrance-joinery",
    name: "Entrance Door, Foyer & Pooja Unit",
    category: "Modular",
    scope: "Custom joinery · Entrance & foyer",
    description:
      "The first three metres of a home, treated as one piece of joinery — a veneered main door with brass inlay, a foyer console and a CNC-carved pooja unit finished to match.",
    images: [
      { src: mainDoorVeneer, caption: "Designer main door in natural veneer with curved brass inlay detailing" },
      { src: poojaUnitShutters, caption: "Pooja unit with CNC-carved sunburst shutters and a lower storage base" },
      { src: foyerConsolePanel, caption: "Foyer console with a fluted feature panel and a backlit circular artwork niche" },
    ],
  },
  {
    id: "bedroom-wardrobe-study",
    name: "Bedroom Wardrobe & Study Nook",
    category: "Residential",
    scope: "Custom furniture · Wardrobe & desk",
    description:
      "A compact bedroom worked so the storage and the workspace share one wall — full-height sliding wardrobes beside a built-in study desk with open shelving above.",
    images: [
      { src: bedroomWardrobeStudy, caption: "Bedroom with full-height sliding wardrobes and a built-in study desk under the window" },
    ],
  },
  {
    id: "upholstered-furniture",
    name: "Upholstered Furniture Manufacturing",
    category: "Furniture",
    scope: "In-house manufacturing · Sofas & seating",
    description:
      "Sofas, sectionals and occasional seating built in MegaDream's own facility — frames, foam, tufting and fabric selected per order, so a sofa is made for the room rather than bought to fit it.",
    featured: true,
    images: [
      { src: sofaGreyOttoman, caption: "Grey corner sectional with teal cushions and a matching tufted ottoman" },
      { src: sofaTealTufted, caption: "Teal velvet three-piece suite with diamond tufting and crystal buttons" },
      { src: sofaBlueVelvet, caption: "Blue velvet corner sectional with piped edges and a channel-stitched back" },
      { src: sofaTanScalloped, caption: "Tan scalloped-back loveseat on slim brass legs" },
      { src: sofaBrownLounger, caption: "Brown fabric lounger sofa with a pull-out base and hidden storage" },
      { src: sofaBlueChesterfield, caption: "Blue chesterfield-style sectional with deep buttoning and a chaise return" },
      { src: sofaBeigeInstalled, caption: "Beige sectional installed in a client's living room" },
    ],
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen Manufacture & Install",
    category: "Modular",
    scope: "Modular manufacturing · Kitchen & utility",
    description:
      "Modular kitchens carcassed and finished in our facility, then installed on site with the electrical points, plumbing and chimney routing set out around the final layout.",
    images: [
      { src: kitchenInstallation, caption: "Modular kitchen installation underway, wall units hung and the counter run being fitted" },
      { src: kitchenTallUnits, caption: "Kitchen tall units and wall cabinets with electrical points being run in behind" },
      { src: kitchenRedAcrylic, caption: "Base units in a high-gloss red acrylic finish with a granite counter and sink cut-out" },
    ],
  },
  {
    id: "site-execution",
    name: "Fluted Partition & Marble Counter",
    category: "Residential",
    scope: "Site execution · Carpentry & cladding",
    description:
      "A fluted timber partition and marble-clad counter built in place, dividing the entrance from the living area — photographed mid-execution, which is how most of our work actually looks a fortnight before handover.",
    images: [
      { src: flutedMarbleCounter, caption: "Fluted timber partition over a marble-clad counter, dividing the entrance from the living area" },
      { src: flutedCarpentryOnSite, caption: "On-site carpentry in progress on the fluted partition and counter unit" },
    ],
  },
];

/** Cover image for a project — the first image in its gallery. */
export const coverOf = (p: Project) => p.images[0];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories: readonly ["All", ...ProjectCategory[]] = [
  "All",
  "Residential",
  "Commercial",
  "Modular",
  "Furniture",
];

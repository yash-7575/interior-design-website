// The installed lucide-react package is missing its bundled TypeScript
// declarations (dist has no .d.ts and package.json has no "types"/"exports"
// fields), so we declare it ambiently. Icon imports resolve to `any`.
declare module "lucide-react";

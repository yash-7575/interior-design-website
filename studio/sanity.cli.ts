import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  /** Set once with `npx sanity deploy`; the studio then lives at <hostname>.sanity.studio */
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
});

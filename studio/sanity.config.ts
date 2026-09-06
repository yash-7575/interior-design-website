import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

/**
 * Project id and dataset come from `studio/.env` (see `.env.example`), so this
 * file carries no account-specific values and is safe to commit.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

if (!projectId) {
  throw new Error(
    "SANITY_STUDIO_PROJECT_ID is not set. Copy studio/.env.example to studio/.env and fill in the project id from manage.sanity.io.",
  );
}

export default defineConfig({
  name: "megadream",
  title: "MegaDream Associates",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

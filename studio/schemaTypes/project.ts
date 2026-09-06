import { defineField, defineType } from "sanity";

/**
 * A project in MegaDream's portfolio.
 *
 * Field names mirror the `Project` type in `src/data/projects.ts` so the website
 * can map a published document straight onto the shape its components already
 * render. If you rename a field here, update `src/hooks/useProjects.ts` too.
 *
 * `category` must stay in step with `ProjectCategory` in that same file — the
 * Projects page filter is built from it.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project name",
      type: "string",
      description:
        'Describe the work, not the client. For example "Handleless Modular Kitchen — Acrylic Finish" rather than a flat number or an address.',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "Generated from the name. Click Generate — you rarely need to edit this.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Decides which filter button on the Projects page shows this work.",
      options: {
        list: [
          { title: "Residential", value: "Residential" },
          { title: "Commercial", value: "Commercial" },
          { title: "Modular", value: "Modular" },
          { title: "Furniture", value: "Furniture" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scope",
      title: "Scope line",
      type: "string",
      description:
        'The small line under the title on the card. Keep it short, e.g. "Turnkey execution · 3 BHK apartment".',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "Two or three sentences on what was actually built — the trades involved, the materials, anything unusual about the job.",
      validation: (rule) => rule.required().min(40).max(600),
    }),
    defineField({
      name: "images",
      title: "Photographs",
      type: "array",
      description:
        "The first photograph is the cover shown on the Projects page. Drag to reorder. Every photograph needs a caption.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description:
                "Describe what is in the photograph — the room and the workmanship. This is read aloud to visually impaired visitors and shown under the photo in the gallery.",
              validation: (rule) => rule.required().min(10).max(160),
            }),
          ],
          preview: {
            select: { media: "asset", title: "caption" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).error("Add at least one photograph."),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description:
        "Optional. Lower numbers appear first. Leave empty and the newest project leads.",
    }),
  ],
  orderings: [
    {
      title: "Sort order, then newest",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
});

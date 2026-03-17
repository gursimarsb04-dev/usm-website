import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "date", title: "Date", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "eventbriteUrl", title: "Eventbrite URL", type: "url" }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: { list: ["conference", "retreat", "social", "workshop"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "hostedBy", title: "Hosted By", type: "reference", to: [{ type: "ssa" }] }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "date" } },
  orderings: [{ title: "Date (Newest)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});

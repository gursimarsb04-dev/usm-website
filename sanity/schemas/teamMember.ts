import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: { list: ["Executive Board", "Advisors", "Regional Leads"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

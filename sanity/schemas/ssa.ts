import { defineField, defineType } from "sanity";

export default defineType({
  name: "ssa",
  title: "SSA",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "university", title: "University", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "state", title: "State", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: { list: ["West", "Midwest", "East", "South"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "websiteUrl", title: "Website URL", type: "url" }),
    defineField({ name: "memberCount", title: "Member Count", type: "number" }),
    defineField({ name: "foundedYear", title: "Founded Year", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "university" } },
});

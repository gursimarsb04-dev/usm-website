import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "authorName", title: "Author Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({ name: "authorPhoto", title: "Author Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "ssa", title: "SSA", type: "reference", to: [{ type: "ssa" }] }),
  ],
  preview: { select: { title: "authorName", subtitle: "authorRole" } },
});

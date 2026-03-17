import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt" } },
});

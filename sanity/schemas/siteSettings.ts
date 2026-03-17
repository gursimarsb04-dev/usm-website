import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "donationGoal", title: "Donation Goal (USD cents)", type: "number" }),
    defineField({
      name: "trustedByLogos",
      title: "Trusted By Logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }],
    }),
  ],
});

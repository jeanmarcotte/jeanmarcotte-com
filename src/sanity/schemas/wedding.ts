import { defineField, defineType } from "sanity";

export const wedding = defineType({
  name: "wedding",
  title: "Wedding",
  type: "document",
  fields: [
    defineField({
      name: "coupleNames",
      title: "Couple Names",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weddingDate",
      title: "Wedding Date",
      type: "date",
    }),
    defineField({
      name: "ceremonyVenue",
      title: "Ceremony Venue",
      type: "reference",
      to: [{ type: "venue" }],
    }),
    defineField({
      name: "receptionVenue",
      title: "Reception Venue",
      type: "reference",
      to: [{ type: "venue" }],
    }),
    defineField({
      name: "city",
      title: "City",
      type: "reference",
      to: [{ type: "city" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "reference",
      to: [{ type: "gallery" }],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial / Quote from Couple",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "testimonialAttribution",
      title: "Testimonial Attribution",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      title: "coupleNames",
      subtitle: "weddingDate",
      media: "coverImage",
    },
  },
});

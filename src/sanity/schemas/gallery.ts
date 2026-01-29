import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "galleryType",
      title: "Gallery Type",
      type: "string",
      options: {
        list: [
          { title: "Curated", value: "curated" },
          { title: "Wedding Story", value: "wedding-story" },
          { title: "Venue", value: "venue" },
          { title: "Style", value: "style" },
          { title: "City", value: "city" },
        ],
      },
      validation: (rule) => rule.required(),
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
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "photo" }],
        },
      ],
    }),
    defineField({
      name: "styleTags",
      title: "Style Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Candid", value: "candid" },
          { title: "Editorial", value: "editorial" },
          { title: "Cultural", value: "cultural" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    }),
    defineField({
      name: "relatedVenue",
      title: "Related Venue",
      type: "reference",
      to: [{ type: "venue" }],
    }),
    defineField({
      name: "relatedCity",
      title: "Related City",
      type: "reference",
      to: [{ type: "city" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "galleryType",
      media: "coverImage",
    },
  },
});

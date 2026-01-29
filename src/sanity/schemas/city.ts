import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "City",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region / Area",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Rich text content for SEO landing pages. Target cities: Vaughan, Maple, Woodbridge, Markham, Scarborough, Hamilton, Cambridge, Niagara, Toronto, Mississauga.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featuredGalleries",
      title: "Featured Galleries",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "gallery" }],
        },
      ],
    }),
    defineField({
      name: "featuredVenues",
      title: "Featured Venues",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "venue" }],
        },
      ],
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
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "region",
      media: "heroImage",
    },
  },
});

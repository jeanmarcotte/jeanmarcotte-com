import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: "Accessible description of the image for screen readers and SEO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ethnicity",
      title: "Ethnicity Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Cultural or ethnic representation in the photo, helping couples see themselves reflected",
    }),
    defineField({
      name: "venueName",
      title: "Venue Name",
      type: "string",
      description: "Name of the venue where the photo was taken",
    }),
    defineField({
      name: "parkName",
      title: "Park Name",
      type: "string",
      description: "Name of the park, if applicable",
    }),
    defineField({
      name: "ceremonyLocation",
      title: "Ceremony Location",
      type: "string",
      description: "Specific ceremony location within the venue",
    }),
    defineField({
      name: "subjects",
      title: "Subjects",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Bride", value: "bride" },
          { title: "Groom", value: "groom" },
          { title: "Couple", value: "couple" },
          { title: "Family", value: "family" },
          { title: "Bridal Party", value: "bridal-party" },
          { title: "Guests", value: "guests" },
          { title: "Details", value: "details" },
          { title: "Venue", value: "venue" },
        ],
      },
      description: "Who or what is featured in the photo",
    }),
    defineField({
      name: "photoType",
      title: "Photo Type",
      type: "string",
      options: {
        list: [
          { title: "Posed", value: "posed" },
          { title: "Candid", value: "candid" },
          { title: "Editorial", value: "editorial" },
          { title: "Detail", value: "detail" },
          { title: "Landscape", value: "landscape" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "wedding",
      title: "Wedding",
      type: "reference",
      to: [{ type: "wedding" }],
      description: "The wedding or event this photo belongs to",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "General-purpose tags for filtering and search",
    }),
    defineField({
      name: "dateTaken",
      title: "Date Taken",
      type: "date",
    }),
    defineField({
      name: "photographerCredit",
      title: "Photographer Credit",
      type: "string",
      description: "Credit for the photographer, if not the site owner",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark this photo as featured for homepage or gallery highlights",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Manual sort order within galleries (lower numbers appear first)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "venueName",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Photo",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});

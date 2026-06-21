// schemas/galleryItem.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'photo',
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          if (parent?.mediaType === 'photo' && !image) return 'Photo is required'
          return true
        }),
    }),

    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload your video, then thumbnail will generate automatically',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          if (parent?.mediaType === 'video' && !file) return 'Video file is required'
          return true
        }),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Back Steps - Bowie MD"',
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'serviceTag',
      title: 'Service',
      type: 'string',
      description: 'What service does this job show?',
      options: {
        list: [
          { title: 'House Washing', value: 'house-washing' },
          { title: 'Driveway Cleaning', value: 'driveway-cleaning' },
          { title: 'Roof Cleaning', value: 'roof-cleaning' },
          { title: 'Deck & Fence Cleaning', value: 'deck-fence-cleaning' },
          { title: 'Pressure Washing', value: 'pressure-washing' },
          { title: 'Commercial Services', value: 'commercial-services' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this to the top of the gallery',
      initialValue: false,
    }),

    defineField({
      name: 'postedDate',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Brief description for accessibility',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      caption: 'caption',
      media: 'image',
      mediaType: 'mediaType',
      date: 'postedDate',
      service: 'serviceTag',
    },
    prepare({ title, caption, media, mediaType, date, service }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      const icon = mediaType === 'video' ? '🎥' : '📷'
      const label = title || caption?.substring(0, 50) || 'Untitled'
      return {
        title: `${icon} ${label}`,
        subtitle: `${dateStr}${service ? ` · ${service}` : ''}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name: 'postedDateDesc',
      by: [{ field: 'postedDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }, { field: 'postedDate', direction: 'desc' }],
    },
  ],
})
// schemas/instagramPost.ts
import { defineField, defineType } from 'sanity'
import { FaInstagram } from 'react-icons/fa'

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Posts',
  type: 'document',
  icon: FaInstagram,
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video (from /public/videos)', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    
    // For images - upload to Sanity
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          const mediaType = parent?.mediaType
          if (mediaType === 'image' && !image) {
            return 'Image is required when media type is Image'
          }
          return true
        }),
    }),
    
    // For videos - upload a video file
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          const mediaType = parent?.mediaType
          if (mediaType === 'video' && !file) {
            return 'Video file is required when media type is Video'
          }
          return true
        }),
    }),
    
    // For videos - upload a poster image
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail shown before the video plays',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal name for organization (e.g., "Back Steps - Bowie MD")',
      placeholder: 'Back Steps - Bowie MD',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 4,
      description: 'Instagram post caption',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Post URL',
      type: 'url',
      description: 'Link to the original Instagram post',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'postedDate',
      title: 'Posted Date',
      type: 'datetime',
      description: 'Date the post was published on Instagram',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility description for the image/video',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post prominently',
      initialValue: false,
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
      videoFile: 'videoFile',
      videoPoster: 'videoPoster',
      date: 'postedDate',
    },
    prepare(selection) {
      const { title, caption, media, mediaType, videoFile, videoPoster, date } = selection
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      
      let displayTitle = ''
      if (title) {
        displayTitle = title
      } else if (mediaType === 'video') {
        displayTitle = `🎥 ${videoFile?.asset?.originalFilename ?? 'Video'}`
      } else if (caption) {
        displayTitle = caption.substring(0, 50) + (caption.length > 50 ? '...' : '')
      } else {
        displayTitle = 'Untitled Post'
      }
      
      return {
        title: displayTitle,
        subtitle: dateStr,
        // Show poster image in studio preview if available, otherwise fall back to image
        media: mediaType === 'video' ? videoPoster : media,
      }
    },
  },
  orderings: [
    {
      title: 'Posted Date, New',
      name: 'postedDateDesc',
      by: [{ field: 'postedDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
})
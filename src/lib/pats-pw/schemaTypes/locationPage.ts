// sanity/schemaTypes/locationPage.ts
import { defineType, defineField } from 'sanity'

export const locationPage = defineType({
  name: 'locationPage',
  title: 'Location Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: [
          { title: 'Maryland', value: 'MD' },
          { title: 'Washington DC', value: 'DC' },
          { title: 'Virginia', value: 'VA' },
          { title: 'Pennsylvania', value: 'PA' },
          { title: 'Delaware', value: 'DE' },
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Format: city-name-state (e.g. college-park-md)',
      validation: Rule => Rule.required()
    }),

    // HERO
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo of the city or a local landmark'
    }),

    // BLOCK 1 — NEIGHBORHOODS
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods Served',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List 6-12 neighborhoods within this city',
      validation: Rule => Rule.required().min(4).max(15)
    }),

    // BLOCK 2 — LOCAL INTRO
    defineField({
      name: 'localIntro',
      title: 'Local Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Paste adapted copy from the city website — 100-200 words. Make it specific to this city: landmarks, local issues, neighborhoods. This is the only content that changes per city.'
    }),

    // BLOCK 3 — SERVICES (hardcoded in template, this is just for overrides)
    defineField({
      name: 'servicesOffered',
      title: 'Services Offered',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Service Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Service Slug',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Brief Description',
            type: 'text',
            rows: 2
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'slug'
          }
        }
      }]
    }),

    // SEO
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Keep under 160 characters',
      validation: Rule => Rule.max(160)
    }),
  ],
  preview: {
    select: {
      city: 'city',
      state: 'state',
      slug: 'slug.current'
    },
    prepare({ city, state, slug }) {
      return {
        title: `${city}, ${state}`,
        subtitle: slug || 'Location Page'
      }
    }
  }
})
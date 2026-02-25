// sanity/schemaTypes/locationPage.ts
import {defineType, defineField} from 'sanity'

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
          {title: 'Maryland', value: 'MD'},
          {title: 'Washington DC', value: 'DC'},
          {title: 'Virginia', value: 'VA'},
          {title: 'Pennsylvania', value: 'PA'},
          {title: 'Delaware', value: 'DE'},
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
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Brief tagline for the hero section'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    
    // MAIN CONTENT
    defineField({
      name: 'mainContent',
      title: 'Main Introduction',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Opening content about serving this location'
    }),
    
    // SERVICES OFFERED
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
            description: 'Link to service page (e.g. house-washing)',
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
    
    // WHY LOCATION NEEDS CLEANING
    defineField({
      name: 'whyNeedsCleaning',
      title: 'Why This Location Needs Cleaning',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Climate, environmental factors, common issues'
    }),
    
    // NEIGHBORHOODS
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods Served',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List 6-10 neighborhoods within this city',
      validation: Rule => Rule.min(4).max(15)
    }),
    
    // LOCAL EXPERTISE
    defineField({
      name: 'localExpertise',
      title: 'Local Expertise',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Why we know this area, years of service, etc.'
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: 'Location-Specific FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ]
      }]
    }),
    
    // SEO
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'targetKeywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main keywords this page targets'
    }),

    // COMPONENT ORDER
    defineField({
      name: 'componentOrder',
      title: 'Component Order',
      type: 'array',
      of: [{
          type: 'string',
          options: {
          list: [
              {title: 'Services Grid', value: 'services'},
              {title: 'Why Properties Need Cleaning', value: 'whyClean'},
              {title: 'Neighborhoods Grid', value: 'neighborhoods'},
              {title: 'Local Expertise', value: 'expertise'},
              {title: 'Simple Process', value: 'process'},
          ]
          }
      }],
      validation: Rule => Rule.required().min(4).max(5),
      description: 'Add 4-5 components (click + to add each one). Drag to reorder. FAQ and CTA always appear at end.'
    }),
  ],
  preview: {
    select: {
      city: 'city',
      state: 'state',
      slug: 'slug.current'
    },
    prepare({city, state, slug}) {
      return {
        title: `${city}, ${state}`,
        subtitle: slug || 'Location Page'
      }
    }
  }
})
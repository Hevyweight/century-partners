// sanity/schemaTypes/serviceLocationPage.ts
import {defineType, defineField} from 'sanity'

export const serviceLocationPage = defineType({
  name: 'serviceLocationPage',
  title: 'Service + Location Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Service Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
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
        list: ['MD', 'DC', 'VA']
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Format: service-city (e.g. house-washing-college-park-md)',
      validation: Rule => Rule.required()
    }),
    
    // HERO
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image'
    }),
    
    // MAIN CONTENT
    defineField({
      name: 'mainContent',
      title: 'Main Introduction',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Why this city needs this service'
    }),
    
    // WHAT MAKES DIFFERENT
    defineField({
      name: 'whatMakesDifferent',
      title: 'What Makes Service Different in City',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // BENEFITS
    defineField({
      name: 'benefits',
      title: 'Local Benefits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'icon', type: 'string', title: 'Icon (emoji)'},
          {name: 'title', type: 'string', title: 'Benefit Title'},
          {name: 'description', type: 'text', title: 'Description'}
        ]
      }]
    }),
    
    // PROCESS
    defineField({
      name: 'process',
      title: 'Our Process',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Step Title'},
          {name: 'description', type: 'text', title: 'Step Description'}
        ]
      }]
    }),
    
    // NEIGHBORHOODS
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods Served',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List 4-6 neighborhoods in this city'
    }),
    
    // WHY CHOOSE US
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us in This City',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string'},
          {name: 'answer', type: 'text'}
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
      of: [{type: 'string'}]
    }),
  ],
  preview: {
    select: {
      service: 'service',
      city: 'city',
      state: 'state'
    },
    prepare({service, city, state}) {
      return {
        title: `${service} in ${city}, ${state}`,
        subtitle: 'Service + Location Page'
      }
    }
  }
})
// sanity/schemaTypes/page.ts
import {defineType, defineField} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          {title: 'Service', value: 'service'},
          {title: 'Location', value: 'location'},
          {title: 'Blog', value: 'blog'},
        ]
      }
    }),
    
    // ✅ ADD THIS - Service dropdown
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          {title: 'Pressure Washing (General)', value: 'pressure-washing'},
          {title: 'House Washing', value: 'house-washing'},
          {title: 'Driveway Cleaning', value: 'driveway-cleaning'},
          {title: 'Roof Cleaning', value: 'roof-cleaning'},
          {title: 'Commercial', value: 'commercial-pressure-washing'},
        ]
      },
      hidden: ({parent}) => parent?.pageType !== 'service'
    }),
    
    // ✅ ADD THIS - Target keywords
    defineField({
      name: 'targetKeywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main keywords this page targets (for reference)'
    }),
    
    // HERO SECTION
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
    
    // WHAT IS IT
    defineField({
      name: 'whatIsIt',
      title: 'What Is This Service?',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // BENEFITS
    defineField({
      name: 'benefits',
      title: 'Benefits',
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
    
    // ✅ ADD THIS - Why Choose Us
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Why customers should choose your service'
    }),
    
    // ✅ ADD THIS - Local Relevance
    defineField({
      name: 'localRelevance',
      title: 'Local Relevance',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Location-specific information (climate, regulations, etc.)'
    }),
    
    // BEFORE/AFTER
    defineField({
      name: 'beforeAfterImages',
      title: 'Before/After Gallery',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'before', type: 'image', title: 'Before Image'},
          {name: 'after', type: 'image', title: 'After Image'},
          {name: 'caption', type: 'string', title: 'Caption'}
        ]
      }]
    }),
    
    // SERVICE AREAS
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string'},
          {name: 'slug', type: 'string'}
        ]
      }]
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer'}
        ]
      }]
    }),
    
    defineField({
      name: 'componentOrder',
      title: 'Dynamic Component Order',
      type: 'array',
      of: [{type: 'string'}],
      options: {
          list: [
          {title: 'Benefits', value: 'benefits'},
          {title: 'Process', value: 'process'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Why Choose Us', value: 'why'},
          {title: 'Local Relevance', value: 'local'},
          {title: 'Service Areas', value: 'areas'}, // Can be in middle or fixed at end
          ]
      },
      initialValue: () => {
          const available = ['benefits', 'process', 'gallery', 'why', 'local', 'areas']
          const shuffled = available.sort(() => Math.random() - 0.5)
          return shuffled.slice(0, 4) // Pick random 4-5
      },
      validation: Rule => Rule.min(3).max(5),
      description: 'Middle sections (auto-randomized on creation). FAQ and CTA always appear at the end.'
      }),
  ]
})
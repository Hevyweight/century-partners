// schemas/blogPostCompleteGuide.ts
import {defineType, defineField} from 'sanity'
import { BiBook } from 'react-icons/bi'

export const blogPostCompleteGuide = defineType({
  name: 'blogPostCompleteGuide',
  title: 'Blog: Complete Guide📖',
  type: 'document',
  icon: BiBook,
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "The Complete Guide to Power Washing"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160)
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}]
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: "Pat's Power Washing"
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      initialValue: '15 min'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft',
      type: 'boolean',
      initialValue: true
    }),
    
    // KEYWORDS
    defineField({
      name: 'parentKeyword',
      title: 'Parent Keyword',
      type: 'string'
    }),
    defineField({
      name: 'childKeywords',
      title: 'Child Keywords',
      type: 'array',
      of: [{type: 'string'}]
    }),
    
    // INTRODUCTION
    defineField({
      name: 'introduction',
      title: '1. Introduction',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // WHAT YOU'LL NEED
    defineField({
      name: 'whatYoullNeed',
      title: '2. What You\'ll Need',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'itemName', type: 'string', title: 'Item Name'},
          {name: 'description', type: 'text', title: 'Description', rows: 3}
        ],
        preview: {select: {title: 'itemName'}}
      }]
    }),
    
    // THE FUNDAMENTALS
    defineField({
      name: 'fundamentals',
      title: '3. The Fundamentals',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Core concepts, terminology, principles (200 words)'
    }),
    
    // STEP BY STEP
    defineField({
      name: 'stepByStepGuide',
      title: '4. Step-by-Step Process',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          type: 'string',
          title: 'Section Title'
        },
        {
          name: 'steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'stepNumber', type: 'number', title: 'Step Number'},
              {name: 'stepTitle', type: 'string', title: 'Step Title'},
              {name: 'content', type: 'array', of: [{type: 'block'}], title: 'Content'}
            ],
            preview: {
              select: {stepNumber: 'stepNumber', title: 'stepTitle'},
              prepare({stepNumber, title}) {
                return {title: `Step ${stepNumber}: ${title}`}
              }
            }
          }]
        }
      ]
    }),
    
    // ADVANCED TECHNIQUES
    defineField({
      name: 'advancedTechniques',
      title: '5. Advanced Techniques',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Pro tips, efficiency hacks, expert approaches'
    }),
    
    // SPECIFIC SITUATIONS/SURFACES
    defineField({
      name: 'specificSituations',
      title: '6. Specific Situations/Surfaces',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'surfaceType', type: 'string', title: 'Surface/Situation Name'},
          {name: 'content', type: 'array', of: [{type: 'block'}], title: 'Guide Content'}
        ],
        preview: {select: {title: 'surfaceType'}}
      }],
      description: 'e.g., Concrete, Wood, Siding - each gets its own subsection'
    }),
    
    // COMPARISON TABLE
    defineField({
      name: 'comparisonTable',
      title: '7. Comparison Table (optional)',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Table Title'},
        {
          name: 'columns',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Column Headers'
        },
        {
          name: 'rows',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'label', type: 'string', title: 'Row Label'},
              {name: 'values', type: 'array', of: [{type: 'string'}], title: 'Values'}
            ]
          }],
          title: 'Rows'
        }
      ]
    }),
    
    // COMMON MISTAKES
    defineField({
      name: 'commonMistakes',
      title: '8. Common Mistakes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'mistake', type: 'string', title: 'Mistake'},
          {name: 'explanation', type: 'text', title: 'Why It\'s Bad', rows: 3}
        ],
        preview: {select: {title: 'mistake'}}
      }]
    }),
    
    // WHEN TO CALL PRO
    defineField({
      name: 'whenToCallPro',
      title: '9. When to Call a Pro',
      type: 'array',
      of: [{type: 'string'}]
    }),
    
    // LOCAL FACTORS
    defineField({
      name: 'localFactors',
      title: '10. Local Factors (DMV)',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // CHECKLIST
    defineField({
      name: 'checklist',
      title: '11. Master Checklist',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Checklist Title'},
        {name: 'items', type: 'array', of: [{type: 'string'}], title: 'Items'}
      ]
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: '12. FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ],
        preview: {select: {title: 'question'}}
      }],
      description: '7-10 comprehensive questions'
    }),
    
    // CONCLUSION
    defineField({
      name: 'conclusion',
      title: '13. Conclusion',
      type: 'object',
      fields: [
        {name: 'summaryPoints', type: 'array', of: [{type: 'string'}], title: 'Key Takeaways'},
        {name: 'ctaText', type: 'text', title: 'CTA Text', rows: 3},
        {name: 'ctaButtonText', type: 'string', title: 'Button Text', initialValue: 'Get Free Quote'},
        {name: 'ctaButtonLink', type: 'string', title: 'Button Link', initialValue: '/contact'}
      ]
    }),
    
    // RELATED POSTS
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: [
        {type: 'blogPostHowTo'},
        {type: 'blogPostBestTop'},
        {type: 'blogPostCompleteGuide'},
        {type: 'blogPostComparison'}
      ]}],
      validation: Rule => Rule.max(3)
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      isDraft: 'isDraft',
      media: 'featuredImage'
    },
    prepare({title, publishedAt, isDraft, media}) {
      return {
        title: isDraft ? `[DRAFT] ${title}` : title,
        subtitle: `📖 Complete Guide • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
        media
      }
    }
  }
})
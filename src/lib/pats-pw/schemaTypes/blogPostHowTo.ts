// sanity/schemaTypes/blogPostHowTo.ts
import {defineType, defineField} from 'sanity'
import { BiBulb } from 'react-icons/bi'

export const blogPostHowTo = defineType({
  name: 'blogPostHowTo',
  title: 'Blog: How-To Guide💡',
  type: 'document',
  icon: BiBulb,
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "How to Power Wash a Driveway"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary (150-160 chars)',
      validation: Rule => Rule.required().max(160)
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text'}
      ]
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
      initialValue: '8 min'
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
      type: 'string',
      description: 'e.g., "power wash driveway"'
    }),
    defineField({
      name: 'childKeywords',
      title: 'Child Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: '5-7 related keywords'
    }),
    
    // INTRODUCTION
    defineField({
      name: 'introduction',
      title: '1. Introduction',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Opening paragraphs (150 words)'
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
        preview: {
          select: {
            title: 'itemName'
          }
        }
      }]
    }),
    
    // STEP BY STEP
    defineField({
      name: 'stepByStepGuide',
      title: '3. Step-by-Step Guide',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          type: 'string',
          title: 'Section Title',
          initialValue: 'How to Power Wash'
        },
        {
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [{
            type: 'object',
            fields: [
              {name: 'stepNumber', type: 'number', title: 'Step Number'},
              {name: 'stepTitle', type: 'string', title: 'Step Title'},
              {name: 'content', type: 'array', of: [{type: 'block'}], title: 'Content'}
            ],
            preview: {
              select: {
                stepNumber: 'stepNumber',
                title: 'stepTitle'
              },
              prepare({stepNumber, title}) {
                return {
                  title: `Step ${stepNumber}: ${title}`
                }
              }
            }
          }]
        }
      ]
    }),
    
    // COMMON MISTAKES
    defineField({
      name: 'commonMistakes',
      title: '4. Common Mistakes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'mistake', type: 'string', title: 'Mistake'},
          {name: 'explanation', type: 'text', title: 'Why It\'s Bad', rows: 3}
        ],
        preview: {
          select: {title: 'mistake'}
        }
      }]
    }),
    
    // WHEN TO CALL PRO
    defineField({
      name: 'whenToCallPro',
      title: '5. When to Call a Pro',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'situation', type: 'string', title: 'Situation'},
          {name: 'reason', type: 'text', title: 'Why', rows: 3}
        ],
        preview: {
          select: {title: 'situation'}
        }
      }]
    }),
    
    // LOCAL FACTORS
    defineField({
      name: 'localFactors',
      title: '6. Local Factors (DMV)',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // CHECKLIST
    defineField({
      name: 'checklist',
      title: '7. Checklist',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Checklist Title'},
        {name: 'items', type: 'array', of: [{type: 'string'}], title: 'Items'}
      ]
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: '8. FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ],
        preview: {
          select: {title: 'question'}
        }
      }],
      description: '6-7 questions'
    }),
    
    // CONCLUSION
    defineField({
      name: 'conclusion',
      title: '9. Conclusion',
      type: 'object',
      fields: [
        {
          name: 'summaryPoints',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Key Takeaways'
        },
        {
          name: 'ctaText',
          type: 'text',
          title: 'CTA Text',
          rows: 3
        },
        {
          name: 'ctaButtonText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Get Free Quote'
        },
        {
          name: 'ctaButtonLink',
          type: 'string',
          title: 'Button Link',
          initialValue: '/contact'
        }
      ]
    }),
    
    // RELATED POSTS
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {type: 'reference', to: [
          {type: 'blogPostHowTo'},
          {type: 'blogPostBestTop'},
          {type: 'blogPostCompleteGuide'},
          {type: 'blogPostComparison'}
        ]}
      ],
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
        subtitle: `💡 How-To • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
        media
      }
    }
  }
})

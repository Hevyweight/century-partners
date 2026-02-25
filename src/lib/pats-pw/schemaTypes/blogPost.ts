// sanity/schemaTypes/blogPost.ts
import {defineType, defineField} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    // POST TYPE SELECTOR
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          {title: '💡 How-To Guide', value: 'how-to'},
          {title: '⭐ Best & Top Lists', value: 'best-top'},
          {title: '📖 Complete Guide', value: 'complete-guide'},
          {title: '⚖️ Comparison', value: 'comparison'}
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    
    // BASIC INFO (ALL POST TYPES)
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "How to Power Wash: A Complete Guide"',
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
      title: 'Excerpt / Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for SEO and preview cards (150-160 chars)',
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
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: "Pat's Power Washing"
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "8 min"',
      initialValue: '5 min'
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
      initialValue: true,
      description: 'Keep as draft until ready to publish'
    }),
    
    // KEYWORD RESEARCH (ALL POST TYPES)
    defineField({
      name: 'parentKeyword',
      title: 'Parent Keyword',
      type: 'string',
      description: 'Main keyword (e.g., "power wash")'
    }),
    defineField({
      name: 'childKeywords',
      title: 'Child Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: '5-7 related keywords'
    }),
    
    // INTRODUCTION (ALL POST TYPES)
    defineField({
      name: 'introduction',
      title: '1. Introduction',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Opening paragraphs that hook the reader'
    }),
    
    // WHAT YOU'LL NEED (HOW-TO & COMPLETE GUIDE ONLY)
    defineField({
      name: 'whatYoullNeed',
      title: '2. What You\'ll Need Before You Start',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'itemName', type: 'string', title: 'Item Name'},
            {name: 'description', type: 'text', title: 'Description', rows: 4}
          ],
          preview: {
            select: {
              title: 'itemName',
              subtitle: 'description'
            }
          }
        }
      ],
      description: 'List of equipment/materials needed',
      hidden: ({parent}) => !['how-to', 'complete-guide'].includes(parent?.postType)
    }),
    
    // STEP BY STEP GUIDE (HOW-TO & COMPLETE GUIDE ONLY)
    defineField({
      name: 'stepByStepGuide',
      title: '3. Step-by-Step Guide',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          type: 'string',
          title: 'Section Title',
          initialValue: 'How to Power Wash a Home Safely'
        },
        {
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [
            {
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
            }
          ]
        }
      ],
      hidden: ({parent}) => !['how-to', 'complete-guide'].includes(parent?.postType)
    }),
    
    // PRODUCTS/ITEMS LIST (BEST & TOP LISTS ONLY)
    defineField({
      name: 'topItems',
      title: 'Top Items/Products List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'rank', type: 'number', title: 'Rank (1-10)'},
            {name: 'itemName', type: 'string', title: 'Item/Product Name'},
            {name: 'image', type: 'image', title: 'Product Image'},
            {name: 'rating', type: 'number', title: 'Rating (1-5)', validation: (Rule) => Rule.min(1).max(5)},
            {name: 'price', type: 'string', title: 'Price (optional)'},
            {name: 'pros', type: 'array', of: [{type: 'string'}], title: 'Pros'},
            {name: 'cons', type: 'array', of: [{type: 'string'}], title: 'Cons'},
            {name: 'description', type: 'text', title: 'Description', rows: 4},
            {name: 'affiliateLink', type: 'url', title: 'Affiliate/Buy Link (optional)'}
          ],
          preview: {
            select: {
              rank: 'rank',
              title: 'itemName',
              media: 'image'
            },
            prepare({rank, title, media}) {
              return {
                title: `#${rank} - ${title}`,
                media
              }
            }
          }
        }
      ],
      hidden: ({parent}) => parent?.postType !== 'best-top'
    }),
    
    // COMPARISON TABLE (COMPARISON & COMPLETE GUIDE)
    defineField({
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Table Title'},
        {
          name: 'columns',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Column Headers',
          description: 'e.g. ["Pressure Washing", "Soft Washing"]'
        },
        {
          name: 'rows',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'label', type: 'string', title: 'Row Label'},
              {
                name: 'values',
                type: 'array',
                of: [{type: 'string'}],
                title: 'Values (use "✓" or "✗" for checkmarks)',
                description: 'One value per column'
              }
            ]
          }],
          title: 'Table Rows'
        }
      ],
      hidden: ({parent}) => !['comparison', 'complete-guide'].includes(parent?.postType)
    }),
    
    // COMPARISON SECTIONS (COMPARISON ONLY)
    defineField({
      name: 'comparisonSections',
      title: 'Detailed Comparison Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'optionName', type: 'string', title: 'Option Name (e.g., "Pressure Washing")'},
            {name: 'pros', type: 'array', of: [{type: 'string'}], title: 'Pros'},
            {name: 'cons', type: 'array', of: [{type: 'string'}], title: 'Cons'},
            {name: 'bestFor', type: 'text', title: 'Best For', rows: 2},
            {name: 'content', type: 'array', of: [{type: 'block'}], title: 'Additional Content'}
          ],
          preview: {
            select: {
              title: 'optionName'
            }
          }
        }
      ],
      hidden: ({parent}) => parent?.postType !== 'comparison'
    }),
    
    // SPECIFIC SURFACE GUIDE (COMPLETE GUIDE ONLY)
    defineField({
      name: 'specificSurfaceGuide',
      title: 'Specific Surface Guide',
      type: 'object',
      fields: [
        {
          name: 'surfaceType',
          type: 'string',
          title: 'Surface Type',
          description: 'e.g., "Concrete", "Wood Deck", "Vinyl Siding"'
        },
        {
          name: 'content',
          type: 'array',
          of: [{type: 'block'}],
          title: 'Guide Content'
        }
      ],
      hidden: ({parent}) => parent?.postType !== 'complete-guide'
    }),
    
    // COMMON MISTAKES (HOW-TO & COMPLETE GUIDE)
    defineField({
      name: 'commonMistakes',
      title: 'Common Mistakes to Avoid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'mistake', type: 'string', title: 'Mistake'},
            {name: 'explanation', type: 'text', title: 'Why It\'s a Problem', rows: 3}
          ],
          preview: {
            select: {
              title: 'mistake'
            }
          }
        }
      ],
      hidden: ({parent}) => !['how-to', 'complete-guide'].includes(parent?.postType)
    }),
    
    // WHEN TO CALL A PRO (HOW-TO & COMPLETE GUIDE)
    defineField({
      name: 'whenToCallPro',
      title: 'When You Should Call a Professional',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'situation', type: 'string', title: 'Situation'},
            {name: 'reason', type: 'text', title: 'Why', rows: 3}
          ],
          preview: {
            select: {
              title: 'situation'
            }
          }
        }
      ],
      hidden: ({parent}) => !['how-to', 'complete-guide'].includes(parent?.postType)
    }),
    
    // BUYING GUIDE (BEST & TOP LISTS ONLY)
    defineField({
      name: 'buyingGuide',
      title: 'Buying Guide Section',
      type: 'array',
      of: [{type: 'block'}],
      description: 'What to look for when buying',
      hidden: ({parent}) => parent?.postType !== 'best-top'
    }),
    
    // LOCAL FACTORS (ALL POST TYPES)
    defineField({
      name: 'localFactors',
      title: 'Local Factors (DMV-specific)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Maryland, DC, Virginia specific considerations'
    }),
    
    // INTERACTIVE CHECKLIST (HOW-TO & COMPLETE GUIDE)
    defineField({
      name: 'checklist',
      title: 'Interactive Checklist',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Checklist Title'},
        {name: 'items', type: 'array', of: [{type: 'string'}], title: 'Checklist Items'}
      ],
      hidden: ({parent}) => !['how-to', 'complete-guide'].includes(parent?.postType)
    }),
    
    // FAQ SECTION (ALL POST TYPES)
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ],
        preview: {
          select: {
            title: 'question'
          }
        }
      }],
      description: '6-7 FAQs'
    }),
    
    // CONCLUSION & CTA (ALL POST TYPES)
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'object',
      fields: [
        {
          name: 'summaryPoints',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Key Takeaway Points',
          description: 'Bullet points summarizing the post'
        },
        {
          name: 'ctaText',
          type: 'text',
          title: 'Call to Action Text',
          rows: 3
        },
        {
          name: 'ctaButtonText',
          type: 'string',
          title: 'CTA Button Text',
          initialValue: 'Get Free Quote'
        },
        {
          name: 'ctaButtonLink',
          type: 'string',
          title: 'CTA Button Link',
          initialValue: '/contact'
        }
      ]
    }),
    
    // RELATED POSTS (ALL POST TYPES)
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogPost'}]}],
      validation: Rule => Rule.max(3)
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      postType: 'postType',
      publishedAt: 'publishedAt',
      isDraft: 'isDraft',
      media: 'featuredImage'
    },
    prepare({title, postType, publishedAt, isDraft, media}) {
      const typeIcons: Record<string, string> = {
        'how-to': '💡',
        'best-top': '⭐',
        'complete-guide': '📖',
        'comparison': '⚖️'
      }
      
      return {
        title: isDraft ? `[DRAFT] ${title}` : title,
        subtitle: `${typeIcons[postType] || ''} ${publishedAt 
          ? new Date(publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          : 'No publish date'}`,
        media
      }
    }
  },
  
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    }
  ]
})
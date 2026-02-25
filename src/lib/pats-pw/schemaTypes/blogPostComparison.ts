// schemas/blogPostComparison.ts
import {defineType, defineField} from 'sanity'
import { BiGitCompare } from 'react-icons/bi'

export const blogPostComparison = defineType({
  name: 'blogPostComparison',
  title: 'Blog: Comparison⚖️',
  type: 'document',
  icon: BiGitCompare,
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "Pressure Washing vs Soft Washing"',
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
      initialValue: '7 min'
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
      of: [{type: 'block'}],
      description: 'What\'s being compared and why people struggle to choose'
    }),
    
    // QUICK OVERVIEW
    defineField({
      name: 'quickOverview',
      title: '2. Quick Comparison Overview',
      type: 'array',
      of: [{type: 'block'}],
      description: 'High-level summary of main differences (100 words)'
    }),
    
    // COMPARISON TABLE
    defineField({
      name: 'comparisonTable',
      title: '3. Detailed Comparison Table',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Table Title'},
        {
          name: 'columns',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Column Headers',
          description: 'e.g., ["Pressure Washing", "Soft Washing"]'
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
                title: 'Values (use "✓" or "✗")'
              }
            ]
          }],
          title: 'Rows'
        }
      ]
    }),
    
    // OPTION A IN-DEPTH
    defineField({
      name: 'optionA',
      title: '4. Option A: In-Depth',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Option Name'},
        {name: 'description', type: 'array', of: [{type: 'block'}], title: 'What It Is & How It Works'},
        {name: 'pros', type: 'array', of: [{type: 'string'}], title: 'Pros'},
        {name: 'cons', type: 'array', of: [{type: 'string'}], title: 'Cons'},
        {name: 'bestFor', type: 'text', title: 'Best For', rows: 2},
        {name: 'realWorldExample', type: 'text', title: 'Real-World Example', rows: 3}
      ]
    }),
    
    // OPTION B IN-DEPTH
    defineField({
      name: 'optionB',
      title: '5. Option B: In-Depth',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Option Name'},
        {name: 'description', type: 'array', of: [{type: 'block'}], title: 'What It Is & How It Works'},
        {name: 'pros', type: 'array', of: [{type: 'string'}], title: 'Pros'},
        {name: 'cons', type: 'array', of: [{type: 'string'}], title: 'Cons'},
        {name: 'bestFor', type: 'text', title: 'Best For', rows: 2},
        {name: 'realWorldExample', type: 'text', title: 'Real-World Example', rows: 3}
      ]
    }),
    
    // KEY DIFFERENCES EXPLAINED
    defineField({
      name: 'keyDifferences',
      title: '6. Key Differences Explained',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'differenceTitle', type: 'string', title: 'Difference Title'},
          {name: 'explanation', type: 'array', of: [{type: 'block'}], title: 'Detailed Explanation'}
        ],
        preview: {select: {title: 'differenceTitle'}}
      }],
      description: 'e.g., Cost Comparison, Performance, Maintenance'
    }),
    
    // DECISION FRAMEWORK
    defineField({
      name: 'decisionFramework',
      title: '7. Which Should You Choose?',
      type: 'object',
      fields: [
        {
          name: 'chooseOptionA',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Choose Option A If...'
        },
        {
          name: 'chooseOptionB',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Choose Option B If...'
        },
        {
          name: 'considerBoth',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Consider Both When...'
        }
      ]
    }),
    
    // LOCAL FACTORS
    defineField({
      name: 'localFactors',
      title: '8. Local Factors (DMV)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'How climate/conditions affect the choice'
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: '9. FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ],
        preview: {select: {title: 'question'}}
      }],
      description: 'Questions about choosing between options'
    }),
    
    // CONCLUSION
    defineField({
      name: 'conclusion',
      title: '10. Conclusion',
      type: 'object',
      fields: [
        {name: 'summaryPoints', type: 'array', of: [{type: 'string'}], title: 'Key Takeaways'},
        {name: 'recommendation', type: 'text', title: 'Final Recommendation', rows: 3},
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
        subtitle: `⚖️ Comparison • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
        media
      }
    }
  }
})
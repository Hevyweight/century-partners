// schemas/blogPostBestTop.ts
import {defineType, defineField} from 'sanity'
import { BiStar } from 'react-icons/bi'

export const blogPostBestTop = defineType({
  name: 'blogPostBestTop',
  title: 'Blog: Best & Top Lists⭐',
  type: 'document',
  icon: BiStar,
  fields: [
    // BASIC INFO (same as How-To)
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "Best Power Washers for Homeowners in 2024"',
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
      initialValue: '10 min'
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
    
    // WHAT MAKES A GREAT...
    defineField({
      name: 'criteriaSection',
      title: '2. What Makes a Great [Item]',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Key qualities/features to look for'
    }),
    
    // TOP ITEMS LIST
    defineField({
      name: 'topItems',
      title: '3. Top Items List',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'rank', type: 'number', title: 'Rank (#1-10)'},
          {name: 'itemName', type: 'string', title: 'Item Name'},
          {name: 'image', type: 'image', title: 'Product Image'},
          {name: 'rating', type: 'number', title: 'Rating (1-5)', validation: Rule => Rule.min(1).max(5)},
          {name: 'price', type: 'string', title: 'Price Range'},
          {name: 'bestFor', type: 'string', title: 'Best For'},
          {name: 'overview', type: 'text', title: 'Overview', rows: 3},
          {name: 'pros', type: 'array', of: [{type: 'string'}], title: 'Pros'},
          {name: 'cons', type: 'array', of: [{type: 'string'}], title: 'Cons'},
          {name: 'whyRecommend', type: 'text', title: 'Why We Recommend', rows: 2},
          {name: 'affiliateLink', type: 'url', title: 'Buy Link (optional)'}
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
      }]
    }),
    
    // BUYING GUIDE
    defineField({
      name: 'buyingGuide',
      title: '4. Buying Guide',
      type: 'array',
      of: [{type: 'block'}],
      description: 'What to look for when choosing'
    }),
    
    // LOCAL FACTORS
    defineField({
      name: 'localFactors',
      title: '5. Local Factors (DMV)',
      type: 'array',
      of: [{type: 'block'}]
    }),
    
    // FAQ
    defineField({
      name: 'faq',
      title: '6. FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ],
        preview: {select: {title: 'question'}}
      }]
    }),
    
    // CONCLUSION
    defineField({
      name: 'conclusion',
      title: '7. Conclusion',
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
        subtitle: `⭐ Best/Top • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
        media
      }
    }
  }
})
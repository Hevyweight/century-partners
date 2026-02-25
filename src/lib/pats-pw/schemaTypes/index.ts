// sanity/schemaTypes/index.ts
import { page } from './page'
import { locationPage } from './locationPage'
import { serviceLocationPage } from './serviceLocationPage'
import { blogPost } from './blogPost'
import instagramPost from './instagramPost'
import { blogPostHowTo } from './blogPostHowTo'
import { blogPostCompleteGuide } from './blogPostCompleteGuide'
import { blogPostBestTop } from './blogPostBestTop'
import { blogPostComparison } from './blogPostComparison'

export const schemaTypes = [
  page,                // Keep existing for backward compatibility
  locationPage,        // City/location pages
  serviceLocationPage, // Service in specific city
  blogPost,            // Blog posts
  blogPostHowTo,
  blogPostCompleteGuide,
  blogPostBestTop,
  blogPostComparison,
  instagramPost,     // Instagram posts
]

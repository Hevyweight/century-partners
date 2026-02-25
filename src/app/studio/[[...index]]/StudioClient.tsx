'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/lib/pats-pw/schemaTypes'
import { structure } from '@/lib/pats-pw/structure'

export default function StudioClient({ projectId, dataset }: { projectId: string; dataset: string }) {
  const config = defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    schema: {
      types: schemaTypes,
    },
    plugins: [
      structureTool({ structure }),
      visionTool({ defaultApiVersion: '2024-01-01' }),
    ],
  })

  return <NextStudio config={config} />
}
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export function buildStudioConfig({ projectId, dataset }: { projectId: string; dataset: string }) {
  return defineConfig({
    projectId,
    dataset,
    plugins: [structureTool()],
  })
}
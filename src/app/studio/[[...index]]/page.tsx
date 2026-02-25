import { headers } from 'next/headers'
import { clients } from '@/lib/clients'
import StudioClient from './StudioClient'

export default async function StudioPage() {
  const headersList = await headers()
  const clientId = headersList.get('x-client-id') ?? 'patspowerwashing'
  const client = clients[clientId]

  if (!client) {
    return <div>Client not found</div>
  }

  return <StudioClient projectId={client.projectId} dataset={client.dataset} />
}
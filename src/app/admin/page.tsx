'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { clients } from '@/lib/clients'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/')
        return
      }

      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
    </main>
  )

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-neutral-400 text-sm mb-8">Select a client to access their studio</p>

        <div className="flex flex-col gap-3">
          {Object.entries(clients).map(([id, client]) => (
            <a
              key={id}
              href={`https://${id}.century.partners/studio`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <span className="text-white font-medium">{client.name}</span>
              <span className="text-neutral-400 text-sm">{id}.century.partners</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/studio')
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      {/* Back arrow */}
      <a
        href="https://scorecentury.com"
        className="absolute top-6 left-6 text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </a>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2">Century Partners</h1>
        <p className="text-neutral-400 text-sm mb-8">Sign in to access your dashboard</p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder:text-neutral-500 border border-neutral-700 focus:outline-none focus:border-neutral-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder:text-neutral-500 border border-neutral-700 focus:outline-none focus:border-neutral-500"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-neutral-950 font-semibold hover:bg-neutral-100 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </div>
    </main>
  )
}
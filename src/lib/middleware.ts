import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clients } from '@/lib/clients'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const subdomain = host.split('.')[0]

  // Local dev fallback
  const clientId = subdomain !== 'localhost'
    ? subdomain
    : request.nextUrl.searchParams.get('client') ?? null

  // If we have a valid client subdomain, inject it as a header
  if (clientId && clients[clientId]) {
    const response = NextResponse.next()
    response.headers.set('x-client-id', clientId)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/account', '/checkout']
const ADMIN_ROUTES = ['/admin']
const AUTH_ROUTES = ['/login', '/register', '/forgot-password']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r)) && session) {
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // Protect account/checkout routes
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) && !session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    const role = (session?.user as any)?.role
    if (!session || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api/webhooks).*)',
  ],
}

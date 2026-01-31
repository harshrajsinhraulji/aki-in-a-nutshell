import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Public admin routes (login)
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Check for session cookie
        const hasSession = request.cookies.has('aki-admin-session')

        if (!hasSession) {
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}

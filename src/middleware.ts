import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_URL } from './config/url.config'
import { EnumToken } from './services/auth/auth-token.service'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumToken.REFRESH_TOKEN)?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
		}
		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/users/:path*', '/auth', '/profile/:path*']
}

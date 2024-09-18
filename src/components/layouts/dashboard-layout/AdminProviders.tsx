'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import { isAdminRolle } from '@/hooks/useCheckAdminRole'

import { getAccessToken } from '@/services/auth/auth-token.service'

const allowedRoles = ['ADMIN']
export function AdminProviders({ children }: PropsWithChildren<unknown>) {
	const accessToken = getAccessToken()
	const router = useRouter()
	const isAdmin = isAdminRolle({ accessToken, allowedRoles })

	useEffect(() => {
		if (accessToken && !isAdmin) {
			router.replace(PUBLIC_URL.home())
		}
	}, [accessToken, isAdmin])

	return <>{isAdmin && <>{children}</>}</>
}

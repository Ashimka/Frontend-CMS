'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import { adminRolle } from '@/hooks/useCheckAdminRole'

import { getAccessToken } from '@/services/auth/auth-token.serice'

const allowedRoles = ['ADMIN']
export function AdminProviders({ children }: PropsWithChildren<unknown>) {
	const accessToken = getAccessToken()
	const router = useRouter()
	const isAdmin = adminRolle({ accessToken, allowedRoles })

	useEffect(() => {
		if (accessToken && !isAdmin) {
			router.replace(PUBLIC_URL.home())
		}
	}, [accessToken, isAdmin])

	return <>{isAdmin && <>{children}</>}</>
}

import { jwtDecode } from 'jwt-decode'

import { IJwtPayload } from '@/shared/types/jwt.interface'

type Props = {
	accessToken: string | null | undefined
	Role: string
}

export const isAdminRolle = ({ accessToken, Role }: Props) => {
	const decoded: IJwtPayload | undefined = accessToken
		? jwtDecode(accessToken)
		: undefined

	const roles: string | undefined = decoded?.role || undefined

	return roles && Role.includes(roles)
}

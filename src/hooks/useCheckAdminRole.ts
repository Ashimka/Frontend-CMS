import { jwtDecode } from 'jwt-decode'

import { IJwtPayload } from '@/shared/types/jwt.interface'

type Props = {
	accessToken: string | null
	allowedRoles: string[]
}

export const adminRolle = ({ accessToken, allowedRoles }: Props) => {
	const decoded: IJwtPayload | undefined = accessToken
		? jwtDecode(accessToken)
		: undefined

	const roles: string | undefined = decoded?.role || undefined

	return roles && allowedRoles.includes(roles)
}

import Cookies from 'js-cookie'

export enum EnumToken {
	'ACCESS_TOKEN' = 'AccessToken',
	'REFRESH_TOKEN' = 'RefreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumToken.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumToken.ACCESS_TOKEN, accessToken, {
		domain: process.env.APP_DOMAIN,
		sameSite: 'strict',
		expires: 1,
		secure: true
	})
}

export const removeTokenFromStorage = () => {
	Cookies.remove(EnumToken.ACCESS_TOKEN)
}

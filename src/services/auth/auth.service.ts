import { axiosClassic } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface'

import { removeTokenFromStorage, saveTokenStorage } from './auth-token.serice'

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`${type}`),
			method: 'POST',
			data
		})

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}
	async getNewTokens() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('refresh'),
			method: 'POST'
		})

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}

	async logout() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('logout'),
			method: 'POST'
		})

		if (response.data) {
			removeTokenFromStorage()
		}

		return response
	}
}

export const authService = new AuthService()

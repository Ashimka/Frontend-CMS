import axios, { CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '@/config/api.config'

import {
	getAccessToken,
	removeTokenFromStorage
} from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { errorCatch, getContentType } from './api.hepler'

const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: getContentType(),
	withCredentials: true,
	timeout: 10000
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosClassic.interceptors.response.use(
	config => config,
	error => {
		if (!error.response) {
			if (error.code === 'ECONNABORTED') {
				error.message = 'Превышено время ожидания запроса'
			} else if (error.code === 'NETWORK_ERROR') {
				error.message = 'Ошибка сети. Проверьте подключение к интернету'
			} else {
				error.message = 'Сервер недоступен. Попробуйте позже'
			}
		}

		if (error.response?.status >= 500) {
			error.message = 'Внутренняя ошибка сервера'
		} else if (error.response?.status === 404) {
			error.message = 'Ресурс не найден'
		} else if (error.response?.status === 403) {
			error.message = 'Доступ запрещен'
		}

		throw error
	}
)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (!error.response) {
			if (error.code === 'ECONNABORTED') {
				error.message = 'Превышено время ожидания запроса'
			} else if (error.code === 'NETWORK_ERROR') {
				error.message = 'Ошибка сети. Проверьте подключение к интернету'
			} else {
				error.message = 'Сервер недоступен. Попробуйте позже'
			}
			throw error
		}

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeTokenFromStorage()
				}
			}
		}

		if (error.response?.status >= 500) {
			error.message = 'Внутренняя ошибка сервера'
		} else if (error.response?.status === 404) {
			error.message = 'Ресурс не найден'
		} else if (error.response?.status === 403) {
			error.message = 'Доступ запрещен'
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }

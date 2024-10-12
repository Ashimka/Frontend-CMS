import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IEditUser, IProfileUser, IUser } from '@/shared/types/user.interface'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
		})

		return data
	}

	async getAllUsers() {
		const { data } = await axiosWithAuth<IUser[]>({
			url: API_URL.dashboard('/settings/users'),
			method: 'GET'
		})

		return data
	}

	async getOneUser(userId: string) {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.dashboard(`/settings/users/${userId}`),
			method: 'GET'
		})
		return data
	}

	async updateRoleUser(userId: string, userData: IEditUser) {
		const { data } = await axiosWithAuth<IEditUser>({
			url: API_URL.dashboard(`/settings/users/${userId}`),
			method: 'PATCH',
			data: userData
		})
		return data
	}

	async toggleFavorite(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/favorites/${productId}`),
			method: 'PATCH'
		})
	}

	async createProfile(data: IProfileUser) {
		const { data: createProfile } = await axiosWithAuth<IProfileUser>({
			url: API_URL.users('/profile'),
			method: 'POST',
			data
		})

		return createProfile
	}

	async updateProfileUser(data: IProfileUser) {
		const { data: updateProfile } = await axiosWithAuth<IProfileUser>({
			url: API_URL.users('/profile'),
			method: 'PATCH',
			data
		})
		return updateProfile
	}
}

export const userService = new UserService()

import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IProfileUser, IUser } from '@/shared/types/user.interface'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
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
}

export const userService = new UserService()

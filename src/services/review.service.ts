import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IReview, IReviewInput } from '@/shared/types/review.interface'

class ReviewService {
	async create(data: IReviewInput, productId: string) {
		const { data: createdReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/${productId}`),
			method: 'POST',
			data
		})

		return createdReview
	}

	async getAll() {
		const { data } = await axiosWithAuth<IReview[]>({
			url: API_URL.reviews(`/`),
			method: 'GET'
		})

		return data
	}

	async delete(id: string) {
		const { data: deletedReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/${id}`),
			method: 'DELETE'
		})

		return deletedReview
	}
}

export const reviewService = new ReviewService()

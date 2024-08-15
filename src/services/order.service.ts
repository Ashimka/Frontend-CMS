import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { EnumOrderStatus, IOrder } from '@/shared/types/order.interface'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
	}[]
}

class OrderService {
	async create(data: TypeData) {
		return axiosWithAuth<IOrder>({
			url: API_URL.orders(),
			method: 'POST',
			data
		})
	}
}

export const orderService = new OrderService()

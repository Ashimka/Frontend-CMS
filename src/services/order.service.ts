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

interface IOrderDetails {
	id: string
	price: number
	quantity: number
	title: string
}

class OrderService {
	async create(data: TypeData) {
		return axiosWithAuth<IOrder>({
			url: API_URL.orders(),
			method: 'POST',
			data
		})
	}
	async orderDetails(orderId: string): Promise<IOrderDetails[]> {
		const { data } = await axiosWithAuth<IOrderDetails[]>({
			url: API_URL.orders(`/${orderId}`)
		})
		return data
	}
}

export const orderService = new OrderService()

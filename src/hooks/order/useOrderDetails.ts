import { useQuery } from '@tanstack/react-query'

import { orderService } from '@/services/order.service'

export const useOrderDetails = (id: string) => {
	const { data: orderDetails, isLoading } = useQuery({
		queryKey: ['get order details', id],
		queryFn: () => orderService.orderDetails(id)
	})

	return { orderDetails, isLoading }
}

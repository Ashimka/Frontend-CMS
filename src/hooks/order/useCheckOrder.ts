import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { PROFILE_URL } from '@/config/url.config'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { orderService } from '@/services/order.service'

export const useCheckOrder = () => {
	const { items } = useCart()

	const { reset } = useActions()

	const router = useRouter()

	const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create order'],
		mutationFn: () =>
			orderService.create({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		onSuccess() {
			router.push(PROFILE_URL.thanks())
			reset()
		},
		onError() {
			toast.error('Ошибка при создании заказа')
		}
	})

	return useMemo(
		() => ({
			createOrder,
			isLoadingCreate
		}),
		[createOrder, isLoadingCreate]
	)
}

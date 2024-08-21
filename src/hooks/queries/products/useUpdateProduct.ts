import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { DASHBOARD_URL } from '@/config/url.config'

import { productService } from '@/services/product.service'

import { IProductInput } from '@/shared/types/product.interface'

export const useUpdateProduct = () => {
	const router = useRouter()

	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IProductInput) =>
			productService.update(params.productId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Товар обновлён')
			router.push(DASHBOARD_URL.products())
		},
		onError() {
			toast.error('Ошибка при обновлении товара')
		}
	})

	return useMemo(
		() => ({ updateProduct, isLoadingUpdate }),
		[updateProduct, isLoadingUpdate]
	)
}

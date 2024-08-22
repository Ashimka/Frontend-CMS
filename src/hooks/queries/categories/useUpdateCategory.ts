import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { DASHBOARD_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export const useUpdateCategory = () => {
	const router = useRouter()

	const params = useParams<{ categoryId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.update(params.categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория обновлёна')
			router.push(DASHBOARD_URL.categories())
		},
		onError() {
			toast.error('Ошибка при обновлении категории')
		}
	})

	return useMemo(
		() => ({ updateCategory, isLoadingUpdate }),
		[updateCategory, isLoadingUpdate]
	)
}

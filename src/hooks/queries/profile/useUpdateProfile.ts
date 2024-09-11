import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'

import { IProfileUser } from '@/shared/types/user.interface'

export const useUpdateProfile = () => {
	const queryClient = useQueryClient()

	const { mutate: updateProfile, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IProfileUser) => userService.updateProfileUser(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Данные изменены')
		},
		onError() {
			toast.error('Ошибка при изменении')
		}
	})

	return useMemo(
		() => ({
			updateProfile,
			isLoadingUpdate
		}),
		[updateProfile, isLoadingUpdate]
	)
}

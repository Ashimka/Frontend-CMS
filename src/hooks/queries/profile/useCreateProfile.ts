import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'

import { IProfileUser } from '@/shared/types/user.interface'

export const useCreateProfile = () => {
	const queryClient = useQueryClient()

	const { mutate: createPofile, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create profile'],
		mutationFn: (data: IProfileUser) => userService.createProfile(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Данные добавлены')
		},
		onError() {
			toast.error('Неудалось добавить данные')
		}
	})

	return useMemo(
		() => ({
			createPofile,
			isLoadingCreate
		}),
		[createPofile, isLoadingCreate]
	)
}

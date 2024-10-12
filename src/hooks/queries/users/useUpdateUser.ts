import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { DASHBOARD_URL } from '@/config/url.config'

import { userService } from '@/services/user.service'

import { IEditUser} from '@/shared/types/user.interface'

export const useUpdateUser = () => {
	const router = useRouter()
	const params = useParams<{ userId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateRoleUser, isPending: isLoadingUpdateRole } =
		useMutation({
			mutationKey: ['update role user'],
			mutationFn: (data: IEditUser) =>
				userService.updateRoleUser(params.userId, data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['get all users for dashboard']
				})
				toast.success('Права пользователя обновлены!')
				router.push(DASHBOARD_URL.settingsUsers())
			},
			onError() {
				toast.error('Ошибка при обновлении пользователя')
			}
		})

	return useMemo(
		() => ({ updateRoleUser, isLoadingUpdateRole }),
		[updateRoleUser, isLoadingUpdateRole]
	)
}

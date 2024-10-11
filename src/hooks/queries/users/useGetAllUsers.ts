import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { userService } from '@/services/user.service'

export const useGetAllUsers = () => {
	const { data: getAllUsers, isLoading } = useQuery({
		queryKey: ['get all users for dashboard'],
		queryFn: () => userService.getAllUsers()
	})

	return useMemo(
		() => ({
			getAllUsers,
			isLoading
		}),
		[getAllUsers, isLoading]
	)
}

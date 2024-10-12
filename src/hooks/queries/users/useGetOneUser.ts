import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { userService } from '@/services/user.service'

export const useGetOneUser = () => {
	const params = useParams<{ userId: string }>()

	const { data: oneUser, isLoading } = useQuery({
		queryKey: ['get one user'],
		queryFn: () => userService.getOneUser(params.userId)
	})

	return { oneUser, isLoading }
}

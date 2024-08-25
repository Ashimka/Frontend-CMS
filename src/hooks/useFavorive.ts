import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useFavorite(productId: string) {
	const { data } = useQuery({
		queryKey: ['favorite'],
		queryFn: () => userService.toggleFavorite(productId)
	})

	return data
}

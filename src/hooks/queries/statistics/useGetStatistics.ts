import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { statisticsService } from '@/services/statistics.service'

export const useGetStatistics = () => {
	const { data: main } = useQuery({
		queryKey: ['get main statistics'],
		queryFn: () => statisticsService.getMain()
	})

	const { data: middle } = useQuery({
		queryKey: ['get middle statistics'],
		queryFn: () => statisticsService.getMiddle()
	})

	return useMemo(() => ({ main, middle }), [main, middle])
}

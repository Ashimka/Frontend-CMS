import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Управление магазином',
	...NO_INDEX_PAGE
}

export default function StorePage() {
	return <div>Dashboard</div>
}

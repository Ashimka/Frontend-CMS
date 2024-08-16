import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Dashboard } from './Dashboard'

export const metadata: Metadata = {
	title: 'Панель управления',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <Dashboard />
}

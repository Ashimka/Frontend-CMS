import { Metadata } from 'next'
import React from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Settings from './Settings'

export const metadata: Metadata = {
	title: 'Настройки профиля',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<>
			<Settings />
		</>
	)
}

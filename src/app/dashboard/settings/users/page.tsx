import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Users from './Users'

export const metadata: Metadata = {
	title: 'Настройки пользователей',
	...NO_INDEX_PAGE
}

const UserSettingspage = () => {
	return <Users />
}

export default UserSettingspage

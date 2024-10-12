import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { UserRoleEdit } from './UserEdit'

export const metadata: Metadata = {
	title: 'Редактировать пользователя',
	...NO_INDEX_PAGE
}

const UserEditPage = () => {
	return <UserRoleEdit />
}

export default UserEditPage

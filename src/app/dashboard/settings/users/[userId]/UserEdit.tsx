'use client'

import { useGetOneUser } from '@/hooks/queries/users/useGetOneUser'

import { UserForm } from './UserForm'

export const UserRoleEdit = () => {
	const { oneUser } = useGetOneUser()

	return (
		<>
			<UserForm user={oneUser} />
		</>
	)
}

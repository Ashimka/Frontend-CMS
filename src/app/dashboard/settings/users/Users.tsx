'use client'

import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { useGetAllUsers } from '@/hooks/queries/users/useGetAllUsers'

import { formatDate } from '@/utils/date/format-date'

import styles from '../Settings.module.scss'

import { IUserColumn, usersColumns } from './UsersColumns'

const Users = () => {
	const { getAllUsers, isLoading } = useGetAllUsers()

	const formatedUsers: IUserColumn[] = getAllUsers
		? getAllUsers.map(user => ({
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: formatDate(user.createdAt)
			}))
		: []
	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<Heading
						title='Пользователи'
						description='Список клиентов и сотрудников'
					/>
					<div className={styles.table}>
						<DataTable
							columns={usersColumns}
							data={formatedUsers}
							filterKey='name'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Users

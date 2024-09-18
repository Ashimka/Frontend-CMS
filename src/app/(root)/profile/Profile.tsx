'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { DataTable } from '@/components/ui/data-table/DataTable'

import { DASHBOARD_URL, PROFILE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { EnumRole } from '@/shared/types/jwt.interface'
import { EnumOrderStatus } from '@/shared/types/order.interface'

import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'

import styles from './Dashboard.module.scss'
import { IOrderColumn, orderColumns } from './orders/OrdersColumns'

export function Profile() {
	const router = useRouter()
	const { user } = useProfile()

	const searchParams = useSearchParams()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) {
			saveTokenStorage(accessToken)
		}
	}, [searchParams])

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	if (!user) return null

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formatDate(order.createdAt),
		status: order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
		total: formatPrice(order.total)
	}))

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				{user.role === EnumRole.ADMIN && (
					<Link href={DASHBOARD_URL.home()} className={styles.item_link}>
						Админ панель
					</Link>
				)}
				<Link href={PROFILE_URL.settings()} className={styles.item_link}>
					<Settings2 />
				</Link>
				<button onClick={() => logout()} className={styles.item_link}>
					<LogOut />
				</button>
			</div>
			<h2>Ваши заказы</h2>
			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	)
}

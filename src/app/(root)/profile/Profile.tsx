'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut, Mail, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { OrderDetailModal } from '@/components/ui/modals/OrderDetailsModal'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { EnumRole } from '@/shared/types/jwt.interface'
import { EnumOrderStatus } from '@/shared/types/order.interface'

import { formatDate } from '@/utils/date/format-date'
import { formattedPhoneNumber } from '@/utils/date/format-phone'
import { formatPrice } from '@/utils/string/format-price'

import styles from './Dashboard.module.scss'
import { Favorites } from './favorites/Favorites'
import { SettingsForm } from './settings/SettingsForm'

export function Profile() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const searchParams = useSearchParams()

	const { user } = useProfile()
	const [activeTab, setActiveTab] = useState('orders')
	const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
	const [selectedOrderInfo, setSelectedOrderInfo] = useState<{
		orderId: string
		total: number
		address?: string
	} | null>(null)

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		const tab = searchParams.get('tab')

		if (accessToken) {
			saveTokenStorage(accessToken)
		}

		if (tab === 'orders' || tab === 'favorites' || tab === 'settings') {
			setActiveTab(tab)
		}
	}, [searchParams])

	const handleTabChange = (value: string) => {
		setActiveTab(value)
		router.push(`/profile?tab=${value}`, { scroll: false })
	}

	const handleDetailsClick = ({
		orderId,
		total
	}: {
		orderId: string
		total: number
	}) => {
		setSelectedOrderInfo({ orderId, total, address: user?.profile.address })
		setIsDetailsDialogOpen(true)
	}
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.setQueryData(['profile'], null)
			router.push('/explorer')
		}
	})

	if (!user) return null

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				{/* User Info Card */}
				<Card className={styles.user}>
					<CardHeader className={styles.info}>
						<Avatar className={styles.avatar}>
							<AvatarImage
								className={styles.image}
								src={user.avatar}
								alt='User'
							/>
						</Avatar>
						<div className={styles.name}>
							<CardTitle>{user.name}</CardTitle>
							<CardDescription></CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<div className={styles.contacts}>
							<div className={styles.box}>
								<h3>Контактная информация</h3>
								{user.profile && (
									<div className={styles.info_box}>
										<div className={styles.block}>
											<MapPin />
											<div className={styles.block_info}>
												<h4>Адрес доставки:</h4>
												<p>{user.profile.address}</p>
											</div>
										</div>
										{user.email && (
											<div className={styles.block}>
												<Mail />
												<div className={styles.block_info}>
													<h4>Email:</h4>
													<p>{user.email}</p>
												</div>
											</div>
										)}
										<div className={styles.block}>
											<User />
											<div className={styles.block_info}>
												<h4>Телефон:</h4>
												<p>{formattedPhoneNumber(user.profile.phone)}</p>
											</div>
										</div>
									</div>
								)}
								{user.role === EnumRole.ADMIN && (
									<Button variant='link' className='mt-5 text-indigo-600'>
										<Link href={DASHBOARD_URL.home()}>Админ панель</Link>
									</Button>
								)}

								<Button
									variant='destructive'
									onClick={() => logout()}
									className='mt-5 flex items-start gap-2'
								>
									<LogOut className={styles.btn_icon} />

									<span className={styles.btn_span}>Выход</span>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
				{/* Main Content */}
				<div className='md:col-span-2'>
					<Tabs
						value={activeTab}
						onValueChange={handleTabChange}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-3'>
							<TabsTrigger value='orders'>Заказы</TabsTrigger>
							<TabsTrigger value='favorites'>Избранное</TabsTrigger>
							<TabsTrigger value='settings'>Настройки</TabsTrigger>
						</TabsList>
						<TabsContent value='orders' className='mt-6'>
							<div className='grid gap-4'>
								{user.orders.map((order, index) => (
									<Card key={order.id}>
										<CardHeader>
											<div className='flex items-center gap-3'>
												<div>
													<CardTitle className='text-base'>
														{`Заказ № ${+index + 1}`}
													</CardTitle>
													<CardDescription className='text-xs'>
														{`Оформлен ${formatDate(order.createdAt)}`}
													</CardDescription>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<p className='text-sm'>
												<b>Статус:</b>
												{` ${order.status === EnumOrderStatus.PENDING ? 'Готовиться' : 'Доставлен'}`}
											</p>
											<p className='text-sm'>
												<b>К оплате:</b> {`${formatPrice(order.total)} ₽`}
											</p>
										</CardContent>
										<CardFooter className='flex justify-between border-t pt-4'>
											<div className='flex gap-2'>
												<Button
													variant='primary'
													size='sm'
													onClick={() =>
														handleDetailsClick({
															orderId: order.id,
															total: order.total
														})
													}
												>
													Детали
												</Button>
											</div>
										</CardFooter>
									</Card>
								))}
							</div>
						</TabsContent>
						<TabsContent value='favorites' className='mt-6'>
							{user.favorites && <Favorites>{user.favorites}</Favorites>}
						</TabsContent>
						<TabsContent value='settings' className='mt-6'>
							<Card>
								<CardHeader>
									<CardTitle>Настройки аккаунта</CardTitle>
									<CardDescription>
										Редактирование контактной информации
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<SettingsForm profile={user?.profile} user={user.name} />
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
			{selectedOrderInfo && (
				<OrderDetailModal
					isOpen={isDetailsDialogOpen}
					onOpenChange={setIsDetailsDialogOpen}
					orderDate={selectedOrderInfo}
				/>
			)}
		</div>
	)
}

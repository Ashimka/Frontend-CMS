'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'

import { DASHBOARD_URL } from '@/config/url.config'

import styles from './Settings.module.scss'

const Settings = () => {
	return (
		<div className={styles.wrapper}>
			<Heading title='Настройки' />
			<div className={styles.content}>
				<Card className='border-indigo-500/50'>
					<CardHeader>
						<CardTitle>Пользователи</CardTitle>
						<CardDescription>Все пользователи и сотрудники</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href={DASHBOARD_URL.settingsUsers()}>
							<Button variant='primary' className={styles.btn}>
								Подробнее
							</Button>
						</Link>
					</CardContent>
				</Card>
				<Card className='border-indigo-500/50'>
					<CardHeader>
						<CardTitle>Заказы</CardTitle>
						<CardDescription>Информация по заказам</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant='primary' className={styles.btn}>
							Подробнее
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Settings

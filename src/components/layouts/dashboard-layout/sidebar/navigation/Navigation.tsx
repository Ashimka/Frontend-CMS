'use client'

import { Album, BarChart, FolderKanban, Settings, Star } from 'lucide-react'

import { DASHBOARD_URL } from '@/config/url.config'

import { MenuItem } from './MenuItem'
import styles from './Navigation.module.scss'
import { IMenuItem } from './menu.interface'

export function Navigation() {
	const routes: IMenuItem[] = [
		{
			icon: BarChart,
			link: DASHBOARD_URL.home(),
			value: 'Статистика'
		},
		{
			icon: FolderKanban,
			link: DASHBOARD_URL.products(),
			value: 'Товары'
		},
		{
			icon: Album,
			link: DASHBOARD_URL.categories(),
			value: 'Категории'
		},
		{
			icon: Star,
			link: DASHBOARD_URL.reviews(),
			value: 'Отзывы'
		},
		{
			icon: Settings,
			link: DASHBOARD_URL.settings(),
			value: 'Настройки магазина'
		}
	]
	return (
		<div className={styles.wrapper}>
			<div className={styles.navigation}>
				{routes.map(route => (
					<MenuItem key={route.value} route={route} />
				))}
			</div>
		</div>
	)
}

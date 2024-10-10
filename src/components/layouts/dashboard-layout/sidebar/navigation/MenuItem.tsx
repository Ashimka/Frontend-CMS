'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/clsx'

import styles from './Navigation.module.scss'
import { MenuItemProps } from './menu.interface'

export function MenuItem({ route, ...restProps }: MenuItemProps) {
	const pathname = usePathname()

	return (
		<Link
			href={route.link}
			className={cn(styles.route, {
				[styles.active]: pathname === route.link
			})}
			{...restProps}
		>
			<route.icon />
			{route.value}
		</Link>
	)
}

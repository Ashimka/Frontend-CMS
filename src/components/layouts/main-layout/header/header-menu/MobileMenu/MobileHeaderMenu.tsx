'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger
} from '@/components/ui/Sheet'

import { PROFILE_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { HeaderCart } from '../header-cart/HeaderCart'

import styles from './MobileHeaderMenu.module.scss'

export function MobileHeaderMenu() {
	const { user } = useProfile()

	return (
		<div className={styles.wrapper}>
			<HeaderCart />
			{user ? (
				<Sheet>
					<SheetTrigger asChild>
						<Image
							priority={true}
							src={user.avatar}
							alt={user.name}
							width={42}
							height={42}
							className={styles.image}
						/>
					</SheetTrigger>
					<SheetContent>
						<div className={styles.content}>
							<SheetClose asChild>
								<Link className={styles.link} href={PROFILE_URL.home()}>
									Профиль
								</Link>
							</SheetClose>
							<SheetClose asChild>
								<Link className={styles.link} href={PUBLIC_URL.explorer()}>
									Каталог
								</Link>
							</SheetClose>
							<SheetClose asChild>
								<Link className={styles.link} href={PROFILE_URL.favorites()}>
									Избранное
								</Link>
							</SheetClose>
						</div>
					</SheetContent>
				</Sheet>
			) : (
				<Link href={PUBLIC_URL.auth()}>Войти</Link>
			)}
		</div>
	)
}

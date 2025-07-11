'use client'

import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'

import { PROFILE_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './HeaderMenu.module.scss'
import { HeaderCart } from './header-cart/HeaderCart'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()
	return (
		<div className={styles.header_menu}>
			<HeaderCart />
			<Link
				href={PUBLIC_URL.explorer()}
				className='px-2 py-1 rounded-lg hover:bg-indigo-500/90 hover:text-white'
			>
				Каталог
			</Link>
			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link
						href={PROFILE_URL.favorites()}
						className='px-2 py-1 rounded-lg hover:bg-indigo-500/90 hover:text-white'
					>
						Избранное
					</Link>

					<Link href={PROFILE_URL.home()}>
						<Image
							priority={true}
							src={user.avatar}
							alt={user.name}
							width={36}
							height={36}
							className={styles.avatar}
						/>
					</Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='primary'>
						<LogOut className={styles.icon} />
						Войти
					</Button>
				</Link>
			)}
		</div>
	)
}

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
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='ghost' className='text-l'>
					Каталог
				</Button>
			</Link>
			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link href={PROFILE_URL.favorites()}>
						<Button variant='ghost' className='text-l'>
							Избранное
						</Button>
					</Link>

					<Link href={PROFILE_URL.home()}>
						<Image
							priority={true}
							src={user.avatar}
							alt={user.name}
							width={42}
							height={42}
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

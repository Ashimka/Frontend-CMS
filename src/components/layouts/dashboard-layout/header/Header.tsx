'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Loader } from '@/components/ui/Loader'

import { PROFILE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { MobileSidebar } from '../sidebar/MobileSidebar'

import styles from './Header.module.scss'

export function Header() {
	const { user, isLoading } = useProfile()

	return (
		<div className={styles.header}>
			<MobileSidebar />
			<div className={styles.header_menu}>
				{isLoading ? (
					<Loader size='sm' />
				) : (
					user && (
						<>
							<Link href={PROFILE_URL.home()}>
								<Image
									src={user.avatar}
									alt={user.name}
									width={42}
									height={42}
								/>
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}

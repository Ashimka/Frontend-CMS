'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SERVER_URL } from '@/config/api.config'

import styles from './Auth.module.scss'

export function Social() {
	const router = useRouter()
	return (
		<div className={styles.social}>
			<Image
				src={'/images/vk.svg'}
				width={24}
				height={24}
				alt='logo vk'
				className={styles.icon}
				onClick={() => router.push(`${SERVER_URL}/auth/vk`)}
			/>
			<Image
				src={'/images/yandex.svg'}
				width={24}
				height={24}
				alt='logo yandex'
				className={styles.icon}
				onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
			/>
		</div>
	)
}

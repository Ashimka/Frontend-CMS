'use client'

import { useRouter } from 'next/navigation'
import { FaYandex } from 'react-icons/fa'

import { Button } from '@/components/ui/Button'

import { SERVER_URL } from '@/config/api.config'

import styles from './Auth.module.scss'

export function Social() {
	const router = useRouter()
	return (
		<div className={styles.social}>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
			>
				<FaYandex color='#FC3F1D' />
				Продолжить через Яндекс
			</Button>
		</div>
	)
}

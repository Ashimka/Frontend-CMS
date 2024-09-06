import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { SITE_NAME } from '@/constants/seo.constants'

import styles from './logo.module.scss'

export function Logo() {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image
				src='/images/logo.svg'
				alt={SITE_NAME}
				width={35}
				height={35}
				priority
			/>
			<span>{SITE_NAME}</span>
		</Link>
	)
}

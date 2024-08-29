'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from './Header.module.scss'
import { HeaderMenu } from './header-menu/HeaderMenu'
import { MobileHeaderMenu } from './header-menu/MobileMenu/MobileHeaderMenu'
import { Logo } from './logo/Logo'
import { SearchInput } from './search-input/SearchInput'

export function Header() {
	const isMedia768 = useMediaQuery(768)
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.search}>
				<SearchInput />
			</div>
			{isMedia768 ? <MobileHeaderMenu /> : <HeaderMenu />}
		</header>
	)
}

import styles from './Header.module.scss'
import { HeaderMenu } from './header-menu/HeaderMenu'
import { Logo } from './logo/Logo'

export function Header() {
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.search}>Search</div>
			<HeaderMenu />
		</header>
	)
}

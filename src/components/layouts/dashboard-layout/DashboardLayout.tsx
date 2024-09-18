import type { PropsWithChildren } from 'react'

import { Header } from '../dashboard-layout/header/Header'
import { Sidebar } from '../dashboard-layout/sidebar/Sidebar'

import styles from './DashboardLayout.module.scss'

export function DashboardLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
				<div className={styles.header}>
					<Header />
				</div>
				<main>{children}</main>
			</div>
		</div>
	)
}

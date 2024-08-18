'use client'

import { Heading } from '@/components/ui/Heading'

import styles from './Dashboard.module.scss'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'

const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<Heading title='Статистика' />
			<MainStatistics />
		</div>
	)
}

export default Dashboard

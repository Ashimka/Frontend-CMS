'use client'

import { Heading } from '@/components/ui/Heading'

import styles from './Dashboard.module.scss'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<Heading title='Статистика' />
			<MainStatistics />
			<MiddleStatistics />
		</div>
	)
}

export default Dashboard

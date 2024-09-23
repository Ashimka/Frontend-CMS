'use client'

import { ProfileModal } from '@/components/ui/modals/ProfileModal'

import { useProfile } from '@/hooks/useProfile'

import styles from './Settings.module.scss'

export default function Settings() {
	const { user } = useProfile()

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Мои данные</h2>
			<div className={styles.modal_btn}>
				<ProfileModal>
					<span className={styles.span_btn}>
						{user?.profile ? 'Изменить' : 'Добавить'}
					</span>
				</ProfileModal>
			</div>
			{user?.profile && (
				<>
					<div className={styles.content}>
						<div className={styles.box}>
							<h4
								className={styles.title}
							>{`${user?.profile.firstName} ${user?.profile.lastName}`}</h4>
						</div>
						<div className={styles.box}>
							<h4 className={styles.title}>Адрес доставки:</h4>
							<p className={styles.desc}>{user?.profile.address}</p>
						</div>
						<div className={styles.box}>
							<h4 className={styles.title}>Телефон:</h4>
							<p className={styles.desc}>{user?.profile.phone}</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

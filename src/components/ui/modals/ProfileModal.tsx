import { PropsWithChildren, useState } from 'react'

import { SettingsForm } from '@/app/(root)/profile/settings/SettingsForm'

import { useProfile } from '@/hooks/useProfile'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../Dialog'

export function ProfileModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false)

	const { user } = useProfile()

	const onClose = (close: boolean) => {
		setIsOpen(close)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{user?.profile ? 'Изменить данные' : 'Добавить данные'}
					</DialogTitle>
					<DialogDescription>
						Ваши контактные данные для доставки заказа
					</DialogDescription>
				</DialogHeader>
				<SettingsForm profile={user?.profile} onClose={onClose} />
			</DialogContent>
		</Dialog>
	)
}

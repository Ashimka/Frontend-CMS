import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateProfile } from '@/hooks/queries/profile/useCreateProfile'

import { IProfileUser } from '@/shared/types/user.interface'

import { Button } from '../Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '../form-elements/Form'
import { Input } from '../form-elements/Input'

export function ProfileModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<IProfileUser>({
		mode: 'onChange'
	})

	const { createPofile, isLoadingCreate } = useCreateProfile()

	const onSubmit: SubmitHandler<IProfileUser> = data => {
		createPofile(data)
		form.reset()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Добавить данные</DialogTitle>
					<DialogDescription>
						Ваши контактные данные для доставки заказа
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='firstName'
							rules={{
								required: 'Ваше имя'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Ваше имя'
											disabled={isLoadingCreate}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							rules={{
								required: 'Ваша фамилия'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Фамилия</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Ваша фамилия'
											disabled={isLoadingCreate}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							rules={{
								required: 'Адресс куда доставить'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Адресс</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Адресс куда доставить'
											disabled={isLoadingCreate}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							rules={{
								required: 'Телефон для курьера'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Телефон</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Телефон для курьера'
											disabled={isLoadingCreate}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button variant='primary' disabled={isLoadingCreate}>
								Добавить
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

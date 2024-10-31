import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { useCreateProfile } from '@/hooks/queries/profile/useCreateProfile'
import { useUpdateProfile } from '@/hooks/queries/profile/useUpdateProfile'

import { IProfileUser } from '@/shared/types/user.interface'

interface ProfileFormProps {
	profile?: IProfileUser
	onClose: (close: boolean) => void
}

export function SettingsForm({ profile, onClose }: ProfileFormProps) {
	const { createPofile, isLoadingCreate } = useCreateProfile()
	const { updateProfile, isLoadingUpdate } = useUpdateProfile()

	const action = profile ? 'Сохранить' : 'Создать'

	const form = useForm<IProfileUser>({
		mode: 'onChange',
		values: {
			firstName: profile?.firstName || '',
			lastName: profile?.lastName || '',
			address: profile?.address || '',
			phone: profile?.phone || ''
		}
	})

	const onSubmit: SubmitHandler<IProfileUser> = data => {
		if (profile) {
			updateProfile(data)
		} else {
			createPofile(data)
		}
		onClose(false)
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<FormField
						control={form.control}
						name='firstName'
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
						<Button
							variant='primary'
							disabled={isLoadingCreate || isLoadingUpdate}
						>
							{action}
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}

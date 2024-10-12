import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { useUpdateUser } from '@/hooks/queries/users/useUpdateUser'

import { EnumRole } from '@/shared/types/jwt.interface'
import { IEditUser, IUser } from '@/shared/types/user.interface'

import styles from '../Users.module.scss'

interface UserProps {
	user?: IUser
}

export const UserForm = ({ user }: UserProps) => {
	const { updateRoleUser, isLoadingUpdateRole } = useUpdateUser()

	const form = useForm<IEditUser>({
		mode: 'onChange',

		values: {
			name: user?.name || '',
			email: user?.email || '',
			role: user?.role
		}
	})

	const onSubmit: SubmitHandler<IEditUser> = data => {
		updateRoleUser(data)
	}

	return (
		<div className={styles.wrapper}>
			<Heading
				title='Изменить данные'
				description='Редактировать данные пользователя'
			/>

			{user && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className={styles.fields}>
							<FormField
								control={form.control}
								name='name'
								rules={{
									required: 'Имя обязательно'
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя пользователя</FormLabel>
										<FormControl>
											<Input
												placeholder='Имя пользователя'
												disabled
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								rules={{
									required: 'Email обязателен'
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='Имя пользователя'
												disabled
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='role'
								rules={{
									required: 'Укажите права'
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Права пользователя</FormLabel>
										<Select
											disabled={isLoadingUpdateRole}
											onValueChange={field.onChange}
											defaultValue={user.role}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Права пользователя' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='ADMIN'>ADMIN</SelectItem>
												<SelectItem value='USER'>USER</SelectItem>
												<SelectItem value='EMPLOYEES'>EMPLOYEES</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button variant='primary' disabled={isLoadingUpdateRole}>
							Сохранить
						</Button>
					</form>
				</Form>
			)}
		</div>
	)
}

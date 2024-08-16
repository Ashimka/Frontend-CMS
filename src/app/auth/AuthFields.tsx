import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReq?: boolean
}

export function AuthFields({
	form,
	isPending,
	isReq = false
}: AuthFieldsProps) {
	return (
		<>
			{isReq && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Имя обязательно!'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Ваше имя' disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'email обязателен!',
					pattern: {
						value: validEmail,
						message: 'Введите верный email'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='Ваш email'
								type='email'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Пароль обязателен!',
					minLength: {
						value: 6,
						message: 'Пароль должен состоять не менее 6 символов'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='Пароль'
								type='password'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

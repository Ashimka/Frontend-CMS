import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PROFILE_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

import { IAuthForm } from '@/shared/types/auth.interface'

export function useAuthForm(isReq: boolean) {
	const router = useRouter()

	const form = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth user'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isReq ? 'register' : 'login', data),
		onSuccess() {
			form.reset()
			toast.success('Вы авторизовались')
			router.replace(PROFILE_URL.home())
		},
		onError(error: Error | AxiosError) {
			axios.isAxiosError(error)
				? toast.error(error.response?.data?.message || error.message)
				: toast.error('Ошибка авторизации')
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return { onSubmit, form, isPending }
}

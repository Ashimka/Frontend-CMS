'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Form } from '@/components/ui/form-elements/Form'

import styles from './Auth.module.scss'
import { AuthFields } from './AuthFields'
import { Social } from './Social'
import { useAuthForm } from './useAuthForm'

export default function Auth() {
	const [isReq, setIsReq] = useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isReq)
	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src={'/images/auth.svg'}
					alt='Super shop'
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>{isReq ? 'Создать аккаунт' : 'Войти'}</CardTitle>
						<CardDescription>
							Войдите или зарегистрируйтеь, для заказа на сайте
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields form={form} isPending={isPending} isReq={isReq} />
								<Button disabled={isPending}>Продолжить</Button>
							</form>
						</Form>
						<Social />
					</CardContent>
					<CardFooter>
						{isReq ? 'Есть аккаунт?' : 'Нет аккаунта'}
						<button onClick={() => setIsReq(!isReq)}>
							{isReq ? 'Войти' : 'Создать'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

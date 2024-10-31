'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { RadioGroup, RadioGroupItem } from '@/components/ui/Radio-group'
import { Label } from '@/components/ui/form-elements/Label'

import { PROFILE_URL } from '@/config/url.config'

import { useCheckOrder } from '@/hooks/order/useCheckOrder'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'

import styles from './PlacingOrder.module.scss'

const PlacingOrder = () => {
	const router = useRouter()
	const [delivery, setDelivery] = useState('delivery-courier')

	const { user } = useProfile()
	const { items } = useCart()
	const { createOrder, isLoadingCreate } = useCheckOrder()
	const date = new Date().toString()

	const totalCost = items.reduce((acc, item) => {
		return acc + item.price * item.quantity
	}, 0)

	const handleClick = () => {
		user?.profile ? createOrder() : router.push(PROFILE_URL.settings())
	}

	return (
		<>
			{isLoadingCreate ? (
				<Loader />
			) : (
				<div className={styles.wrapper}>
					<h2 className={styles.title}>Оформление заказа</h2>
					<h3 className={styles.sub_title}>Заказ от {formatDate(date)}</h3>
					<div className={styles.content}>
						<div className={styles.products}>
							{items.map(item => (
								<div className={styles.cols} key={item.id}>
									<div className={styles.image}>
										<Image
											src={item.product.images[0]}
											alt={item.product.title}
											width={100}
											height={100}
											priority
										/>
									</div>
									<div className={styles.description}>
										<span className={styles.product}>{item.product.title}</span>
										<span className={styles.category}>
											{item.product.category.title}
										</span>
										<span
											className={styles.quantity}
										>{`Количество ${item.quantity}`}</span>
									</div>
									<div className={styles.price}>{`${item.price} ₽`}</div>
								</div>
							))}
						</div>
						<div className={styles.delivery}>
							<h3>Доставка</h3>
							<h6>Бесплатная доставка от 600 рублей</h6>
							<RadioGroup>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='delivery-courier'
										checked={delivery === 'delivery-courier'}
										onClick={() => setDelivery('delivery-courier')}
										id='delivery-courier'
									/>
									<Label htmlFor='delivery-courier'>Курьером</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='pickup-myself'
										checked={delivery === 'pickup-myself'}
										onClick={() => setDelivery('pickup-myself')}
										id='pickup-myself'
									/>
									<Label htmlFor='pickup-myself'>Забрать самому</Label>
								</div>
							</RadioGroup>
							<div className={styles.address}>
								{delivery === 'pickup-myself' && (
									<>
										<p>Адрес магазина:</p>
										<address>Москва, улица Ломоносова, дом 77</address>
									</>
								)}
								{delivery === 'delivery-courier' && (
									<>
										{user?.profile?.address ? (
											<address>{user?.profile.address}</address>
										) : (
											<Link
												href={PROFILE_URL.settings()}
												className='text-purple-600'
											>
												Указать адрес
											</Link>
										)}
									</>
								)}
							</div>
							<div className={styles.total_cost}>
								<span>Итого к оплате: {formatPrice(totalCost)}</span>
							</div>
						</div>
					</div>
					<div className={styles.footer}>
						<Button onClick={handleClick} variant={'primary'}>
							Заказать
						</Button>
					</div>
				</div>
			)}
		</>
	)
}

export default PlacingOrder

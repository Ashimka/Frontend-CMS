import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger
} from '@/components/ui/Sheet'

import { PROFILE_URL, PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '@/utils/string/format-price'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'

export function HeaderCart() {
	const router = useRouter()
	const { user } = useProfile()
	const { items, total } = useCart()

	const handleClick = () => {
		user ? router.push(PROFILE_URL.orders()) : router.push(PUBLIC_URL.auth())
	}
	const countProducts = items.reduce((acc, item) => {
		return acc + item.quantity
	}, 0)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className='relative'>
					{countProducts > 0 && (
						<span className='absolute top-[-20px] right-[-15px] bg-rose-600 text-white rounded-full text-xs flex items-center justify-center min-w-[20px] min-h-[20px]'>
							{countProducts}
						</span>
					)}
					<ShoppingBag className='cursor-pointer bg-inherit size-6 text-blue-800 hover:text-blue-600' />
				</div>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Корзина заказа' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className={styles.not_found}>Корзина пустая!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Итого к оплате: {formatPrice(total)}
						</div>
						<SheetClose asChild>
							<Button
								className={styles.check_order}
								onClick={handleClick}
								variant='primary'
							>
								Перейти к оформлению
							</Button>
						</SheetClose>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}

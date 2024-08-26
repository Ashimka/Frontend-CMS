import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCheckOrder } from '@/hooks/order/useCheckOrder'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '@/utils/string/format-price'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'

export function HeaderCart() {
	const router = useRouter()
	const { user } = useProfile()
	const { items, total } = useCart()
	const { createOrder, isLoadingCreate } = useCheckOrder()

	const handleClick = () => {
		user ? createOrder() : router.push(PUBLIC_URL.auth())
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Корзина</Button>
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
						<Button
							className={styles.check_order}
							onClick={handleClick}
							variant='primary'
							disabled={isLoadingCreate}
						>
							Подтвердить заказ
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
function useCheckoutOrder(): { createPayment: any; isLoadingCreate: any } {
	throw new Error('Function not implemented.')
}

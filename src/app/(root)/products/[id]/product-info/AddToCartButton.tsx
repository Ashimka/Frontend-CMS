import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct, IProductToCart } from '@/shared/types/product.interface'

interface AddToCartButtonProps {
	product: IProductToCart
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<Button
			variant='primary'
			size='lg'
			className='w-full'
			onClick={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({
							product: {
								id: product.id,
								category: {
									id: product.category.id,
									title: product.category.title
								},
								title: product.title,
								images: product.images,
								price: product.price
							},
							quantity: 1,
							price: product.price
						})
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}

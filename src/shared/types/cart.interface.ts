import { IProductToCart } from './product.interface'

export interface ICartItem {
	id: number
	product: IProductToCart
	quantity: number
	price: number
}

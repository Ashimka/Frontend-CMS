import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export interface IUser {
	id: string
	name: string
	email: string
	avatar: string
	favorites: IProduct[]
	orders: IOrder[]
}

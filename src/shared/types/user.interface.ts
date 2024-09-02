import { EnumRole } from './jwt.interface'
import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export interface IUser {
	id: string
	name: string
	email: string
	avatar: string
	role: EnumRole
	favorites: IProduct[]
	orders: IOrder[]
}

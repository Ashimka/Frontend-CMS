import { EnumRole } from './jwt.interface'
import { IOrder } from './order.interface'
import { IFavoriteProducts, IProduct } from './product.interface'

export interface IUser {
	id: string
	name: string
	email: string
	avatar: string
	role: EnumRole
	createdAt: string
	favorites: IFavoriteProducts[]
	orders: IOrder[]
	profile: IProfileUser
}
export interface IProfileUser {
	id?: string
	address: string
	firstName: string
	lastName: string
	phone: string
}

export interface IEditUser extends Partial<IUser> {}

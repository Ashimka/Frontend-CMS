import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: string
	title: string
	description: string
	price: number
	images: string
	category: ICategory
	reviews: IReview[]
}

export interface IProductInput
	extends Omit<IProduct, 'id' | 'reviews' | 'category'> {
	categoryId: string
}

import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CreateProduct from './CreateProduct'

export const metadata: Metadata = {
	title: 'Добавление продукта',
	...NO_INDEX_PAGE
}

export default function CreateProductPage() {
	return <CreateProduct />
}

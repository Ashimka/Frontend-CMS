import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ProductEdit } from './ProductEdit'

export const metadata: Metadata = {
	title: 'Изменение продукта',
	...NO_INDEX_PAGE
}

export default function ProductsPage() {
	return <ProductEdit />
}

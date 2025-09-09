import { Metadata } from 'next'

import { productService } from '@/services/product.service'

import { Explorer } from './Explorer'

export const metadata: Metadata = {
	title: 'Каталог продуктов'
}
export const revalidate = 60

async function getProducts() {
	try {
		const data = await productService.getAll()
		return data
	} catch (error) {
		console.error('Ошибка при загрузке продуктов на сервере:', error)

		return []
	}
}

export default async function ExplorerPage() {
	const data = await getProducts()
	return <Explorer products={data} />
}

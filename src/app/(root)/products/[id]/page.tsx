import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.service'

import { Product } from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	const products = await productService.getAll()

	const paths = products.map(product => {
		return {
			params: { isd: product.id }
		}
	})

	return paths
}

async function getProducts(params: { id: string }) {
	try {
		const product = await productService.getById(params.id)

		const similarProducts = await productService.getSimilar(params.id)

		return { product, similarProducts }
	} catch {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: { id: string }
}): Promise<Metadata> {
	const { product } = await getProducts(params)

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title
				}
			]
		}
	}
}

export default async function ProductPage({
	params
}: {
	params: { id: string }
}) {
	const { product, similarProducts } = await getProducts(params)

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			id={params.id}
		/>
	)
}

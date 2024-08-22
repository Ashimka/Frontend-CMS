import React from 'react'

import { Catalog } from '@/components/ui/catalog/Catalog'

import { PUBLIC_URL } from '@/config/url.config'

import { IProduct } from '@/shared/types/product.interface'

import { Hero } from './hero/Hero'

interface HomeProps {
	products: IProduct[]
}

const Home = ({ products }: HomeProps) => {
	return (
		<>
			<Hero />
			<Catalog
				title='Хиты продаж'
				description='Самые популярные '
				linkTitle='Узнать больше'
				link={PUBLIC_URL.explorer()}
				products={products}
			/>
		</>
	)
}

export default Home

'use client'

import { Catalog } from '@/components/ui/catalog/Catalog'

import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/shared/types/product.interface'

export function Favorites() {
	const { user } = useProfile()

	if (!user) return null

	let products: IProduct[] = []

	for (const key in user.favorites) {
		if (Object.prototype.hasOwnProperty.call(user.favorites, key)) {
			products.push(...Object.values(user.favorites[key]))
		}
	}

	return (
		<div className='my-6'>
			<Catalog title='Избранное' products={products} />
		</div>
	)
}

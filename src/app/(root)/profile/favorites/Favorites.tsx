'use client'

import Image from 'next/image'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'

import { IFavoriteProducts } from '@/shared/types/product.interface'

import { AddToCartButton } from '../../products/[id]/product-info/AddToCartButton'

import styles from './Favorites.module.scss'

export function Favorites({ children }: { children: IFavoriteProducts[] }) {
	return (
		<div className={styles.wrapper}>
			{children &&
				children.map(item => (
					<Card key={item.products.id}>
						<CardHeader>
							<CardTitle className={styles.title}>
								{item.products.title}
							</CardTitle>
							<CardDescription>{item.products.category.title}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className={styles.image_box}>
								<Image
									src={item.products.images[0]}
									alt={item.products.title}
									style={{ width: '100%', height: 'auto' }}
									width={500}
									height={300}
									priority
								/>
							</div>
							<p className={styles.description}>{item.products.description}</p>
						</CardContent>
						<CardFooter className={styles.footer}>
							<AddToCartButton product={item.products} />
						</CardFooter>
					</Card>
				))}
		</div>
	)
}

import Image from 'next/image'
import { useState } from 'react'

import { IProduct } from '@/shared/types/product.interface'

import { cn } from '@/utils/clsx'

import styles from './ProdcutGallery.module.scss'

interface ProdcutGalleryProps {
	product: IProduct
}

export function ProdcutGallery({ product }: ProdcutGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div>
			<Image
				priority={true}
				src={product.images.split(',')[currentIndex]}
				alt={product.title}
				width={500}
				height={500}
				className={styles.image}
			/>
			{product.images.split(',').length > 1 && (
				<div className={styles.gallery}>
					{product.images.split(',').map((image, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={cn(
								styles.item,
								index === currentIndex ? 'border-black' : 'border-transparent'
							)}
						>
							<Image
								priority={true}
								src={image}
								alt={product.title}
								width={100}
								height={100}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

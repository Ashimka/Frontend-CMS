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
		<>
			<div>
				<Image
					className={styles.image}
					priority={true}
					src={product.images[currentIndex]}
					alt={product.title}
					width={500}
					height={500}
				/>
				{product?.images.length > 1 && (
					<div className={styles.gallery}>
						{product?.images.map((image, index) => (
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
		</>
	)
}

'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { DASHBOARD_URL } from '@/config/url.config'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

import { formatPrice } from '@/utils/string/format-price'

import styles from '../Dashboard.module.scss'

import { IProductColumn, productColumns } from './ProductColumns'

const Products = () => {
	const { products, isLoading } = useGetProducts()

	const formatedProducts: IProductColumn[] = products
		? products.map(product => ({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				category: product.category.title
			}))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Продукты (${products?.length})`}
							description='Все продукты'
						/>
						<div className={styles.buttons}>
							<Link href={DASHBOARD_URL.productCreate()}>
								<Button variant='primary'>
									<Plus />
									Добавить
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={productColumns}
							data={formatedProducts}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Products

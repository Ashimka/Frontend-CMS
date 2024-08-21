'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { ProductForm } from '../ProductForm'

const CreateProduct = () => {
	const { categories } = useGetCategories()

	return <ProductForm categories={categories || []} />
}

export default CreateProduct

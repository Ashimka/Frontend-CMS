'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { Catalog } from '@/components/ui/catalog/Catalog'

import { productService } from '@/services/product.service'

import { IProduct } from '@/shared/types/product.interface'

interface ExplorerProps {
	products: IProduct[]
}

export function Explorer({ products }: ExplorerProps) {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('searchTerm')

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['product explorer', searchTerm],
		queryFn: async () => {
			try {
				return await productService.getAll(searchTerm)
			} catch (error) {
				throw error
			}
		},
		initialData: products,
		retry: 2,
		retryDelay: 1000,
		refetchOnWindowFocus: false
	})

	if (error) {
		console.error('Ошибка загрузки товаров:', error)
		return (
			<div className='my-6'>
				<div className='text-center py-8'>
					<h2 className='text-xl font-semibold text-red-600 mb-2'>
						Ошибка загрузки товаров
					</h2>
					<p className='text-gray-600 mb-4'>
						Не удалось загрузить каталог товаров. Возможно, сервис временно
						недоступен.
					</p>
					{process.env.NODE_ENV === 'development' && (
						<div className='mb-4 p-3 bg-gray-100 rounded text-sm text-left'>
							<strong>Детали ошибки:</strong>
							<pre className='mt-1 text-xs overflow-auto'>
								{error instanceof Error ? error.message : String(error)}
							</pre>
							{error && typeof error === 'object' && 'response' in error && (
								<div className='mt-2'>
									<strong>Статус:</strong>{' '}
									{(error as any).response?.status || 'Неизвестно'}
								</div>
							)}
						</div>
					)}
					<button
						onClick={() => refetch()}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
					>
						Попробовать снова
					</button>
				</div>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className='my-6'>
				<div className='text-center py-8'>
					<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
					<p className='mt-2 text-gray-600'>Загрузка товаров...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='my-6'>
			<Catalog
				title={
					searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Каталог товаров'
				}
				products={data || []}
			/>
		</div>
	)
}

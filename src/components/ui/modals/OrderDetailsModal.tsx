'use client'

import { DialogTrigger } from '@radix-ui/react-dialog'

import { useOrderDetails } from '@/hooks/order/useOrderDetails'

import { formatPrice } from '@/utils/string/format-price'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '../Dialog'
import { Skeleton } from '../Skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../Table'

interface IOrderDate {
	orderId: string
	total: number
	address?: string
}
interface OrderDetailsDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	orderDate: IOrderDate
}

export function OrderDetailModal(order: OrderDetailsDialogProps) {
	const { isLoading, orderDetails } = useOrderDetails(order.orderDate.orderId)

	return (
		<Dialog open={order.isOpen} onOpenChange={order.onOpenChange}>
			<DialogTrigger asChild></DialogTrigger>

			<DialogContent className='sm:max-w-[625px]'>
				{isLoading ? (
					<>
						<DialogTitle />
						<DialogDescription />
						<div className='space-y-3'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-20 w-full' />
							<Skeleton className='h-4 w-3/4' />
						</div>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Детали заказа</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<div className='mt-4'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Товар</TableHead>
										<TableHead className='text-right'>Кол-во</TableHead>
										<TableHead className='text-right'>Цена</TableHead>
										<TableHead className='text-right'>Сумма</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orderDetails &&
										orderDetails.map(item => (
											<TableRow key={item.id}>
												<TableCell>{item.title}</TableCell>
												<TableCell className='text-right'>
													{item.quantity}
												</TableCell>
												<TableCell className='text-right'>
													{formatPrice(item.price)}
												</TableCell>
												<TableCell className='text-right'>
													{formatPrice(item.price * item.quantity)}
												</TableCell>
											</TableRow>
										))}
									<TableRow>
										<TableCell colSpan={3} className='text-right font-medium'>
											Итого:
										</TableCell>
										<TableCell className='text-right font-bold'>
											{formatPrice(order.orderDate.total)}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
						<div className='mt-4'>
							<h4 className='text-sm font-medium mb-2'>Адрес доставки</h4>
							<p className='text-sm text-muted-foreground'>
								{order.orderDate.address}
							</p>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}

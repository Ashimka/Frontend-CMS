import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'

export function HeaderCart() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost'>Корзина</Button>
			</SheetTrigger>
			<SheetContent>
				<Heading title='Корзина заказа' className='text-xl' />
			</SheetContent>
		</Sheet>
	)
}

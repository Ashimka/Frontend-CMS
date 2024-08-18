import { Menu } from 'lucide-react'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/Sheet'

import { Sidebar } from './Sidebar'

export function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
				<SheetTitle>
					<Menu />
				</SheetTitle>
			</SheetTrigger>
			<SheetContent side='left' className='p-0 bg-white'>
				<SheetDescription>
					<Sidebar />
				</SheetDescription>
			</SheetContent>
		</Sheet>
	)
}

import { LucideIcon } from 'lucide-react'

export interface IMenuItem {
	icon: LucideIcon
	value: string
	link: string
}
export interface MenuItemProps {
	route: IMenuItem
}

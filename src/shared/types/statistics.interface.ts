import { IProfileUser } from './user.interface'

export interface IMainStatistics {
	id: number
	name: string
	value: number
}

export interface IMonthlySales {
	date: string
	value: number
}

export interface ILastUsers {
	id: string
	name: string
	email: string
	avatar: string
	total: number
	profile?: IProfileUser
}

export interface IMiddleStatistics {
	monthlySales: IMonthlySales[]
	lastUsers: ILastUsers[]
}

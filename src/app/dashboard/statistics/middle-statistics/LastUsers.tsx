import { ILastUsers } from '@/shared/types/statistics.interface'

interface LastUsersProps {
	data: ILastUsers[]
}

export function LastUsers({ data }: LastUsersProps) {
	return <div>Last users</div>
}

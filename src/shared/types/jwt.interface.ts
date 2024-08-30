export interface IJwtPayload {
	id: string
	role: EnumRole
	iat: number
	exp: number
}

export enum EnumRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	EMPLOYEES = 'EMPLOYEES'
}

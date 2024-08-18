import { PropsWithChildren } from 'react'

import { DashboardLayout } from '@/components/layouts/dashboard-layout/DashboardLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>
}

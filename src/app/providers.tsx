'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }: PropsWithChildren) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)
	return (
		<QueryClientProvider client={client}>
			<Toaster />
			{children}
		</QueryClientProvider>
	)
}

export default Providers

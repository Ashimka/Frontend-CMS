'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'

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
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Toaster />
					{children}
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default Providers

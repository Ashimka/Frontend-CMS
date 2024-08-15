import { Metadata } from 'next'

import Home from './Home'

export const metadata: Metadata = {
	title: 'Для Вас Super shop'
}

export default function HomePage() {
	return <Home />
}

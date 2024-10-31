import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import PlacingOrder from './PlacingOrder'

export const metadata: Metadata = {
	title: 'Оформление заказа',
	...NO_INDEX_PAGE
}

const PlacingOrderPage = () => {
	return <PlacingOrder />
}

export default PlacingOrderPage

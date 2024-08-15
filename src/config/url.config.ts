export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),

	product: (id = '') => PUBLIC_URL.root(`/products/${id}`),
	category: (id = '') => PUBLIC_URL.root(`/categories/${id}`)
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard/${url ? url : ''}`,

	home: () => DASHBOARD_URL.root('/'),
	favorites: () => DASHBOARD_URL.root('/favorites'),

	productCreate: () => DASHBOARD_URL.root(`/products/create`),
	productEdit: (id = '') => DASHBOARD_URL.root(`/products/${id}`),

	categoryCreate: () => DASHBOARD_URL.root(`/categories/create`),
	categoryEdit: (id = '') => DASHBOARD_URL.root(`/categories/${id}`),

	reviews: () => DASHBOARD_URL.root(`/reviews`),

	settings: () => DASHBOARD_URL.root(`/settings`)
}

/** @type {import('next').NextConfig} */

const requiredEnvVars = ['SERVER_URL']
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'production') {
	console.error(
		`❌ Отсутствуют обязательные переменные окружения: ${missingEnvVars.join(', ')}`
	)
	process.exit(1)
}

const nextConfig = {
	env: {
		APP_ENV: process.env.APP_ENV || 'development',
		APP_URL: process.env.APP_URL || 'http://localhost:3000',
		APP_DOMAIN: process.env.APP_DOMAIN || 'localhost',
		SERVER_URL: process.env.SERVER_URL || 'http://localhost:4200/api'
	},

	compress: true,
	poweredByHeader: false,
	generateEtags: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			},
			{
				protocol: 'https',
				hostname: 'sun60-1.userapi.com'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig

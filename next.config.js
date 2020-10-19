/* eslint-env node */

// Module imports
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nextSafe = require('next-safe')
const path = require('path')
const webpack = require('webpack')





module.exports = {
	target: 'serverless',

	async redirects() {
    return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		]
	},

	async headers () {
		return [
			{
				source: '/:path*',
				headers: nextSafe({
					contentSecurityPolicy: {
						'connect-src': [
							"'self'",
							'https://firestore.googleapis.com',
							'https://securetoken.googleapis.com',
							'https://www.googleapis.com',
							'https://apis.google.com',
							'https://*.firebaseio.com',
							'wss://*.firebaseio.com',
						],
						'default-src': [
							"'self'",
							'https://twitter-9dd2d.firebaseapp.com',
							'https://twitter-9dd2d.firebaseio.com',
						],
						'font-src': [
							'https://fonts.googleapis.com',
							'https://fonts.gstatic.com',
							'https://use.typekit.net',
							'data:',
						],
						'frame-src': [
							'https://*.firebaseapp.com',
							'https://*.firebaseio.com',
						],
						'img-src': [
							"'self'",
							'https://api.adorable.io',
							'https://images.unsplash.com',
							'https://twitter-9dd2d.googleusercontent.com',
							'https://firebasestorage.googleapis.com',
						],
						'script-src': [
							"'self'",
							'https://*.firebaseio.com',
						],
						'style-src': [
							"'self'",
							"'unsafe-inline'",
							'https://fonts.googleapis.com',
							'https://use.typekit.net',
							'https://p.typekit.net',
						],
					},
					isDev: process.env.NODE_ENV !== 'production',
				}),
			},
		]
	},

	webpack(config) {
		config.module.rules.push({
			exclude: /node_modules/,
			test: /\.svg$/,
			loader: '@svgr/webpack',
		})

		config.plugins.push(new CopyWebpackPlugin({
			patterns: [
				{
					flatten: true,
					from: path.resolve('node_modules', 'prismjs', 'components', '*.min.js'),
					to: path.resolve('public', 'prism-grammars'),
				},
			],
		}))

		return config
	},
}

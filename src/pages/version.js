// Module imports
import { NextSeo as NextSEO } from 'next-seo'
import React from 'react'
import moment from 'moment'





// Component imports
import { version } from '../../package.json'





// Component Constants
/* eslint-disable no-undef,prefer-destructuring */
// const buildDate = new Date()
// const nodeVersion = process.env.nodeVersion
/* eslint-enable */

// VERCEL_GITHUB_COMMIT_AUTHOR_LOGIN
// VERCEL_GITHUB_COMMIT_SHA
// VERCEL_GITHUB_COMMIT_REF
// VERCEL_GITHUB_REPO
// VERCEL_GITHUB_ORG
// VERCEL_GITHUB_DEPLOYMENT





export default function Version(props) {
	return (
		<>
			<NextSEO title="Version Information" />

			<section className="hero">
				<pre>{props.blep}</pre>
			</section>
		</>
	)
}

export async function getStaticProps() {
	return {
		props: {
			blep: JSON.stringify(Object.entries(process.env).reduce((accumulator, [key, value]) => {
				if (!key.toLowerCase().endsWith('key') || !key.toLowerCase().endsWith('secret')) {
					accumulator[key] = value
				}
				// if (key.toLowerCase().startsWith('vercel')) {
				// }

				return accumulator
			}, {}), null, 2),
		},
	}
}

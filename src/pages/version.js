// Module imports
import { NextSeo as NextSEO } from 'next-seo'
import React from 'react'
import moment from 'moment'





export default function Version(props) {
	const {
		builtAt,
		commitLink,
		nextVersion,
		nodeVersion,
		repoLink,
		yarnVersion,
	} = props

	return (
		<>
			<NextSEO title="Version Information" />

			<section className="hero">
				<dl>
					<dt>Built:</dt>
					<dd>{(new Date(builtAt)).toString()}</dd>

					<dt>Node Version:</dt>
					<dd>{nodeVersion}</dd>

					<dt>Yarn Version:</dt>
					<dd>{yarnVersion}</dd>

					<dt>Next.js Version:</dt>
					<dd>{nextVersion}</dd>

					<dt>Repo:</dt>
					<dd><a href={repoLink}>{repoLink}</a></dd>

					<dt>Commit:</dt>
					<dd><a href={commitLink}>{commitLink}</a></dd>
				</dl>
			</section>
		</>
	)
}

export async function getStaticProps() {
	const [, yarnVersion, nodeVersion] = /yarn\/([\d\.]+) npm\/\? node\/v([\d\.]+)/.exec(process.env.npm_config_user_agent || '')

	return {
		props: {
			builtAt: Date.now(),
			commitLink: `https://github.com/${process.env.VERCEL_GITHUB_ORG}/${process.env.VERCEL_GITHUB_REPO}/commit/${process.env.VERCEL_GITHUB_COMMIT_SHA}`,
			nextVersion: process.env.npm_package_dependencies_next,
			nodeVersion,
			repoLink: `https://github.com/${process.env.VERCEL_GITHUB_ORG}/${process.env.VERCEL_GITHUB_REPO}`,
			yarnVersion,
		},
	}
}

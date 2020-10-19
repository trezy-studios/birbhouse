// Module imports
import algoliasearch from 'algoliasearch/lite'





// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





// Local constants
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const profileSearchIndex = algoliaClient.initIndex('profiles')





export const handler = async (request, response) => {
	const { username } = request.query
	const errors = []

	if (!username) {
		errors.push('username is required.')
	}

	if (errors.length) {
		response.status(httpStatus.UNPROCESSABLE_ENTITY)
		response.end()
		return
	}

	await profileSearchIndex.setSettings({
		searchableAttributes: [
			'username',
			'displayName',
		]
	})

	try {
		const results = await profileSearchIndex.search(username)

		if (results.hits.some(profile => (profile.username === username))) {
			response.status(httpStatus.CONFLICT)
			response.end()
			return
		}
	} catch (error) {
		response.status(httpStatus.INTERNAL_SERVER_ERROR)
		response.json({ errors: [error.message] })
		response.end()
		return
	}

	response.status(httpStatus.OK)
	response.end()
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})

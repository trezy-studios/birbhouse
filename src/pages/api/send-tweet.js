// Local imports
import {
	firebase,
	firebaseAdmin,
	firestore,
} from 'helpers/firebase.server'
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const now = firebaseAdmin.firestore.Timestamp.now()
	const {
		'x-forwarded-host': HOST,
		'x-forwarded-proto': PROTOCOL,
		'x-forwarded-port': PORT,
	} = request.headers
	const tweet = {
		...request.body,
		createdAt: now,
		updatedAt: now,
	}
	tweet.isDraft = request.query.hasOwnProperty('isDraft')
	delete tweet.redirectTo

	const redirectTo = new URL(`${PROTOCOL}://${HOST}${request.body.redirectTo}`)

	const tweetsCollection = firestore.collection('tweets')

	try {
		await tweetsCollection.add(tweet)
	} catch (error) {
		redirectTo.searchParams.set('error', error.message)
	}

	response.setHeader('Location', redirectTo)
	response.status(httpStatus.TEMPORARY_REDIRECT)
	response.end()
}





export default createEndpoint({
	allowedMethods: ['post'],
	handler,
})

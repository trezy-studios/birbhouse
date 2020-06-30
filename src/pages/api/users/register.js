// Local imports
import {
  auth,
  database,
  firebase,
  firebaseAdmin,
  firestore,
} from 'helpers/firebase.server'
import algoliasearch from 'algoliasearch/lite'
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





// Local constants
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex('profiles')





export const handler = async (request, response) => {
  const {
    email,
    password,
    username,
  } = request.body
  const errors = []

  if (!email) {
    errors.push('email is required.')
  }

  if (!password) {
    errors.push('password is required.')
  }

  if (!username) {
    errors.push('username is required.')
  }

  if (errors.length) {
    response.status(httpStatus.UNPROCESSABLE_ENTITY)
    response.end()
    return
  }

  const now = firebaseAdmin.firestore.Timestamp.now()

  const [
    defaultProfile,
    defaultSettings,
  ] = await Promise.all([
    database.ref('defaultProfile').once('value').then(snapshot => snapshot.val()),
    database.ref('defaultSettings').once('value').then(snapshot => snapshot.val()),
  ])

  let userID = null

  try {
    const userRecord = await auth.createUser({
      email,
      password,
    })
    userID = userRecord.uid
  } catch (error) {
    response.status(httpStatus.INTERNAL_SERVER_ERROR)
    response.json({ errors: [error.message] })
    response.end()
    return
  }

  const profile = {
    ...defaultProfile,
    displayName: username,
    username,
  }

  try {
    await Promise.all([
      firestore.collection('settings').doc(userID).set({ ...defaultSettings }),
      firestore.collection('profiles').doc(userID).set(profile),
    ])
  } catch (error) {
    response.status(httpStatus.INTERNAL_SERVER_ERROR)
    response.json({ errors: [error.message] })
    response.end()
    return
  }

  try {
    await index.saveObject({
      ...profile,
      objectID: userID,
    })
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
  allowedMethods: ['post'],
  handler,
})

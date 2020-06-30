// Local imports
import {
  firebaseAdmin,
  firestore,
} from '../src/helpers/firebase.server'
import algoliasearch from 'algoliasearch/lite'





// Local constants
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const profilesSearchIndex = algoliaClient.initIndex('profiles')





;(async () => {
  const profilesCollection = firestore.collection('profiles')
  const allProfiles = await profilesCollection.get()
  const promises = []

  allProfiles.forEach(doc => {
    promises.push(profilesSearchIndex.saveObject({
      ...doc.data(),
      objectID: doc.id,
    }))
  })

  await Promise.all(promises)

  await Promise.all([
    algoliaClient.destroy(),
    firebaseAdmin.apps[0].delete(),
  ])
})()

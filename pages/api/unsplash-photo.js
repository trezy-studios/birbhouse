// Local imports
import {
  firebase,
  firebaseAdmin,
  firestore,
} from 'helpers/firebase.server'
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
  const result = await fetch('https://api.unsplash.com/photos/random?query=birdhouse&orientation=portrait&content_filter=high', {
    headers: {
      'Accept-Version': 'v1',
      Authorization: `Client-ID ${process.env.unsplashAccessKey}`,
    },
  })
  const resultJSON = await result.json()

  response.status(httpStatus.OK)
  response.json({
    data: resultJSON,
  })
}





export default createEndpoint({
  allowedMethods: ['get'],
  handler,
})

// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
  const result = await fetch('https://api.unsplash.com/photos/random?query=birdhouse&orientation=portrait&content_filter=high', {
    headers: {
      'Accept-Version': 'v1',
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
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

// Module imports
import algoliasearch from 'algoliasearch/lite'





// Local imports
import { auth } from 'helpers/firebase.server'
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
  const { email } = request.query
  const errors = []

  if (!email) {
    errors.push('email is required.')
  }

  if (errors.length) {
    response.status(httpStatus.UNPROCESSABLE_ENTITY)
    response.end()
    return
  }

  try {
    let user = null

    try {
      user = await auth.getUserByEmail(email)
    } catch (error) {
      if (error.message === 'There is no user record corresponding to the provided identifier.') {
        response.status(httpStatus.OK)
        response.end()
        return
      }

      throw error
    }

    if (user) {
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

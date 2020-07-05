// Module imports
import { useEffect } from 'react'
import { useRouter } from 'next/router'





// Local imports
import { getQueryParams } from 'helpers/getQueryParams'





export const useAuthRedirect = (user, dependencies = []) => {
  const router = useRouter()
  const { destination } = getQueryParams()

	useEffect(() => {
    if (user) {
      router.push(destination || '/home')
    }
	}, [
    ...dependencies,
    user,
  ])
}

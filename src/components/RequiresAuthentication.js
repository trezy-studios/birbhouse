// Module imports
import React, {
	useContext,
	useEffect,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { Loader } from 'components/Loader'





export const RequiresAuthentication = props => {
	const { children } = props
	const Router = useRouter()
	const {
		isLoading,
		user,
	} = useContext(AuthContext)

	useEffect(() => {
		if ((typeof window !== 'undefined') && !isLoading && !user) {
			Router.replace(`/register?destination=${location.href.replace(location.origin, '')}`)
		}
	}, [
		isLoading,
		user,
	])

	if (isLoading || !user) {
		return (
			<Loader />
		)
	}

	return (
		<>{children}</>
	)
}

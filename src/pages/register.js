// Module imports
import React, {
	useContext,
} from 'react'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { RegistrationForm } from 'components/RegistrationForm'
import { SplitPage } from 'components/SplitPage'
import { useAuthRedirect } from 'hooks/useAuthRedirect'





const Register = () => {
	const { user } = useContext(AuthContext)

	useAuthRedirect(user)

	return (
		<SplitPage>
			<RegistrationForm />
		</SplitPage>
	)
}

Register.useLayout = false





export default Register

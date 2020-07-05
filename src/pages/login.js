// Module imports
import React, {
  useContext,
} from 'react'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { LoginForm } from 'components/LoginForm'
import { SplitPage } from 'components/SplitPage'
import { useAuthRedirect } from 'hooks/useAuthRedirect'





const Login = () => {
  const { user } = useContext(AuthContext)

  useAuthRedirect(user)

  return (
    <SplitPage>
      <main>
        <LoginForm />
      </main>
    </SplitPage>
  )
}

Login.useLayout = false





export default Login

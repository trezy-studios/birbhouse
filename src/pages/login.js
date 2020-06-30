// Module imports
import React, {
  useContext,
  useEffect,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { LoginForm } from 'components/LoginForm'
import { SplitPage } from 'components/SplitPage'





const Login = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])

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

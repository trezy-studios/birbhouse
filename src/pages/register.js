// Module imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { RegistrationForm } from 'components/RegistrationForm'
import { SplitPage } from 'components/SplitPage'





const Register = () => {
  const router = useRouter()
  const {
    isRegistering,
    user,
  } = useContext(AuthContext)

  useEffect(() => {
    if (user && !isRegistering) {
      router.push('/home')
    }
  }, [
    isRegistering,
    user,
  ])

  return (
    <SplitPage>
      <main>
        <RegistrationForm />
      </main>
    </SplitPage>
  )
}

Register.useLayout = false





export default Register

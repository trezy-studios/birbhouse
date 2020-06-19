// Module imports
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { auth } from 'helpers/firebase'





const AuthContext = React.createContext({
  login: () => {},
  register: () => {},
  user: null,
})





const AuthContextProvider = props => {
  const { children } = props
  const [user, setUser] = useState(null)

  const login = useCallback(async ({ email, password }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      return error
    }

    return null
  }, [])

  const logout = useCallback(async () => {
    try {
      await auth.signOut()
    } catch (error) {
      return error
    }

    return null
  }, [])

  const register = useCallback(async ({ email, password }) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      return error
    }

    return null
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [setUser])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}





export {
  AuthContext,
  AuthContextProvider,
}

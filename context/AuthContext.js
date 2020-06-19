// Module imports
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
  auth,
  firestore,
} from 'helpers/firebase'





const AuthContext = React.createContext({
  isLoading: true,
  isRegistering: false,
  login: () => {},
  profile: null,
  register: () => {},
  settings: null,
  user: null,
})
let profilesCollection = null
let settingsCollection = null





const AuthContextProvider = props => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [profile, setProfile] = useState(null)
  const [settings, setSettings] = useState(null)
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

  const register = useCallback(async options => {
    const {
      email,
      password,
      username,
    } = options

    setIsRegistering(true)

    if (!profilesCollection) {
      profilesCollection = firestore.collection('profiles')
    }

    if (!settingsCollection) {
      settingsCollection = firestore.collection('settings')
    }

    try {
      const {
        user: {
          uid: userID,
        },
      } = await auth.createUserWithEmailAndPassword(email, password)
      const newProfile = {
        bio: '',
        displayName: username,
        username,
      }
      const newSettings = {}

      await Promise.all([
        settingsCollection.doc(userID).set(newSettings),
        profilesCollection.doc(userID).set(newProfile),
      ])

      setProfile(newProfile)
      setSettings(newSettings)
      setIsRegistering(false)
      return null
    } catch (error) {
      setIsRegistering(false)
      return error
    }
  }, [
    setIsRegistering,
    setProfile,
    setSettings,
  ])

  useEffect(() => {
    auth.onAuthStateChanged(setUser)

    if (isLoading) {
      setIsLoading(false)
    }
  }, [
    setIsLoading,
    setUser,
  ])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isRegistering,
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

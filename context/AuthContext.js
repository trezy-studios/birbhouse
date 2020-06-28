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
  database,
  firestore,
} from 'helpers/firebase'





const AuthContext = React.createContext({
  isLoading: true,
  isLoadingProfile: true,
  isLoadingSettings: true,
  isRegistering: false,
  isUpdating: false,
  login: () => {},
  profile: null,
  register: () => {},
  settings: null,
  updateProfile: () => {},
  updateSettings: () => {},
  user: null,
})
const collections = {}
const refs = {}





const AuthContextProvider = props => {
  const { children } = props
  const [defaultProfile, setDefaultProfile] = useState(null)
  const [defaultSettings, setDefaultSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [profile, setProfile] = useState(null)
  const [settings, setSettings] = useState(null)
  const [user, setUser] = useState(null)

  if (firestore && !collections.profiles) {
    collections.profiles = firestore.collection('profiles')
  }

  if (firestore && !collections.settings) {
    collections.settings = firestore.collection('settings')
  }

  if (database && !refs.defaultProfile) {
    refs.defaultProfile = database.ref('defaultProfile')
  }

  if (database && !refs.defaultSettings) {
    refs.defaultSettings = database.ref('defaultSettings')
  }

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
      const newSettings = {
        theme: 'system',
      }

      await Promise.all([
        collections.settings.doc(userID).set(newSettings),
        collections.profiles.doc(userID).set(newProfile),
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

  const updateMap = useCallback(async (mapName, updates) => {
    setIsUpdating(true)

    try {
      await collections[mapName].doc(user.uid).update(updates)
      setIsUpdating(false)
      return null
    } catch (error) {
      setIsUpdating(false)
      return error
    }
  }, [
    setIsUpdating,
    user,
  ])

  const updateDefaultProfile = useCallback(snapshot => setDefaultProfile(snapshot.val()), [setDefaultProfile])
  const updateDefaultSettings = useCallback(snapshot => setDefaultSettings(snapshot.val()), [setDefaultSettings])
  const updateProfile = useCallback(updates => updateMap('profiles', updates), [updateMap])
  const updateSettings = useCallback(updates => updateMap('settings', updates), [updateMap])

  useEffect(() => {
    const unsubscribers = []

    refs.defaultProfile.on('value', updateDefaultProfile)
    refs.defaultSettings.on('value', updateDefaultSettings)
    unsubscribers.push(() => refs.defaultProfile.off('value', updateDefaultProfile))
    unsubscribers.push(() => refs.defaultSettings.off('value', updateDefaultSettings))

    unsubscribers.push(auth.onAuthStateChanged(user => {
      const userProfileRef = collections.profiles.doc(user.uid)
      const userSettingsRef = collections.settings.doc(user.uid)

      unsubscribers.push(userProfileRef.onSnapshot(doc => {
        setProfile(doc.data())
        setIsLoadingProfile(false)
      }))
      unsubscribers.push(userSettingsRef.onSnapshot(doc => {
        setSettings(doc.data())
        setIsLoadingSettings(false)
      }))

      setUser(user)
      setIsLoading(false)
    }))

    return () => {
      unsubscribers.forEach(unsubscriber => unsubscriber())
    }
  }, [
    setDefaultProfile,
    setDefaultSettings,
    setIsLoading,
    setIsLoading,
    setIsLoadingProfile,
    setIsLoadingSettings,
    setProfile,
    setSettings,
    setUser,
  ])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoadingProfile,
        isLoadingSettings,
        isRegistering,
        isUpdating,
        login,
        logout,
        profile: {
          ...defaultProfile,
          ...profile,
        },
        register,
        settings: {
          ...defaultSettings,
          ...settings,
        },
        updateProfile,
        updateSettings,
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

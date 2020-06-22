// Module imports
import React, {
  useCallback,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
  firestore,
} from 'helpers/firebase'





const ProfilesContext = React.createContext({
  addUser: () => {},
  clear: () => {},
  profiles: {},
})
let profilesCollection = null





const ProfilesContextProvider = props => {
  const { children } = props
  const [profiles, setProfiles] = useState({})
  const unsubscribers = useRef([])
  const monitoredUsers = useRef({})

  if (firestore && !profilesCollection) {
    profilesCollection = firestore.collection('profiles')
  }

  const addUser = useCallback(userID => {
    if (!monitoredUsers.current[userID]) {
      monitoredUsers.current[userID] = true

      unsubscribers.current.push(profilesCollection.doc(userID).onSnapshot(doc => {
        setProfiles(oldProfiles => ({
          ...oldProfiles,
          [userID]: {
            ...doc.data(),
          },
        }))
      }))
    }
  }, [setProfiles])

  const clear = useCallback(() => {
    const monitoredUserIDs = Object.keys(monitoredUsers.current)
    monitoredUserIDs.forEach(userID => {
      delete monitoredUserIDs.current[userID]
    })
    unsubscribers.current.forEach(unsubscriber => unsubscriber())
  }, [unsubscribers])

  return (
    <ProfilesContext.Provider
      value={{
        addUser,
        clear,
        profiles,
      }}>
      {children}
    </ProfilesContext.Provider>
  )
}

ProfilesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}





export {
  ProfilesContext,
  ProfilesContextProvider,
}

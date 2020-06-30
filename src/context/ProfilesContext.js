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
  const profilesByUsername = useRef({})
  const unsubscribers = useRef([])
  const monitoredUsers = useRef({})

  if (firestore && !profilesCollection) {
    profilesCollection = firestore.collection('profiles')
  }

  const handleSnapshot = useCallback(doc => {
    const data = {
      ...doc.data(),
      id: doc.id,
    }

    profilesByUsername.current[data.username] = data

    setProfiles(oldProfiles => ({
      ...oldProfiles,
      [doc.id]: {
        ...data,
      },
    }))
  }, [setProfiles])

  const addUser = useCallback(userID => {
    if (!monitoredUsers.current[userID]) {
      monitoredUsers.current[userID] = true

      const unsubscribe = profilesCollection
        .doc(userID)
        .onSnapshot(handleSnapshot)
      unsubscribers.current.push(unsubscribe)
    }
  }, [handleSnapshot])

  const addUserByUsername = useCallback(username => {
    const userIsMonitored = Object.entries(monitoredUsers.current).some(([userID, userData]) => {
      return userData.username === username
    })

    if (!userIsMonitored) {
      const unsubscribe = profilesCollection
        .where('username', '==', username)
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            monitoredUsers.current[doc.id] = true
            handleSnapshot(doc)
          })
        })
      unsubscribers.current.push(unsubscribe)
    }
  }, [handleSnapshot])

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
        addUserByUsername,
        clear,
        profiles,
        profilesByUsername: profilesByUsername.current,
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

// Module imports
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
  firebase,
  firestore,
} from 'helpers/firebase'





const TweetContext = React.createContext({
  sendTweet: () => {},
  tweets: [],
})
let tweetsCollection = null





const TweetContextProvider = props => {
  const {
    authorID,
    children,
    includeDrafts,
  } = props

  const [tweets, setTweets] = useState([])

  const sendTweet = useCallback(async tweet => {
    const now = firebase.firestore.Timestamp.now()

    try {
      await tweetsCollection.add({
        ...tweet,
        createdAt: now,
        updatedAt: now,
      })
    } catch (error) {
      return error
    }

    return null
  }, [])

  useEffect(() => {
    if (!tweetsCollection) {
      tweetsCollection = firestore.collection('tweets')
    }

    let tweetsQuery = tweetsCollection

    if (!includeDrafts) {
      tweetsQuery = tweetsQuery.where('isDraft', '==', false)
    }

    if (authorID) {
      tweetsQuery = tweetsQuery.where('authorID', '==', authorID)
    }

    tweetsQuery
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
      const changes = snapshot.docChanges()

      changes.forEach(change => {
        const { doc } = change

        switch (change.type) {
          case 'removed':
            setTweets(oldTweets => oldTweets.filter(({ id }) => (id !== doc.id)))
            break

          case 'added':
          case 'modified':
          default:
            setTweets(oldTweets => [
              {
                id: doc.id,
                ...doc.data(),
              },
              ...oldTweets,
            ])
        }
      })
    })
  }, [setTweets])

  return (
    <TweetContext.Provider
      value={{
        sendTweet,
        tweets,
      }}>
      {children}
    </TweetContext.Provider>
  )
}

TweetContextProvider.defaultProps = {
  authorID: null,
  includeDrafts: false,
}

TweetContextProvider.propTypes = {
  authorID: PropTypes.string,
  children: PropTypes.node.isRequired,
  includeDrafts: PropTypes.bool,
}

export {
  TweetContext,
  TweetContextProvider,
}

// Module imports
import React, {
  useContext,
} from 'react'
import { firestore } from 'helpers/firebase'
import Link from 'next/link'
import moment from 'moment'





// Local imports
import { Tweet } from 'components/Tweet'
import { TweetContext } from 'context/TweetContext'
import { TweetForm } from 'components/TweetForm'





export const TweetFeed = () => {
  const { tweets } = useContext(TweetContext)

  return (
    <>
      <TweetForm />

      <ol>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <Tweet {...tweet} />
          </li>
        ))}
      </ol>
    </>
  )
}

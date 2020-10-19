// Module imports
import React, {
	useContext,
} from 'react'
import { firestore } from 'helpers/firebase'
import Link from 'next/link'
import moment from 'moment'





// Local imports
import { Tweet } from 'components/Tweet'
import { TweetsContext } from 'context/TweetsContext'
import { TweetForm } from 'components/TweetForm'





export const TweetFeed = () => {
	const { tweets } = useContext(TweetsContext)

	return (
		<>
			{!tweets.length && (
				<div>No tweets to show</div>
			)}

			{Boolean(tweets.length) && (
				<ol className="feed">
					{tweets.map(tweet => (
						<li
							className="block"
							key={tweet.id}>
							<Tweet {...tweet} />
						</li>
					))}
				</ol>
			)}
		</>
	)
}

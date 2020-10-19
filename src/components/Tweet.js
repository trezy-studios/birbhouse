// Module imports
import React, {
  useContext,
} from 'react'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'





// Local imports
import { MarkdownRenderer } from 'components/MarkdownRenderer'
import { ProfilesContext } from 'context/ProfilesContext'





const Tweet = props => {
  const {
    addUser,
    profiles,
  } = useContext(ProfilesContext)
  const {
    authorID,
    body,
    createdAt,
    id,
  } = props

  const authorProfile = profiles[authorID]

  if (!authorProfile) {
    addUser(authorID)

    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="box">
			<article className="media">
				<figure className="media-left">
					<div className="image is-64x64">
						<img
							className="avatar"
							src={authorProfile.avatar || `https://api.adorable.io/avatars/64/${authorProfile.username}`} />
					</div>
				</figure>

				<div className="media-content">
					<header>
						<Link
							as={`/${authorProfile.username}`}
							href="/[username]">
							<a><strong>{authorProfile.displayName}</strong></a>
						</Link>
						{' '}
						<Link href="/user/status/statusID">
							<a>
								<small>
									{`@${authorProfile.username} — `}
									<time>
										{moment(createdAt.seconds * 1000).fromNow(true)}
									</time>
								</small>
							</a>
						</Link>
					</header>

					<div className="body">
						<MarkdownRenderer source={body} />
					</div>
				</div>
			</article>
		</div>
  )
}

Tweet.propTypes = {
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}

export { Tweet }

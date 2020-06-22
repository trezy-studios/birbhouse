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
    <article className="tweet">
      <img
        className="avatar"
        src={authorProfile.avatar || `https://api.adorable.io/avatars/50/${authorProfile.username}`} />
      <header>
        <Link
          as={`/${authorProfile.username}`}
          href="/[username]">
          <a>{authorProfile.displayName}</a>
        </Link>
        <Link href="/user/status/statusID">
          <a>
            {`@${authorProfile.username} — `}
            <time>
              {moment(createdAt.seconds * 1000).fromNow(true)}
            </time>
          </a>
        </Link>
      </header>

      <div className="body">
        <MarkdownRenderer source={body} />
      </div>
    </article>
  )
}

Tweet.propTypes = {
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}

export { Tweet }

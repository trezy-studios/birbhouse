// Module imports
import React, {
  useContext,
} from 'react'
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'





// Local imports
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

  console.log({ authorProfile })

  if (!authorProfile) {
    addUser(authorID)

    return (
      <div>Loading...</div>
    )
  }

  return (
    <article>
      <header>
        <Link href="/author">
          <a>{authorProfile.username}</a>
        </Link>
        &mdash;
        <Link href="/user/status/statusID">
          <a>
            <time>
              {moment(createdAt.seconds * 1000).fromNow(true)}
            </time>
          </a>
        </Link>
      </header>

      {body}
    </article>
  )
}

Tweet.propTypes = {
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}

export { Tweet }

// Module imports
import Link from 'next/link'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'





const Tweet = props => {
  const {
    body,
    createdAt,
    id,
  } = props

  return (
    <article>
      <header>
        <Link href="/author">
          <a>Author!</a>
        </Link>
        &mdash;
        <Link href="/user/status/statusID">
          <a>
            <time>{moment(createdAt.seconds * 1000).fromNow(true)}</time>
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

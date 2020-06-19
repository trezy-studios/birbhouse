// Module imports
import React, {
  useCallback,
  useContext,
  useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { TweetsContext } from 'context/TweetsContext'
import { Input } from 'components/Input'





// Local constants
const MAX_TWEET_LENGTH = 280





const TweetForm = props => {
  const { redirectTo } = props
  const { user } = useContext(AuthContext)
  const { sendTweet } = useContext(TweetsContext)
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [isDraft, setIsDraft] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = useCallback(event => setBody(event.target.value), [setBody])
  const handleSaveDraft = useCallback(event => setIsDraft(true), [setIsDraft])
  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    setIsSaving(true)
    setError(null)

    const error = await sendTweet({
      authorID: user.uid,
      body,
      isDraft,
    })

    if (error) {
      setIsSaving(false)
      setError(error)
    } else {
      setBody('')
      setIsDraft(false)
      setIsSaving(false)
    }
  }, [
    body,
    isDraft,
    sendTweet,
    setBody,
    setError,
    setIsDraft,
    setIsSaving,
    user,
  ])

  const canSubmit = Boolean(user) && Boolean(body) && !isSaving

  return (
    <form
      action="/api/send-tweet"
      method="post"
      onSubmit={handleSubmit}>
      <Input
        multiline
        name="body"
        onChange={handleChange}
        placeholder="What's happening?"
        required
        value={body} />

      <Input
        name="authorID"
        type="hidden"
        value={user?.uid} />

      <Input
        name="redirectTo"
        type="hidden"
        value={redirectTo} />

      <menu type="toolbar">
        <button
          className="primary"
          disabled={!canSubmit || (body.length > MAX_TWEET_LENGTH)}
          type="submit">
          Tweet
        </button>

        <button
          className="secondary"
          disabled={!canSubmit}
          formction="/api/send-tweet?isDraft"
          onClick={handleSaveDraft}
          type="submit">
          Save Draft
        </button>

        {(body.length >= (MAX_TWEET_LENGTH - 60)) && (
          <span
            className={classnames({
              'text-primary': (body.length < (MAX_TWEET_LENGTH - 20)),
              'text-warning': (body.length >= (MAX_TWEET_LENGTH - 20)) && (body.length <= MAX_TWEET_LENGTH),
              'text-danger': (body.length > MAX_TWEET_LENGTH),
            })}>
            {MAX_TWEET_LENGTH - body.length}
          </span>
        )}
      </menu>

      {Boolean(error) && (
        <div>{error.message}</div>
      )}
    </form>
  )
}

TweetForm.defaultProps = {
  redirectTo: '/home',
}

TweetForm.propTypes = {
  redirectTo: PropTypes.string,
}

export { TweetForm }

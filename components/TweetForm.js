// Module imports
import React, {
  useCallback,
  useContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { TweetContext } from 'context/TweetContext'





const TweetForm = props => {
  const { redirectTo } = props
  const { sendTweet } = useContext(TweetContext)
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
  ])

  const canSubmit = Boolean(body) && !isSaving

  return (
    <form
      action="/api/send-tweet"
      method="post"
      onSubmit={handleSubmit}>
      <input
        name="body"
        onChange={handleChange}
        placeholder="What's happening?"
        required
        type="text"
        value={body} />

      <input
        name="redirectTo"
        type="hidden"
        value={redirectTo} />

      <button
        className="primary"
        disabled={!canSubmit}
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

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
import { CharacterCount } from 'components/CharacterCount'
import { ProfilesContext } from 'context/ProfilesContext'
import { TweetsContext } from 'context/TweetsContext'
import { Input } from 'components/Input'





// Local constants
const MAX_TWEET_LENGTH = 256





const TweetForm = props => {
	const { redirectTo } = props
	const { user } = useContext(AuthContext)
	const { sendTweet } = useContext(TweetsContext)
	const { profiles } = useContext(ProfilesContext)
	const [body, setBody] = useState('')
	const [error, setError] = useState(null)
	const [isDraft, setIsDraft] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	const userProfile = profiles[user.uid]

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
		<>
			<form
				action="/api/send-tweet"
				className="media"
				method="post"
				onSubmit={handleSubmit}>
				<figure className="media-left">
					<p className="image is-64x64">
						<img src={userProfile?.avatar || `https://api.adorable.io/avatars/64/${userProfile?.username}`} />
					</p>
				</figure>

				<div className="media-content">
					<div className="field">
						<Input
							allowOverflow
							maxLength={MAX_TWEET_LENGTH}
							multiline
							name="body"
							onChange={handleChange}
							placeholder="What's happening?"
							required
							showCharacterCount={false}
							value={body} />
					</div>

					<input
						name="authorID"
						type="hidden"
						value={user?.uid} />

					<input
						name="redirectTo"
						type="hidden"
						value={redirectTo} />

					<div className="level">
						<div className="level-left">
							<div className="level-item">
								<CharacterCount
									maxLength={MAX_TWEET_LENGTH}
									value={body} />
							</div>

							<div className="level-item">
								{Boolean(error) && (
									<div>{error.message}</div>
								)}
							</div>
						</div>

						<div className="level-right">
							<div className="level-item">
								<button
									className={classnames({
										button: true,
										'is-loading': isSaving && !isDraft,
										'is-primary': true,
									})}
									disabled={!canSubmit || (body.length > MAX_TWEET_LENGTH)}
									type="submit">
									Tweet
								</button>
							</div>

							<div className="level-item">
								<button
									className={classnames({
										button: true,
										'is-loading': isSaving && isDraft,
										'is-info': true,
									})}
									disabled={!canSubmit}
									formction="/api/send-tweet?isDraft"
									onClick={handleSaveDraft}
									type="submit">
									Save Draft
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>

			<hr />
		</>
	)
}

TweetForm.defaultProps = {
	redirectTo: '/home',
}

TweetForm.propTypes = {
	redirectTo: PropTypes.string,
}

export { TweetForm }

// Module imports
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { Input } from 'components/Input'





// Local constants
const MAX_BIO_LENGTH = 256
const MAX_DISPLAY_NAME_LENGTH = 64
const MAX_USERNAME_LENGTH = 16





export const AccountSettings = () => {
	const {
		isUpdating,
		profile,
		updateProfile,
	} = useContext(AuthContext)
	const [displayName, setDisplayName] = useState(profile.displayName)
	const [bio, setBio] = useState(profile.bio)
	const [error, setError] = useState(null)
	const [username, setUsername] = useState(profile.username)

	const bioIsDirty = bio !== profile.bio
	const displayNameIsDirty = displayName !== profile.displayName
	const usernameIsDirty = username !== profile.username

	const formIsDirty = bioIsDirty || displayNameIsDirty || usernameIsDirty

	const handleBioChange = useCallback(event => setBio(event.target.value), [setBio])
	const handleDisplayNameChange = useCallback(event => setDisplayName(event.target.value), [setDisplayName])
	const handleUsernameChange = useCallback(event => setUsername(event.target.value), [setUsername])
	const handleSave = useCallback(async event => {
		event.preventDefault()

		const updates = {}

		if (bioIsDirty) {
			updates.bio = bio
		}

		if (displayNameIsDirty) {
			updates.displayName = displayName
		}

		if (usernameIsDirty) {
			updates.username = username
		}

		const error = await updateProfile(updates)

		if (error) {
			setError(error)
		}
	}, [
		bio,
		displayName,
		setError,
		updateProfile,
		username,
	])

	useEffect(() => {
		if (displayName !== profile.displayName) {
			setDisplayName(profile.displayName)
		}

		if (bio !== profile.bio) {
			setBio(profile.bio)
		}

		if (username !== profile.username) {
			setUsername(profile.username)
		}
	}, [
		profile.displayName,
		profile.bio,
		profile.username,
		setDisplayName,
		setBio,
		setUsername,
	])

	return (
		<form onSubmit={handleSave}>
			{Boolean(error) && (
				<span>{error.message}</span>
			)}

			<div className="field">
				<label
					className="label"
					htmlFor="account-settings::displayName">
					Display Name
				</label>

				<div className="field">
					<Input
						id="account-settings::displayName"
						maxLength={MAX_DISPLAY_NAME_LENGTH}
						onChange={handleDisplayNameChange}
						value={displayName} />
				</div>
			</div>

			<div className="field">
				<label
					className="label"
					htmlFor="account-settings::username">
					Username
				</label>

				<div className="field">
					<Input
						id="account-settings::username"
						maxLength={MAX_USERNAME_LENGTH}
						onChange={handleUsernameChange}
						value={username} />
				</div>
			</div>

			<div className="field">
				<label
					className="label"
					htmlFor="account-settings::bio">
					Bio
				</label>

				<div className="field">
					<Input
						id="account-settings::bio"
						maxLength={MAX_BIO_LENGTH}
						multiline
						onChange={handleBioChange}
						value={bio} />
				</div>
			</div>

			<div className="level">
				<div className="level-left">
				</div>
				<div className="level-right">
					<div className="level-item">
						<button
							className={classnames({
								'button': true,
								'is-loading': isUpdating,
								'is-primary': true,
							})}
							disabled={!formIsDirty || isUpdating}
							type="submit">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}

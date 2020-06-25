// Module imports
import React, {
  useCallback,
  useContext,
  useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { Input } from 'components/Input'





// Local constants
const MAX_DISPLAY_NAME_LENGTH = 64
const MAX_USERNAME_LENGTH = 16





export const AccountSettings = () => {
  const {
    isUpdating,
    profile,
    updateProfile,
  } = useContext(AuthContext)
  const [displayName, setDisplayName] = useState(profile.displayName)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(profile.username)

  const handleDisplayNameChange = useCallback(event => setDisplayName(event.target.value), [setDisplayName])
  const handleUsernameChange = useCallback(event => setUsername(event.target.value), [setUsername])
  const handleSave = useCallback(async event => {
    event.preventDefault()

    const error = await updateProfile({
      displayName,
      username,
    })

    if (error) {
      setError(error)
    }
  }, [
    displayName,
    setError,
    updateProfile,
    username,
  ])

  const displayNameIsDirty = displayName !== profile.displayName
  const usernameIsDirty = username !== profile.username

  const formIsDirty = displayNameIsDirty || usernameIsDirty

  return (
    <form onSubmit={handleSave}>
      {Boolean(error) && (
        <span>{error.message}</span>
      )}

      <fieldset>
        <label htmlFor="account-settings::displayName">Display Name</label>

        <Input
          id="account-settings::displayName"
          maxLength={MAX_DISPLAY_NAME_LENGTH}
          onChange={handleDisplayNameChange}
          value={displayName} />
      </fieldset>

      <fieldset>
        <label htmlFor="account-settings::username">Username</label>

        <Input
          id="account-settings::username"
          maxLength={MAX_USERNAME_LENGTH}
          onChange={handleUsernameChange}
          value={username} />
      </fieldset>

      <menu type="toolbar">
        <button
          className="primary"
          disabled={!formIsDirty || isUpdating}
          type="submit">
          Save Changes
        </button>
      </menu>
    </form>
  )
}

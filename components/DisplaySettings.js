// Module imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'





// Local constants
const THEME_OPTIONS = [
  {
    title: 'Dark',
    value: 'dark',
  },
  {
    title: 'Light',
    value: 'light',
  },
  {
    title: 'System',
    value: 'system',
  },
]





export const DisplaySettings = () => {
  const {
    isUpdating,
    settings,
    updateSettings,
  } = useContext(AuthContext)
  const [theme, setTheme] = useState(settings.theme)
  const [error, setError] = useState(null)

  const themeIsDirty = theme !== settings.theme

  const formIsDirty = themeIsDirty

  const handleThemeChange = useCallback(event => setTheme(event.target.value), [setTheme])
  const handleSave = useCallback(async event => {
    event.preventDefault()

    const updates = {}

    if (themeIsDirty) {
      updates.theme = theme
    }

    const error = await updateSettings(updates)

    if (error) {
      setError(error)
    }
  }, [
    theme,
    setError,
    updateSettings,
  ])

  useEffect(() => {
    if (theme !== settings.theme) {
      setTheme(settings.theme)
    }
  }, [
    setTheme,
    settings.theme,
  ])

  return (
    <form onSubmit={handleSave}>
      {Boolean(error) && (
        <span>{error.message}</span>
      )}

      <fieldset>
        <label htmlFor="account-settings::theme">Theme</label>

        <select
          onChange={handleThemeChange}
          value={theme}>
          {THEME_OPTIONS.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.title}
            </option>
          ))}
        </select>

        {/* <Input
          id="account-settings::theme"
          maxLength={MAX_DISPLAY_NAME_LENGTH}
          onChange={handleDisplayNameChange}
          value={displayName} /> */}
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

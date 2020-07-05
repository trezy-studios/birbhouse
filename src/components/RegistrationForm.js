// Module imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { getQueryParams } from 'helpers/getQueryParams'
import { Input } from 'components/Input'





export const RegistrationForm = () => {
  const {
    isRegistering,
    register,
    user,
  } = useContext(AuthContext)
  const { destination } = getQueryParams()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleEmailChange = useCallback(event => setEmail(event.target.value), [setEmail])
  const handlePasswordChange = useCallback(event => setPassword(event.target.value), [setPassword])
  const handleUsernameChange = useCallback(event => setUsername(event.target.value), [setUsername])
  const handleSubmit = useCallback(async event => {
    event.preventDefault()

    const error = await register({
      email,
      password,
      username,
    })

    if (error) {
      setError(error)
    }
  }, [
    email,
    password,
    setError,
    username,
  ])

  const loginLink = `/login${destination ? `?destination=${destination}` : ''}`

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>Create an Account</h2>
      </header>
      <Input
        name="username"
        onChange={handleUsernameChange}
        placeholder="Username (e.g Trezy)"
        required
        value={username} />

      <Input
        name="email"
        onChange={handleEmailChange}
        placeholder="Email"
        required
        type="email"
        value={email} />

      <Input
        name="password"
        onChange={handlePasswordChange}
        placeholder="Password"
        required
        type="password"
        value={password} />

      <menu type="toolbar">
        <button
          className="primary"
          disabled={!canSubmit}
          type="submit">
          Register
        </button>

        <span>
          Already have an account? <Link href={loginLink}><a>Login</a></Link>.
        </span>
      </menu>

      {Boolean(error) && (
        <div>{error.message}</div>
      )}
    </form>
  )
}

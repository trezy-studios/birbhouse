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





const LoginForm = () => {
  const {
    login,
    logout,
  } = useContext(AuthContext)
  const { destination } = getQueryParams()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleEmailChange = useCallback(event => setEmail(event.target.value), [setEmail])
  const handlePasswordChange = useCallback(event => setPassword(event.target.value), [setPassword])
  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    setIsLoggingIn(true)

    const error = await login({
      email,
      password,
    })

    if (error) {
      setError(error)
      setIsLoggingIn(false)
    }
  }, [
    email,
    password,
  ])

  const canSubmit = !isLoggingIn && Boolean(email) && Boolean(password)
  const registerLink = `/register${destination ? `?destination=${destination}` : ''}`

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>Login</h2>
      </header>
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
          Login
        </button>

        <span>
          Need to <Link href={registerLink}><a>create an account</a></Link>?
        </span>
      </menu>

      {Boolean(error) && (
        <div>{error.message}</div>
      )}
    </form>
  )
}





export { LoginForm }

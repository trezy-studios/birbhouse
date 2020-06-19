// Module imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { AuthContext } from 'context/AuthContext'





const Register = () => {
  const router = useRouter()
  const {
    isRegistering,
    register,
    user,
  } = useContext(AuthContext)
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

  useEffect(() => {
    if (user && !isRegistering) {
      router.push('/home')
    }
  }, [
    isRegistering,
    user,
  ])

  const canSubmit = !isRegistering && Boolean(email) && Boolean(password)

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleUsernameChange}
        placeholder="Username (e.g Trezy)"
        required
        type="username"
        value={username} />

      <input
        name="email"
        onChange={handleEmailChange}
        placeholder="Email"
        required
        type="email"
        value={email} />

      <input
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
      </menu>

      {Boolean(error) && (
        <div>{error.message}</div>
      )}
    </form>
  )
}





export default Register

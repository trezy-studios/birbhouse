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
    register,
    user,
  } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleEmailChange = useCallback(event => setEmail(event.target.value), [setEmail])
  const handlePasswordChange = useCallback(event => setPassword(event.target.value), [setPassword])
  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    setIsRegistering(true)

    const error = await register({
      email,
      password,
    })

    if (error) {
      setError(error)
      setIsRegistering(false)
    }
  }, [
    email,
    password,
  ])

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])

  const canSubmit = !isRegistering && Boolean(email) && Boolean(password)

  return (
    <form onSubmit={handleSubmit}>
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

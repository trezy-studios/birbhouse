// Module imports
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import classnames from 'classnames'
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
		<form
			className="is-flex-grow-1 section"
			onSubmit={handleSubmit}>
			<header>
				<h2 className="title">Login</h2>
			</header>

			<div className="field">
				<Input
					name="email"
					onChange={handleEmailChange}
					placeholder="Email"
					required
					type="email"
					value={email} />
			</div>

			<div className="field">
				<Input
					name="password"
					onChange={handlePasswordChange}
					placeholder="Password"
					required
					type="password"
					value={password} />
			</div>

			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<span>Need to <Link href={registerLink}><a>create an account</a></Link>?</span>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<button
							className={classnames({
								button: true,
								'is-loading': isLoggingIn,
								'is-primary': true,
							})}
							disabled={!canSubmit}
							type="submit">
							Login
						</button>
					</div>
				</div>
			</div>

			{Boolean(error) && (
				<div>{error.message}</div>
			)}
		</form>
	)
}





export { LoginForm }

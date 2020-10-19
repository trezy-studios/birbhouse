// Module imports
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	CancelToken,
	isCancel,
} from 'axios'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { getQueryParams } from 'helpers/getQueryParams'
import { Input } from 'components/Input'
import { useAsync } from 'hooks/useAsync'
import APIService from 'services/api'
import httpStatus from 'helpers/httpStatus'





// Local constants
const checkAvailability = async options => {
	const {
		cancelToken,
		type,
		value,
	} = options

	let isAvailable = true

	try {
		await APIService().get(`/users/check-${type}?${type}=${value}`, { cancelToken })
	} catch (error) {
		if (!isCancel(error) && error.response?.status === httpStatus.CONFLICT) {
			isAvailable = false
		}
	}

	return isAvailable
}
const checkEmailAvailability = options => {
	return checkAvailability({
		...options,
		type: 'email',
	})
}
const checkUsernameAvailability = options => {
	return checkAvailability({
		...options,
		type: 'username',
	})
}





export const RegistrationForm = () => {
	const {
		isRegistering,
		register,
		user,
	} = useContext(AuthContext)
	const { destination } = getQueryParams()
	const [email, setEmail] = useState('')
	const [emailIsAvailable, setEmailIsAvailable] = useState(true)
	const [error, setError] = useState(null)
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [usernameIsAvailable, setUsernameIsAvailable] = useState(true)
	const cancelTokens = useRef({})
	const emailInputRef = useRef(null)

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

	useAsync(async () => {
		if (!email) {
			return
		}

		if (!emailInputRef.current.validity.typeMismatch) {
			cancelTokens.current.emailAvailability?.cancel()
			cancelTokens.current.emailAvailability = CancelToken.source()
			const isAvailable = await checkEmailAvailability({
				cancelToken: cancelTokens.current.emailAvailability.token,
				value: email,
			})

			if (emailIsAvailable !== isAvailable) {
				setEmailIsAvailable(isAvailable)
			}
		}
	}, [
		setEmailIsAvailable,
		email,
	])
	useAsync(async () => {
		if (!username) {
			return
		}

		cancelTokens.current.usernameAvailability?.cancel()
		cancelTokens.current.usernameAvailability = CancelToken.source()
		const isAvailable = await checkUsernameAvailability({
			cancelToken: cancelTokens.current.usernameAvailability.token,
			value: username,
		})

		if (usernameIsAvailable !== isAvailable) {
			setUsernameIsAvailable(isAvailable)
		}
	}, [
		setUsernameIsAvailable,
		username,
	])
	useEffect(() => {
		if (!usernameIsAvailable) {
			emailInputRef.current.setCustomValidity('Username is unavailable')
		} else {
			emailInputRef.current.setCustomValidity('')
		}
	}, [email])

	const canSubmit = !isRegistering && Boolean(email) && Boolean(password) && emailIsAvailable && usernameIsAvailable
	const loginLink = `/login${destination ? `?destination=${destination}` : ''}`

	return (
		<form
			className="is-flex-grow-1 section"
			onSubmit={handleSubmit}>
			<header>
				<h2 className="title">Create an Account</h2>
			</header>

			<div className="field">
				<Input
					name="username"
					onChange={handleUsernameChange}
					placeholder="Username (e.g Trezy)"
					required
					value={username} />
			</div>

			<div className="field">
				<Input
					name="email"
					onChange={handleEmailChange}
					placeholder="Email"
					ref={emailInputRef}
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
						<span>Already have an account? <Link href={loginLink}><a>Login</a></Link>.</span>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<button
							className={classnames({
								button: true,
								'is-loading': isRegistering,
								'is-primary': true,
							})}
							disabled={!canSubmit}
							type="submit">
							Register
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

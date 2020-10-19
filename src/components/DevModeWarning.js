// Module imports
import React, {
	useCallback,
	useState,
} from 'react'
import LocalForage from 'localforage'





// Local imports
import { useAsync } from 'hooks/useAsync'





export const DevModeWarning = () => {
	const [isDismissed, setIsDismissed] = useState(true)

	useAsync(async () => {
		const localDismissedState = await LocalForage.getItem('dev-mode-warning-dismissed')

		if (isDismissed !== localDismissedState) {
			setIsDismissed(localDismissedState)
		}
	}, [setIsDismissed])

	const handleClose = useCallback(() => {
		LocalForage.setItem('dev-mode-warning-dismissed', true)
		setIsDismissed(true)
	}, [setIsDismissed])

	if (isDismissed) {
		return null
	}

	return (
		<div className="message is-warning">
			<header className="message-header">
				<strong>WARNING</strong>

				<button
					className="delete"
					onClick={handleClose} />
			</header>

			<div className="message-body">
				<p>BirbHouse is currently in very, <em>very</em>, <strong><em>very</em></strong> early Alpha. All tweets, profiles, settings, accounts, and anything else on this website is subject to change <strong>at any time</strong>.</p>
			</div>

			{/* <menu type="toolbar">
				<button
					className="close secondary"
					onClick={handleClose}
					type="button">
					&times; Dismiss
				</button>
			</menu> */}
		</div>
	)
}

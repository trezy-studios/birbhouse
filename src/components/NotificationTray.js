// Module imports
import React, {
	useContext,
} from 'react'
import classnames from 'classnames'





// Local imports
import { DevModeWarning } from 'components/DevModeWarning'
import { NotificationsContext } from 'context/NotificationsContext'





export function NotificationTray() {
	const { notifications } = useContext(NotificationsContext)

	return (
		<section className="notification-tray">
			<DevModeWarning />
			{notifications.map(notification => (
				<li key={notification.id}>
					<div
						className={classnames({
							[`is-${notification.type}`]: true,
						})}>
						<div className="message-header">
							{notification.title}
						</div>

						<div className="message-body">
							{notification.body}
						</div>
					</div>
				</li>
			))}
		</section>
	)
}

// Module imports
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
	firebase,
	firestore,
} from 'helpers/firebase'





const NotificationsContext = React.createContext({
	addNotification: () => {},
	notifications: [],
})





const NotificationsContextProvider = props => {
	const {
		userID,
		children,
	} = props

	const [notifications, setNotifications] = useState([])

	const addNotification = useCallback(async notification => {
		setNotifications(oldNotifications => ([
			...oldNotifications,
			notification,
		]))
	}, [])

	// useEffect(() => {
	// 	if (!tweetsCollection) {
	// 		tweetsCollection = firestore.collection('tweets')
	// 	}

	// 	let tweetsQuery = tweetsCollection

	// 	if (!includeDrafts) {
	// 		tweetsQuery = tweetsQuery.where('isDraft', '==', false)
	// 	}

	// 	if (authorID) {
	// 		tweetsQuery = tweetsQuery.where('authorID', '==', authorID)
	// 	}

	// 	return tweetsQuery
	// 		.orderBy('createdAt')
	// 		.onSnapshot(snapshot => {
	// 			const changes = snapshot.docChanges()

	// 			changes.forEach(change => {
	// 				const { doc } = change

	// 				switch (change.type) {
	// 					case 'removed':
	// 						setTweets(oldTweets => oldTweets.filter(({ id }) => (id !== doc.id)))
	// 						break

	// 					case 'added':
	// 					case 'modified':
	// 					default:
	// 						setTweets(oldTweets => [
	// 							{
	// 								id: doc.id,
	// 								...doc.data(),
	// 							},
	// 							...oldTweets,
	// 						])
	// 				}
	// 			})
	// 		})
	// }, [setTweets])

	return (
		<NotificationsContext.Provider
			value={{
				addNotification,
				notifications,
			}}>
			{children}
		</NotificationsContext.Provider>
	)
}

NotificationsContextProvider.defaultProps = {
	userID: null,
}

NotificationsContextProvider.propTypes = {
	userID: PropTypes.string,
	children: PropTypes.node.isRequired,
}

export {
	NotificationsContext,
	NotificationsContextProvider,
}

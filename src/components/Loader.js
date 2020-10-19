// Module imports
import {
	animated,
	useTransition,
} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





export const Loader = () => {
	const loaderTransition = useTransition(true, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	return loaderTransition.map(({ key, props }) => (
		<animated.div
			className="loader"
			key={key}
			style={props}>
			<span>
				<FontAwesomeIcon
					fixedWidth
					icon="circle-notch"
					size="2x"
					spin />
			</span>

			<span>Loading</span>
		</animated.div>
	))
}

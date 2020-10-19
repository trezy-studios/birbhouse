// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'





// Local constants
const CIRCLE_RADIUS = 15





const CharacterCount = props => {
	const {
		maxLength,
		value,
	} = props

	const circumference = 2 * Math.PI * CIRCLE_RADIUS
	const completionPercentage = value.length / maxLength
	const fillAmount = Math.min(circumference, circumference * completionPercentage)

	const isAllGood = value.length < (maxLength * 0.75)
	const isInWarningZone = (value.length >= (maxLength * 0.75)) && (value.length < maxLength)
	const isInDangerZone = value.length >= maxLength

	return (
		<span
			className={classnames({
				'character-count': true,
				'has-text-primary': isAllGood,
				'has-text-warning': isInWarningZone,
				'has-text-danger': isInDangerZone,
			})}
			hidden={!value}>
			<svg>
				<circle
					className="progress-value"
					cx="50%"
					cy="50%"
					r={CIRCLE_RADIUS}
					style={{
						strokeDasharray: `${fillAmount} ${circumference - fillAmount}`,
					}} />
			</svg>

			<span
				className="characters-remaining"
				hidden={isAllGood}>
				{maxLength - value.length}
			</span>
		</span>
	)
}

CharacterCount.defaultProps = {
	maxLength: null,
}

CharacterCount.propTypes = {
	maxLength: PropTypes.number,
	value: PropTypes.string.isRequired,
}





export { CharacterCount }

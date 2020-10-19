// Module imports
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-autosize-textarea'





// Local imports
import { CharacterCount } from 'components/CharacterCount'





const Input = forwardRef((props, ref) => {
  const {
    allowOverflow,
		error,
		isLoading,
    maxLength,
    multiline,
    prefix,
    showCharacterCount,
    type,
    value,
  } = props
  const passableProps = {
    ...props,
    ref,
  }
	const [errors, setErrors] = useState([])

  if (allowOverflow) {
    delete passableProps.maxLength
  }

  delete passableProps.allowOverflow
  delete passableProps.error
  delete passableProps.isLoading
  delete passableProps.multiline
  delete passableProps.prefix
  delete passableProps.showCharacterCount
  delete passableProps.type

  useEffect(() => {
    if (ref) {
      const checkValidity = () => {
        console.log('checkValidity::ref.current', ref.current)
        ref.current.checkValidity()
      }
      const handleInvalid = () => {
        console.log('handleInvalid::ref.current', ref.current)
        ref.current.setCustomValidity('invalid')
      }

      ref.current.addEventListener('input', checkValidity)
      ref.current.addEventListener('invalid', handleInvalid)

      return () => {
        ref.current.removeEventListener('input', checkValidity)
        ref.current.removeEventListener('invalid', handleInvalid)
      }
    }
  })

  return (
    <>
			<div
				className={classnames(passableProps.className, {
					control: true,
					'is-loading': isLoading,
					'has-icons-left': prefix,
					'has-icons-right': maxLength && showCharacterCount,
				})}>
				{multiline && (
					<TextareaAutosize
						{...passableProps}
						className={classnames(passableProps.className, 'textarea')}/>
				)}

				{!multiline && (
					<input
						{...passableProps}
						className={classnames(passableProps.className, 'input')}
						type={type} />
				)}

				{Boolean(prefix) && (
					<span class="icon is-small is-left">
						{prefix}
					</span>
				)}

				{(maxLength && showCharacterCount) && (
					<span class="icon is-small is-right">
						<div className="character-count-wrapper">
							<CharacterCount
								maxLength={maxLength}
								value={value} />
						</div>
					</span>
				)}
			</div>

      {Boolean(error) && (
        <span>{error}</span>
      )}
    </>
  )
})

Input.defaultProps = {
  allowOverflow: false,
  error: '',
  multiline: false,
  prefix: '',
  showCharacterCount: true,
  type: 'text',
}

Input.propTypes = {
  allowOverflow: PropTypes.bool,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  prefix: PropTypes.string,
  showCharacterCount: PropTypes.bool,
  type: PropTypes.string,
}





export { Input }

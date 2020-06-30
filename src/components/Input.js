// Module imports
import React, {
  forwardRef,
  useCallback,
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

  if (allowOverflow) {
    delete passableProps.maxLength
  }

  delete passableProps.allowOverflow
  delete passableProps.multiline
  delete passableProps.prefix
  delete passableProps.showCharacterCount
  delete passableProps.type

  return (
    <div className="input-container">
      {Boolean(prefix) && (
        <span className="prefix">
          {prefix}
        </span>
      )}

      {multiline && (
        <TextareaAutosize {...passableProps} />
      )}

      {!multiline && (
        <input
          {...passableProps}
          type={type} />
      )}

      {(maxLength && showCharacterCount) && (
        <div className="character-count-wrapper">
          <CharacterCount
            maxLength={maxLength}
            value={value} />
        </div>
      )}
    </div>
  )
})

Input.defaultProps = {
  allowOverflow: false,
  multiline: false,
  prefix: '',
  showCharacterCount: true,
  type: 'text',
}

Input.propTypes = {
  allowOverflow: PropTypes.bool,
  multiline: PropTypes.bool,
  prefix: PropTypes.string,
  showCharacterCount: PropTypes.bool,
  type: PropTypes.string,
}





export { Input }

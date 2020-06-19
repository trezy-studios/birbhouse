// Module imports
import PropTypes from 'prop-types'
import React from 'react'





const Abbreviation = props => {
  const {
    children,
    reference,
  } = props

  console.log(props)

  return (
    <abbr title={reference}>{children}</abbr>
  )
}

Abbreviation.propTypes = {
  children: PropTypes.node.isRequired,
  reference: PropTypes.string.isRequired,
}





export { Abbreviation }

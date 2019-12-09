import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const styles = createUseStyles({
  root: {
    position: 'relative',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '15px'
  },
  '@media (max-width: 600px)': {
    root: {
      margin: '0 5px',
      fontSize: '14px'
    }
  }
})

const Container = ({ children, thinking }) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  thinking: PropTypes.bool
}

Container.defaultProps = {
  thinking: false
}

export default Container

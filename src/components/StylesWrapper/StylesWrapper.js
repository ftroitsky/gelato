import root from 'react-shadow'

import { create } from 'jss'
import React, { useState} from 'react'
import PropTypes from 'prop-types'
import { JssProvider } from 'react-jss'
import preset from 'jss-preset-default'

const globalStyles = {
  '@global': {
    ':host': {
      all: 'initial'
    }
  }
}

const WrappedJssComponent = ({ children, shadow }) => {
  const [jss, setJss] = useState(null)

  function setRefAndCreateJss (headRef) {
    if (headRef && !jss) {
      const createdJssWithRef = create({ ...preset(), insertionPoint: headRef })
      setJss(createdJssWithRef)
      createdJssWithRef.createStyleSheet(globalStyles).attach()
    }
  }

  const ContainerComponent = shadow ? root.div : 'div'
  return (
    <ContainerComponent className="widget">
      <style ref={setRefAndCreateJss} />
      {
        jss &&
        (
          <JssProvider jss={jss}>
            {children}
          </JssProvider>
        )
      }
    </ContainerComponent>
  )
}

WrappedJssComponent.propTypes = {
  children: PropTypes.node.isRequired,
  shadow: PropTypes.bool
}

WrappedJssComponent.defaultProps = {
  shadow: false
}

export default WrappedJssComponent

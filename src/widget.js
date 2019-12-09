import React from 'react'

import PropTypes from 'prop-types'
import StylesWrapper from './components/StylesWrapper/StylesWrapper'
import Widget from './components/Widget'
import { Get } from './utils/request'
import { toQueryString } from './utils/utils'

export const WidgetArgh = ({ options }) => {
  const onSendEvent = () => {} //sendGaEvent(containerId, event)

  const onGetPlans = ({ countryCode, currency }) => Get(`/api/search${toQueryString({ countryCode, currency, all: true })}`)

  return (
    <StylesWrapper shadow={false}>
      <Widget
        onGetPlans={onGetPlans}
        onSendEvent={onSendEvent}
        {...options}
      />
    </StylesWrapper>
  )
}

WidgetArgh.propTypes = {
  options: PropTypes.object
}

WidgetArgh.defaultProps = {
  options: {}
}

export default WidgetArgh
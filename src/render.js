import React from 'react'
import renderDOM from 'react-dom'
// import StylesWrapper from './components/StylesWrapper/StylesWrapper'
import Widget from './components/Widget'
import { sendGaEvent, getPlans } from './utils/utils'

export const render = (container, containerId, options = {}) => {
  const onSendEvent = event => sendGaEvent(containerId, event)

  const onGetPlans = filters => getPlans(containerId, filters)

  if (container) {
    renderDOM(
        <Widget
          onGetPlans={onGetPlans}
          onSendEvent={onSendEvent}
          {...options}
        />, container
    )
    return true
  }

  console.log(`ESIM Widget: Can't find mount node`)

  return false
}

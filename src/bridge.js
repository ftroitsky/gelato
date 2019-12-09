import { Get } from './utils/request'
import { toQueryString } from './utils/utils'

const searchAPI = process.env.NODE_ENV === 'production' ? `https://api.esim.ninja/search` : '/search'

if (window.self !== window.top) {
  const messageListener = async ({ data: { action, ...other } }) => {
    if (action === 'GET_PLANS') {
      const { countryCode, currency, frameName } = other
      const { plans, errorCode } = await Get(`${searchAPI}${toQueryString({ countryCode, currency, all: true })}`)
      window.top.postMessage({ plans, errorCode, frameNameResponse: frameName }, '*')
    }
    if (action === 'SEND_GA_EVENT') {
      const {
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        dimensions
      } = other
      window.ga('send', 'event',
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        dimensions)
    }
  }

  if (window.addEventListener) {
    window.addEventListener('message', messageListener, false)
  } else {
    window.attachEvent('onmessage', messageListener)
  }
}

export const findBestPlan = (plans, { countryCode }) => {
  if (!countryCode) {
    return plans
  }
  if (plans && plans.length) {
    let bestIndex = 0
    let bestValue = 1000000
    plans.forEach(({ size, priceConverted: { val } }, index) => {
      if (size > -1) {
        const currentValue = val / size
        if (bestValue > currentValue) {
          bestValue = currentValue
          bestIndex = index
        }
      }
    })
    return [...plans.slice(0, bestIndex - 1), { ...plans[bestIndex], best: true }, ...plans.slice(bestIndex + 1)]
  }
  return plans
}

export const filterPlans = (plans, {
  days, size, operator, countryCode
}) => {
  if (!countryCode) {
    return plans
  }
  const plansByOperator = plans.filter((plan) => {
    if (operator && operator.length) {
      const operators = typeof operator === 'string' ? [operator] : operator
      return operators.indexOf(plan.operatorId) >= 0
    }
    return true
  })
  const plansByDays = plansByOperator.filter(plan => plan.days >= days)
  const unlimitedPlans = plansByDays.filter(plan => plan.size < 0)
  const sizePlans = plansByDays.filter(plan => plan.size >= size * 1024)
  const sizePlansSorted = sizePlans.sort((p1, p2) => {
    const p1cost = p1.priceConverted.val // / p1.size
    const p2cost = p2.priceConverted.val // / p2.size
    return p1cost - p2cost
  })
  return [...unlimitedPlans, ...sizePlansSorted]
}

export const combineAppUrl = (partnerId, filters) => {
  if (partnerId === 0 || partnerId === '0') return null
  const queries = Object.keys(filters).map(key => `${key}=${filters[key]}`)
  return `https://esim.ninja/?partnerId=${partnerId}&${queries.join('&')}`
}

const getUrlParams = (search = window.location.search) => {
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  const params = {}
  // eslint-disable-next-line array-callback-return
  hashes.map((hash) => {
    const [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })

  return params
}

export const getAppWidgetParams = (props) => {
  if (props.kind !== 'widget') {
    const {
      partnerId,
      countryCode,
      currency,
      size,
      days
    } = getUrlParams()

    return {
      partnerId: partnerId || props.partnerId,
      filters: {
        countryCode: countryCode || props.filters.countryCode,
        currency: currency || props.filters.currency,
        size: size || props.filters.size,
        days: days || props.filters.days
      },
      itemsToShow: 100000,
      showFilters: true,
      kind: 'app'
    }
  }
  return props
}

const sendMessage = (frameName, props) => new Promise((resolve) => {
  const messageListener = ({ data: { action, frameNameResponse, ...other } }) => {
    if (frameName === frameNameResponse) {
      if (window.addEventListener) {
        window.removeEventListener('message', messageListener, false)
      } else {
        window.detachEvent('onmessage', messageListener)
      }
      resolve(other)
    }
  }

  if (window.addEventListener) {
    window.addEventListener('message', messageListener, false)
  } else {
    window.attachEvent('onmessage', messageListener)
  }

  window.frames[frameName].postMessage({ ...props, frameName }, '*')
})

export const getPlans = (frameName, { countryCode, currency }) => sendMessage(frameName, { action: 'GET_PLANS', countryCode, currency })

export const sendGaEvent = (frameName, event) => sendMessage(frameName, { action: 'SEND_GA_EVENT', ...event })

export const toQueryString = (object) => {
  const query = Object.keys(object).filter(key => !!object[key]).map((key) => {
    if (object[key]) {
      return `${key}=${object[key].toString()}`
    }
    return ''
  }).join('&')
  return `?${query}`
}

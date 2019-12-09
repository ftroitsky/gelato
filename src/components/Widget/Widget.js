import React from 'react'
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types'
import { countries } from '../../countries'
import Filters from '../Filters'
import List, { ListItem } from '../List'
import Container from '../Container'
import Loader from '../Loader'
import {
  filterPlans, findBestPlan, combineAppUrl
} from '../../utils/utils'

const initialPlans = plans => plans.map(plan => ({ ...plan, priceConverted: plan.priceConverted || plan.priceBase }))

class Widget extends React.Component {
  static propTypes = {
    partnerId: PropTypes.string,
    countryCode: PropTypes.string,
    currency: PropTypes.string,
    mode: PropTypes.oneOf(['collapsed-items', 'redirect', 'full']),
    operator: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    size: PropTypes.number,
    days: PropTypes.number,
    items: PropTypes.number,
    filters: PropTypes.bool,
    onGetPlans: PropTypes.func.isRequired,
    onSendEvent: PropTypes.func.isRequired,

    // DEV Props
    dev: PropTypes.bool,
    initialization: PropTypes.bool,
    thinking: PropTypes.bool,
    plans: PropTypes.bool
  }

  static defaultProps = {
    partnerId: '1024',
    countryCode: null,
    currency: 'EUR',
    mode: 'redirect',
    operator: '',
    size: 5,
    days: 14,
    items: 10,
    filters: false,
    // DEV Props
    dev: false,
    initialization: false,
    thinking: false,
    plans: null
  }

  constructor (props) {
    super(props)
    const {
      partnerId,
      countryCode,
      currency,
      operator,
      mode,
      size,
      days,
      items,
      filters: showFilters
    } = props

    let itemsToShow = items

    if (mode === 'full') {
      itemsToShow = 100000000000
    } else if (items > 10) {
      itemsToShow = 10
    }

    const initialInitialization = () => {
      if (props.dev) {
        return props.initialization
      }
      return !(props.plans && props.plans.length)
    }

    this.state = {
      initialization: initialInitialization(),
      thinking: props.thinking || false,
      plans: initialPlans(props.plans || []),
      partnerId,
      itemsToShow,
      filters: {
        countryCode,
        size,
        days,
        operator,
        currency
      },
      showFilters,
      mode
    }
  }

  async componentDidMount () {
    if (!this.state.plans.length) {
      await this.onUpdatePlans(true)
    }
    const gaEvent = {
      eventCategory: 'widget',
      eventAction: 'load',
      dimensions: this.onGetDimensions()
    }
    this.props.onSendEvent(gaEvent)
  }

  onUpdatePlans = async (initialization) => {
    if (!this.props.dev) {
      const { filters } = this.state

      this.setState({ thinking: !initialization })

      const { plans, errorCode } = await this.props.onGetPlans(filters)

      if (!errorCode) {
        this.setState({ plans: initialPlans(plans) })
      }
      this.setState({ thinking: false, initialization: false })
    }
  }

  onFiltersChange = (filter, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [filter]: value } }, async () => {
      if (filter === 'countryCode') {
        await this.onUpdatePlans()
        const gaEvent = {
          eventCategory: 'search',
          eventAction: 'show',
          eventLabel: value,
          eventValue: this.state.plans.length,
          dimensions: this.onGetDimensions()
        }
        this.props.onSendEvent(gaEvent)
      }
    })
  }

  onResetFilters = (e) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, days: 1, size: 1 } })
    return e && e.preventDefault()
  }

  onGetDimensions = (planId) => {
    const {
      filters: {
        size,
        days,
        currency
      }
    } = this.state

    return {
      dimension1: size, // Выбранный объем трафика
      dimension2: days, // Выбранные дни поездки
      dimension3: window.location.host, // Домен, на котором вызван скрипт
      dimension4: navigator.language || navigator.userLanguage, // Локаль юзера, который вызвал скрипт
      dimension5: currency, // Валюта, с которой вызван скрипт
      ...(planId && { dimension6: planId }), // planId на который кликнул юзер
      // dimension7: 'device', // Устройство с которого грузится виджет
      dimension8: 'esim' // esim ли sim — прикрутим к тоглу, чтоб понимать много ли запросов на поиск для обычных телефонов
    }
  }

  onShowAll = (event) => {
    event && event.preventDefault()
    const { mode, partnerId, filters } = this.state
    const gaEvent = {
      eventCategory: 'button',
      eventAction: 'click',
      eventLabel: 'showAll',
      dimensions: this.onGetDimensions()
    }
    if (mode === 'redirect') {
      const url = combineAppUrl(partnerId, filters)
      window.open(url, '_blank')
    } else if (mode === 'collapsed-items') {
      this.setState({ itemsToShow: 10000000 })
    }

    this.props.onSendEvent(gaEvent)
  }

  onDealClick = (planId, url) => (event) => {
    event.preventDefault()
    const gaEvent = {
      eventCategory: 'button',
      eventAction: 'click',
      eventLabel: 'showPlan',
      dimensions: this.onGetDimensions(planId)
    }
    this.props.onSendEvent(gaEvent)
    window.open(url, '_blank')
  }

  render () {
    const {
      initialization,
      thinking,
      filters,
      plans,
      partnerId,
      showFilters,
      itemsToShow,
      mode
    } = this.state
    const plansFiltered = filterPlans(plans, filters)
    const plansToShow = plansFiltered.slice(0, itemsToShow + 1)
    const plansFilteredTotal = plansToShow.length < plansFiltered.length ? plansFiltered.length : 0

    return (
      <Container>
        <Loader thinking={initialization} />
        {
          showFilters && (
            <Filters
              filters={filters}
              countries={countries}
              onChange={this.onFiltersChange}
            />
          )
        }
        {
          !showFilters && (
            <div>
              { filters.countryCode && countries.filter(({ value }) => value === filters.countryCode)[0].label }
            </div>
          )
        }
        <List
          thinking={thinking}
          total={plansFilteredTotal}
          partnerId={partnerId}
          items={findBestPlan(plansToShow, filters)}
          mode={mode}
          renderItem={item => <ListItem key={item.id} partnerId={partnerId} {...item} onDealClick={this.onDealClick} />}
          onShowAll={this.onShowAll}
          onResetFilters={this.onResetFilters}
        />
      </Container>
    )
  }
}

export default Widget

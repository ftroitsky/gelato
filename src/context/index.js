import { createContext } from 'react'

export const initialState = {
  initialization: true,
  thinking: false,
  countries: [],
  items: [],
  filters: {
    country: [],
    traffic: 10,
    days: 14
  }
}

export const WidgetContext = createContext(initialState)
export const WidgetProvider = WidgetContext.Provider
export const WidgetConsumer = WidgetContext.Consumer

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        items: [...state.items, Math.random()]
      }
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      }
    case 'TOGGLE_INIT':
      return {
        ...state,
        initialization: !state.initialization
      }
    default:
      return state
  }
}

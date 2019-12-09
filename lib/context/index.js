'use strict';

exports.__esModule = true;
exports.reducer = exports.WidgetConsumer = exports.WidgetProvider = exports.WidgetContext = exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var initialState = exports.initialState = {
  initialization: true,
  thinking: false,
  countries: [],
  items: [],
  filters: {
    country: [],
    traffic: 10,
    days: 14
  }
};

var WidgetContext = exports.WidgetContext = (0, _react.createContext)(initialState);
var WidgetProvider = exports.WidgetProvider = WidgetContext.Provider;
var WidgetConsumer = exports.WidgetConsumer = WidgetContext.Consumer;

var reducer = exports.reducer = function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return _extends({}, state, {
        items: [].concat(state.items, [Math.random()])
      });
    case 'UPDATE_FILTERS':
      return _extends({}, state, {
        filters: _extends({}, state.filters, action.payload)
      });
    case 'TOGGLE_INIT':
      return _extends({}, state, {
        initialization: !state.initialization
      });
    default:
      return state;
  }
};
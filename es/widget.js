var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

import PropTypes from 'prop-types';
import StylesWrapper from './components/StylesWrapper/StylesWrapper';
import Widget from './components/Widget';
import { Get } from './utils/request';
import { toQueryString } from './utils/utils';

export var WidgetArgh = function WidgetArgh(_ref) {
  var options = _ref.options;

  var onSendEvent = function onSendEvent() {}; //sendGaEvent(containerId, event)

  var onGetPlans = function onGetPlans(_ref2) {
    var countryCode = _ref2.countryCode,
        currency = _ref2.currency;
    return Get('/api/search' + toQueryString({ countryCode: countryCode, currency: currency, all: true }));
  };

  return React.createElement(
    StylesWrapper,
    { shadow: false },
    React.createElement(Widget, _extends({
      onGetPlans: onGetPlans,
      onSendEvent: onSendEvent
    }, options))
  );
};

WidgetArgh.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.object
} : {};

WidgetArgh.defaultProps = {
  options: {}
};

export default WidgetArgh;
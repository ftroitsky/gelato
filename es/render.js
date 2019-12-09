var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import renderDOM from 'react-dom';
// import StylesWrapper from './components/StylesWrapper/StylesWrapper'
import Widget from './components/Widget';
import { sendGaEvent, getPlans } from './utils/utils';

export var render = function render(container, containerId) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var onSendEvent = function onSendEvent(event) {
    return sendGaEvent(containerId, event);
  };

  var onGetPlans = function onGetPlans(filters) {
    return getPlans(containerId, filters);
  };

  if (container) {
    renderDOM(React.createElement(Widget, _extends({
      onGetPlans: onGetPlans,
      onSendEvent: onSendEvent
    }, options)), container);
    return true;
  }

  console.log('ESIM Widget: Can\'t find mount node');

  return false;
};
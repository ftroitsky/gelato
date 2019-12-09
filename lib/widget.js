'use strict';

exports.__esModule = true;
exports.WidgetArgh = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StylesWrapper = require('./components/StylesWrapper/StylesWrapper');

var _StylesWrapper2 = _interopRequireDefault(_StylesWrapper);

var _Widget = require('./components/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _request = require('./utils/request');

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WidgetArgh = exports.WidgetArgh = function WidgetArgh(_ref) {
  var options = _ref.options;

  var onSendEvent = function onSendEvent() {}; //sendGaEvent(containerId, event)

  var onGetPlans = function onGetPlans(_ref2) {
    var countryCode = _ref2.countryCode,
        currency = _ref2.currency;
    return (0, _request.Get)('/api/search' + (0, _utils.toQueryString)({ countryCode: countryCode, currency: currency, all: true }));
  };

  return _react2.default.createElement(
    _StylesWrapper2.default,
    { shadow: false },
    _react2.default.createElement(_Widget2.default, _extends({
      onGetPlans: onGetPlans,
      onSendEvent: onSendEvent
    }, options))
  );
};

WidgetArgh.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes2.default.object
} : {};

WidgetArgh.defaultProps = {
  options: {}
};

exports.default = WidgetArgh;
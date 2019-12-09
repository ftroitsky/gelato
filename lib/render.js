'use strict';

exports.__esModule = true;
exports.render = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import StylesWrapper from './components/StylesWrapper/StylesWrapper'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Widget = require('./components/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = exports.render = function render(container, containerId) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var onSendEvent = function onSendEvent(event) {
    return (0, _utils.sendGaEvent)(containerId, event);
  };

  var onGetPlans = function onGetPlans(filters) {
    return (0, _utils.getPlans)(containerId, filters);
  };

  if (container) {
    (0, _reactDom2.default)(_react2.default.createElement(_Widget2.default, _extends({
      onGetPlans: onGetPlans,
      onSendEvent: onSendEvent
    }, options)), container);
    return true;
  }

  console.log('ESIM Widget: Can\'t find mount node');

  return false;
};
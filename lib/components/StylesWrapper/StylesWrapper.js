'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactShadow = require('react-shadow');

var _reactShadow2 = _interopRequireDefault(_reactShadow);

var _jss = require('jss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalStyles = {
  '@global': {
    ':host': {
      all: 'initial'
    }
  }
};

var WrappedJssComponent = function WrappedJssComponent(_ref) {
  var children = _ref.children,
      shadow = _ref.shadow;

  var _useState = (0, _react.useState)(null),
      jss = _useState[0],
      setJss = _useState[1];

  function setRefAndCreateJss(headRef) {
    if (headRef && !jss) {
      var createdJssWithRef = (0, _jss.create)(_extends({}, (0, _jssPresetDefault2.default)(), { insertionPoint: headRef }));
      setJss(createdJssWithRef);
      createdJssWithRef.createStyleSheet(globalStyles).attach();
    }
  }

  var ContainerComponent = shadow ? _reactShadow2.default.div : 'div';
  return _react2.default.createElement(
    ContainerComponent,
    { className: 'widget' },
    _react2.default.createElement('style', { ref: setRefAndCreateJss }),
    jss && _react2.default.createElement(
      _reactJss.JssProvider,
      { jss: jss },
      children
    )
  );
};

WrappedJssComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node.isRequired,
  shadow: _propTypes2.default.bool
} : {};

WrappedJssComponent.defaultProps = {
  shadow: false
};

exports.default = WrappedJssComponent;
module.exports = exports['default'];
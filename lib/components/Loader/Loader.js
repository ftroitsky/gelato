'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icons = require('../Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _reactJss.createUseStyles)({
  root: {
    position: 'absolute',
    zIndex: 1100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    margin: '25px 0 0 0',
    width: 100
  }
});

var Loader = function Loader(_ref) {
  var thinking = _ref.thinking,
      opacity = _ref.opacity;

  var classes = styles();
  return thinking && _react2.default.createElement(
    'div',
    { className: classes.root, style: { opacity: opacity } },
    _react2.default.createElement(_Icons.IconLoader, { className: classes.img })
  );
};

Loader.propTypes = process.env.NODE_ENV !== "production" ? {
  thinking: _propTypes2.default.bool,
  opacity: _propTypes2.default.number
} : {};

Loader.defaultProps = {
  thinking: false,
  opacity: 1
};

exports.default = Loader;
module.exports = exports['default'];
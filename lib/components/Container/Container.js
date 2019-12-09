'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _reactJss.createUseStyles)({
  root: {
    position: 'relative',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '15px'
  },
  '@media (max-width: 600px)': {
    root: {
      margin: '0 5px',
      fontSize: '14px'
    }
  }
});

var Container = function Container(_ref) {
  var children = _ref.children,
      thinking = _ref.thinking;

  var classes = styles();
  return _react2.default.createElement(
    'div',
    { className: classes.root },
    children
  );
};

Container.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node.isRequired,
  thinking: _propTypes2.default.bool
} : {};

Container.defaultProps = {
  thinking: false
};

exports.default = Container;
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFlipMove = require('react-flip-move');

var _reactFlipMove2 = _interopRequireDefault(_reactFlipMove);

var _Loader = require('../Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _reactJss.createUseStyles)({
  root: {
    position: 'relative',
    minHeight: 150,
    margin: '20px 0 0 0'
  },
  table: {
    position: 'relative',
    width: '100%',
    display: 'block'
  },
  textMessage: {
    textAlign: 'center',
    padding: '40px 20px',
    margin: '0 0 20px 0',
    '& a': {
      display: 'inline-block',
      margin: '0 5px',
      textDecoration: 'none',
      color: 'rgb(0, 149, 255)'
    }
  },
  moreContainer: {
    textAlign: 'center',
    margin: '20px 0'
  },
  moreLink: {
    padding: '5px 25px',
    display: 'inline-block',
    backgroundColor: 'rgb(0, 149, 255)',
    color: '#FFF',
    borderRadius: '5px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '.2s',
    '&:hover': {
      background: '#e4e4e4',
      color: '#000'
    }
  }
});

var listNotVisible = {
  transform: 'translateY(-10%)',
  opacity: 0
};

var List = function List(_ref) {
  var total = _ref.total,
      items = _ref.items,
      renderItem = _ref.renderItem,
      thinking = _ref.thinking,
      onResetFilters = _ref.onResetFilters,
      onShowAll = _ref.onShowAll;

  var classes = styles();
  return _react2.default.createElement(
    'div',
    { className: classes.root },
    !items.length && !thinking && _react2.default.createElement(
      'div',
      { className: classes.textMessage },
      'Sorry, there are no plans that match your search.',
      _react2.default.createElement(
        'a',
        { href: '#', onClick: onResetFilters },
        'Reset'
      ),
      ' all filters and try again?'
    ),
    _react2.default.createElement(
      'div',
      { className: classes.table },
      _react2.default.createElement(_Loader2.default, { thinking: thinking, opacity: 0.8 }),
      _react2.default.createElement(
        _reactFlipMove2.default,
        {
          duration: 300,
          enterAnimation: {
            from: listNotVisible,
            to: {}
          },
          leaveAnimation: {
            from: {},
            to: listNotVisible
          }
        },
        !!items.length && items.map(renderItem)
      )
    ),
    total > 0 && _react2.default.createElement(
      'div',
      { className: classes.moreContainer },
      !!items.length && _react2.default.createElement(
        'a',
        {
          className: classes.moreLink,
          href: '',
          onClick: onShowAll
        },
        'See all ',
        total,
        ' plans'
      )
    )
  );
};

List.propTypes = process.env.NODE_ENV !== "production" ? {
  total: _propTypes2.default.number.isRequired,
  thinking: _propTypes2.default.bool,
  items: _propTypes2.default.array.isRequired,
  renderItem: _propTypes2.default.func.isRequired,
  onShowAll: _propTypes2.default.func.isRequired,
  onResetFilters: _propTypes2.default.func.isRequired
} : {};

List.defaultProps = {
  thinking: false
};

exports.default = List;
module.exports = exports['default'];
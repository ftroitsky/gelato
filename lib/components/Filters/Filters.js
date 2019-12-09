'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _reactJss.createUseStyles)({
  root: {
    display: 'block',
    '&:after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  },
  filter: {
    backgroundColor: 'dodgerblue',
    color: 'white'
  },
  filters: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridGap: '1rem'
  },
  colRight: {
    float: 'left',
    width: '50%',
    padding: '0 0 0 20px',
    boxSizing: 'border-box'
  },
  colLeft: {
    float: 'left',
    width: '50%',
    padding: '0 20px 0 0',
    boxSizing: 'border-box'
  },
  '@media (max-width: 600px)': {
    colRight: {
      width: '100%',
      float: 'none',
      padding: 0
    },
    colLeft: {
      width: '100%',
      float: 'none',
      padding: 0
    }
  }
});

var Filters = function Filters(_ref) {
  var _ref$filters = _ref.filters,
      countryCode = _ref$filters.countryCode,
      size = _ref$filters.size,
      days = _ref$filters.days,
      countries = _ref.countries,
      onChange = _ref.onChange;

  var onFilterChanged = function onFilterChanged(filter) {
    return function (_ref2) {
      var value = _ref2.target.value;
      return onChange(filter, value);
    };
  };
  var classes = styles();
  var onFilterChange = function onFilterChange(e) {
    return onChange('countryCode', e);
  };
  return _react2.default.createElement(
    'div',
    { className: classes.root },
    _react2.default.createElement(_Select2.default, {
      label: 'Country',
      name: 'select-country',
      placeholder: 'Select a country',
      options: countries,
      defValue: countryCode,
      onChange: onFilterChange
    }),
    _react2.default.createElement(
      'div',
      { className: classes.colLeft },
      _react2.default.createElement(_Slider2.default, {
        onChange: onFilterChanged('size'),
        value: size,
        min: 1,
        max: 10,
        unlimited: true,
        labelMin: 'Gb',
        labelMax: 'Gb',
        labelMaxPlus: true,
        label: 'Data: min. '
      })
    ),
    _react2.default.createElement(
      'div',
      { className: classes.colRight },
      _react2.default.createElement(_Slider2.default, {
        onChange: onFilterChanged('days'),
        value: days,
        min: 1,
        max: 30,
        labelMin: 'Day',
        labelMax: 'Days',
        labelMaxPlus: true,
        label: 'Days: '
      })
    )
  );
};

Filters.propTypes = process.env.NODE_ENV !== "production" ? {
  filters: _propTypes2.default.shape({
    countryCode: _propTypes2.default.string,
    size: _propTypes2.default.number,
    days: _propTypes2.default.number
  }).isRequired,
  countries: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func.isRequired
} : {};

exports.default = Filters;
module.exports = exports['default'];
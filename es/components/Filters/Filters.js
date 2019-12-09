import React from 'react';

import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import Select from '../Select';
import Slider from '../Slider';

var styles = createUseStyles({
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
  return React.createElement(
    'div',
    { className: classes.root },
    React.createElement(Select, {
      label: 'Country',
      name: 'select-country',
      placeholder: 'Select a country',
      options: countries,
      defValue: countryCode,
      onChange: onFilterChange
    }),
    React.createElement(
      'div',
      { className: classes.colLeft },
      React.createElement(Slider, {
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
    React.createElement(
      'div',
      { className: classes.colRight },
      React.createElement(Slider, {
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
  filters: PropTypes.shape({
    countryCode: PropTypes.string,
    size: PropTypes.number,
    days: PropTypes.number
  }).isRequired,
  countries: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
} : {};

export default Filters;
var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

var styles = createUseStyles({
  root: {
    padding: '10px 0',
    '&:after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  },
  range: {
    WebkitAppearance: 'none',
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    background: '#d7dcdf',
    outline: 'none',
    padding: '0',
    margin: '0',
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'rgb(0, 149, 255)',
      cursor: 'pointer',
      transition: 'background .15s ease-in-out',
      '&:hover': {
        background: '#2c3e50'
      }
    },
    '&:active': {
      '&::-webkit-slider-thumb': {
        background: '#2c3e50'
      },
      '&::-moz-range-thumb': {
        background: '#2c3e50'
      }

    },
    '&::-moz-range-thumb': {
      width: '20px',
      height: '20px',
      border: '0',
      borderRadius: '50%',
      background: 'rgb(0, 149, 255)',
      cursor: 'pointer',
      transition: 'background .15s ease-in-out',
      '&:hover': {
        background: '#2c3e50'
      }
    }
  },
  rangeMin: {
    float: 'left'
  },
  rangeMax: {
    float: 'right'
  }
});

// eslint-disable-next-line react/no-redundant-should-component-update
var Slider = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(Slider, _React$PureComponent);

  function Slider() {
    var _temp, _this, _ret;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      currentValue: '',
      currentValueActive: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Slider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.value !== this.state.currentValue && nextState.currentValue === this.state.currentValue) {
      this.setState({ currentValue: nextProps.value });
    }
  };

  Slider.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        label = _props.label,
        min = _props.min,
        max = _props.max,
        unlimited = _props.unlimited,
        value = _props.value,
        labelMin = _props.labelMin,
        labelMax = _props.labelMax,
        labelMaxPlus = _props.labelMaxPlus,
        onChange = _props.onChange;
    var _state = this.state,
        currentValue = _state.currentValue,
        currentValueActive = _state.currentValueActive;

    var defValue = unlimited && value === max ? 'Unlimited' : value;
    if (currentValueActive) {
      this.setState({
        currentValue: defValue,
        currentValueActive: false
      });
    }
    var classes = styles();
    // eslint-disable-next-line radix
    var onFilterChange = function onFilterChange(e) {
      return _this2.setState({ currentValue: parseInt(e.target.value) });
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'label',
        { htmlFor: 'slider' },
        label
      ),
      currentValue,
      React.createElement(
        'div',
        { className: classes.root },
        React.createElement('input', {
          className: classes.range,
          name: 'slider',
          type: 'range',
          min: min,
          max: max,
          value: currentValue,
          onChange: onChange,
          onInput: onFilterChange
        }),
        React.createElement(
          'p',
          { className: classes.rangeMin },
          min,
          ' ',
          labelMin
        ),
        React.createElement(
          'p',
          { className: classes.rangeMax },
          max,
          labelMaxPlus ? '+' : '',
          ' ',
          labelMax
        )
      )
    );
  };

  return Slider;
}(React.PureComponent), _class.defaultProps = {
  label: '',
  labelMin: '',
  labelMax: '',
  labelMaxPlus: false,
  min: 0,
  max: 100,
  unlimited: false
}, _temp2);
Slider.propTypes = process.env.NODE_ENV !== "production" ? {
  label: PropTypes.string,
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  labelMaxPlus: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  unlimited: PropTypes.bool,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
} : {};


Slider.defaultProps = {
  label: '',
  labelMin: '',
  labelMax: '',
  min: 0,
  max: 100,
  unlimited: false
};

export default Slider;
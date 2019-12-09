'use strict';

exports.__esModule = true;
exports.withClasses = undefined;

var _class, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = (0, _reactJss.createUseStyles)({
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
var withClasses = exports.withClasses = function withClasses(Component) {
  return function (props) {
    var classes = styles();
    return _react2.default.createElement(Component, _extends({ classes: classes }, props));
  };
};
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
        onChange = _props.onChange,
        classes = _props.classes;
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
    // eslint-disable-next-line radix
    var onFilterChange = function onFilterChange(e) {
      return _this2.setState({ currentValue: parseInt(e.target.value) });
    };
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'label',
        { htmlFor: 'slider' },
        label
      ),
      currentValue,
      _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement('input', {
          className: classes.range,
          name: 'slider',
          type: 'range',
          min: min,
          max: max,
          value: currentValue,
          onChange: onChange,
          onInput: onFilterChange
        }),
        _react2.default.createElement(
          'p',
          { className: classes.rangeMin },
          min,
          ' ',
          labelMin
        ),
        _react2.default.createElement(
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
}(_react2.default.PureComponent), _class.defaultProps = {
  label: '',
  labelMin: '',
  labelMax: '',
  labelMaxPlus: false,
  min: 0,
  max: 100,
  unlimited: false
}, _temp2);
Slider.propTypes = process.env.NODE_ENV !== "production" ? {
  label: _propTypes2.default.string,
  labelMin: _propTypes2.default.string,
  labelMax: _propTypes2.default.string,
  labelMaxPlus: _propTypes2.default.bool,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  unlimited: _propTypes2.default.bool,
  value: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired
} : {};


Slider.defaultProps = {
  label: '',
  labelMin: '',
  labelMax: '',
  min: 0,
  max: 100,
  unlimited: false
};

exports.default = withClasses(Slider);
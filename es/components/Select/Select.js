var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { IconSearch } from '../Icons';

var fuseOptions = {
  shouldSort: true,
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['label']
};

var styles = createUseStyles({
  root: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    margin: '0 0 0 10px'
  },
  input: {
    borderRadius: 5,
    border: '1px solid #dadce0',
    padding: '5px 10px 5px 28px',
    minWidth: 235,
    outline: 'none',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '16px'
  },
  inputActive: {
    position: 'relative',
    zIndex: 1001,
    borderColor: 'transparent',
    borderBottomColor: '#dadce0',
    borderRadius: 0
  },
  listContainer: {
    boxSizing: 'border-box',
    zIndex: 1000,
    background: '#fff',
    boxShadow: '0 0 7px rgba(0, 0, 0, .07)',
    position: 'absolute',
    top: 0,
    left: -5,
    right: -5,
    padding: '30px 0 0 0'
  },
  list: {
    padding: 0,
    maxHeight: 200,
    overflow: 'scroll',
    margin: 0,
    listStyle: 'none',
    '& > li': {
      padding: '5px 10px',
      cursor: 'pointer',
      transition: '.2s',
      display: 'block',
      '&:hover': {
        background: '#f9f8f8'
      }
    }
  },
  search: {
    position: 'absolute',
    zIndex: 1002,
    left: 8,
    top: 8,
    width: 14,
    height: 14
  },
  itemActive: {
    background: '#f9f8f8'
  }
});

export var withClasses = function withClasses(Component) {
  return function (props) {
    var classes = styles();
    return React.createElement(Component, _extends({ classes: classes }, props));
  };
};

var Select = (_temp = _class = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onKeyPress = function (e) {
      if (e.keyCode === 13) {
        e.target.blur();
        var highlighted = _this.state.highlighted;

        var filterOpt = _this.filterOpt();
        var label = filterOpt[highlighted].label;
        var value = filterOpt[highlighted].value;
        var labelEmoji = filterOpt[highlighted].labelEmoji;

        _this.changeSelect(label, value, labelEmoji);
      }
    };

    _this.onKeyDown = function (e) {
      if (e.keyCode === 40) {
        _this.handleArrowDown();
        _this.scrollToSelected();
      }

      if (e.keyCode === 38) {
        _this.handleArrowUp();
        _this.scrollToSelected();
      }
    };

    _this.onKeyUp = function (e) {
      if (e.keyCode === 27) {
        e.target.blur();
        _this.closeSelect();
      }
    };

    _this.onFocus = function () {
      _this.openSelect();
    };

    _this.onBlur = function () {
      _this.closeSelect();
    };

    _this.handleChange = function (e) {
      _this.setState({
        value: e.target.value,
        showAllNames: false,
        highlighted: 0
      });
    };

    _this.changeSelect = function (label, value, labelEmoji) {
      var onChange = _this.props.onChange;

      onChange(value);
      _this.setState({
        value: label,
        valueEmoji: labelEmoji,
        isOpen: false,
        showAllNames: true,
        highlighted: 0
      });
      _this.closeSelect(labelEmoji);
    };

    _this.scrollToSelected = function () {
      var isOpen = _this.state.isOpen;

      if (isOpen) {
        var classes = _this.props.classes;

        var item = _this.selectOptions.querySelector('.' + classes.itemActive);
        if (item != null) {
          var listHeight = _this.selectOptions.clientHeight;
          var itemOffsetTop = item.offsetTop;
          _this.selectOptions.scrollTop = itemOffsetTop - listHeight / 2;
        }
      }
    };

    _this.handleArrowDown = function () {
      var highlighted = _this.state.highlighted;

      var filterOpt = _this.filterOpt().length - 1;
      var highlightedUp = highlighted + 1;
      if (highlightedUp > filterOpt) {
        highlightedUp = 0;
      }
      _this.setState({ highlighted: highlightedUp });
    };

    _this.handleArrowUp = function () {
      var highlighted = _this.state.highlighted;

      var filterOpt = _this.filterOpt().length - 1;
      var highlightedUp = highlighted - 1;
      if (highlightedUp < 0) {
        highlightedUp = filterOpt;
      }
      _this.setState({ highlighted: highlightedUp });
    };

    _this.openSelect = function () {
      _this.setState({ value: '', isOpen: true, showAllNames: true });
    };

    _this.closeSelect = function (emoji) {
      var valueEmoji = _this.state.valueEmoji;

      var valueUseEmoji = emoji || valueEmoji;
      _this.setState({ value: valueUseEmoji, isOpen: false });
    };

    _this.filterOpt = function () {
      var _this$state = _this.state,
          optionsState = _this$state.optionsState,
          value = _this$state.value,
          showAllNames = _this$state.showAllNames;

      var result = void 0;
      if (showAllNames || value.length === 0) {
        result = optionsState;
      } else {
        var fuse = new Fuse(optionsState, fuseOptions);
        result = fuse.search(value);
      }
      return result;
    };

    _this.renderList = function () {
      var highlighted = _this.state.highlighted;
      var classes = _this.props.classes;

      var result = _this.filterOpt();
      var list = result.map(function (option) {
        return React.createElement(
          'li',
          {
            key: option.value + Math.random().toString(36).substring(7),
            id: option.value,
            className: '' + (result[highlighted].value === option.value ? classes.itemActive : ''),
            onMouseDown: function onMouseDown() {
              _this.changeSelect(option.label, option.value, option.labelEmoji);
            }
          },
          option.labelEmoji
        );
      });
      return list;
    };

    var options = _this.props.options;

    _this.state = {
      isOpen: false,
      value: '',
      valueEmoji: '',
      showAllNames: true,
      defValueActive: true,
      highlighted: 0,
      optionsState: options
    };
    return _this;
  }

  Select.prototype.componentDidMount = function componentDidMount() {
    this.scrollToSelected();
  };

  Select.prototype.componentDidUpdate = function componentDidUpdate() {
    this.scrollToSelected();
  };

  Select.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        options = _props.options,
        placeholder = _props.placeholder,
        label = _props.label,
        defValue = _props.defValue,
        classes = _props.classes;
    var _state = this.state,
        isOpen = _state.isOpen,
        value = _state.value,
        defValueActive = _state.defValueActive;

    var defValueIndex = options.map(function (e) {
      return e.value;
    }).indexOf(defValue);
    var defValueLabel = options[defValueIndex].labelEmoji;
    if (defValueActive) {
      this.setState({
        value: defValueLabel,
        valueEmoji: options[defValueIndex].labelEmoji,
        defValueActive: false
      });
    }
    return React.createElement(
      'div',
      { className: classes.root },
      React.createElement(
        'label',
        { htmlFor: 'country-select' },
        label
      ),
      ' ',
      React.createElement(
        'div',
        { className: classes.wrapper },
        React.createElement(IconSearch, { className: classes.search }),
        React.createElement('input', {
          name: 'country-select',
          type: 'text',
          autoComplete: 'off',
          placeholder: placeholder,
          value: value,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: this.onKeyDown,
          onKeyPress: this.onKeyPress,
          onChange: this.handleChange,
          onKeyUp: this.onKeyUp,
          className: classes.input + ' ' + (isOpen ? classes.inputActive : '')
        }),
        isOpen ? React.createElement(
          'div',
          { className: classes.listContainer },
          React.createElement(
            'ul',
            { ref: function ref(selectOptions) {
                _this2.selectOptions = selectOptions;
              }, className: classes.list },
            this.renderList()
          )
        ) : null
      )
    );
  };

  return Select;
}(React.Component), _class.defaultProps = {
  label: '',
  onChange: function onChange() {},
  placeholder: '',
  defValue: ''
}, _temp);
Select.propTypes = process.env.NODE_ENV !== "production" ? {
  defValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  classes: PropTypes.object.isRequired
} : {};


export default withClasses(Select);
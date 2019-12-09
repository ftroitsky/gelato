import _regeneratorRuntime from 'babel-runtime/regenerator';

var _class, _temp, _initialiseProps;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { countries } from '../../countries';
import Filters from '../Filters';
import List, { ListItem } from '../List';
import Container from '../Container';
import Loader from '../Loader';
import { filterPlans, findBestPlan, combineAppUrl } from '../../utils/utils';

var initialPlans = function initialPlans(plans) {
  return plans.map(function (plan) {
    return _extends({}, plan, { priceConverted: plan.priceConverted || plan.priceBase });
  });
};

var Widget = (_temp = _class = function (_React$Component) {
  _inherits(Widget, _React$Component);

  function Widget(props) {
    _classCallCheck(this, Widget);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var partnerId = props.partnerId,
        countryCode = props.countryCode,
        currency = props.currency,
        operator = props.operator,
        mode = props.mode,
        size = props.size,
        days = props.days,
        items = props.items,
        showFilters = props.filters;


    var itemsToShow = items;

    if (mode === 'full') {
      itemsToShow = 100000000000;
    } else if (items > 10) {
      itemsToShow = 10;
    }

    var initialInitialization = function initialInitialization() {
      if (props.dev) {
        return props.initialization;
      }
      return !(props.plans && props.plans.length);
    };

    _this.state = {
      initialization: initialInitialization(),
      thinking: props.thinking || false,
      plans: initialPlans(props.plans || []),
      partnerId: partnerId,
      itemsToShow: itemsToShow,
      filters: {
        countryCode: countryCode,
        size: size,
        days: days,
        operator: operator,
        currency: currency
      },
      showFilters: showFilters,
      mode: mode
    };
    return _this;
  }

  Widget.prototype.componentDidMount = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var gaEvent;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.state.plans.length) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return this.onUpdatePlans(true);

            case 3:
              gaEvent = {
                eventCategory: 'widget',
                eventAction: 'load',
                dimensions: this.onGetDimensions()
              };

              this.props.onSendEvent(gaEvent);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function componentDidMount() {
      return _ref.apply(this, arguments);
    }

    return componentDidMount;
  }();

  Widget.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
        initialization = _state.initialization,
        thinking = _state.thinking,
        filters = _state.filters,
        plans = _state.plans,
        partnerId = _state.partnerId,
        showFilters = _state.showFilters,
        itemsToShow = _state.itemsToShow,
        mode = _state.mode;

    var plansFiltered = filterPlans(plans, filters);
    var plansToShow = plansFiltered.slice(0, itemsToShow + 1);
    var plansFilteredTotal = plansToShow.length < plansFiltered.length ? plansFiltered.length : 0;

    return React.createElement(
      Container,
      null,
      React.createElement(Loader, { thinking: initialization }),
      showFilters && React.createElement(Filters, {
        filters: filters,
        countries: countries,
        onChange: this.onFiltersChange
      }),
      !showFilters && React.createElement(
        'div',
        null,
        filters.countryCode && countries.filter(function (_ref2) {
          var value = _ref2.value;
          return value === filters.countryCode;
        })[0].label
      ),
      React.createElement(List, {
        thinking: thinking,
        total: plansFilteredTotal,
        partnerId: partnerId,
        items: findBestPlan(plansToShow, filters),
        mode: mode,
        renderItem: function renderItem(item) {
          return React.createElement(ListItem, _extends({ key: item.id, partnerId: partnerId }, item, { onDealClick: _this2.onDealClick }));
        },
        onShowAll: this.onShowAll,
        onResetFilters: this.onResetFilters
      })
    );
  };

  return Widget;
}(React.Component), _class.defaultProps = {
  partnerId: '1024',
  countryCode: null,
  currency: 'EUR',
  mode: 'redirect',
  operator: '',
  size: 5,
  days: 14,
  items: 10,
  filters: false,
  // DEV Props
  dev: false,
  initialization: false,
  thinking: false,
  plans: null
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onUpdatePlans = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(initialization) {
      var filters, _ref4, plans, errorCode;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this3.props.dev) {
                _context2.next = 10;
                break;
              }

              filters = _this3.state.filters;


              _this3.setState({ thinking: !initialization });

              _context2.next = 5;
              return _this3.props.onGetPlans(filters);

            case 5:
              _ref4 = _context2.sent;
              plans = _ref4.plans;
              errorCode = _ref4.errorCode;


              if (!errorCode) {
                _this3.setState({ plans: initialPlans(plans) });
              }
              _this3.setState({ thinking: false, initialization: false });

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.onFiltersChange = function (filter, value) {
    var _extends2;

    var filters = _this3.state.filters;

    _this3.setState({ filters: _extends({}, filters, (_extends2 = {}, _extends2[filter] = value, _extends2)) }, _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var gaEvent;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(filter === 'countryCode')) {
                _context3.next = 5;
                break;
              }

              _context3.next = 3;
              return _this3.onUpdatePlans();

            case 3:
              gaEvent = {
                eventCategory: 'search',
                eventAction: 'show',
                eventLabel: value,
                eventValue: _this3.state.plans.length,
                dimensions: _this3.onGetDimensions()
              };

              _this3.props.onSendEvent(gaEvent);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    })));
  };

  this.onResetFilters = function (e) {
    var filters = _this3.state.filters;

    _this3.setState({ filters: _extends({}, filters, { days: 1, size: 1 }) });
    return e && e.preventDefault();
  };

  this.onGetDimensions = function (planId) {
    var _state$filters = _this3.state.filters,
        size = _state$filters.size,
        days = _state$filters.days,
        currency = _state$filters.currency;


    return _extends({
      dimension1: size, // Выбранный объем трафика
      dimension2: days, // Выбранные дни поездки
      dimension3: window.location.host, // Домен, на котором вызван скрипт
      dimension4: navigator.language || navigator.userLanguage, // Локаль юзера, который вызвал скрипт
      dimension5: currency }, planId && { dimension6: planId }, { // planId на который кликнул юзер
      // dimension7: 'device', // Устройство с которого грузится виджет
      dimension8: 'esim' // esim ли sim — прикрутим к тоглу, чтоб понимать много ли запросов на поиск для обычных телефонов
    });
  };

  this.onShowAll = function (event) {
    event && event.preventDefault();
    var _state2 = _this3.state,
        mode = _state2.mode,
        partnerId = _state2.partnerId,
        filters = _state2.filters;

    var gaEvent = {
      eventCategory: 'button',
      eventAction: 'click',
      eventLabel: 'showAll',
      dimensions: _this3.onGetDimensions()
    };
    if (mode === 'redirect') {
      var url = combineAppUrl(partnerId, filters);
      window.open(url, '_blank');
    } else if (mode === 'collapsed-items') {
      _this3.setState({ itemsToShow: 10000000 });
    }

    _this3.props.onSendEvent(gaEvent);
  };

  this.onDealClick = function (planId, url) {
    return function (event) {
      event.preventDefault();
      var gaEvent = {
        eventCategory: 'button',
        eventAction: 'click',
        eventLabel: 'showPlan',
        dimensions: _this3.onGetDimensions(planId)
      };
      _this3.props.onSendEvent(gaEvent);
      window.open(url, '_blank');
    };
  };
}, _temp);
Widget.propTypes = process.env.NODE_ENV !== "production" ? {
  partnerId: PropTypes.string,
  countryCode: PropTypes.string,
  currency: PropTypes.string,
  mode: PropTypes.oneOf(['collapsed-items', 'redirect', 'full']),
  operator: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  size: PropTypes.number,
  days: PropTypes.number,
  items: PropTypes.number,
  filters: PropTypes.bool,
  onGetPlans: PropTypes.func.isRequired,
  onSendEvent: PropTypes.func.isRequired,

  // DEV Props
  dev: PropTypes.bool,
  initialization: PropTypes.bool,
  thinking: PropTypes.bool,
  plans: PropTypes.bool
} : {};


export default Widget;
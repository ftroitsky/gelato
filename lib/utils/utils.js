'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var findBestPlan = exports.findBestPlan = function findBestPlan(plans) {
  if (plans && plans.length) {
    var bestIndex = 0;
    var bestValue = 1000000;
    plans.forEach(function (_ref, index) {
      var size = _ref.size,
          val = _ref.priceConverted.val;

      if (size > -1) {
        var currentValue = val / size;
        if (bestValue > currentValue) {
          bestValue = currentValue;
          bestIndex = index;
        }
      }
    });
    return [].concat(plans.slice(0, bestIndex - 1), [_extends({}, plans[bestIndex], { best: true })], plans.slice(bestIndex + 1));
  }
  return plans;
};

var filterPlans = exports.filterPlans = function filterPlans(plans, _ref2) {
  var days = _ref2.days,
      size = _ref2.size,
      operator = _ref2.operator;

  var plansByOperator = plans.filter(function (plan) {
    if (operator && operator.length) {
      var operators = typeof operator === 'string' ? [operator] : operator;
      return operators.indexOf(plan.operatorId) >= 0;
    }
    return true;
  });
  var plansByDays = plansByOperator.filter(function (plan) {
    return plan.days >= days;
  });
  var unlimitedPlans = plansByDays.filter(function (plan) {
    return plan.size < 0;
  });
  var sizePlans = plansByDays.filter(function (plan) {
    return plan.size >= size * 1024;
  });
  var sizePlansSorted = sizePlans.sort(function (p1, p2) {
    var p1cost = p1.priceConverted.val; // / p1.size
    var p2cost = p2.priceConverted.val; // / p2.size
    return p1cost - p2cost;
  });
  return [].concat(unlimitedPlans, sizePlansSorted);
};

var combineAppUrl = exports.combineAppUrl = function combineAppUrl(partnerId, filters) {
  if (partnerId === 0 || partnerId === '0') return null;
  var queries = Object.keys(filters).map(function (key) {
    return key + '=' + filters[key];
  });
  return 'https://esim.ninja/?partnerId=' + partnerId + '&' + queries.join('&');
};

var getUrlParams = function getUrlParams() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;

  var hashes = search.slice(search.indexOf('?') + 1).split('&');
  var params = {};
  // eslint-disable-next-line array-callback-return
  hashes.map(function (hash) {
    var _hash$split = hash.split('='),
        key = _hash$split[0],
        val = _hash$split[1];

    params[key] = decodeURIComponent(val);
  });

  return params;
};

var getAppWidgetParams = exports.getAppWidgetParams = function getAppWidgetParams(props) {
  if (props.kind !== 'widget') {
    var _getUrlParams = getUrlParams(),
        partnerId = _getUrlParams.partnerId,
        countryCode = _getUrlParams.countryCode,
        currency = _getUrlParams.currency,
        size = _getUrlParams.size,
        days = _getUrlParams.days;

    return {
      partnerId: partnerId || props.partnerId,
      filters: {
        countryCode: countryCode || props.filters.countryCode,
        currency: currency || props.filters.currency,
        size: size || props.filters.size,
        days: days || props.filters.days
      },
      itemsToShow: 100000,
      showFilters: true,
      kind: 'app'
    };
  }
  return props;
};

var sendMessage = function sendMessage(frameName, props) {
  return new Promise(function (resolve) {
    var messageListener = function messageListener(_ref3) {
      var _ref3$data = _ref3.data,
          action = _ref3$data.action,
          frameNameResponse = _ref3$data.frameNameResponse,
          other = _objectWithoutProperties(_ref3$data, ['action', 'frameNameResponse']);

      if (frameName === frameNameResponse) {
        if (window.addEventListener) {
          window.removeEventListener('message', messageListener, false);
        } else {
          window.detachEvent('onmessage', messageListener);
        }
        resolve(other);
      }
    };

    if (window.addEventListener) {
      window.addEventListener('message', messageListener, false);
    } else {
      window.attachEvent('onmessage', messageListener);
    }

    window.frames[frameName].postMessage(_extends({}, props, { frameName: frameName }), '*');
  });
};

var getPlans = exports.getPlans = function getPlans(frameName, _ref4) {
  var countryCode = _ref4.countryCode,
      currency = _ref4.currency;
  return sendMessage(frameName, { action: 'GET_PLANS', countryCode: countryCode, currency: currency });
};

var sendGaEvent = exports.sendGaEvent = function sendGaEvent(frameName, event) {
  return sendMessage(frameName, _extends({ action: 'SEND_GA_EVENT' }, event));
};

var toQueryString = exports.toQueryString = function toQueryString(object) {
  var query = Object.keys(object).filter(function (key) {
    return !!object[key];
  }).map(function (key) {
    if (object[key]) {
      return key + '=' + object[key].toString();
    }
    return '';
  }).join('&');
  return '?' + query;
};
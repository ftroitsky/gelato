import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { Get } from './utils/request';
import { toQueryString } from './utils/utils';

var searchAPI = process.env.NODE_ENV === 'production' ? 'https://api.esim.ninja/search' : '/search';

if (window.self !== window.top) {
  var messageListener = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
      var _ref2$data = _ref2.data,
          action = _ref2$data.action,
          other = _objectWithoutProperties(_ref2$data, ['action']);

      var countryCode, currency, frameName, _ref3, plans, errorCode, eventCategory, eventAction, eventLabel, eventValue, dimensions;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(action === 'GET_PLANS')) {
                _context.next = 8;
                break;
              }

              countryCode = other.countryCode, currency = other.currency, frameName = other.frameName;
              _context.next = 4;
              return Get('' + searchAPI + toQueryString({ countryCode: countryCode, currency: currency, all: true }));

            case 4:
              _ref3 = _context.sent;
              plans = _ref3.plans;
              errorCode = _ref3.errorCode;

              window.top.postMessage({ plans: plans, errorCode: errorCode, frameNameResponse: frameName }, '*');

            case 8:
              if (action === 'SEND_GA_EVENT') {
                eventCategory = other.eventCategory, eventAction = other.eventAction, eventLabel = other.eventLabel, eventValue = other.eventValue, dimensions = other.dimensions;

                window.ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue, dimensions);
              }

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function messageListener(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (window.addEventListener) {
    window.addEventListener('message', messageListener, false);
  } else {
    window.attachEvent('onmessage', messageListener);
  }
}
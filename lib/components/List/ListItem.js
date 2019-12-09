'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _reactCurrencyFormatter = require('react-currency-formatter');

var _reactCurrencyFormatter2 = _interopRequireDefault(_reactCurrencyFormatter);

var _ImgLoader = require('../ImgLoader');

var _ImgLoader2 = _interopRequireDefault(_ImgLoader);

var _Icons = require('../Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Currency = function Currency(props) {
  var html = (0, _reactCurrencyFormatter2.default)(_extends({}, props, { symbol: props.currency === 'RUB' ? '&#x20bd;' : undefined }));
  return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: html } });
};

var styles = (0, _reactJss.createUseStyles)({
  root: {
    display: 'block',
    margin: '0 0 20px 0',
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  },
  comment: {
    fontSize: '12px',
    display: 'block',
    color: '#5a5a5a',
    margin: '5px 0 0 0'
  },
  button: {
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
  },
  mobileButton: {
    display: 'none'
  },
  arrow: {
    display: 'none'
  },
  arrowImg: {
    fill: '#0094dc',
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '5px',
    top: '50%',
    margin: '-10px 0 0 0'
  },
  flex: {
    display: 'flex'
  },
  img: {
    alignItems: 'center',
    display: 'flex',
    maxWidth: 50
  },
  ButtonRoot: {
    alignItems: 'center',
    display: 'flex',
    maxWidth: 120
  },
  flexRow: {
    flex: '1 1 auto'
  },
  flexCol: {
    flex: '1 1 auto'
  },
  flexRowMore: {
    display: 'flex'
  },
  operatorNameRoot: {
    maxWidth: 400,
    minWidth: '180px',
    width: '50%',
    fontWeight: '300',
    alignItems: 'center',
    display: 'flex'
  },
  operatorName: {
    margin: '0 0 0 10px'
  },
  operatorNameText: {
    display: 'block'
  },
  fake: {
    minHeight: 20
  },
  priceRoot: {
    padding: '0 40px 0 0',
    textAlign: 'right',
    maxWidth: 300,
    minWidth: 100
  },
  priceGbRoot: {
    alignItems: 'center',
    display: 'flex',
    minHeight: 20,
    justifyContent: 'flex-end'
  },
  sizeDays: {
    width: 300
  },
  days: {
    textAlign: 'right'
  },
  priceGb: {
    fontSize: '12px'
  },
  priceGbBest: {
    color: '#108733'
  },
  priceOriginal: {},
  priceConverted: {
    fontSize: '12px',
    color: '#5a5a5a',
    margin: '5px 0 0 0'
  },
  '@media (max-width: 850px)': {
    sizeDays: {
      width: 200
    }
  },
  firstColRoot: {},
  '@media (max-width: 750px)': {
    root: {
      background: '#fff',
      boxShadow: '0 0 7px rgba(0, 0, 0, .07)',
      borderRadius: 5,
      margin: '0 0 10px',
      display: 'block',
      padding: '5px 25px 5px 5px'
    },
    firstColRoot: {
      flex: '8',
      display: 'block'
    },
    priceRoot: {
      flex: 'none'
    },
    sizeDays: {
      boxSizing: 'border-box',
      padding: '0 10px',
      width: '100%'
    },
    operatorNameText: {
      display: 'inline-block'
    },
    fake: {
      display: 'none'
    },
    priceGbRoot: {
      minHeight: 'auto',
      margin: '0 0 5px 0'
    },
    operatorNameRoot: {
      width: '100%',
      fontSize: '12px',
      margin: '0 0 5px 0'
    },
    ButtonRoot: {
      display: 'none'
    },
    mobileButton: {
      display: 'block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    arrow: {
      display: 'block'
    }
  },
  '@media (max-width: 500px)': {
    firstColRoot: {
      overflow: 'hidden'
    },
    priceRoot: {
      padding: '0 10px 0 0',
      minWidth: 80
    },
    operatorNameRoot: {
      minWidth: 'auto'
    },
    operatorName: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '90%',
      overflow: 'hidden'
    }
  }
});

var formatSize = function formatSize(size) {
  if (size < 0) return 'Unlimited';

  return size % 1024 !== 0 ? size + ' Mb' : (size / 1024).toFixed(0) + ' Gb';
};

var formatMoney = function formatMoney(value) {
  return (value / 100).toFixed(2);
};

var formatPerGigabyte = function formatPerGigabyte(size, price) {
  return (price / 100 / (size / 1024)).toFixed(2);
};

var formatUrl = function formatUrl(url, partnerId) {
  return url ? url.replace(/{partnerId}/g, partnerId) : '#0';
};

// const onDealClick = (url, partnerId) => (e) => {
//   const handle = window.open(formatUrl(url, partnerId), '_blank')
//   e.preventDefault()
//   handle.blur()
//   window.focus()
// }

var ListItem = function ListItem(_ref) {
  var id = _ref.id,
      operatorName = _ref.operatorName,
      name = _ref.name,
      operatorId = _ref.operatorId,
      size = _ref.size,
      sizeComment = _ref.sizeComment,
      days = _ref.days,
      url = _ref.url,
      partnerId = _ref.partnerId,
      best = _ref.best,
      _ref$priceBase = _ref.priceBase,
      currencyOriginal = _ref$priceBase.cur,
      priceOriginal = _ref$priceBase.val,
      _ref$priceConverted = _ref.priceConverted,
      currencyConverted = _ref$priceConverted.cur,
      priceConverted = _ref$priceConverted.val,
      onDealClick = _ref.onDealClick;

  var classes = styles();
  var dealUrl = formatUrl(url, partnerId);
  return _react2.default.createElement(
    'div',
    { className: classes.root },
    _react2.default.createElement(
      'div',
      { className: classes.arrow, href: dealUrl },
      _react2.default.createElement(_Icons.IconArrow, { className: classes.arrowImg })
    ),
    _react2.default.createElement('a', {
      className: classes.mobileButton,
      href: dealUrl,
      onClick: onDealClick(id, dealUrl)
    }),
    _react2.default.createElement(
      'div',
      { className: classes.flex },
      _react2.default.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.img },
        _react2.default.createElement(_ImgLoader2.default, { operatorId: operatorId })
      ),
      _react2.default.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.flex + ' ' + classes.firstColRoot },
        _react2.default.createElement(
          'div',
          { className: classes.flexCol + ' ' + classes.operatorNameRoot },
          _react2.default.createElement(
            'p',
            { className: classes.operatorName },
            _react2.default.createElement(
              'strong',
              { className: classes.operatorNameText },
              operatorName
            ),
            ' ',
            name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: classes.flexCol + ' ' + classes.sizeDays },
          _react2.default.createElement('div', { className: classes.fake }),
          _react2.default.createElement(
            'div',
            { className: '' + classes.flex },
            _react2.default.createElement(
              'div',
              { className: classes.size + ' ' + classes.flexRow },
              formatSize(size)
            ),
            _react2.default.createElement(
              'div',
              { className: classes.days + ' ' + classes.flexRow },
              days,
              ' days'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: '' + classes.commentRoot },
            _react2.default.createElement(
              'span',
              { className: classes.comment },
              sizeComment
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.priceRoot },
        _react2.default.createElement(
          'div',
          { className: classes.priceGbRoot },
          size > 0 && _react2.default.createElement(
            'span',
            {
              className: classes.priceGb + ' ' + (best && classes.priceGbBest)
            },
            _react2.default.createElement(Currency, {
              quantity: formatPerGigabyte(size, priceConverted),
              currency: currencyConverted,
              pattern: '#,##0.00 !/Gb',
              decimal: '.',
              group: ' '
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: classes.priceOriginal },
            _react2.default.createElement(Currency, {
              quantity: formatMoney(priceOriginal),
              currency: currencyOriginal,
              locale: 'en_US'
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          currencyOriginal !== currencyConverted && _react2.default.createElement(
            'span',
            { className: classes.priceConverted },
            _react2.default.createElement(Currency, {
              quantity: formatMoney(priceConverted),
              currency: currencyConverted,
              locale: 'en_US'
            })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.flex + ' ' + classes.ButtonRoot },
        _react2.default.createElement(
          'a',
          {
            className: classes.button,
            href: dealUrl,
            onClick: onDealClick(id, dealUrl)
          },
          'See deal'
        )
      )
    )
  );
};

ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  id: _propTypes2.default.string.isRequired,
  partnerId: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string.isRequired,
  operatorName: _propTypes2.default.string.isRequired,
  operatorId: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.number.isRequired,
  sizeComment: _propTypes2.default.string,
  name: _propTypes2.default.string,
  days: _propTypes2.default.number.isRequired,
  best: _propTypes2.default.bool,
  priceBase: _propTypes2.default.shape({ cur: _propTypes2.default.string, val: _propTypes2.default.number }).isRequired,
  priceConverted: _propTypes2.default.shape({ cur: _propTypes2.default.string, val: _propTypes2.default.number }).isRequired,
  onDealClick: _propTypes2.default.func.isRequired
} : {};

ListItem.defaultProps = {
  sizeComment: '',
  name: '',
  best: false
};

exports.default = ListItem;
module.exports = exports['default'];
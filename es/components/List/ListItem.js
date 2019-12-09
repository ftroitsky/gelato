var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import CurrencyComponent from 'react-currency-formatter';
import ImgLoader from '../ImgLoader';
import { IconArrow } from '../Icons';

var Currency = function Currency(props) {
  var html = CurrencyComponent(_extends({}, props, { symbol: props.currency === 'RUB' ? '&#x20bd;' : undefined }));
  return React.createElement('span', { dangerouslySetInnerHTML: { __html: html } });
};

var styles = createUseStyles({
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
  return React.createElement(
    'div',
    { className: classes.root },
    React.createElement(
      'div',
      { className: classes.arrow, href: dealUrl },
      React.createElement(IconArrow, { className: classes.arrowImg })
    ),
    React.createElement('a', {
      className: classes.mobileButton,
      href: dealUrl,
      onClick: onDealClick(id, dealUrl)
    }),
    React.createElement(
      'div',
      { className: classes.flex },
      React.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.img },
        React.createElement(ImgLoader, { operatorId: operatorId })
      ),
      React.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.flex + ' ' + classes.firstColRoot },
        React.createElement(
          'div',
          { className: classes.flexCol + ' ' + classes.operatorNameRoot },
          React.createElement(
            'p',
            { className: classes.operatorName },
            React.createElement(
              'strong',
              { className: classes.operatorNameText },
              operatorName
            ),
            ' ',
            name
          )
        ),
        React.createElement(
          'div',
          { className: classes.flexCol + ' ' + classes.sizeDays },
          React.createElement('div', { className: classes.fake }),
          React.createElement(
            'div',
            { className: '' + classes.flex },
            React.createElement(
              'div',
              { className: classes.size + ' ' + classes.flexRow },
              formatSize(size)
            ),
            React.createElement(
              'div',
              { className: classes.days + ' ' + classes.flexRow },
              days,
              ' days'
            )
          ),
          React.createElement(
            'div',
            { className: '' + classes.commentRoot },
            React.createElement(
              'span',
              { className: classes.comment },
              sizeComment
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.priceRoot },
        React.createElement(
          'div',
          { className: classes.priceGbRoot },
          size > 0 && React.createElement(
            'span',
            {
              className: classes.priceGb + ' ' + (best && classes.priceGbBest)
            },
            React.createElement(Currency, {
              quantity: formatPerGigabyte(size, priceConverted),
              currency: currencyConverted,
              pattern: '#,##0.00 !/Gb',
              decimal: '.',
              group: ' '
            })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: classes.priceOriginal },
            React.createElement(Currency, {
              quantity: formatMoney(priceOriginal),
              currency: currencyOriginal,
              locale: 'en_US'
            })
          )
        ),
        React.createElement(
          'div',
          null,
          currencyOriginal !== currencyConverted && React.createElement(
            'span',
            { className: classes.priceConverted },
            React.createElement(Currency, {
              quantity: formatMoney(priceConverted),
              currency: currencyConverted,
              locale: 'en_US'
            })
          )
        )
      ),
      React.createElement(
        'div',
        { className: classes.flexRow + ' ' + classes.flex + ' ' + classes.ButtonRoot },
        React.createElement(
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
  id: PropTypes.string.isRequired,
  partnerId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  operatorName: PropTypes.string.isRequired,
  operatorId: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  sizeComment: PropTypes.string,
  name: PropTypes.string,
  days: PropTypes.number.isRequired,
  best: PropTypes.bool,
  priceBase: PropTypes.shape({ cur: PropTypes.string, val: PropTypes.number }).isRequired,
  priceConverted: PropTypes.shape({ cur: PropTypes.string, val: PropTypes.number }).isRequired,
  onDealClick: PropTypes.func.isRequired
} : {};

ListItem.defaultProps = {
  sizeComment: '',
  name: '',
  best: false
};

export default ListItem;
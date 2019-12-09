import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import CurrencyComponent from 'react-currency-formatter'
import ImgLoader from '../ImgLoader'
import { IconArrow } from '../Icons'

const Currency = (props) => {
  const html = CurrencyComponent({ ...props, symbol: props.currency === 'RUB' ? '&#x20bd;' : undefined })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

const styles = createUseStyles({
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
})

const formatSize = (size) => {
  if (size < 0) return 'Unlimited'

  return size % 1024 !== 0 ? `${size} Mb` : `${(size / 1024).toFixed(0)} Gb`
}

const formatMoney = value => (value / 100).toFixed(2)

const formatPerGigabyte = (size, price) => ((price / 100) / (size / 1024)).toFixed(2)

const formatUrl = (url, partnerId) => (url ? url.replace(/{partnerId}/g, partnerId) : '#0')

// const onDealClick = (url, partnerId) => (e) => {
//   const handle = window.open(formatUrl(url, partnerId), '_blank')
//   e.preventDefault()
//   handle.blur()
//   window.focus()
// }

const ListItem = ({
  id,
  operatorName,
  name,
  operatorId,
  size,
  sizeComment,
  days,
  url,
  partnerId,
  best,
  priceBase: { cur: currencyOriginal, val: priceOriginal },
  priceConverted: { cur: currencyConverted, val: priceConverted },
  onDealClick
}) => {
  const classes = styles()
  const dealUrl = formatUrl(url, partnerId)
  return (
    <div className={classes.root}>
      <div className={classes.arrow} href={dealUrl}>
        <IconArrow className={classes.arrowImg} />
      </div>
      <a
        className={classes.mobileButton}
        href={dealUrl}
        onClick={onDealClick(id, dealUrl)}
      />
      <div className={classes.flex}>
        <div className={`${classes.flexRow} ${classes.img}`}>
          <ImgLoader operatorId={operatorId} />
        </div>
        <div className={`${classes.flexRow} ${classes.flex} ${classes.firstColRoot}`}>
          <div className={`${classes.flexCol} ${classes.operatorNameRoot}`}>
            <p className={classes.operatorName}><strong className={classes.operatorNameText}>{operatorName}</strong> {name}
            </p>
          </div>
          <div className={`${classes.flexCol} ${classes.sizeDays}`}>
            <div className={classes.fake} />
            <div className={`${classes.flex}`}>
              <div className={`${classes.size} ${classes.flexRow}`}>
                {formatSize(size)}
              </div>
              <div className={`${classes.days} ${classes.flexRow}`}>{days} days
              </div>
            </div>
            <div className={`${classes.commentRoot}`}>
              <span className={classes.comment}>{sizeComment}</span>
            </div>
          </div>
        </div>
        <div className={`${classes.flexRow} ${classes.priceRoot}`}>
          <div className={classes.priceGbRoot}>
            {
              size > 0 && (
                <span
                  className={`${classes.priceGb} ${best && classes.priceGbBest}`}
                >
                  <Currency
                    quantity={formatPerGigabyte(size, priceConverted)}
                    currency={currencyConverted}
                    pattern="#,##0.00 !/Gb"
                    decimal="."
                    group=" "
                  />
                </span>
              )
            }
          </div>
          <div>
            <span className={classes.priceOriginal}>
              <Currency
                quantity={formatMoney(priceOriginal)}
                currency={currencyOriginal}
                locale="en_US"
              />
            </span>
          </div>
          <div>
            {
              currencyOriginal !== currencyConverted && (
                <span className={classes.priceConverted}>
                  <Currency
                    quantity={formatMoney(priceConverted)}
                    currency={currencyConverted}
                    locale="en_US"
                  />
                </span>
              )
            }
          </div>
        </div>
        <div className={`${classes.flexRow} ${classes.flex} ${classes.ButtonRoot}`}>
          <a
            className={classes.button}
            href={dealUrl}
            onClick={onDealClick(id, dealUrl)}
          >
            See deal
          </a>
        </div>
      </div>
    </div>
  )
}

ListItem.propTypes = {
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
}

ListItem.defaultProps = {
  sizeComment: '',
  name: '',
  best: false
}

export default ListItem

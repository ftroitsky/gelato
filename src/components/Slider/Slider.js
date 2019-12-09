import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const styles = createUseStyles({
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
})

// eslint-disable-next-line react/no-redundant-should-component-update
class Slider extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    labelMin: PropTypes.string,
    labelMax: PropTypes.string,
    labelMaxPlus: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    unlimited: PropTypes.bool,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: '',
    labelMin: '',
    labelMax: '',
    labelMaxPlus: false,
    min: 0,
    max: 100,
    unlimited: false
  }

  state = {
    currentValue: '',
    currentValueActive: true
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.value !== this.state.currentValue && nextState.currentValue === this.state.currentValue) {
      this.setState({ currentValue: nextProps.value })
    }
  }

  render () {
    const {
      label,
      min,
      max,
      unlimited,
      value,
      labelMin,
      labelMax,
      labelMaxPlus,
      onChange
    } = this.props
    const { currentValue, currentValueActive } = this.state
    const defValue = unlimited && value === max ? 'Unlimited' : value
    if (currentValueActive) {
      this.setState({
        currentValue: defValue,
        currentValueActive: false
      })
    }
    const classes = styles()
    // eslint-disable-next-line radix
    const onFilterChange = e => this.setState({ currentValue: parseInt(e.target.value) })
    return (
      <div>
        <label htmlFor="slider">{label}</label>
        {currentValue}
        <div className={classes.root}>
          <input
            className={classes.range}
            name="slider"
            type="range"
            min={min}
            max={max}
            value={currentValue}
            onChange={onChange}
            onInput={onFilterChange}
          />
          <p className={classes.rangeMin}>{min} {labelMin}</p>
          <p className={classes.rangeMax}>{max}{labelMaxPlus ? '+' : ''} {labelMax}</p>
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  label: '',
  labelMin: '',
  labelMax: '',
  min: 0,
  max: 100,
  unlimited: false
}

export default Slider

import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import Select from '../Select'
import Slider from '../Slider'

const styles = createUseStyles({
  root: {
    display: 'block',
    '&:after': {
      content: '""',
      display: 'block',
      clear: 'both'
    }
  },
  filter: {
    backgroundColor: 'dodgerblue',
    color: 'white'
  },
  filters: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridGap: '1rem'
  },
  colRight: {
    float: 'left',
    width: '50%',
    padding: '0 0 0 20px',
    boxSizing: 'border-box'
  },
  colLeft: {
    float: 'left',
    width: '50%',
    padding: '0 20px 0 0',
    boxSizing: 'border-box'
  },
  '@media (max-width: 600px)': {
    colRight: {
      width: '100%',
      float: 'none',
      padding: 0
    },
    colLeft: {
      width: '100%',
      float: 'none',
      padding: 0
    }
  }
})

const Filters = ({
  filters: {
    countryCode,
    size,
    days
  },
  countries,
  onChange
}) => {
  const onFilterChanged = filter => ({ target: { value } }) => onChange(filter, value)
  const classes = styles()
  const onFilterChange = e => onChange('countryCode', e)
  return (
    <div className={classes.root}>
      <Select
        label="Country"
        name="select-country"
        placeholder="Select a country"
        options={countries}
        defValue={countryCode}
        onChange={onFilterChange}
      />
      <div className={classes.colLeft}>
        <Slider
          onChange={onFilterChanged('size')}
          value={size}
          min={1}
          max={10}
          unlimited
          labelMin="Gb"
          labelMax="Gb"
          labelMaxPlus
          label="Data: min. "
        />
      </div>
      <div className={classes.colRight}>
        <Slider
          onChange={onFilterChanged('days')}
          value={days}
          min={1}
          max={30}
          labelMin="Day"
          labelMax="Days"
          labelMaxPlus
          label="Days: "
        />
      </div>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.shape({
    countryCode: PropTypes.string,
    size: PropTypes.number,
    days: PropTypes.number
  }).isRequired,
  countries: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Filters

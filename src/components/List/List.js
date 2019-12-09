import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import Loader from '../Loader'

const styles = createUseStyles({
  root: {
    position: 'relative',
    minHeight: 150,
    margin: '20px 0 0 0'
  },
  table: {
    position: 'relative',
    width: '100%',
    display: 'block'
  },
  textMessage: {
    textAlign: 'center',
    padding: '40px 20px',
    margin: '0 0 20px 0',
    '& a': {
      display: 'inline-block',
      margin: '0 5px',
      textDecoration: 'none',
      color: 'rgb(0, 149, 255)'
    }
  },
  moreContainer: {
    textAlign: 'center',
    margin: '20px 0'
  },
  moreLink: {
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
  }
})

const listNotVisible = {
  transform: 'translateY(-10%)',
  opacity: 0
}

const List = ({
  total, items, renderItem, thinking, onResetFilters, onShowAll
}) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      {
        !items.length && !thinking && (
          <div className={classes.textMessage}>
            Sorry, there are no plans that match your search.
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={onResetFilters}>Reset</a> all filters and try again?
          </div>
        )
      }
      <div className={classes.table}>
        <Loader thinking={thinking} opacity={0.8} />
        <FlipMove
          duration={300}
          enterAnimation={{
            from: listNotVisible,
            to: {}
          }}
          leaveAnimation={{
            from: {},
            to: listNotVisible
          }}
        >
          {
            !!items.length && items.map(renderItem)
          }
        </FlipMove>
      </div>
      {
        total > 0 && (
          <div className={classes.moreContainer}>
            {!!items.length && (
              <a
                className={classes.moreLink}
                href=""
                onClick={onShowAll}
              >
                See all {total} plans
              </a>
            )}
          </div>
        )
      }
    </div>
  )
}

List.propTypes = {
  total: PropTypes.number.isRequired,
  thinking: PropTypes.bool,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
}

List.defaultProps = {
  thinking: false
}

export default List

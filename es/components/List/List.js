import React from 'react';

import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Loader from '../Loader';

var styles = createUseStyles({
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
});

var listNotVisible = {
  transform: 'translateY(-10%)',
  opacity: 0
};

var List = function List(_ref) {
  var total = _ref.total,
      items = _ref.items,
      renderItem = _ref.renderItem,
      thinking = _ref.thinking,
      onResetFilters = _ref.onResetFilters,
      onShowAll = _ref.onShowAll;

  var classes = styles();
  return React.createElement(
    'div',
    { className: classes.root },
    !items.length && !thinking && React.createElement(
      'div',
      { className: classes.textMessage },
      'Sorry, there are no plans that match your search.',
      React.createElement(
        'a',
        { href: '#', onClick: onResetFilters },
        'Reset'
      ),
      ' all filters and try again?'
    ),
    React.createElement(
      'div',
      { className: classes.table },
      React.createElement(Loader, { thinking: thinking, opacity: 0.8 }),
      React.createElement(
        FlipMove,
        {
          duration: 300,
          enterAnimation: {
            from: listNotVisible,
            to: {}
          },
          leaveAnimation: {
            from: {},
            to: listNotVisible
          }
        },
        !!items.length && items.map(renderItem)
      )
    ),
    total > 0 && React.createElement(
      'div',
      { className: classes.moreContainer },
      !!items.length && React.createElement(
        'a',
        {
          className: classes.moreLink,
          href: '',
          onClick: onShowAll
        },
        'See all ',
        total,
        ' plans'
      )
    )
  );
};

List.propTypes = process.env.NODE_ENV !== "production" ? {
  total: PropTypes.number.isRequired,
  thinking: PropTypes.bool,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
} : {};

List.defaultProps = {
  thinking: false
};

export default List;
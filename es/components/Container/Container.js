import React from 'react';

import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

var styles = createUseStyles({
  root: {
    position: 'relative',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '15px'
  },
  '@media (max-width: 600px)': {
    root: {
      margin: '0 5px',
      fontSize: '14px'
    }
  }
});

var Container = function Container(_ref) {
  var children = _ref.children,
      thinking = _ref.thinking;

  var classes = styles();
  return React.createElement(
    'div',
    { className: classes.root },
    children
  );
};

Container.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node.isRequired,
  thinking: PropTypes.bool
} : {};

Container.defaultProps = {
  thinking: false
};

export default Container;
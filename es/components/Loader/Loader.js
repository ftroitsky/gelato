import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { IconLoader } from '../Icons';

var styles = createUseStyles({
  root: {
    position: 'absolute',
    zIndex: 1100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    margin: '25px 0 0 0',
    width: 100
  }
});

var Loader = function Loader(_ref) {
  var thinking = _ref.thinking,
      opacity = _ref.opacity;

  var classes = styles();
  return thinking && React.createElement(
    'div',
    { className: classes.root, style: { opacity: opacity } },
    React.createElement(IconLoader, { className: classes.img })
  );
};

Loader.propTypes = process.env.NODE_ENV !== "production" ? {
  thinking: PropTypes.bool,
  opacity: PropTypes.number
} : {};

Loader.defaultProps = {
  thinking: false,
  opacity: 1
};

export default Loader;
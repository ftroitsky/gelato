var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import root from 'react-shadow';

import { create } from 'jss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { JssProvider } from 'react-jss';
import preset from 'jss-preset-default';

var globalStyles = {
  '@global': {
    ':host': {
      all: 'initial'
    }
  }
};

var WrappedJssComponent = function WrappedJssComponent(_ref) {
  var children = _ref.children,
      shadow = _ref.shadow;

  var _useState = useState(null),
      jss = _useState[0],
      setJss = _useState[1];

  function setRefAndCreateJss(headRef) {
    if (headRef && !jss) {
      var createdJssWithRef = create(_extends({}, preset(), { insertionPoint: headRef }));
      setJss(createdJssWithRef);
      createdJssWithRef.createStyleSheet(globalStyles).attach();
    }
  }

  var ContainerComponent = shadow ? root.div : 'div';
  return React.createElement(
    ContainerComponent,
    { className: 'widget' },
    React.createElement('style', { ref: setRefAndCreateJss }),
    jss && React.createElement(
      JssProvider,
      { jss: jss },
      children
    )
  );
};

WrappedJssComponent.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node.isRequired,
  shadow: PropTypes.bool
} : {};

WrappedJssComponent.defaultProps = {
  shadow: false
};

export default WrappedJssComponent;
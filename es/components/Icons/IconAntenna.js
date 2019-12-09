// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line no-unused-vars


export var IconAntenna = function IconAntenna(props) {
  return React.createElement(
    "svg",
    { viewBox: "0 0 100 101", className: props.className, xmlns: "http://www.w3.org/2000/svg" },
    React.createElement(
      "g",
      { fill: props.color || '#000', fillRule: "evenodd" },
      React.createElement("path", { d: "M50 27a9 9 0 014 17v57h-8V44a9 9 0 014-17z" }),
      React.createElement("path", {
        d: "M14.7.6L21.1 7a40.9 40.9 0 000 58l-6.4 6.5a49.8 49.8 0 010-71zm70.6 0a49.8 49.8 0 010 70.8L78.9 65a40.9 40.9 0 000-58L85.4.6zM28.8 14.7l7.1 7.1a20 20 0 000 28.4l-7 7.1a30 30 0 010-42.6zm42.4 0a30 30 0 010 42.6L64 50.2a20 20 0 000-28.4l7.1-7z",
        fillRule: "nonzero"
      })
    )
  );
};
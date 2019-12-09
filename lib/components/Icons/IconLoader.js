"use strict";

exports.__esModule = true;
exports.IconLoader = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars


var IconLoader = exports.IconLoader = function IconLoader(props) {
  return _react2.default.createElement(
    "svg",
    {
      className: props.className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      enableBackground: "new 0 0 0 0"
    },
    _react2.default.createElement(
      "path",
      {
        fill: "#2c3e50",
        d: "M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50",
        transform: "rotate(235.774 50 50)"
      },
      _react2.default.createElement("animateTransform", {
        attributeName: "transform",
        attributeType: "XML",
        type: "rotate",
        dur: "1s",
        from: "0 50 50",
        to: "360 50 50",
        repeatCount: "indefinite"
      })
    )
  );
}; // eslint-disable-next-line import/no-extraneous-dependencies
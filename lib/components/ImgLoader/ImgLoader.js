'use strict';

exports.__esModule = true;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icons = require('../Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = (0, _reactJss.createUseStyles)({
  root: {
    textAlign: 'center',
    width: 50
  },
  img: {
    display: 'none'
  },
  imgLoaded: {
    display: 'block'
  },
  loader: {
    display: 'inline-block',
    width: 50,
    height: 50,
    background: '#ccc'
  },
  svg: {
    display: 'inline-block',
    width: 40,
    height: 40
  },
  a: {
    fill: '#848484',
    fillRule: 'evenodd'
  },
  b: {
    fill: '#211d1e'
  }
});

var ImgLoader = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(ImgLoader, _React$PureComponent);

  function ImgLoader() {
    var _temp, _this, _ret;

    _classCallCheck(this, ImgLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      imgLoaded: false,
      noImg: false
    }, _this.handleImageLoaded = function () {
      _this.setState({ imgLoaded: true });
    }, _this.handleImageError = function () {
      _this.setState({ noImg: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ImgLoader.prototype.render = function render() {
    var operatorId = this.props.operatorId;
    var _state = this.state,
        imgLoaded = _state.imgLoaded,
        noImg = _state.noImg;

    var classes = styles();
    return _react2.default.createElement(
      'div',
      { className: classes.root },
      _react2.default.createElement('img', {
        onLoad: this.handleImageLoaded.bind(this),
        onError: this.handleImageError.bind(this),
        src: 'https://cdn.esim.ninja/operators/' + operatorId + '.png',
        alt: operatorId,
        height: 50,
        width: 50,
        className: classes.img + ' ' + (imgLoaded ? classes.imgLoaded : '')
      }),
      noImg &&
      /* eslint-disable-next-line max-len */
      _react2.default.createElement(_Icons.IconAntenna, { color: '#ccc', className: classes.svg }),
      !imgLoaded && !noImg &&
      /* eslint-disable-next-line max-len */
      _react2.default.createElement('div', { className: classes.loader })
    );
  };

  return ImgLoader;
}(_react2.default.PureComponent), _class.defaultProps = {
  operatorId: ''
}, _temp2);
ImgLoader.propTypes = process.env.NODE_ENV !== "production" ? {
  operatorId: _propTypes2.default.string
} : {};
exports.default = ImgLoader;
module.exports = exports['default'];
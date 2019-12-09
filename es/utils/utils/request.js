var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var checkStatus = function checkStatus(response) {
  return response.json().then(function (json) {
    return { json: json, response: response };
  });
};
var parseJSON = function parseJSON(_ref) {
  var json = _ref.json,
      response = _ref.response;
  return response.ok === false ? _extends({ errorCode: response.status }, json) : json;
};

export var Get = function Get(url) {
  return fetch(url, {
    credentials: 'include'
  }).then(checkStatus).then(parseJSON);
};
import { render } from './render';
// Reinit deploy
window.esn.callMethod = function (functionName) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (functionName) {
    window.esn[functionName].apply(null, args);
  }
};

// Re init

window.esn.init = function (containerId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (containerId) {
    var container = document.getElementById(containerId);
    if (document.getElementsByName(containerId)[0]) {
      render(container, containerId, options);
    } else {
      var iframe = document.createElement('iframe');
      iframe.src = process.env.URL;
      iframe.name = containerId;
      iframe.setAttribute('style', 'width: 0px; height: 0px; border: 0; visibility: hidden;');
      container.parentNode.insertBefore(iframe, container);
      iframe.onload = function () {
        render(container, containerId, options);
      };
    }
  }
};

var start = function start() {
  if (window.esn.queue && window.esn.queue.length) {
    while (window.esn.queue.length) {
      window.esn.callMethod.apply(null, window.esn.queue[0]);
      window.esn.queue.shift();
    }
  }
};

start();
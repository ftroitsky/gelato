import { render } from './render'
// Reinit deploy
window.esn.callMethod = (functionName, ...args) => {
  if (functionName) {
    window.esn[functionName].apply(null, args)
  }
}

// Re init

window.esn.init = (containerId, options = {}) => {
  if (containerId) {
    const container = document.getElementById(containerId)
    if (document.getElementsByName(containerId)[0]) {
      render(container, containerId, options)
    } else {
      const iframe = document.createElement('iframe')
      iframe.src = process.env.URL
      iframe.name = containerId
      iframe.setAttribute('style', 'width: 0px; height: 0px; border: 0; visibility: hidden;')
      container.parentNode.insertBefore(iframe, container)
      iframe.onload = () => {
        render(container, containerId, options)
      }
    }
  }
}

const start = () => {
  if (window.esn.queue && window.esn.queue.length) {
    while (window.esn.queue.length) {
      window.esn.callMethod.apply(null, window.esn.queue[0])
      window.esn.queue.shift()
    }
  }
}

start()

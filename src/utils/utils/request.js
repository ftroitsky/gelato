const checkStatus = response => response.json().then(json => ({ json, response }))
const parseJSON = ({ json, response }) => response.ok === false ? { errorCode: response.status, ...json } : json

export const Get = url =>
  fetch(url, {
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)

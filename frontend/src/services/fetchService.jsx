import BACKEND_URL from './config'

function fetchFunc (url, method, data = null) {
  const fullUrl = BACKEND_URL + url
  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('user')
        ? `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        : '',
    },
    body: data ? JSON.stringify(data) : undefined
  }
  return fetch(fullUrl, option)
}
window.fetchFunc = fetchFunc
export default fetchFunc

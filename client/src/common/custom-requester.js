import cookie from 'react-cookies'

const interceptorConfig = {
  headers: {
    'Content-type': 'application/json'
  }
}

// TODO implemenent logic for more configurable fetcher
// TODO write cookie library sometime
export const xFetcher = (path, options) => {
  if (cookie.load('token')) {
    interceptorConfig.headers.Authorization = cookie.load('token')
  }

  options = {
    ...options,
    headers: {
      ...interceptorConfig.headers,
      ...options.headers
    }
  }

  return fetch(path, options).then(res => res.json())
}

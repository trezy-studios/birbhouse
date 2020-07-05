export const getQueryParams = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  return window.location.search
    .replace(/^\?/, '')
    .split('&')
    .reduce((accumulator, pair) => {
      const [key, value] = pair.split('=')
      accumulator[key] = value
      return accumulator
    }, {})
}

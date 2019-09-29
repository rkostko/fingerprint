import { NOT_AVAILABLE } from '../constants'

const getAvailableScreenResolution = (options) => {
  if (window.screen.availWidth && window.screen.availHeight) {
    var available = [window.screen.availHeight, window.screen.availWidth]
    if (options.screen.detectScreenOrientation) {
      available.sort().reverse()
    }
    return available
  }
  // headless browsers
  return NOT_AVAILABLE
}

function getData (done, options) {
  done(getAvailableScreenResolution(options))
}

export default {
  key: 'availableScreenResolution',
  getData
}

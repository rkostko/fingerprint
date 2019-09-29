import { NOT_AVAILABLE } from '../constants'

const getNavigatorPlatform = () => {
  if (navigator.platform) {
    return navigator.platform
  } else {
    return NOT_AVAILABLE
  }
}

function getData (done) {
  done(getNavigatorPlatform())
}

export default {
  key: 'platform',
  getData
}

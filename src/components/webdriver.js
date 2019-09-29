import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  done(navigator.webdriver == null ? NOT_AVAILABLE : navigator.webdriver)
}

export default {
  key: 'webdriver',
  getData
}

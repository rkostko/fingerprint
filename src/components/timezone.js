import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  if (window.Intl && window.Intl.DateTimeFormat) {
    done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
    return
  }
  done(NOT_AVAILABLE)
}

export default {
  key: 'timezone',
  getData
}

import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  done(
    navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      NOT_AVAILABLE
  )
}

export default {
  key: 'language',
  getData
}

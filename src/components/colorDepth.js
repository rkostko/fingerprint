import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  done(window.screen.colorDepth || NOT_AVAILABLE)
}

export default {
  key: 'colorDepth',
  getData
}

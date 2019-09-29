import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  done(window.devicePixelRatio || NOT_AVAILABLE)
}

export default {
  key: 'pixelRatio',
  getData
}

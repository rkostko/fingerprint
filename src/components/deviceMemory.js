import { NOT_AVAILABLE } from '../constants'

function getData (done) {
  done(navigator.deviceMemory || NOT_AVAILABLE)
}

export default {
  key: 'deviceMemory',
  getData
}

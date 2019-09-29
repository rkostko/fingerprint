import { NOT_AVAILABLE } from '../constants'

const getHardwareConcurrency = () => {
  if (navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency
  }
  return NOT_AVAILABLE
}

function getData (done) {
  done(getHardwareConcurrency())
}

export default {
  key: 'hardwareConcurrency',
  getData
}

import { NOT_AVAILABLE } from '../constants'

const getDoNotTrack = () => {
  if (navigator.doNotTrack) {
    return navigator.doNotTrack
  } else if (navigator.msDoNotTrack) {
    return navigator.msDoNotTrack
  } else if (window.doNotTrack) {
    return window.doNotTrack
  } else {
    return NOT_AVAILABLE
  }
}

function getData (done) {
  done(getDoNotTrack())
}

export default {
  key: 'doNotTrack',
  getData
}

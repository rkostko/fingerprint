const getDoNotTrack = (options) => {
  if (navigator.doNotTrack) {
    return navigator.doNotTrack
  } else if (navigator.msDoNotTrack) {
    return navigator.msDoNotTrack
  } else if (window.doNotTrack) {
    return window.doNotTrack
  } else {
    return options.NOT_AVAILABLE
  }
}

function getData (done, options) {
  done(getDoNotTrack(options))
}

export default {
  key: 'doNotTrack',
  getData
}

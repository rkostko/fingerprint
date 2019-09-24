function getData (done, options) {
  done(navigator.deviceMemory || options.NOT_AVAILABLE)
}

export default {
  key: 'deviceMemory',
  getData
}

function getData (done, options) {
  done(window.devicePixelRatio || options.NOT_AVAILABLE)
}

export default {
  key: 'pixelRatio',
  getData
}

function getData (done, options) {
  done(window.screen.colorDepth || options.NOT_AVAILABLE)
}

export default {
  key: 'colorDepth',
  getData
}

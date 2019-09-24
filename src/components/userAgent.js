function getData (done) {
  done(navigator.userAgent)
}

export default {
  key: 'userAgent',
  getData
}

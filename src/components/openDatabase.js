function getData (done) {
  done(!!window.openDatabase)
}

export default {
  key: 'openDatabase',
  getData
}

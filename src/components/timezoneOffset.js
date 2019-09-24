function getData (done, options) {
  done(new Date().getTimezoneOffset())
}

export default {
  key: 'timezoneOffset',
  getData
}

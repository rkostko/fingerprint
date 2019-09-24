function getData (done, options) {
  done(
    navigator.webdriver == null ? options.NOT_AVAILABLE : navigator.webdriver
  )
}

export default {
  key: 'webdriver',
  getData
}

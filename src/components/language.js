function getData (done, options) {
  done(
    navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      options.NOT_AVAILABLE
  )
}

export default {
  key: 'language',
  getData
}

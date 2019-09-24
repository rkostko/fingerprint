function getData (done, options) {
  if (window.Intl && window.Intl.DateTimeFormat) {
    done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
    return
  }
  done(options.NOT_AVAILABLE)
}

export default {
  key: 'timezone',
  getData
}

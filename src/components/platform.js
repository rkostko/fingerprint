const getNavigatorPlatform = (options) => {
  if (navigator.platform) {
    return navigator.platform
  } else {
    return options.NOT_AVAILABLE
  }
}

function getData (done, options) {
  done(getNavigatorPlatform(options))
}

export default {
  key: 'platform',
  getData
}

const getHardwareConcurrency = (options) => {
  if (navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency
  }
  return options.NOT_AVAILABLE
}

function getData (done, options) {
  done(getHardwareConcurrency(options))
}

export default {
  key: 'hardwareConcurrency',
  getData
}

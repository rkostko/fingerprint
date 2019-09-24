const hasSessionStorage = (options) => {
  try {
    return !!window.sessionStorage
  } catch (e) {
    return options.ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done, options) {
  done(hasSessionStorage(options))
}

export default {
  key: 'sessionStorage',
  getData
}

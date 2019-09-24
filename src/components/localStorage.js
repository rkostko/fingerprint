// https://bugzilla.mozilla.org/show_bug.cgi?id=781447
const hasLocalStorage = (options) => {
  try {
    return !!window.localStorage
  } catch (e) {
    return options.ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done, options) {
  done(hasLocalStorage(options))
}

export default {
  key: 'localStorage',
  getData
}

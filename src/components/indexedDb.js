const hasIndexedDB = (options) => {
  try {
    return !!window.indexedDB
  } catch (e) {
    return options.ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done, options) {
  done(hasIndexedDB(options))
}

export default {
  key: 'indexedDb',
  getData
}

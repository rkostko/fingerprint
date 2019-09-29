import { ERROR } from '../constants'

const hasIndexedDB = () => {
  try {
    return !!window.indexedDB
  } catch (e) {
    return ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done) {
  done(hasIndexedDB())
}

export default {
  key: 'indexedDb',
  getData
}

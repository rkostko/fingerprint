import { ERROR } from '../constants'

// https://bugzilla.mozilla.org/show_bug.cgi?id=781447
const hasLocalStorage = () => {
  try {
    return !!window.localStorage
  } catch (e) {
    return ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done) {
  done(hasLocalStorage())
}

export default {
  key: 'localStorage',
  getData
}

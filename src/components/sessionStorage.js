import { ERROR } from '../constants'

const hasSessionStorage = () => {
  try {
    return !!window.sessionStorage
  } catch (e) {
    return ERROR // SecurityError when referencing it means it exists
  }
}

function getData (done) {
  done(hasSessionStorage())
}

export default {
  key: 'sessionStorage',
  getData
}

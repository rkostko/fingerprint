import { NOT_AVAILABLE } from '../constants'

const getNavigatorCpuClass = () => {
  return navigator.cpuClass || NOT_AVAILABLE
}

function getData (done) {
  done(getNavigatorCpuClass())
}

export default {
  key: 'cpuClass',
  getData
}

const getNavigatorCpuClass = (options) => {
  return navigator.cpuClass || options.NOT_AVAILABLE
}

function getData (done, options) {
  done(getNavigatorCpuClass(options))
}

export default {
  key: 'cpuClass',
  getData
}

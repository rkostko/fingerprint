const getScreenResolution = (options) => {
  var resolution = [window.screen.width, window.screen.height]
  if (options.screen.detectScreenOrientation) {
    resolution.sort().reverse()
  }
  return resolution
}

function getData (done, options) {
  done(getScreenResolution(options))
}

export default {
  key: 'screenResolution',
  getData
}

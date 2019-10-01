const hasSwfObjectLoaded = () => {
  return typeof window.swfobject !== 'undefined'
}

const hasMinFlashInstalled = () => {
  return window.swfobject.hasFlashPlayerVersion('9.0.0')
}

const addFlashDivNode = (options) => {
  var node = document.createElement('div')
  node.setAttribute('id', options.fontsFlash.swfContainerId)
  document.body.appendChild(node)
}

const loadSwfAndDetectFonts = (done, options) => {
  var hiddenCallback = '___fp_swf_loaded'
  window[hiddenCallback] = (fonts) => {
    done(fonts)
  }
  var id = options.fontsFlash.swfContainerId
  addFlashDivNode()
  var flashvars = { onReady: hiddenCallback }
  var flashparams = { allowScriptAccess: 'always', menu: 'false' }
  window.swfobject.embedSWF(
    options.fontsFlash.swfPath,
    id,
    '1',
    '1',
    '9.0.0',
    false,
    flashvars,
    flashparams,
    {}
  )
}

// flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)
function getData (done, options) {
  // we do flash if swfobject is loaded
  if (!hasSwfObjectLoaded()) {
    return done('swf object not loaded')
  }
  if (!hasMinFlashInstalled()) {
    return done('flash not installed')
  }
  if (!options.fontsFlash.swfPath) {
    return done('missing options.fontsFlash.swfPath')
  }
  loadSwfAndDetectFonts(function (fonts) {
    done(fonts)
  }, options)
}

export default {
  key: 'fontsFlash',
  getData,
  pauseBefore: true,
  defaultOptions: {
    swfContainerId: 'fingerprintjs2',
    swfPath: 'flash/compiled/FontList.swf'
  }
}

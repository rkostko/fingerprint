import { ERROR, EXCLUDED, NOT_AVAILABLE } from '../constants'

const isIE = () => {
  if (navigator.appName === 'Microsoft Internet Explorer') {
    return true
  } else if (
    navigator.appName === 'Netscape' &&
    /Trident/.test(navigator.userAgent)
  ) {
    // IE 11
    return true
  }
  return false
}

const pluginsShouldBeSorted = (options) => {
  var should = false
  for (var i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
    var re = options.plugins.sortPluginsFor[i]
    if (navigator.userAgent.match(re)) {
      should = true
      break
    }
  }
  return should
}

const getRegularPlugins = (options) => {
  if (navigator.plugins == null) {
    return NOT_AVAILABLE
  }

  var plugins = []
  // plugins isn't defined in Node envs.
  for (var i = 0, l = navigator.plugins.length; i < l; i++) {
    if (navigator.plugins[i]) {
      plugins.push(navigator.plugins[i])
    }
  }

  // sorting plugins only for those user agents, that we know randomize the plugins
  // every time we try to enumerate them
  if (pluginsShouldBeSorted(options)) {
    plugins = plugins.sort(function (a, b) {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })
  }
  return plugins.map(function (p) {
    var mimeTypes = p.map(function (mt) {
      return [mt.type, mt.suffixes]
    })
    return [p.name, p.description, mimeTypes]
  })
}

const getIEPlugins = (options) => {
  var result = []
  if (
    (Object.getOwnPropertyDescriptor &&
      Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) ||
    'ActiveXObject' in window
  ) {
    var names = [
      'AcroPDF.PDF', // Adobe PDF reader 7+
      'Adodb.Stream',
      'AgControl.AgControl', // Silverlight
      'DevalVRXCtrl.DevalVRXCtrl.1',
      'MacromediaFlashPaper.MacromediaFlashPaper',
      'Msxml2.DOMDocument',
      'Msxml2.XMLHTTP',
      'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
      'QuickTime.QuickTime', // QuickTime
      'QuickTimeCheckObject.QuickTimeCheck.1',
      'RealPlayer',
      'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
      'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
      'Scripting.Dictionary',
      'SWCtl.SWCtl', // ShockWave player
      'Shell.UIHelper',
      'ShockwaveFlash.ShockwaveFlash', // flash plugin
      'Skype.Detection',
      'TDCCtl.TDCCtl',
      'WMPlayer.OCX', // Windows media player
      'rmocx.RealPlayer G2 Control',
      'rmocx.RealPlayer G2 Control.1'
    ]
    // starting to detect plugins in IE
    result = names.map(function (name) {
      try {
        // eslint-disable-next-line no-new
        new window.ActiveXObject(name)
        return name
      } catch (e) {
        return ERROR
      }
    })
  } else {
    result.push(NOT_AVAILABLE)
  }
  if (navigator.plugins) {
    result = result.concat(getRegularPlugins(options))
  }
  return result
}

function getData (done, options) {
  if (isIE()) {
    if (!options.plugins.excludeIE) {
      done(getIEPlugins(options))
    } else {
      done(EXCLUDED)
    }
  } else {
    done(getRegularPlugins(options))
  }
}

export default {
  key: 'plugins',
  getData,
  defaultOptions: {
    sortPluginsFor: [/palemoon/i],
    excludeIE: false
  }
}

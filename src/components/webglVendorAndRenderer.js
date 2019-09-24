import { isWebGlSupported, getWebglCanvas } from '../utils'

const getWebglVendorAndRenderer = () => {
  /* This a subset of the WebGL fingerprint with a lot of entropy, while being reasonably browser-independent */
  try {
    var glContext = getWebglCanvas()
    var extensionDebugRendererInfo = glContext.getExtension(
      'WEBGL_debug_renderer_info'
    )
    return (
      glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) +
      '~' +
      glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL)
    )
  } catch (e) {
    return null
  }
}

function getData (done) {
  if (isWebGlSupported()) {
    done(getWebglVendorAndRenderer())
    return
  }
  done()
}

export default {
  key: 'webglVendorAndRenderer',
  getData
}

export const each = (obj, iterator) => {
  if (Array.isArray(obj)) {
    obj.forEach(iterator)
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key, obj)
      }
    }
  }
}

export const extendSoft = (target, source) => {
  if (source == null) {
    return target
  }
  for (const key in source) {
    const value = source[key]
    if (value != null && !Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = value
    }
  }
  return target
}

export const isCanvasSupported = () => {
  var elem = document.createElement('canvas')
  return !!(elem.getContext && elem.getContext('2d'))
}

export const isWebGlSupported = () => {
  // code taken from Modernizr
  if (!isCanvasSupported()) {
    return false
  }

  var glContext = getWebglCanvas()
  return !!window.WebGLRenderingContext && !!glContext
}

export const getWebglCanvas = () => {
  var canvas = document.createElement('canvas')
  var gl = null
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  } catch (e) {
    /* squelch */
  }
  if (!gl) {
    gl = null
  }
  return gl
}

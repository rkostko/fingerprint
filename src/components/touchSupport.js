// This is a crude and primitive touch screen detection.
// It's not possible to currently reliably detect the  availability of a touch screen
// with a JS, without actually subscribing to a touch event.
// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
// https://github.com/Modernizr/Modernizr/issues/548
// method returns an array of 3 values:
// maxTouchPoints, the success or failure of creating a TouchEvent,
// and the availability of the 'ontouchstart' property
const getTouchSupport = () => {
  var maxTouchPoints = 0
  var touchEvent
  if (typeof navigator.maxTouchPoints !== 'undefined') {
    maxTouchPoints = navigator.maxTouchPoints
  } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
    maxTouchPoints = navigator.msMaxTouchPoints
  }
  try {
    document.createEvent('TouchEvent')
    touchEvent = true
  } catch (_) {
    touchEvent = false
  }
  var touchStart = 'ontouchstart' in window
  return [maxTouchPoints, touchEvent, touchStart]
}

function getData (done) {
  done(getTouchSupport())
}

export default {
  key: 'touchSupport',
  getData
}

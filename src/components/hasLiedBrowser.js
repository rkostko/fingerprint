const getHasLiedBrowser = () => {
  var userAgent = navigator.userAgent.toLowerCase()
  var productSub = navigator.productSub

  // we extract the browser from the user agent (respect the order of the tests)
  var browser
  if (userAgent.indexOf('firefox') >= 0) {
    browser = 'Firefox'
  } else if (userAgent.indexOf('opera') >= 0 || userAgent.indexOf('opr') >= 0) {
    browser = 'Opera'
  } else if (userAgent.indexOf('chrome') >= 0) {
    browser = 'Chrome'
  } else if (userAgent.indexOf('safari') >= 0) {
    browser = 'Safari'
  } else if (userAgent.indexOf('trident') >= 0) {
    browser = 'Internet Explorer'
  } else {
    browser = 'Other'
  }

  if (
    (browser === 'Chrome' || browser === 'Safari' || browser === 'Opera') &&
    productSub !== '20030107'
  ) {
    return true
  }

  // eslint-disable-next-line no-eval
  var tempRes = eval.toString().length
  if (
    tempRes === 37 &&
    browser !== 'Safari' &&
    browser !== 'Firefox' &&
    browser !== 'Other'
  ) {
    return true
  } else if (
    tempRes === 39 &&
    browser !== 'Internet Explorer' &&
    browser !== 'Other'
  ) {
    return true
  } else if (
    tempRes === 33 &&
    browser !== 'Chrome' &&
    browser !== 'Opera' &&
    browser !== 'Other'
  ) {
    return true
  }

  // We create an error to see how it is handled
  var errFirefox
  try {
    // eslint-disable-next-line no-throw-literal
    throw 'a'
  } catch (err) {
    try {
      err.toSource()
      errFirefox = true
    } catch (errOfErr) {
      errFirefox = false
    }
  }
  return errFirefox && browser !== 'Firefox' && browser !== 'Other'
}

function getData (done) {
  done(getHasLiedBrowser())
}

export default {
  key: 'hasLiedBrowser',
  getData
}

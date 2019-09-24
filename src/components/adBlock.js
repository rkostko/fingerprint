const getAdBlock = () => {
  var ads = document.createElement('div')
  ads.innerHTML = '&nbsp;'
  ads.className = 'adsbox'
  var result = false
  try {
    // body may not exist, that's why we need try/catch
    document.body.appendChild(ads)
    result = document.getElementsByClassName('adsbox')[0].offsetHeight === 0
    document.body.removeChild(ads)
  } catch (e) {
    result = false
  }
  return result
}

function getData (done) {
  done(getAdBlock())
}

export default {
  key: 'adBlock',
  getData
}

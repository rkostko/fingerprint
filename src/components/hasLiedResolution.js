const getHasLiedResolution = () => {
  return (
    window.screen.width < window.screen.availWidth ||
    window.screen.height < window.screen.availHeight
  )
}

function getData (done) {
  done(getHasLiedResolution())
}

export default {
  key: 'hasLiedResolution',
  getData
}

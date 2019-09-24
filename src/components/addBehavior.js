function getData (done) {
  // body might not be defined at this point or removed programmatically
  done(!!(document.body && document.body.addBehavior))
}

export default {
  key: 'addBehavior',
  getData
}

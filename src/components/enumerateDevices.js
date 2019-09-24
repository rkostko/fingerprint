var isEnumerateDevicesSupported = function () {
  return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
}

// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
function getData (done, options) {
  if (!isEnumerateDevicesSupported()) {
    return done(options.NOT_AVAILABLE)
  }
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      done(
        devices.map(
          (device) =>
            'id=' +
            device.deviceId +
            ';gid=' +
            device.groupId +
            ';' +
            device.kind +
            ';' +
            device.label
        )
      )
    })
    .catch((error) => {
      done(error)
    })
}

export default {
  key: 'enumerateDevices',
  getData
}

import get, { VERSION } from './'
import * as components from './components'
import * as constants from './constants'
import x64hash128 from './x64hash128'

const Fingerprint2 = {
  get: (options, callback) => {
    if (!callback) {
      callback = options
      options = {}
    } else if (!options) {
      options = {}
    }
    if (!options.components) {
      options.components = components.recommended
    }
    get(options, callback)
  },
  components,
  constants,
  x64hash128,
  VERSION
}

export default Fingerprint2

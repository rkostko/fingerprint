/*
 * Fingerprintjs2 2.1.0 - Modern & flexible browser fingerprint library v2
 * https://github.com/Valve/fingerprintjs2
 * Copyright (c) 2015 Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { extendSoft } from './utils'
export * from './constants'
export * from './components/index'
export { default as x64hash128 } from './x64hash128'
export { extendedFontsList } from './components/fonts'

export const VERSION = '3.0.0'

var defaultOptions = {
  preprocessor: null,
  audio: {
    timeout: 1000,
    // On iOS 11, audio context can only be used in response to user interaction.
    // We require users to explicitly enable audio fingerprinting on iOS 11.
    // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
    excludeIOS11: true
  },
  fonts: {
    swfContainerId: 'fingerprintjs2',
    swfPath: 'flash/compiled/FontList.swf',
    userDefinedFonts: []
  },
  screen: {
    // To ensure consistent fingerprints when users rotate their mobile devices
    detectScreenOrientation: true
  },
  plugins: {
    sortPluginsFor: [/palemoon/i],
    excludeIE: false
  }
}

export default function Fingerprint2 (options, callback) {
  if (!callback) {
    callback = options
    options = {}
  } else if (!options) {
    options = {}
  }
  extendSoft(options, defaultOptions)

  var keys = {
    data: [],
    addPreprocessedComponent: function (key, value) {
      if (typeof options.preprocessor === 'function') {
        value = options.preprocessor(key, value)
      }
      keys.data.push({ key: key, value: value })
    }
  }

  var i = -1
  var chainComponents = function (alreadyWaited) {
    i += 1
    if (i >= options.components.length) {
      // on finish
      callback(keys.data)
      return
    }
    var component = options.components[i]

    if (!alreadyWaited && component.pauseBefore) {
      i -= 1
      setTimeout(function () {
        chainComponents(true)
      }, 1)
      return
    }

    try {
      component.getData(function (value) {
        keys.addPreprocessedComponent(component.key, value)
        chainComponents(false)
      }, options)
    } catch (error) {
      // main body error
      keys.addPreprocessedComponent(component.key, String(error))
      chainComponents(false)
    }
  }

  chainComponents(false)
}

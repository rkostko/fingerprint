import { default as adBlock } from './adBlock'
import { default as addBehavior } from './addBehavior'
import { default as audio } from './audio'
import { default as availableScreenResolution } from './availableScreenResolution'
import { default as canvas } from './canvas'
import { default as colorDepth } from './colorDepth'
import { default as cpuClass } from './cpuClass'
import { default as deviceMemory } from './deviceMemory'
import { default as fonts } from './fonts'
import { default as hardwareConcurrency } from './hardwareConcurrency'
import { default as hasLiedBrowser } from './hasLiedBrowser'
import { default as hasLiedLanguages } from './hasLiedLanguages'
import { default as hasLiedOs } from './hasLiedOs'
import { default as hasLiedResolution } from './hasLiedResolution'
import { default as indexedDb } from './indexedDb'
import { default as language } from './language'
import { default as localStorage } from './localStorage'
import { default as openDatabase } from './openDatabase'
import { default as platform } from './platform'
import { default as plugins } from './plugins'
import { default as screenResolution } from './screenResolution'
import { default as sessionStorage } from './sessionStorage'
import { default as timezone } from './timezone'
import { default as timezoneOffset } from './timezoneOffset'
import { default as touchSupport } from './touchSupport'
import { default as userAgent } from './userAgent'
import { default as webdriver } from './webdriver'
import { default as webgl } from './webgl'
import { default as webglVendorAndRenderer } from './webglVendorAndRenderer'

// Recommended components include all components except:
// - enumerateDevices: Unreliable on Windows,
//    see https://github.com/Valve/fingerprintjs2/issues/375
// - pixelRatio: devicePixelRatio depends on browser zoom, and it's impossible
//    to detect browser zoom
// - doNotTrack: DNT depends on incognito mode for some browsers (Chrome) and
//    it's impossible to detect incognito mode
// - fontsFlash: uses js fonts already
export default [
  adBlock,
  addBehavior,
  audio,
  availableScreenResolution,
  canvas,
  colorDepth,
  cpuClass,
  deviceMemory,
  fonts,
  hardwareConcurrency,
  hasLiedBrowser,
  hasLiedLanguages,
  hasLiedOs,
  hasLiedResolution,
  indexedDb,
  language,
  localStorage,
  openDatabase,
  platform,
  plugins,
  screenResolution,
  sessionStorage,
  timezone,
  timezoneOffset,
  touchSupport,
  userAgent,
  webdriver,
  webgl,
  webglVendorAndRenderer
]

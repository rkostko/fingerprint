<p align="center">
  <a href="https://fingerprintjs.com">
    <img  src="https://fingerprintjs.com/img/logo-raster.png" alt="FPJS logo">
  </a>
</p>
<p align="center">
  <a href="https://travis-ci.org/Valve/fingerprintjs2">
    <img src="https://img.shields.io/travis/Valve/fingerprintjs2.svg?style=flat-square" alt="build status">
  </a>
  <a href="https://gitter.im/Valve/fingerprintjs2">
    <img src="https://badges.gitter.im/Valve/fingerprintjs2.svg" alt="gitter chat">
  </a>
  <a href="https://www.npmjs.com/package/fingerprintjs2">
    <img src="https://img.shields.io/npm/dt/fingerprintjs2.svg?style=flat-square" alt="total downloads from NPM">
  </a>
  <a href="https://www.npmjs.com/package/fingerprintjs2">
    <img src="https://img.shields.io/npm/v/fingerprintjs2.svg?style=flat-square" alt="Current NPM version">
  </a>
  <br/>
</p>
<p align="center">
  <h3>
  <a href="https://fpjs.io">Try FPJS PRO - 99.5% identification accuracy</a>
  </h3>
</p>

## Installation

- CDN: `//cdn.jsdelivr.net/npm/fingerprintjs2@<VERSION>/dist/fingerprint2.min.js` or `https://cdnjs.com/libraries/fingerprintjs2`
- Bower: `bower install fingerprintjs2`
- NPM: `npm install fingerprintjs2`
- Yarn: `yarn add fingerprintjs2`

## Usage

```js
if (window.requestIdleCallback) {
  requestIdleCallback(function() {
    Fingerprint2.get(function(components) {
      console.log(components) // an array of components: {key: ..., value: ...}
    })
  })
} else {
  setTimeout(function() {
    Fingerprint2.get(function(components) {
      console.log(components) // an array of components: {key: ..., value: ...}
    })
  }, 500)
}
```

**Note:** You should not run fingerprinting directly on or after page load. Rather, delay it for a few milliseconds with [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) or [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) to ensure consistent fingerprints. See [#307](https://github.com/Valve/fingerprintjs2/issues/307), [#254](https://github.com/Valve/fingerprintjs2/issues/254), and others.

On my machine (MBP 2013 Core i5) + Chrome 46 the default FP process takes about 80-100ms. If you use `extendedJsFonts` option this time will increase up to 2000ms (cold font cache).

To speed up fingerprint computation, you can exclude font detection (~ 40ms), canvas fingerprint (~ 10ms), WebGL fingerprint (~ 35 ms), and Audio fingerprint (~30 ms).

## Options

To choose which components to include in the fingerprint, pass a list to the `Fingerprint2` function

```js
import Fingerprint2 from 'fingerprint2'
import { canvas, userAgent, webgl } from 'fingerprint2/src/components'

Fingerprint2({
  components: [canvas, userAgent, webgl],
  // other options
})
```

> With tree-shaking (built-in with most modern build tools), imports like these will automatically eliminate all unused fingerprinting code, which should drastically decrease the output size.

For the default options, please see the source code (look for `var defaultOptions = {`).

### Recommended Components

You can also use all recommended components `recommended` import

```js
import Fingerprint2 from 'fingerprint2'
import { recommended } from 'fingerprint2/src/components'

Fingerprint2({
  components: recommended,
  // other options
})
```

### Custom Components

All components are simple objects with `key` (component name) and `getData(done, options)` properties. You can provide the custom components along with any of the used built-in components.

```js
// myCustomComponent.js
const myCustomComponent = {
  key: 'customKey',
  getData: (done, options) => {
    done('infos ...')
  },
}
```

```js
// main.js
import Fingerprint2 from 'fingerprint2'
import { recommended } from 'fingerprint2/src/components'

import myCustomComponent from './myCustomComponent'

Fingerprint2({
  components: [...recommended, myCustomComponent],
  // other options
})
```

### Extended Fonts List

By default, JS font detection will only detect up to 65 installed fonts. If you want to improve the font detection by passing the `extendedFontsList`.

To use extended fonts list, import the `extendedFontsList` array from `fonts` component. This will increase the number of detectable fonts to ~500.

```js
import Fingerprint2 from 'fingerprint2'
import { fonts /*, other components */ } from 'fingerprint2/src/components'
import { extendedFontsList } from 'fingerprint2/src/components/fonts'

Fingerprint2({
  components: [fonts /*, other components */],
  fonts: {
    userDefinedFonts: extendedFontsList,
  },
  // other options
})
```

Note that this option increases fingerprint duration from about 80-100ms to up to 2000ms (cold font cache). It can incur even more overhead on mobile Firefox browsers, which is much slower in font detection, so use it with caution on mobile devices.

The `extendedFontsList` is an array, so it can be easily extended to add more custom fonts:

```js
Fingerprint2({
  components: [fonts /*, other components */],
  fonts: {
    userDefinedFonts: [
      ...extendedFontsList,
      'Nimbus Mono',
      'Junicode',
      'Presto',
    ],
  },
  // other options
})
```

### `fonts.userDefinedFonts`

Specifies an array of user-defined fonts to increase font fingerprint entropy even more.

While hundreds of the most popular fonts are included in the extended font list, you may wish to increase the entropy of the font fingerprint by specifying the `userDefinedFonts` option as an array of font names, **but make sure to call the Fingerprint function after the page load, and not before**, otherwise font detection might not work properly and in a result returned hash might be different every time you reloaded the page.

```js
Fingerprint2.get(
  {
    userDefinedFonts: ['Nimbus Mono', 'Junicode', 'Presto'],
  },
  function(components) {},
)
```

### `fonts.swfContainerId`

Specifies the dom element ID to be used for swf embedding (flash fonts)

### `fonts.swfPath`

Specifies the path to the FontList.swf (flash fonts)

### `screen.detectScreenOrientation` (default: true)

### `plugins.sortPluginsFor` (default: `[/palemoon/i]`)

Some browsers randomise plugin order. You can give a list of user agent regexes for which plugins should be sorted.

### `plugins.excludeIE`

Skip IE plugin enumeration/detection

### `audio.excludeIOS11` (default: true)

iOS 11 prevents audio fingerprinting unless started from a user interaction (screen tap), preventing the fingerprinting process from finishing. If you're sure you start fingerprinting from a user interaction event handler, you may enable audio fingerprinting on iOS 11.

### `audio.timeout` (default: 1000)

maximum time allowed for 'audio' component

### `fontsFlash`

To use Flash font enumeration, make sure you have swfobject available. If you don't, the library will skip the Flash part entirely.

### `preprocessor`

Function that is called with each component value that may be used to modify component values before computing the fingerprint. For example: strip browser version from user agent.

```js
Fingerprint2.get(
  {
    preprocessor: function(key, value) {
      if (key == 'userAgent') {
        var parser = new UAParser(value) // https://github.com/faisalman/ua-parser-js
        var userAgentMinusVersion =
          parser.getOS().name + ' ' + parser.getBrowser().name
        return userAgentMinusVersion
      }
      return value
    },
  },
  function(components) {
    // userAgent component will contain string processed with our function. For example: Windows Chrome
  },
)
```

### Excluding components

The most straight-forward way to exclude components is to not pass them to the `components` list. If you want to use the `recommended` list, but not use all of the components, a workaround is to filter out the unwanted components

```js
import Fingerprint2 from 'fingerprint2'
import { recommended } from 'fingerprint2/src/components'

const excludedComponentKeys = ['userAgent', 'language']

Fingerprint2({
  components: recommended.filter(
    (component) => !excludedComponentKeys.includes(component.key),
  ),
  // other options
})
```

_Note: the above example uses `Array.prototype.includes()`, which is ES2015 feature and is not supported in older browsers. Make sure to use to include a polyfill or use a different method to filter the components._

### Constants

The constants used for unavailable, error'd, or excluded components' values.

- `NOT_AVAILABLE`: Component value if the browser doesn't support the API the component uses (e.g. `enumerateDevices`) or the browser doesn't provide a useful value (e.g. `deviceMemory`).
- `ERROR`: The component function threw an error.
- `EXCLUDED`: The component was excluded.

If you want to use the value of constant, or compare against the value, import them as

```js
import { NOT_AVAILABLE, ERROR, EXCLUDED } from 'fingerprint2/src/constants'
```

## Upgrade guide from 2.0.0

### Recommended components and custom components

Expecting all components to be passed as `options.components` array, for example:

```js
import Fingerprint2 from 'fingerprint2'
import { recommended } from 'fingerprint2/src/components'

Fingerprint2({
  components: recommended,
  // other options
})
```

### Excluded components

Pass only `options.components` which you want to use. If importing the `recommended` components array, filter out the array to exclude the unwanted components.

### Constants

The constants are not configurable. To use the constants in your custom components or to compare against the constant, import constants as

```js
import { NOT_AVAILABLE, ERROR, EXCLUDED } from 'fingerprint2/src/constants'
```

### Backwards compatibility mode

The backwards compatibility mode function (`Fingerprint2.getV18`). If you wish to keep using [the exact implementation](https://github.com/Valve/fingerprintjs2/blob/bf7039da92655f981b2b958bb51a031e15601dbe/fingerprint2.js#L1378-L1420), you can copy it to your codebase.

## Upgrade guide from 1.8.2 to 2.0.0

### Backwards compatibility mode

Fingerprintjs2 v2.0 provides a v1.8 compatibility wrapper that keeps user's fingerprints identical to the ones generated with v1.8. Note that we will drop this wrapper at some point.

Note that the `options` parameter **must be provided in v2.0 syntax**.

```js
// options must be provided in v2.0 syntax
Fingerprint2.getV18(options, function(result, components) {
  // result is murmur hash fingerprint
  // components is array of {key: 'foo', value: 'component value'}
})
```

### get and getPromise

`Fingerprint2.get` is now a static function. It replaces `new Fingerprint2().get`. It will not hash the result by default anymore.

```
var options = {}
Fingerprint2.get(options, function (components) {
  // components is array of {key: 'foo', value: 'component value'}
    ...
})

// or

Fingerprint2.getPromise(options).then(function (components) {
  // components is array of {key: 'foo', value: 'component value'}
    ...
})
```

Fingerprint2 ships with the murmur hash function that you may use to create a hash fingerprint:

```
Fingerprint2.get(options, function (components) {
    var values = components.map(function (component) { return component.value })
    var murmur = Fingerprint2.x64hash128(values.join(''), 31)
})
```

### Excludes

Before exclusion was done by putting an individual excludes like `excludeTouchSupport: true` in the options.

To exclude a component now, put its key inside the excludes object in options

```
var options = {excludes: {touchSupport: true}}
```

### Custom Entropy Function

`options.customEntropyFunction` and `customKey` have been replaced with a extension friendly, stable alternative. The new contract allows for async sources as well. See below for component definition. `options.extraComponents` should contain an array with custom components.

```
var options = {
    extraComponents : [
        {key: 'customKey', getData: function (done, options) {
            done('infos ...')
        }
    ]
}
```

### jsfonts and flashFonts

jsfonts has been renamed into fonts. fontsFlash and fonts are now separate components. `fontsFlash` is excluded by default.

### Consistent names for components

Components keys are now all camelCase. Example `'userAgent'` -> `'userAgent'`

### `Fingerprint2.x64hash128`

Fingerprint2.x64hash128 static function is now exposed

### Error constants are exposed and configurable

```
Fingerprint2.NOT_AVAILABLE = 'not available'
Fingerprint2.ERROR = 'error'
Fingerprint2.EXCLUDED = 'excluded'
```

### audioTimeout

audioTimeout is an option, default 1000ms

## Development

### Component

A components is an object with at least key and getData keys, example:

```
{key: 'userAgent', getData: UserAgent, pauseBefore: false}
```

getData value is the components function.

### Component function

A components function takes done as first argument, and options as an optional second argument.
It must call done exactly once with a value that can be cast to a String.
It must wrap all unreachable code (setTimeout, requestAnimationFrame, etc) in its own try catch,
it should use catch as an opportunity to give a unique value to `done`

```
function (done, options) {
  done(navigator.userAgent)
}
```

### Tests

Unit tests are in `specs/specs.js`

`npm test` to launch the tests, it requires phanomjs install

To run the tests in the browser, launch `spec_runner.html`

## Other

### Future development

Many more fingerprinting sources will be implemented, such as (in no particular order)

- Multi-monitor detection,
- Internal HashTable implementation detection
- WebRTC fingerprinting
- Math constants
- Accessibility fingerprinting
- Camera information
- DRM support
- Accelerometer support
- Virtual keyboards
- List of supported gestures (for touch-enabled devices)
- Pixel density
- Video and audio codecs availability

### To recompile the `FontList.swf` file:

- Download [Adobe Flex SDK](http://www.adobe.com/devnet/flex/flex-sdk-download.html)
- Unzip it, add the `bin/` directory to your `$PATH` (mxmlc binary should be in path)
- Run `make`

### Talk about the library (in Russian) on FrontEnd Conf 2015

https://player.vimeo.com/video/151208427

#### License: MIT or Apache, whichever you prefer

[npm-link]: https://www.npmjs.com/package/fingerprintjs2

## Contributors

[<img alt="Valve" src="https://avatars1.githubusercontent.com/u/27387?v=4&s=117" width="117">](https://github.com/Valve)[<img alt="jonashaag" src="https://avatars1.githubusercontent.com/u/175722?v=4&s=117" width="117">](https://github.com/jonashaag)[<img alt="antoinevastel" src="https://avatars1.githubusercontent.com/u/5827148?v=4&s=117" width="117">](https://github.com/antoinevastel)[<img alt="S-anasol" src="https://avatars2.githubusercontent.com/u/1709666?v=4&s=117" width="117">](https://github.com/S-anasol)[<img alt="unDemian" src="https://avatars1.githubusercontent.com/u/2129455?v=4&s=117" width="117">](https://github.com/unDemian)

[<img alt="nuschk" src="https://avatars1.githubusercontent.com/u/5167117?v=4&s=117" width="117">](https://github.com/nuschk)[<img alt="hiuny" src="https://avatars2.githubusercontent.com/u/2697067?v=4&s=117" width="117">](https://github.com/hiuny)[<img alt="wkdtjsgur100" src="https://avatars2.githubusercontent.com/u/17163958?v=4&s=117" width="117">](https://github.com/wkdtjsgur100)[<img alt="msp" src="https://avatars1.githubusercontent.com/u/15280?v=4&s=117" width="117">](https://github.com/msp)[<img alt="ProcrastinatorCp" src="https://avatars3.githubusercontent.com/u/29228904?v=4&s=117" width="117">](https://github.com/ProcrastinatorCp)

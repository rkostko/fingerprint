import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

import config from './package.json'

module.exports = [
  {
    input: 'src/browser.js',
    output: {
      file: config.browser,
      format: 'umd',
      name: 'Fingerprint2'
    },
    plugins: [commonjs(), resolve(), babel(), uglify()]
  }
]

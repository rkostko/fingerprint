import fs from 'fs'
import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

import config from './package.json'

const licenseContents = fs.readFileSync(
  path.resolve(__dirname, 'license.txt'),
  { encoding: 'utf-8' }
)

const commonPlugins = [
  replace({
    NPM_VERSION: JSON.stringify(config.version)
  }),
  babel()
]

module.exports = [
  {
    input: 'src/browser.js',
    output: {
      file: config.browser,
      format: 'umd',
      name: 'Fingerprint2',
      banner: licenseContents.replace('{YEAR}', new Date().getFullYear())
    },
    plugins: [
      commonjs(),
      resolve(),
      ...commonPlugins,
      uglify({
        output: {
          ascii_only: true,
          comments: (_, comment) => {
            // Do not remove the license comments.
            return /Fingerprintjs2|Licensed under/.test(comment.value)
          }
        }
      })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      { file: config.main, format: 'cjs', exports: 'named' },
      { file: config.module, format: 'es', exports: 'named' }
    ],
    plugins: commonPlugins
  }
]

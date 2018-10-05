import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/slackStatusPlugin.js',
  output: [{
    name: 'slackStatusPlugin',
    file: 'dist/slackStatusPlugin.min.js',
    format: 'iife'
  }],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    uglify()
  ]
}

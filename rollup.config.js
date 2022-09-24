import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'

const production = !process.env.ROLLUP_WATCH

const plugins = [
  svelte({
    preprocess: sveltePreprocess({ sourceMap: !production }),
    compilerOptions: {
      dev: !production,
    },
  }),
  css({ output: 'bundle.css' }),

  resolve({
    browser: true,
    dedupe: ['svelte'],
  }),
  commonjs(),
  typescript({
    sourceMap: !production,
    inlineSources: !production,
  }),

  !production && serve(),
  !production && livereload('public'),
  production && terser(),
]

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn('yarn', ['start', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      })

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default [
  {
    input: production ? 'src/main.ts' : 'src/dev.ts',
    output: {
      sourcemap: !production,
      format: 'iife',
      name: 'main',
      file: production ? 'public/dist/main.js' : 'public/dist/dev.js',
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  },
  {
    input: 'src/pages/popup/index.ts',
    output: {
      sourcemap: !production,
      format: 'iife',
      name: 'popup',
      file: 'public/dist/popup.js',
    },
    plugins,
  },
  {
    input: 'src/pages/options/index.ts',
    output: {
      sourcemap: !production,
      format: 'iife',
      name: 'options',
      file: 'public/dist/options.js',
      inlineDynamicImports: true,
    },
    plugins,
  },
  {
    input: 'src/background.ts',
    output: { name: 'background', file: 'public/dist/background.js', sourcemap: !production },
    plugins: [
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }),
    ],
  },
]

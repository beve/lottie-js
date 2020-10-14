import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json';

// Whether current node environment is production mode
const isProduction = process.env.NODE_ENV === 'production';

// String replacement definitions
const replacements = {
  'process.env.GENERATOR': `'${pkg.name} ${pkg.version}'`,
};

export default [
  // UMD build for browser
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'Lottie',
        exports: 'named',
        sourcemap: true,
      },
    ],

    plugins: [
      // Resolve node_modules
      resolve({
        browser: true,
      }),

      // Convert CJS modules to ES
      commonjs(),

      // Remove debugger statements and console.log calls
      isProduction && strip(),

      // Build
      esbuild({
        minify: isProduction,
        target: 'es2015', // default, or 'es20XX', 'esnext'

        // String replacements
        define: replacements,
      }),
    ],
  },

  // CJS build for NodeJS and ES build for bundlers and modern browsers
  {
    input: 'src/index.ts',

    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],

    external: Object.keys(pkg.dependencies || {}),

    plugins: [
      // Remove debugger statements and console.log calls
      isProduction && strip(),

      // Build
      esbuild({
        minify: isProduction,
        target: 'es2018', // default, or 'es20XX', 'esnext'

        // String replacements
        define: replacements,
      }),
    ],
  },

  // Build Typescript type declarations
  {
    input: 'src/index.ts',

    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],

    plugins: [dts()],
  },
];

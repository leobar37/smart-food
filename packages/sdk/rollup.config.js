import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const packageJson = require('./package.json');

/**
 * @type {import('rollup').RollupOptions}
 */

export default [
  {
    external: ['graphql-request', 'graphql'],
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: false,
      }),
      json(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelrc: true,
        runtimeHelpers: true,
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];

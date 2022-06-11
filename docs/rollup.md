# Rollup

## Plugins

### Node Resolve

A rollup plugin which locates modules using the
Node resolution algorithm, for using third party modules
in node_modules [link](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

### Commonjs

A rollup plugin to convert Common JS modules to ES6, so they can be included in a Rollup bundle.

[link](https://www.npmjs.com/package/@rollup/plugin-commonjs)

### Typescript

A Rollup plugin for seamless integration between Rollup and Typescript.

[link](https://www.npmjs.com/package/@rollup/plugin-typescript)

### dts

This is a plugin that lets your roll up `.d.ts` definition file.

[link](https://www.npmjs.com/package/rollup-plugin-dts)

```js
import dts from 'rollup-plugin-dts';

const config = [
  // …
  {
    input: './my-input/index.d.ts',
    //
    output: [{ file: 'dist/my-library.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
```

### plugin json

A Rollup plugin wich converts .json files to ES6 modules

[link](https://www.npmjs.com/package/@rollup/plugin-json)

### terser

Minify generated es bundle, Uses [terser](https://github.com/terser/terser) under the hood.

[plugin](https://www.npmjs.com/package/rollup-plugin-terser)

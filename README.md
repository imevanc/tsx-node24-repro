# tsx + Node 24 Bug Reproduction

Minimal reproduction for a `tsx` bug where it incorrectly resolves `.js` files inside `node_modules` to `.jsx` extensions on Node 24.x

## Bug

When using `node --import=tsx/esm` on Node 24, tsx's custom resolver applies TypeScript-style extension resolution (`.ts`, `.tsx`, `.jsx`) to files inside `node_modules`. This causes `ajv/dist/compile/index.js` to be resolved as `index.jsx`, which doesn't exist.

## Steps to Reproduce

```bash
node --version  # Must be v24.x
npm install
npm test
```

## Expected
Fastify loads successfully. tsx should not rewrite extensions for paths inside node_modules.

## Actual
Error: Cannot find module '.../node_modules/ajv/dist/compile/index.jsx'
The resolver in 
register-D_B8UL5H.mjs
 calls resolveExtensionsSync → resolveDirectorySync → resolveTsPathsSync on a node_modules path, appending .jsx instead of using the existing .js file.

## Environment
- Node.js: v24.13.0
- tsx: 4.22.1
- OS: macOS (darwin)

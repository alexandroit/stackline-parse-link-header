import assert from 'node:assert/strict'
import vm from 'node:vm'
import { build } from 'esbuild'

const buildResult = await build({
  bundle: true,
  entryPoints: [new URL('../index.mjs', import.meta.url).pathname],
  format: 'iife',
  globalName: 'StacklineLinkHeader',
  platform: 'browser',
  write: false
})

const source = buildResult.outputFiles[0].text
assert.equal(source.includes('require("url")'), false)
assert.equal(source.includes('require("querystring")'), false)

const context = { URLSearchParams }
vm.runInNewContext(source, context)
const parsed = context.StacklineLinkHeader.default(
  '<https://example.test/?page=2>; rel="next"'
)

assert.equal(parsed.next.page, '2')
assert.equal(parsed.next.url, 'https://example.test/?page=2')
console.log('Browser bundle executed without process or Node.js polyfills.')


import assert from 'node:assert/strict'
import parseLinkHeader, { parseLinkHeader as named } from '../index.mjs'

assert.equal(parseLinkHeader, named)
assert.deepEqual(parseLinkHeader('<x?page=2>; rel="next"'), {
  next: { page: '2', rel: 'next', url: 'x?page=2' }
})
console.log('ESM default and named exports passed.')


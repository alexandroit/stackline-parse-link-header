'use strict'

const assert = require('assert')
const parse = require('..')
const deep = require('../index.js')

assert.strictEqual(parse, deep)
assert.deepStrictEqual(parse('<x?page=2>; rel="next"'), {
  next: { page: '2', rel: 'next', url: 'x?page=2' }
})
assert.strictEqual(parse(''), null)
console.log(`Runtime compatibility passed on Node ${process.version}.`)


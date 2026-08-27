'use strict'

const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const { performance } = require('node:perf_hooks')
const { test } = require('node:test')
const parse = require('..')

test('exports the callable parser and a named CommonJS alias', () => {
  assert.equal(typeof parse, 'function')
  assert.equal(parse.parseLinkHeader, parse)
})

test('returns null for all historical empty values', () => {
  assert.equal(parse(null), null)
  assert.equal(parse(undefined), null)
  assert.equal(parse(false), null)
  assert.equal(parse(0), null)
})

test('supports per-call length controls', () => {
  const header = '<https://example.test/>; rel="next"'
  assert.equal(parse(header, { maxHeaderLength: 5 }), null)
  assert.throws(
    () => parse(header, {
      maxHeaderLength: 5,
      throwOnMaxHeaderLengthExceeded: true
    }),
    /under 5 characters/
  )
})

test('per-call false overrides a throwing environment default', () => {
  const child = spawnSync(process.execPath, ['-e', [
    "const parse = require('./index.js')",
    "const value = parse('<https://x.test/>; rel=next', { throwOnMaxHeaderLengthExceeded: false })",
    'if (value !== null) process.exit(1)'
  ].join(';')], {
    cwd: require('node:path').resolve(__dirname, '..'),
    encoding: 'utf8',
    env: {
      ...process.env,
      PARSE_LINK_HEADER_MAXLEN: '5',
      PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED: '1'
    }
  })
  assert.equal(child.status, 0, child.stderr)
})

test('keeps environment length compatibility', () => {
  const child = spawnSync(process.execPath, ['-e', [
    "const parse = require('./index.js')",
    "parse('<https://x.test/>; rel=next')"
  ].join(';')], {
    cwd: require('node:path').resolve(__dirname, '..'),
    encoding: 'utf8',
    env: {
      ...process.env,
      PARSE_LINK_HEADER_MAXLEN: '5',
      PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED: 'yes'
    }
  })
  assert.notEqual(child.status, 0)
  assert.match(child.stderr, /under 5 characters/)
})

test('accepts whitespace around parameter separators', () => {
  assert.deepEqual(parse('<x>; rel = next; title = "hello world"'), {
    next: { rel: 'next', title: 'hello world', url: 'x' }
  })
})

test('parses quoted semicolons, commas, and escaped quotes', () => {
  const parsed = parse('<x>; rel="next"; title="a;b, <c> and \\"d\\""')
  assert.equal(parsed.next.title, 'a;b, <c> and "d"')
})

test('preserves duplicate query values as arrays', () => {
  assert.deepEqual(parse('<x?a=1&a=2>; rel="next"').next.a, ['1', '2'])
})

test('stops query parsing at a URL fragment', () => {
  assert.equal(parse('<x?q=1#ignored=2>; rel="next"').next.q, '1')
  assert.equal(parse('<x#fragment?q=1>; rel="next"').next.q, undefined)
})

test('ignores prototype-sensitive query and attribute keys', () => {
  delete Object.prototype.polluted
  const parsed = parse(
    '<x?__proto__=query&constructor=query&prototype=query&safe=yes>; ' +
    'rel="next"; __proto__="attribute"; constructor="attribute"; prototype="attribute"'
  )

  assert.equal(Object.prototype.polluted, undefined)
  assert.equal(Object.getPrototypeOf(parsed), Object.prototype)
  assert.equal(Object.getPrototypeOf(parsed.next), Object.prototype)
  assert.deepEqual(parsed, { next: { safe: 'yes', rel: 'next', url: 'x?__proto__=query&constructor=query&prototype=query&safe=yes' } })
})

test('ignores prototype-sensitive relation names', () => {
  const parsed = parse(
    '<x>; rel="__proto__", <y>; rel="prototype", <z>; rel="constructor", <safe>; rel="next"'
  )
  assert.deepEqual(parsed, { next: { rel: 'next', url: 'safe' } })
  assert.equal(Object.getPrototypeOf(parsed), Object.prototype)
})

test('retains safe inherited-name relations as own properties', () => {
  const parsed = parse('<x>; rel="toString valueOf"')
  assert.equal(Object.prototype.hasOwnProperty.call(parsed, 'toString'), true)
  assert.equal(Object.prototype.hasOwnProperty.call(parsed, 'valueOf'), true)
})

test('handles malformed entries without throwing', () => {
  assert.deepEqual(parse('not-a-link'), {})
  assert.deepEqual(parse('<missing-close; rel="next"'), {})
  assert.deepEqual(parse('<x> rel="next"'), {})
})

test('keeps parser work linear when a caller raises the limit', () => {
  const title = 'x'.repeat(1_000_000)
  const header = `<x>; rel="next"; title="${title}"`
  const started = performance.now()
  const parsed = parse(header, { maxHeaderLength: header.length })
  const elapsed = performance.now() - started

  assert.equal(parsed.next.title.length, title.length)
  assert.ok(elapsed < 5000, `one-million-character parse took ${elapsed}ms`)
})

test('uses the default for invalid option lengths', () => {
  assert.equal(parse('<x>; rel="next"', { maxHeaderLength: Number.NaN }).next.url, 'x')
  assert.equal(parse('<x>; rel="next"', { maxHeaderLength: -1 }).next.url, 'x')
})


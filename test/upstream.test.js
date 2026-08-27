'use strict'

const assert = require('node:assert/strict')
const { test } = require('node:test')
const parse = require('..')

test('parses next and last links with query parameters', () => {
  const header =
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' +
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"'

  assert.deepEqual(parse(header), {
    next: {
      client_id: '1',
      client_secret: '2',
      page: '2',
      per_page: '100',
      rel: 'next',
      url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100'
    },
    last: {
      client_id: '1',
      client_secret: '2',
      page: '3',
      per_page: '100',
      rel: 'last',
      url: 'https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100'
    }
  })
})

test('handles unquoted relationships', () => {
  assert.deepEqual(parse('<https://example.test/?page=2>; rel=next'), {
    next: { page: '2', rel: 'next', url: 'https://example.test/?page=2' }
  })
})

test('parses next, previous, and last links', () => {
  const header =
    '<https://example.test/?page=3>; rel="next", ' +
    '<https://example.test/?page=1>; rel="prev", ' +
    '<https://example.test/?page=5>; rel="last"'

  assert.deepEqual(Object.keys(parse(header)), ['next', 'prev', 'last'])
})

test('returns null for an empty header', () => {
  assert.equal(parse(''), null)
})

test('ignores links without a relation', () => {
  assert.deepEqual(
    parse('<https://example.test/?page=3>; rel="next", <https://example.test/?page=1>; pet="cat"'),
    { next: { page: '3', rel: 'next', url: 'https://example.test/?page=3' } }
  )
})

test('preserves properties besides rel', () => {
  assert.deepEqual(
    parse('<https://example.test/?page=3>; rel="next"; hello="world"; pet="cat"'),
    {
      next: {
        page: '3',
        rel: 'next',
        hello: 'world',
        pet: 'cat',
        url: 'https://example.test/?page=3'
      }
    }
  )
})

test('preserves commas inside URLs', () => {
  assert.deepEqual(
    parse('<https://example.test/?name=What,+me+worry>; rel="next";'),
    {
      next: {
        name: 'What, me worry',
        rel: 'next',
        url: 'https://example.test/?name=What,+me+worry'
      }
    }
  )
})

test('expands a multi-word relation', () => {
  const parsed = parse('<https://example.test/>; rel="next page";')
  assert.deepEqual(parsed.next, {
    rel: 'next',
    url: 'https://example.test/'
  })
  assert.deepEqual(parsed.page, {
    rel: 'page',
    url: 'https://example.test/'
  })
})

test('preserves matrix parameters in URLs', () => {
  const url = 'https://example.test/segment;foo=bar;baz/item?name=What,+me+worry'
  assert.equal(parse(`<${url}>; rel="next";`).next.url, url)
})

test('returns null for an over-limit header', () => {
  assert.equal(parse(`; rel="${' '.repeat(10000)}",`), null)
})

test('later links retain the upstream last-wins behavior', () => {
  assert.equal(
    parse('<https://example.test/one>; rel="item", <https://example.test/two>; rel="item"').item.url,
    'https://example.test/two'
  )
})


'use strict'

const assert = require('node:assert/strict')
const baseline = require('parse-link-header-baseline')
const maintained = require('..')

let state = 0x51a7c0de

function random () {
  state = (state * 1664525 + 1013904223) >>> 0
  return state / 0x100000000
}

function pick (values) {
  return values[Math.floor(random() * values.length)]
}

function makeLink (index) {
  const relation = pick(['next', 'prev', 'last', 'first', 'next page'])
  const page = 1 + Math.floor(random() * 500)
  const query = [
    `page=${page}`,
    `per_page=${pick([10, 20, 50, 100])}`,
    `name=${encodeURIComponent(pick(['alpha', 'beta value', 'gamma,delta']))}`
  ]
  if (random() > 0.6) query.push(`tag=${index}`, `tag=${index + 1}`)
  const properties = [`rel="${relation}"`]
  if (random() > 0.5) properties.push(`title="item-${index}"`)
  if (random() > 0.7) properties.push('kind=collection')
  return `<https://api.example.test/items/${index};matrix=yes?${query.join('&')}>; ${properties.join('; ')}`
}

for (let index = 0; index < 1000; index += 1) {
  const count = 1 + Math.floor(random() * 4)
  const header = Array.from({ length: count }, (_, offset) => makeLink(index + offset)).join(', ')
  assert.deepEqual(maintained(header), baseline(header), `differential case ${index}`)
}

console.log('1,000 differential HTTP Link headers matched parse-link-header@2.0.0.')


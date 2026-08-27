import parseLinkHeader = require('@stackline/parse-link-header')

const parsed = parseLinkHeader('<x>; rel="next"', {
  throwOnMaxHeaderLengthExceeded: false
})

if (parsed?.next) {
  const relation: string = parsed.next.rel
  void relation
}


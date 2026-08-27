const parseLinkHeader = require('@stackline/parse-link-header')

const links = parseLinkHeader(
  '<https://api.example.test/items?page=2>; rel="next"'
)

console.log(links.next)


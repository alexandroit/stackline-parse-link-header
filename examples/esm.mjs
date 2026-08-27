import parseLinkHeader from '@stackline/parse-link-header'

const links = parseLinkHeader(
  '<https://api.example.test/items?page=2>; rel="next"',
  { maxHeaderLength: 4096 }
)

console.log(links.next)

import parseLinkHeader = require('../../index')

const parsed: parseLinkHeader.Links | null = parseLinkHeader(
  '<https://example.test/?page=2>; rel="next"',
  { maxHeaderLength: 2000 }
)

if (parsed && parsed.next) {
  const url: string = parsed.next.url
  const value: parseLinkHeader.ParameterValue | undefined = parsed.next.page
  void url
  void value
}


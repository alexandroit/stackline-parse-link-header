import parseLinkHeader, {
  parseLinkHeader as named,
  type Links,
  type Options
} from '@stackline/parse-link-header'

const options: Options = { maxHeaderLength: 4096 }
const first: Links | null = parseLinkHeader('<x>; rel="next"', options)
const second: Links | null = named('<x>; rel="next"')
void first
void second


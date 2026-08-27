# @stackline/parse-link-header

[![CI](https://github.com/alexandroit/stackline-parse-link-header/actions/workflows/ci.yml/badge.svg)](https://github.com/alexandroit/stackline-parse-link-header/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@stackline/parse-link-header.svg)](https://www.npmjs.com/package/@stackline/parse-link-header)
[![license](https://img.shields.io/npm/l/@stackline/parse-link-header.svg)](LICENSE)

Parse HTTP `Link` headers into the relation-keyed pagination object used by
`parse-link-header@2.0.0`. This independent maintained continuation keeps the
CommonJS API while adding native ESM, first-party TypeScript declarations,
browser-safe loading, runtime options, and parser hardening.

## Install

```bash
npm install @stackline/parse-link-header
```

Keep existing source imports unchanged with an npm alias:

```bash
npm install parse-link-header@npm:@stackline/parse-link-header
```

```js
const parseLinkHeader = require('parse-link-header')
```

## Usage

```js
import parseLinkHeader from '@stackline/parse-link-header'

const links = parseLinkHeader(
  '<https://api.example.test/items?page=2>; rel="next", ' +
  '<https://api.example.test/items?page=8>; rel="last"'
)

console.log(links.next.page) // "2"
console.log(links.next.url)  // complete next-page URL
```

The named ESM export is also available:

```js
import { parseLinkHeader } from '@stackline/parse-link-header'
```

## Runtime limits

Parsing is bounded to 2,000 characters by default, preserving the mitigation
introduced upstream for [CVE-2021-23490](https://github.com/advisories/GHSA-q674-xm3x-2926).
An over-limit value returns `null` unless throwing is enabled.

```js
parseLinkHeader(header, {
  maxHeaderLength: 8192,
  throwOnMaxHeaderLengthExceeded: true
})
```

The historical environment variables remain supported:

- `PARSE_LINK_HEADER_MAXLEN`
- `PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED`

Per-call options take precedence and are suitable for browser applications
where `process.env` is unavailable.

## Compatibility

The maintained package preserves the established contract:

- callable CommonJS default export;
- default and named ESM exports;
- `null` for empty or silently rejected over-limit input;
- a plain object keyed by each `rel` token;
- query values, URL, relation, and extension parameters on each link;
- arrays for repeated query keys;
- expansion of space-separated relations;
- last-link-wins behavior when a relation is repeated;
- `index` and `index.js` deep imports;
- the default length bound and historical environment controls.

Intentional hardening discards parser-controlled `__proto__`, `prototype`, and
`constructor` keys. Quoted parameters correctly retain semicolons, commas, and
escaped quotes. Malformed links remain ignored rather than crashing the whole
header.

See [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](MIGRATION.md) for the complete boundary.

## Support

- Node.js 12 through 24 are tested.
- CommonJS, native ESM, and browser bundles are tested.
- TypeScript 3.9 and the current compiler are tested.
- The package has zero runtime dependencies.

## Project documents

- [Changelog](CHANGELOG.md)
- [Compatibility contract](COMPATIBILITY_CONTRACT.md)
- [Migration guide](MIGRATION.md)
- [Security policy](SECURITY.md)
- [Dependency decisions](DEPENDENCY_DECISIONS.md)
- [Upstream audit](UPSTREAM_AUDIT.md)
- [Third-party licenses](THIRD_PARTY_LICENSES.md)

## License and attribution

MIT. The original copyright notice for Thorsten Lorenz is preserved in
[LICENSE](LICENSE). This project is independent and is not affiliated with or
endorsed by the original author.


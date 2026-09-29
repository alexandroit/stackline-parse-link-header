# @stackline/parse-link-header

> Compatibility-first HTTP Link header parser for Node.js and browsers.

[![npm version](https://img.shields.io/npm/v/@stackline/parse-link-header.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/parse-link-header)
[![license](https://img.shields.io/npm/l/@stackline/parse-link-header.svg?style=flat-square)](https://github.com/alexandroit/stackline-parse-link-header)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-parse-link-header-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-parse-link-header)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/parse-link-header/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/parse-link-header/)** | **[npm](https://www.npmjs.com/package/@stackline/parse-link-header)** | **[Issues](https://github.com/alexandroit/stackline-parse-link-header/issues)** | **[Repository](https://github.com/alexandroit/stackline-parse-link-header)**

**Current package version:** `1.0.2`

---

## Why this package?

Parse HTTP `Link` headers into the relation-keyed pagination object used by
`parse-link-header@2.0.0`. This independent maintained continuation keeps the
CommonJS API while adding native ESM, first-party TypeScript declarations,
browser-safe loading, runtime options, and parser hardening.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/parse-link-header@1.0.2` |
| Node.js runtime | `>=12` |
| CommonJS / primary entry | `./index.js` |
| ES module entry | `./index.mjs` |
| Type declarations | `./index.d.ts` |

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

See [COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-parse-link-header/blob/main/COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](https://github.com/alexandroit/stackline-parse-link-header/blob/main/MIGRATION.md) for the complete boundary.

## Installation

<a id="install"></a>

### Install

```bash
npm install @stackline/parse-link-header
```

Keep existing source imports unchanged with an npm alias:

## Usage

```bash
npm install parse-link-header@npm:@stackline/parse-link-header
```

```js
const parseLinkHeader = require('parse-link-header')
```

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

## Features and Integrations

<a id="runtime-limits"></a>

### Runtime limits

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

<a id="project-documents"></a>

### Project documents

- [Changelog](https://github.com/alexandroit/stackline-parse-link-header/blob/main/CHANGELOG.md)
- [Compatibility contract](https://github.com/alexandroit/stackline-parse-link-header/blob/main/COMPATIBILITY_CONTRACT.md)
- [Migration guide](https://github.com/alexandroit/stackline-parse-link-header/blob/main/MIGRATION.md)
- [Security policy](https://github.com/alexandroit/stackline-parse-link-header/blob/main/SECURITY.md)
- [Dependency decisions](https://github.com/alexandroit/stackline-parse-link-header/blob/main/DEPENDENCY_DECISIONS.md)
- [Upstream audit](https://github.com/alexandroit/stackline-parse-link-header/blob/main/UPSTREAM_AUDIT.md)
- [Third-party licenses](https://github.com/alexandroit/stackline-parse-link-header/blob/main/THIRD_PARTY_LICENSES.md)

## Security

Review inputs and the package-specific compatibility limits before processing untrusted data. Report suspected vulnerabilities as described in the [security policy](https://github.com/alexandroit/stackline-parse-link-header/blob/main/SECURITY.md).

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-parse-link-header.git
cd stackline-parse-link-header
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-parse-link-header/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## License

<a id="license-and-attribution"></a>

### License and attribution

MIT. The original copyright notice for Thorsten Lorenz is preserved in
[LICENSE](https://github.com/alexandroit/stackline-parse-link-header/blob/main/LICENSE). This project is independent and is not affiliated with or
endorsed by the original author.

## Credits and original authors

- Stackline Maintainers.
- Thorsten Lorenz.
- Copyright 2013 Thorsten Lorenz.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.

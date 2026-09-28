# Changelog

## [1.0.1] - 2026-09-28

- Organize package documentation, preserve API and migration examples, and add Stackline community links.
- Improve package discovery keywords with precise domain terms and `stackline`.
- Pin GitHub Actions release tooling and require an explicit missing-version response before publication.


## 1.0.0 - 2026-08-27

- Preserve the `parse-link-header@2.0.0` callable CommonJS contract.
- Add native ESM default and named exports.
- Add first-party declarations compatible with TypeScript 3.9 and current.
- Remove all runtime dependencies and Node.js core-module requirements.
- Load safely in Angular, Vite, Rollup, Webpack 5, and browser bundles without
  a `process` global or Node polyfills.
- Add per-call length options while retaining historical environment controls.
- Preserve the upstream CVE-2021-23490 length mitigation and use linear parser
  scans when callers intentionally raise the limit.
- Ignore prototype-sensitive parser-controlled keys.
- Correct quoted parameter parsing for semicolons, commas, and escaped quotes.

# Issue and Pull Request Triage

## Incorporated

- #22, #26, #31: browser builds no longer require Node core polyfills or a
  global `process` object.
- #28: per-call runtime options are supported, while environment controls are
  retained for compatibility.
- #30: first-party TypeScript declarations are included.
- PR #25 / CVE-2021-23490: the default input bound remains in place and is
  covered by regression tests.
- PR #24 and the web3-storage fork informed the zero-runtime-dependency browser
  path, without adopting their breaking named-only ESM contract.

## Deliberately not incorporated

- #11 / PR #12: repeated relation keys remain last-wins. Returning an array
  would break the established output type and consumers.
- #20: query values remain strings, with arrays for repeated keys. Implicit
  numeric coercion would be a breaking change.
- PR #19: native assignment alone does not provide a complete unsafe-key
  boundary; the implementation uses a centralized setter instead.
- PR #29: documentation-only formatting had no runtime relevance.


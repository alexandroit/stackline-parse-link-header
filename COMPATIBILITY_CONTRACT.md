# Compatibility Contract

## Baseline

The behavioral baseline is `parse-link-header@2.0.0`.

## Preserved

- `module.exports = parseLinkHeader` and one-argument calls.
- Empty values and silently rejected over-limit headers return `null`.
- Valid headers return plain objects keyed by relation.
- URL query parameters are included and extension parameters override them.
- Every link includes `url` and `rel`.
- Repeated query parameters become arrays.
- Space-separated relation values create one output entry per token.
- A later link replaces an earlier link with the same relation.
- The 2,000-character default and both historical environment variables.
- CommonJS root, `index`, and `index.js` imports.

## Additive

- default and named native ESM exports;
- first-party TypeScript declarations;
- `maxHeaderLength` and `throwOnMaxHeaderLengthExceeded` per-call options;
- browser execution without `process`, `url`, or `querystring` polyfills.

## Intentional corrections

- `__proto__`, `prototype`, and `constructor` from untrusted parser fields are
  ignored instead of being assigned to ordinary objects.
- quoted extension values retain delimiters and escaped quotes;
- whitespace around parameter names and equals signs is accepted;
- malformed individual links are ignored without aborting valid siblings.

The output shape is intentionally not replaced by a spec-oriented class or an
array. Packages requiring a different RFC 8288 model should use a dedicated
Link-header implementation instead of assuming drop-in compatibility.


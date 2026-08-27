# Upstream Audit

Date: 2026-08-27

## Identity and maintenance

- Package: `parse-link-header@2.0.0`.
- Repository: https://github.com/thlorenz/parse-link-header
- License: MIT.
- Last npm release: 2021-12-16.
- Last substantive runtime release fixed CVE-2021-23490 by adding a default
  input-length bound.
- Current repository has open browser, runtime-options, typing, and duplicate
  relation issues.

## Current demand

- Complete week 2026-08-17 through 2026-08-23: 2,369,035 downloads.
- Latest measured 30 days: 9,691,738 downloads.
- Measured year 2025-08-27 through 2026-08-26: 84,770,857 downloads.
- Active direct users include Nango, Pipedream, Shields, Danger JS, and Ltijs.

Download totals are npm API observations, not a count of unique users.

## Reproduced gaps

- Angular/Vite/Webpack browser execution can fail because module initialization
  reads `process.env` and imports Node `url` and `querystring` modules.
- Relation and parameter names are written to ordinary objects without a
  centralized unsafe-key policy; a `__proto__` relation changes an output
  object's prototype instead of creating an ordinary field.
- Types live separately on DefinitelyTyped.
- The upstream development graph contains seven current audit findings due to
  obsolete Tap tooling; the runtime dependency itself has no reported finding.

## Alternatives

- `@web3-storage/parse-link-header@3.1.0` is zero-dependency but changed to an
  ESM named API and has not released since 2022.
- `@sota1235/parse-link-header-ts@3.0.5` is actively released but ESM-only and
  intentionally throws for empty/malformed inputs that the baseline tolerates.
- `http-link-header` is maintained and spec-oriented but exposes a different
  object model and API.

## Decision

GO. A zero-dependency, dual-module, alias-friendly continuation has a distinct
compatibility and adoption path.


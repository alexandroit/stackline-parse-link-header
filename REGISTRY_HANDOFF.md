# Registry Handoff

- upstream: `parse-link-header@2.0.0`
- Stackline target: `@stackline/parse-link-header@1.0.0`
- decision: GO
- compatibility: callable CJS, default/named ESM, relation-keyed output,
  options, environments, browser, types, and deep imports are covered
- runtime dependencies: zero; upstream `xtend`, `url`, and `querystring`
  requirements removed with focused internal equivalents
- incorporated issues: browser #22/#26/#31, options #28, types #30, upstream
  CVE fix PR #25
- rejected breaking change: duplicate relation arrays from #11/PR #12
- roster dependencies: none; no published roster package must change
- tests: upstream, targeted, differential, browser, ESM, runtime, types,
  coverage, package, install, audit, CI, and CodeQL gates
- publication status: NOT YET PUBLISHED
- next project: 11, `dynamic-dedupe`

Finalize hashes, URLs, and registry evidence after publication.

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
- publication status: PUBLISHED TO VERDACCIO AND OFFICIAL NPM
- npm: https://www.npmjs.com/package/@stackline/parse-link-header
- GitHub release: https://github.com/alexandroit/stackline-parse-link-header/releases/tag/stackline-v1.0.0
- docs: https://alexandro.net/docs/vanilla/parse-link-header/
- artifact SHA-1: `39c9cdaaec96bfb1cb16fac44ff5f7409c6b0386`
- artifact SHA-256: `392f139ad913f4e1130e4408163fbdb0dd2db599d576127fd9783d504c0198e5`
- official npm direct and legacy-alias clean installs: passed
- next project: 11, `dynamic-dedupe`

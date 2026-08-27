---
schema: stackline-package-project-memory-v1
project: 10
package: parse-link-header
target: "@stackline/parse-link-header"
state: PUBLISHED
decision: GO
registry_scope: verdaccio-and-public-npm
public_npm: true
public_github: true
docs_production: true
last_updated: 2026-08-27
---

# Project 10 Memory

The project passed the current GO gate on 2026-08-27. It preserves the callable
`parse-link-header@2.0.0` output contract while addressing browser loading,
runtime configuration, type ownership, parser key safety, and obsolete release
engineering.

## Release target

- version: `1.0.0`
- Node: 12 through 24
- modules: CommonJS plus native ESM
- TypeScript: 3.9 plus current
- runtime dependencies: zero
- migration: `parse-link-header@npm:@stackline/parse-link-header`

## Production release

- package: `@stackline/parse-link-header@1.0.0`;
- npm: https://www.npmjs.com/package/@stackline/parse-link-header;
- Verdaccio: published from the exact same tarball as npm;
- source: https://github.com/alexandroit/stackline-parse-link-header;
- release: https://github.com/alexandroit/stackline-parse-link-header/releases/tag/stackline-v1.0.0;
- documentation: https://alexandro.net/docs/vanilla/parse-link-header/;
- source and tag commit: `e9413a1817571fe3d4f0e646d909a1cd9aeaccd6`;
- tarball SHA-1: `39c9cdaaec96bfb1cb16fac44ff5f7409c6b0386`;
- tarball SHA-256: `392f139ad913f4e1130e4408163fbdb0dd2db599d576127fd9783d504c0198e5`;
- npm integrity: `sha512-Ly+fataNa9BUmzLqauoahxW+ZwXwM4n1gBcVkbCuD49Y/kQdU+MlAqIVrvxpHXa8Ov3fDIPUGtM2YS7dtjHyVQ==`;
- packed size: 6,705 bytes; unpacked size: 19,603 bytes; 14 files;
- CI: https://github.com/alexandroit/stackline-parse-link-header/actions/runs/33040631426;
- CodeQL: https://github.com/alexandroit/stackline-parse-link-header/actions/runs/33040631407.

## Production verification

- upstream, targeted, differential, browser, ESM, runtime, type, coverage,
  package, installation, audit, CI, and CodeQL gates passed;
- direct scoped installation and the `parse-link-header` npm alias passed from
  Verdaccio and from the official npm registry;
- npm metadata independently returned the release SHA-1, integrity, file count,
  and unpacked size shown above;
- the public documentation, canonical URL, workbench image, catalog entry, and
  six aggregate sitemap URLs returned through Cloudflare on 2026-08-27.

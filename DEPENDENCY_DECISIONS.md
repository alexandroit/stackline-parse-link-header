# Dependency Decisions

## Runtime

| Dependency | Upstream range | Current status | Decision | Rationale |
| --- | --- | --- | --- | --- |
| `xtend` | `~4.0.1` | latest `4.0.2`, zero dependencies | remove | A small centralized safe copy removes a supply-chain edge and prevents prototype-sensitive assignments. |
| Node `url` | built-in | unavailable without browser polyfills | remove | Only extraction of the raw query component is required. |
| Node `querystring` | built-in legacy API | unavailable without browser polyfills | remove | `URLSearchParams` plus duplicate-key handling preserves valid baseline output. |

There are no runtime, optional, or peer dependencies in the maintained package.

## Development

| Dependency | Version | Purpose | Publication impact |
| --- | ---: | --- | --- |
| `parse-link-header-baseline` | alias of `2.0.0` | differential compatibility | excluded |
| `typescript-3-9` | alias of `3.9.10` | legacy declaration gate | excluded |
| `typescript` | `7.0.2` | current declaration gate | excluded |
| `eslint` / `@eslint/js` | current pinned | static checks | excluded |
| `c8` | current pinned | coverage gate | excluded |
| `esbuild` | current pinned | browser bundle execution | excluded |
| `publint` / AreTheTypesWrong | current pinned | package contract checks | excluded |

`npm audit --omit=dev` must report zero findings for the release graph. Dev
tool findings are reviewed separately and are not shipped.


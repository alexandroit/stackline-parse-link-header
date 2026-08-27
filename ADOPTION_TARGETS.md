# Adoption Targets

Initial active direct users observed on 2026-08-27:

1. `NangoHQ/nango` uses default ESM interop for pagination and pins `2.0.0`.
2. `PipedreamHQ/pipedream` imports the default from `.mjs` components.
3. `badges/shields` uses default ESM interop for GitHub pagination.
4. `danger/danger-js` imports the parser in its GitHub API integration.
5. `Cvmcosta/ltijs` declares the package directly.
6. `Experience-Monks/gh-api-stream` is a representative CommonJS consumer.

Adoption changes should use the npm alias first, disclose the Stackline
maintainer relationship, and run each repository's own tests. No downstream
change is part of this release commit.


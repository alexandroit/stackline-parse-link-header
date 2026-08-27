# Migration

## No source changes

Replace the dependency value and retain existing imports:

```bash
npm install parse-link-header@npm:@stackline/parse-link-header
```

```json
{
  "dependencies": {
    "parse-link-header": "npm:@stackline/parse-link-header@^1.0.0"
  }
}
```

```js
const parseLinkHeader = require('parse-link-header')
```

## Scoped import

```bash
npm install @stackline/parse-link-header
```

```js
import parseLinkHeader from '@stackline/parse-link-header'
```

Applications using `@types/parse-link-header` can remove that package after
switching because declarations ship with this package. Existing TypeScript 3.9
CommonJS import syntax remains supported.

Browser applications no longer need `process`, `url`, or `querystring`
polyfills. Move environment-only length configuration to per-call options when
the same build runs in both browser and server contexts.

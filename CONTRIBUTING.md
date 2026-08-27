# Contributing

Compatibility comes first. Every parser change should include an upstream
characterization or differential case, a focused regression, and browser plus
CommonJS/ESM coverage where relevant.

Run:

```bash
npm ci
npm run verify
```

Security reports belong in private vulnerability reporting as described in
[SECURITY.md](SECURITY.md).


# Contributing to @peter.naydenov/stack

Thanks for the interest. The library is small on purpose — keep contributions small on purpose too.

## Project layout

```
src/index.js        # the whole library, one file
test/01-test.js     # mocha + chai tests
dist/               # pre-built CJS / ESM / UMD bundles (committed)
rollup.config.js    # build config
```

## Run the tests

```bash
npm test
```

Tests must pass before opening a pull request.

## Build

```bash
npm run build
```

This runs Rollup and writes `dist/stack.cjs`, `dist/stack.esm.mjs`, and `dist/stack.umd.js`. The `dist/` folder is committed, so any change to `src/` should ship with a rebuilt `dist/`.

## Coding style

- Two-space indentation, semicolons, single quotes — match the existing `src/index.js`.
- Keep the public API stable. Adding methods is fine; renaming or removing is a breaking change.
- New behavior must come with a test in `test/01-test.js`.
- Update `Changelog.md` with a bullet under an `### <next-version> (unreleased)` header. The maintainer fills in the version and date when shipping.

## Reporting bugs

Open an issue with a minimal reproduction. Include the stack `type`, `limit`, `onLimit`, and the exact call that misbehaves.

## Pull requests

- One change per PR.
- Describe the user-visible effect, not just the code change.
- Link the issue if there is one.

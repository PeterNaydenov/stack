---
name: Bug report
about: Report incorrect behavior or a crash
title: ''
labels: ''
assignees: ''
---

**Describe the bug**
A clear and concise description of what went wrong.


**To Reproduce**
A minimal snippet that triggers the bug. Keep it as small as possible.

```js
import stack from '@peter.naydenov/stack'

const s = stack({ /* your options here */ })
s.push(/* ... */)
// what you did, what came out
```


**Expected behavior**
What you expected to happen.


**Actual behavior**
What actually happened. Paste the full error message (stack trace included) if there is one.


**Stack configuration**
- `type`: `'FIFO'` or `'LIFO'`
- `limit`: number or `false`
- `onLimit`: `'full'` or `'update'`


**Environment**
- Library version (check `package.json` or `npm ls @peter.naydenov/stack`):
- Node version (`node -v`):
- Browser + version (if applicable):
- Bundler / toolchain (if applicable):


**Additional context**
Anything else that might help — links, related issues, screenshots, workaround attempts.

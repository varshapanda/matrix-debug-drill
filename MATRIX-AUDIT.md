# MATRIX-AUDIT.md

# Matrix CI Audit

## Objective

The project is tested across Ubuntu and Windows using Node.js 18, 20, and 22.

The initial matrix was:

| Operating System | Node 18 | Node 20 | Node 22 |
|---|---|---|---|
| Ubuntu Latest | PASS | PASS | FAIL |
| Windows Latest | FAIL | FAIL | FAIL |

The failures were investigated by opening the individual GitHub Actions job logs.

---

## Failure 1 — Windows + Node 18

### Environment

- OS: Windows Latest
- Node: 18
- Step: `npm test`

### Error

> Paste the exact error line from the original Windows + Node 18 GitHub Actions log here.

### Classification

OS-specific

### Root Cause

The project constructed filesystem paths using hardcoded `/` path separators:

```javascript
__dirname + '/configs/' + configName + '.json'